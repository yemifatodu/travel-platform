'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plane, Building2, Car, Shield, Smartphone, Compass } from 'lucide-react'

const gold = '#C8A96E'
const cream = '#F5EFE4'

// Full source list — the strip always drops whichever entry matches the
// current page (no point linking to where you already are) and shows the
// rest, so the visible set adapts per page while staying at 5 items.
const ALL_SERVICES = [
  { label: 'flights', stat: '1,200+', statLabel: 'AIRLINES', href: '/flights', icon: Plane, matchPrefix: '/flights' },
  { label: 'hotel', stat: '150K+', statLabel: 'STAYS', href: '/hotel', icon: Building2, matchPrefix: '/hotel' },
  { label: 'car rental', stat: '900+', statLabel: 'SUPPLIERS', href: '/car-rentals', icon: Car, matchPrefix: '/car-rentals' },
  { label: 'visa', stat: '180+', statLabel: 'VISA-FREE', href: '/visa-requirements', icon: Shield, matchPrefix: '/visa-requirements' },
  { label: 'esim', stat: '3,000+', statLabel: 'PLANS', href: '/esim', icon: Smartphone, matchPrefix: '/esim' },
  { label: 'tours & experiences', stat: '400+', statLabel: 'EXPERIENCES', href: '/tours', icon: Compass, matchPrefix: '/tours' },
]

/**
 * Same widget and scroll behavior as the homepage's service strip
 * (app/page.tsx) — kept as a self-contained copy here rather than a shared
 * import so this page's chrome can evolve independently without risking the
 * homepage. If the two ever need to change in lockstep, worth extracting
 * both into a single shared component at that point.
 */
export default function HotelServiceStrip({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Drop whichever service matches the current page, then take the first 5
  // of what's left — keeps the grid at a consistent 5 columns regardless of
  // which page you're on.
  const services = ALL_SERVICES.filter((s) => !pathname.startsWith(s.matchPrefix)).slice(0, 5)

  const [mounted, setMounted] = useState(false)
  const [pastStrip, setPastStrip] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const sidebarMode = pastStrip && !nearFooter
  const stripRef = useRef<HTMLDivElement>(null)
  const footerSentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

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
        footerTimer = setTimeout(() => setNearFooter(entry.isIntersecting), 100)
      },
      { rootMargin: '200px 0px 0px 0px', threshold: 0 }
    )
    footerObserver.observe(footerEl)

    return () => {
      stripObserver.disconnect()
      footerObserver.disconnect()
      if (stripTimer) clearTimeout(stripTimer)
      if (footerTimer) clearTimeout(footerTimer)
    }
  }, [mounted])

  return (
    <>
      <section ref={stripRef}>
        <div className="hotel-service-strip">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <Link key={s.label} href={s.href} className="hotel-service-item">
                <span className="hotel-service-icon-wrap">
                  <Icon size={20} strokeWidth={1.4} />
                </span>
                <div className="hotel-service-text-col">
                  <div className="hotel-service-label">{s.label}</div>
                  {s.stat && (
                    <div className="hotel-service-stat-wrap">
                      <span className="hotel-service-stat">{s.stat}</span>
                      <span className="hotel-service-stat-label">{s.statLabel}</span>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {sidebarMode && (
        <div className="hotel-service-sidebar">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <Link key={s.label} href={s.href} className="hotel-sidebar-item">
                <span className="hotel-sidebar-item-icon">
                  <Icon size={14} strokeWidth={1.4} />
                </span>
                <span className="hotel-sidebar-item-label">{s.label}</span>
                {s.stat && <span className="hotel-sidebar-item-stat">{s.stat}</span>}
              </Link>
            )
          })}
        </div>
      )}

      <div className="hotel-content-shift" style={{ paddingLeft: sidebarMode ? 78 : 0 }}>
        {children}
        <div ref={footerSentinelRef} style={{ height: 1 }} />
      </div>

      <style>{`
        .hotel-service-strip {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          padding: 14px clamp(20px,4vw,48px);
          max-width: 1400px;
          margin: 0 auto;
        }
        .hotel-service-item {
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
        .hotel-service-item:hover {
          background: rgba(200,169,110,0.1);
          border-color: rgba(200,169,110,0.6);
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(200,169,110,0.16), 0 6px 14px rgba(0,0,0,0.35);
        }
        .hotel-service-icon-wrap {
          color: ${gold};
          opacity: 0.8;
          display: flex;
          flex-shrink: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .hotel-service-item:hover .hotel-service-icon-wrap {
          transform: scale(1.12);
          opacity: 1;
        }
        .hotel-service-text-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
          min-width: 0;
        }
        .hotel-service-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.85rem, 1.4vw, 1.05rem);
          font-style: italic;
          color: ${cream};
          line-height: 1;
          white-space: nowrap;
        }
        .hotel-service-stat-wrap {
          display: flex;
          align-items: baseline;
          gap: 5px;
          flex-wrap: nowrap;
        }
        .hotel-service-stat {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.75rem, 1.2vw, 0.9rem);
          font-weight: 600;
          color: ${gold};
          line-height: 1;
          white-space: nowrap;
        }
        .hotel-service-stat-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(0.4rem, 0.7vw, 0.48rem);
          letter-spacing: 0.14em;
          color: rgba(245,239,228,0.35);
          white-space: nowrap;
        }
        .hotel-service-sidebar {
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
          animation: hotelSidebarIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes hotelSidebarIn {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .hotel-sidebar-item {
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
        .hotel-sidebar-item:hover {
          background: rgba(200,169,110,0.12);
          border-color: rgba(200,169,110,0.6);
          transform: translateX(3px);
        }
        .hotel-sidebar-item-icon {
          color: ${gold};
          opacity: 0.85;
          display: flex;
        }
        .hotel-sidebar-item-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.56rem;
          font-style: italic;
          color: ${cream};
          line-height: 1.05;
        }
        .hotel-sidebar-item-stat {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.34rem;
          letter-spacing: 0.06em;
          color: rgba(200,169,110,0.7);
        }
        .hotel-content-shift {
          transition: padding-left 0.3s ease;
        }
        @media (max-width: 1100px) {
          .hotel-service-strip { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .hotel-service-sidebar { display: none !important; }
        }
        @media (max-width: 640px) {
          .hotel-service-strip { grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 10px 14px; }
          .hotel-service-item { padding: 14px 8px; min-height: 84px; }
        }
      `}</style>
    </>
  )
}
