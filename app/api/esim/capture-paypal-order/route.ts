import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PAYPAL_API = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/esim/checkout', process.env.NEXT_PUBLIC_BASE_URL));
  }

  try {
    const accessToken = await getPayPalAccessToken();
    
    const captureResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const capture = await captureResponse.json();

    if (capture.status === 'COMPLETED') {
      const planId = capture.purchase_units[0]?.custom_id;
      const payerEmail = capture.payer.email_address;
      const payerName = capture.payer.name?.given_name + ' ' + (capture.payer.name?.surname || '');

      const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
      const API_KEY = process.env.ESIM_API_KEY;

      const orderResponse = await fetch(`${API_BASE}/api-orders`, {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          customer_name: payerName,
          customer_email: payerEmail,
          customer_phone: '',
        }),
      });

      const order = await orderResponse.json();

      if (order.success) {
        await supabase.from('esim_orders').insert({
          id: order.data.id,
          plan_id: planId,
          customer_name: payerName,
          customer_email: payerEmail,
          status: order.data.status,
          retail_price: order.data.retail_price,
          payment_method: 'paypal',
          payment_id: token,
        });
      }

      return NextResponse.redirect(
        new URL(`/esim/order-confirmation?id=${order.data.id}`, process.env.NEXT_PUBLIC_BASE_URL)
      );
    }

    return NextResponse.redirect(new URL('/esim/checkout?payment=failed', process.env.NEXT_PUBLIC_BASE_URL));
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.redirect(new URL('/esim/checkout?payment=failed', process.env.NEXT_PUBLIC_BASE_URL));
  }
}