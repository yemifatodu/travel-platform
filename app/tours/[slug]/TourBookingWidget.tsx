'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import DateField from '../../hotel/components/DateField'

const gold = '#C8A96E'
const goldLight = '#E2C98A'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function TourBookingWidget({
  tourId,
  tourName,
  tourSlug,
  basePrice,
  currency,
  maxGroupSize,
}: {
  tourId: string
  tourName: string
  tourSlug: string
  basePrice: number
  currency: string
  maxGroupSize: number | null
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isResuming = searchParams.get('resume') === '1'
  const resumeAttempted = useRef(false)

  const [date, setDate] = useState((isResuming && searchParams.get('date')) || todayISO())
  const [participants, setParticipants] = useState(
    (isResuming && Number(searchParams.get('participants'))) || 2
  )
  const [couponCode, setCouponCode] = useState('')
  const [couponOpen, setCouponOpen] = useState(false)
  const [couponStatus, setCouponStatus] = useState<{ valid: boolean; message: string; discount?: number } | null>(null)
  const [checkingCoupon, setCheckingCoupon] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subtotal = basePrice * participants
  const discount = couponStatus?.valid ? couponStatus.discount ?? 0 : 0
  const total = Math.max(0, subtotal - discount)

  async function checkCoupon() {
    if (!couponCode.trim()) return
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
        setCouponStatus({ valid: true, message: `Code applied — ${data.discount_type === 'percentage' ? `${data.discount_value}% off` : `${currency} ${data.discount_value} off`}`, discount: data.discount_amount })
      } else {
        setCouponStatus({ valid: false, message: data.error || "That code isn't valid." })
      }
    } catch {
      setCouponStatus({ valid: false, message: 'Could not check that code — try again.' })
    } finally {
      setCheckingCoupon(false)
    }
  }

  async function startCheckout(d: string, p: number, code: string | null) {
    const res = await fetch('/api/tour-bookings/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tour_id: tourId,
        tour_name: tourName,
        tour_slug: tourSlug,
        date: d,
        participants: p,
        unit_price: basePrice,
        currency,
        coupon_code: code,
      }),
    })
    const data = await res.json()
    if (!res.ok || !data.url) throw new Error(data.error || 'Could not start checkout.')
    window.location.href = data.url
  }

  useEffect(() => {
    if (!isResuming || resumeAttempted.current) return
    resumeAttempted.current = true
    ;(async () => {
      const supabase = createClientComponentClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      router.replace(`/tours/${tourSlug}`)
      if (!user) return
      setLoading(true)
      try {
        await startCheckout(date, participants, couponStatus?.valid ? couponCode.trim() : null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong resuming your booking.')
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResuming])

  async function handleBook() {
    setError(null)
    if (maxGroupSize && participants > maxGroupSize) {
      setError(`This experience takes up to ${maxGroupSize} participants.`)
      return
    }
    setLoading(true)
    try {
      const supabase = createClientComponentClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        const resumeUrl = `/tours/${tourSlug}?resume=1&date=${date}&participants=${participants}`
        window.location.href = `/auth/login?redirect=${encodeURIComponent(resumeUrl)}`
        return
      }

      await startCheckout(date, participants, couponStatus?.valid ? couponCode.trim() : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', borderRadius: 12, padding: '22px 22px 24px', position: 'sticky', top: 24 }}>
      <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: gold, marginBottom: 16 }}>
        Book This Experience
      </p>

      <label style={{ fontSize: '0.7rem', color: muted, display: 'block', marginBottom: 14 }}>
        <span style={{ display: 'block', marginBottom: 6, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Date</span>
        <DateField label="" value={date} onChange={setDate} min={todayISO()} />
      </label>

      <label style={{ fontSize: '0.7rem', color: muted, display: 'block', marginBottom: 16 }}>
        <span style={{ display: 'block', marginBottom: 6, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Participants</span>
        <input
          type="number"
          min={1}
          max={maxGroupSize || undefined}
          value={participants}
          onChange={(e) => setParticipants(Number(e.target.value))}
          style={{ display: 'block', width: '100%', background: '#080807', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 6, color: cream, padding: '10px 12px', fontSize: '0.9rem' }}
        />
      </label>

      {!couponOpen ? (
        <button type="button" onClick={() => setCouponOpen(true)} style={{ fontSize: '0.78rem', color: muted, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, marginBottom: 16, display: 'block' }}>
          Have a promo code?
        </button>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => { setCouponCode(e.target.value); setCouponStatus(null) }}
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

      <div style={{ borderTop: '1px solid rgba(200,169,110,0.15)', paddingTop: 14, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: muted, marginBottom: discount > 0 ? 4 : 0 }}>
          <span>{currency} {basePrice.toLocaleString()} × {participants}</span>
          <span>{currency} {subtotal.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(160,210,170,0.9)', marginBottom: 4 }}>
            <span>Discount</span>
            <span>-{currency} {discount.toLocaleString()}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8 }}>
          <span style={{ color: muted, fontSize: '0.85rem' }}>Total</span>
          <span style={{ color: gold, fontSize: '1.3rem', fontWeight: 500 }}>{currency} {total.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handleBook}
        disabled={loading}
        style={{ width: '100%', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#080807', background: loading ? dim : gold, border: 'none', borderRadius: 6, padding: '14px 24px', cursor: loading ? 'not-allowed' : 'pointer' }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = goldLight }}
        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = gold }}
      >
        {loading ? 'Redirecting…' : 'Book & Pay'}
      </button>

      <p style={{ textAlign: 'center', color: dim, fontSize: '0.72rem', marginTop: 12 }}>Secure checkout via Stripe · Instant confirmation</p>

      {error && <p style={{ color: '#e08a7a', fontSize: '0.8rem', marginTop: 10 }}>{error}</p>}
    </div>
  )
}
