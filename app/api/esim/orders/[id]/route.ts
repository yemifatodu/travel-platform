import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
const API_KEY = process.env.ESIM_API_KEY;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - Fetch order details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!API_KEY) {
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Try Supabase cache first
    const { data: cachedOrder } = await supabase
      .from('esim_orders')
      .select('*')
      .eq('id', id)
      .single();

    // If order is active/completed, return cached
    if (cachedOrder && ['active', 'completed'].includes(cachedOrder.status)) {
      return NextResponse.json({ success: true, data: cachedOrder, cached: true });
    }

    // Fetch from Journey Stack API
    const response = await fetch(`${API_BASE}/api-order-details/${id}`, {
      headers: { 'x-api-key': API_KEY },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const result = await response.json();

    // Update Supabase cache
    if (result.success && supabase) {
      try {
        await supabase
          .from('esim_orders')
          .update({
            status: result.data.status,
            esim_iccid: result.data.esim_iccid,
            activation_code: result.data.activation_code,
            esim_qr_code: result.data.esim_qr_code,
            esim_expiry_date: result.data.esim_expiry_date,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);
      } catch (dbError) {
        console.error('Failed to update Supabase:', dbError);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PUT - Update order (e.g., cancel)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action } = body;

    if (!API_KEY) {
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      );
    }

    if (action === 'cancel') {
      // Cancel the eSIM order
      const response = await fetch(`${API_BASE}/api-cancel-esim/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY },
      });

      const result = await response.json();

      // Update Supabase
      if (result.success && supabase) {
        await supabase
          .from('esim_orders')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);
      }

      return NextResponse.json(result);
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel order (alternative to PUT)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!API_KEY) {
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Cancel the eSIM order
    const response = await fetch(`${API_BASE}/api-cancel-esim/${id}`, {
      method: 'DELETE',
      headers: { 'x-api-key': API_KEY },
    });

    const result = await response.json();

    // Update Supabase
    if (result.success && supabase) {
      await supabase
        .from('esim_orders')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel order' },
      { status: 500 }
    );
  }
}