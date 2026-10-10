'use client'
import { ServiceStrip } from '@/components/layout/ServiceStrip'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const features = [
  'Fixed prices - no surge pricing or hidden fees',
  'Professional drivers in 120+ countries',
  'Instant booking confirmation',
  'Flight tracking - driver waits if delayed',
  'Free cancellation up to 24 hours before',
  'Meet & greet at arrivals with name board',
]

type Step = 'search' | 'availability' | 'details'

const money = (amount: number, currency = 'EUR') => {
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}

const prettyDate = (d: string) =>
  d
    ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : ''

const kindLabel = (type: string, code: string) =>
  type === 'IATA' ? `Airport ${code}` : type === 'PORT' ? `Port ${code}` : type === 'STATION' ? `Station ${code}` : 'City or zone'

const parseDescription = (text: string) => {
  const m = /Capacity:\s*([\d-]+)\s*pax\.\s*Provider:\s*(.*)$/.exec(text || '')
  if (!m) return { capacity: '', provider: '' }
  const upper = parseInt(m[1].split('-').pop() || '', 10)
  const capacity = Number.isNaN(upper) ? '' : upper > 30 ? 'Shared shuttle seats' : `Up to ${upper} passengers`
  return { capacity, provider: m[2].trim() }
}

const PersonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
)
const SwapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />
  </svg>
)
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l5 5L20 7" />
  </svg>
)
const CarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 16h14M6 16l1.5-5h9L18 16M7 19v-3M17 19v-3" />
  </svg>
)

function LocationField({ id, label, value, placeholder, suggestions, selectedCode, onChange, onPick, onClose }: any) {
  return (
    <div className="tr-field">
      <label htmlFor={id} className="tr-label">{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          className="tr-input"
          type="text"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onBlur={onClose}
          style={selectedCode ? { paddingRight: 64 } : undefined}
        />
        {selectedCode && <span className="tr-chip">{selectedCode}</span>}
        {suggestions.length > 0 && (
          <div className="tr-list" role="listbox">
            {suggestions.map((dest: any) => (
              <div
                key={`${dest.type}-${dest.code}`}
                className="tr-opt"
                role="option"
                aria-selected="false"
                onMouseDown={e => { e.preventDefault(); onPick(dest) }}
              >
                <span>{dest.name}</span>
                <span className="tr-opt-meta">{kindLabel(dest.type, dest.code)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TransfersPage() {
  const [step, setStep] = useState<Step>('search')
  const [loading, setLoading] = useState(false)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState<{ type: 'success' | 'cancelled'; ref: string } | null>(null)

  const [pickupQuery, setPickupQuery] = useState('')
  const [dropoffQuery, setDropoffQuery] = useState('')
  const [pickupId, setPickupId] = useState('')
  const [pickupType, setPickupType] = useState('')
  const [dropoffId, setDropoffId] = useState('')
  const [dropoffType, setDropoffType] = useState('')
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([])
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const [locationsFailed, setLocationsFailed] = useState(false)

  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [pax, setPax] = useState('2')
  const [vehicles, setVehicles] = useState<any[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null); const [passenger, setPassenger] = useState({ name: "", surname: "", email: "", phone: "" }); const [flight, setFlight] = useState("")

  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    fetch('/api/transfers/locations')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setLocations(data)
        else setLocationsFailed(true)
      })
      .catch(() => setLocationsFailed(true))
  }, [])

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const status = p.get('booking')
    if (status === 'success' || status === 'cancelled') {
      setNotice({ type: status, ref: (p.get('booking_id') || '').slice(0, 8) })
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const filterLocations = (query: string, which: 'pickup' | 'dropoff') => {
    const q = query.trim().toLowerCase()
    const matches =
      q.length < 1
        ? []
        : locations
            .filter(l => {
              if (which === 'dropoff' && pickupId && (l.code === pickupId || (pickupType !== "ATLAS" && l.type === pickupType))) return false
              return l.name.toLowerCase().includes(q) || l.code.toLowerCase() === q
            })
            .slice(0, 8)
    if (which === 'pickup') setPickupSuggestions(matches)
    else setDropoffSuggestions(matches)
  }

  useEffect(() => {
    if (locations.length === 0) return
    if (pickupQuery && !pickupId) filterLocations(pickupQuery, 'pickup')
    if (dropoffQuery && !dropoffId) filterLocations(dropoffQuery, 'dropoff')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations])

  const swap = () => {
    setPickupQuery(dropoffQuery)
    setDropoffQuery(pickupQuery)
    setPickupId(dropoffId)
    setDropoffId(pickupId)
    setPickupType(dropoffType)
    setDropoffType(pickupType)
    setPickupSuggestions([])
    setDropoffSuggestions([])
  }

  const changePax = (delta: number) => {
    const next = Math.min(16, Math.max(1, Number(pax) + delta))
    setPax(String(next))
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!pickupId || !dropoffId) {
      setError('Choose a pickup and a drop-off from the suggestions that appear as you type.')
      return
    }
    if (!date) {
      setError('Choose a travel date.')
      return
    }
    setLoading(true)
    try {
      const qs = new URLSearchParams({ pickupId, pickupType, dropoffId, dropoffType, date, time, pax })
      const res = await fetch(`/api/transfers/availability?${qs.toString()}`)
      const json = await res.json()
      if (json.success && Array.isArray(json.vehicles) && json.vehicles.length > 0) {
        setVehicles(json.vehicles)
        setStep('availability')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError(json.error || json.message || 'No vehicles are available for this route and date. Try a different date or time.')
      }
    } catch {
      setError("We could not reach the booking service. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePay = async () => {
    if (!selectedVehicle) return; if (!passenger.name.trim() || !passenger.surname.trim() || !passenger.email.trim() || !passenger.phone.trim()) { setError("Enter the lead passenger first name, last name, email and phone."); return } if (needsFlight && !flight.trim()) { setError("Enter the flight number so the driver can track your flight."); return }
    setError('')
    setPaying(true)
    try {
      const res = await fetch('/api/transfer-bookings/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transfer_id: selectedVehicle.id,
          transfer_name: selectedVehicle.vehicleName,
          pickup_location: pickupQuery,
          dropoff_location: dropoffQuery,
          pickup_date: date,
          pickup_time: time,
          guests: Number(pax),
          unit_price: selectedVehicle.price,
          currency: selectedVehicle.currency || 'EUR',
          hbx_transfer_rate_key: selectedVehicle.rateKey, passenger: { name: passenger.name.trim(), surname: passenger.surname.trim(), email: passenger.email.trim(), phone: passenger.phone.trim() }, flight_number: flight.trim(),
        }),
      })
      const json = await res.json()
      if (json.url) {
        window.location.href = json.url
      } else {
        setError(json.error || 'Checkout could not be started. Please try again.')
        setPaying(false)
      }
    } catch {
      setError('Something went wrong while starting checkout. Please try again.')
      setPaying(false)
    }
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'search', label: 'Route' },
    { key: 'availability', label: 'Vehicle' },
    { key: 'details', label: 'Pay' },
  ]
  const order: Step[] = ['search', 'availability', 'details']
  const needsFlight = pickupType === "IATA" || dropoffType === "IATA"; const selectedInfo = selectedVehicle ? parseDescription(selectedVehicle.description) : { capacity: '', provider: '' }

  return (
    <>
      <ServiceStrip exclude="/transfer" />
      <style>{`
        .tr-page{min-height:100vh;background:#080807;padding-top:90px;color:#F5EFE4;font-family:'DM Sans',sans-serif}
        .tr-wrap{max-width:1100px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
        .tr-hero{padding:clamp(40px,7vw,80px) 0 clamp(24px,4vw,40px);border-bottom:1px solid rgba(200,169,110,.12);background:linear-gradient(160deg,#0a0808,#100c08 60%,#080a10)}
        .tr-hero h1{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(2.3rem,6vw,4.4rem);line-height:1.04;margin:0 0 14px;color:#F5EFE4}
        .tr-hero p{color:rgba(245,239,228,.62);max-width:520px;line-height:1.7;margin:0;font-size:1.02rem}
        .tr-main{padding:clamp(24px,4vw,40px) 0 clamp(48px,7vw,80px)}
        .tr-steps{display:flex;gap:6px 22px;flex-wrap:wrap;margin:0 0 18px;padding:0;list-style:none}
        .tr-step{display:flex;align-items:center;gap:8px;font-size:.88rem;color:rgba(245,239,228,.38)}
        .tr-step.current{color:#F5EFE4;font-weight:600}
        .tr-step.done{color:rgba(245,239,228,.62)}
        .tr-num{width:22px;height:22px;border-radius:50%;border:1px solid rgba(245,239,228,.25);display:inline-flex;align-items:center;justify-content:center;font-size:.75rem}
        .tr-step.current .tr-num{background:#C8A96E;border-color:#C8A96E;color:#080807}
        .tr-step.done .tr-num{border-color:#C8A96E;color:#C8A96E}
        .tr-panel{background:#111110;border:1px solid rgba(200,169,110,.2);border-radius:8px;padding:clamp(16px,3vw,28px);animation:trIn .25s ease-out}
        @keyframes trIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @media (prefers-reduced-motion:reduce){.tr-panel{animation:none}}
        .tr-label{display:block;font-size:.8rem;font-weight:600;color:rgba(245,239,228,.62);margin-bottom:6px}
        .tr-input{width:100%;box-sizing:border-box;min-height:46px;background:#0d0d0c;border:1px solid rgba(200,169,110,.28);border-radius:6px;color:#F5EFE4;padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:.95rem;color-scheme:dark}
        .tr-input::placeholder{color:rgba(245,239,228,.35)}
        .tr-input:focus,.tr-btn:focus-visible,.tr-btn2:focus-visible,.tr-swap:focus-visible,.tr-pax button:focus-visible,.tr-link:focus-visible{outline:2px solid #C8A96E;outline-offset:2px}
        .tr-chip{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:.72rem;font-weight:600;color:#C8A96E;border:1px solid rgba(200,169,110,.4);border-radius:4px;padding:2px 7px}
        .tr-list{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#151412;border:1px solid rgba(200,169,110,.45);border-radius:6px;z-index:30;max-height:260px;overflow-y:auto}
        .tr-opt{display:flex;justify-content:space-between;gap:12px;padding:10px 14px;cursor:pointer;font-size:.92rem;border-bottom:1px solid rgba(200,169,110,.08)}
        .tr-opt:hover{background:rgba(200,169,110,.1)}
        .tr-opt-meta{color:rgba(245,239,228,.38);font-size:.78rem;white-space:nowrap}
        .tr-grid1{display:grid;grid-template-columns:1fr 44px 1fr;gap:12px;align-items:end;margin-bottom:14px}
        .tr-grid2{display:grid;grid-template-columns:1.3fr 1fr 1fr auto;gap:12px;align-items:end}
        .tr-swap{height:46px;width:44px;background:transparent;border:1px solid rgba(200,169,110,.28);border-radius:6px;color:#C8A96E;cursor:pointer;display:flex;align-items:center;justify-content:center}
        .tr-swap:hover{background:rgba(200,169,110,.1)}
        .tr-pax{display:flex;align-items:center;justify-content:space-between;min-height:46px;background:#0d0d0c;border:1px solid rgba(200,169,110,.28);border-radius:6px}
        .tr-pax button{width:42px;height:44px;background:transparent;border:0;color:#C8A96E;font-size:1.2rem;cursor:pointer}
        .tr-pax span{font-weight:600;min-width:24px;text-align:center}
        .tr-btn{background:#C8A96E;color:#080807;border:0;border-radius:6px;min-height:46px;padding:11px 24px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.95rem;cursor:pointer}
        .tr-btn:hover:not(:disabled){background:#D6B97F}
        .tr-btn:disabled{opacity:.55;cursor:not-allowed}
        .tr-btn2{background:transparent;color:#C8A96E;border:1px solid rgba(200,169,110,.5);border-radius:6px;min-height:40px;padding:8px 16px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.88rem;cursor:pointer}
        .tr-btn2:hover{background:rgba(200,169,110,.1)}
        .tr-link{background:none;border:0;color:#C8A96E;font-family:'DM Sans',sans-serif;font-size:.9rem;cursor:pointer;padding:6px 0;text-decoration:underline;text-underline-offset:3px}
        .tr-alert{margin-top:14px;border:1px solid rgba(224,120,100,.5);background:rgba(224,120,100,.08);color:#F0B5A8;padding:12px 14px;border-radius:6px;font-size:.9rem;line-height:1.5}
        .tr-notice{margin-bottom:18px;padding:14px 16px;border-radius:6px;font-size:.92rem;line-height:1.5;border:1px solid rgba(200,169,110,.5);background:rgba(200,169,110,.08)}
        .tr-ticket{padding:20px 24px;background:#111110;border:1px solid rgba(200,169,110,.2);border-radius:8px;margin-bottom:18px;animation:trIn .25s ease-out}
        .tr-route{display:flex;align-items:center;gap:18px}
        .tr-end{min-width:0}
        .tr-end.right{text-align:right}
        .tr-name{font-family:'Cormorant Garamond',serif;font-size:clamp(1.3rem,3.2vw,2rem);font-weight:400;line-height:1.1}
        .tr-kind{font-size:.78rem;color:rgba(245,239,228,.38);margin-top:4px}
        .tr-mid{flex:1;display:flex;align-items:center;gap:10px;color:#C8A96E;min-width:48px}
        .tr-dash{flex:1;border-top:1px dashed rgba(200,169,110,.5)}
        .tr-tmeta{display:flex;flex-wrap:wrap;align-items:center;gap:8px 22px;margin-top:16px;padding-top:16px;border-top:1px dashed rgba(200,169,110,.25);font-size:.88rem;color:rgba(245,239,228,.62)}
        .tr-tmeta .tr-btn2{margin-left:auto}
        .tr-count{font-size:.88rem;color:rgba(245,239,228,.62);margin:0 0 12px}
        .tr-row{display:grid;grid-template-columns:180px 1fr auto;gap:20px;align-items:center;background:#111110;border:1px solid rgba(200,169,110,.14);border-radius:8px;padding:14px;margin-bottom:10px;transition:border-color .2s}
        .tr-row:hover{border-color:rgba(200,169,110,.42)}
        .tr-thumb{background:#ECE6D8;border-radius:6px;height:110px;display:flex;align-items:center;justify-content:center;overflow:hidden}
        .tr-thumb img{max-width:100%;max-height:100%;object-fit:contain}
        .tr-thumb span{font-size:.78rem;color:#6b6558}
        .tr-row h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:500;margin:0 0 6px;color:#F5EFE4}
        .tr-meta{font-size:.88rem;color:rgba(245,239,228,.62);display:flex;align-items:center;gap:6px;margin-top:4px}
        .tr-buy{text-align:right;min-width:150px}
        .tr-price{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:500;line-height:1;color:#F5EFE4}
        .tr-pnote{font-size:.76rem;color:rgba(245,239,228,.38);margin:4px 0 10px}
        .tr-two{display:grid;grid-template-columns:1.15fr .85fr;gap:20px;align-items:start}
        .tr-h2{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:500;margin:0 0 18px}
        .tr-dl{display:grid;grid-template-columns:120px 1fr;gap:10px 16px;margin:0 0 18px;font-size:.93rem}
        .tr-dl dt{color:rgba(245,239,228,.38)}
        .tr-dl dd{margin:0;color:#F5EFE4}
        .tr-sum{position:sticky;top:110px}
        .tr-form{margin:0 0 18px}
        .tr-h3{font-family:"Cormorant Garamond",serif;font-size:1.3rem;font-weight:500;margin:0 0 12px}
        .tr-fgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        @media (max-width:560px){.tr-fgrid{grid-template-columns:1fr}}
        .tr-total{display:flex;justify-content:space-between;align-items:baseline;margin:16px 0;padding-top:16px;border-top:1px dashed rgba(200,169,110,.25)}
        .tr-sumnote{font-size:.8rem;color:rgba(245,239,228,.38);margin:12px 0 0;line-height:1.5}
        .tr-cta{margin-top:clamp(32px,5vw,56px);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;padding:22px 26px;background:rgba(200,169,110,.06);border:1px solid rgba(200,169,110,.2);border-radius:8px}
        .tr-cta a{background:#C8A96E;color:#080807;border-radius:6px;padding:11px 22px;font-weight:700;font-size:.9rem;text-decoration:none;white-space:nowrap}
        .tr-feat{list-style:none;margin:clamp(28px,4vw,44px) 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px 28px}
        .tr-feat li{display:flex;gap:10px;color:rgba(245,239,228,.62);font-size:.9rem;line-height:1.55}
        .tr-feat svg{flex-shrink:0;margin-top:5px;color:#C8A96E}
        @media (max-width:860px){
          .tr-row{grid-template-columns:1fr;gap:12px}
          .tr-thumb{height:150px}
          .tr-buy{text-align:left;min-width:0;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
          .tr-pnote{margin:0}
          .tr-two{grid-template-columns:1fr}
          .tr-sum{position:static}
        }
        @media (max-width:760px){
          .tr-grid1{grid-template-columns:1fr}
          .tr-swap{justify-self:start;transform:rotate(90deg)}
          .tr-grid2{grid-template-columns:1fr 1fr}
          .tr-grid2 .tr-go{grid-column:1/-1}
          .tr-route{gap:10px}
          .tr-tmeta .tr-btn2{margin-left:0}
        }
      `}</style>

      <div className="tr-page">
        <div className="tr-hero">
          <div className="tr-wrap">
            <h1>Airport transfers, priced up front</h1>
            <p>Choose a pickup, a drop-off and a time. Compare vehicles, see the full price, then pay securely.</p>
          </div>
        </div>

        <div className="tr-wrap tr-main">
          {notice && (
            <div className="tr-notice" role="status">
              {notice.type === 'success'
                ? `Payment received. We are confirming your transfer with the provider.${notice.ref ? ' Reference: ' + notice.ref + '.' : ''}`
                : 'Checkout was cancelled. Your card was not charged, and you can pick up where you left off.'}
            </div>
          )}

          <ol className="tr-steps" aria-label="Booking progress">
            {steps.map((s, i) => {
              const state = i < order.indexOf(step) ? 'done' : i === order.indexOf(step) ? 'current' : 'todo'
              return (
                <li key={s.key} className={`tr-step ${state}`} aria-current={state === 'current' ? 'step' : undefined}>
                  <span className="tr-num">{state === 'done' ? <CheckIcon /> : i + 1}</span>
                  {s.label}
                </li>
              )
            })}
          </ol>

          {step === 'search' && (
            <form className="tr-panel" onSubmit={handleSearch} noValidate>
              <div className="tr-grid1">
                <LocationField
                  id="tr-from"
                  label="From"
                  value={pickupQuery}
                  placeholder={locations.length === 0 && !locationsFailed ? 'Loading locations...' : 'Airport, port or station'}
                  suggestions={pickupSuggestions}
                  selectedCode={pickupId}
                  onChange={(v: string) => { setPickupQuery(v); setPickupId(''); setPickupType(''); filterLocations(v, 'pickup') }}
                  onPick={(d: any) => { setPickupId(d.code); setPickupType(d.type); setPickupQuery(d.name); setPickupSuggestions([]) }}
                  onClose={() => setPickupSuggestions([])}
                />
                <button type="button" className="tr-swap" onClick={swap} aria-label="Swap pickup and drop-off">
                  <SwapIcon />
                </button>
                <LocationField
                  id="tr-to"
                  label="To"
                  value={dropoffQuery}
                  placeholder={locations.length === 0 && !locationsFailed ? 'Loading locations...' : 'Hotel zone, city or terminal'}
                  suggestions={dropoffSuggestions}
                  selectedCode={dropoffId}
                  onChange={(v: string) => { setDropoffQuery(v); setDropoffId(''); setDropoffType(''); filterLocations(v, 'dropoff') }}
                  onPick={(d: any) => { setDropoffId(d.code); setDropoffType(d.type); setDropoffQuery(d.name); setDropoffSuggestions([]) }}
                  onClose={() => setDropoffSuggestions([])}
                />
              </div>

              <div className="tr-grid2">
                <div>
                  <label className="tr-label" htmlFor="tr-date">Date</label>
                  <input id="tr-date" className="tr-input" type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                  <label className="tr-label" htmlFor="tr-time">Pickup time</label>
                  <input id="tr-time" className="tr-input" type="time" value={time} onChange={e => setTime(e.target.value)} />
                </div>
                <div>
                  <span className="tr-label" id="tr-pax-label">Passengers</span>
                  <div className="tr-pax" role="group" aria-labelledby="tr-pax-label">
                    <button type="button" aria-label="Fewer passengers" onClick={() => changePax(-1)}>-</button>
                    <span aria-live="polite">{pax}</span>
                    <button type="button" aria-label="More passengers" onClick={() => changePax(1)}>+</button>
                  </div>
                </div>
                <button type="submit" className="tr-btn tr-go" disabled={loading || locations.length === 0}>
                  {loading ? 'Searching...' : 'Search transfers'}
                </button>
              </div>

              {locationsFailed && (
                <div className="tr-alert" role="alert">Locations could not be loaded. Refresh the page to try again.</div>
              )}
              {error && <div className="tr-alert" role="alert">{error}</div>}
            </form>
          )}

          {step === 'availability' && (
            <div>
              <div className="tr-ticket">
                <div className="tr-route">
                  <div className="tr-end">
                    <div className="tr-name">{pickupQuery}</div>
                    <div className="tr-kind">{kindLabel(pickupType, pickupId)}</div>
                  </div>
                  <div className="tr-mid" aria-hidden="true">
                    <span className="tr-dash" /><CarIcon /><span className="tr-dash" />
                  </div>
                  <div className="tr-end right">
                    <div className="tr-name">{dropoffQuery}</div>
                    <div className="tr-kind">{kindLabel(dropoffType, dropoffId)}</div>
                  </div>
                </div>
                <div className="tr-tmeta">
                  <span>{prettyDate(date)} at {time}</span>
                  <span>{pax} {Number(pax) === 1 ? 'passenger' : 'passengers'}</span>
                  <span>One way</span>
                  <button type="button" className="tr-btn2" onClick={() => { setError(''); setStep('search') }}>Change search</button>
                </div>
              </div>

              <p className="tr-count">{vehicles.length} vehicles available, lowest price first</p>

              {vehicles.map((v: any, i: number) => {
                const info = parseDescription(v.description)
                return (
                  <article key={`${v.id}-${i}`} className="tr-row">
                    <div className="tr-thumb">
                      {v.image ? <img src={v.image} alt={v.vehicleName} loading="lazy" /> : <span>No photo</span>}
                    </div>
                    <div>
                      <h3>{v.vehicleName}</h3>
                      {info.capacity && <div className="tr-meta"><PersonIcon />{info.capacity}</div>}
                      {info.provider && <div className="tr-meta">Operated by {info.provider}</div>}
                    </div>
                    <div className="tr-buy">
                      <div>
                        <div className="tr-price">{money(v.price, v.currency || 'EUR')}</div>
                        <div className="tr-pnote">One way, per vehicle</div>
                      </div>
                      <button
                        type="button"
                        className="tr-btn"
                        onClick={() => { setSelectedVehicle(v); setError(''); setStep('details'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      >
                        Select
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {step === 'details' && selectedVehicle && (
            <div className="tr-two">
              <section className="tr-panel">
                <h2 className="tr-h2">Review your transfer</h2>
                <dl className="tr-dl">
                  <dt>Pickup</dt><dd>{pickupQuery}</dd>
                  <dt>Drop-off</dt><dd>{dropoffQuery}</dd>
                  <dt>Date</dt><dd>{prettyDate(date)}</dd>
                  <dt>Pickup time</dt><dd>{time}</dd>
                  <dt>Passengers</dt><dd>{pax}</dd>
                  <dt>Trip</dt><dd>One way</dd>
                </dl>
                <div className="tr-form">
                  <h3 className="tr-h3">Lead passenger</h3>
                  <div className="tr-fgrid">
                    <div>
                      <label className="tr-label" htmlFor="tr-fn">First name</label>
                      <input id="tr-fn" className="tr-input" autoComplete="given-name" value={passenger.name} onChange={e => setPassenger({ ...passenger, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="tr-label" htmlFor="tr-ln">Last name</label>
                      <input id="tr-ln" className="tr-input" autoComplete="family-name" value={passenger.surname} onChange={e => setPassenger({ ...passenger, surname: e.target.value })} />
                    </div>
                    <div>
                      <label className="tr-label" htmlFor="tr-em">Email</label>
                      <input id="tr-em" className="tr-input" type="email" autoComplete="email" value={passenger.email} onChange={e => setPassenger({ ...passenger, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="tr-label" htmlFor="tr-ph">Phone, with country code</label>
                      <input id="tr-ph" className="tr-input" type="tel" autoComplete="tel" placeholder="+34 600 000 000" value={passenger.phone} onChange={e => setPassenger({ ...passenger, phone: e.target.value })} />
                    </div>
                    {needsFlight && (
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label className="tr-label" htmlFor="tr-fl">{String(selectedVehicle.rateKey || "").startsWith("DEPARTURE") ? "Departing flight number" : "Arriving flight number"}</label>
                        <input id="tr-fl" className="tr-input" placeholder="e.g. IB1234" value={flight} onChange={e => setFlight(e.target.value)} />
                      </div>
                    )}
                  </div>
                </div>
                <button type="button" className="tr-link" onClick={() => { setError(''); setStep('availability') }}>Back to vehicles</button>
              </section>

              <aside className="tr-panel tr-sum">
                <div className="tr-thumb" style={{ marginBottom: 14 }}>
                  {selectedVehicle.image ? <img src={selectedVehicle.image} alt={selectedVehicle.vehicleName} /> : <span>No photo</span>}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 500, margin: '0 0 6px' }}>{selectedVehicle.vehicleName}</h3>
                {selectedInfo.capacity && <div className="tr-meta"><PersonIcon />{selectedInfo.capacity}</div>}
                {selectedInfo.provider && <div className="tr-meta">Operated by {selectedInfo.provider}</div>}
                <div className="tr-total">
                  <span>Total</span>
                  <span className="tr-price">{money(selectedVehicle.price, selectedVehicle.currency || 'EUR')}</span>
                </div>
                <button type="button" className="tr-btn" style={{ width: '100%' }} onClick={handlePay} disabled={paying}>
                  {paying ? 'Opening secure checkout...' : `Pay ${money(selectedVehicle.price, selectedVehicle.currency || 'EUR')}`}
                </button>
                {error && <div className="tr-alert" role="alert">{error}</div>}
                <p className="tr-sumnote">You need to be signed in to pay. Payment is handled securely by Stripe.</p>
              </aside>
            </div>
          )}

          <div className="tr-cta">
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Want us to arrange everything?</div>
              <div style={{ color: 'rgba(245,239,228,.62)', fontSize: '.9rem' }}>We organise transfers, flights, hotels and tours as one itinerary.</div>
            </div>
            <Link href="/request-trip">Plan a trip</Link>
          </div>

          <ul className="tr-feat">
            {features.map(f => (
              <li key={f}><CheckIcon /><span>{f}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
