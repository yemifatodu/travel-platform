'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const isResuming = searchParams.get('resume') === '1'
  const resumeAttempted = useRef(false)

  const [selectedRoomId, setSelectedRoomId] = useState(
    (isResuming && searchParams.get('room')) || rooms[0]?.id || ''
  )
  const [checkIn, setCheckIn] = useState((isResuming && searchParams.get('checkIn')) || initialCheckIn || todayISO())
  const [checkOut, setCheckOut] = useState((isResuming && searchParams.get('checkOut')) || initialCheckOut || tomorrowISO())
  const [guests, setGuests] = useState(
    (isResuming && Number(searchParams.get('guests'))) || initialGuests || 2
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [couponOpen, setCouponOpen] = useState(false)
  const [couponStatus, setCouponStatus] = useState<{ valid: boolean; message: string; discount?: number } | null>(null)
  const [checkingCoupon, setCheckingCoupon] = useState(false)

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) ?? rooms[0]
  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut])
  const subtotal = selectedRoom ? nights * selectedRoom.base_price : 0
  const discount = couponStatus?.valid ? couponStatus.discount ?? 0 : 0
  const total = Math.max(0, subtotal - discount)

  async function checkCoupon() {
    if (!couponCode.trim() || !selectedRoom) return
    setCheckingCoupon(true)
    setCouponStatus(null)
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), order_value: subtotal }),
      })
      const data = await res.json()
      if (data.valid) {
        setCouponStatus({
          valid: true,
          message: `Code applied — ${data.discount_type === 'percentage' ? `${data.discount_value}% off` : `${selectedRoom.currency} ${data.discount_value} off`}`,
          discount: data.discount_amount,
        })
      } else {
        setCouponStatus({ valid: false, message: data.error || "That code isn't valid." })
      }
    } catch {
      setCouponStatus({ valid: false, message: 'Could not check that code — try again.' })
    } finally {
      setCheckingCoupon(false)
    }
  }

  async function startCheckout(room: Room, ci: string, co: string, g: number, code: string | null) {
    const n = nightsBetween(ci, co)
    const res = await fetch('/api/hotel-bookings/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hotel_id: hotelId,
        hotel_name: hotelName,
        hotel_slug: hotelSlug,
        room_id: room.id,
        room_name: room.name,
        check_in: ci,
        check_out: co,
        guests: g,
        nights: n,
        unit_price: room.base_price,
        currency: room.currency,
        coupon_code: code,
      }),
    })
    const data = await res.json()
    if (!res.ok || !data.url) throw new Error(data.error || 'Could not start checkout.')
    window.location.href = data.url
  }

  // If we just came back from auth with resume=1, and a session now exists,
  // pick up exactly where the guest left off and go straight to Stripe —
  // no second click required.
  useEffect(() => {
    if (!isResuming || resumeAttempted.current || !selectedRoom) return
    resumeAttempted.current = true

    ;(async () => {
      const supabase = createClientComponentClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Strip resume params from the URL either way, so a refresh or back
      // navigation doesn't re-trigger checkout automatically.
      router.replace(`/hotel/${hotelSlug}`)

      if (!user) return // still not authenticated somehow; let them click normally

      setLoading(true)
      try {
        await startCheckout(selectedRoom, checkIn, checkOut, guests, couponStatus?.valid ? couponCode.trim() : null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong resuming your booking.')
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResuming, selectedRoom])

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
        const resumeUrl = `/hotel/${hotelSlug}?resume=1&room=${selectedRoom.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
        window.location.href = `/auth/login?redirect=${encodeURIComponent(resumeUrl)}`
        return
      }

      await startCheckout(selectedRoom, checkIn, checkOut, guests, couponStatus?.valid ? couponCode.trim() : null)
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

        {!couponOpen ? (
          <button
            type="button"
            onClick={() => setCouponOpen(true)}
            style={{ fontSize: '0.78rem', color: muted, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, marginBottom: 18, display: 'block' }}
          >
            Have a promo code?
          </button>
        ) : (
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value)
                  setCouponStatus(null)
                }}
                placeholder="Promo code"
                style={{ flex: 1, background: '#080807', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 6, color: cream, padding: '9px 12px', fontSize: '0.85rem', textTransform: 'uppercase' }}
              />
              <button
                type="button"
                onClick={checkCoupon}
                disabled={checkingCoupon || !couponCode.trim()}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold, background: 'transparent', border: '1px solid rgba(200,169,110,0.3)', borderRadius: 6, padding: '0 16px', cursor: 'pointer' }}
              >
                {checkingCoupon ? '...' : 'Apply'}
              </button>
            </div>
            {couponStatus && (
              <p style={{ fontSize: '0.75rem', marginTop: 6, color: couponStatus.valid ? 'rgba(160,210,170,0.9)' : '#e08a7a' }}>
                {couponStatus.message}
              </p>
            )}
          </div>
        )}

        <div
          style={{
            borderTop: '1px solid rgba(200,169,110,0.15)',
            paddingTop: 14,
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: discount > 0 ? 4 : 0 }}>
            <span style={{ color: muted, fontSize: '0.85rem' }}>
              {nights > 0 ? `${selectedRoom.currency} ${selectedRoom.base_price.toLocaleString()} × ${nights} night${nights !== 1 ? 's' : ''}` : 'Select your dates'}
            </span>
            <span style={{ color: discount > 0 ? muted : gold, fontSize: discount > 0 ? '0.9rem' : '1.3rem', fontWeight: 500 }}>
              {nights > 0 ? `${selectedRoom.currency} ${subtotal.toLocaleString()}` : '—'}
            </span>
          </div>
          {discount > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(160,210,170,0.9)', marginBottom: 8 }}>
                <span>Discount</span>
                <span>-{selectedRoom.currency} {discount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ color: muted, fontSize: '0.85rem' }}>Total</span>
                <span style={{ color: gold, fontSize: '1.3rem', fontWeight: 500 }}>{selectedRoom.currency} {total.toLocaleString()}</span>
              </div>
            </>
          )}
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
