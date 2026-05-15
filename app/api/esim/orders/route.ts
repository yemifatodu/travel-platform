import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
const API_KEY = process.env.ESIM_API_KEY;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan_id, customer_name, customer_email, customer_phone } = body;

    // Call Journey Stack API
    const response = await fetch(`${API_BASE}/api-orders`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan_id, customer_name, customer_email, customer_phone }),
    });
    
    const result = await response.json();

    // Store order in Supabase
    if (result.success) {
      await supabase.from('esim_orders').insert({
        id: result.data.id,
        plan_id,
        customer_name,
        customer_email,
        status: result.data.status,
        retail_price: result.data.retail_price,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

