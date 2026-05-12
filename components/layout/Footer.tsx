'use client'
import Link from 'next/link'

export function Footer() {
  const cols = [
    {
      title: 'Explore',
      links: [
        ['Flights', 'https://tpwidg.com/wl_web/main.js?wl_id=15518'],
        ['Hotels', '/hotel'],
        ['Packages', '/packages'],
        ['Tours', '/tours'],
        ['Car Rentals', '/car-rentals'],
        ['Deals', '/deals'],
      ],
    },
    {
      title: 'Destinations',
      links: [
        ['Africa & Safari', '/africa-safari'],
        ['Middle East', '/middle-east'],
        ['Asia & Far East', '/asia'],
        ['Europe', '/europe'],
        ['Americas', '/americas'],
        ['Pacific', '/pacific'],
      ],
    },
    {
      title: 'Tools',
      links: [
        ['AI Trip Planner', '/ai-planner'],
        ['Budget Calculator', '/budget-calculator'],
        ['Price Alerts', '/price-alerts'],
        ['Map Explorer', '/map-explorer'],
        ['Travel Guides', '/travel-guides'],
        ['Blog', '/blog'],
      ],
    },
    {
      title: 'Support',
      links: [
        ['About Us', '/about'],
        ['Contact', '/contact'],
        ['Help Center', '/help'],
        ['Privacy Policy', '/privacy-policy'],
        ['Terms', '/terms'],
        ['Refund Policy', '/refund-policy'],
      ],
    },
  ]

  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/huuboitravels?igsh=MXhldHJzc2V1Mzdj',
      icon: 'instagram',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61579603199657',
      icon: 'facebook',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/huuboitravels',
      icon: 'x',
    },
    {
      name: 'TikTok',
      url: 'https://vm.tiktok.com/ZS9FxubBuAmeQ-4WyRS/',
      icon: 'tiktok',
    },
    {
      name: 'Threads',
      url: 'https://www.threads.com/@huuboitravels',
      icon: 'threads',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@huuboi?si=JtHAJCigZJEyovGx',
      icon: 'youtube',
    },
  ]

  const SocialIcon = ({ type }: { type: string }) => {
    const size = 16

    switch (type) {
      case 'instagram':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10z"/>
          </svg>
        )

      case 'facebook':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0114 6h2v3h-2c-.6 0-1 .4-1 1V12h3l-.5 3H13v7A10 10 0 0022 12z"/>
          </svg>
        )

      case 'x':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6 6-6z"/>
          </svg>
        )

      case 'tiktok':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 2c.5 2.5 2.2 4.5 4.7 5v3c-2 0-3.8-.6-5.7-1.7V16a6 6 0 11-6-6c.5 0 1 .1 1.5.2v3.2A3 3 0 1012 16V2h4z"/>
          </svg>
        )

      case 'threads':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9zm0 3a6 6 0 100 12 6 6 0 000-12z"/>
          </svg>
        )

      case 'youtube':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.6 7.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C15 3.6 12 3.6 12 3.6h-.1s-3 0-6.7.3c-.5 0-1.3.1-2.1 1C2.5 5.6 2.3 7.2 2.3 7.2S2 9 2 10.8v1.4C2 14 2.3 15.8 2.3 15.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 6.5.3 6.5.3s3 0 6.7-.3c.5 0 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.3-1.8.3-3.6v-1.4c0-1.8-.3-3.6-.3-3.6zM10 14.5v-5l5 2.5-5 2.5z"/>
          </svg>
        )

      default:
        return null
    }
  }

  return (
    <footer
      className="main-footer"
      style={{
        background: '#080807',
        borderTop: '1px solid rgba(200,169,110,0.15)',
        padding:
          'clamp(32px,5vw,55px) clamp(20px,5vw,60px) clamp(20px,3vw,30px)',
      }}
    >
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .brand-col {
            grid-column: span 2;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid">

          {/* BRAND */}
          <div className="brand-col">
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: '#F5EFE4' }}>HUU</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', color: '#C8A96E' }}>BOI</span>
              <div style={{ fontSize: '0.6rem', color: 'rgba(200,169,110,0.5)' }}>
                GLOBAL TRAVEL
              </div>
            </div>

            <p style={{ color: 'rgba(245,239,228,0.5)', fontSize: '0.875rem', maxWidth: 260 }}>
              Curating extraordinary journeys across six continents.
            </p>

            <a
              href="mailto:hello@huuboi.com"
              style={{ color: '#C8A96E', fontSize: '0.78rem', display: 'block', marginBottom: 14 }}
            >
              hello@huuboi.com
            </a>

            {/* SOCIAL ICONS */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(200,169,110,0.08)',
                    border: '1px solid rgba(200,169,110,0.15)',
                    color: 'rgba(245,239,228,0.6)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = '#C8A96E'
                    el.style.color = '#080807'
                    el.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(200,169,110,0.08)'
                    el.style.color = 'rgba(245,239,228,0.6)'
                    el.style.transform = 'translateY(0px)'
                  }}
                >
                  <SocialIcon type={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNS */}
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ color: '#C8A96E', marginBottom: 14, fontSize: '0.7rem' }}>
                {col.title}
              </div>

              <ul style={{ listStyle: 'none', padding: 0 }}>
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} style={{ color: 'rgba(245,239,228,0.5)', fontSize: '0.8rem' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 20 }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.3)' }}>
            © 2026 HUUBOI.COM — Six Continents. One Platform.
          </p>
          <p style={{ fontSize: '0.7rem', color: 'rgba(245,239,228,0.2)' }}>
            BUILT ON NEXT.JS · VERCEL · SUPABASE
          </p>
        </div>
      </div>
    </footer>
  )
}