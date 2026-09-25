'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Building2, Car, Shield, Smartphone, Compass, Umbrella, ArrowLeftRight } from 'lucide-react'

const ALL_SERVICES = [
  { label: 'hotel', href: 'https://www.huuboi.com/hotels', icon: Building2, matchPrefix: '/hotel' },
  { label: 'car rental', href: 'https://www.huuboi.com/car-rentals', icon: Car, matchPrefix: '/car-rental' },
  { label: 'visa', href: 'https://www.huuboi.com/visa-requirements', icon: Shield, matchPrefix: '/visa' },
  { label: 'esim', href: 'https://www.huuboi.com/esim-select', icon: Smartphone, matchPrefix: '/esim' },
  { label: 'tours', href: 'https://www.huuboi.com/tours', icon: Compass, matchPrefix: '/tour' },
  { label: 'insurance', href: 'https://www.huuboi.com/insurance', icon: Umbrella, matchPrefix: '/insurance' },
  { label: 'transfers', href: 'https://www.huuboi.com/transfers', icon: ArrowLeftRight, matchPrefix: '/transfer' },
]

interface ServiceStripProps {
  exclude?: string
}

export function ServiceStrip({ exclude }: ServiceStripProps) {
  const pathname = usePathname()
  const [nearFooter, setNearFooter] = useState(false)

  const services = exclude
    ? ALL_SERVICES.filter(s => s.matchPrefix !== exclude)
    : ALL_SERVICES

  // Watch the page's real <footer>, and hide the sidebar once it's near.
  useEffect(() => {
    const footerEl = document.querySelector('footer')
    if (!footerEl) return
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: '0px 0px 200px 0px', threshold: 0 }
    )
    observer.observe(footerEl)
    return () => observer.disconnect()
  }, [])

  // Push page content over instead of overlapping it, by toggling a class
  // on <body>. This works regardless of how each page is laid out, since
  // ServiceStrip is dropped in standalone rather than wrapping children.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDesktop = window.innerWidth >= 900
    if (isDesktop && !nearFooter) {
      document.body.classList.add('has-service-sidebar')
    } else {
      document.body.classList.remove('has-service-sidebar')
    }
    return () => document.body.classList.remove('has-service-sidebar')
  }, [nearFooter])

  return (
    <>
      <style>{`
        body.has-service-sidebar {
          padding-left: 58px;
          transition: padding-left 0.3s ease;
        }
        @media (max-width: 900px) {
          body.has-service-sidebar { padding-left: 0; }
        }

        .ss-sidebar {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 850;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 10px 6px;
          background: rgba(8,8,7,0.92);
          border-right: 1px solid rgba(200,169,110,0.18);
          border-radius: 0 8px 8px 0;
          box-shadow: 4px 0 20px rgba(0,0,0,0.35);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .ss-sidebar.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-50%) translateX(-10px);
        }
        .ss-side-item {
          width: 46px;
          background: transparent;
          border: none;
          border-radius: 6px;
          padding: 7px 4px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          text-align: center;
          transition: background 0.2s ease;
          cursor: pointer;
        }
        .ss-side-item:hover { background: rgba(200,169,110,0.1); }
        .ss-side-item.active {
          background: rgba(200,169,110,0.12);
          border-left: 2px solid #C8A96E;
        }
        .ss-side-icon {
          color: #C8A96E;
          opacity: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ss-side-item:hover .ss-side-icon { opacity: 1; }
        .ss-side-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.38rem;
          letter-spacing: 0.08em;
          color: rgba(245,239,228,0.5);
          line-height: 1.1;
          text-transform: uppercase;
        }
        .ss-side-item:hover .ss-side-label { color: rgba(245,239,228,0.8); }
        .ss-side-item.active .ss-side-label { color: #C8A96E; }
        @media (max-width: 900px) { .ss-sidebar { display: none !important; } }
      `}</style>

      <nav className={`ss-sidebar${nearFooter ? ' hidden' : ''}`}>
        {services.map(s => {
          const Icon = s.icon
          const isActive = pathname.startsWith(s.matchPrefix)
          return (
            <a key={s.label} href={s.href} className={`ss-side-item${isActive ? ' active' : ''}`} title={s.label}>
              <span className="ss-side-icon"><Icon size={15} /></span>
              <span className="ss-side-label">{s.label.split(' ')[0]}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}