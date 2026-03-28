'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cars' | 'transfers'>('flights')
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    // Load Travelpayouts White Label widget once
    const script = document.createElement('script')
    script.async = true
    script.type = 'module'
    script.src = 'https://tpwidg.com/wl_web/main.js?wl_id=15518'
    document.head.appendChild(script)

    return () => {
      // Do NOT remove the script on unmount — this causes the reboot
    }
  }, [])

  const tabs = [
    { key: 'flights' as const, icon: '✈', label: 'Flights' },
    { key: 'hotels' as const, icon: '🏨', label: 'Hotels' },
    { key: 'cars' as const, icon: '🚗', label: 'Car Rentals' },
    { key: 'transfers' as const, icon: '🚌', label: 'Transfers' },
  ]

  const affiliateLinks = {
    hotels: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FHotels&camref=1110lBk7p',
    cars: 'https://getrentacar.tp.st/CvPLu5ev',
    transfers: 'https://kiwitaxi.tp.st/pthb6f1z',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080810,#0a0808,#080a10)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            SEARCH & BOOK
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 16 }}>
            Search Everything<br /><em style={{ color: gold }}>In One Place</em>
          </h1>
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.8, maxWidth: 480 }}>
            Flights with live results on huuboi.com. Hotels, cars and transfers via our trusted partners.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.1)', position: 'sticky', top: 72, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)', display: 'flex', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '18px 24px', background: 'none', border: 'none', color: activeTab === tab.key ? gold : muted, borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>

        {/* FLIGHTS TAB — widget */}
        <div style={{ display: activeTab === 'flights' ? 'block' : 'none' }}>
          <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}>
            Search and compare 1,200+ airlines. Live prices load below — results stay on huuboi.com.
          </p>
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(16px,3vw,24px)', marginBottom: 24, minHeight: 200 }}>
            <div id="tpwl-search" />
            <div id="tpwl-tickets" />
          </div>
        </div>

        {/* HOTELS TAB */}
        <div style={{ display: activeTab === 'hotels' ? 'block' : 'none' }}>
          <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}>
            Search 28 million+ properties worldwide via our partner Expedia — best prices with free cancellation on most bookings.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 2, marginBottom: 24 }}>
            {[
              { label: 'Search All Hotels', href: affiliateLinks.hotels, desc: 'Expedia · 28M+ properties worldwide' },
              { label: 'Luxury Resorts', href: affiliateLinks.hotels, desc: 'Five-star hotels & resorts' },
              { label: 'Safari Lodges', href: affiliateLinks.hotels, desc: 'Africa · Asia · Americas' },
              { label: 'Boutique Hotels', href: affiliateLinks.hotels, desc: 'Handpicked independent stays' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', background: '#111110', border: '1px solid rgba(200,169,110,0.12)', padding: '20px 22px', display: 'block', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.12)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: gold, marginBottom: 6 }}>🏨 {item.label}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: muted }}>{item.desc}</div>
              </a>
            ))}
          </div>
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: '20px 24px' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>WHY WE USE EXPEDIA FOR HOTELS</div>
            <p style={{ color: muted, fontSize: '0.85rem', margin: 0, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7 }}>
              28 million+ properties. Free cancellation on most bookings. Best price guarantee. Your booking is confirmed instantly and managed directly by Expedia with 24/7 support.
            </p>
          </div>
        </div>

        {/* CARS TAB */}
        <div style={{ display: activeTab === 'cars' ? 'block' : 'none' }}>
          <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}>
            Compare 900+ car rental suppliers worldwide via GetRentACar — economy to luxury, city to 4WD.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 2, marginBottom: 24 }}>
            {[
              { label: 'Search All Cars', href: affiliateLinks.cars, desc: 'GetRentACar · 900+ suppliers worldwide' },
              { label: 'Economy & Compact', href: affiliateLinks.cars, desc: 'Affordable city driving' },
              { label: 'SUV & 4WD', href: affiliateLinks.cars, desc: 'Safari & adventure ready' },
              { label: 'Luxury Vehicles', href: affiliateLinks.cars, desc: 'Mercedes, BMW, Tesla & more' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', background: '#111110', border: '1px solid rgba(200,169,110,0.12)', padding: '20px 22px', display: 'block', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.12)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: gold, marginBottom: 6 }}>🚗 {item.label}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: muted }}>{item.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* TRANSFERS TAB */}
        <div style={{ display: activeTab === 'transfers' ? 'block' : 'none' }}>
          <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}>
            Book airport pickups and hotel transfers in 120+ countries. Fixed prices, no surprises.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 2, marginBottom: 24 }}>
            {[
              { label: 'Airport to Hotel', href: affiliateLinks.transfers, desc: 'Kiwitaxi · Fixed prices · Instant confirmation' },
              { label: 'Hotel to Airport', href: affiliateLinks.transfers, desc: 'Return transfers · All major airports' },
              { label: 'City to City', href: affiliateLinks.transfers, desc: 'Private transfers between cities' },
              { label: 'Group Transfers', href: affiliateLinks.transfers, desc: 'Minivans & coaches for groups' },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', background: '#111110', border: '1px solid rgba(200,169,110,0.12)', padding: '20px 22px', display: 'block', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.12)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: gold, marginBottom: 6 }}>🚌 {item.label}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: muted }}>{item.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>🧭 WANT US TO HANDLE EVERYTHING?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>We research, book and plan your entire trip — flights, hotels, transfers and tours</p>
          </div>
          <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            PLAN A TRIP
          </Link>
        </div>
      </div>
    </div>
  )
}
