import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { hbxPost } from '@/lib/hbx/client'

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Stripe env vars missing — cannot process hotel booking webhook.')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase env vars missing — cannot process hotel booking webhook.')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-05-27.dahlia',
  })

  // Service-role client — webhooks have no user session, so this bypasses RLS
  // deliberately, same pattern as app/api/esim/webhook/stripe/route.ts.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Hotel booking webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.booking_id

    if (bookingId) {
      const { data: bookingRow, error } = await (supabase.from('bookings') as any)
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          stripe_intent_id: (session.payment_intent as string) || session.id,
        })
        .eq('id', bookingId)
        .select('source')
        .single()

      if (error) {
        console.error('Failed to confirm hotel booking:', error.message)
      }

      // NEW — for HBX bookings, payment succeeding is only half the job.
      // We now must actually confirm the room with HBX using the rate_key
      // we stashed at checkout time.
      if (bookingRow?.source === 'hbx') {
        const { data: item } = await supabase
          .from('booking_items')
          .select('details')
          .eq('booking_id', bookingId)
          .single()

        const details = (item as any)?.details

        try {
          const hbxResult = await hbxPost('/hotel-api/1.0/bookings', {
            holder: { name: details.holder_name, surname: details.holder_surname },
            clientReference: bookingId.slice(0, 20),
            rooms: [{ rateKey: details.hbx_rate_key }],
          })

          await (supabase.from('bookings') as any)
            .update({ hbx_booking_reference: hbxResult.booking.reference })
            .eq('id', bookingId)
        } catch (hbxErr) {
          // Payment succeeded but HBX couldn't confirm the room (sold out,
          // price moved beyond tolerance, etc.) — refund the guest and flag
          // the booking rather than silently leaving them charged with no room.
          console.error('HBX booking confirmation failed after payment:', hbxErr)
          await stripe.refunds.create({ payment_intent: session.payment_intent as string })
          await (supabase.from('bookings') as any)
            .update({ status: 'failed', payment_status: 'refunded' })
            .eq('id', bookingId)
        }
      }

      const couponCode = session.metadata?.coupon_code
      if (couponCode) {
        const { error: couponError } = await supabase.rpc('increment_coupon_uses', { coupon_code_input: couponCode })
        if (couponError) console.error('Failed to increment coupon uses:', couponError.message)
      }
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.booking_id
    if (bookingId) {
      await (supabase.from('bookings') as any).update({ status: 'cancelled' }).eq('id', bookingId)
    }
  }

  return NextResponse.json({ received: true })
}