'use client'
import { useState } from 'react'
import Link from 'next/link'
import { AFFILIATES, buildTrackedUrl } from '@/lib/affiliates'

const featuredDeals = [
  { destination: 'Dubai', region: 'Middle East', slug: 'dubai', type: 'Flight + Hotel', saving: 'Save up to 35%', badge: 'HOT DEAL', affiliateId: 'booking', gradient: 'linear-gradient(135deg,#1a0e00,#3d2800)' },
  { destination: 'Bali', region: 'Asia', slug: 'bali', type: 'Hotel Package', saving: 'From $49/night', badge: 'BEST VALUE', affiliateId: 'airbnb', gradient: 'linear-gradient(135deg,#001a10,#003020)' },
  { destination: 'Patagonia', region: 'Americas', slug: 'patagonia', type: 'Adventure Tour', saving: 'Save up to 20%', badge: 'LIMITED', affiliateId: 'viator', gradient: 'linear-gradient(135deg,#001a20,#002d3d)' },
  { destination: 'Santorini', region: 'Europe', slug: 'santorini', type: 'Hotel Stay', saving: 'From $89/night', badge: 'POPULAR', affiliateId: 'booking', gradient: 'linear-gradient(135deg,#001030,#002060)' },
  { destination: 'Tokyo', region: 'Asia', slug: 'tokyo', type: 'City Package', saving: 'Save up to 25%', badge: 'NEW', affiliateId: 'expedia', gradient: 'linear-gradient(135deg,#1a0010,#2d0030)' },
  { destination: 'Cape Town', region: 'Africa', slug: 'cape-town', type: 'Experience', saving: 'From $35/activity', badge: 'TOP RATED', affiliateId: 'getyourguide', gradient: 'linear-gradient(135deg,#0a0a00,#1a1a00)' },
]

const categories = [
  { icon: '✈', label: 'Flights', affiliateId: 'skyscanner', desc: 'Compare 1,200+ airlines', color: '0770E3' },
  { icon: '🏨', label: 'Hotels', affiliateId: 'booking', desc: '28M+ properties worldwide', color: '003580' },
  { icon: '📦', label: 'Packages', affiliateId: 'expedia', desc: 'Flight + hotel bundles', color: 'FFC72C' },
  { icon: '🎯', label: 'Tours', affiliateId: 'viator', desc: '300K+ experiences', color: '179BD7' },
  { icon: '🏠', label: 'Stays', affiliateId: 'airbnb', desc: 'Unique homes & villas', color: 'FF5A5F' },
  { icon: '🗺', label: 'Activities', affiliateId: 'getyourguide', desc: 'Local tours & tickets', color: 'FF6D00' },
  { icon: '🦉', label: 'Reviews', affiliateId: 'tripadvisor', desc: 'Read before you book', color: '00AF87' },
  { icon: '🚗', label: 'Car Hire', affiliateId: 'rentalcars', desc: '900+ rental companies', color: 'E31837' },
]

export default function DealsPage() {
  const [searchDest, setSearchDest] = useState('')
  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'

  const getAffiliate = (id: string) => AFFILIATES.find(a => a.id === id)!

  return (
    <div style={{ minHeight: '100vh', background: ink, paddingTop: 100 }}>

      {/* Hero */}
      <div style={{ position: 'relative', padding: '80px 60px 60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.08) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.35em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            EXCLUSIVE PARTNER DEALS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem,7vw,6.5rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 24 }}>
            Travel <em style={{ color: gold }}>Deals</em><br />& Partners
          </h1>
          <p style={{ color: 'rgba(245,239,228,0.55)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.8, marginBottom: 48 }}>
            We partner with the world's leading travel platforms to bring you the best prices. Compare, book, and save — all in one place.
          </p>

          {/* Quick Search */}
          <div style={{ display: 'flex', gap: 0, maxWidth: 600 }}>
            <input
              placeholder="Search a destination (e.g. Bali, Paris, Dubai)..."
              value={searchDest}
              onChange={e => setSearchDest(e.target.value)}
              style={{ flex: 1, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.25)', borderRight: 'none', color: cream, padding: '16px 24px', fontSize: '0.9rem', outline: 'none' }}
            />
            <button style={{ background: gold, color: ink, border: 'none', padding: '0 32px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.8rem', letterSpacing: '0.15em', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
              FIND DEALS
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 60px 120px' }}>

        {/* Category Grid */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 24 }}>BROWSE BY CATEGORY</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2 }}>
            {categories.map(cat => {
              const affiliate = getAffiliate(cat.affiliateId)
              const url = buildTrackedUrl(affiliate, { destination: searchDest || 'worldwide' })
              return (
                <a key={cat.label} href={url} target="_blank" rel="noopener noreferrer sponsored"
                  style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '24px 16px', textDecoration: 'none', textAlign: 'center' as const, transition: 'all 0.3s', display: 'block' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `#${cat.color}60`; el.style.background = `#${cat.color}10`; el.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,169,110,0.1)'; el.style.background = '#111110'; el.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', color: cream, marginBottom: 6 }}>{cat.label}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(245,239,228,0.35)', lineHeight: 1.4 }}>{cat.desc}</div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Featured Deals Grid */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 10 }}>HANDPICKED FOR YOU</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: cream }}>
                Featured <em style={{ color: gold }}>Destinations</em>
              </h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {featuredDeals.map(deal => {
              const affiliate = getAffiliate(deal.affiliateId)
              const url = buildTrackedUrl(affiliate, { destination: deal.destination })
              return (
                <a key={deal.destination} href={url} target="_blank" rel="noopener noreferrer sponsored"
                  style={{ background: deal.gradient, border: '1px solid rgba(200,169,110,0.1)', padding: '40px 32px', textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', transition: 'all 0.4s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,169,110,0.4)'; el.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,169,110,0.1)'; el.style.transform = 'translateY(0)' }}
                >
                  <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', background: gold, color: ink, padding: '4px 10px' }}>{deal.badge}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.45)', marginBottom: 10 }}>{deal.region} · {deal.type}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: cream, marginBottom: 8 }}>{deal.destination}</h3>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.8rem', color: gold, marginBottom: 20 }}>{deal.saving}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1rem' }}>{affiliate.logo}</span>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(245,239,228,0.4)' }}>VIA</div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: cream }}>{affiliate.name}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold, borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 2 }}>BOOK NOW →</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* All Partners */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 24 }}>ALL PARTNER PLATFORMS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {AFFILIATES.map(affiliate => {
              const url = buildTrackedUrl(affiliate, { destination: searchDest || 'worldwide' })
              return (
                <a key={affiliate.id} href={url} target="_blank" rel="noopener noreferrer sponsored"
                  style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 24px', textDecoration: 'none', transition: 'all 0.3s', display: 'block' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `#${affiliate.color}50`; el.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,169,110,0.1)'; el.style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    <span style={{ fontSize: '1.8rem' }}>{affiliate.logo}</span>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600, color: cream }}>{affiliate.name}</div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', color: `#${affiliate.color}`, marginTop: 2 }}>{affiliate.category}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(245,239,228,0.5)', lineHeight: 1.6, marginBottom: 16 }}>{affiliate.description}</p>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: gold, borderBottom: '1px solid rgba(200,169,110,0.3)', display: 'inline-block', paddingBottom: 2 }}>
                    SEARCH NOW →
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Disclosure */}
        <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 32, textAlign: 'center' as const }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(245,239,228,0.3)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
            <strong style={{ color: 'rgba(245,239,228,0.5)' }}>Affiliate Disclosure:</strong> We partner with travel booking platforms and may receive a commission when you make a purchase through our links. This comes at no extra cost to you and helps us keep the platform free. We only partner with platforms we trust.
          </p>
        </div>
      </div>
    </div>
  )
}
