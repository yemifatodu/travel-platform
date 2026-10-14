'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DateField from './DateField'

const gold = '#C8A96E'
const cream = '#F5EFE4'

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

function Stepper({ label, value, min, max, onChange }: { label: string; value: string; min: number; max: number; onChange: (v: string) => void }) {
  const n = Number(value || min)
  return (
    <div>
      <span style={labelStyle}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button type="button" className="hsb-step" aria-label={`Decrease ${label}`} disabled={n <= min} onClick={() => onChange(String(Math.max(min, n - 1)))}>−</button>
        <span style={{ color: cream, fontSize: '0.95rem', minWidth: 16, textAlign: 'center' }}>{n}</span>
        <button type="button" className="hsb-step" aria-label={`Increase ${label}`} disabled={n >= max} onClick={() => onChange(String(Math.min(max, n + 1)))}>+</button>
      </div>
    </div>
  )
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

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <form
        onSubmit={handleSubmit}
        className="hotel-search-form"
        style={{
          background: '#111110',
          border: '2px solid rgba(200,169,110,0.6)',
          borderRadius: 12,
          padding: 6,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
          alignItems: 'stretch',
        }}
      >
        <div className="hsb-field">
          <span style={labelStyle}>Destination</span>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
            style={inputStyle}
          />
        </div>
        <div className="hsb-field">
          <DateField label="Check-in" value={checkIn} onChange={setCheckIn} min={today} />
        </div>
        <div className="hsb-field">
          <DateField label="Check-out" value={checkOut} onChange={setCheckOut} min={checkIn || today} />
        </div>
        <div className="hsb-field">
          <Stepper label="Adults" value={adults} min={1} max={8} onChange={setAdults} />
        </div>
        <div className="hsb-field">
          <Stepper label="Children" value={children} min={0} max={6} onChange={setChildren} />
        </div>
        <div className="hsb-actions">
          <button type="submit" className="hsb-search">Search</button>
          {hasFilters && (
            <button type="button" className="hsb-clear" onClick={handleClear}>Clear</button>
          )}
        </div>
      </form>

      <style>{`
        .hsb-field { padding: 14px 22px; border-right: 1px solid rgba(200,169,110,0.4); transition: box-shadow 0.2s ease; }
        .hsb-field:nth-child(5) { border-right: none; }
        .hsb-field:focus-within { box-shadow: inset 0 -2px 0 ${gold}; }
        .hsb-step { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(200,169,110,0.4); background: transparent; color: ${gold}; cursor: pointer; font-size: 1rem; line-height: 1; padding: 0; }
        .hsb-step:hover:not(:disabled) { background: rgba(200,169,110,0.15); }
        .hsb-step:disabled { opacity: 0.3; cursor: not-allowed; }
        .hsb-actions { display: flex; gap: 8px; padding: 4px; }
        .hsb-search { font-family: Bebas Neue,sans-serif; font-size: 0.85rem; letter-spacing: 0.16em; text-transform: uppercase; color: #080807; background: ${gold}; border: none; border-radius: 8px; padding: 0 32px; min-height: 56px; cursor: pointer; transition: background 0.2s ease; }
        .hsb-search:hover { background: #D8BB82; }
        .hsb-clear { font-family: Bebas Neue,sans-serif; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,239,228,0.6); background: transparent; border: 1px solid rgba(200,169,110,0.25); border-radius: 8px; padding: 0 16px; cursor: pointer; }
        .hsb-clear:hover { color: ${gold}; border-color: ${gold}; }
        @media (max-width: 860px) {
          .hotel-search-form { grid-template-columns: 1fr 1fr !important; }
          .hsb-field { border-right: none; border-bottom: 1px solid rgba(200,169,110,0.4); }
          .hsb-field:first-child { grid-column: 1 / -1; }
          .hsb-actions { grid-column: 1 / -1; }
          .hsb-search { flex: 1; }
        }
      `}</style>
    </div>
  )
}