'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import React from 'react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const ink = '#080807'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// SVG Icons
const PlaneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
)
const CompassIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z"/>
  </svg>
)
const LightbulbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/><path d="M9 21h6"/>
  </svg>
)
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const StarIcon = ({ filled = false }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? gold : 'none'} stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 9.5 8.5 3 9.5l5 4.5-1.5 6.5L12 17l5.5 3.5-1.5-6.5 5-4.5-6.5-1z"/>
  </svg>
)

const destinations = [
  { name: 'Serengeti', country: 'Tanzania', region: 'Africa', slug: 'serengeti', gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', slug: 'cape-town', gradient: 'linear-gradient(160deg,#001018,#001c2d,#002840)' },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa', slug: 'marrakech', gradient: 'linear-gradient(160deg,#200800,#381200,#501c00)' },
  { name: 'Zanzibar', country: 'Tanzania', region: 'Africa', slug: 'zanzibar', gradient: 'linear-gradient(160deg,#001a12,#002d1e,#00402a)' },
  { name: 'Victoria Falls', country: 'Zimbabwe', region: 'Africa', slug: 'victoria-falls', gradient: 'linear-gradient(160deg,#001a10,#002818,#003820)' },
  { name: 'Masai Mara', country: 'Kenya', region: 'Africa', slug: 'masai-mara', gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)' },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', slug: 'dubai', gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)' },
  { name: 'Petra', country: 'Jordan', region: 'Middle East', slug: 'petra', gradient: 'linear-gradient(160deg,#200800,#381200,#4a1800)' },
  { name: 'Istanbul', country: 'Turkey', region: 'Middle East', slug: 'istanbul', gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#400030)' },
  { name: 'Kyoto', country: 'Japan', region: 'Asia', slug: 'kyoto', gradient: 'linear-gradient(160deg,#200015,#380025,#4a0033)' },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', slug: 'bali', gradient: 'linear-gradient(160deg,#001a08,#002d10,#00401a)' },
  { name: 'Maldives', country: 'Maldives', region: 'Asia', slug: 'maldives', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Santorini', country: 'Greece', region: 'Europe', slug: 'santorini', gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)' },
  { name: 'Paris', country: 'France', region: 'Europe', slug: 'paris', gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)' },
  { name: 'Machu Picchu', country: 'Peru', region: 'Americas', slug: 'machu-picchu', gradient: 'linear-gradient(160deg,#060e00,#0c1c00,#122600)' },
  { name: 'Patagonia', country: 'Argentina', region: 'Americas', slug: 'patagonia', gradient: 'linear-gradient(160deg,#001824,#002a3d,#003852)' },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'Americas', slug: 'rio', gradient: 'linear-gradient(160deg,#001e14,#003020,#00402a)' },
]

const packages = [
  { name: 'Desert & Dunes', dest: 'Dubai, UAE', duration: '7 nights', price: '$3,200', type: 'Luxury', region: 'Middle East' },
  { name: 'Great Migration', dest: 'Serengeti, Tanzania', duration: '10 nights', price: '$5,800', type: 'Safari', region: 'Africa' },
  { name: 'Northern Lights', dest: 'Svalbard, Norway', duration: '5 nights', price: '$5,500', type: 'Expedition', region: 'Arctic' },
  { name: 'Temple & Blossom', dest: 'Kyoto, Japan', duration: '8 nights', price: '$3,900', type: 'Cultural', region: 'Asia' },
  { name: 'End of the World', dest: 'Patagonia, Argentina', duration: '10 nights', price: '$4,800', type: 'Adventure', region: 'Americas' },
  { name: 'Spice Route', dest: 'Marrakech, Morocco', duration: '6 nights', price: '$2,400', type: 'Cultural', region: 'Africa' },
  { name: 'Ocean Horizon', dest: 'Maldives', duration: '7 nights', price: '$6,200', type: 'Luxury', region: 'Asia' },
  { name: 'Lost City Trek', dest: 'Machu Picchu, Peru', duration: '9 nights', price: '$3,600', type: 'Adventure', region: 'Americas' },
]

const regionHubs: Record<string, string> = {
  'Africa': '/africa-safari',
  'Middle East': '/middle-east',
  'Asia': '/asia',
  'Europe': '/europe',
  'Americas': '/americas',
  'Arctic': '/map-explorer',
  'Pacific': '/pacific',
}

const testimonials = [
  { name: 'Sarah M.', location: 'London, UK', text: 'The Patagonia expedition was flawlessly organised. Every detail was handled — from the remote trekking lodges to the private glacier tours.', rating: 5 },
  { name: 'Ahmed K.', location: 'Dubai, UAE', text: 'A truly luxurious experience. The team understood exactly what I needed — discretion, quality, and unforgettable moments.', rating: 5 },
  { name: 'Yuki T.', location: 'Tokyo, Japan', text: "Booked the Serengeti package and I'm still in awe. The great migration was beyond anything I imagined.", rating: 5 },
]

// Service strip items
const services = [
  { label: 'flight', stat: '194+', statLabel: 'COUNTRIES', href: '/flights' },
  { label: 'hotel', stat: '27K+', statLabel: 'TRAVELLERS', href: '/hotel' },
  { label: 'car rental', stat: null, statLabel: null, href: '/transfers' },
  { label: 'visa', stat: '400+', statLabel: 'PACKAGES', href: '/visa-requirements' },
  { label: 'esim', stat: '24/7', statLabel: 'SUPPORT', href: '/esim' },
  { label: 'packages', stat: null, statLabel: null, href: '/packages' },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <style>{`
        .dest-grid-home {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .pkg-grid-home {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .test-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .hero-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          min-height: 100vh;
          padding-top: 80px;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(40px,6vw,80px) clamp(24px,5vw,60px);
        }
        .hero-right {
          position: relative;
          overflow: hidden;
        }
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .service-strip {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          border-top: 1px solid rgba(200,169,110,0.15);
          border-bottom: 1px solid rgba(200,169,110,0.15);
        }
        .service-item {
          border-right: 1px solid rgba(200,169,110,0.1);
          padding: 20px 16px;
          text-align: center;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          transition: background 0.2s;
          cursor: pointer;
        }
        .service-item:last-child { border-right: none; }
        .service-item:hover { background: rgba(200,169,110,0.05); }

        @media (max-width: 900px) {
          .hero-split {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .hero-right {
            height: 55vw;
            min-height: 260px;
            max-height: 420px;
          }
          .service-strip {
            grid-template-columns: repeat(3, 1fr);
          }
          .service-item:nth-child(3) { border-right: none; }
          .service-item:nth-child(3n) { border-right: none; }
          .dest-grid-home { grid-template-columns: repeat(2, 1fr); }
          .pkg-grid-home { grid-template-columns: repeat(2, 1fr); }
          .test-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .hero-left {
            padding: 32px 20px;
          }
          .service-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .service-item:nth-child(2n) { border-right: none; }
          .dest-grid-home { grid-template-columns: 1fr 1fr; }
          .pkg-grid-home { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ── HERO SECTION — split layout ── */}
      <section style={{ background: ink, position: 'relative' }}>
        <div className="hero-split">

          {/* LEFT — headline + buttons */}
          <div className="hero-left" style={{ background: 'linear-gradient(160deg,#0a0a08 0%,#0d1520 60%,#080c14 100%)', position: 'relative' }}>
            {/* Ambient glow */}
            <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)', top: -100, left: -100, filter: 'blur(60px)', pointerEvents: 'none' }} />
            {/* Grid overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,169,110,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.03) 1px,transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.28em', color: gold, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 1, background: gold, display: 'inline-block' }} />
                LUXURY GLOBAL TRAVEL
              </div>

              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.4rem,5.5vw,6rem)', fontWeight: 300, lineHeight: 0.9, color: cream, marginBottom: 24, letterSpacing: '-0.01em' }}>
                The World<br/>
                <em style={{ fontStyle: 'italic', color: gold }}>Awaits</em><br/>
                You
              </h1>

              <p style={{ fontSize: 'clamp(0.78rem,1.3vw,0.88rem)', color: muted, maxWidth: 380, lineHeight: 1.7, marginBottom: 36, fontWeight: 300 }}>
                Bespoke journeys crafted for the discerning traveller. Six continents. Infinite stories. One platform.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', background: gold, color: ink, padding: '14px 30px', textDecoration: 'none', display: 'inline-block' }}>
                  EXPLORE DESTINATIONS
                </Link>
                <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.5)', color: gold, padding: '14px 30px', textDecoration: 'none', display: 'inline-block' }}>
                  AI TRIP PLANNER
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — video */}
          <div className="hero-right">
            {/* Dark overlay for contrast */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,7,0.35) 0%, transparent 30%)', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.6) 0%, transparent 40%)', zIndex: 1, pointerEvents: 'none' }} />

            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/hero-poster.jpg"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src="/videos/hero.webm" type="video/webm" />
              <source src="/videos/hero.mp4" type="video/mp4" />
              {/* Fallback image if video fails */}
              <img src="/images/hero-poster.jpg" alt="HUUBOI — Global Travel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </video>

            {/* Bottom label */}
            <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 2 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.5)' }}>NOW DEPARTING</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.9rem', color: cream, fontStyle: 'italic' }}>Six continents. Infinite stories.</div>
            </div>
          </div>
        </div>

        {/* ── SERVICE STRIP ── */}
        <div className="service-strip" style={{ background: 'rgba(8,8,7,0.95)', backdropFilter: 'blur(8px)' }}>
          {services.map((s) => (
            <Link key={s.label} href={s.href} className="service-item" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,1.8vw,1.4rem)', fontStyle: 'italic', color: cream, lineHeight: 1 }}>
                {s.label}
              </div>
              {s.stat && (
                <div style={{ marginTop: 4, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(0.9rem,1.5vw,1.1rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.stat}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.45rem', letterSpacing: '0.18em', color: dim, marginTop: 2 }}>{s.statLabel}</div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY HUUBOI ── */}
      <section style={{ background: '#0a0908', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(32px,4vw,60px)', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.25em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 25, height: 1, background: gold, display: 'inline-block' }} />
                WHY HUUBOI
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,3.5vw,3rem)', fontWeight: 300, color: cream, lineHeight: 1.05, marginBottom: 18 }}>
                One Platform.<br/>Every Destination.<br/>
                <em style={{ color: gold }}>Smarter Decisions.</em>
              </h2>
              <p style={{ color: muted, fontSize: '0.8rem', lineHeight: 1.8, marginBottom: 0 }}>
                HUUBOI brings together flights, hotels, tours, eSIMs and expert travel guides from across six continents — so you stop searching and start discovering.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[
                { icon: <PlaneIcon />, title: 'All In One Place', body: 'Flights, hotels, tours, eSIMs, transfers and experiences — without ever leaving HUUBOI.' },
                { icon: <CompassIcon />, title: 'Expert Guides', body: 'Deep destination guides written by people who have actually been there.' },
                { icon: <LightbulbIcon />, title: 'Smarter Decisions', body: 'Visa requirements, best seasons, budget guides and insider tips on every page.' },
                { icon: <GlobeIcon />, title: 'Six Continents', body: '194 destinations across Africa, Middle East, Asia, Europe, the Americas and the Pacific.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px' }}>
                  <div style={{ marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: gold, marginBottom: 6 }}>{item.title}</div>
                  <p style={{ color: dim, fontSize: '0.65rem', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section style={{ background: ink, padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>194 DESTINATIONS WORLDWIDE</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 300, color: cream, lineHeight: 1 }}>
                Iconic <em style={{ color: gold }}>Destinations</em>
              </h2>
            </div>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: muted, textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 2, whiteSpace: 'nowrap' }}>VIEW ALL 194 →</Link>
          </div>

          <div className="dest-grid-home">
            {destinations.map((dest) => (
              <Link key={dest.slug} href={regionHubs[dest.region] || `/destinations/${dest.slug}`}
                style={{ textDecoration: 'none', display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: dest.gradient }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.92) 0%,rgba(8,8,7,0.2) 65%,transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '14px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', color: gold, marginBottom: 2 }}>{dest.region}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(0.95rem,2vw,1.3rem)', fontWeight: 600, color: cream, lineHeight: 1.1 }}>{dest.name}</div>
                  <div style={{ fontSize: '0.62rem', color: muted, marginTop: 2 }}>{dest.country}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section style={{ background: '#0d0c0a', padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>HANDPICKED FOR YOU</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 300, color: cream }}>
              Featured <em style={{ color: gold }}>Packages</em>
            </h2>
          </div>
          <div className="pkg-grid-home">
            {packages.map(pkg => (
              <div key={pkg.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.12)', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.48rem', letterSpacing: '0.15em', color: gold, border: '1px solid rgba(200,169,110,0.35)', padding: '2px 6px' }}>{pkg.type}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.48rem', letterSpacing: '0.1em', color: dim }}>{pkg.region}</div>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', fontWeight: 600, color: cream, marginBottom: 4, lineHeight: 1.2 }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.68rem', color: muted, marginBottom: 2 }}>{pkg.dest}</p>
                <p style={{ fontSize: '0.62rem', color: dim, marginBottom: 14 }}>{pkg.duration}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 12 }}>
                  <div>
                    <div style={{ fontSize: '0.48rem', color: dim, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.05em' }}>FROM</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', fontWeight: 600, color: gold }}>{pkg.price}</div>
                  </div>
                  <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.15em', color: gold, textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 1 }}>REQUEST →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI PLANNER PROMO ── */}
      <section style={{ background: ink, padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>POWERED BY AI</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 300, color: cream, marginBottom: 16, lineHeight: 1.1 }}>
            Your Perfect Itinerary,<br/><em style={{ color: gold }}>Generated in Seconds</em>
          </h2>
          <p style={{ color: muted, lineHeight: 1.75, marginBottom: 28, fontSize: '0.88rem' }}>
            Tell us where you dream of going, your budget, and how you like to travel. Our AI builds a fully personalised day-by-day itinerary — flights, hotels, activities, and hidden gems included.
          </p>
          <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', background: gold, color: ink, padding: '14px 36px', textDecoration: 'none', display: 'inline-block' }}>
            TRY THE AI PLANNER FREE
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: '#0d0c0a', padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>TRAVELLER STORIES</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', fontWeight: 300, color: cream }}>
              Words from the <em style={{ color: gold }}>Road</em>
            </h2>
          </div>
          <div className="test-grid">
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '20px' }}>
                <div style={{ color: gold, fontSize: '0.75rem', marginBottom: 12, display: 'flex', gap: 3 }}>
                  {[...Array(t.rating)].map((_, i) => <StarIcon key={i} filled />)}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.82rem', color: 'rgba(245,239,228,0.9)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 14 }}>"{t.text}"</p>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 500, color: cream }}>{t.name}</div>
                  <div style={{ fontSize: '0.55rem', color: dim, marginTop: 2 }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: ink, borderTop: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(48px,6vw,80px) 20px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>STAY INSPIRED</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 300, color: cream, marginBottom: 10 }}>
            Travel <em style={{ color: gold }}>Intelligence</em> — Delivered
          </h2>
          <p style={{ color: muted, marginBottom: 28, fontSize: '0.85rem', lineHeight: 1.7 }}>Exclusive deals, destination guides, and curated travel insights.</p>
          <div style={{ display: 'flex', maxWidth: 440, margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.25)', borderRight: 'none', color: cream, padding: '14px 16px', fontSize: '0.85rem', outline: 'none', minWidth: 0 }} />
            <button style={{ background: gold, color: ink, border: 'none', padding: '0 24px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer', whiteSpace: 'nowrap' }}>SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </>
  )
}
