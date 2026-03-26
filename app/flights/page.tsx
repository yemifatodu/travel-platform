'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const FLIGHTS_LINK = 'https://www.aviasales.com/?marker=710879&locale=en'

const popularRoutes = [
  { origin: 'Lagos', to: 'Dubai', code: 'LOS → DXB', from_flag: '🇳🇬', to_flag: '🇦🇪', price: '$380' },
  { origin: 'Lagos', to: 'London', code: 'LOS → LHR', from_flag: '🇳🇬', to_flag: '🇬🇧', price: '$520' },
  { origin: 'Lagos', to: 'New York', code: 'LOS → JFK', from_flag: '🇳🇬', to_flag: '🇺🇸', price: '$680' },
  { origin: 'Lagos', to: 'Nairobi', code: 'LOS → NBO', from_flag: '🇳🇬', to_flag: '🇰🇪', price: '$290' },
  { origin: 'London', to: 'Bali', code: 'LHR → DPS', from_flag: '🇬🇧', to_flag: '🇮🇩', price: '$620' },
  { origin: 'Dubai', to: 'Maldives', code: 'DXB → MLE', from_flag: '🇦🇪', to_flag: '🇲🇻', price: '$180' },
  { origin: 'London', to: 'Cape Town', code: 'LHR → CPT', from_flag: '🇬🇧', to_flag: '🇿🇦', price: '$580' },
  { origin: 'New York', to: 'Paris', code: 'JFK → CDG', from_flag: '🇺🇸', to_flag: '🇫🇷', price: '$420' },
  { origin: 'Dubai', to: 'Bangkok', code: 'DXB → BKK', from_flag: '🇦🇪', to_flag: '🇹🇭', price: '$220' },
  { origin: 'London', to: 'Tokyo', code: 'LHR → NRT', from_flag: '🇬🇧', to_flag: '🇯🇵', price: '$680' },
  { origin: 'Lagos', to: 'Accra', code: 'LOS → ACC', from_flag: '🇳🇬', to_flag: '🇬🇭', price: '$120' },
  { origin: 'London', to: 'Santorini', code: 'LHR → JTR', from_flag: '🇬🇧', to_flag: '🇬🇷', price: '$180' },
]

const airlines = [
  { name: 'Emirates', hub: 'Dubai', icon: '🇦🇪' },
  { name: 'Ethiopian Airlines', hub: 'Addis Ababa', icon: '🇪🇹' },
  { name: 'Kenya Airways', hub: 'Nairobi', icon: '🇰🇪' },
  { name: 'British Airways', hub: 'London', icon: '🇬🇧' },
  { name: 'Qatar Airways', hub: 'Doha', icon: '🇶🇦' },
  { name: 'Turkish Airlines', hub: 'Istanbul', icon: '🇹🇷' },
  { name: 'Air France', hub: 'Paris', icon: '🇫🇷' },
  { name: 'Singapore Airlines', hub: 'Singapore', icon: '🇸🇬' },
]

const tips = [
  { icon: '📅', tip: 'Book 6–8 weeks ahead for international flights. Last-minute prices can be 2–3x higher, especially in peak season.' },
  { icon: '🗓', tip: 'Tuesday and Wednesday are consistently the cheapest days to fly. Avoid Friday evenings and Sunday afternoons.' },
  { icon: '🔁', tip: 'Check nearby airports — flying from a secondary airport can save hundreds. London has 6 airports; not all are equal in price.' },
  { icon: '🧳', tip: 'Budget airlines show a low base fare then add bags. Always check the total price including one checked bag before booking.' },
  { icon: '⏰', tip: 'Early morning and late night flights are usually cheaper and less likely to be delayed. Red-eye flights also save a hotel night.' },
  { icon: '📱', tip: 'Get a travel eSIM before you land so you can access your booking confirmation and navigate without roaming charges.' },
]

const flightTypes = [
  { icon: '✈', label: 'One Way' },
  { icon: '🔄', label: 'Return' },
  { icon: '🗺', label: 'Multi-City' },
  { icon: '💼', label: 'Business Class' },
  { icon: '👑', label: 'First Class' },
  { icon: '🎒', label: 'Economy' },
]

export default function FlightsPage() {
  const [tripType, setTripType] = useState('Return')

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080810,#0a0808,#080a08)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            FLIGHT SEARCH
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Fly <em style={{ color: gold }}>Anywhere</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 32 }}>
            Compare flights across 1,200+ airlines worldwide. Find the best prices for every route — economy to first class, one way to multi-city.
          </p>

          {/* Trip type */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
            {['One Way', 'Return', 'Multi-City'].map(type => (
              <button key={type} onClick={() => setTripType(type)}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', padding: '8px 18px', background: tripType === type ? gold : 'transparent', border: `1px solid ${tripType === type ? gold : 'rgba(200,169,110,0.25)'}`, color: tripType === type ? '#080807' : muted, cursor: 'pointer', transition: 'all 0.2s' }}>
                {type}
              </button>
            ))}
          </div>

          {/* White Label widget placeholder */}
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(24px,3vw,40px)', maxWidth: 900 }}>
            <div id="tp-flight-search">
              {/* Travelpayouts White Label Widget goes here */}
              {/* Paste your widget code from travelpayouts.com → Tools → White Label → Widget */}
            </div>

            {/* Fallback search button always visible */}
            <div style={{ marginTop: 20, borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 20 }}>
              <p style={{ color: dim, fontSize: '0.8rem', marginBottom: 14, fontFamily: "'DM Sans',sans-serif" }}>
                Search 1,200+ airlines for the best prices on your route:
              </p>
              <a href={FLIGHTS_LINK} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', background: gold, color: '#080807', padding: '14px 36px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', textDecoration: 'none' }}>
                ✈ SEARCH FLIGHTS NOW
              </a>
              <p style={{ color: dim, fontSize: '0.72rem', marginTop: 10, fontFamily: "'DM Sans',sans-serif" }}>
                Powered by Aviasales · 1,200+ airlines · Results open in English
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Flight types */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>BROWSE BY CLASS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 2 }}>
            {flightTypes.map(type => (
              <a key={type.label} href={FLIGHTS_LINK} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '22px 16px', cursor: 'pointer', transition: 'border-color 0.2s', textAlign: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <span style={{ fontSize: '1.8rem' }}>{type.icon}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: muted }}>{type.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Popular routes */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>POPULAR ROUTES</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>
                Most Searched <em style={{ color: gold }}>Routes</em>
              </h2>
            </div>
            <a href={FLIGHTS_LINK} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: muted, textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: 3 }}>
              SEARCH ALL ROUTES →
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 2 }}>
            {popularRoutes.map(route => (
              <a key={route.code} href={FLIGHTS_LINK} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: '1.3rem' }}>{route.from_flag}</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(200,169,110,0.2)', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem' }}>✈</span>
                  </div>
                  <span style={{ fontSize: '1.3rem' }}>{route.to_flag}</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 4 }}>{route.code}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream, fontWeight: 600, marginBottom: 2 }}>{route.origin} → {route.to}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', color: gold, marginTop: 8 }}>FROM {route.price}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>AIRLINES WE SEARCH</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 2 }}>
            {airlines.map(airline => (
              <a key={airline.name} href={FLIGHTS_LINK} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '16px 18px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <span style={{ fontSize: '1.4rem' }}>{airline.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: cream, marginBottom: 2 }}>{airline.name}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.1em', color: dim }}>{airline.hub}</div>
                </div>
              </a>
            ))}
          </div>
          <p style={{ color: dim, fontSize: '0.8rem', marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>
            + 1,192 more airlines searched automatically
          </p>
        </div>

        {/* Tips */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>FLIGHT BOOKING TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {tips.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request trip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>🧭 WANT US TO BOOK FOR YOU?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Tell us your route and travel dates — we will find and book the best flight on your behalf</p>
          </div>
          <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            REQUEST A TRIP
          </Link>
        </div>

        {/* Related */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Hotels', href: '/hotels' },
            { label: 'Airport Transfers', href: '/transfers' },
            { label: 'Travel eSIM', href: '/esim' },
            { label: 'Visa Requirements', href: '/visa-requirements' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold }}>{link.label} →</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
