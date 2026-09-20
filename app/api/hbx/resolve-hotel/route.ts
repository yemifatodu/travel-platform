import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function slugify(name: string, hbxHotelCode: number) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  // Suffix with the HBX code to guarantee uniqueness even if two hotels
  // share a very similar name after slugifying.
  return `${base}-${hbxHotelCode}`
}

export async function POST(req: NextRequest) {
  try {
    const { hbx_hotel_code, name, destination_name, latitude, longitude } = await req.json()

    if (!hbx_hotel_code || !name) {
      return NextResponse.json({ error: 'Missing hbx_hotel_code or name' }, { status: 400 })
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL) {
      return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY_HOTEL
    )

    // Check if we've already created a row for this HBX hotel — never
    // duplicate, always reuse the existing slug if one exists.
    const { data: existing } = await supabase
      .from('hotels')
      .select('slug')
      .eq('hbx_hotel_code', hbx_hotel_code)
      .eq('source', 'hbx')
      .maybeSingle()

    if (existing?.slug) {
      return NextResponse.json({ slug: existing.slug })
    }

    // Pull any already-cached content (cover image, description) so the
    // new row isn't completely bare on first load.
    const { data: content } = await supabase
      .from('hbx_hotel_content')
      .select('cover_image, description')
      .eq('hbx_hotel_code', hbx_hotel_code)
      .maybeSingle()

    const slug = slugify(name, hbx_hotel_code)

    const { error: insertError } = await supabase.from('hotels').insert({
      slug,
      name,
      source: 'hbx',
      hbx_hotel_code,
      address: destination_name ?? null,
      cover_image: content?.cover_image ?? null,
      description: content?.description ?? null,
      is_published: true,
      // Sensible defaults for fields the curated schema expects but HBX
      // doesn't provide directly — avoids null-related rendering issues
      // on the detail page for a brand-new row.
      avg_rating: null,
      review_count: 0,
      amenities: [],
      gallery: [],
    })

    if (insertError) {
      console.error('Failed to create HBX hotel row:', insertError.message)
      return NextResponse.json({ error: 'Could not create hotel record', detail: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ slug })
  } catch (err) {
    console.error('Resolve-hotel error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to resolve hotel' },
      { status: 500 }
    )
  }
}
