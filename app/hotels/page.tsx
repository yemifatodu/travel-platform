'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const featured = [
  { name: 'Four Seasons Safari Lodge', location: 'Serengeti, Tanzania', type: 'Safari Lodge', stars: 5, from: '$1,200/night', highlight: 'Infinity pool overlooking the Serengeti plains', gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)' },
  { name: 'Burj Al Arab Jumeirah', location: 'Dubai, UAE', type: 'Luxury Resort', stars: 7, from: '$1,800/night', highlight: "The world's most iconic hotel — built on its own island", gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)' },
  { name: 'Soneva Fushi', location: 'Maldives', type: 'Overwater Villa', stars: 5, from: '$2,400/night', highlight: 'Private overwater villa with glass floor and direct lagoon access', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Aman Tokyo', location: 'Tokyo, Japan', type: 'Luxury Hotel', stars: 5, from: '$900/night', highlight: 'Minimalist Japanese luxury on the 33rd floor with Mount Fuji views', gradient: 'linear-gradient(160deg,#10001a,#1c0030,#280042)' },
  { name: 'Belmond Copacabana Palace', location: 'Rio de Janeiro, Brazil', type: 'Luxury Hotel', stars: 5, from: '$480/night', highlight: "Rio's legendary beachfront palace overlooking Copacabana", gradient: 'linear-gradient(160deg,#001e14,#003020,#00402a)' },
  { name: 'Katikies Oia', location: 'Santorini, Greece', type: 'Boutique Hotel', stars: 5, from: '$680/night', highlight: 'Carved into the caldera cliff with the most famous sunset view in the world', gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)' },
  { name: 'Singita Sabora Tented Camp', location: 'Serengeti, Tanzania', type: 'Safari Lodge', stars: 5, from: '$1,600/night', highlight: '1920s explorer aesthetic deep in the Grumeti Game Reserve', gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)' },
  { name: 'Le Bristol Paris', location: 'Paris, France', type: 'Palace Hotel', stars: 5, from: '$1,100/night', highlight: "One of Paris's greatest palace hotels on Rue du Faubourg Saint-Honore", gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)' },
  { name: 'Longitude 131', location: 'Uluru, Australia', type: 'Luxury Camp', stars: 5, from: '$1,100/night', highlight: 'Tented luxury camp with direct Uluru views and Milky Way stargazing', gradient: 'linear-gradient(160deg,#2a0a00,#401200,#561a00)' },
]

const popularDestinations = [
  { city: 'Dubai', country: 'UAE', flag: '🇦🇪', from: '$120/night' },
  { city: 'Bali', country: 'Indonesia', flag: '🇮🇩', from: '$45/night' },
  { city: 'London', country: 'UK', flag: '🇬🇧', from: '$180/night' },
  { city: 'Paris', country: 'France', flag: '🇫🇷', from: '$160/night' },
  { city: 'Nairobi', country: 'Kenya', flag: '🇰🇪', from: '$80/night' },
  { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', from: '$140/night' },
  { city: 'New York', country: 'USA', flag: '🇺🇸', from: '$200/night' },
  { city: 'Santorini', country: 'Greece', flag: '🇬🇷', from: '$220/night' },
  { city: 'Cape Town', country: 'South Africa', flag: '🇿🇦', from: '$90/night' },
  { city: 'Bangkok', country: 'Thailand', flag: '🇹🇭', from: '$40/night' },
  { city: 'Maldives', country: 'Maldives', flag: '🇲🇻', from: '$300/night' },
  { city: 'Barcelona', country: 'Spain', flag: '🇪🇸', from: '$130/night' },
]

const tips = [
  { icon: '📅', tip: 'Book at least 4–6 weeks ahead for peak season — prices increase significantly last minute.' },
  { icon: '🔄', tip: 'Always choose free cancellation where available. Plans change — flexible bookings give peace of mind.' },
  { icon: '💳', tip: 'Check if your credit card provides complimentary hotel status or free breakfast — many premium cards do.' },
  { icon: '🏷', tip: 'Book directly with the hotel after finding it on a comparison site — hotels often price-match and add extras.' },
  { icon: '📍', tip: 'Location matters more than room size. A central hotel beats a large room an hour from the action.' },
  { icon: '⭐', tip: 'Read the most recent reviews, not the overall score — a hotel can have old glory and recent issues.' },
]

export default function HotelsPage() {
  useEffect(() => {
    // Load the same Travelpayouts White Label widget — switch to Hotels tab
    const existing = document.getElementById('tp-hotel-widget')
    if (!existing) {
      const script = document.createElement('script')
      script.id = 'tp-hotel-widget'
      script.async = true
      script.type = 'module'
      script.src = 'https://tpwidg.com/wl_web/main.js?wl_id=15518&default_tab=hotels'
      document.head.appendChild(script)
    }
    return () => {
      const s = document.getElementById('tp-hotel-widget')
      if (s) { try { document.head.removeChild(s) } catch {} }
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080a10,#0a080c,#080807)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            HOTELS & STAYS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Sleep <em style={{ color: gold }}>Extraordinarily</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 32 }}>
            Search hotels, resorts and boutique stays worldwide. Live prices — book without leaving huuboi.com.
          </p>

          {/* Widget */}
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,32px)', maxWidth: 900 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 16 }}>
              SEARCH HOTELS — select the Hotels tab in the search box below
            </div>
            <div id="tpwl-search-hotels" />
            <div id="tpwl-tickets-hotels" />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Featured hotels */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>EDITOR'S SELECTION</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 32 }}>
            The World's <em style={{ color: gold }}>Finest Hotels</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2 }}>
            {featured.map(hotel => (
              <div key={hotel.name}
                style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onClick={() => { const el = document.getElementById('tpwl-search'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ background: hotel.gradient, height: 120, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.7) 0%,transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', background: 'rgba(200,169,110,0.2)', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '3px 10px' }}>{hotel.type}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
                    <span style={{ color: gold, fontSize: '0.75rem' }}>{'★'.repeat(Math.min(hotel.stars, 5))}</span>
                  </div>
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: cream, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>{hotel.name}</h3>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginBottom: 10 }}>{hotel.location}</div>
                  <p style={{ color: muted, fontSize: '0.83rem', lineHeight: 1.6, marginBottom: 14 }}>{hotel.highlight}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.08)', paddingTop: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 2 }}>FROM</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: gold, fontWeight: 600 }}>{hotel.from}</div>
                    </div>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: gold }}>SEARCH →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular destinations */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>POPULAR DESTINATIONS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 2 }}>
            {popularDestinations.map(dest => (
              <div key={dest.city}
                style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onClick={() => { const el = document.getElementById('tpwl-search'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{dest.flag}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: cream, fontWeight: 600, marginBottom: 2 }}>{dest.city}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.1em', color: dim, marginBottom: 10 }}>{dest.country}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: gold }}>FROM {dest.from}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>HOTEL BOOKING TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {tips.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request trip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>🧭 WANT US TO HANDLE IT FOR YOU?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Tell us your destination and budget — we will research and book the perfect hotel on your behalf</p>
          </div>
          <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            REQUEST A TRIP
          </Link>
        </div>

        {/* Related */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Flights', href: '/flights' },
            { label: 'Tours & Experiences', href: '/tours' },
            { label: 'Airport Transfers', href: '/transfers' },
            { label: 'Travel eSIM', href: '/esim' },
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
