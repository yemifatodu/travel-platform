'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const ink = '#080807'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'

const destLinks = [
  { label: 'All Destinations', href: '/destinations', icon: '🌍' },
  { label: 'Africa & Safari', href: '/africa-safari', icon: '🦁' },
  { label: 'Middle East', href: '/middle-east', icon: '🕌' },
  { label: 'Asia & Far East', href: '/asia', icon: '⛩' },
  { label: 'Europe', href: '/europe', icon: '🏰' },
  { label: 'The Americas', href: '/americas', icon: '🌎' },
  { label: 'Pacific & Oceania', href: '/pacific', icon: '🌊' },
  { label: 'Map Explorer', href: '/map-explorer', icon: '🗺' },
]

const navLinks = [
  { label: 'Search', href: '/search' },
  { label: 'Travel Guides', href: '/travel-guides' },
  { label: 'Blog', href: '/blog' },
  { label: 'Packages', href: '/packages', highlight: true },
]

const toolsLinks = [
  { label: 'eSIM Store', href: '/esim', icon: '📱', desc: 'Data in 150+ countries' },
  { label: 'AI Trip Planner', href: '/ai-planner', icon: '🤖', desc: 'Build your itinerary' },
  { label: 'Budget Calculator', href: '/budget-calculator', icon: '💰', desc: 'Estimate trip costs' },
  { label: 'Price Alerts', href: '/price-alerts', icon: '🔔', desc: 'Best time to book' },
  { label: 'Travel Tips', href: '/travel-tips', icon: '✦', desc: 'Expert advice' },
  { label: 'Visa Requirements', href: '/visa-requirements', icon: '🛂', desc: 'Entry rules by country' },
]

const moreLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Help Center', href: '/help' },
]

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
          <Link href="/" onClick={closeAll} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0, gap: 10 }}>
            <img src="/huuboi-logo.webp" alt="HUUBOI" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.12em', color: cream }}>HUU</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.4rem', letterSpacing: '0.12em', color: gold }}>BOI</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', letterSpacing: '0.08em', color: 'rgba(200,169,110,0.45)', marginLeft: 2 }}>.COM</span>
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
                        <span style={{ fontSize: '1rem', width: 22, textAlign: 'center', flexShrink: 0 }}>{link.icon}</span>
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
                {link.highlight ? `★ ${link.label}` : link.label}
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
                        <span style={{ fontSize: '1rem', width: 22, textAlign: 'center', flexShrink: 0 }}>{tool.icon}</span>
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
            <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.14em', color: gold, textDecoration: 'none', border: '1px solid rgba(200,169,110,0.3)', padding: '8px 16px', whiteSpace: 'nowrap' }}>
              📱 eSIM
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
                <span>{link.icon}</span>{link.label}
              </Link>
            ))}

            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={closeAll}
                style={{ display: 'block', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.95rem', letterSpacing: '0.2em', color: link.highlight ? gold : cream, textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                {link.highlight ? `★ ${link.label}` : link.label}
              </Link>
            ))}

            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.25em', color: 'rgba(200,169,110,0.4)', padding: '14px 0 6px' }}>TOOLS & FEATURES</div>
            {toolsLinks.map(tool => (
              <Link key={tool.href} href={tool.href} onClick={closeAll}
                style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.82rem', letterSpacing: '0.15em', color: cream, textDecoration: 'none', padding: '11px 0', borderBottom: '1px solid rgba(200,169,110,0.06)' }}>
                <span style={{ fontSize: '0.9rem' }}>{tool.icon}</span>{tool.label}
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
                style={{ flex: 1, textAlign: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', color: gold, textDecoration: 'none', border: '1px solid rgba(200,169,110,0.35)', padding: '14px' }}>
                📱 GET eSIM
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
