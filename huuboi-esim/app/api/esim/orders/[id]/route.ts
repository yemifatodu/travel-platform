import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
const API_KEY = process.env.ESIM_API_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try Supabase first
    const { data: cachedOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('id', params.id)
      .single();

    // If order is active, return cached
    if (cachedOrder?.status === 'active') {
      return NextResponse.json({ success: true, data: cachedOrder, cached: true });
    }

    // Fetch fresh from Journey Stack
    const response = await fetch(`${API_BASE}/api-order-details/${params.id}`, {
      headers: { 'x-api-key': API_KEY },
    });

    const result = await response.json();

    // Update Supabase
    if (result.success) {
      await supabase
        .from('orders')
        .update({
          status: result.data.status,
          esim_iccid: result.data.esim_iccid,
          activation_code: result.data.activation_code,
          esim_qr_code: result.data.esim_qr_code,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Order not found' },
      { status: 404 }
    );
  }
}

