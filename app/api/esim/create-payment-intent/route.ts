import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

const JOURNEY_STACK_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';

export async function POST(request: NextRequest) {
  try {
    const { planId, customer_email } = await request.json();

    if (!planId) {
      return NextResponse.json({ success: false, error: 'Plan ID required' }, { status: 400 });
    }

    const headers = {
      'x-api-key': process.env.JOURNEY_STACK_API_KEY!,
      'Content-Type': 'application/json',
    };

    // Fetch plan from Journey Stack
    const planRes = await fetch(`${JOURNEY_STACK_BASE}/api-plan-details/${planId}`, { headers });
    const planData = await planRes.json();

    if (!planData.success || !planData.data?.is_active) {
      return NextResponse.json({ success: false, error: 'Plan not available' }, { status: 400 });
    }

    const priceInCents = Math.round(planData.data.retail_price * 100);

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceInCents,
      currency: planData.data.currency.toLowerCase(),
      automatic_payment_methods: { enabled: true },
      metadata: {
        plan_id: planId,
        plan_title: planData.data.title,
        customer_email: customer_email || 'guest',
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Payment failed' },
      { status: 500 }
    );
  }
}