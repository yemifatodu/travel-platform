'use client'
import Link from 'next/link'
import { AffiliateSearch } from '@/components/affiliate/AffiliateSearch'
import { AFFILIATES, buildTrackedUrl } from '@/lib/affiliates'

interface DestinationData {
  name: string; region: string; tagline: string; desc: string
  bestTime: string; budget: string; highlights: string[]
  currency?: string
}

export function DestinationClient({ dest, slug }: { dest: DestinationData; slug: string }) {
  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'
  const affiliateParams = { destination: dest.name, checkIn: '', checkOut: '', guests: 2 }

  return (
    <div style={{ minHeight: '100vh', background: ink }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '70vh', background: 'linear-gradient(135deg,#0a0a08,#1a1408,#0d1520)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(200,169,110,0.1) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,1) 0%, rgba(8,8,7,0.3) 60%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 60px 80px' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/destinations" style={{ color: 'rgba(245,239,228,0.4)', textDecoration: 'none' }}>DESTINATIONS</Link>
            <span style={{ color: 'rgba(245,239,228,0.2)' }}>→</span>
            <span>{dest.region.toUpperCase()}</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(4rem,8vw,8rem)', fontWeight: 300, color: cream, lineHeight: 0.9, marginBottom: 20 }}>{dest.name}</h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', color: 'rgba(245,239,228,0.6)', fontStyle: 'italic' }}>{dest.tagline}</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 60px' }}>
        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 60 }}>
          {[['BEST TIME TO VISIT', dest.bestTime], ['AVG DAILY BUDGET', dest.budget], ['REGION', dest.region]].map(([label, val]) => (
            <div key={label} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '28px' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>{label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: cream }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Description + Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 80 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>ABOUT {dest.name.toUpperCase()}</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.25rem', color: 'rgba(245,239,228,0.8)', lineHeight: 1.8 }}>{dest.desc}</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>TOP HIGHLIGHTS</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
              {dest.highlights.map((h, i) => (
                <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', color: gold, minWidth: 24 }}>0{i + 1}</span>
                  <span style={{ color: 'rgba(245,239,228,0.75)', fontSize: '0.95rem' }}>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Booking Section */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 12 }}>READY TO BOOK?</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 32 }}>
            Book Your Trip to <em style={{ color: gold }}>{dest.name}</em>
          </h2>
          <AffiliateSearch defaultDestination={dest.name} />
        </div>

        {/* Quick Affiliate Buttons */}
        <div style={{ marginBottom: 80, padding: '40px', background: '#0d0c0a', border: '1px solid rgba(200,169,110,0.1)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>QUICK LINKS — BOOK WITH OUR PARTNERS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {[
              { icon: '✈', label: 'Find Flights', sub: 'Compare airlines', id: 'skyscanner' },
              { icon: '🏨', label: 'Browse Hotels', sub: '28M+ properties', id: 'booking' },
              { icon: '🎯', label: 'Book Tours', sub: '300K+ activities', id: 'viator' },
              { icon: '🏠', label: 'Unique Stays', sub: 'Villas & apartments', id: 'airbnb' },
              { icon: '📦', label: 'Packages', sub: 'Flight + hotel deals', id: 'expedia' },
              { icon: '🗺', label: 'Experiences', sub: 'Local & guided', id: 'getyourguide' },
              { icon: '🦉', label: 'Read Reviews', sub: 'TripAdvisor ratings', id: 'tripadvisor' },
              { icon: '🚗', label: 'Rent a Car', sub: '900+ companies', id: 'rentalcars' },
            ].map(btn => {
              const affiliate = AFFILIATES.find(a => a.id === btn.id)!
              const url = buildTrackedUrl(affiliate, affiliateParams)
              return (
                <a key={btn.id} href={url} target="_blank" rel="noopener noreferrer sponsored"
                  style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 16px', textDecoration: 'none', textAlign: 'center' as const, display: 'block', transition: 'all 0.3s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = gold; el.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,169,110,0.1)'; el.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{btn.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.12em', color: cream, marginBottom: 4 }}>{btn.label}</div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(245,239,228,0.35)' }}>{btn.sub}</div>
                </a>
              )
            })}
          </div>
          <p style={{ fontSize: '0.7rem', color: 'rgba(245,239,228,0.2)', marginTop: 16, fontStyle: 'italic', textAlign: 'center' as const }}>
            We earn a small commission when you book through our partners — at no extra cost to you.
          </p>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' as const, borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 80 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem', fontWeight: 300, color: cream, marginBottom: 24 }}>
            Plan Your {dest.name} <em style={{ color: gold }}>Itinerary</em>
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.5)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Let our AI build you a complete day-by-day itinerary in seconds.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href={`/ai-planner?destination=${encodeURIComponent(dest.name)}`} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: ink, padding: '16px 36px', textDecoration: 'none' }}>
              ✦ AI TRIP PLANNER
            </Link>
            <Link href="/deals" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none' }}>
              VIEW ALL DEALS
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
