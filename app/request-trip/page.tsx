'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'
const dark = '#080807'
const card = '#111110'

const icons = {
  safari: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a9 9 0 0 1 9 9"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"/>
    </svg>
  ),
  beach: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21H7l2-8H5l7-10 7 10h-4l2 8z"/>
    </svg>
  ),
  culture: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 7V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2M3 7h18M3 7v14m18-14v14"/>
      <rect x="8" y="10" width="3" height="4"/><rect x="13" y="10" width="3" height="4"/>
    </svg>
  ),
  adventure: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l4-8 4 4 3-6 4 10H3z"/><path d="M3 21h18"/>
    </svg>
  ),
  food: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 1-6 6 6 6 0 0 1-6-6h12z"/><path d="M12 14v7m-4 0h8"/><path d="M7 8V3m5 5V3m5 5V3"/>
    </svg>
  ),
  romance: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  family: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  multiCountry: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  plane: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>),
  hotel: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V8l9-6 9 6v14"/><path d="M9 22V12h6v10"/></svg>),
  transfer: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>),
  guide: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>),
  dining: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>),
  itinerary: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>),
  whatsapp: (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>),
  send: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>),
  check: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>),
}

const tripTypes = [
  { icon: icons.safari, label: 'Safari & Wildlife' },
  { icon: icons.beach, label: 'Beach & Island' },
  { icon: icons.culture, label: 'Culture & History' },
  { icon: icons.adventure, label: 'Adventure & Trekking' },
  { icon: icons.food, label: 'Food & Wine' },
  { icon: icons.romance, label: 'Honeymoon & Romance' },
  { icon: icons.family, label: 'Family Holiday' },
  { icon: icons.multiCountry, label: 'Multi-Country' },
]

const budgetRanges = [
  '$500 – $1,500', '$1,500 – $3,000',
  '$3,000 – $5,000', '$5,000 – $10,000',
  '$10,000+', 'Flexible',
]

const popularDestinations = [
  'Serengeti, Tanzania', 'Dubai, UAE', 'Bali, Indonesia',
  'Santorini, Greece', 'Machu Picchu, Peru', 'Safari Kenya & Rwanda',
  'Maldives', 'Tokyo, Japan', 'Morocco Multi-City',
  'Patagonia, Argentina', 'Custom Destination',
]

const inclusions = [
  { icon: icons.plane, text: 'Flights researched & booked' },
  { icon: icons.hotel, text: 'Hotels handpicked for you' },
  { icon: icons.transfer, text: 'Airport transfers arranged' },
  { icon: icons.guide, text: 'Local guides & tours curated' },
  { icon: icons.dining, text: 'Restaurant reservations made' },
  { icon: icons.itinerary, text: 'Full itinerary delivered' },
]

export default function RequestTripPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', whatsapp: '',
    destination: '', package_name: '',
    trip_type: '', travel_dates: '', duration: '',
    guests: '', budget: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [customDest, setCustomDest] = useState(false)

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.destination) {
      alert('Please fill in your name, email and destination.')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ minHeight: '100vh', background: dark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: `1px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', background: 'rgba(200,169,110,0.08)' }}>
            {icons.send}
          </div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', color: gold, marginBottom: 12 }}>ENQUIRY RECEIVED</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.7rem,4vw,2.8rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 16 }}>
            We'll be in touch within <span style={{ color: gold }}>24 hours</span>
          </h1>
          <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 28 }}>
            Thank you <span style={{ color: gold }}>{form.name}</span>. Your enquiry for <strong style={{ color: cream }}>{form.destination}</strong> has been received.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/2347033736377?text=Hi%20HUUBOI%2C%20I%20just%20submitted%20a%20trip%20enquiry" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', background: '#25D366', color: '#fff', padding: '12px 22px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              {icons.whatsapp} WHATSAPP US NOW
            </a>
            <Link href="/destinations"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', border: `1px solid rgba(200,169,110,0.35)`, color: gold, padding: '12px 22px', textDecoration: 'none', display: 'inline-block' }}>
              EXPLORE DESTINATIONS
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: dark, paddingTop: 90 }}>

      {/* Hero Banner */}
      <div style={{ position: 'relative', height: 'clamp(200px,26vw,300px)', overflow: 'hidden', borderBottom: '1px solid rgba(200,169,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg,#080807 40%,#0a0d14 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: 'clamp(36px,6vw,60px) clamp(16px,4vw,48px)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.28em', color: gold, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: gold, display: 'inline-block' }} />
            BESPOKE TRAVEL PLANNING
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.2rem,5.5vw,4.5rem)', fontWeight: 300, color: cream, lineHeight: 0.92, margin: '0 0 14px' }}>
            Plan Your <span style={{ color: gold, fontStyle: 'italic' }}>Perfect Trip</span>
          </h1>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {inclusions.map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.18)', padding: '5px 11px' }}>
                <span style={{ color: gold, display: 'flex', opacity: 0.8 }}>{item.icon}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.1em', color: gold }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(30px,5vw,56px) clamp(16px,4vw,48px)' }}>

        {/* Step 1 — Trip Type */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold }}>01</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.4vw,1.6rem)', fontWeight: 300, color: gold, margin: 0 }}>What kind of trip?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 6 }}>
            {tripTypes.map(t => {
              const active = form.trip_type === t.label
              return (
                <button key={t.label} onClick={() => set('trip_type', t.label)}
                  style={{ background: active ? 'rgba(200,169,110,0.12)' : card, border: `1px solid ${active ? gold : 'rgba(200,169,110,0.15)'}`, padding: '14px 12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, transition: 'border-color 0.2s,background 0.2s', position: 'relative' }}>
                  {active && <span style={{ position: 'absolute', top: 6, right: 6 }}>{icons.check}</span>}
                  <span style={{ opacity: active ? 1 : 0.6, transition: 'opacity 0.2s' }}>{t.icon}</span>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: active ? gold : muted, textAlign: 'center' }}>{t.label}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Step 2 — Destination */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold }}>02</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.4vw,1.6rem)', fontWeight: 300, color: gold, margin: 0 }}>Where do you want to go?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 5, marginBottom: 8 }}>
            {popularDestinations.map(dest => {
              const active = form.destination === dest || (dest === 'Custom Destination' && customDest)
              return (
                <button key={dest}
                  onClick={() => { set('destination', dest === 'Custom Destination' ? '' : dest); setCustomDest(dest === 'Custom Destination') }}
                  style={{ background: active ? 'rgba(200,169,110,0.12)' : card, border: `1px solid ${active ? gold : 'rgba(200,169,110,0.15)'}`, padding: '11px 14px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.08em', color: active ? gold : muted }}>{dest}</span>
                  {active && icons.check}
                </button>
              )
            })}
          </div>
          {(customDest || (!popularDestinations.includes(form.destination) && form.destination !== '')) && (
            <div style={{ background: card, border: `1px solid ${gold}`, padding: '12px 16px', marginTop: 6 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.48rem', letterSpacing: '0.16em', color: gold, marginBottom: 6 }}>TYPE YOUR DESTINATION</div>
              <input value={form.destination} onChange={e => set('destination', e.target.value)}
                placeholder="e.g. Cape Town & Kruger, South Africa"
                style={{ background: 'none', border: 'none', color: cream, fontSize: '0.85rem', width: '100%', outline: 'none', fontFamily: "'DM Sans',sans-serif" }} />
            </div>
          )}
        </section>

        {/* Step 3 — Trip Details + Budget */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold }}>03</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.4vw,1.6rem)', fontWeight: 300, color: gold, margin: 0 }}>Trip details</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 5, marginBottom: 18 }}>
            {[
              { label: 'TRAVEL DATES', placeholder: 'e.g. March 2026 or flexible', field: 'travel_dates' },
              { label: 'DURATION', placeholder: 'e.g. 7 nights, 10 days', field: 'duration' },
              { label: 'NUMBER OF GUESTS', placeholder: 'e.g. 2 adults, 1 child', field: 'guests' },
            ].map(f => (
              <div key={f.field} style={{ background: card, border: '1px solid rgba(200,169,110,0.15)', padding: '13px 16px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.48rem', letterSpacing: '0.16em', color: gold, marginBottom: 7 }}>{f.label}</div>
                <input value={(form as any)[f.field]} onChange={e => set(f.field, e.target.value)}
                  placeholder={f.placeholder}
                  style={{ background: 'none', border: 'none', color: cream, fontSize: '0.82rem', width: '100%', outline: 'none', fontFamily: "'DM Sans',sans-serif" }} />
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.14em', color: gold, marginBottom: 8 }}>APPROXIMATE BUDGET PER PERSON</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(148px,1fr))', gap: 5 }}>
            {budgetRanges.map(b => {
              const active = form.budget === b
              return (
                <button key={b} onClick={() => set('budget', b)}
                  style={{ background: active ? 'rgba(200,169,110,0.12)' : card, border: `1px solid ${active ? gold : 'rgba(200,169,110,0.15)'}`, padding: '11px 13px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.54rem', letterSpacing: '0.07em', color: active ? gold : muted }}>{b}</span>
                  {active && icons.check}
                </button>
              )
            })}
          </div>
        </section>

        {/* Step 4 — Message */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold }}>04</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.4vw,1.6rem)', fontWeight: 300, color: gold, margin: 0 }}>Anything else?</h2>
          </div>
          <div style={{ background: card, border: '1px solid rgba(200,169,110,0.15)', padding: '14px 16px' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.48rem', letterSpacing: '0.16em', color: gold, marginBottom: 8 }}>YOUR MESSAGE (OPTIONAL)</div>
            <textarea value={form.message} onChange={e => set('message', e.target.value)}
              placeholder="Special requests, dietary requirements, accessibility needs, specific experiences..."
              rows={4}
              style={{ background: 'none', border: 'none', color: cream, fontSize: '0.82rem', width: '100%', outline: 'none', resize: 'vertical', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7 }} />
          </div>
        </section>

        {/* Step 5 — Contact */}
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold }}>05</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.4vw,1.6rem)', fontWeight: 300, color: gold, margin: 0 }}>How do we reach you?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 5 }}>
            {[
              { label: 'FULL NAME *', placeholder: 'Your full name', field: 'name' },
              { label: 'EMAIL ADDRESS *', placeholder: 'your@email.com', field: 'email' },
              { label: 'PHONE NUMBER', placeholder: '+234 800 000 0000', field: 'phone' },
              { label: 'WHATSAPP NUMBER', placeholder: '+234 800 000 0000', field: 'whatsapp' },
            ].map(f => (
              <div key={f.field} style={{ background: card, border: '1px solid rgba(200,169,110,0.15)', padding: '13px 16px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.48rem', letterSpacing: '0.16em', color: gold, marginBottom: 7 }}>{f.label}</div>
                <input value={(form as any)[f.field]} onChange={e => set(f.field, e.target.value)}
                  placeholder={f.placeholder}
                  style={{ background: 'none', border: 'none', color: cream, fontSize: '0.82rem', width: '100%', outline: 'none', fontFamily: "'DM Sans',sans-serif" }} />
              </div>
            ))}
          </div>
        </section>

        {/* Submit */}
        <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 28 }}>
          {status === 'error' && (
            <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', padding: '12px 16px', marginBottom: 16 }}>
              <p style={{ color: '#f87171', fontSize: '0.82rem', margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
                Something went wrong. Please try again or WhatsApp us directly.
              </p>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
            <button onClick={handleSubmit} disabled={status === 'sending'}
              style={{ background: gold, color: dark, border: 'none', padding: '15px 36px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', cursor: status === 'sending' ? 'wait' : 'pointer', opacity: status === 'sending' ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 8 }}>
              {icons.send}
              {status === 'sending' ? 'SENDING...' : 'SEND TRIP ENQUIRY'}
            </button>
            <a href="https://wa.me/2347033736377?text=Hi%20HUUBOI%2C%20I%20would%20like%20to%20plan%20a%20trip" target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', border: 'none', padding: '15px 24px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.16em', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              {icons.whatsapp} WHATSAPP INSTEAD
            </a>
          </div>
          <p style={{ color: dim, fontSize: '0.72rem', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6, margin: 0 }}>
            We respond within <span style={{ color: gold }}>24 hours</span>. Your details are <span style={{ color: gold }}>never shared</span> with third parties.
          </p>
        </div>

      </div>
    </div>
  )
}
