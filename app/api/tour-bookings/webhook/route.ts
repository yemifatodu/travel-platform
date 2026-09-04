import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Stripe env vars missing — cannot process tour booking webhook.')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase env vars missing — cannot process tour booking webhook.')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-05-27.dahlia',
  })

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
    console.error('Tour booking webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.booking_id

    if (bookingId) {
      const { error } = await (supabase.from('bookings') as any)
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          stripe_intent_id: (session.payment_intent as string) || session.id,
        })
        .eq('id', bookingId)

      if (error) {
        console.error('Failed to confirm tour booking:', error.message)
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
