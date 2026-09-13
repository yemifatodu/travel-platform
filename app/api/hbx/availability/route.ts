import { NextRequest, NextResponse } from 'next/server'
import { hbxPost } from '@/lib/hbx/client'

export async function POST(req: NextRequest) {
  try {
    const { hbx_hotel_code, check_in, check_out, adults, children } = await req.json()

    if (!hbx_hotel_code || !check_in || !check_out) {
      return NextResponse.json(
        { error: 'Missing hbx_hotel_code, check_in, or check_out' },
        { status: 400 }
      )
    }

    const data = await hbxPost('/hotel-api/1.0/hotels', {
      stay: { checkIn: check_in, checkOut: check_out },
      occupancies: [{ rooms: 1, adults: adults ?? 2, children: children ?? 0 }],
      hotels: { hotel: [hbx_hotel_code] },
    })

    const hotel = data?.hotels?.hotels?.[0]
    if (!hotel) {
      return NextResponse.json({ rooms: [], currency: null })
    }

    // Flatten HBX's nested room→rates structure into one flat list —
    // one entry per bookable rate, which is what the booking UI needs.
    const rooms = hotel.rooms.flatMap((room: any) =>
      room.rates.map((rate: any) => ({
        room_code: room.code,
        room_name: room.name,
        rate_key: rate.rateKey,
        rate_type: rate.rateType,       // 'BOOKABLE' or 'RECHECK'
        board_name: rate.boardName,
        net: Number(rate.net),
        selling_rate: rate.sellingRate ? Number(rate.sellingRate) : Number(rate.net),
        adults: rate.adults,
        children: rate.children,
        cancellation_policies: rate.cancellationPolicies ?? [],
      }))
    )

    return NextResponse.json({ rooms, currency: hotel.currency })
  } catch (err) {
    console.error('HBX availability error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Availability lookup failed' },
      { status: 500 }
    )
  }
}