'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const tabs = [
  { key: 'flights', label: 'Flights', icon: '✈' },
  { key: 'hotels', label: 'Hotels', icon: '🏨' },
  { key: 'cars', label: 'Car Rentals', icon: '🚗' },
  { key: 'transfers', label: 'Transfers', icon: '🚌' },
]

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState('flights')

  useEffect(() => {
    // Load Travelpayouts widgets script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://tp.media/content?trs=331709&shmarker=710879&locale=en&curr=USD&powered_by=true&target_el=tp_widget_flights&widget=searchForm&color_button=%23C8A96E&color_icons=%23C8A96E&dark=true'
    script.charset = 'utf-8'
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080810,#0a0808,#080a08)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            SEARCH & BOOK
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 16 }}>
            Search Everything<br /><em style={{ color: gold }}>In One Place</em>
          </h1>
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.8, maxWidth: 480 }}>
            Flights, hotels and car rentals — search live prices without leaving huuboi.com.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)', display: 'flex', gap: 0, overflowX: 'auto' }}>
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

        {/* FLIGHTS */}
        {activeTab === 'flights' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>FLIGHT SEARCH</div>
              <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>Search and compare flights across 1,200+ airlines. Live prices updated in real time.</p>
            </div>
            {/* Travelpayouts Flight Search Widget */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,36px)', marginBottom: 32 }}>
              <script
                async
                charSet="utf-8"
                data-template-type="search_form"
                data-locale="en"
                data-currency="USD"
                data-powered-by="true"
                data-color-button="#C8A96E"
                data-dark="true"
                src={`https://tp.media/content?trs=331709&shmarker=710879&locale=en&curr=USD&powered_by=true&color_button=%23C8A96E&dark=true&widget=searchForm`}
              />
              {/* Fallback direct link */}
              <div style={{ marginTop: 20, padding: '20px', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold, marginBottom: 8 }}>SEARCH FLIGHTS DIRECTLY</div>
                <p style={{ color: muted, fontSize: '0.85rem', marginBottom: 16 }}>Click below to search flights on our partner platform — results open in this window.</p>
                <a href="https://www.aviasales.com/?marker=710879&locale=en" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
                  ✈ SEARCH FLIGHTS NOW
                </a>
              </div>
            </div>
          </div>
        )}

        {/* HOTELS */}
        {activeTab === 'hotels' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>HOTEL SEARCH</div>
              <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>Search 28 million+ properties worldwide. Filter by price, rating and facilities.</p>
            </div>
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,36px)', marginBottom: 32 }}>
              {/* Travelpayouts Hotel Widget */}
              <iframe
                src="https://tp.media/content?trs=331709&shmarker=710879&locale=en&curr=USD&powered_by=true&color_button=%23C8A96E&dark=true&widget=hotels&powered_by=true"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', display: 'block' }}
              />
              <div style={{ marginTop: 20, padding: '20px', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold, marginBottom: 8 }}>SEARCH HOTELS DIRECTLY</div>
                <p style={{ color: muted, fontSize: '0.85rem', marginBottom: 16 }}>Search hotels on Expedia — best prices with free cancellation on most bookings.</p>
                <a href="https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FHotels&camref=1110lBk7p" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
                  🏨 SEARCH HOTELS NOW
                </a>
              </div>
            </div>
          </div>
        )}

        {/* CARS */}
        {activeTab === 'cars' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>CAR RENTAL SEARCH</div>
              <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>Compare 900+ rental suppliers worldwide. Economy to luxury, city to 4WD.</p>
            </div>
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,36px)', marginBottom: 32 }}>
              {/* Travelpayouts Car Rental Widget */}
              <iframe
                src="https://tp.media/content?trs=331709&shmarker=710879&locale=en&curr=USD&powered_by=true&color_button=%23C8A96E&dark=true&widget=carsSearchForm"
                width="100%"
                height="420"
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', display: 'block' }}
              />
              <div style={{ marginTop: 20, padding: '20px', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold, marginBottom: 8 }}>SEARCH CAR RENTALS DIRECTLY</div>
                <p style={{ color: muted, fontSize: '0.85rem', marginBottom: 16 }}>Compare prices from 900+ rental companies worldwide.</p>
                <a href="https://getrentacar.tp.st/CvPLu5ev" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
                  🚗 SEARCH CAR RENTALS
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TRANSFERS */}
        {activeTab === 'transfers' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>AIRPORT TRANSFERS</div>
              <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>Book airport transfers in 120+ countries. Fixed prices, no surprises.</p>
            </div>
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,36px)', marginBottom: 32 }}>
              <iframe
                src="https://tp.media/content?trs=331709&shmarker=710879&locale=en&curr=USD&powered_by=true&color_button=%23C8A96E&dark=true&widget=kiwitaxi"
                width="100%"
                height="420"
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', display: 'block' }}
              />
              <div style={{ marginTop: 20, padding: '20px', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold, marginBottom: 8 }}>BOOK A TRANSFER DIRECTLY</div>
                <p style={{ color: muted, fontSize: '0.85rem', marginBottom: 16 }}>Airport pickups, hotel transfers and city-to-city rides worldwide.</p>
                <a href="https://kiwitaxi.tp.st/pthb6f1z" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
                  🚌 BOOK TRANSFER
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bespoke planning strip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>🧭 WANT US TO DO IT FOR YOU?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>We research, compare and book flights, hotels, transfers and tours on your behalf — you just show up</p>
          </div>
          <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            PLAN A TRIP
          </Link>
        </div>
      </div>
    </div>
  )
}
