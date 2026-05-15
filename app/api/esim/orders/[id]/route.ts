import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
const API_KEY = process.env.ESIM_API_KEY;

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
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}