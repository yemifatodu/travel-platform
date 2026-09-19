import { NextResponse } from 'next/server'
import { hbxGet } from '@/lib/hbx/client'

export async function GET() {
  try {
    const data = await hbxGet('/hotel-content-api/1.0/hotels', {
      destinationCode: 'MAD',
      fields: 'code,name',
      from: '1',
      to: '10',
      language: 'ENG',
    })
    return NextResponse.json({ success: true, total: data.total, sample: data.hotels?.slice(0, 10) })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
