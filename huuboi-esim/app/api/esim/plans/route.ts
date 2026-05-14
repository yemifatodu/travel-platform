import { NextResponse } from 'next/server';
import { getCachedPlans, cachePlans } from '@/lib/supabase/esim-cache';

const API_BASE = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
const API_KEY = process.env.ESIM_API_KEY!;
const CACHE_DURATION = parseInt(process.env.ESIM_CACHE_DURATION || '3600');

export async function GET() {
  try {
    // Try Supabase cache first
    const cached = await getCachedPlans();
    if (cached) {
      return NextResponse.json({ success: true, data: cached, cached: true });
    }

    // Fetch from Journey Stack API
    let offset = 0;
    let allPlans = [];
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `${API_BASE}/api-plans?limit=1000&offset=${offset}`,
        { headers: { 'x-api-key': API_KEY } }
      );
      const result = await response.json();
      
      if (result.success) {
        allPlans.push(...result.data);
        hasMore = result.pagination?.has_more || false;
        offset = result.pagination?.next_offset || offset + 1000;
      } else {
        break;
      }
    }

    // Cache in Supabase
    await cachePlans(allPlans);

    return NextResponse.json({ success: true, data: allPlans, cached: false });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}
