'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DateField from './DateField'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.45)'

const labelStyle: React.CSSProperties = {
  fontSize: '0.62rem',
  color: gold,
  fontFamily: "'Bebas Neue',sans-serif",
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  background: 'transparent',
  border: 'none',
  color: cream,
  padding: 0,
  fontSize: '0.92rem',
  fontFamily: "'DM Sans',sans-serif",
  outline: 'none',
}

const cardStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(200,169,110,0.22)',
  borderRadius: 6,
  padding: '12px 16px',
  transition: 'border-color 0.2s ease',
}

export default function HotelSearchBar({
  initialDestination = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialAdults = '1',
  initialChildren = '0',
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

  const hasFilters =
    destination || checkIn || checkOut || (adults && adults !== '1') || (children && children !== '0')

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
    setAdults('1')
    setChildren('0')
    router.push('/hotel')
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#111110',
          border: '1px solid rgba(200,169,110,0.15)',
          borderRadius: 8,
          padding: 16,
          display: 'grid',
          gridTemplateColumns: '2.2fr 1fr 1fr 0.8fr 0.8fr auto',
          gap: 12,
          alignItems: 'stretch',
        }}
        className="hotel-search-form"
      >
        <div style={cardStyle}>
          <span style={labelStyle}>Destination</span>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
            style={inputStyle}
          />
        </div>

        <div style={cardStyle}>
          <DateField
            label="Check-in"
            value={checkIn}
            onChange={setCheckIn}
            min={new Date().toISOString().slice(0, 10)}
          />
        </div>
        <div style={cardStyle}>
          <DateField
            label="Check-out"
            value={checkOut}
            onChange={setCheckOut}
            min={checkIn || new Date().toISOString().slice(0, 10)}
          />
        </div>

        <div style={cardStyle}>
          <span style={labelStyle}>Adults</span>
          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={cardStyle}>
          <span style={labelStyle}>Children</span>
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="submit"
            style={{
              flex: 1,
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#080807',
              background: gold,
              border: 'none',
              borderRadius: 6,
              padding: '0 24px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s ease',
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
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: cream,
                background: 'transparent',
                border: '1px solid rgba(200,169,110,0.3)',
                borderRadius: 6,
                padding: '0 16px',
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
        .hotel-search-form > div:hover {
          border-color: rgba(200,169,110,0.5);
        }
        .hotel-search-form button:hover {
          filter: brightness(1.08);
        }
        @media (max-width: 900px) {
          .hotel-search-form {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
