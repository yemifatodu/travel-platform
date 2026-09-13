import { NextResponse } from 'next/server'
import { hbxPost } from '@/lib/hbx/client'

export async function GET() {
  try {
    const checkIn = new Date()
    checkIn.setDate(checkIn.getDate() + 14)
    const checkOut = new Date(checkIn)
    checkOut.setDate(checkOut.getDate() + 1)

    const fmt = (d: Date) => d.toISOString().slice(0, 10)

    const data = await hbxPost('/hotel-api/1.0/hotels', {
      stay: { checkIn: fmt(checkIn), checkOut: fmt(checkOut) },
      occupancies: [{ rooms: 1, adults: 2, children: 0 }],
      hotels: { hotel: [123223, 123224, 122197] },
    })

    return NextResponse.json({
      success: true,
      hotelsFound: data.hotels?.total ?? 0,
      sample: data.hotels?.hotels?.[0] ?? null,
    })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}