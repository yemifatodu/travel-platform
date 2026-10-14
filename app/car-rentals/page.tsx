'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ServiceStrip } from '@/components/layout/ServiceStrip'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'

const WIDGET_1 = 'https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&locale=en&powered_by=true&transfer_options_limit=10&transfer_options=MCR&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879'
const WIDGET_2 = 'https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&powered_by=true&border_radius=5&plain=true&show_logo=true&color_background=%23ffca28&color_button=%2355a539&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10'

const tips = [
  ['Book early', 'Prices climb sharply close to your travel date, especially in peak season.'],
  ['Licence and IDP', 'Carry your driving licence plus an International Driving Permit. Many countries require both.'],
  ['Know your cover', 'Collision Damage Waiver is essential. Decline the extra excess waiver if your credit card already covers it.'],
  ['Fuel policy', 'Full-to-full is always best. Avoid pre-paid fuel options.'],
  ['Photograph the car', 'Capture every scratch and dent before you drive off, and make sure the agent notes existing damage.'],
  ['Go offline', 'Download offline maps before pickup. Mobile data can be patchy and roaming is expensive without an eSIM.'],
]

const links = [
  ['Airport Transfers', '/transfers'],
  ['Travel Insurance', '/help'],
  ['Visa Requirements', '/visa-requirements'],
  ['Budget Calculator', '/budget-calculator'],
]

function WidgetBox({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [blocked, setBlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const box = ref.current
    if (!box) return
    box.innerHTML = ''
    const s = document.createElement('script')
    s.async = true
    s.charset = 'utf-8'
    s.src = src
    box.appendChild(s)
    const poll = setInterval(() => { if (box.children.length > 1) { setLoading(false); clearInterval(poll) } }, 300)
    const timer = setTimeout(() => { if (box.children.length <= 1) setBlocked(true) }, 8000)
    return () => { clearTimeout(timer); clearInterval(poll); box.innerHTML = '' }
  }, [src])

  return (
    <div>
      {loading && !blocked && <p style={{ color: muted, fontSize: '0.9rem', margin: 0 }}>Loading booking widget...</p>}
      <div ref={ref} style={{ minHeight: 120, position: 'relative' }} />
      {blocked && (
        <p style={{ color: muted, fontSize: '0.85rem', marginTop: 12 }}>
          The booking widget could not load. If you use an ad blocker or VPN extension, turn it off for this site and refresh the page.
        </p>
      )}
    </div>
  )
}

export default function CarRentalsPage() {
  return (
    <>
      <ServiceStrip exclude="/car-rental" />
      <link rel="preconnect" href="https://tpwidg.com" />
      <link rel="preload" as="script" href={WIDGET_1} />
      <link rel="preload" as="script" href={WIDGET_2} />
      <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
        <style>{`
          .cr-tip { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
          .cr-tip:hover { transform: translateY(-5px); border-color: rgba(200,169,110,0.55) !important; box-shadow: 0 16px 32px rgba(0,0,0,0.45); }
        `}</style>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>CAR RENTALS</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: cream, lineHeight: 1.1, marginBottom: 16 }}>
            Drive the <em style={{ color: gold }}>World</em>
          </h1>
          <p style={{ color: muted, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Compare car rental prices from 900+ suppliers worldwide. Economy to luxury, city runabouts to 4WD safari vehicles. Find the right car at the right price.
          </p>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 40px' }}>
          <div style={{ background: '#111110', border: '2px solid rgba(200,169,110,0.5)', borderRadius: 12, padding: 24 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 16 }}>SEARCH RENTALS & TRANSFERS</div>
            <WidgetBox src={WIDGET_1} />
          </div>
          <p style={{ textAlign: 'center', color: muted, fontSize: '0.8rem', marginTop: 12 }}>Best price guarantee · Powered by global local networks</p>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', color: gold, marginBottom: 16, textAlign: 'center' }}>RENTAL TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 18 }}>
            {tips.map(([title, text], i) => (
              <div key={title} className="cr-tip" style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', borderRadius: 12, padding: '22px 24px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.4rem', fontWeight: 300, color: gold, lineHeight: 1, marginBottom: 10 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ color: gold, fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>{title}</div>
                <div style={{ color: gold, fontSize: '0.9rem', lineHeight: 1.65, opacity: 0.9 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 48px' }}>
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', color: gold, marginBottom: 8 }}>DRIVING ABROAD?</div>
            <p style={{ color: muted, marginBottom: 16 }}>Get a travel eSIM for offline maps, navigation and local data without roaming fees.</p>
            <Link href="/esim" style={{ display: 'inline-block', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.16em', fontSize: '0.85rem', color: '#080807', background: gold, borderRadius: 8, padding: '12px 28px', textDecoration: 'none' }}>GET ESIM</Link>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 96px' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', color: gold, marginBottom: 16, textAlign: 'center' }}>COMPARE MORE RATES</div>
          <WidgetBox src={WIDGET_2} />
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginTop: 24 }}>
            {links.map(([label, href]) => (
              <Link key={href} href={href} style={{ color: gold, textDecoration: 'none', fontSize: '0.9rem' }}>{label} →</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}