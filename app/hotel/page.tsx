import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import HotelSearchBar from './components/HotelSearchBar'
import HotelServiceStrip from './components/HotelServiceStrip'
import SaveButton from './components/SaveButton'

// This route reads live from Supabase, so it should never be statically
// generated at build time (there's no data to bake in, and the build
// environment has no DB credentials).
export const dynamic = 'force-dynamic'

const gold = '#C8A96E'
const goldLight = '#E2C98A'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

export const metadata: Metadata = {
  title: 'Stays | Huuboi',
  description: 'Browse hand-picked hotels, resorts, and boutique stays around the world.',
}

type Room = {
  id: string
  base_price: number
  currency: string
  max_occupancy?: number
}

type Hotel = {
  id: string
  name: string
  slug: string
  category: string | null
  star_rating: number | null
  description: string | null
  address: string | null
  cover_image: string | null
  avg_rating: number | null
  review_count: number | null
  is_featured: boolean | null
  rooms: Room[]
}

const PAGE_SIZE = 6

async function getHotels(params: {
  destination?: string
  adults?: string
  children?: string
  page?: string
}): Promise<{ hotels: Hotel[]; totalCount: number; page: number; totalPages: number }> {
  const supabase = createServerClient()
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)

  let query = supabase
    .from('hotels')
    .select(
      'id, name, slug, category, star_rating, description, address, cover_image, avg_rating, review_count, is_featured, rooms(id, base_price, currency, max_occupancy)',
      { count: 'exact' }
    )
    .eq('is_published', true)

  if (params.destination) {
    query = query.or(
      `name.ilike.%${params.destination}%,address.ilike.%${params.destination}%,category.ilike.%${params.destination}%`
    )
  }

  // Guest-count filtering happens client-side below (rooms vary per hotel),
  // so we can't push it into the DB range/count — meaning pagination against
  // a guest filter is approximate. Good enough for now; revisit if guest
  // filtering needs to be exact at scale (would mean a rooms-first query).
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await query
    .order('is_featured', { ascending: false })
    .order('avg_rating', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Failed to load hotels:', error.message)
    return { hotels: [], totalCount: 0, page: 1, totalPages: 1 }
  }

  let hotels = (data ?? []) as Hotel[]

  const totalGuests = (parseInt(params.adults || '0', 10) || 0) + (parseInt(params.children || '0', 10) || 0)
  if (totalGuests > 0) {
    hotels = hotels.filter((h) => h.rooms.some((r: any) => (r.max_occupancy ?? 2) >= totalGuests))
  }

  const totalCount = count ?? hotels.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  return { hotels, totalCount, page, totalPages }
}

function lowestNightlyRate(rooms: Room[]): { amount: number; currency: string } | null {
  if (!rooms?.length) return null
  const cheapest = rooms.reduce((min, r) => (r.base_price < min.base_price ? r : min), rooms[0])
  return { amount: cheapest.base_price, currency: cheapest.currency || 'USD' }
}

function maxCapacity(rooms: Room[]): number | null {
  if (!rooms?.length) return null
  return Math.max(...rooms.map((r) => r.max_occupancy ?? 2))
}

export default async function HotelBrowsePage({
  searchParams,
}: {
  searchParams: { destination?: string; checkIn?: string; checkOut?: string; adults?: string; children?: string; page?: string }
}) {
  const { hotels, totalCount, page, totalPages } = await getHotels(searchParams)
  const { destination = '', checkIn = '', checkOut = '', adults = '', children = '' } = searchParams
  const hasFilters = Boolean(destination || checkIn || checkOut || adults || children)

  function pageHref(targetPage: number) {
    const params = new URLSearchParams()
    if (destination) params.set('destination', destination)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    if (adults) params.set('adults', adults)
    if (children) params.set('children', children)
    if (targetPage > 1) params.set('page', String(targetPage))
    return `/hotel${params.toString() ? `?${params.toString()}` : ''}`
  }

  return (
    <div style={{ background: '#080807', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        style={{
          position: 'relative',
          minHeight: 560,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '96px 24px 0',
          background: 'radial-gradient(circle at 30% 20%, #1C1B18, #080807 70%)',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: gold,
              marginBottom: 16,
            }}
          >
            Global stays, booked with confidence
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: cream,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Find Your Perfect <em style={{ fontStyle: 'italic', color: gold }}>Dream Stay</em>
          </h1>
          <p style={{ color: muted, fontSize: '1.1rem', maxWidth: 620, margin: '0 auto', fontWeight: 300 }}>
            Discover extraordinary hotels, luxury resorts, and unique accommodations worldwide.
            Book with confidence, stay with comfort, and create unforgettable memories.
          </p>
        </div>
      </div>

      {/* Search bar */}
      <HotelSearchBar
        initialDestination={destination}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialAdults={adults}
        initialChildren={children}
      />

      {/* Service strip — same scroll-to-sidebar widget as the homepage */}
      <HotelServiceStrip>
        {/* Section heading */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', padding: '0 24px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: '2rem',
            color: cream,
            marginBottom: 6,
          }}
        >
          Latest Destinations
        </h2>
        <p style={{ color: muted, fontSize: '0.95rem' }}>
          {totalCount > 0
            ? `${totalCount} stay${totalCount !== 1 ? 's' : ''} available${totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ''}`
            : 'Most recent stays added by our hosts'}
        </p>
      </div>

      {/* Hotel grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 96px' }}>
        {hotels.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: muted }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: cream, marginBottom: 8 }}>
              {hasFilters ? 'No stays match your search' : 'No stays published yet'}
            </p>
            <p style={{ fontSize: '0.95rem' }}>
              {hasFilters ? 'Try a different destination or fewer guests.' : 'Check back soon — new properties are being added.'}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {hotels.map((hotel) => {
              const rate = lowestNightlyRate(hotel.rooms)
              const capacity = maxCapacity(hotel.rooms)
              const detailParams = new URLSearchParams()
              if (checkIn) detailParams.set('checkIn', checkIn)
              if (checkOut) detailParams.set('checkOut', checkOut)
              if (adults) detailParams.set('guests', adults)
              const detailHref = `/hotel/${hotel.slug}${detailParams.toString() ? `?${detailParams.toString()}` : ''}`

              return (
                <div key={hotel.id} style={{ position: 'relative' }}>
                  <SaveButton
                    hotelId={hotel.id}
                    hotelName={hotel.name}
                    hotelImage={hotel.cover_image}
                    style={{ position: 'absolute', top: 144, right: 12, zIndex: 2 }}
                  />
                  <Link
                    href={detailHref}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      background: '#111110',
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid rgba(200,169,110,0.12)',
                    }}
                  >
                  <div
                    style={{
                      height: 190,
                      backgroundImage: hotel.cover_image ? `url(${hotel.cover_image})` : undefined,
                      backgroundColor: '#1C1B18',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* Rating badge — top-left */}
                    {hotel.star_rating && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          background: 'rgba(8,8,7,0.85)',
                          border: '1px solid rgba(200,169,110,0.3)',
                          color: cream,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '4px 9px',
                          borderRadius: 999,
                        }}
                      >
                        <span style={{ color: gold }}>★</span> {hotel.star_rating}
                      </span>
                    )}

                    {/* Price badge — top-right */}
                    {rate && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: gold,
                          color: '#080807',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          padding: '5px 11px',
                          borderRadius: 999,
                        }}
                      >
                        {rate.currency} {rate.amount.toLocaleString()}
                      </span>
                    )}

                    {hotel.is_featured && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 12,
                          left: 12,
                          fontFamily: "'Bebas Neue',sans-serif",
                          fontSize: '0.65rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#080807',
                          background: goldLight,
                          padding: '4px 10px',
                          borderRadius: 999,
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '18px 20px 20px' }}>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontWeight: 400,
                        fontSize: '1.25rem',
                        color: cream,
                        lineHeight: 1.2,
                        marginBottom: 4,
                      }}
                    >
                      {hotel.name}
                    </h3>
                    {hotel.address && (
                      <p style={{ color: dim, fontSize: '0.8rem', marginBottom: 10 }}>{hotel.address}</p>
                    )}

                    {/* Category + capacity tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                      {hotel.category && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: muted,
                            border: '1px solid rgba(200,169,110,0.2)',
                            borderRadius: 999,
                            padding: '3px 10px',
                          }}
                        >
                          {hotel.category.replace('_', ' ')}
                        </span>
                      )}
                      {capacity && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: muted,
                            border: '1px solid rgba(200,169,110,0.2)',
                            borderRadius: 999,
                            padding: '3px 10px',
                          }}
                        >
                          Sleeps up to {capacity}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        textAlign: 'center',
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#080807',
                        background: gold,
                        borderRadius: 6,
                        padding: '10px',
                      }}
                    >
                      View Details
                    </div>
                  </div>
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 48, flexWrap: 'wrap' }}>
            <Link
              href={pageHref(Math.max(1, page - 1))}
              aria-disabled={page <= 1}
              style={{
                pointerEvents: page <= 1 ? 'none' : 'auto',
                opacity: page <= 1 ? 0.35 : 1,
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: cream,
                border: '1px solid rgba(200,169,110,0.25)',
                borderRadius: 6,
                padding: '9px 16px',
                textDecoration: 'none',
              }}
            >
              ‹ Prev
            </Link>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('ellipsis')
                acc.push(p)
                return acc
              }, [])
              .map((p, i) =>
                p === 'ellipsis' ? (
                  <span key={`ellipsis-${i}`} style={{ color: dim, padding: '0 4px' }}>
                    …
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={pageHref(p)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 36,
                      height: 36,
                      borderRadius: 6,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      color: p === page ? '#080807' : cream,
                      background: p === page ? gold : 'transparent',
                      border: p === page ? 'none' : '1px solid rgba(200,169,110,0.2)',
                      fontWeight: p === page ? 600 : 400,
                    }}
                  >
                    {p}
                  </Link>
                )
              )}

            <Link
              href={pageHref(Math.min(totalPages, page + 1))}
              aria-disabled={page >= totalPages}
              style={{
                pointerEvents: page >= totalPages ? 'none' : 'auto',
                opacity: page >= totalPages ? 0.35 : 1,
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: cream,
                border: '1px solid rgba(200,169,110,0.25)',
                borderRadius: 6,
                padding: '9px 16px',
                textDecoration: 'none',
              }}
            >
              Next ›
            </Link>
          </div>
        )}
      </div>
      </HotelServiceStrip>
    </div>
  )
}
