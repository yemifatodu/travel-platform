import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
const API_KEY = process.env.ESIM_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { plan_id, amount, customer_name, customer_email, customer_phone } = await request.json();

    // Fetch plan details
    const plansResponse = await fetch(`${API_BASE}/api-plans?limit=1000`, {
      headers: { 'x-api-key': API_KEY! }
    });
    const plansData = await plansResponse.json();
    const plan = plansData.data.find((p: any) => p.id === plan_id);

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.title,
              description: `${plan.data_amount} - ${plan.validity_days} days - ${plan.country_name}`,
              images: ['https://www.huuboi.com/android-chrome-512x512.png'],
            },
            unit_amount: Math.round(plan.retail_price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/esim/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/esim/checkout?plan_id=${plan_id}`,
      customer_email: customer_email,
      metadata: {
        plan_id: plan.id,
        customer_name: customer_name,
        customer_phone: customer_phone || '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}