'use client'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'

const navigationHub = [
  { 
    label: 'Search Flights', 
    href: '/', // Points to your homepage at app/page.tsx
    desc: 'Compare 1,200+ airlines with live results directly on our homepage' 
  },
  { 
    label: 'Find Hotels', 
    href: '/hotels', // Points to app/hotels/page.tsx
    desc: '28 million+ properties worldwide with Booking.com' 
  },
  { 
    label: 'Rent a Car', 
    href: '/car-rentals', // Points to app/car-rentals/page.tsx
    desc: 'Worldwide car rentals and private transport options' 
  },
]

export default function SearchHubPage() {
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
            Pick a category below to access our dedicated search engines for flights, stays, and road travel.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>

        {/* Navigation Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, marginBottom: 40 }}>
          {navigationHub.map(item => (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div 
                style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.12)', padding: '30px 24px', display: 'block', transition: 'border-color 0.2s', height: '100%' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.12)')}
              >
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.15em', color: gold, marginBottom: 8 }}>{item.label} →</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', color: muted, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </Link>
          ))}
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