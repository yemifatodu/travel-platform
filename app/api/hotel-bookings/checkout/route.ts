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
    // Instantiated inside the handler (not at module scope) so a missing key
    // returns a proper JSON error instead of crashing the route at import
    // time — which Next.js surfaces as an HTML error page, breaking the
    // client's res.json() call with "Unexpected token '<'".
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

    const {
      hotel_id,
      hotel_name,
      hotel_slug,
      room_id,
      room_name,
      check_in,
      check_out,
      guests,
      nights,
      unit_price,
      currency = 'USD',
      coupon_code,
      source = 'curated',   // tells us which flow this booking belongs to
      hbx_hotel_code,       // only present for HBX bookings
      hbx_rate_key,         // the HBX price token from checkrate/availability
    } = await req.json()

    if (!hotel_id || !room_id || !check_in || !check_out || !unit_price || !nights) {
      return NextResponse.json({ error: 'Missing booking details' }, { status: 400 })
    }
    if (nights < 1) {
      return NextResponse.json({ error: 'Check-out must be after check-in' }, { status: 400 })
    }
    if (source === 'hbx' && !hbx_rate_key) {
      return NextResponse.json({ error: 'Missing HBX rate key' }, { status: 400 })
    }

    // Subtotal is always recomputed here from unit_price × nights — never
    // trusted from the client — so a discount can't be stacked on top of an
    // already-tampered total.
    const subtotal = Math.round(unit_price * nights * 100) / 100

    let discount_amount = 0
    let applied_coupon: string | null = null
    if (coupon_code) {
      const result = await validateCoupon(coupon_code, subtotal)
      if (result) {
        discount_amount = result.discount_amount
        applied_coupon = result.code
      }
      // Silently ignore an invalid/expired code rather than failing the
      // whole checkout — the UI already validated it before this point, so
      // a mismatch here means it expired or hit its limit in the meantime.
    }

    const total_price = Math.max(0, subtotal - discount_amount)

    // 1. Create the booking (pending / unpaid) and its line item.
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        status: 'pending',
        total_price,
        currency,
        payment_status: 'unpaid',
        traveller_count: guests ?? 1,
        coupon_code: applied_coupon,
        discount_amount,
        source,   // the webhook reads this to know whether to call HBX
      } as any)
      .select()
      .single()

    if (bookingError || !booking) {
      console.error('Booking insert failed:', bookingError?.message)
      return NextResponse.json({ error: 'Could not create booking' }, { status: 500 })
    }

    const nameParts = (user.user_metadata?.full_name || user.email || 'Guest').split(' ')
    const holderName = nameParts[0] || 'Guest'
    const holderSurname = nameParts.slice(1).join(' ') || 'Guest'

    const { error: itemError } = await supabase.from('booking_items').insert({
      booking_id: (booking as any).id,
      item_type: 'hotel',
      // item_id is a uuid column. Curated rooms have a real room UUID, but
      // HBX rooms don't exist as rows in our DB — their identity lives in
      // details.hbx_rate_key instead, so this must be null for HBX bookings
      // or Postgres rejects the rate_key string with "invalid input syntax
      // for type uuid".
      item_id: source === 'hbx' ? null : room_id,
      item_name: `${hotel_name} — ${room_name}`,
      quantity: nights,
      unit_price,
      total_price,
      check_in,
      check_out,
      details: {
        hotel_id,
        hotel_slug,
        room_name,
        guests,
        ...(source === 'hbx' && {
          source: 'hbx',
          hbx_hotel_code,
          hbx_rate_key,
          holder_name: holderName,
          holder_surname: holderSurname,
        }),
      },
    } as any)

    if (itemError) {
      console.error('Booking item insert failed:', itemError.message)
      return NextResponse.json({ error: 'Could not create booking item' }, { status: 500 })
    }

    // 2. Create the Stripe Checkout Session — this is the hosted payment
    //    page the guest is redirected to. A discount can't apply cleanly to
    //    a unit_price × quantity line item, so when a coupon is used this
    //    collapses to a single pre-discounted line item instead.
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const nightsLabel = `${nights} night${nights !== 1 ? 's' : ''} · ${check_in} to ${check_out} · ${guests} guest${guests !== 1 ? 's' : ''}`
    const line_items = discount_amount > 0
      ? [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: `${hotel_name} — ${room_name}`,
                description: `${nightsLabel} · Code ${applied_coupon} applied`,
              },
              unit_amount: Math.round(total_price * 100),
            },
            quantity: 1,
          },
        ]
      : [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: `${hotel_name} — ${room_name}`,
                description: nightsLabel,
              },
              unit_amount: Math.round(unit_price * 100),
            },
            quantity: nights,
          },
        ]

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email ?? undefined,
      line_items,
      metadata: {
        booking_id: (booking as any).id,
        hotel_slug,
        coupon_code: applied_coupon || '',
      },
      success_url: `${origin}/hotel/${hotel_slug}?booking=success&booking_id=${(booking as any).id}`,
      cancel_url: `${origin}/hotel/${hotel_slug}?booking=cancelled`,
    })

    // 3. Stash the session id on the booking so the webhook can find it.
    await (supabase.from('bookings') as any)
      .update({ stripe_intent_id: session.id })
      .eq('id', (booking as any).id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Hotel checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}