import { NextRequest, NextResponse } from 'next/server'
import { searchActivities } from '@/lib/hbx/activities'

export const dynamic = 'force-dynamic'

function parseAges(raw: string | null): number[] | null {
  const ages = (raw || '30,30').split(',').map((s) => Number(s.trim()))
  if (ages.length < 1 || ages.length > 10) return null
  if (ages.some((n) => !Number.isInteger(n) || n < 0 || n > 120)) return null
  return ages
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  const destination = (p.get('destination') || '').toUpperCase()
  const date = p.get('date') || ''
  const ages = parseAges(p.get('ages'))
  const page = Math.max(1, Number(p.get('page') || 1))

  if (!/^[A-Z]{2,4}$/.test(destination)) {
    return NextResponse.json({ error: 'destination must be a code like BCN' }, { status: 400 })
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'date must be YYYY-MM-DD' }, { status: 400 })
  }
  if (!ages) {
    return NextResponse.json({ error: 'ages must be 1-10 whole numbers, e.g. 30,30,8' }, { status: 400 })
  }

  try {
    const result = await searchActivities({ destination, date, ages, page })
    return NextResponse.json(result)
  } catch (err) {
    console.error('Activities search failed:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Search failed' }, { status: 502 })
  }
}

