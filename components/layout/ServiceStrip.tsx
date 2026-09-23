'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  Building2,
  Car,
  Shield,
  Smartphone,
  Umbrella,
  ArrowLeftRight,
} from 'lucide-react'

const ALL_SERVICES = [
  { label: 'hotel', stat: '150K+', statLabel: 'STAYS', href: 'https://www.huuboi.com/hotels', icon: Building2, matchPrefix: '/hotel' },
  { label: 'car rental', stat: '900+', statLabel: 'SUPPLIERS', href: 'https://www.huuboi.com/car-rentals', icon: Car, matchPrefix: '/car-rental' },
  { label: 'visa', stat: '180+', statLabel: 'VISA-FREE', href: 'https://www.huuboi.com/visa-requirements', icon: Shield, matchPrefix: '/visa' },
  { label: 'esim', stat: '3,000+', statLabel: 'PLANS', href: 'https://www.huuboi.com/esim-select', icon: Smartphone, matchPrefix: '/esim' },
  { label: 'insurance', stat: '50+', statLabel: 'PROVIDERS', href: 'https://www.huuboi.com/insurance', icon: Umbrella, matchPrefix: '/insurance' },
  { label: 'transfers', stat: '200+', statLabel: 'ROUTES', href: 'https://www.huuboi.com/transfers', icon: ArrowLeftRight, matchPrefix: '/transfer' },
]

interface ServiceStripProps {
  exclude?: string
}

export function ServiceStrip({ exclude }: ServiceStripProps) {
  const pathname = usePathname()
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const services = exclude
    ? ALL_SERVICES.filter(s => s.matchPrefix !== exclude)
    : ALL_SERVICES

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const stripStyles: React.CSSProperties = isSticky
    ? {
        position: 'fixed',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        zIndex: 40,
        flexDirection: 'column',
        width: 88,
        padding: '12px 0',
        borderRight: '1px solid rgba(200,169,110,0.15)',
        borderBottom: 'none',
        borderRadius: '0 8px 8px 0',
        gap: 4,
      }
    : {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        padding: '0 24px',
        borderBottom: '1px solid rgba(200,169,110,0.15)',
        borderRight: 'none',
        gap: 0,
        overflowX: 'auto',
      }

  return (
    <>
      <div ref={sentinelRef} style={{ height: 1, width: '100%' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#0a0908',
          ...stripStyles,
        }}
      >
        {services.map((service) => {
          const Icon = service.icon
          const isActive = pathname.startsWith(service.matchPrefix)

          return (
            <a
              key={service.label}
              href={service.href}
              style={{
                display: 'flex',
                flexDirection: isSticky ? 'column' : 'row',
                alignItems: 'center',
                gap: isSticky ? 4 : 10,
                padding: isSticky ? '10px 8px' : '14px 20px',
                textDecoration: 'none',
                borderBottom: !isSticky
                  ? `2px solid ${isActive ? '#C8A96E' : 'transparent'}`
                  : 'none',
                borderLeft: isSticky
                  ? `2px solid ${isActive ? '#C8A96E' : 'transparent'}`
                  : 'none',
                background: isActive ? 'rgba(200,169,110,0.06)' : 'transparent',
                transition: 'all 0.2s ease',
                minWidth: isSticky ? 'auto' : 'max-content',
                width: isSticky ? '100%' : 'auto',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(200,169,110,0.04)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon
                size={isSticky ? 18 : 14}
                color={isActive ? '#C8A96E' : 'rgba(245,239,228,0.5)'}
              />
              {!isSticky && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    color: isActive ? '#C8A96E' : 'rgba(245,239,228,0.7)',
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                  }}>
                    {service.label}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.55rem',
                    color: 'rgba(245,239,228,0.35)',
                    letterSpacing: '0.05em',
                  }}>
                    {service.stat} {service.statLabel}
                  </span>
                </div>
              )}
              {isSticky && (
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '0.45rem',
                  letterSpacing: '0.08em',
                  color: isActive ? '#C8A96E' : 'rgba(245,239,228,0.4)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}>
                  {service.label.split(' ')[0]}
                </span>
              )}
            </a>
          )
        })}
      </div>
    </>
  )
}