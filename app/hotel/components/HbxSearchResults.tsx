'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

type HbxHotel = {
  hbx_hotel_code: number
  name: string
  destination_name: string
  category: string
  min_rate: number
  currency: string
  cover_image: string | null
}

export default function HbxSearchResults({
  destination,
  checkIn,
  checkOut,
  adults,
}: {
  destination: string
  checkIn: string
  checkOut: string
  adults: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hotels, setHotels] = useState<HbxHotel[]>([])
  const [resolvingCode, setResolvingCode] = useState<number | null>(null)

  useEffect(() => {
    // Live search needs real dates — fall back to a near-future default
    // if the user searched by destination only, so the card still works.
    const today = new Date()
    const in14Days = new Date(today)
    in14Days.setDate(in14Days.getDate() + 14)
    const in15Days = new Date(in14Days)
    in15Days.setDate(in15Days.getDate() + 1)
    const fmt = (d: Date) => d.toISOString().slice(0, 10)

    let cancelled = false
    setLoading(true)
    setError(null)

    fetch('/api/hbx/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination,
        check_in: checkIn || fmt(in14Days),
        check_out: checkOut || fmt(in15Days),
        adults: adults ? parseInt(adults, 10) : 2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data.error) {
          setError(data.error)
          return
        }
        setHotels(data.hotels ?? [])
      })
      .catch(() => {
        if (!cancelled) setError('Could not search live availability right now.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [destination, checkIn, checkOut, adults])

  async function handleSelect(hotel: HbxHotel) {
    setResolvingCode(hotel.hbx_hotel_code)
    try {
      const res = await fetch('/api/hbx/resolve-hotel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hbx_hotel_code: hotel.hbx_hotel_code,
          name: hotel.name,
          destination_name: hotel.destination_name,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.slug) throw new Error(data.error || 'Could not open this hotel.')

      const params = new URLSearchParams()
      if (checkIn) params.set('checkIn', checkIn)
      if (checkOut) params.set('checkOut', checkOut)
      if (adults) params.set('guests', adults)
      router.push(`/hotel/${data.slug}${params.toString() ? `?${params.toString()}` : ''}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong opening this hotel.')
      setResolvingCode(null)
    }
  }

  if (loading) {
    return (
      <p style={{ color: dim, fontSize: '0.9rem', textAlign: 'center', padding: '24px 0' }}>
        Searching live availability in {destination}…
      </p>
    )
  }

  if (error) {
    return (
      <p style={{ color: '#e08a7a', fontSize: '0.9rem', textAlign: 'center', padding: '24px 0' }}>{error}</p>
    )
  }

  if (!hotels.length) {
    return null
  }

  return (
    <div style={{ marginBottom: 48 }}>
      <p
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: gold,
          marginBottom: 16,
        }}
      >
        Live Availability in {destination}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {hotels.map((hotel) => (
          <button
            key={hotel.hbx_hotel_code}
            type="button"
            onClick={() => handleSelect(hotel)}
            disabled={resolvingCode !== null}
            style={{
              textAlign: 'left',
              display: 'block',
              background: '#111110',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(200,169,110,0.12)',
              cursor: resolvingCode !== null ? 'wait' : 'pointer',
              padding: 0,
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
              {hotel.category && (
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(8,8,7,0.85)',
                    border: '1px solid rgba(200,169,110,0.3)',
                    color: cream,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 9px',
                    borderRadius: 999,
                  }}
                >
                  {hotel.category}
                </span>
              )}
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
                {hotel.currency} {hotel.min_rate.toLocaleString()}
              </span>
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
              <p style={{ color: dim, fontSize: '0.8rem', marginBottom: 14 }}>{hotel.destination_name}</p>
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
                {resolvingCode === hotel.hbx_hotel_code ? 'Opening…' : 'View Details'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
