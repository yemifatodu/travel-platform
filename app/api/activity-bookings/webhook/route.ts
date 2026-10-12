import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { reconfirmWithRetry } from '@/lib/hbx/activities'

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_TEST_SECRET_KEY
  const whSecret = process.env.STRIPE_ACTIVITY_WEBHOOK_SECRET || process.env.STRIPE_TRANSFER_WEBHOOK_SECRET
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY_TRANSFER || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!stripeKey || !whSecret || !sbUrl || !sbKey) {
    console.error('Activity webhook: missing Stripe or Supabase env vars')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-05-27.dahlia' })
  const supabase: any = createClient(sbUrl, sbKey)

  const body = await request.text()
  const sig = request.headers.get('stripe-signature')
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig!, whSecret)
  } catch (err) {
    console.error('Activity webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.expired') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (session.metadata?.kind !== 'activity') return NextResponse.json({ received: true })
  const bookingId = session.metadata?.booking_id
  if (!bookingId) return NextResponse.json({ received: true })

  if (event.type === 'checkout.session.expired') {
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId).eq('status', 'pending')
    if (error) console.error('Failed to cancel expired activity booking:', error.message)
    return NextResponse.json({ received: true })
  }

  const { data: booking, error: loadError } = await supabase
    .from('bookings')
    .select('id, status, hbx_booking_reference')
    .eq('id', bookingId)
    .single()
  if (loadError || !booking) {
    console.error('Activity webhook: booking not found', bookingId, loadError?.message)
    return NextResponse.json({ received: true })
  }
  if (booking.status === 'confirmed') return NextResponse.json({ received: true })

  const paymentIntent = typeof session.payment_intent === 'string' ? session.payment_intent : null

  try {
    if (!booking.hbx_booking_reference) throw new Error('No HBX reference saved on booking')
    const res = await reconfirmWithRetry({
      language: 'en',
      reference: booking.hbx_booking_reference,
    })
    console.log('HBX activity reconfirm response:', JSON.stringify(res).slice(0, 1500))
    if (res?.booking?.status !== 'CONFIRMED') throw new Error('HBX status was ' + res?.booking?.status)

    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        payment_status: 'paid',
        stripe_intent_id: paymentIntent || session.id,
        hbx_booking_reference: res.booking.reference || booking.hbx_booking_reference,
      })
      .eq('id', bookingId)
    if (error) console.error('Failed to save confirmed activity booking:', error.message)
    const act0 = res.booking.activities?.[0]
    const { data: item } = await supabase.from('booking_items').select('id, details').eq('booking_id', bookingId).limit(1).single()
    if (item) {
      const snapshot = {
        reference: res.booking.reference,
        creationDate: res.booking.creationDate,
        name: act0?.content?.name || act0?.name || null,
        modality: act0?.modality?.name || null,
        dateFrom: act0?.dateFrom || null,
        dateTo: act0?.dateTo || null,
        destination: act0?.contactInfo?.country?.destinations?.[0]?.name || null,
        supplier: act0?.supplier || null,
        comments: act0?.comments || [],
        vouchers: act0?.vouchers || [],
        cancellationPolicies: act0?.cancellationPolicies || [],
      }
      const { error: snapError } = await supabase
        .from('booking_items')
        .update({ details: { ...(item.details || {}), hbx_confirmation: snapshot } })
        .eq('id', item.id)
      if (snapError) console.error('Failed to save HBX confirmation snapshot:', snapError.message)
    }
  } catch (err) {
    console.error('HBX activity booking confirmation failed:', err)
    try {
      if (!paymentIntent) throw new Error('No payment intent on session')
      await stripe.refunds.create({ payment_intent: paymentIntent })
    } catch (refundErr) {
      console.error('REFUND FAILED - refund manually:', paymentIntent, refundErr)
    }
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'refunded', payment_status: 'refunded', stripe_intent_id: paymentIntent || session.id })
      .eq('id', bookingId)
    if (error) console.error('Failed to mark activity booking refunded:', error.message)
  }

  return NextResponse.json({ received: true })
}
