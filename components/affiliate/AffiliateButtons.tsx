'use client'
import { AFFILIATES, buildTrackedUrl, type AffiliateParams } from '@/lib/affiliates'

interface Props {
  params: AffiliateParams
  layout?: 'grid' | 'row'
  title?: string
}

export function AffiliateButtons({ params, layout = 'grid', title }: Props) {
  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'

  const handleClick = (url: string, name: string) => {
    // Track click in analytics (add your analytics here)
    console.log(`Affiliate click: ${name}`)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      {title && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 8 }}>
            BOOK WITH OUR PARTNERS
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, color: cream }}>{title}</h3>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: layout === 'grid' ? 'repeat(4, 1fr)' : 'repeat(8, 1fr)',
        gap: layout === 'grid' ? 12 : 8
      }}>
        {AFFILIATES.map(affiliate => {
          const url = buildTrackedUrl(affiliate, params)
          return (
            <button
              key={affiliate.id}
              onClick={() => handleClick(url, affiliate.name)}
              style={{
                background: '#111110',
                border: '1px solid rgba(200,169,110,0.15)',
                padding: layout === 'grid' ? '20px 16px' : '12px 10px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'center' as const,
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `#${affiliate.color}60`
                el.style.background = `#${affiliate.color}10`
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(200,169,110,0.15)'
                el.style.background = '#111110'
                el.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: layout === 'grid' ? '1.8rem' : '1.4rem' }}>{affiliate.logo}</span>
              {layout === 'grid' && (
                <>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: cream }}>{affiliate.name}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: `#${affiliate.color}`, border: `1px solid #${affiliate.color}40`, padding: '2px 8px' }}>{affiliate.category}</div>
                </>
              )}
              {layout === 'row' && (
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(245,239,228,0.5)' }}>{affiliate.name}</div>
              )}
            </button>
          )
        })}
      </div>

      <p style={{ fontSize: '0.72rem', color: 'rgba(245,239,228,0.25)', marginTop: 12, fontStyle: 'italic' }}>
        We may earn a commission when you book through our partners — at no extra cost to you.
      </p>
    </div>
  )
}
