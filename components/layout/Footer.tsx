'use client'
import Link from 'next/link'
export function Footer() {
  const cols = [
    { title: 'Explore', links: [['Flights','/flights'],['Hotels','/hotels'],['Packages','/packages'],['Tours','/tours'],['Car Rentals','/car-rentals'],['Deals','/deals']] },
    { title: 'Destinations', links: [['Africa & Safari','/destinations#africa'],['Middle East','/destinations#middle-east'],['Asia & Far East','/destinations#asia'],['Europe','/destinations#europe'],['Americas','/destinations#americas'],['Arctic','/destinations#arctic']] },
    { title: 'Tools', links: [['AI Trip Planner','/ai-planner'],['Budget Calculator','/budget-calculator'],['Price Alerts','/price-alerts'],['Map Explorer','/map-explorer'],['Travel Guides','/travel-guides'],['Blog','/blog']] },
    { title: 'Support', links: [['About Us','/about'],['Contact','/contact'],['Help Center','/help'],['Privacy Policy','/privacy-policy'],['Terms','/terms'],['Refund Policy','/refund-policy']] },
  ]
  return (
    <footer style={{ background: '#080807', borderTop: '1px solid rgba(200,169,110,0.15)', padding: '80px 60px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: '#C8A96E', marginBottom: '20px', letterSpacing: '0.1em' }}>
              [YOUR <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#F5EFE4' }}>BRAND]</span>
            </div>
            <p style={{ color: 'rgba(245,239,228,0.5)', lineHeight: '1.8', fontSize: '0.875rem', maxWidth: '260px', marginBottom: '28px' }}>
              Curating extraordinary journeys across six continents. Luxury travel meets bold adventure.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['Instagram','Facebook','Twitter','LinkedIn'].map(s => (
                <a key={s} href="#" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#C8A96E'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,239,228,0.4)'}>{s}</a>
              ))}
            </div>
          </div>
          {/* Link Columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: '20px' }}>{col.title}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} style={{ fontSize: '0.8rem', color: 'rgba(245,239,228,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = '#F5EFE4'}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,239,228,0.5)'}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.3)' }}>© 2025 [YOUR BRAND]. All rights reserved.</p>
          <p style={{ fontSize: '0.7rem', color: 'rgba(245,239,228,0.2)', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.15em' }}>BUILT ON NEXT.JS · VERCEL · SUPABASE</p>
        </div>
      </div>
    </footer>
  )
}
