import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { plan_id, amount, customer_name, customer_email, customer_phone } = await request.json();

    const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
    const API_KEY = process.env.ESIM_API_KEY;

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

    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customer_email,
        amount: Math.round(amount * 100),
        currency: 'USD',
        metadata: {
          plan_id: plan.id,
          plan_title: plan.title,
          customer_name: customer_name,
          customer_phone: customer_phone,
        },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/esim/paystack/callback`,
      }),
    });

    const data = await paystackResponse.json();

    if (data.status) {
      await supabase.from('paystack_transactions').insert({
        reference: data.data.reference,
        plan_id: plan.id,
        amount: amount,
        customer_name: customer_name,
        customer_email: customer_email,
        status: 'pending',
        created_at: new Date().toISOString(),
      });

      return NextResponse.json({ 
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
      });
    }

    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Paystack error:', error);
    return NextResponse.json(
      { error: 'Payment initialization failed' },
      { status: 500 }
    );
  }
}