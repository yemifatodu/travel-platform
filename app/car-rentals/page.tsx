'use client'
import Link from 'next/link'
import Script from 'next/script'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const tips = [
  { icon: '📋', tip: 'Always book in advance — prices increase significantly closer to your travel date, especially in peak season.' },
  { icon: '🪪', tip: 'Carry your driving licence plus an International Driving Permit (IDP) — required in many countries outside your home nation.' },
  { icon: '🛡', tip: 'Check what insurance is included. CDW (Collision Damage Waiver) is essential — decline the full excess waiver if your credit card covers it.' },
  { icon: '⛽', tip: 'Note the fuel policy before you drive away. Full-to-full is always best — avoid pre-pay fuel options.' },
  { icon: '📸', tip: 'Photograph the car thoroughly before driving off — every scratch, dent and mark — and make sure the agent notes any existing damage.' },
  { icon: '🗺', tip: 'Download offline maps before picking up. Mobile data can be patchy in remote areas and roaming charges expensive without an eSIM.' },
]

export default function CarRentalsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0808,#100c08,#080a10)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            CAR RENTALS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Drive the<br /><em style={{ color: gold }}>World</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 48 }}>
            Compare car rental prices from 900+ suppliers worldwide. Economy to luxury, city runabouts to 4WD safari vehicles — find the right car at the right price.
          </p>

          {/* SCRIPT 1: Top Whitelist Widget */}
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(16px,3vw,36px)', maxWidth: 860 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 20 }}>SEARCH RENTALS & TRANSFERS</div>
            
            <div style={{ minHeight: '100px' }}>
              <Script 
                id="car-rent-widget-1"
                src="https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&locale=en&powered_by=true&transfer_options_limit=10&transfer_options=MCR&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879" 
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>
            <p style={{ color: dim, fontSize: '0.75rem', textAlign: 'center', marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>
              Best price guarantee · Powered by global local networks
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* SCRIPT 2: Middle Whitelist Widget */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,40px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, textAlign: 'center' }}>FIND THE BEST DEALS</div>
          <div style={{ minHeight: '120px' }}>
            <Script 
              id="car-rent-widget-2"
              src="https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&powered_by=true&border_radius=5&plain=true&show_logo=true&color_background=%23ffca28&color_button=%2355a539&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10" 
              strategy="afterInteractive"
              charSet="utf-8"
            />
          </div>
        </div>

        {/* Tips */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>RENTAL TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {tips.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* eSIM strip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 DRIVING ABROAD?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get a travel eSIM — offline maps, navigation and local data without roaming fees</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET ESIM
          </Link>
        </div>

        {/* SCRIPT 3: Bottom Whitelist Widget */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,40px)', marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, textAlign: 'center' }}>COMPARE MORE RATES</div>
          <div style={{ minHeight: '100px' }}>
            <Script 
              id="car-rent-widget-3"
              src="https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&powered_by=true&campaign_id=172&promo_id=4850" 
              strategy="afterInteractive"
              charSet="utf-8"
            />
          </div>
        </div>

        {/* Related */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Airport Transfers', href: '/transfers' },
            { label: 'Travel Insurance', href: '/help' },
            { label: 'Visa Requirements', href: '/visa-requirements' },
            { label: 'Budget Calculator', href: '/budget-calculator' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold }}>{link.label} →</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}