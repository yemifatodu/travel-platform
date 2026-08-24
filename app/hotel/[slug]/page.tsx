import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import RoomsAndBooking from './RoomsAndBooking'

export const dynamic = 'force-dynamic'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

type Room = {
  id: string
  name: string
  room_type: string | null
  description: string | null
  max_occupancy: number
  base_price: number
  currency: string
  images: string[] | null
  amenities: string[] | null
}

type HotelDetail = {
  id: string
  name: string
  slug: string
  category: string | null
  star_rating: number | null
  description: string | null
  address: string | null
  cover_image: string | null
  gallery: string[] | null
  amenities: string[] | null
  avg_rating: number | null
  review_count: number | null
  check_in_time: string | null
  check_out_time: string | null
  phone: string | null
  email: string | null
  website: string | null
  rooms: Room[]
}

async function getHotel(slug: string): Promise<HotelDetail | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('hotels')
    .select(
      'id, name, slug, category, star_rating, description, address, cover_image, gallery, amenities, avg_rating, review_count, check_in_time, check_out_time, phone, email, website, rooms(id, name, room_type, description, max_occupancy, base_price, currency, images, amenities)'
    )
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !data) return null
  return data as HotelDetail
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const hotel = await getHotel(params.slug)
  if (!hotel) return { title: 'Stay not found | Huuboi' }
  return {
    title: `${hotel.name} | Huuboi`,
    description: hotel.description?.slice(0, 155) ?? `Book ${hotel.name} on Huuboi.`,
  }
}

export default async function HotelDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { booking?: string; booking_id?: string; checkIn?: string; checkOut?: string; guests?: string }
}) {
  const hotel = await getHotel(params.slug)
  if (!hotel) notFound()

  const bookingStatus = searchParams.booking

  return (
    <div style={{ background: '#080807', minHeight: '100vh' }}>
      {/* Cover */}
      <div
        style={{
          height: 360,
          backgroundImage: hotel.cover_image ? `url(${hotel.cover_image})` : undefined,
          backgroundColor: '#1C1B18',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8,8,7,0.95), rgba(8,8,7,0.1))',
          }}
        />
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {hotel.star_rating && (
            <span style={{ color: gold, fontSize: '0.9rem', display: 'block', marginBottom: 6 }}>
              {'★'.repeat(hotel.star_rating)}
            </span>
          )}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              color: cream,
            }}
          >
            {hotel.name}
          </h1>
          {hotel.address && <p style={{ color: muted, marginTop: 6, fontSize: '0.95rem' }}>{hotel.address}</p>}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px', display: 'grid', gridTemplateColumns: '1fr', gap: 48 }}>
        {bookingStatus === 'success' && (
          <div
            style={{
              background: 'rgba(200,169,110,0.08)',
              border: '1px solid rgba(200,169,110,0.3)',
              borderRadius: 8,
              padding: '16px 20px',
            }}
          >
            <p style={{ color: gold, fontSize: '0.95rem', fontWeight: 500, marginBottom: 4 }}>
              Booking confirmed
            </p>
            <p style={{ color: muted, fontSize: '0.85rem' }}>
              Payment received — a confirmation has been sent to your account. We can't wait to host you.
            </p>
          </div>
        )}
        {bookingStatus === 'cancelled' && (
          <div
            style={{
              background: 'rgba(224,138,122,0.08)',
              border: '1px solid rgba(224,138,122,0.25)',
              borderRadius: 8,
              padding: '16px 20px',
            }}
          >
            <p style={{ color: '#e08a7a', fontSize: '0.95rem', fontWeight: 500, marginBottom: 4 }}>
              Checkout cancelled
            </p>
            <p style={{ color: muted, fontSize: '0.85rem' }}>
              No payment was taken. Feel free to pick your dates again whenever you're ready.
            </p>
          </div>
        )}

        {/* Description */}
        {hotel.description && (
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.7, maxWidth: 780, fontWeight: 300 }}>
            {hotel.description}
          </p>
        )}

        {/* Contact & Policies */}
        {(hotel.phone || hotel.email || hotel.website || hotel.check_in_time || hotel.check_out_time) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {(hotel.phone || hotel.email || hotel.website) && (
              <div
                style={{
                  background: '#111110',
                  border: '1px solid rgba(200,169,110,0.12)',
                  borderRadius: 10,
                  padding: '18px 20px',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: gold,
                    marginBottom: 12,
                  }}
                >
                  Contact Information
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem', color: muted }}>
                  {hotel.phone && <span>{hotel.phone}</span>}
                  {hotel.email && <span>{hotel.email}</span>}
                  {hotel.website && (
                    <a href={hotel.website} target="_blank" rel="noopener noreferrer" style={{ color: gold, textDecoration: 'underline' }}>
                      {hotel.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </div>
            )}
            {(hotel.check_in_time || hotel.check_out_time) && (
              <div
                style={{
                  background: '#111110',
                  border: '1px solid rgba(200,169,110,0.12)',
                  borderRadius: 10,
                  padding: '18px 20px',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: gold,
                    marginBottom: 12,
                  }}
                >
                  Hotel Policies
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem', color: muted }}>
                  {hotel.check_in_time && <span>Check-in: {hotel.check_in_time.slice(0, 5)}</span>}
                  {hotel.check_out_time && <span>Check-out: {hotel.check_out_time.slice(0, 5)}</span>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: gold,
                marginBottom: 14,
              }}
            >
              Amenities
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {hotel.amenities.map((a) => (
                <span
                  key={a}
                  style={{
                    fontSize: '0.8rem',
                    color: cream,
                    border: '1px solid rgba(200,169,110,0.2)',
                    borderRadius: 999,
                    padding: '6px 14px',
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Rooms */}
        <div>
          <p
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: gold,
              marginBottom: 14,
            }}
          >
            Available Rooms
          </p>
          <RoomsAndBooking
            rooms={hotel.rooms}
            hotelId={hotel.id}
            hotelName={hotel.name}
            hotelSlug={hotel.slug}
            initialCheckIn={searchParams.checkIn}
            initialCheckOut={searchParams.checkOut}
            initialGuests={searchParams.guests ? parseInt(searchParams.guests, 10) : undefined}
          />
        </div>
      </div>
    </div>
  )
}
