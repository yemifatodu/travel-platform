import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { hbxGet } from '@/lib/hbx/client'

const PAGE_SIZE = 1000

export async function POST() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL) {
      return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL
    )

    // First call establishes the true total so we know how many pages to fetch.
    const firstPage = await hbxGet('/hotel-content-api/1.0/locations/destinations', {
      fields: 'all',
      language: 'ENG',
      from: '1',
      to: String(PAGE_SIZE),
    })

    const total = firstPage.total ?? 0
    const allDestinations: any[] = [...(firstPage.destinations ?? [])]

    // Fetch remaining pages sequentially (not in parallel) to stay well
    // within HBX's rate limit of 8 requests per 4 seconds.
    let from = PAGE_SIZE + 1
    while (from <= total) {
      const to = Math.min(from + PAGE_SIZE - 1, total)
      const page = await hbxGet('/hotel-content-api/1.0/locations/destinations', {
        fields: 'all',
        language: 'ENG',
        from: String(from),
        to: String(to),
      })
      allDestinations.push(...(page.destinations ?? []))
      from += PAGE_SIZE
      // Small pause between requests, comfortably under the 8-per-4-second cap.
      await new Promise((resolve) => setTimeout(resolve, 600))
    }

    const rows = allDestinations.map((d: any) => ({
      code: d.code,
      name: d.name?.content ?? null,
      country_code: d.countryCode ?? null,
      iso_code: d.isoCode ?? null,
      last_synced_at: new Date().toISOString(),
    }))

    // Upsert in batches to avoid one enormous request to Supabase.
    const BATCH = 500
    for (let i = 0; i < rows.length; i += BATCH) {
      const { error } = await supabase.from('hbx_destinations').upsert(rows.slice(i, i + BATCH))
      if (error) {
        console.error('Failed to upsert destinations batch:', error.message)
        return NextResponse.json({ error: 'Database upsert failed', detail: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, total, synced: rows.length })
  } catch (err) {
    console.error('HBX destinations sync error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Sync failed' },
      { status: 500 }
    )
  }
}
