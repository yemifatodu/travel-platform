'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'

function Icon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: gold,
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'calendarX':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="9" y1="14" x2="15" y2="18" />
          <line x1="15" y1="14" x2="9" y2="18" />
        </svg>
      )
    case 'calendarCheck':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <polyline points="8 14 11 17 16 12" />
        </svg>
      )
    case 'medicalCross':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )
    case 'shieldPlus':
      return (
        <svg {...common}>
          <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
          <line x1="12" y1="9" x2="12" y2="15" />
          <line x1="9" y1="12" x2="15" y2="12" />
        </svg>
      )
    case 'shieldCheck':
      return (
        <svg {...common}>
          <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
          <polyline points="9 12 11 14 15 9" />
        </svg>
      )
    case 'suitcase':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="3" y1="12" x2="21" y2="12" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 14" />
        </svg>
      )
    case 'mountain':
      return (
        <svg {...common}>
          <path d="M2 20 9 8l4 6 2-3 5 9z" />
        </svg>
      )
    case 'idDoc':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="14" y2="13" />
        </svg>
      )
    case 'pill':
      return (
        <svg {...common}>
          <rect x="4" y="9" width="16" height="6" rx="3" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
      )
    case 'refresh':
      return (
        <svg {...common}>
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      )
    case 'triangleAlert':
      return (
        <svg {...common}>
          <path d="M12 3 2 20h20L12 3z" />
          <line x1="12" y1="9" x2="12" y2="14" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    case 'compass':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="16 8 14 14 8 16 10 10 16 8" />
        </svg>
      )
    default:
      return null
  }
}

const coverageTypes = [
  { icon: 'calendarX', title: 'Trip Cancellation', desc: 'Reimbursement if you cancel due to illness, emergencies or unexpected events before departure.' },
  { icon: 'medicalCross', title: 'Medical Expenses', desc: 'Covers hospital bills, doctor visits and emergency treatment abroad — up to €500,000+.' },
  { icon: 'shieldPlus', title: 'Emergency Evacuation', desc: 'Medical evacuation to the nearest hospital or back home when local care is insufficient.' },
  { icon: 'suitcase', title: 'Lost Luggage', desc: 'Compensation for delayed, lost or stolen baggage and personal belongings.' },
  { icon: 'clock', title: 'Flight Delays', desc: 'Compensation and hotel costs when flights are significantly delayed or cancelled.' },
  { icon: 'mountain', title: 'Adventure Sports', desc: 'Optional add-on for trekking, diving, skiing, safari and other high-activity travel.' },
]

const visaRequirements = [
  { region: 'Schengen (Europe)', flag: '🇪🇺', requirement: 'MANDATORY', detail: 'Minimum €30,000 medical coverage required for all Schengen visa applications.' },
  { region: 'Saudi Arabia', flag: '🇸🇦', requirement: 'MANDATORY', detail: 'Travel insurance required for tourist eVisa application.' },
  { region: 'Cuba', flag: '🇨🇺', requirement: 'MANDATORY', detail: 'Proof of travel insurance must be shown at the airport on arrival.' },
  { region: 'Angola', flag: '🇦🇴', requirement: 'MANDATORY', detail: 'Travel insurance listed as a required document for visa application.' },
  { region: 'UAE', flag: '🇦🇪', requirement: 'Recommended', detail: 'Not mandatory but strongly recommended — medical costs are very high.' },
  { region: 'USA', flag: '🇺🇸', requirement: 'Recommended', detail: 'Not mandatory but critical — US medical bills can reach $50,000+ for a single hospitalisation.' },
  { region: 'Africa (Safari)', flag: '🌍', requirement: 'Recommended', detail: 'Medical evacuation coverage essential — remote areas may require helicopter rescue.' },
  { region: 'Asia (Adventure)', flag: '🌏', requirement: 'Recommended', detail: 'Recommended for diving, trekking and adventure activities across Southeast Asia.' },
]

const tips = [
  { icon: 'calendarCheck', tip: 'Buy travel insurance as soon as you book — cancellation cover only applies from the purchase date, not your travel date.' },
  { icon: 'shieldCheck', tip: 'For Schengen visas, your policy must show a minimum of €30,000 medical coverage and cover the entire trip duration.' },
  { icon: 'idDoc', tip: 'Always carry a printed copy of your insurance policy and emergency contact number — mobile batteries die at the worst times.' },
  { icon: 'mountain', tip: 'Standard policies often exclude adventure sports. If you are trekking, diving or skiing, ensure your policy specifically covers this.' },
  { icon: 'pill', tip: 'Declare any pre-existing medical conditions — failure to disclose can void your claim when you need it most.' },
  { icon: 'refresh', tip: 'If you travel more than twice a year, an annual multi-trip policy is almost always better value than single-trip policies.' },
]

export default function InsurancePage() {
  const flightCompRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (flightCompRef.current && flightCompRef.current.childElementCount === 0) {
      const script = document.createElement('script')
      script.src = "https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&width=100&powered_by=true&campaign_id=86&promo_id=2110"
      script.async = true
      flightCompRef.current.appendChild(script)
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      <style>
        {
          '.insurance-widgets-row{display:flex;flex-direction:column;gap:16px;max-width:1200px;}' +
          '.insurance-widget-box{width:100%;background:#111110;border:1px solid rgba(200,169,110,0.15);padding:clamp(20px,3vw,32px);display:flex;flex-direction:column;}' +
          '.insurance-widget-container{flex-grow:1;min-height:800px;display:block;width:100%;}' +
          '.insurance-widget-container > *{width:100% !important;max-width:none !important;}' +
          '.insurance-widget-container iframe{height:800px !important;min-height:800px !important;border:none !important;overflow:hidden !important;}'
        }
      </style>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080a10,#0a080c,#080807)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            TRAVEL INSURANCE
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Travel <em style={{ color: gold }}>Protected</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 32 }}>
            Comprehensive travel insurance for every journey. Medical coverage, trip cancellation, lost luggage and emergency evacuation — all in one policy. Required for Schengen visas and many other destinations.
          </p>
          <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '14px 20px', display: 'inline-flex', gap: 10, alignItems: 'center', marginBottom: 40 }}>
            <Icon name="triangleAlert" />
            <p style={{ color: muted, fontSize: '0.85rem', margin: 0 }}>
              Schengen visa applications require proof of travel insurance with minimum €30,000 medical coverage.
            </p>
          </div>

          {/* Grid System for Widgets */}
          <div className="insurance-widgets-row">

            {/* Box 1: Flight Compensation Widget */}
            <div className="insurance-widget-box">
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 16 }}>
                FLIGHT COMPENSATION CLAIM
              </div>
              <div ref={flightCompRef} className="insurance-widget-container" />
            </div>

          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Affiliate Link for Ekta Insurance */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>LOOKING FOR TRADITIONAL MEDICAL COVERAGE?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Purchase global protection spanning everything from luggage loss to medical evacuations.</p>
          </div>
          <a href="https://ektatraveling.tp.st/9WtYKvw6" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET EKTA INSURANCE →
          </a>
        </div>

        {/* What's covered */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>WHAT'S COVERED</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 32 }}>
            Complete <em style={{ color: gold }}>Protection</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 2 }}>
            {coverageTypes.map(item => (
              <div key={item.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '24px 22px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ marginBottom: 14 }}><Icon name={item.icon} /></div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>{item.title}</div>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visa insurance requirements */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>BY DESTINATION</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 32 }}>
            Insurance <em style={{ color: gold }}>Requirements</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2 }}>
            {visaRequirements.map(item => (
              <div key={item.region} style={{ background: '#111110', border: `1px solid ${item.requirement === 'MANDATORY' ? 'rgba(248,113,113,0.2)' : 'rgba(200,169,110,0.1)'}`, padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.4rem' }}>{item.flag}</span>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.12em', color: cream }}>{item.region}</div>
                  </div>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: item.requirement === 'MANDATORY' ? '#f87171' : '#fbbf24', border: `1px solid ${item.requirement === 'MANDATORY' ? 'rgba(248,113,113,0.3)' : 'rgba(251,191,36,0.3)'}`, padding: '2px 8px' }}>
                    {item.requirement}
                  </span>
                </div>
                <p style={{ color: muted, fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>INSURANCE TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {tips.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0 }}><Icon name={item.icon} /></div>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="compass" />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>APPLYING FOR A SCHENGEN VISA?</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get your insurance certificate first — you'll need it to complete your visa application</p>
            </div>
          </div>
          <Link href="/visa-requirements" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            VISA REQUIREMENTS →
          </Link>
        </div>

        {/* Related */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Visa Requirements', href: '/visa-requirements' },
            { label: 'Travel eSIM', href: '/esim' },
            { label: 'AI Trip Planner', href: '/ai-planner' },
            { label: 'Travel Tips', href: '/travel-tips' },
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