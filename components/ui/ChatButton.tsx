'use client'
import Link from 'next/link'

export function Footer() {
  const cols = [
    { title: 'Explore', links: [['Flights','/flights'],['Hotels','/hotels'],['Packages','/packages'],['Tours','/tours'],['Car Rentals','/car-rentals'],['Deals','/deals']] },
    { title: 'Destinations', links: [['Africa & Safari','/africa-safari'],['Middle East','/middle-east'],['Asia & Far East','/asia'],['Europe','/europe'],['Americas','/americas'],['Pacific','/pacific']] },
    { title: 'Tools', links: [['AI Trip Planner','/ai-planner'],['Budget Calculator','/budget-calculator'],['Price Alerts','/price-alerts'],['Map Explorer','/map-explorer'],['Travel Guides','/travel-guides'],['Blog','/blog']] },
    { title: 'Support', links: [['About Us','/about'],['Contact','/contact'],['Help Center','/help'],['Privacy Policy','/privacy-policy'],['Terms','/terms'],['Refund Policy','/refund-policy']] },
  ]
  return (
    <footer style={{ background: '#080807', borderTop: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,60px) clamp(28px,4vw,40px)' }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '0.15em', color: '#F5EFE4' }}>HUU</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2rem', letterSpacing: '0.15em', color: '#C8A96E' }}>BOI</span>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(200,169,110,0.5)', marginTop: 2 }}>GLOBAL TRAVEL</div>
            </div>
            <p style={{ color: 'rgba(245,239,228,0.5)', lineHeight: 1.8, fontSize: '0.875rem', maxWidth: 260, marginBottom: 16 }}>
              Curating extraordinary journeys across six continents. Luxury travel meets bold adventure.
            </p>
            <a href="mailto:hello@huuboi.com"
              style={{ fontSize: '0.78rem', color: '#C8A96E', textDecoration: 'none', letterSpacing: '0.05em', marginBottom: 28, display: 'block' }}>
              hello@huuboi.com
            </a>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Instagram','Facebook','Twitter','LinkedIn'].map(s => (
                <a key={s} href="#"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.4)', textDecoration: 'none' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#C8A96E'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,239,228,0.4)'}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 20 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}
                      style={{ fontSize: '0.8rem', color: 'rgba(245,239,228,0.5)', textDecoration: 'none' }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = '#F5EFE4'}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,239,228,0.5)'}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 28 }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.3)', margin: 0 }}>© 2026 HUUBOI.COM — Six Continents. One Platform. All rights reserved.</p>
          <p style={{ fontSize: '0.7rem', color: 'rgba(245,239,228,0.2)', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.15em', margin: 0 }}>BUILT ON NEXT.JS · VERCEL · SUPABASE</p>
        </div>
      </div>
    </footer>
  )
}
