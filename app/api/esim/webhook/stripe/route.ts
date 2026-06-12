// app/api/esim/webhook/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JOURNEY_STACK_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { plan_id, customer_email } = paymentIntent.metadata;

    const headers = {
      'x-api-key': process.env.JOURNEY_STACK_API_KEY!,
      'Content-Type': 'application/json',
    };

    const { data: userData } = await supabase
      .from('users')
      .select('id, raw_user_meta_data')
      .eq('email', customer_email)
      .single();

    const customer_name = userData?.raw_user_meta_data?.full_name || customer_email?.split('@')[0] || 'Customer';

    const orderResponse = await fetch(`${JOURNEY_STACK_BASE}/api-orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        plan_id,
        customer_name,
        customer_email,
      }),
    });

    const orderData = await orderResponse.json();

    if (orderData.success) {
      await supabase.from('esim_orders').insert({
        order_id: orderData.data.id,
        plan_id: plan_id,
        payment_intent_id: paymentIntent.id,
        status: orderData.data.status,
        retail_price: orderData.data.retail_price,
        customer_email: customer_email,
      });
    }
  }

  return NextResponse.json({ received: true });
}