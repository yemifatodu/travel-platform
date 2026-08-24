import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

// Service-role client — webhooks have no user session, so this bypasses RLS
// deliberately, same pattern as app/api/esim/webhook/stripe/route.ts.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Hotel booking webhook signature verification failed:', err)
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
        console.error('Failed to confirm hotel booking:', error.message)
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
