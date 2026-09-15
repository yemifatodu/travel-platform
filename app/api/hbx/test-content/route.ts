import { NextResponse } from 'next/server'
import { hbxGet } from '@/lib/hbx/client'

export async function GET() {
  try {
    const data = await hbxGet('/hotel-content-api/1.0/hotels/123224/details', {
      language: 'ENG',
    })
    return NextResponse.json({ success: true, hotel: data.hotel ?? data })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}