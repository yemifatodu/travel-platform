'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// SVG Icons (gold stroke, 1.5px width)
const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  </svg>
)
const IdCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h.01M11 15h2M7 11h.01M15 11h2M7 7h10"/>
  </svg>
)
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const FuelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 22v-8a2 2 0 0 1 2-2h2.5a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h2"/><path d="M7 15v7"/><path d="M3 18h8"/>
  </svg>
)
const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
  </svg>
)
const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6-10V4m6 3l5.447-2.724A1 1 0 0 1 21 5.618v10.764a1 1 0 0 1-.553.894L15 20v-6"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
  </svg>
)

const tips = [
  { icon: <ClipboardIcon />, tip: 'Always book in advance — prices increase significantly closer to your travel date, especially in peak season.' },
  { icon: <IdCardIcon />, tip: 'Carry your driving licence plus an International Driving Permit (IDP) — required in many countries outside your home nation.' },
  { icon: <ShieldIcon />, tip: 'Check what insurance is included. CDW (Collision Damage Waiver) is essential — decline the full excess waiver if your credit card covers it.' },
  { icon: <FuelIcon />, tip: 'Note the fuel policy before you drive away. Full-to-full is always best — avoid pre-pay fuel options.' },
  { icon: <CameraIcon />, tip: 'Photograph the car thoroughly before driving off — every scratch, dent and mark — and make sure the agent notes any existing damage.' },
  { icon: <MapIcon />, tip: 'Download offline maps before picking up. Mobile data can be patchy in remote areas and roaming charges expensive without an eSIM.' },
]

export default function CarRentalsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // ==========================================
  // 1. DOM PARKING FOR CAR WIDGETS
  // ==========================================
  useEffect(() => {
    if (!mounted) return;

    const home1 = document.getElementById('car-widget-home-1');
    const home3 = document.getElementById('car-widget-home-3');
    const target1 = document.getElementById('car-rent-widget-container-1');
    const target3 = document.getElementById('car-rent-widget-container-3');
    
    if (home1 && target1) {
      target1.appendChild(home1);
      home1.style.display = 'block';
    }
    if (home3 && target3) {
      target3.appendChild(home3);
      home3.style.display = 'block';
    }

    return () => {
      if (home1) {
        document.body.appendChild(home1);
        home1.style.display = 'none';
      }
      if (home3) {
        document.body.appendChild(home3);
        home3.style.display = 'none';
      }
    };
  }, [mounted]);

  // ==========================================
  // 2. SCROLL ANIMATIONS
  // ==========================================
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
      
      {/* Animations CSS */}
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .scroll-animate { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        
        .tip-card { 
          opacity: 0; 
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; 
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; 
        }
        .tip-card:hover { 
          transform: translateY(-6px); 
          border-color: rgba(200, 169, 110, 0.5) !important; 
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4); 
        }
        .tip-card:hover .tip-icon { 
          transform: scale(1.1); 
          filter: drop-shadow(0 0 8px rgba(200, 169, 110, 0.4)); 
        }
        .tip-icon { transition: all 0.3s ease; }

        .related-card { transition: border-color 0.3s ease, transform 0.3s ease; }
        .related-card:hover { 
          border-color: rgba(200,169,110,0.4) !important; 
          transform: translateY(-4px); 
        }
      `}</style>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0808,#100c08,#080a10)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            CAR RENTALS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Drive the<br /><em style={{ color: gold }}>World</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 48 }}>
            Compare car rental prices from 900+ suppliers worldwide. Economy to luxury, city runabouts to 4WD safari vehicles — find the right car at the right price.
          </p>

          {/* WIDGET 1 Container */}
          <div style={{ 
            background: '#111110', 
            border: '1px solid rgba(200,169,110,0.2)', 
            padding: 'clamp(16px,3vw,36px)', 
            maxWidth: 860, 
            position: 'relative', 
            zIndex: 1,
            contain: 'layout style paint',
            overflow: 'hidden',
            borderRadius: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 20 }}>SEARCH RENTALS & TRANSFERS</div>
            
            <div 
              id="car-rent-widget-container-1" 
              style={{ minHeight: '100px', position: 'relative', contain: 'layout style paint', overflow: 'hidden' }} 
            />

            <p style={{ color: dim, fontSize: '0.75rem', textAlign: 'center', marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>
              Best price guarantee · Powered by global local networks
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Tips - Now with staggered scroll animations and hover effects */}
        <div className="scroll-animate" style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 'clamp(48px,7vw,80px)', borderRadius: '8px' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>RENTAL TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {tips.map((item, i) => (
              <div key={i} className="tip-card" style={{ animationDelay: `${i * 0.15}s`, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '24px', display: 'flex', gap: 16, alignItems: 'flex-start', borderRadius: '8px' }}>
                <span className="tip-icon" style={{ flexShrink: 0, marginTop: '2px', color: gold }}>{item.icon}</span>
                <p style={{ color: gold, fontSize: '1.05rem', lineHeight: 1.6, margin: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* eSIM strip - Now with scroll animation */}
        <div className="scroll-animate" style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(48px,7vw,80px)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PhoneIcon />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>DRIVING ABROAD?</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get a travel eSIM — offline maps, navigation and local data without roaming fees</p>
            </div>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap', borderRadius: '4px' }}>
            GET ESIM
          </Link>
        </div>

        {/* WIDGET 3 Container - Now with scroll animation */}
        <div className="scroll-animate" style={{ 
          background: '#111110', 
          border: '1px solid rgba(200,169,110,0.15)', 
          padding: 'clamp(20px,3vw,40px)', 
          marginBottom: 'clamp(48px,7vw,80px)', 
          position: 'relative', 
          zIndex: 1,
          contain: 'layout style paint',
          overflow: 'hidden',
          borderRadius: '8px'
        }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, textAlign: 'center' }}>COMPARE MORE RATES</div>
          
          <div 
            id="car-rent-widget-container-3" 
            style={{ minHeight: '100px', position: 'relative', contain: 'layout style paint', overflow: 'hidden' }} 
          />
        </div>

        {/* Related Links - Now with hover lift animation */}
        <div className="scroll-animate" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { label: 'Airport Transfers', href: '/transfers' },
            { label: 'Travel Insurance', href: '/help' },
            { label: 'Visa Requirements', href: '/visa-requirements' },
            { label: 'Budget Calculator', href: '/budget-calculator' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div className="related-card" style={{ 
                background: '#111110', 
                border: '1px solid rgba(200,169,110,0.1)', 
                padding: '18px 20px',
                borderRadius: '8px'
              }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold }}>{link.label} →</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}