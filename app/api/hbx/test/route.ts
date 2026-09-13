import { NextResponse } from 'next/server'
import { hbxGet } from '@/lib/hbx/client'

export async function GET() {
  try {
    const data = await hbxGet('/hotel-content-api/1.0/types/countries', { fields: 'all', from: '1', to: '3' })
    return NextResponse.json({ success: true, sample: data.countries?.slice(0, 3) ?? data })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
