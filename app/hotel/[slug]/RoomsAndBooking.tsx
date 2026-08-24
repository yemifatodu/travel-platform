'use client'

import { useState, useMemo } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import DateField from '../components/DateField'

const gold = '#C8A96E'
const goldLight = '#E2C98A'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

type Room = {
  id: string
  name: string
  room_type: string | null
  max_occupancy: number
  base_price: number
  currency: string
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function tomorrowISO() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

function nightsBetween(checkIn: string, checkOut: string) {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime()
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)))
}

const dateInputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: 6,
  background: '#080807',
  border: '1px solid rgba(200,169,110,0.25)',
  borderRadius: 6,
  color: cream,
  padding: '10px 12px',
  fontSize: '0.9rem',
  colorScheme: 'dark',
}

export default function RoomsAndBooking({
  rooms,
  hotelId,
  hotelName,
  hotelSlug,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
}: {
  rooms: Room[]
  hotelId: string
  hotelName: string
  hotelSlug: string
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
}) {
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id ?? '')
  const [checkIn, setCheckIn] = useState(initialCheckIn || todayISO())
  const [checkOut, setCheckOut] = useState(initialCheckOut || tomorrowISO())
  const [guests, setGuests] = useState(initialGuests || 2)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) ?? rooms[0]
  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut])
  const total = selectedRoom ? nights * selectedRoom.base_price : 0

  async function handleBook() {
    setError(null)
    if (!selectedRoom) return

    if (nights < 1) {
      setError('Check-out must be after check-in.')
      return
    }
    if (guests > selectedRoom.max_occupancy) {
      setError(`This room sleeps up to ${selectedRoom.max_occupancy} guests.`)
      return
    }

    setLoading(true)
    try {
      const supabase = createClientComponentClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = `/auth/login?redirect=${encodeURIComponent(`/hotel/${hotelSlug}`)}`
        return
      }

      const res = await fetch('/api/hotel-bookings/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotel_id: hotelId,
          hotel_name: hotelName,
          hotel_slug: hotelSlug,
          room_id: selectedRoom.id,
          room_name: selectedRoom.name,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          nights,
          unit_price: selectedRoom.base_price,
          total_price: total,
          currency: selectedRoom.currency,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Could not start checkout.')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  if (!rooms.length || !selectedRoom) {
    return <p style={{ color: dim, fontSize: '0.9rem' }}>No rooms currently listed for this property.</p>
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 1fr)',
        gap: 24,
        alignItems: 'start',
      }}
      className="hotel-rooms-booking-grid"
    >
      {/* Room list — click to select */}
      <div style={{ display: 'grid', gap: 12 }}>
        {rooms.map((room) => {
          const isSelected = room.id === selectedRoomId
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => setSelectedRoomId(room.id)}
              style={{
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                background: isSelected ? 'rgba(200,169,110,0.08)' : '#111110',
                border: isSelected ? `1px solid ${gold}` : '1px solid rgba(200,169,110,0.12)',
                borderRadius: 10,
                padding: '16px 18px',
                cursor: 'pointer',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <p style={{ color: cream, fontSize: '1rem', fontWeight: 500, marginBottom: 4 }}>{room.name}</p>
                <p style={{ color: dim, fontSize: '0.8rem' }}>
                  Sleeps {room.max_occupancy} · {room.room_type?.replace('_', ' ') ?? 'Room'}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ color: gold, fontSize: '1.05rem', fontWeight: 500 }}>
                  {room.currency} {room.base_price.toLocaleString()}
                  <span style={{ color: dim, fontSize: '0.75rem', fontWeight: 400 }}>/night</span>
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? gold : 'rgba(200,169,110,0.3)'}`,
                    background: isSelected ? gold : 'transparent',
                    flexShrink: 0,
                  }}
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* Single, shared booking summary */}
      <div
        style={{
          background: '#111110',
          border: '1px solid rgba(200,169,110,0.2)',
          borderRadius: 12,
          padding: '22px 22px 24px',
          position: 'sticky',
          top: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: gold }}>
            Booking Summary
          </p>
          <span
            style={{
              fontSize: '0.7rem',
              color: cream,
              border: '1px solid rgba(200,169,110,0.25)',
              borderRadius: 999,
              padding: '3px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            {selectedRoom.currency} {selectedRoom.base_price.toLocaleString()}/night
          </span>
        </div>

        <p style={{ color: cream, fontSize: '0.95rem', fontWeight: 500, marginBottom: 2 }}>{selectedRoom.name}</p>
        <p style={{ color: dim, fontSize: '0.8rem', marginBottom: 18 }}>
          Sleeps {selectedRoom.max_occupancy} · {selectedRoom.room_type?.replace('_', ' ') ?? 'Room'}
        </p>

        <p style={{ fontSize: '0.7rem', color: muted, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Select Dates
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <DateField label="Check-in" value={checkIn} onChange={setCheckIn} min={todayISO()} />
          <DateField label="Check-out" value={checkOut} onChange={setCheckOut} min={checkIn} />
        </div>

        <p style={{ fontSize: '0.7rem', color: muted, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Guests
        </p>
        <input
          type="number"
          min={1}
          max={selectedRoom.max_occupancy}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          style={{ ...dateInputStyle, marginTop: 0, marginBottom: 18 }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: '1px solid rgba(200,169,110,0.15)',
            paddingTop: 14,
            marginBottom: 16,
          }}
        >
          <span style={{ color: muted, fontSize: '0.85rem' }}>
            {nights > 0 ? `${selectedRoom.currency} ${selectedRoom.base_price.toLocaleString()} × ${nights} night${nights !== 1 ? 's' : ''}` : 'Select your dates'}
          </span>
          <span style={{ color: gold, fontSize: '1.3rem', fontWeight: 500 }}>
            {nights > 0 ? `${selectedRoom.currency} ${total.toLocaleString()}` : '—'}
          </span>
        </div>

        <button
          onClick={handleBook}
          disabled={loading || nights < 1}
          style={{
            width: '100%',
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#080807',
            background: loading ? dim : gold,
            border: 'none',
            borderRadius: 6,
            padding: '14px 24px',
            cursor: loading || nights < 1 ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!loading && nights >= 1) e.currentTarget.style.background = goldLight
          }}
          onMouseLeave={(e) => {
            if (!loading && nights >= 1) e.currentTarget.style.background = gold
          }}
        >
          {loading ? 'Redirecting…' : 'Book & Pay'}
        </button>

        <p style={{ textAlign: 'center', color: dim, fontSize: '0.72rem', marginTop: 12 }}>
          Secure checkout via Stripe · Instant confirmation
        </p>

        {error && <p style={{ color: '#e08a7a', fontSize: '0.8rem', marginTop: 10 }}>{error}</p>}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hotel-rooms-booking-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
