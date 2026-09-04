import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

async function validateCoupon(code: string, orderValue: number) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null
  const service = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data: coupon } = await service
    .from('coupons')
    .select('id, code, discount_type, discount_value, min_order_value, max_uses, uses_count, valid_from, valid_until, is_active')
    .ilike('code', code.trim())
    .single()

  if (!coupon) return null
  const c = coupon as any
  const now = new Date()
  if (!c.is_active) return null
  if (c.valid_from && new Date(c.valid_from) > now) return null
  if (c.valid_until && new Date(c.valid_until) < now) return null
  if (c.max_uses && c.uses_count >= c.max_uses) return null
  if (c.min_order_value && orderValue < c.min_order_value) return null

  const discountAmount =
    c.discount_type === 'percentage' ? Math.round(orderValue * (c.discount_value / 100) * 100) / 100 : c.discount_value

  return { code: c.code, discount_amount: Math.min(discountAmount, orderValue) }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set — cannot start checkout.')
      return NextResponse.json(
        { error: 'Payments are not configured yet. Add STRIPE_SECRET_KEY to .env.local.' },
        { status: 500 }
      )
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-05-27.dahlia',
    })

    const supabase = createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
    }

    const { tour_id, tour_name, tour_slug, date, participants, unit_price, currency = 'USD', coupon_code } = await req.json()

    if (!tour_id || !date || !participants || !unit_price) {
      return NextResponse.json({ error: 'Missing booking details' }, { status: 400 })
    }

    const subtotal = Math.round(unit_price * participants * 100) / 100

    let discount_amount = 0
    let applied_coupon: string | null = null
    if (coupon_code) {
      const result = await validateCoupon(coupon_code, subtotal)
      if (result) {
        discount_amount = result.discount_amount
        applied_coupon = result.code
      }
    }

    const total_price = Math.max(0, subtotal - discount_amount)

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        status: 'pending',
        total_price,
        currency,
        payment_status: 'unpaid',
        traveller_count: participants,
        coupon_code: applied_coupon,
        discount_amount,
      } as any)
      .select()
      .single()

    if (bookingError || !booking) {
      console.error('Booking insert failed:', bookingError?.message)
      return NextResponse.json({ error: 'Could not create booking' }, { status: 500 })
    }

    const { error: itemError } = await supabase.from('booking_items').insert({
      booking_id: (booking as any).id,
      item_type: 'tour',
      item_id: tour_id,
      item_name: tour_name,
      quantity: participants,
      unit_price,
      total_price,
      check_in: date,
      check_out: date,
      details: { tour_id, tour_slug, participants },
    } as any)

    if (itemError) {
      console.error('Booking item insert failed:', itemError.message)
      return NextResponse.json({ error: 'Could not create booking item' }, { status: 500 })
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const label = `${participants} participant${participants !== 1 ? 's' : ''} · ${date}`

    const line_items = discount_amount > 0
      ? [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: { name: tour_name, description: `${label} · Code ${applied_coupon} applied` },
              unit_amount: Math.round(total_price * 100),
            },
            quantity: 1,
          },
        ]
      : [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: { name: tour_name, description: label },
              unit_amount: Math.round(unit_price * 100),
            },
            quantity: participants,
          },
        ]

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email ?? undefined,
      line_items,
      metadata: {
        booking_id: (booking as any).id,
        tour_slug,
        coupon_code: applied_coupon || '',
      },
      success_url: `${origin}/tours/${tour_slug}?booking=success&booking_id=${(booking as any).id}`,
      cancel_url: `${origin}/tours/${tour_slug}?booking=cancelled`,
    })

    await (supabase.from('bookings') as any)
      .update({ stripe_intent_id: session.id })
      .eq('id', (booking as any).id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Tour checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}
