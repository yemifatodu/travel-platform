import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { hbxGet } from '@/lib/hbx/client'

const IMAGE_BASE_URL = 'https://photos.hotelbeds.com/giata/'

export async function POST(req: NextRequest) {
  try {
    const { hbx_hotel_code } = await req.json()
    if (!hbx_hotel_code) {
      return NextResponse.json({ error: 'Missing hbx_hotel_code' }, { status: 400 })
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL) {
      return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL
    )

    const data = await hbxGet(`/hotel-content-api/1.0/hotels/${hbx_hotel_code}/details`, {
      language: 'ENG',
    })

    const hotel = data.hotel ?? data
    if (!hotel) {
      return NextResponse.json({ error: 'No hotel data returned from HBX' }, { status: 404 })
    }

    // Prepend the base photo URL to every image path, and keep the rest of
    // each image object (type, roomCode, etc.) intact for later matching.
    const images = (hotel.images ?? []).map((img: any) => ({
      ...img,
      url: IMAGE_BASE_URL + img.path,
    }))

    // Prefer a general-view image as the cover; fall back to the first
    // image of any kind if no general view exists.
    const coverImage =
      images.find((img: any) => img.type?.code === 'GEN')?.url ??
      images[0]?.url ??
      null

    const { error: upsertError } = await supabase
      .from('hbx_hotel_content')
      .upsert({
        hbx_hotel_code: hotel.code,
        name: hotel.name?.content ?? null,
        description: hotel.description?.content ?? null,
        cover_image: coverImage,
        images,
        facilities: hotel.facilities ?? [],
        last_synced_at: new Date().toISOString(),
      })

    if (upsertError) {
      console.error('Failed to upsert hbx_hotel_content:', upsertError.message)
      return NextResponse.json({ error: 'Database upsert failed' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      hbx_hotel_code: hotel.code,
      name: hotel.name?.content,
      imageCount: images.length,
      coverImage,
    })
  } catch (err) {
    console.error('HBX content sync error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Sync failed' },
      { status: 500 }
    )
  }
}