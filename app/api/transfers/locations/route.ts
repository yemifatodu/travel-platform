import { NextRequest, NextResponse } from 'next/server';
import { createTransferAdminClient } from '@/lib/supabase/transfer-admin';
import { fetchTransferLocations } from '@/lib/hbx/transfers';

const MIN_CACHE_SIZE = 50;

async function syncLocations(supabase: any) {
  const locations = await fetchTransferLocations();
  const now = new Date().toISOString();

  // Dedupe by code: a batch with duplicate codes makes Postgres reject the upsert
  const byCode = new Map<string, any>();
  for (const loc of locations) {
    if (!loc?.code) continue;
    byCode.set(loc.code, {
      code: loc.code,
      name: loc.name,
      country_code: loc.countryCode,
      language: loc.language,
      type: loc.type,
      updated_at: now,
    });
  }
  const rows = Array.from(byCode.values());

  let upserted = 0;
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500);
    const { error } = await supabase
      .from('transfers_locations')
      .upsert(chunk, { onConflict: 'code' });
    if (error) {
      throw new Error(`Supabase upsert failed: ${error.message} (${error.code}) ${error.details ?? ''}`);
    }
    upserted += chunk.length;
  }
  return { fetched: locations.length, upserted };
}

async function readAll(supabase: any) {
  // Supabase returns max 1000 rows per request, so page through
  const all: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from('transfers_locations')
      .select('*')
      .order('name', { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(`Supabase read failed: ${error.message}`);
    all.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  return all;
}

export async function GET(req: NextRequest) {
  const supabase: any = createTransferAdminClient();
  const forceSync = req.nextUrl.searchParams.get('sync') === '1';

  try {
    let cached = await readAll(supabase);

    if (forceSync || cached.length === 0) {
      const result = await syncLocations(supabase);
      console.log('Transfer locations sync done:', result);
      if (forceSync) return NextResponse.json({ ok: true, ...result });
      cached = await readAll(supabase);
    }

    return NextResponse.json(cached);
  } catch (err: any) {
    console.error('Transfer locations route failed:', err);
    return NextResponse.json({ error: err?.message ?? 'Could not fetch locations' }, { status: 500 });
  }
}


