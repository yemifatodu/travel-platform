// app/api/esim/cancel/[iccid]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JOURNEY_STACK_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';

export async function DELETE(
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

    // Verify ownership before allowing cancellation
    const { data: orderCheck } = await supabase
      .from('esim_orders')
      .select('user_id')
      .eq('iccid', iccid)
      .single();

    if (!orderCheck || orderCheck.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const cancelResponse = await fetch(
      `${JOURNEY_STACK_BASE}/api-cancel-esim/${iccid}`,
      {
        method: 'DELETE',
        headers: {
          'x-api-key': process.env.JOURNEY_STACK_API_KEY!,
          'Content-Type': 'application/json',
        },
      }
    );

    const cancelData = await cancelResponse.json();

    if (!cancelResponse.ok) {
      return NextResponse.json(
        { error: cancelData.error || 'Failed to cancel eSIM' },
        { status: cancelResponse.status }
      );
    }

    // Update our local Supabase record
    if (cancelData.success) {
      await supabase
        .from('esim_orders')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
        })
        .eq('iccid', iccid);
    }

    return NextResponse.json(cancelData);
  } catch (error) {
    console.error('Cancel eSIM error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel eSIM' },
      { status: 500 }
    );
  }
}