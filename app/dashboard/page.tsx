'use client'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const quickLinks = [
  { icon: '✈', label: 'Search Flights', href: '/flights', desc: 'Compare 1,200+ airlines' },
  { icon: '🏨', label: 'Search Hotels', href: '/hotels', desc: '28M+ properties worldwide' },
  { icon: '🎯', label: 'Browse Experiences', href: '/tours', desc: '300,000+ tours & activities' },
  { icon: '🚗', label: 'Rent a Car', href: '/car-rentals', desc: '900+ rental suppliers' },
  { icon: '📱', label: 'Get a Travel eSIM', href: '/esim', desc: 'Data in 150+ countries' },
  { icon: '🛂', label: 'Visa Requirements', href: '/visa-requirements', desc: '75+ countries covered' },
  { icon: '🤖', label: 'AI Trip Planner', href: '/ai-planner', desc: 'Build your itinerary' },
  { icon: '💰', label: 'Budget Calculator', href: '/budget-calculator', desc: 'Estimate trip costs' },
]

const destinations = [
  { name: 'Africa & Safari', href: '/africa-safari', icon: '🦁' },
  { name: 'Middle East', href: '/middle-east', icon: '🕌' },
  { name: 'Asia & Far East', href: '/asia', icon: '⛩' },
  { name: 'Europe', href: '/europe', icon: '🏰' },
  { name: 'The Americas', href: '/americas', icon: '🌎' },
  { name: 'Pacific & Oceania', href: '/pacific', icon: '🌊' },
]

export default function DashboardPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(40px,7vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            HUUBOI DASHBOARD
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 16 }}>
            Where Would You<br /><em style={{ color: gold }}>Like to Go?</em>
          </h1>
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.8, maxWidth: 480, marginBottom: 32 }}>
            Everything you need to plan, book and manage your trip — all in one place.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/request-trip"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
              PLAN A TRIP
            </Link>
            <a href="https://wa.me/2347033736377?text=Hi%20HUUBOI%2C%20I%20need%20help%20planning%20a%20trip"
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: '#25D366', color: '#fff', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
              💬 WHATSAPP US
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,60px)' }}>

        {/* Quick links */}
        <div style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>QUICK ACCESS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 2 }}>
            {quickLinks.map(item => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s', display: 'flex', gap: 14, alignItems: 'flex-start' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: cream, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: dim }}>{item.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Destinations */}
        <div style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>EXPLORE BY REGION</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 2 }}>
            {destinations.map(dest => (
              <Link key={dest.href} href={dest.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s', display: 'flex', alignItems: 'center', gap: 12 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                  <span style={{ fontSize: '1.3rem' }}>{dest.icon}</span>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', color: cream }}>{dest.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Enquiry CTA */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(28px,4vw,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>BESPOKE TRAVEL PLANNING</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 12 }}>
              Want Us to <em style={{ color: gold }}>Handle Everything?</em>
            </h2>
            <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
              Flights, hotels, transfers, tours, restaurants — we plan and book your entire trip while you just show up and enjoy it.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/request-trip"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 32px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
              REQUEST A TRIP
            </Link>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.35)', color: gold, padding: '16px 32px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
              TRY AI PLANNER
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
