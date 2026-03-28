'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'

type TabType = 'flights' | 'hotels' | 'cars' | 'transfers'

const tabs: { key: TabType; label: string; icon: string; desc: string }[] = [
  { key: 'flights', label: 'Flights', icon: '✈', desc: 'Search 1,200+ airlines for the best prices' },
  { key: 'hotels', label: 'Hotels', icon: '🏨', desc: 'Compare 28M+ properties worldwide' },
  { key: 'cars', label: 'Car Rentals', icon: '🚗', desc: '900+ rental suppliers worldwide' },
  { key: 'transfers', label: 'Transfers', icon: '🚌', desc: 'Airport pickups in 120+ countries' },
]

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<TabType>('flights')
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  useEffect(() => {
    // Configure widget default tab based on active tab
    const configScript = document.createElement('script')
    configScript.id = 'tpwl-config'
    configScript.innerHTML = `
      window.TPWL_CONFIGURATION = {
        ...window.TPWL_CONFIGURATION,
        defaultTab: '${activeTab === 'flights' ? 'avia' : activeTab === 'hotels' ? 'hotel' : activeTab === 'cars' ? 'car' : 'transfer'}',
      };
    `
    // Remove old config if exists
    const old = document.getElementById('tpwl-config')
    if (old) old.remove()
    document.head.appendChild(configScript)

    // Load widget script
    const existing = document.getElementById('tpwl-main-script')
    if (!existing) {
      const script = document.createElement('script')
      script.id = 'tpwl-main-script'
      script.async = true
      script.type = 'module'
      script.src = 'https://tpwidg.com/wl_web/main.js?wl_id=15518'
      script.onload = () => setWidgetLoaded(true)
      document.head.appendChild(script)
    } else {
      setWidgetLoaded(true)
    }
  }, [activeTab])

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
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.8, maxWidth: 480, marginBottom: 0 }}>
            Flights, hotels, car rentals and transfers — live prices, book without leaving huuboi.com.
          </p>
        </div>
      </div>

      {/* Tab selector */}
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

      {/* Widget area */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>

        {/* Active tab description */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: muted, fontSize: '0.9rem', fontFamily: "'DM Sans',sans-serif" }}>
            {tabs.find(t => t.key === activeTab)?.desc}
          </p>
        </div>

        {/* Travelpayouts White Label Widget — both divs required on same page */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(16px,3vw,24px)', marginBottom: 32, minHeight: 120 }}>
          <div id="tpwl-search" />
          <div id="tpwl-tickets" />
          {!widgetLoaded && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: muted, fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem' }}>
              Loading search...
            </div>
          )}
        </div>

        {/* Fallback links if widget doesn't load */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 2, marginBottom: 32 }}>
          {[
            { label: '✈ Search Flights', href: 'https://www.aviasales.com/?marker=710879&locale=en', desc: 'Aviasales · 1,200+ airlines' },
            { label: '🏨 Search Hotels', href: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FHotels&camref=1110lBk7p', desc: 'Expedia · 28M+ properties' },
            { label: '🚗 Rent a Car', href: 'https://getrentacar.tp.st/CvPLu5ev', desc: 'GetRentACar · 900+ suppliers' },
            { label: '🚌 Book Transfer', href: 'https://kiwitaxi.tp.st/pthb6f1z', desc: 'Kiwitaxi · 120+ countries' },
          ].map(item => (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none', background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '16px 20px', display: 'block', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: gold, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.75rem', color: muted }}>{item.desc}</div>
            </a>
          ))}
        </div>

        {/* Plan a trip strip */}
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
