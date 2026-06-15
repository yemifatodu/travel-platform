'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// ─────────────────────────────────────────────────────────────
// SVG ICON COMPONENTS
// ─────────────────────────────────────────────────────────────
const CalendarIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
)
const RefreshIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9"/><path d="M21 3v6h-6"/></svg>
)
const CardIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/></svg>
)
const TagIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/></svg>
)
const PinIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
)
const StarFilledIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill={gold} stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 9.5 8.5 3 9.5l5 4.5-1.5 6.5L12 17l5.5 3.5-1.5-6.5 5-4.5-6.5-1z"/></svg>
)
const CoinIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
)
const LeafIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
)
const GiftIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M7 8V5a3 3 0 0 1 6 0v3M11 5a3 3 0 0 1 6 0v3"/></svg>
)
const ClockIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
)
const CompassIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z"/></svg>
)

const featured = [
  { name: 'Four Seasons Safari Lodge', location: 'Serengeti, Tanzania', type: 'Safari Lodge', stars: 5, from: '$1,200/night', highlight: 'Infinity pool overlooking the Serengeti plains', gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)' },
  { name: 'Burj Al Arab Jumeirah', location: 'Dubai, UAE', type: 'Luxury Resort', stars: 7, from: '$1,800/night', highlight: "The world's most iconic hotel — built on its own island", gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)' },
  { name: 'Soneva Fushi', location: 'Maldives', type: 'Overwater Villa', stars: 5, from: '$2,400/night', highlight: 'Private overwater villa with glass floor and direct lagoon access', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Aman Tokyo', location: 'Tokyo, Japan', type: 'Luxury Hotel', stars: 5, from: '$900/night', highlight: 'Minimalist Japanese luxury on the 33rd floor with Mount Fuji views', gradient: 'linear-gradient(160deg,#10001a,#1c0030,#280042)' },
  { name: 'Belmond Copacabana Palace', location: 'Rio de Janeiro, Brazil', type: 'Luxury Hotel', stars: 5, from: '$480/night', highlight: "Rio's legendary beachfront palace overlooking Copacabana", gradient: 'linear-gradient(160deg,#001e14,#003020,#00402a)' },
  { name: 'Katikies Oia', location: 'Santorini, Greece', type: 'Boutique Hotel', stars: 5, from: '$680/night', highlight: 'Carved into the caldera cliff with the most famous sunset view in the world', gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)' },
  { name: 'Singita Sabora Tented Camp', location: 'Serengeti, Tanzania', type: 'Safari Lodge', stars: 5, from: '$1,600/night', highlight: '1920s explorer aesthetic deep in the Grumeti Game Reserve', gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)' },
  { name: 'Le Bristol Paris', location: 'Paris, France', type: 'Palace Hotel', stars: 5, from: '$1,100/night', highlight: "One of Paris's greatest palace hotels on Rue du Favbourg Saint-Honore", gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)' },
  { name: 'Longitude 131', location: 'Uluru, Australia', type: 'Luxury Camp', stars: 5, from: '$1,100/night', highlight: 'Tented luxury camp with direct Uluru views and Milky Way stargazing', gradient: 'linear-gradient(160deg,#2a0a00,#401200,#561a00)' },
]

const tips = [
  { icon: <CalendarIcon />, tip: 'Book at least 4–6 weeks ahead for peak season — prices increase significantly last minute.' },
  { icon: <RefreshIcon />, tip: 'Always choose free cancellation where available. Plans change — flexible bookings give peace of mind.' },
  { icon: <CardIcon />, tip: 'Check if your credit card provides complimentary hotel status or free breakfast — many premium cards do.' },
  { icon: <TagIcon />, tip: 'Book directly with the hotel after finding it on a comparison site — hotels often price-match and add extras.' },
  { icon: <PinIcon />, tip: 'Location matters more than room size. A central hotel beats a large room an hour from the action.' },
  { icon: <StarFilledIcon />, tip: 'Read the most recent reviews, not the overall score — a hotel can have old glory and recent issues.' },
]

export default function HotelsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (!document.querySelector('script[src*="swarm.impt.io/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://swarm.impt.io/widget.js';
      script.async = true;
      script.setAttribute('data-key', 'p_w3d1hxx34sm'); 
      document.head.appendChild(script);
    }

    if (!document.querySelector('script[src*="swarm.impt.io/wavelength.js"]')) {
      const script2 = document.createElement('script');
      script2.src = 'https://swarm.impt.io/wavelength.js';
      script2.async = true;
      script2.setAttribute('data-key', 'p_w3d1hxx34sm'); 
      script2.setAttribute('data-tune', 'auto');
      document.head.appendChild(script2);
    }

    if (!document.getElementById('impt-custom-styles')) {
      const style = document.createElement('style');
      style.id = 'impt-custom-styles';
      style.textContent = `
        .impt-widget-container { font-family: 'DM Sans', sans-serif !important; }
        #impt-swarm, #impt-wavelength { width: 100%; }
        #impt-swarm .box, #impt-wavelength .box { background: rgba(17, 17, 16, 0.8) !important; border: 1px solid rgba(200, 169, 110, 0.2) !important; border-radius: 0 !important; box-shadow: none !important; padding: 24px !important; }
        #impt-swarm .eyebrow, #impt-wavelength .eyebrow { color: #C8A96E !important; font-family: 'Bebas Neue', sans-serif !important; font-size: 0.6rem !important; letter-spacing: 0.18em !important; }
        #impt-swarm .title, #impt-wavelength .title { color: #F5EFE4 !important; font-family: 'Cormorant Garamond', serif !important; font-size: 1.3rem !important; font-weight: 400 !important; }
        #impt-swarm label, #impt-wavelength label { color: rgba(245, 239, 228, 0.6) !important; font-family: 'Bebas Neue', sans-serif !important; font-size: 0.55rem !important; letter-spacing: 0.12em !important; }
        #impt-swarm select, #impt-swarm input, #impt-wavelength select, #impt-wavelength input, #impt-wavelength textarea { background: rgba(245, 239, 228, 0.04) !important; border: 1px solid rgba(200, 169, 110, 0.2) !important; color: #F5EFE4 !important; font-family: 'DM Sans', sans-serif !important; border-radius: 0 !important; }
        #impt-swarm select:focus, #impt-swarm input:focus, #impt-wavelength select:focus, #impt-wavelength input:focus, #impt-wavelength textarea:focus { border-color: #C8A96E !important; box-shadow: none !important; }
        #impt-swarm button, #impt-wavelength button { background: #C8A96E !important; color: #080807 !important; font-family: 'Bebas Neue', sans-serif !important; letter-spacing: 0.12em !important; border-radius: 0 !important; font-weight: normal !important; transition: all 0.2s ease !important; }
        #impt-swarm button:hover, #impt-wavelength button:hover { background: #D8B97E !important; transform: translateY(-2px) !important; box-shadow: 0 8px 24px -8px rgba(200, 169, 110, 0.35) !important; }
        #impt-swarm .foot, #impt-wavelength .foot { color: rgba(245, 239, 228, 0.4) !important; font-size: 0.65rem !important; }
        #impt-swarm .badge::before, #impt-wavelength .badge::before { background: #C8A96E !important; }
        #impt-swarm a, #impt-wavelength a { color: rgba(245, 239, 228, 0.5) !important; }
        #impt-swarm a:hover, #impt-wavelength a:hover { color: #C8A96E !important; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .scroll-animate { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .tip-card { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .tip-card:hover { transform: translateY(-6px); border-color: rgba(200, 169, 110, 0.5) !important; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4); }
        .tip-card:hover .tip-icon { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(200, 169, 110, 0.4)); }
        .tip-icon { transition: all 0.3s ease; }

        .hotel-carousel-container { position: relative; }
        .hotel-carousel { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding-bottom: 10px; }
        .hotel-carousel::-webkit-scrollbar { display: none; }
        .hotel-card-snap { flex: 0 0 320px; scroll-snap-align: start; transition: transform 0.3s ease, border-color 0.3s ease; }
        .hotel-card-snap:hover { transform: translateY(-6px); border-color: rgba(200,169,110,0.4) !important; }
        .carousel-btn { position: absolute; top: 40%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(8,8,7,0.8); border: 1px solid rgba(200,169,110,0.3); color: #C8A96E; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: all 0.2s ease; backdrop-filter: blur(4px); }
        .carousel-btn:hover { background: #C8A96E; color: #080807; }
        .carousel-btn.left { left: -22px; }
        .carousel-btn.right { right: -22px; }
        @media (max-width: 768px) { .carousel-btn { display: none; } .hotel-card-snap { flex: 0 0 280px; } }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [mounted])

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      <div id="hotel-search-section" style={{ background: 'linear-gradient(160deg,#080a10,#0a080c,#080807)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            HOTELS & STAYS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Sleep <em style={{ color: gold }}>Extraordinarily</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 32 }}>
            Search hotels, resorts and boutique stays worldwide. <strong>5% commission back — 1 tonne CO₂ offset per booking.</strong>
          </p>

          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,32px)', width: '100%', position: 'relative', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 12 }}>SEARCH BY DESTINATION</div>
            <div id="impt-swarm" style={{ marginBottom: 24 }}></div>
            <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', margin: '24px 0' }} />
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 12 }}>SEARCH BY VIBE (WAVELENGTH AI)</div>
            <div id="impt-wavelength"></div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>
        
        {/* Featured hotels - Horizontal Carousel */}
        <div className="scroll-animate" style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>EDITOR'S SELECTION</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>
                The World's <em style={{ color: gold }}>Finest Hotels</em>
              </h2>
            </div>
            <Link href="/hotels/all" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: muted, textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: 3 }}>
              VIEW ALL HOTELS →
            </Link>
          </div>

          <div className="hotel-carousel-container">
            <button className="carousel-btn left" onClick={() => document.getElementById('hotel-scroll')?.scrollBy({ left: -340, behavior: 'smooth' })}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <div id="hotel-scroll" className="hotel-carousel">
              {featured.map((hotel, index) => (
                <div key={hotel.name} className="hotel-card-snap scroll-animate" style={{ animationDelay: `${index * 0.1}s`, background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', cursor: 'pointer', borderRadius: '8px' }}
                  onClick={() => { const el = document.getElementById('hotel-search-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}>
                  <div style={{ background: hotel.gradient, height: 140, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.8) 0%,transparent 60%)' }} />
                    <div style={{ position: 'absolute', top: 12, right: 12 }}>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', background: 'rgba(200,169,110,0.2)', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '3px 10px', borderRadius: '4px' }}>{hotel.type}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[...Array(Math.min(hotel.stars, 5))].map((_, i) => <StarFilledIcon key={i} />)}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '18px 20px 22px' }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: cream, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>{hotel.name}</h3>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginBottom: 10 }}>{hotel.location}</div>
                    <p style={{ color: muted, fontSize: '0.83rem', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hotel.highlight}</p>
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

            <button className="carousel-btn right" onClick={() => document.getElementById('hotel-scroll')?.scrollBy({ left: 340, behavior: 'smooth' })}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* IMPT Benefits Banner */}
        <div className="scroll-animate" style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '28px 32px', marginBottom: 'clamp(48px,7vw,80px)', textAlign: 'center', borderRadius: '8px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40 }}>
            <div><div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}><CoinIcon /></div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', color: gold }}>5% COMMISSION</div><div style={{ color: muted, fontSize: '0.7rem' }}>You earn on every booking</div></div>
            <div><div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}><LeafIcon /></div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', color: gold }}>1 TONNE CO₂ OFFSET</div><div style={{ color: muted, fontSize: '0.7rem' }}>Paid by IMPT per stay</div></div>
            <div><div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}><GiftIcon /></div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', color: gold }}>€5 FREE CREDIT</div><div style={{ color: muted, fontSize: '0.7rem' }}>For your guest at signup</div></div>
            <div><div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}><ClockIcon /></div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', color: gold }}>90-DAY COOKIE</div><div style={{ color: muted, fontSize: '0.7rem' }}>Long attribution window</div></div>
          </div>
        </div>

        {/* Tips */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div className="scroll-animate" style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>HOTEL BOOKING TIPS</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>Expert <em style={{ color: gold }}>Advice</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {tips.map((item, i) => (
              <div key={i} className="tip-card" style={{ animationDelay: `${i * 0.15}s`, background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '24px', display: 'flex', gap: 16, alignItems: 'flex-start', borderRadius: '8px' }}>
                <div className="tip-icon" style={{ color: gold, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                <p style={{ color: gold, fontSize: '1.1rem', lineHeight: 1.6, margin: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Request trip */}
        <div className="scroll-animate" style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16, borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <CompassIcon />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>WANT US TO HANDLE IT FOR YOU?</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Tell us your destination and budget — we will research and book the perfect hotel on your behalf</p>
            </div>
          </div>
          <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap', borderRadius: '4px' }}>REQUEST A TRIP</Link>
        </div>

        {/* Related */}
        <div className="scroll-animate" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[{ label: 'Flights', href: '/flights' }, { label: 'Tours & Experiences', href: '/tours' }, { label: 'Airport Transfers', href: '/transfers' }, { label: 'Travel eSIM', href: '/esim' }].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s, transform 0.3s ease', borderRadius: '4px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold }}>{link.label} →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}