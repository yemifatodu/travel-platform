import { NextRequest, NextResponse } from 'next/server'
import { hbxGet } from '@/lib/hbx/client'

export async function GET(req: NextRequest) {
  try {
    const query = new URL(req.url).searchParams.get('q') || 'Madrid'
    const data = await hbxGet('/hotel-content-api/1.0/locations/destinations', {
      fields: 'all',
      language: 'ENG',
      from: '1',
      to: '1000',
    })
    const matches = (data.destinations ?? []).filter((d: any) =>
      d.name?.content?.toLowerCase().includes(query.toLowerCase())
    )
    return NextResponse.json({ success: true, total: data.total, matchCount: matches.length, matches: matches.slice(0, 10) })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
