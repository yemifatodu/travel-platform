// app/api/esim/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const JOURNEY_STACK_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';

export async function POST(request: NextRequest) {
  try {
    const { plan_id, customer_name, customer_email, customer_phone, payment_intent_id } = await request.json();

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const headers = {
      'x-api-key': process.env.JOURNEY_STACK_API_KEY!,
      'Content-Type': 'application/json',
    };

    const orderResponse = await fetch(`${JOURNEY_STACK_BASE}/api-orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        plan_id,
        customer_name,
        customer_email,
        customer_phone: customer_phone || undefined,
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderData.success) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    const { error: dbError } = await supabase.from('esim_orders').insert({
      user_id: user.id,
      order_id: orderData.data.id,
      plan_id,
      payment_intent_id,
      status: orderData.data.status,
      retail_price: orderData.data.retail_price,
      customer_email,
    });

    if (dbError) {
      console.error('Failed to save order to Supabase:', dbError);
    }

    return NextResponse.json({ success: true, data: orderData.data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || '50';
    const offset = searchParams.get('offset') || '0';
    const status = searchParams.get('status');

    const headers = {
      'x-api-key': process.env.JOURNEY_STACK_API_KEY!,
      'Content-Type': 'application/json',
    };

    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit);
    queryParams.append('offset', offset);
    if (status) queryParams.append('status', status);

    const ordersResponse = await fetch(`${JOURNEY_STACK_BASE}/api-list-orders?${queryParams}`, { headers });
    const ordersData = await ordersResponse.json();

    return NextResponse.json(ordersData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}