'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DateField from './DateField'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: 6,
  background: '#080807',
  border: '1px solid rgba(200,169,110,0.25)',
  borderRadius: 6,
  color: cream,
  padding: '10px 12px',
  fontSize: '0.9rem',
  fontFamily: "'DM Sans',sans-serif",
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: muted,
  fontFamily: "'Bebas Neue',sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

export default function HotelSearchBar({
  initialDestination = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialAdults = '',
  initialChildren = '',
}: {
  initialDestination?: string
  initialCheckIn?: string
  initialCheckOut?: string
  initialAdults?: string
  initialChildren?: string
}) {
  const router = useRouter()
  const [destination, setDestination] = useState(initialDestination)
  const [checkIn, setCheckIn] = useState(initialCheckIn)
  const [checkOut, setCheckOut] = useState(initialCheckOut)
  const [adults, setAdults] = useState(initialAdults)
  const [children, setChildren] = useState(initialChildren)

  const hasFilters = destination || checkIn || checkOut || adults || children

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (destination) params.set('destination', destination)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    if (adults) params.set('adults', adults)
    if (children) params.set('children', children)
    router.push(`/hotel${params.toString() ? `?${params.toString()}` : ''}`)
  }

  function handleClear() {
    setDestination('')
    setCheckIn('')
    setCheckOut('')
    setAdults('')
    setChildren('')
    router.push('/hotel')
  }

  return (
    <div style={{ maxWidth: 1000, margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#111110',
          border: '1px solid rgba(200,169,110,0.2)',
          borderRadius: 12,
          padding: 20,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 0.7fr 0.7fr auto',
          gap: 12,
          alignItems: 'end',
        }}
        className="hotel-search-form"
      >
        <label style={labelStyle}>
          Destination
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
            style={inputStyle}
          />
        </label>

        <DateField label="Check-in" value={checkIn} onChange={setCheckIn} min={new Date().toISOString().slice(0, 10)} />
        <DateField label="Check-out" value={checkOut} onChange={setCheckOut} min={checkIn || new Date().toISOString().slice(0, 10)} />

        <label style={labelStyle}>
          Adults
          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            placeholder="1"
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Children
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            placeholder="0"
            style={inputStyle}
          />
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="submit"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#080807',
              background: gold,
              border: 'none',
              borderRadius: 6,
              padding: '11px 20px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Search
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: cream,
                background: 'transparent',
                border: '1px solid rgba(200,169,110,0.25)',
                borderRadius: 6,
                padding: '11px 16px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Clear
            </button>
          )}
        </div>
      </form>

      <style>{`
        @media (max-width: 900px) {
          .hotel-search-form {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
