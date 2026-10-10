import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';

async function validateCoupon(code: string, orderValue: number) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY_TRANSFER) return null;
  const service = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY_TRANSFER);
  const { data: coupon } = await service
    .from('coupons')
    .select('id, code, discount_type, discount_value, min_order_value, max_uses, uses_count, valid_from, valid_until, is_active')
    .ilike('code', code.trim())
    .single();

  if (!coupon) return null;
  const c = coupon as any;
  const now = new Date();
  if (!c.is_active) return null;
  if (c.valid_from && new Date(c.valid_from) > now) return null;
  if (c.valid_until && new Date(c.valid_until) < now) return null;
  if (c.max_uses && c.uses_count >= c.max_uses) return null;
  if (c.min_order_value && orderValue < c.min_order_value) return null;

  const discountAmount =
    c.discount_type === 'percentage' ? Math.round(orderValue * (c.discount_value / 100) * 100) / 100 : c.discount_value;

  return { code: c.code, discount_amount: Math.min(discountAmount, orderValue) };
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_TEST_SECRET_KEY) {
      console.error('STRIPE_TEST_SECRET_KEY is not set');
      return NextResponse.json({ error: 'Payments not configured' }, { status: 500 });
    }
    const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
      apiVersion: '2026-08-26.dahlia',
    });

    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }

    const {
      transfer_id,
      transfer_name,
      pickup_location,
      dropoff_location,
      pickup_date,
      pickup_time,
      guests,
      unit_price,
      hbx_transfer_rate_key,
      coupon_code,
      currency = 'EUR', passenger = null, flight_number = null,
    } = await req.json();

    if (transfer_id == null || !unit_price || !pickup_date || !hbx_transfer_rate_key) {
      return NextResponse.json({ error: 'Missing booking details' }, { status: 400 });
    }

    // Verify price by extracting it from the rateKey itself. HBX's Transfers API
    // has no live re-check endpoint equivalent to Hotels' checkrates — the
    // rateKey is an opaque, time-boxed token, but in practice it embeds the
    // quoted price as the only bare "NN.NN" token in its pipe-delimited string.
    // If we can find exactly one such token, trust it over the client-submitted
    // unit_price. HBX's own booking call later (in the webhook) is the ultimate
    // backstop: a stale or tampered rateKey is simply rejected there.
    const priceMatches = hbx_transfer_rate_key.match(/\d+\.\d{2}/g) || [];
    if (priceMatches.length === 1) {
      const embeddedPrice = parseFloat(priceMatches[0]);
      if (Math.abs(embeddedPrice - unit_price) > 0.01) {
        return NextResponse.json({
          error: `Price mismatch. The current price for this transfer is ${embeddedPrice} ${currency}.`,
        }, { status: 400 });
      }
    } else {
      console.warn('Could not confidently verify transfer rate price from rateKey:', hbx_transfer_rate_key);
    }

    if (!passenger?.name || !passenger?.surname || !passenger?.email || !passenger?.phone) { return NextResponse.json({ error: 'Passenger first name, last name, email and phone are required' }, { status: 400 }); } if (hbx_transfer_rate_key.includes('|IATA|') && !flight_number) { return NextResponse.json({ error: 'Flight number is required for airport transfers' }, { status: 400 }); } const subtotal = Math.round(unit_price * 100) / 100;
    let discount_amount = 0;
    let applied_coupon: string | null = null;

    if (coupon_code) {
      const result = await validateCoupon(coupon_code, subtotal);
      if (result) {
        discount_amount = result.discount_amount;
        applied_coupon = result.code;
      }
    }

    const total_price = Math.max(0, subtotal - discount_amount);

    // 1. Create pending booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        status: 'pending',
        total_price,
        currency,
        payment_status: 'unpaid',
        traveller_count: guests || 1,
        coupon_code: applied_coupon,
        discount_amount,
        source: 'hbx',
      } as any)
      .select()
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Could not create booking' }, { status: 500 });
    }

    // 2. Create booking item
    const { error: itemError } = await supabase.from('booking_items').insert({
      booking_id: (booking as any).id,
      item_type: 'transfer',
      item_id: null, // HBX items don't have UUIDs in our DB
      item_name: transfer_name,
      quantity: 1,
      unit_price,
      total_price,
      details: {
        pickup_location,
        dropoff_location,
        pickup_date,
        pickup_time,
        guests,
        hbx_rate_key: hbx_transfer_rate_key, passenger, flight_number,
        source: 'hbx',
      },
    } as any);

    if (itemError) {
      return NextResponse.json({ error: 'Could not create booking item' }, { status: 500 });
    }

    // 3. Stripe Checkout Session
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email ?? undefined,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: transfer_name,
              description: `${pickup_location} to ${dropoff_location} on ${pickup_date}`,
            },
            unit_amount: Math.round(total_price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { product: 'transfer',
        booking_id: (booking as any).id,
      },
      success_url: `${origin}/transfers?booking=success&booking_id=${(booking as any).id}`,
      cancel_url: `${origin}/transfers?booking=cancelled`,
    });

    await (supabase.from('bookings') as any)
      .update({ stripe_intent_id: session.id })
      .eq('id', (booking as any).id);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Transfer checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
