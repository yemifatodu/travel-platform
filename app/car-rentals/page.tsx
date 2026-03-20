'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const popularDestinations = [
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪', from: '$28/day' },
  { city: 'London', country: 'UK', flag: '🇬🇧', from: '$35/day' },
  { city: 'New York', country: 'USA', flag: '🇺🇸', from: '$45/day' },
  { city: 'Paris', country: 'France', flag: '🇫🇷', from: '$32/day' },
  { city: 'Cape Town', country: 'South Africa', flag: '🇿🇦', from: '$22/day' },
  { city: 'Bali', country: 'Indonesia', flag: '🇮🇩', from: '$15/day' },
  { city: 'Sydney', country: 'Australia', flag: '🇦🇺', from: '$40/day' },
  { city: 'Barcelona', country: 'Spain', flag: '🇪🇸', from: '$30/day' },
  { city: 'Nairobi', country: 'Kenya', flag: '🇰🇪', from: '$35/day' },
  { city: 'Bangkok', country: 'Thailand', flag: '🇹🇭', from: '$18/day' },
  { city: 'Cancun', country: 'Mexico', flag: '🇲🇽', from: '$25/day' },
  { city: 'Queenstown', country: 'New Zealand', flag: '🇳🇿', from: '$50/day' },
]

const carTypes = [
  { icon: '🚗', type: 'Economy', desc: 'Perfect for city driving. Fuel-efficient and easy to park.', example: 'Toyota Yaris or similar' },
  { icon: '🚙', type: 'SUV', desc: 'Ideal for road trips and rough terrain. Space for luggage.', example: 'Toyota RAV4 or similar' },
  { icon: '🏎', type: 'Luxury', desc: 'Travel in style. Premium brands for special occasions.', example: 'Mercedes E-Class or similar' },
  { icon: '🚐', type: 'Minivan', desc: 'Perfect for families and groups. Maximum luggage space.', example: 'Ford Tourneo or similar' },
  { icon: '🛻', type: '4WD / Offroad', desc: 'Built for adventure. Safari, dunes and mountain roads.', example: 'Land Cruiser or similar' },
  { icon: '⚡', type: 'Electric', desc: 'Eco-friendly driving. Available in major cities worldwide.', example: 'Tesla Model 3 or similar' },
]

const tips = [
  { icon: '📋', tip: 'Always book in advance — prices increase significantly closer to your travel date, especially in peak season.' },
  { icon: '🪪', tip: 'Carry your driving licence plus an International Driving Permit (IDP) — required in many countries outside your home nation.' },
  { icon: '🛡', tip: 'Check what insurance is included. CDW (Collision Damage Waiver) is essential — decline the full excess waiver if your credit card covers it.' },
  { icon: '⛽', tip: 'Note the fuel policy before you drive away. Full-to-full is always best — avoid pre-pay fuel options.' },
  { icon: '📸', tip: 'Photograph the car thoroughly before driving off — every scratch, dent and mark — and make sure the agent notes any existing damage.' },
  { icon: '🗺', tip: 'Download offline maps before picking up. Mobile data can be patchy in remote areas and roaming charges expensive without an eSIM.' },
]

export default function CarRentalsPage() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const handleSearch = () => {
    window.open('https://getrentacar.tp.st/CvPLu5ev', '_blank')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0808,#100c08,#080a10)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            CAR RENTALS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Drive the<br /><em style={{ color: gold }}>World</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 48 }}>
            Compare car rental prices from 900+ suppliers worldwide. Economy to luxury, city runabouts to 4WD safari vehicles — find the right car at the right price.
          </p>

          {/* Search box */}
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(24px,3vw,36px)', maxWidth: 860 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 20 }}>FIND YOUR CAR</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 8, marginBottom: 12 }}>
              {[
                { label: 'PICK-UP LOCATION', placeholder: 'City or airport e.g. Dubai DXB', value: pickup, set: setPickup },
                { label: 'DROP-OFF LOCATION', placeholder: 'Same as pick-up or different', value: dropoff, set: setDropoff },
                { label: 'PICK-UP DATE', placeholder: 'DD / MM / YYYY', value: dateFrom, set: setDateFrom },
                { label: 'RETURN DATE', placeholder: 'DD / MM / YYYY', value: dateTo, set: setDateTo },
              ].map(field => (
                <div key={field.label} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.15)', padding: '12px 16px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 6 }}>{field.label}</div>
                  <input
                    value={field.value}
                    onChange={e => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    style={{ background: 'none', border: 'none', color: cream, fontSize: '0.88rem', width: '100%', outline: 'none', fontFamily: "'DM Sans',sans-serif" }}
                  />
                </div>
              ))}
            </div>
            <button onClick={handleSearch}
              style={{ background: gold, color: '#080807', border: 'none', padding: '16px 40px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', cursor: 'pointer', width: '100%' }}>
              🚗 SEARCH CAR RENTALS
            </button>
            <p style={{ color: dim, fontSize: '0.75rem', textAlign: 'center', marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>
              Powered by GetRentACar · 900+ suppliers · Best price guarantee
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Popular destinations */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>POPULAR LOCATIONS</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>
                Top Car Rental <em style={{ color: gold }}>Destinations</em>
              </h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 2 }}>
            {popularDestinations.map(dest => (
              <a key={dest.city} href="https://getrentacar.tp.st/CvPLu5ev" target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{dest.flag}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: cream, fontWeight: 600, marginBottom: 2 }}>{dest.city}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginBottom: 10 }}>{dest.country}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: gold }}>FROM {dest.from}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Car types */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>VEHICLE TYPES</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>
              The Right Car for <em style={{ color: gold }}>Every Journey</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 2 }}>
            {carTypes.map(car => (
              <a key={car.type} href="https://getrentacar.tp.st/CvPLu5ev" target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '26px 24px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>{car.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>{car.type}</div>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.7, marginBottom: 10 }}>{car.desc}</p>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim }}>{car.example}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>RENTAL TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {tips.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* eSIM strip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 DRIVING ABROAD?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get a travel eSIM — offline maps, navigation and local data without roaming fees</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET ESIM
          </Link>
        </div>

        {/* Related */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Airport Transfers', href: '/transfers' },
            { label: 'Travel Insurance', href: '/help' },
            { label: 'Visa Requirements', href: '/visa-requirements' },
            { label: 'Budget Calculator', href: '/budget-calculator' },
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
