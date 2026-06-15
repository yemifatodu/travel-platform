'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'
const ink = '#080807' // Defined for consistency

// --- SVG Icons ---
const PlaneIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
)
const HotelIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01"/></svg>
)
const CarIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14v-4H5v4ZM3 13V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M7 17v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2M15 17v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2"/></svg>
)
const StarIcon = ({ className = '', filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill={filled ? gold : 'none'} stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 9.5 8.5 3 9.5l5 4.5-1.5 6.5L12 17l5.5 3.5-1.5-6.5 5-4.5-6.5-1z"/></svg>
)

const destinations = [
  { name: 'Serengeti', country: 'Tanzania', region: 'Africa', slug: 'serengeti', gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', slug: 'cape-town', gradient: 'linear-gradient(160deg,#001018,#001c2d,#002840)' },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa', slug: 'marrakech', gradient: 'linear-gradient(160deg,#200800,#381200,#501c00)' },
  { name: 'Zanzibar', country: 'Tanzania', region: 'Africa', slug: 'zanzibar', gradient: 'linear-gradient(160deg,#001a12,#002d1e,#00402a)' },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', slug: 'dubai', gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)' },
  { name: 'Kyoto', country: 'Japan', region: 'Asia', slug: 'kyoto', gradient: 'linear-gradient(160deg,#200015,#380025,#4a0033)' },
  { name: 'Santorini', country: 'Greece', region: 'Europe', slug: 'santorini', gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)' },
  { name: 'Patagonia', country: 'Argentina', region: 'Americas', slug: 'patagonia', gradient: 'linear-gradient(160deg,#001824,#002a3d,#003852)' },
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
  'Africa': '/africa-safari', 'Middle East': '/middle-east', 'Asia': '/asia',
  'Europe': '/europe', 'Americas': '/americas',
}

const testimonials = [
  { name: 'Sarah M.', location: 'London, UK', text: 'The Patagonia expedition was flawlessly organised. Every detail was handled — from the remote trekking lodges to the private glacier tours.', rating: 5 },
  { name: 'Ahmed K.', location: 'Dubai, UAE', text: 'A truly luxurious experience. The team understood exactly what I needed — discretion, quality, and unforgettable moments.', rating: 5 },
  { name: 'Yuki T.', location: 'Tokyo, Japan', text: "Booked the Serengeti package and I'm still in awe. The great migration was beyond anything I imagined.", rating: 5 },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll Animation Observer
  useEffect(() => {
    if (!mounted) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [mounted])

  return (
    <>
      <style>{`
        /* 1. Video Edge Fading Overlay */
        .video-fade-overlay {
          background: 
            radial-gradient(circle at center, transparent 30%, #080807 100%),
            linear-gradient(to bottom, rgba(8,8,7,0.3) 0%, rgba(8,8,7,0.6) 60%, #080807 100%);
        }

        /* 2. Scroll Animation (Fade Up) */
        .scroll-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* 3. Destination Card Hover Animation */
        .dest-card {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .dest-card:hover {
          transform: scale(1.04);
          border-color: ${gold} !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(200, 169, 110, 0.15);
          z-index: 10;
        }

        /* 4. Interactive Card Hover (Packages & Testimonials) */
        .interactive-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .interactive-card:hover {
          transform: translateY(-6px);
          border-color: rgba(200, 169, 110, 0.4) !important;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        }

        /* Grid Layouts */
        .dest-grid-home {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .pkg-grid-home {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .test-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .dest-grid-home { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .pkg-grid-home { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }
        @media (max-width: 480px) {
          .dest-grid-home { grid-template-columns: 1fr; }
          .pkg-grid-home { grid-template-columns: 1fr; }
          .test-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ==========================================
          HERO SECTION WITH VIDEO BACKGROUND
      ========================================== */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-waves-1089-large.mp4" type="video/mp4" />
        </video>
        <div className="video-fade-overlay" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', width: '100%' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            LUXURY GLOBAL TRAVEL
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 300, lineHeight: 0.95, color: cream, marginBottom: 24 }}>
            The World<br/><em style={{ fontStyle: 'italic', color: gold }}>Awaits</em> You
          </h1>
          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: muted, maxWidth: 500, lineHeight: 1.7, marginBottom: 36, fontWeight: 300 }}>
            Bespoke journeys crafted for the discerning traveller. Six continents. Infinite stories. One platform.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: ink, padding: '14px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              EXPLORE DESTINATIONS
            </Link>
            <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.5)', color: gold, padding: '14px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              AI TRIP PLANNER
            </Link>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, borderTop: '1px solid rgba(200,169,110,0.15)', background: 'rgba(8,8,7,0.7)', backdropFilter: 'blur(10px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-around', padding: '16px 20px', flexWrap: 'wrap', gap: 16 }}>
            {[['194+','Countries'], ['27K+','Travellers'], ['400+','Packages'], ['24/7','Support']].map(([num, label]) => (
              <div key={num} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 600, color: gold }}>{num}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: dim, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FLIGHT SEARCH WIDGET SECTION
      ========================================== */}
      <section style={{ background: ink, padding: '0 clamp(20px, 5vw, 60px) 80px', position: 'relative', zIndex: 20, marginTop: -40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(24px, 4vw, 40px)', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <PlaneIcon />
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold }}>SEARCH LIVE FLIGHT PRICES</div>
            </div>
            <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.6 }}>
              Compare 1,200+ airlines with live prices. Results load directly on huuboi.com.
            </p>
            <div id="tpwl-search" style={{ minHeight: '150px', width: '100%', background: '#1C1B18', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dim, fontSize: '0.8rem' }}>
              Flight Search Widget Loads Here
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              <Link href="/flights" className="interactive-card" style={{ flex: 1, minWidth: '200px', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.15)', padding: '16px', display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                <HotelIcon />
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: gold }}>FIND HOTEL DEALS</div>
                  <div style={{ fontSize: '0.7rem', color: muted }}>Book premium stays globally.</div>
                </div>
              </Link>
              <Link href="/transfers" className="interactive-card" style={{ flex: 1, minWidth: '200px', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.15)', padding: '16px', display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                <CarIcon />
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: gold }}>AIRPORT TRANSFERS</div>
                  <div style={{ fontSize: '0.7rem', color: muted }}>Skip the lines, book verified rides.</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          DESTINATIONS GRID
      ========================================== */}
      <section style={{ background: ink, padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>194 DESTINATIONS WORLDWIDE</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: cream }}>
              Iconic <em style={{ fontStyle: 'italic', color: gold }}>Destinations</em>
            </h2>
          </div>
          <div className="dest-grid-home">
            {destinations.map((dest, index) => (
              <Link 
                key={dest.slug} 
                href={regionHubs[dest.region] || `/destinations/${dest.slug}`}
                className="scroll-animate dest-card"
                style={{ 
                  textDecoration: 'none', display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden', 
                  background: dest.gradient, border: '1px solid rgba(200,169,110,0.1)', borderRadius: '4px',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.95) 0%, rgba(8,8,7,0.2) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold, marginBottom: 4 }}>{dest.region}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 600, color: cream, lineHeight: 1.1 }}>{dest.name}</div>
                  <div style={{ fontSize: '0.75rem', color: muted, marginTop: 4 }}>{dest.country}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/destinations" className="scroll-animate" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none', borderBottom: '1px solid gold', paddingBottom: 4 }}>
              VIEW ALL 194 DESTINATIONS →
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          PACKAGES (Your Code, Enhanced with Animations)
      ========================================== */}
      <section style={{ background: '#0d0c0a', padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="scroll-animate" style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>HANDPICKED FOR YOU</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 300, color: cream }}>
              Featured <em style={{ color: gold }}>Packages</em>
            </h2>
          </div>
          <div className="pkg-grid-home">
            {packages.map((pkg, index) => (
              <div key={pkg.name} className="scroll-animate interactive-card" style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.12)', padding: '18px', animationDelay: `${index * 0.1}s` }}>
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

      {/* ==========================================
          AI PLANNER PROMO (Enhanced)
      ========================================== */}
      <section className="scroll-animate" style={{ background: ink, padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>POWERED BY AI</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 300, color: cream, marginBottom: 16, lineHeight: 1.1 }}>
            Your Perfect Itinerary,<br/><em style={{ color: gold }}>Generated in Seconds</em>
          </h2>
          <p style={{ color: muted, lineHeight: 1.75, marginBottom: 28, fontSize: '0.88rem' }}>
            Tell us where you dream of going, your budget, and how you like to travel. Our AI builds a fully personalised day-by-day itinerary — flights, hotels, activities, and hidden gems included.
          </p>
          <Link href="/ai-planner" className="interactive-card" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', background: gold, color: ink, padding: '14px 36px', textDecoration: 'none', display: 'inline-block' }}>
            TRY THE AI PLANNER FREE
          </Link>
        </div>
      </section>

      {/* ==========================================
          TESTIMONIALS (Enhanced with Staggered Animation)
      ========================================== */}
      <section style={{ background: '#0d0c0a', padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="scroll-animate" style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>TRAVELLER STORIES</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', fontWeight: 300, color: cream }}>
              Words from the <em style={{ color: gold }}>Road</em>
            </h2>
          </div>
          <div className="test-grid">
            {testimonials.map((t, index) => (
              <div key={t.name} className="scroll-animate interactive-card" style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', animationDelay: `${index * 0.15}s` }}>
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

      {/* ==========================================
          NEWSLETTER (Enhanced)
      ========================================== */}
      <section className="scroll-animate" style={{ background: ink, borderTop: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(48px,6vw,80px) 20px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>STAY INSPIRED</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 300, color: cream, marginBottom: 10 }}>
            Travel <em style={{ color: gold }}>Intelligence</em> — Delivered
          </h2>
          <p style={{ color: muted, marginBottom: 28, fontSize: '0.85rem', lineHeight: 1.7 }}>Exclusive deals, destination guides, and curated travel insights.</p>
          <div style={{ display: 'flex', maxWidth: 440, margin: '0 auto' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="interactive-card"
              style={{ flex: 1, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.25)', borderRight: 'none', color: cream, padding: '14px 16px', fontSize: '0.85rem', outline: 'none', minWidth: 0 }} 
            />
            <button className="interactive-card" style={{ background: gold, color: ink, border: '1px solid gold', padding: '0 24px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em', cursor: 'pointer', whiteSpace: 'nowrap' }}>SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </>
  )
}