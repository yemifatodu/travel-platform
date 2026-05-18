import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

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

export async function POST(request: NextRequest) {
  try {
    const { plan_id, amount, customer_name, customer_email } = await request.json();

    const accessToken = await getPayPalAccessToken();

    const order = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount.toString(),
          },
          custom_id: plan_id,
          description: `eSIM Plan - ${plan_id}`,
        }],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              brand_name: 'HUUBOI',
              locale: 'en-US',
              landing_page: 'LOGIN',
              user_action: 'PAY_NOW',
              return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/esim/capture-paypal-order`,
              cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/esim/checkout`,
            },
          },
        },
      }),
    });

    const orderData = await order.json();
    
    const approvalUrl = orderData.links?.find((link: any) => link.rel === 'approve')?.href;
    
    return NextResponse.json({ 
      orderId: orderData.id,
      approvalUrl: approvalUrl 
    });
  } catch (error) {
    console.error('PayPal order error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}