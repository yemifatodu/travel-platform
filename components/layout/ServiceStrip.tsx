'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Building2, Car, Shield, Smartphone, Compass, Umbrella, ArrowLeftRight } from 'lucide-react'

const ALL_SERVICES = [
  { label: 'hotel', stat: '150K+', statLabel: 'STAYS', href: 'https://www.huuboi.com/hotels', icon: Building2, matchPrefix: '/hotel' },
  { label: 'car rental', stat: '900+', statLabel: 'SUPPLIERS', href: 'https://www.huuboi.com/car-rentals', icon: Car, matchPrefix: '/car-rental' },
  { label: 'visa', stat: '180+', statLabel: 'VISA-FREE', href: 'https://www.huuboi.com/visa-requirements', icon: Shield, matchPrefix: '/visa' },
  { label: 'esim', stat: '3,000+', statLabel: 'PLANS', href: 'https://www.huuboi.com/esim-select', icon: Smartphone, matchPrefix: '/esim' },
  { label: 'tours & experiences', stat: '400+', statLabel: 'EXPERIENCES', href: 'https://www.huuboi.com/tours', icon: Compass, matchPrefix: '/tour' },
  { label: 'insurance', stat: '50+', statLabel: 'PROVIDERS', href: 'https://www.huuboi.com/insurance', icon: Umbrella, matchPrefix: '/insurance' },
  { label: 'transfers', stat: '200+', statLabel: 'ROUTES', href: 'https://www.huuboi.com/transfers', icon: ArrowLeftRight, matchPrefix: '/transfer' },
]

interface ServiceStripProps {
  exclude?: string
}

export function ServiceStrip({ exclude }: ServiceStripProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [pastStrip, setPastStrip] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)
  const footerSentinelRef = useRef<HTMLDivElement>(null)

  const sidebarMode = pastStrip && !nearFooter

  const services = exclude
    ? ALL_SERVICES.filter(s => s.matchPrefix !== exclude)
    : ALL_SERVICES

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const stripEl = stripRef.current
    const footerEl = footerSentinelRef.current
    if (!stripEl || !footerEl) return

    const isDesktop = () => window.innerWidth >= 900

    let stripTimer: ReturnType<typeof setTimeout> | null = null
    let footerTimer: ReturnType<typeof setTimeout> | null = null

    const stripObserver = new IntersectionObserver(
      ([entry]) => {
        if (stripTimer) clearTimeout(stripTimer)
        const next = isDesktop() && !entry.isIntersecting && entry.boundingClientRect.top < 0
        stripTimer = setTimeout(() => setPastStrip(next), 100)
      },
      { rootMargin: '-72px 0px 0px 0px', threshold: 0 }
    )
    stripObserver.observe(stripEl)

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (footerTimer) clearTimeout(footerTimer)
        const next = entry.isIntersecting
        footerTimer = setTimeout(() => setNearFooter(next), 100)
      },
      { rootMargin: '0px 0px 300px 0px', threshold: 0 }
    )
    footerObserver.observe(footerEl)

    const onResize = () => { if (!isDesktop()) setPastStrip(false) }
    window.addEventListener('resize', onResize)

    return () => {
      stripObserver.disconnect()
      footerObserver.disconnect()
      window.removeEventListener('resize', onResize)
      if (stripTimer) clearTimeout(stripTimer)
      if (footerTimer) clearTimeout(footerTimer)
    }
  }, [mounted])

  return (
    <>
      <style>{`
        .ss-strip {
          display: grid;
          grid-template-columns: repeat(${services.length}, 1fr);
          gap: 10px;
          padding: 14px clamp(20px,4vw,48px);
          max-width: 1400px;
          margin: 0 auto;
        }
        .ss-item {
          background: rgba(200,169,110,0.045);
          border: 1px solid rgba(200,169,110,0.2);
          border-radius: 10px;
          padding: 0 18px;
          height: 72px;
          text-decoration: none;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .ss-item:hover {
          background: rgba(200,169,110,0.1);
          border-color: rgba(200,169,110,0.6);
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(200,169,110,0.16), 0 6px 14px rgba(0,0,0,0.35);
        }
        .ss-icon {
          color: #C8A96E;
          opacity: 0.8;
          display: flex;
          flex-shrink: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .ss-item:hover .ss-icon { transform: scale(1.12); opacity: 1; }
        .ss-text { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .ss-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.85rem,1.4vw,1.05rem);
          font-style: italic;
          color: #F5EFE4;
          line-height: 1;
          white-space: nowrap;
        }
        .ss-stat-row { display: flex; align-items: baseline; gap: 5px; }
        .ss-stat {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.75rem,1.2vw,0.9rem);
          font-weight: 600;
          color: #C8A96E;
          line-height: 1;
          white-space: nowrap;
        }
        .ss-stat-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.4rem,0.7vw,0.48rem);
          letter-spacing: 0.14em;
          color: rgba(245,239,228,0.35);
          white-space: nowrap;
        }
        .ss-sidebar {
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
          animation: ssIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes ssIn {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .ss-side-item {
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
        .ss-side-item:hover {
          background: rgba(200,169,110,0.12);
          border-color: rgba(200,169,110,0.6);
          transform: translateX(3px);
        }
        .ss-side-icon { color: #C8A96E; opacity: 0.85; display: flex; }
        .ss-side-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.56rem;
          font-style: italic;
          color: #F5EFE4;
          line-height: 1.05;
        }
        .ss-side-stat {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.34rem;
          letter-spacing: 0.06em;
          color: rgba(200,169,110,0.7);
        }
        @media (max-width: 900px) {
          .ss-strip { grid-template-columns: repeat(3, 1fr); }
          .ss-sidebar { display: none !important; }
        }
        @media (max-width: 480px) {
          .ss-strip { grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 10px 14px; }
          .ss-item { padding: 14px 8px; min-height: 84px; }
        }
      `}</style>

      {/* Horizontal strip */}
      <div style={{ background: '#080807', borderBottom: '1px solid rgba(200,169,110,0.12)' }}>
        <div ref={stripRef} className="ss-strip">
          {services.map(s => {
            const Icon = s.icon
            const isActive = pathname.startsWith(s.matchPrefix)
            return (
              <a key={s.label} href={s.href} className="ss-item"
                style={{ borderColor: isActive ? 'rgba(200,169,110,0.6)' : undefined, background: isActive ? 'rgba(200,169,110,0.1)' : undefined }}
              >
                <span className="ss-icon"><Icon size={20} /></span>
                <span className="ss-text">
                  <span className="ss-label">{s.label}</span>
                  <span className="ss-stat-row">
                    <span className="ss-stat">{s.stat}</span>
                    <span className="ss-stat-label">{s.statLabel}</span>
                  </span>
                </span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Sidebar — appears when strip scrolls out of view, hides near footer */}
      {sidebarMode && (
        <nav className="ss-sidebar">
          {services.map(s => {
            const Icon = s.icon
            const isActive = pathname.startsWith(s.matchPrefix)
            return (
              <a key={s.label} href={s.href} className="ss-side-item"
                style={{ borderColor: isActive ? 'rgba(200,169,110,0.6)' : undefined, background: isActive ? 'rgba(200,169,110,0.12)' : undefined }}
              >
                <span className="ss-side-icon"><Icon size={16} /></span>
                <span className="ss-side-label">{s.label.split(' ')[0]}</span>
                <span className="ss-side-stat">{s.stat}</span>
              </a>
            )
          })}
        </nav>
      )}

      {/* Footer sentinel — when visible, sidebar hides */}
      <div ref={footerSentinelRef} style={{ position: 'absolute', bottom: 300, left: 0, width: 1, height: 1, pointerEvents: 'none' }} />
    </>
  )
}