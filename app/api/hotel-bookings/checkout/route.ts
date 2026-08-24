import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase/server'

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
      total_price,
      currency = 'USD',
    } = await req.json()

    if (!hotel_id || !room_id || !check_in || !check_out || !total_price) {
      return NextResponse.json({ error: 'Missing booking details' }, { status: 400 })
    }
    if (nights < 1) {
      return NextResponse.json({ error: 'Check-out must be after check-in' }, { status: 400 })
    }

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
      } as any)
      .select()
      .single()

    if (bookingError || !booking) {
      console.error('Booking insert failed:', bookingError?.message)
      return NextResponse.json({ error: 'Could not create booking' }, { status: 500 })
    }

    const { error: itemError } = await supabase.from('booking_items').insert({
      booking_id: (booking as any).id,
      item_type: 'hotel',
      item_id: room_id,
      item_name: `${hotel_name} — ${room_name}`,
      quantity: nights,
      unit_price,
      total_price,
      check_in,
      check_out,
      details: { hotel_id, hotel_slug, room_name, guests },
    } as any)

    if (itemError) {
      console.error('Booking item insert failed:', itemError.message)
      return NextResponse.json({ error: 'Could not create booking item' }, { status: 500 })
    }

    // 2. Create the Stripe Checkout Session — this is the hosted payment
    //    page the guest is redirected to.
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email ?? undefined,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `${hotel_name} — ${room_name}`,
              description: `${nights} night${nights !== 1 ? 's' : ''} · ${check_in} to ${check_out} · ${guests} guest${guests !== 1 ? 's' : ''}`,
            },
            unit_amount: Math.round(unit_price * 100),
          },
          quantity: nights,
        },
      ],
      metadata: {
        booking_id: (booking as any).id,
        hotel_slug,
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
