'use client'
import { useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

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

      <div style={{ background: 'linear-gradient(160deg,#080810,#0a0808,#080a08)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <h1 style={{ fontSize: '3rem', color: cream, marginBottom: 20 }}>
            Fly <span style={{ color: gold }}>Anywhere</span>
          </h1>

          {/* Trip Type Toggle */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {['One Way', 'Return', 'Multi-City'].map(type => (
              <button key={type} onClick={() => setTripType(type)}
                style={{
                  padding: '8px 18px',
                  background: tripType === type ? gold : 'transparent',
                  border: `1px solid ${gold}`,
                  color: tripType === type ? '#000' : cream
                }}>
                {type}
              </button>
            ))}
          </div>

          {/* ✅ WIDGET SECTION */}
          <div style={{ background: '#111110', padding: 30 }}>

            <div id="tpwl-search"></div>
            <div id="tpwl-tickets" style={{ marginTop: 20 }}></div>

            <Script
              src="https://tpwidg.com/wl_web/main.js?wl_id=15518"
              strategy="afterInteractive"
            />

            {/* Fallback Button */}
            <div style={{ marginTop: 20 }}>
              <a href={FLIGHTS_LINK} target="_blank">
                Search Flights (Backup)
              </a>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}