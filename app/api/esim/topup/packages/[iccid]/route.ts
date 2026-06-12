import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JOURNEY_STACK_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ iccid: string }> }
) {
  try {
    const { iccid } = await params;

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: orderCheck } = await supabase
      .from('esim_orders')
      .select('user_id')
      .eq('iccid', iccid)
      .single();

    if (!orderCheck || orderCheck.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const packagesResponse = await fetch(
      `${JOURNEY_STACK_BASE}/api-topup-packages/${iccid}`,
      {
        headers: {
          'x-api-key': process.env.JOURNEY_STACK_API_KEY!,
          'Content-Type': 'application/json',
        },
      }
    );

    const packagesData = await packagesResponse.json();

    if (!packagesResponse.ok) {
      return NextResponse.json(
        { error: packagesData.error || 'Failed to fetch top-up packages' },
        { status: packagesResponse.status }
      );
    }

    return NextResponse.json(packagesData);
  } catch (error) {
    console.error('Top-up packages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top-up packages' },
      { status: 500 }
    );
  }
}