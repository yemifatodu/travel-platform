'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Deals', href: '/deals', highlight: true },
  { label: 'AI Planner', href: '/ai-planner' },
  { label: 'Packages', href: '/packages' },
  { label: 'Blog', href: '/blog' },
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

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(8,8,7,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(200,169,110,0.12)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      transition: 'all 0.4s ease',
      padding: '0 60px',
      height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, color: gold, letterSpacing: '0.05em' }}>✦</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 600, color: cream, letterSpacing: '0.08em' }}>[YOUR BRAND]</span>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {links.map(link => (
          <Link key={link.href} href={link.href} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            color: link.highlight ? gold : 'rgba(245,239,228,0.6)',
            textDecoration: 'none',
            transition: 'color 0.2s',
            border: link.highlight ? `1px solid rgba(200,169,110,0.35)` : 'none',
            padding: link.highlight ? '6px 16px' : '0',
          }}>
            {link.highlight ? `★ ${link.label}` : link.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/auth/login" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.5)', textDecoration: 'none' }}>SIGN IN</Link>
        <Link href="/deals" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', background: gold, color: ink, padding: '10px 22px', textDecoration: 'none' }}>BOOK NOW</Link>
      </div>
    </nav>
  )
}
