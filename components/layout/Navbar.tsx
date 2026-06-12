'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const ink = '#080807'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'

// ─────────────────────────────────────────────────────────────
// REGIONAL MAP ICONS (Updated per request)
// ─────────────────────────────────────────────────────────────

const GlobeIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const AfricaIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 3 C 12 3, 14 5, 14 8 C 14 11, 12 14, 10 16 C 8 14, 6 11, 6 8 C 6 5, 8 3, 10 3 Z" />
    <path d="M9 7h2M8 10h4M10 13v2" />
  </svg>
)

const MiddleEastIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 6 C 10 5, 12 7, 12 10 C 12 12, 10 13, 8 12 C 6 11, 6 9, 7 7 C 7 6, 8 6, 8 6 Z" />
    <path d="M9 8h2M9 10h2" />
  </svg>
)

const AsiaIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 4 C 10 3, 14 5, 15 8 C 16 11, 14 14, 11 15 C 8 16, 6 14, 5 11 C 4 8, 5 5, 7 4 Z" />
    <path d="M8 7h4M9 9h3M10 11h2" />
  </svg>
)

const EuropeIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 5 C 8 4, 10 5, 12 6 C 13 8, 12 10, 10 11 C 8 12, 6 11, 5 9 C 4 7, 5 6, 6 5 Z" />
    <path d="M7 7h3M8 9h2" />
  </svg>
)

const AmericasIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* North America */}
    <path d="M6 4 C 8 3, 10 5, 10 8 C 10 10, 8 11, 6 10 C 4 9, 4 6, 6 4 Z" />
    {/* South America */}
    <path d="M7 12 C 9 11, 11 13, 11 16 C 11 18, 9 19, 7 18 C 5 17, 5 14, 7 12 Z" />
    <path d="M8 6h2M9 14h2" />
  </svg>
)

const PacificIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* Australia/Oceania */}
    <path d="M8 6 C 10 5, 12 7, 12 9 C 12 11, 10 12, 8 11 C 6 10, 6 8, 7 7 C 7 6, 8 6, 8 6 Z" />
    {/* Pacific waves hint */}
    <path d="M14 7 C 15 6, 16 7, 17 8 C 16 9, 15 10, 14 9 Z" />
    <path d="M9 8h2M15 8h1" />
  </svg>
)

const WorldMapIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* Simplified Mercator outline */}
    <path d="M3 8 C 5 7, 7 8, 9 7 C 11 6, 13 7, 15 6 C 17 5, 18 6, 19 8 C 18 11, 17 12, 15 11 C 13 12, 11 11, 9 12 C 7 13, 5 12, 3 10 Z" />
    {/* Grid lines for map feel */}
    <path d="M6 8v4M12 7v5M18 8v4M4 10h16" />
  </svg>
)

// ─────────────────────────────────────────────────────────────
// OTHER ICONS
// ─────────────────────────────────────────────────────────────

const PhoneIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
  </svg>
)

const AIIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h4M7 16h10"/>
  </svg>
)

const CoinIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>
  </svg>
)

const BellIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

const SparkIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
)

const PassportIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/>
  </svg>
)

const StarIcon = ({ className = '', filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill={filled ? gold : 'none'} stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2 9.5 8.5 3 9.5l5 4.5-1.5 6.5L12 17l5.5 3.5-1.5-6.5 5-4.5-6.5-1z"/>
  </svg>
)

// ─────────────────────────────────────────────────────────────
// DATA ARRAYS
// ─────────────────────────────────────────────────────────────

const destLinks = [
  { label: 'All Destinations', href: '/destinations', icon: <GlobeIcon /> },
  { label: 'Africa & Safari', href: '/africa-safari', icon: <AfricaIcon /> },
  { label: 'Middle East', href: '/middle-east', icon: <MiddleEastIcon /> },
  { label: 'Asia & Far East', href: '/asia', icon: <AsiaIcon /> },
  { label: 'Europe', href: '/europe', icon: <EuropeIcon /> },
  { label: 'The Americas', href: '/americas', icon: <AmericasIcon /> },
  { label: 'Pacific & Oceania', href: '/pacific', icon: <PacificIcon /> },
  { label: 'Map Explorer', href: '/map-explorer', icon: <WorldMapIcon /> },
]

const navLinks = [
  { label: 'Search', href: '/search' },
  { label: 'Travel Guides', href: '/travel-guides' },
  { label: 'Blog', href: '/blog' },
  { label: 'Packages', href: '/packages', highlight: true },
]

const toolsLinks = [
  { label: 'eSIM Store', href: '/esim', icon: <PhoneIcon />, desc: 'Data in 150+ countries' },
  { label: 'AI Trip Planner', href: '/ai-planner', icon: <AIIcon />, desc: 'Build your itinerary' },
  { label: 'Budget Calculator', href: '/budget-calculator', icon: <CoinIcon />, desc: 'Estimate trip costs' },
  { label: 'Price Alerts', href: '/price-alerts', icon: <BellIcon />, desc: 'Best time to book' },
  { label: 'Travel Tips', href: '/travel-tips', icon: <SparkIcon />, desc: 'Expert advice' },
  { label: 'Visa Requirements', href: '/visa-requirements', icon: <PassportIcon />, desc: 'Entry rules by country' },
]

const moreLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Help Center', href: '/help' },
]

// ─────────────────────────────────────────────────────────────
// NAVBAR COMPONENT
// ─────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [destOpen, setDestOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const destRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false)
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false)
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const closeAll = () => {
    setMenuOpen(false)
    setDestOpen(false)
    setToolsOpen(false)
    setMoreOpen(false)
  }

  const dropdownBase: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 16px)',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(8,8,7,0.98)',
    border: '1px solid rgba(200,169,110,0.15)',
    backdropFilter: 'blur(20px)',
    zIndex: 100,
    minWidth: 220,
  }

  return (
    <>
      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile-btn { display: none !important; }
        .nav-cta-bar { display: flex !important; }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-cta-bar { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .nav-inner { padding: 0 20px !important; }
        }
        .drop-item:hover { background: rgba(200,169,110,0.08) !important; }
        .nav-btn:hover { color: #C8A96E !important; }
        .nav-link:hover { color: #C8A96E !important; }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || menuOpen ? 'rgba(8,8,7,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(200,169,110,0.12)' : '1px solid transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div className="nav-inner" style={{ padding: '0 48px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Logo */}
          <Link href="/" onClick={closeAll} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0, gap: 8 }}>
            <img
              src="/android-chrome-192x192.png"
              alt="HUUBOI"
              width={36}
              height={36}
              style={{ display: 'block', flexShrink: 0, borderRadius: '50%' }}
            />
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.08em', color: cream, lineHeight: 1 }}>HUUBOI</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.06em', color: 'rgba(200,169,110,0.5)', lineHeight: 1, marginLeft: 1 }}>.COM</span>
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ alignItems: 'center', gap: 28, flex: 1, justifyContent: 'center' }}>

            {/* Destinations dropdown */}
            <div ref={destRef} style={{ position: 'relative' }}>
              <button className="nav-btn"
                onClick={() => { setDestOpen(!destOpen); setToolsOpen(false); setMoreOpen(false) }}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.16em', color: destOpen ? gold : muted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0, transition: 'color 0.2s' }}>
                DESTINATIONS
                <span style={{ fontSize: '0.48rem', transition: 'transform 0.2s', transform: destOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▼</span>
              </button>
              {destOpen && (
                <div style={{ ...dropdownBase, minWidth: 240 }}>
                  <div style={{ padding: '8px 0' }}>
                    {destLinks.map(link => (
                      <Link key={link.href} href={link.href} onClick={closeAll}
                        className="drop-item"
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', textDecoration: 'none', transition: 'background 0.15s' }}>
                        <span style={{ width: 22, textAlign: 'center', flexShrink: 0 }}>{link.icon}</span>
                        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: cream }}>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Static links */}
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={closeAll}
                className="nav-link"
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.16em', color: link.highlight ? gold : muted, textDecoration: 'none', border: link.highlight ? '1px solid rgba(200,169,110,0.3)' : 'none', padding: link.highlight ? '6px 14px' : '0', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
                {link.highlight ? <><StarIcon className="inline mr-1" filled /> {link.label}</> : link.label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div ref={toolsRef} style={{ position: 'relative' }}>
              <button className="nav-btn"
                onClick={() => { setToolsOpen(!toolsOpen); setDestOpen(false); setMoreOpen(false) }}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.16em', color: toolsOpen ? gold : muted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0, transition: 'color 0.2s' }}>
                TOOLS
                <span style={{ fontSize: '0.48rem', transition: 'transform 0.2s', transform: toolsOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▼</span>
              </button>
              {toolsOpen && (
                <div style={{ ...dropdownBase, width: 280 }}>
                  <div style={{ padding: '8px 0' }}>
                    {toolsLinks.map(tool => (
                      <Link key={tool.href} href={tool.href} onClick={closeAll}
                        className="drop-item"
                        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 18px', textDecoration: 'none', transition: 'background 0.15s' }}>
                        <span style={{ width: 22, textAlign: 'center', flexShrink: 0 }}>{tool.icon}</span>
                        <div>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: cream }}>{tool.label}</div>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', color: 'rgba(245,239,228,0.35)', marginTop: 1 }}>{tool.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* More dropdown */}
            <div ref={moreRef} style={{ position: 'relative' }}>
              <button className="nav-btn"
                onClick={() => { setMoreOpen(!moreOpen); setDestOpen(false); setToolsOpen(false) }}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.16em', color: moreOpen ? gold : muted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0, transition: 'color 0.2s' }}>
                MORE
                <span style={{ fontSize: '0.48rem', transition: 'transform 0.2s', transform: moreOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▼</span>
              </button>
              {moreOpen && (
                <div style={dropdownBase}>
                  <div style={{ padding: '8px 0' }}>
                    {moreLinks.map(link => (
                      <Link key={link.href} href={link.href} onClick={closeAll}
                        className="drop-item"
                        style={{ display: 'block', padding: '11px 18px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: cream, textDecoration: 'none', transition: 'background 0.15s' }}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* CTA buttons */}
          <div className="nav-cta-bar" style={{ alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.14em', color: gold, textDecoration: 'none', border: '1px solid rgba(200,169,110,0.3)', padding: '8px 16px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
              <PhoneIcon className="w-4 h-4" /> eSIM
            </Link>
            <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.14em', color: muted, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              PLAN A TRIP
            </Link>
            <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: ink, padding: '10px 20px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              BOOK NOW
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ display: 'block', width: 24, height: 2, background: gold, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: gold, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: gold, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'rgba(8,8,7,0.99)', borderTop: '1px solid rgba(200,169,110,0.1)', padding: '20px 20px 32px', maxHeight: '85vh', overflowY: 'auto' }}>

            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.25em', color: 'rgba(200,169,110,0.4)', padding: '8px 0 6px' }}>DESTINATIONS</div>
            {destLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={closeAll}
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.82rem', letterSpacing: '0.15em', color: cream, textDecoration: 'none', padding: '11px 0', borderBottom: '1px solid rgba(200,169,110,0.06)' }}>
                <span style={{ width: 20 }}>{link.icon}</span>{link.label}
              </Link>
            ))}

            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={closeAll}
                style={{ display: 'block', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.95rem', letterSpacing: '0.2em', color: link.highlight ? gold : cream, textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                {link.highlight ? <><StarIcon className="inline mr-1" filled /> {link.label}</> : link.label}
              </Link>
            ))}

            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.25em', color: 'rgba(200,169,110,0.4)', padding: '14px 0 6px' }}>TOOLS & FEATURES</div>
            {toolsLinks.map(tool => (
              <Link key={tool.href} href={tool.href} onClick={closeAll}
                style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.82rem', letterSpacing: '0.15em', color: cream, textDecoration: 'none', padding: '11px 0', borderBottom: '1px solid rgba(200,169,110,0.06)' }}>
                <span style={{ width: 20 }}>{tool.icon}</span>{tool.label}
              </Link>
            ))}

            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.25em', color: 'rgba(200,169,110,0.4)', padding: '14px 0 6px' }}>COMPANY</div>
            {moreLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={closeAll}
                style={{ display: 'block', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.82rem', letterSpacing: '0.15em', color: cream, textDecoration: 'none', padding: '11px 0', borderBottom: '1px solid rgba(200,169,110,0.06)' }}>
                {link.label}
              </Link>
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <Link href="/esim" onClick={closeAll}
                style={{ flex: 1, textAlign: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', color: gold, textDecoration: 'none', border: '1px solid rgba(200,169,110,0.35)', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <PhoneIcon className="w-4 h-4" /> GET eSIM
              </Link>
              <Link href="/request-trip" onClick={closeAll}
                style={{ flex: 1, textAlign: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', background: gold, color: ink, textDecoration: 'none', padding: '14px' }}>
                PLAN A TRIP
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}