import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { hbxGet } from '@/lib/hbx/client'

const PAGE_SIZE = 1000

function toRows(destinations: any[]) {
  return destinations.map((d: any) => ({
    code: d.code,
    name: d.name?.content ?? null,
    country_code: d.countryCode ?? null,
    iso_code: d.isoCode ?? null,
    last_synced_at: new Date().toISOString(),
  }))
}

export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL) {
      return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL
    )

    const url = new URL(req.url)
    const startFrom = Number(url.searchParams.get('from') ?? '1')

    const firstPage = await hbxGet('/hotel-content-api/1.0/locations/destinations', {
      fields: 'all',
      language: 'ENG',
      from: String(startFrom),
      to: String(startFrom + PAGE_SIZE - 1),
    })

    const total = firstPage.total ?? 0
    let syncedCount = 0

    // Upsert immediately after each page, so a later failure (e.g. quota)
    // never discards data we already successfully fetched.
    const firstRows = toRows(firstPage.destinations ?? [])
    if (firstRows.length) {
      const { error } = await supabase.from('hbx_destinations').upsert(firstRows)
      if (error) return NextResponse.json({ error: 'Upsert failed on first page', detail: error.message }, { status: 500 })
      syncedCount += firstRows.length
    }

    let from = startFrom + PAGE_SIZE
    while (from <= total) {
      const to = Math.min(from + PAGE_SIZE - 1, total)
      const page = await hbxGet('/hotel-content-api/1.0/locations/destinations', {
        fields: 'all',
        language: 'ENG',
        from: String(from),
        to: String(to),
      })
      const rows = toRows(page.destinations ?? [])
      if (rows.length) {
        const { error } = await supabase.from('hbx_destinations').upsert(rows)
        if (error) {
          return NextResponse.json(
            { error: 'Upsert failed mid-sync', detail: error.message, syncedSoFar: syncedCount, resumeFrom: from },
            { status: 500 }
          )
        }
        syncedCount += rows.length
      }
      from += PAGE_SIZE
      await new Promise((resolve) => setTimeout(resolve, 600))
    }

    return NextResponse.json({ success: true, total, synced: syncedCount })
  } catch (err) {
    console.error('HBX destinations sync error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Sync failed', resumeHint: 'Pass ?from=N to resume from a specific page.' },
      { status: 500 }
    )
  }
}
