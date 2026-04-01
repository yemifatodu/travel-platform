'use client'
import Link from 'next/link'
import Script from 'next/script'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const features = [
  { icon: '✓', text: 'Fixed prices — no surge pricing or hidden fees' },
  { icon: '✓', text: 'Professional drivers in 120+ countries' },
  { icon: '✓', text: 'Instant booking confirmation' },
  { icon: '✓', text: 'Flight tracking — driver waits if delayed' },
  { icon: '✓', text: 'Free cancellation up to 24 hours before' },
  { icon: '✓', text: 'Meet & greet at arrivals with name board' },
]

const popular = [
  { from: 'Dubai Airport', to: 'Downtown Dubai', country: 'UAE', flag: '🇦🇪' },
  { from: 'Heathrow Airport', to: 'Central London', country: 'UK', flag: '🇬🇧' },
  { from: 'JFK Airport', to: 'Manhattan', country: 'USA', flag: '🇺🇸' },
  { from: 'Lagos Airport', to: 'Victoria Island', country: 'Nigeria', flag: '🇳🇬' },
  { from: 'Bangkok Airport', to: 'Sukhumvit', country: 'Thailand', flag: '🇹🇭' },
  { from: 'Nairobi Airport', to: 'Westlands', country: 'Kenya', flag: '🇰🇪' },
  { from: 'Paris CDG', to: 'City Centre', country: 'France', flag: '🇫🇷' },
  { from: 'Singapore Changi', to: 'Marina Bay', country: 'Singapore', flag: '🇸🇬' },
]

export default function TransfersPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      
      {/* Global CSS Overrides for Widget Contrast */}
      <style jsx global>{`
        /* Force widget inputs and dropdowns to have dark, readable text */
        .tpwl-widget input,
        .tpwl-widget select,
        .tpwl-widget .m-input,
        .tpwl-widget .m-select,
        .kiwitaxi-widget input,
        .kiwitaxi-widget select {
          color: #080807 !important;
          background-color: #FFFFFF !important;
        }
        
        /* Dropdowns and autocomplete lists must have dark text */
        .tpwl-widget .m-dropdown,
        .tpwl-widget .m-autocomplete__list,
        [class*="dropdown"],
        [class*="autocomplete"] {
          color: #080807 !important;
        }

        /* Golden touch for search buttons to fit Huuboi branding */
        .tpwl-widget button[type="submit"],
        .tpwl-widget .m-button--primary,
        .kiwitaxi-widget button {
          background-color: ${gold} !important;
          color: #080807 !important;
        }
      `}</style>

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(160deg,#080810,#0a0c08,#080807)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            AIRPORT TRANSFERS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Arrive in <em style={{ color: gold }}>Comfort</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 40 }}>
            Private airport transfers in 120+ countries. Fixed prices, professional drivers, instant confirmation. Book below — results load directly on huuboi.com.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 8, maxWidth: 700 }}>
            {features.map(f => (
              <div key={f.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: gold, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{f.icon}</span>
                <span style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.6 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="transfer-search-section" style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,70px) clamp(20px,5vw,60px)' }}>

        {/* Airport Transfer Widgets Container */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>
            SEARCH & BOOK YOUR TRANSFER
          </div>
          
          {/* Flexes into a row on desktop and stacks on mobile. */}
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
            
            {/* Wrapper for Widget 1 */}
            <div style={{ flex: '1 1 300px', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(16px,2vw,24px)', minHeight: 200 }}>
              <Script 
                id="transfer-widget-1"
                src="https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&language=en&theme=9&powered_by=true&campaign_id=1&promo_id=1486" 
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>

            {/* Wrapper for Widget 2 */}
            <div style={{ flex: '1 1 300px', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(16px,2vw,24px)', minHeight: 200 }}>
              <Script 
                id="transfer-widget-2"
                src="https://tpwidg.com/content?trs=508095&powered_by=true&shmarker=710879&language=en&display_currency=USD&transfer_type=any&hide_form_extras=true&hide_external_links=true&disable_currency_selector=true&campaign_id=1&promo_id=691" 
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>

          </div>

          <p style={{ color: dim, fontSize: '0.75rem', marginTop: 10, fontFamily: "'DM Sans',sans-serif" }}>
            Powered by Kiwitaxi · 120+ countries · Instant confirmation · USD pricing
          </p>
        </div>

        {/* Popular Routes Section */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>POPULAR ROUTES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 2 }}>
            {popular.map(route => (
              <div key={route.from}
                style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s', cursor: 'pointer' }}
                onClick={() => { const el = document.getElementById('transfer-search-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>{route.flag}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginBottom: 6 }}>{route.country}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, lineHeight: 1.4 }}>
                  {route.from}<br />
                  <span style={{ color: gold }}>→</span> {route.to}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call To Action */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>WANT US TO ARRANGE EVERYTHING?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>We organise transfers, flights, hotels and tours as part of a complete itinerary</p>
          </div>
          <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            PLAN A TRIP
          </Link>
        </div>

      </div>
    </div>
  )
}