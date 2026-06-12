import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const reference = url.searchParams.get('reference');
  
  if (!reference) {
    return NextResponse.redirect(new URL('/esim/checkout?payment=failed', process.env.NEXT_PUBLIC_BASE_URL));
  }

  try {
    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await verifyResponse.json();

    if (data.status && data.data.status === 'success') {
      const metadata = data.data.metadata;
      const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
      const API_KEY = process.env.ESIM_API_KEY;

      const orderResponse = await fetch(`${API_BASE}/api-orders`, {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: metadata.plan_id,
          customer_name: metadata.customer_name,
          customer_email: data.data.customer.email,
          customer_phone: metadata.customer_phone || '',
        }),
      });

      const order = await orderResponse.json();

      if (order.success) {
        await supabase.from('esim_orders').insert({
          id: order.data.id,
          plan_id: metadata.plan_id,
          customer_name: metadata.customer_name,
          customer_email: data.data.customer.email,
          status: order.data.status,
          retail_price: data.data.amount / 100,
          payment_method: 'paystack',
          payment_id: reference,
        });

        await supabase
          .from('paystack_transactions')
          .update({ 
            status: 'completed',
            order_id: order.data.id,
          })
          .eq('reference', reference);
      }

      return NextResponse.redirect(
        new URL(`/esim/order-confirmation?id=${order.data.id}`, process.env.NEXT_PUBLIC_BASE_URL)
      );
    }

    return NextResponse.redirect(new URL('/esim/checkout?payment=failed', process.env.NEXT_PUBLIC_BASE_URL));
  } catch (error) {
    console.error('Paystack verification error:', error);
    return NextResponse.redirect(new URL('/esim/checkout?payment=failed', process.env.NEXT_PUBLIC_BASE_URL));
  }
}