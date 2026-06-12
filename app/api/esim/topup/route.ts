import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JOURNEY_STACK_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { iccid, package_code } = body;

    if (!iccid || !package_code) {
      return NextResponse.json(
        { success: false, error: 'iccid and package_code are required' },
        { status: 400 }
      );
    }

    const { data: orderCheck } = await supabase
      .from('esim_orders')
      .select('user_id')
      .eq('iccid', iccid)
      .single();

    if (!orderCheck || orderCheck.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const response = await fetch(`${JOURNEY_STACK_BASE}/api-topup`, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.JOURNEY_STACK_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ iccid, package_code }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || 'Top-up failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Top-up error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process top-up' },
      { status: 500 }
    );
  }
}