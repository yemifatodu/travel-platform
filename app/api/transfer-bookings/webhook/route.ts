import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { hbxTransferPost } from '@/lib/hbx/client';

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_TEST_SECRET_KEY || !process.env.STRIPE_TRANSFER_WEBHOOK_SECRET) {
    console.error('Stripe env vars missing - cannot process transfer booking webhook.');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY_TRANSFER) {
    console.error('Supabase env vars missing - cannot process transfer booking webhook.');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2026-05-27.dahlia' as any,
  });

  const supabase: any = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY_TRANSFER
  );

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig || '', process.env.STRIPE_TRANSFER_WEBHOOK_SECRET || '');
  } catch (err) {
    console.error('Transfer booking webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.product === 'transfer' ? session.metadata?.booking_id : undefined;

    if (bookingId) {
      const { data: bookingRow, error } = await supabase
        .from('bookings')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          stripe_intent_id: (session.payment_intent as string) || session.id,
        })
        .eq('id', bookingId)
        .select('source, hbx_booking_reference')
        .single();

      if (error) {
        console.error('Failed to confirm transfer booking:', error.message);
      }

      if (bookingRow?.source === 'hbx') {
        if (bookingRow.hbx_booking_reference) {
          console.log(`Booking ${bookingId} already confirmed with HBX: ${bookingRow.hbx_booking_reference}`);
        } else {
          try {
            const { data: item, error: itemErr } = await supabase
              .from('booking_items')
              .select('details')
              .eq('booking_id', bookingId)
              .single();

            if (itemErr || !item) {
              throw new Error('Booking item not found: ' + (itemErr?.message ?? 'no row'));
            }

            const details = item.details || {};
            const p = details.passenger || {};
            if (!details.hbx_rate_key || !p.name || !p.surname || !p.email || !p.phone) {
              throw new Error('Missing passenger details or rate key on booking item');
            }

            const direction = String(details.hbx_rate_key).split('|')[0];
            const payload: any = {
              language: 'en',
              holder: { name: p.name, surname: p.surname, email: p.email, phone: p.phone },
              transfers: [
                {
                  rateKey: details.hbx_rate_key,
                  transferDetails: details.flight_number
                    ? [{ type: 'FLIGHT', direction, code: String(details.flight_number).toUpperCase(), companyName: null }]
                    : [],
                },
              ],
              clientReference: bookingId.slice(0, 20),
              remark: 'Huuboi booking',
            };

            const hbxResult: any = await hbxTransferPost('/transfer-api/1.0/bookings', payload);
            console.log('HBX transfer booking response:', JSON.stringify(hbxResult).slice(0, 1500));

            const reference = hbxResult?.bookings?.[0]?.reference ?? hbxResult?.booking?.reference;
            if (!reference) {
              throw new Error('HBX response did not include a booking reference');
            }

            const { error: refErr } = await supabase
              .from('bookings')
              .update({ hbx_booking_reference: reference })
              .eq('id', bookingId);
            if (refErr) {
              console.error('HBX booking made but reference could not be stored:', reference, refErr.message);
            }
          } catch (hbxErr: any) {
            console.error('HBX transfer booking confirmation failed after payment:', hbxErr?.message ?? hbxErr);
            try {
              await stripe.refunds.create({ payment_intent: session.payment_intent as string });
            } catch (refundErr: any) {
              console.error('REFUND FAILED - refund this payment manually in Stripe:', refundErr?.message ?? refundErr);
            }
            const { error: failErr } = await supabase
              .from('bookings')
              .update({ status: 'failed', payment_status: 'refunded' })
              .eq('id', bookingId);
            if (failErr) {
              console.error('Could not mark booking as failed:', failErr.message);
            }
          }
        }
      }
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.product === 'transfer' ? session.metadata?.booking_id : undefined;
    if (bookingId) {
      await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);
    }
  }

  return NextResponse.json({ received: true });
}
