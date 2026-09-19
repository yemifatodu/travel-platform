import { NextRequest, NextResponse } from 'next/server'
import { waitUntil } from '@vercel/functions'
import { createClient } from '@supabase/supabase-js'
import { hbxGet, hbxPost } from '@/lib/hbx/client'

const HOTELS_PER_SEARCH = 20

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL!
  )
}

function syncContentInBackground(hbxHotelCode: number, origin: string) {
  waitUntil(
    fetch(`${origin}/api/hbx/sync-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hbx_hotel_code: hbxHotelCode }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Background content sync returned ${res.status} for hotel ${hbxHotelCode}`)
        }
      })
      .catch((err) => {
        console.error(`Background content sync failed for hotel ${hbxHotelCode}:`, err)
      })
  )
}

export async function POST(req: NextRequest) {
  try {
    const { destination, check_in, check_out, adults, children } = await req.json()

    if (!destination || !check_in || !check_out) {
      return NextResponse.json(
        { error: 'Missing destination, check_in, or check_out' },
        { status: 400 }
      )
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL) {
      return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 })
    }

    const supabase = getSupabase()
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.huuboi.com'

    const { data: destMatches, error: destError } = await supabase
      .from('hbx_destinations')
      .select('code, name, country_code')
      .ilike('name', `%${destination}%`)
      .limit(1)

    if (destError) {
      console.error('Destination lookup failed:', destError.message)
      return NextResponse.json({ error: 'Destination lookup failed' }, { status: 500 })
    }
    if (!destMatches?.length) {
      return NextResponse.json({ hotels: [], message: `No destination found matching "${destination}"` })
    }

    const destinationCode = destMatches[0].code

    const hotelsList = await hbxGet('/hotel-content-api/1.0/hotels', {
      destinationCode,
      fields: 'code',
      from: '1',
      to: String(HOTELS_PER_SEARCH),
      language: 'ENG',
    })

    const hotelCodes: number[] = (hotelsList.hotels ?? []).map((h: any) => h.code)
    if (!hotelCodes.length) {
      return NextResponse.json({ hotels: [], message: `No hotels found in ${destMatches[0].name}` })
    }

    const availability = await hbxPost('/hotel-api/1.0/hotels', {
      stay: { checkIn: check_in, checkOut: check_out },
      occupancies: [{ rooms: 1, adults: adults ?? 2, children: children ?? 0 }],
      hotels: { hotel: hotelCodes },
    })

    const availableHotels = availability.hotels?.hotels ?? []
    const availableCodes = availableHotels.map((h: any) => h.code)

    const { data: cachedContent } = availableCodes.length
      ? await supabase
          .from('hbx_hotel_content')
          .select('hbx_hotel_code, cover_image')
          .in('hbx_hotel_code', availableCodes)
      : { data: [] }

    const cachedByCode = new Map((cachedContent ?? []).map((c: any) => [c.hbx_hotel_code, c.cover_image]))

    const hotels = availableHotels.map((h: any) => {
      const allRates = h.rooms.flatMap((r: any) => r.rates.map((rate: any) => Number(rate.net)))
      const coverImage = cachedByCode.get(h.code) ?? null

      if (!coverImage) {
        syncContentInBackground(h.code, origin)
      }

      return {
        hbx_hotel_code: h.code,
        name: h.name,
        destination_name: h.destinationName,
        category: h.categoryName,
        min_rate: Math.min(...allRates),
        currency: h.currency,
        latitude: h.latitude,
        longitude: h.longitude,
        cover_image: coverImage,
      }
    })

    return NextResponse.json({
      destination: destMatches[0].name,
      destinationCode,
      hotelsSearched: hotelCodes.length,
      hotelsAvailable: hotels.length,
      hotels,
    })
  } catch (err) {
    console.error('HBX search error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Search failed' },
      { status: 500 }
    )
  }
}
