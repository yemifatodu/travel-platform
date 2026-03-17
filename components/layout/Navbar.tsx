'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Deals', href: '/deals', highlight: true },
  { label: 'AI Planner', href: '/ai-planner' },
  { label: 'Packages', href: '/packages' },
  { label: 'Blog', href: '/blog' },
  { label: 'eSIM', href: '/esim' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile-btn { display: none; }
        .nav-cta { display: flex; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .nav-inner { padding: 0 20px !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || menuOpen ? 'rgba(8,8,7,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(200,169,110,0.12)' : '1px solid transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div className="nav-inner" style={{ padding: '0 60px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }} onClick={() => setMenuOpen(false)}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '0.12em', color: cream }}>HUU</span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '0.12em', color: gold }}>BOI</span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.95rem', letterSpacing: '0.08em', color: 'rgba(200,169,110,0.5)', marginLeft: 2 }}>.COM</span>
          </Link>

          {/* Desktop Links */}
          <div className="nav-desktop" style={{ alignItems: 'center', gap: 28 }}>
            {links.map(link => (
              <Link key={link.href} href={link.href} style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em',
                color: link.highlight ? gold : 'rgba(245,239,228,0.6)', textDecoration: 'none',
                border: link.highlight ? '1px solid rgba(200,169,110,0.35)' : 'none',
                padding: link.highlight ? '6px 16px' : '0',
              }}>
                {link.highlight ? `★ ${link.label}` : link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-cta" style={{ alignItems: 'center', gap: 16 }}>
            <Link href="/auth/login" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.5)', textDecoration: 'none' }}>SIGN IN</Link>
            <Link href="/deals" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', background: gold, color: ink, padding: '10px 22px', textDecoration: 'none' }}>BOOK NOW</Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 24, height: 2, background: gold, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: gold, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: gold, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div style={{
            background: 'rgba(8,8,7,0.98)', borderTop: '1px solid rgba(200,169,110,0.1)',
            padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: 4
          }}>
            {links.map(link => (
              <Link key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.2em',
                  color: link.highlight ? gold : cream, textDecoration: 'none',
                  padding: '14px 0', borderBottom: '1px solid rgba(200,169,110,0.08)',
                }}>
                {link.highlight ? `★ ${link.label}` : link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 12, marginTop: 20 }}>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                style={{ flex: 1, textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.8rem', letterSpacing: '0.15em', color: cream, textDecoration: 'none', border: '1px solid rgba(200,169,110,0.3)', padding: '14px' }}>
                SIGN IN
              </Link>
              <Link href="/deals" onClick={() => setMenuOpen(false)}
                style={{ flex: 1, textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.8rem', letterSpacing: '0.15em', background: gold, color: ink, textDecoration: 'none', padding: '14px' }}>
                BOOK NOW
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}