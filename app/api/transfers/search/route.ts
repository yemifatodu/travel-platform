import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { fetchTransferLocations } from '@/lib/hbx/transfers';
import { waitUntil } from '@vercel/functions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || q.length < 2) {
    return NextResponse.json({ success: false, error: 'Query too short' }, { status: 400 });
  }

  const supabase = createServerClient();

  // 1. Search in cached locations
  const { data: destinations, error } = await supabase
    .from('transfers_locations')
    .select('code, name, country_code, type')
    .or(`name.ilike.%${q}%,code.ilike.%${q}%`)
    .limit(10);

  if (error) {
    console.error('Search error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }

  // 2. If no results found, try to prime the cache and search again
  if (!destinations || destinations.length === 0) {
    try {
      // We trigger a sync regardless of count if search is empty,
      // as the cache might be partial or outdated.
      const locations = await fetchTransferLocations();
      const upsertData = locations.map(loc => ({
        code: loc.code,
        name: loc.name,
        country_code: loc.countryCode,
        language: loc.language,
        type: loc.type,
      }));

      await (supabase.from('transfers_locations') as any).upsert(upsertData, {
        onConflict: 'code'
      });

      // Re-run the search now that cache is refreshed
      const { data: primedDestinations } = await supabase
        .from('transfers_locations')
        .select('code, name, country_code, type')
        .or(`name.ilike.%${q}%,code.ilike.%${q}%`)
        .limit(10);

      return NextResponse.json({
        success: true,
        data: {
          destinations: primedDestinations?.map((d: any) => ({
            code: d.code,
            name: d.name,
            countryCode: d.country_code,
            type: d.type,
          })) || [],
        },
      });
    } catch (err) {
      console.error('Cache refresh failed during search:', err);
    }
  }

  return NextResponse.json({
    success: true,
    data: {
      destinations: (destinations as any[])?.map(d => ({
        code: d.code,
        name: d.name,
        countryCode: d.country_code,
        type: d.type,
      })) || [],
    },
  });
}
