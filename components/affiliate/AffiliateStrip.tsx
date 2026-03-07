'use client'
import { AFFILIATES, buildTrackedUrl } from '@/lib/affiliates'

interface Props {
  destination?: string
}

export function AffiliateStrip({ destination = 'worldwide' }: Props) {
  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'

  return (
    <section style={{ background: '#0a0a08', borderTop: '1px solid rgba(200,169,110,0.08)', borderBottom: '1px solid rgba(200,169,110,0.08)', padding: '40px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, marginBottom: 6 }}>TRUSTED BOOKING PARTNERS</div>
            <p style={{ color: 'rgba(245,239,228,0.4)', fontSize: '0.82rem' }}>Compare prices across all platforms in one click</p>
          </div>
          <a href="/deals" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold, textDecoration: 'none', border: '1px solid rgba(200,169,110,0.3)', padding: '8px 20px' }}>VIEW ALL DEALS →</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2 }}>
          {AFFILIATES.map(affiliate => {
            const url = buildTrackedUrl(affiliate, { destination })
            return (
              <a key={affiliate.id} href={url} target="_blank" rel="noopener noreferrer sponsored"
                style={{
                  background: '#111110',
                  border: '1px solid rgba(200,169,110,0.08)',
                  padding: '18px 12px',
                  textDecoration: 'none',
                  textAlign: 'center' as const,
                  display: 'flex',
                  flexDirection: 'column' as const,
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `#${affiliate.color}50`
                  el.style.background = `#${affiliate.color}0d`
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(200,169,110,0.08)'
                  el.style.background = '#111110'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{affiliate.logo}</span>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(245,239,228,0.55)' }}>{affiliate.name}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.52rem', letterSpacing: '0.08em', color: `#${affiliate.color}99` }}>{affiliate.category}</div>
              </a>
            )
          })}
        </div>

        <p style={{ fontSize: '0.68rem', color: 'rgba(245,239,228,0.18)', marginTop: 14, textAlign: 'center' as const, fontStyle: 'italic' }}>
          We may earn a commission when you book through our partners — at no extra cost to you.
        </p>
      </div>
    </section>
  )
}
