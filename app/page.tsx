'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Building2, Car, Shield, Smartphone, Package, ChevronUp, ChevronDown } from 'lucide-react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const ink = '#080807'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

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

const regionOrder = ['Africa', 'Middle East', 'Asia', 'Europe', 'Americas']

const testimonials = [
  { name: 'Sarah M.', location: 'London, UK', text: 'The Patagonia expedition was flawlessly organised. Every detail was handled — from the remote trekking lodges to the private glacier tours.', rating: 5 },
  { name: 'Ahmed K.', location: 'Dubai, UAE', text: 'A truly luxurious experience. The team understood exactly what I needed — discretion, quality, and unforgettable moments.', rating: 5 },
  { name: 'Yuki T.', location: 'Tokyo, Japan', text: "Booked the Serengeti package and I'm still in awe. The great migration was beyond anything I imagined.", rating: 5 },
]

const services = [
  { label: 'hotel', stat: '150K+', statLabel: 'STAYS', href: '/hotel', icon: Building2 },
  { label: 'car rental', stat: '24/7', statLabel: 'SERVICE', href: '/transfers', icon: Car },
  { label: 'visa', stat: '180+', statLabel: 'VISA-FREE', href: '/visa-requirements', icon: Shield },
  { label: 'esim', stat: '3,000+', statLabel: 'PLANS', href: '/esim', icon: Smartphone },
  { label: 'packages', stat: '400+', statLabel: 'DESTINATIONS', href: '/destinations', icon: Package },
]

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

function DestCard({ dest }: { dest: typeof destinations[0] }) {
  const { ref, visible } = useScrollReveal()
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    }}>
      <Link href={regionHubs[dest.region] || `/destinations/${dest.slug}`}
        style={{ textDecoration: 'none', display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: dest.gradient }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.92) 0%,rgba(8,8,7,0.2) 65%,transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(200,169,110,0.08)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', inset: 0, transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease', background: dest.gradient, zIndex: -1 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '14px' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', color: gold, marginBottom: 2 }}>{dest.region}</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(0.95rem,2vw,1.3rem)', fontWeight: 600, color: cream, lineHeight: 1.1, transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.3s ease' }}>{dest.name}</div>
          <div style={{ fontSize: '0.62rem', color: muted, marginTop: 2 }}>{dest.country}</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: gold, marginTop: 6, opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>EXPLORE →</div>
        </div>
      </Link>
    </div>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [pastStrip, setPastStrip] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const sidebarMode = pastStrip && !nearFooter
  const stripRef = useRef<HTMLDivElement>(null)
  const footerSentinelRef = useRef<HTMLDivElement>(null)
  const [openRegions, setOpenRegions] = useState<Set<string>>(new Set())

  const toggleRegion = (region: string) => {
    setOpenRegions(prev => {
      const next = new Set(prev)
      if (next.has(region)) next.delete(region)
      else next.add(region)
      return next
    })
  }

  const groupedDestinations = regionOrder
    .map(region => ({ region, items: destinations.filter(d => d.region === region) }))
    .filter(g => g.items.length > 0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return;
    const home = document.getElementById('flight-widget-home');
    const target = document.getElementById('flight-widget-target');
    if (home && target) {
      target.appendChild(home);
      home.style.display = 'block';
    }
    return () => {
      if (home) {
        document.body.appendChild(home);
        home.style.display = 'none';
      }
    };
  }, [mounted]);

  // ── SIDEBAR TOGGLE — appears once service row scrolls under navbar, hides again near footer ──
  useEffect(() => {
    if (!mounted) return;
    const stripEl = stripRef.current;
    const footerEl = footerSentinelRef.current;
    if (!stripEl || !footerEl) return;

    const isDesktop = () => window.innerWidth >= 900;

    let stripTimer: ReturnType<typeof setTimeout> | null = null;
    let footerTimer: ReturnType<typeof setTimeout> | null = null;

    const stripObserver = new IntersectionObserver(
      ([entry]) => {
        if (stripTimer) clearTimeout(stripTimer);
        const next = isDesktop() && !entry.isIntersecting && entry.boundingClientRect.top < 0;
        stripTimer = setTimeout(() => setPastStrip(next), 100);
      },
      { rootMargin: '-72px 0px 0px 0px', threshold: 0 }
    );
    stripObserver.observe(stripEl);

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (footerTimer) clearTimeout(footerTimer);
        const next = entry.isIntersecting;
        footerTimer = setTimeout(() => setNearFooter(next), 100);
      },
      { rootMargin: '0px 0px 300px 0px', threshold: 0 }
    );
    footerObserver.observe(footerEl);

    const onResize = () => { if (!isDesktop()) setPastStrip(false); };
    window.addEventListener('resize', onResize);

    return () => {
      stripObserver.disconnect();
      footerObserver.disconnect();
      window.removeEventListener('resize', onResize);
      if (stripTimer) clearTimeout(stripTimer);
      if (footerTimer) clearTimeout(footerTimer);
    };
  }, [mounted]);

  return (
    <>
      <style>{`
        .dest-grid-home { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .pkg-grid-home { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        .tpwl-widget .wl-tabs__item--hotels, .tpwl-widget [data-tab="hotels"], .tpwl-widget .mewtwo-hotels-checkbox { display: none !important; }
        .tpwl-widget button[type="submit"], .tpwl-widget .wl-button--primary { background: #C8A96E !important; color: #080807 !important; font-family: 'Bebas Neue', sans-serif !important; letter-spacing: 0.1em !important; }

        .service-strip {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          padding: 14px clamp(20px,4vw,48px);
          max-width: 1400px;
          margin: 0 auto;
        }
        .service-item {
          background: rgba(200,169,110,0.045);
          border: 1px solid rgba(200,169,110,0.2);
          border-radius: 10px;
          padding: 0 18px;
          height: 72px;
          text-align: left;
          text-decoration: none;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .service-item:hover {
          background: rgba(200,169,110,0.1);
          border-color: rgba(200,169,110,0.6);
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(200,169,110,0.16), 0 6px 14px rgba(0,0,0,0.35);
        }
        .service-icon-wrap {
          color: #C8A96E;
          opacity: 0.8;
          display: flex;
          flex-shrink: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .service-item:hover .service-icon-wrap {
          transform: scale(1.12);
          opacity: 1;
        }
        .service-text-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
          min-width: 0;
        }
        .service-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.85rem, 1.4vw, 1.05rem);
          font-style: italic;
          color: #F5EFE4;
          line-height: 1;
          white-space: nowrap;
        }
        .service-stat-wrap {
          display: flex;
          align-items: baseline;
          gap: 5px;
          flex-wrap: nowrap;
        }
        .service-stat {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.75rem, 1.2vw, 0.9rem);
          font-weight: 600;
          color: #C8A96E;
          line-height: 1;
          white-space: nowrap;
        }
        .service-stat-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.4rem, 0.7vw, 0.48rem);
          letter-spacing: 0.14em;
          color: rgba(245,239,228,0.35);
          white-space: nowrap;
        }

        .service-sidebar {
          position: fixed;
          left: 0;
          top: 72px;
          z-index: 850;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 10px;
          background: rgba(8,8,7,0.95);
          border-right: 1px solid rgba(200,169,110,0.2);
          box-shadow: 4px 0 24px rgba(0,0,0,0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          animation: sidebarIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes sidebarIn {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .sidebar-item {
          width: 58px;
          background: rgba(200,169,110,0.045);
          border: 1px solid rgba(200,169,110,0.2);
          border-radius: 7px;
          padding: 8px 4px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          text-align: center;
          transition: all 0.25s ease;
        }
        .sidebar-item:hover {
          background: rgba(200,169,110,0.12);
          border-color: rgba(200,169,110,0.6);
          transform: translateX(3px);
        }
        .sidebar-item-icon {
          color: #C8A96E;
          opacity: 0.85;
          display: flex;
        }
        .sidebar-item-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.56rem;
          font-style: italic;
          color: #F5EFE4;
          line-height: 1.05;
        }
        .sidebar-item-stat {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.34rem;
          letter-spacing: 0.06em;
          color: rgba(200,169,110,0.7);
        }
        .content-shift {
          transition: padding-left 0.3s ease;
        }

        /* ── REGION ACCORDION ── */
        .region-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .region-accordion-item {
          background: #111110;
          border: 1px solid rgba(200,169,110,0.15);
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.25s ease;
        }
        .region-accordion-item.is-open {
          border-color: rgba(200,169,110,0.4);
        }
        .region-header {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          text-align: left;
          transition: background 0.2s ease;
        }
        .region-header:hover {
          background: rgba(200,169,110,0.05);
        }
        .region-header-left {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }
        .region-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 2.4vw, 1.7rem);
          font-weight: 400;
          color: #F5EFE4;
        }
        .region-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: rgba(200,169,110,0.6);
        }
        .region-body {
          padding: 4px 22px 22px;
          animation: regionOpen 0.35s ease;
        }
        @keyframes regionOpen {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .service-strip { grid-template-columns: repeat(3, 1fr); }
          .dest-grid-home { grid-template-columns: repeat(2, 1fr); }
          .pkg-grid-home { grid-template-columns: repeat(2, 1fr); }
          .test-grid { grid-template-columns: 1fr; }
          .service-sidebar { display: none !important; }
        }
        @media (max-width: 480px) {
          .service-strip { grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 10px 14px; }
          .service-item { padding: 14px 8px; min-height: 84px; }
          .dest-grid-home { grid-template-columns: repeat(2, 1fr); }
          .pkg-grid-home { grid-template-columns: repeat(2, 1fr); }
          .region-header { padding: 15px 16px; }
          .region-body { padding: 4px 16px 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* ── HERO — full viewport, video background ── */}
      <section style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '100vh', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <video autoPlay muted loop playsInline poster="/images/hero-poster.jpg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100vh', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}>
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px', background: `linear-gradient(to bottom, ${ink} 0%, transparent 100%)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '240px', background: `linear-gradient(to top, ${ink} 0%, transparent 100%)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '180px', background: `linear-gradient(to right, ${ink} 0%, transparent 100%)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '180px', background: `linear-gradient(to left, ${ink} 0%, transparent 100%)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,7,0.42)', zIndex: 1, pointerEvents: 'none' }} />

        <div style={{
          position: 'relative', 
          zIndex: 2, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(80px,10vh,120px) clamp(24px,6vw,80px)',
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px,5vw,64px)',
            marginBottom: '40px',
            alignItems: 'start',
          }}>
            
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.28em', color: gold, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 1, background: gold, display: 'inline-block' }} />
                LUXURY GLOBAL TRAVEL
              </div>

              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.6rem,6.5vw,6.5rem)', fontWeight: 300, lineHeight: 0.9, color: cream, marginBottom: 20, letterSpacing: '-0.01em' }}>
                The World<br/>
                <em style={{ fontStyle: 'italic', color: gold }}>Awaits</em><br/>
                You
              </h1>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '24px',
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(1rem,1.8vw,1.25rem)', color: 'rgba(245,239,228,0.85)', lineHeight: 1.5, textAlign: 'right', margin: 0 }}>
                Six continents. Infinite stories.<br/>One platform.
              </p>
              
              <p style={{ fontSize: 'clamp(0.8rem,1.4vw,0.92rem)', color: 'rgba(245,239,228,0.75)', maxWidth: 380, lineHeight: 1.7, marginBottom: 0, fontWeight: 300, textAlign: 'right' }}>
                Bespoke journeys crafted for the discerning traveller.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', background: gold, color: ink, padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
                  EXPLORE DESTINATIONS
                </Link>
                <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.55)', color: gold, padding: '14px 32px', textDecoration: 'none', display: 'inline-block', backdropFilter: 'blur(4px)' }}>
                  AI TRIP PLANNER
                </Link>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(17,17,16,0.85)',
            border: '1px solid rgba(200,169,110,0.35)',
            padding: 'clamp(20px, 3vw, 32px)',
            borderRadius: '8px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}>
            <div id="flight-widget-target" style={{ width: '100%' }}></div>
          </div>
        </div>
      </section>

      {/* ── SERVICE ROW — normal flow; scrolls away, sidebar takes over ── */}
      <section ref={stripRef}>
        <div className="service-strip">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <Link key={s.label} href={s.href} className="service-item">
                <span className="service-icon-wrap"><Icon size={20} strokeWidth={1.4} /></span>
                <div className="service-text-col">
                  <div className="service-label">{s.label}</div>
                  {s.stat && (
                    <div className="service-stat-wrap">
                      <span className="service-stat">{s.stat}</span>
                      <span className="service-stat-label">{s.statLabel}</span>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── FIXED SIDEBAR — appears once service row scrolls under navbar ── */}
      {sidebarMode && (
        <div className="service-sidebar">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <Link key={s.label} href={s.href} className="sidebar-item">
                <span className="sidebar-item-icon"><Icon size={14} strokeWidth={1.4} /></span>
                <span className="sidebar-item-label">{s.label}</span>
                {s.stat && <span className="sidebar-item-stat">{s.stat}</span>}
              </Link>
            )
          })}
        </div>
      )}

      <div className="content-shift" style={{ paddingLeft: sidebarMode ? 78 : 0 }}>

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
                <p style={{ color: muted, fontSize: '0.8rem', lineHeight: 1.8 }}>
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

        {/* ── DESTINATIONS — region accordion, multi-open ── */}
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

            <div className="region-accordion-list">
              {groupedDestinations.map(group => {
                const isOpen = openRegions.has(group.region)
                return (
                  <div key={group.region} className={`region-accordion-item${isOpen ? ' is-open' : ''}`}>
                    <button className="region-header" onClick={() => toggleRegion(group.region)}>
                      <div className="region-header-left">
                        <span className="region-name">{group.region}</span>
                        <span className="region-count">{group.items.length} DESTINATIONS</span>
                      </div>
                      {isOpen ? <ChevronUp size={18} strokeWidth={1.5} color={gold} /> : <ChevronDown size={18} strokeWidth={1.5} color={gold} />}
                    </button>
                    {isOpen && (
                      <div className="region-body">
                        <div className="dest-grid-home">
                          {group.items.map((dest) => (
                            <DestCard key={dest.slug} dest={dest} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
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
                  <div style={{ color: gold, marginBottom: 12, display: 'flex', gap: 3 }}>
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

        <div ref={footerSentinelRef} style={{ height: 1 }} />
      </div>
    </>
  )
}