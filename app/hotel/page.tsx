import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import HotelSearchBar from './components/HotelSearchBar'
import HotelServiceStrip from './components/HotelServiceStrip'
import SaveButton from './components/SaveButton'
import HbxSearchResults from './components/HbxSearchResults'

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
    <div className="min-h-screen bg-[#0A0A09] text-[#F5EFE4] font-sans selection:bg-[#C8A96E] selection:text-[#0A0A09]">
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-6 text-center bg-[radial-gradient(circle_at_30%_20%,#1C1B18,#0A0A09_70%)]">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="font-['Bebas_Neue'] text-xs tracking-[0.3em] uppercase text-[#C8A96E]">
            Global stays, booked with confidence
          </p>
          <h1 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[#F5EFE4]">
            Find Your Perfect <span className="italic text-[#C8A96E]">Dream Stay</span>
          </h1>
          <p className="text-lg md:text-xl text-[rgba(245,239,228,0.60)] font-light max-w-2xl mx-auto leading-relaxed">
            Discover extraordinary hotels, luxury resorts, and unique accommodations worldwide. 
            Book with confidence, stay with comfort, and create unforgettable memories.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 -mt-8 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <HotelSearchBar
            initialDestination={destination}
            initialCheckIn={checkIn}
            initialCheckOut={checkOut}
            initialAdults={adults}
            initialChildren={children}
          />
        </div>
      </div>

      {/* Live HBX Availability */}
      {destination && (
        <div className="max-w-5xl mx-auto px-4 md:px-6 mt-12">
          <HbxSearchResults
            destination={destination}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
          />
        </div>
      )}

      <HotelServiceStrip>
        {/* Section Heading */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 mt-16 mb-8 text-center">
          <h2 className="font-['Cormorant_Garamond'] font-light text-3xl md:text-4xl text-[#F5EFE4] mb-3">
            Latest Destinations
          </h2>
          <p className="text-sm text-[rgba(245,239,228,0.60)]">
            {totalCount > 0
              ? `${totalCount} stay${totalCount !== 1 ? 's' : ''} available${totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ''}`
              : 'Most recent stays added by our hosts'}
          </p>
        </div>

        {/* Hotel List - Efficient Horizontal Layout */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 pb-24 space-y-6">
          {hotels.length === 0 ? (
            <div className="text-center py-20 px-6 border border-[#C8A96E]/10 rounded-lg bg-[#111110]">
              <p className="font-['Cormorant_Garamond'] text-2xl text-[#F5EFE4] mb-3">
                {hasFilters ? 'No stays match your search' : 'No stays published yet'}
              </p>
              <p className="text-sm text-[rgba(245,239,228,0.60)]">
                {hasFilters ? 'Try a different destination or fewer guests.' : 'Check back soon — new properties are being added.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {hotels.map((hotel) => {
                const rate = lowestNightlyRate(hotel.rooms)
                const capacity = maxCapacity(hotel.rooms)
                const detailParams = new URLSearchParams()
                if (checkIn) detailParams.set('checkIn', checkIn)
                if (checkOut) detailParams.set('checkOut', checkOut)
                if (adults) detailParams.set('guests', adults)
                const detailHref = `/hotel/${hotel.slug}${detailParams.toString() ? `?${detailParams.toString()}` : ''}`

                return (
                  <Link
                    key={hotel.id}
                    href={detailHref}
                    className="group relative flex flex-col md:flex-row bg-[#111110] border border-[#C8A96E]/15 rounded-lg overflow-hidden hover:border-[#C8A96E]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out"
                  >
                    {/* Image Container */}
                    <div className="relative w-full md:w-80 lg:w-96 h-64 md:h-auto flex-shrink-0 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: hotel.cover_image ? `url(${hotel.cover_image})` : 'none', backgroundColor: '#1C1B18' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09]/60 to-transparent md:bg-gradient-to-r" />
                      
                      {/* Save Button positioned neatly on the image */}
                      <div className="absolute top-4 right-4 z-10">
                        <SaveButton
                          hotelId={hotel.id}
                          hotelName={hotel.name}
                          hotelImage={hotel.cover_image}
                        />
                      </div>

                      {/* Featured Badge */}
                      {hotel.is_featured && (
                        <span className="absolute bottom-4 left-4 font-['Bebas_Neue'] text-[10px] tracking-[0.2em] uppercase text-[#0A0A09] bg-[#E2C98A] px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Content Container - Expands naturally with text length */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Header: Name & Address */}
                        <div>
                          <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-light text-[#F5EFE4] leading-tight mb-2 group-hover:text-[#C8A96E] transition-colors">
                            {hotel.name}
                          </h3>
                          {hotel.address && (
                            <p className="text-sm text-[rgba(245,239,228,0.50)] flex items-center gap-2">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              {hotel.address}
                            </p>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {hotel.star_rating && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F5EFE4] bg-[#C8A96E]/10 border border-[#C8A96E]/20 px-3 py-1 rounded-full">
                              <span className="text-[#C8A96E]">★</span> {hotel.star_rating} Star
                            </span>
                          )}
                          {hotel.category && (
                            <span className="text-xs text-[rgba(245,239,228,0.70)] border border-[#C8A96E]/20 px-3 py-1 rounded-full capitalize">
                              {hotel.category.replace('_', ' ')}
                            </span>
                          )}
                          {capacity && (
                            <span className="text-xs text-[rgba(245,239,228,0.70)] border border-[#C8A96E]/20 px-3 py-1 rounded-full">
                              Sleeps up to {capacity}
                            </span>
                          )}
                        </div>

                        {/* Description snippet (if available) */}
                        {hotel.description && (
                          <p className="text-sm text-[rgba(245,239,228,0.60)] line-clamp-2 md:line-clamp-3 leading-relaxed">
                            {hotel.description}
                          </p>
                        )}
                      </div>

                      {/* Footer: Price & Action */}
                      <div className="mt-6 pt-6 border-t border-[#C8A96E]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {rate ? (
                          <div>
                            <p className="text-xs text-[rgba(245,239,228,0.50)] uppercase tracking-wider mb-1">Starting from</p>
                            <p className="text-2xl font-['Cormorant_Garamond'] text-[#C8A96E]">
                              {rate.currency} {rate.amount.toLocaleString()} <span className="text-sm text-[rgba(245,239,228,0.50)] font-sans font-light">/ night</span>
                            </p>
                          </div>
                        ) : (
                          <div className="text-sm text-[rgba(245,239,228,0.50)] italic">Price on request</div>
                        )}
                        
                        <span className="inline-flex items-center justify-center font-['Bebas_Neue'] text-sm tracking-[0.15em] uppercase text-[#0A0A09] bg-[#C8A96E] hover:bg-[#E2C98A] px-8 py-3 rounded transition-colors duration-300">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">
              <Link
                href={pageHref(Math.max(1, page - 1))}
                aria-disabled={page <= 1}
                className={`font-['Bebas_Neue'] text-sm tracking-[0.15em] uppercase px-5 py-2.5 rounded border border-[#C8A96E]/25 transition-all ${
                  page <= 1 ? 'text-[rgba(245,239,228,0.30)] pointer-events-none' : 'text-[#F5EFE4] hover:border-[#C8A96E] hover:bg-[#C8A96E]/5'
                }`}
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
                    <span key={`ellipsis-${i}`} className="text-[rgba(245,239,228,0.30)] px-2">…</span>
                  ) : (
                    <Link
                      key={p}
                      href={pageHref(p)}
                      className={`min-w-[36px] h-9 flex items-center justify-center rounded text-sm transition-all ${
                        p === page
                          ? 'bg-[#C8A96E] text-[#0A0A09] font-semibold'
                          : 'text-[#F5EFE4] border border-[#C8A96E]/20 hover:border-[#C8A96E] hover:bg-[#C8A96E]/5'
                      }`}
                    >
                      {p}
                    </Link>
                  )
                )}

              <Link
                href={pageHref(Math.min(totalPages, page + 1))}
                aria-disabled={page >= totalPages}
                className={`font-['Bebas_Neue'] text-sm tracking-[0.15em] uppercase px-5 py-2.5 rounded border border-[#C8A96E]/25 transition-all ${
                  page >= totalPages ? 'text-[rgba(245,239,228,0.30)] pointer-events-none' : 'text-[#F5EFE4] hover:border-[#C8A96E] hover:bg-[#C8A96E]/5'
                }`}
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