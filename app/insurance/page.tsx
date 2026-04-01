'use client'
import Link from 'next/link'
import Script from 'next/script'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'

const coverageTypes = [
  { icon: '✈', title: 'Trip Cancellation', desc: 'Reimbursement if you cancel due to illness, emergencies or unexpected events before departure.' },
  { icon: '🏥', title: 'Medical Expenses', desc: 'Covers hospital bills, doctor visits and emergency treatment abroad — up to €500,000+.' },
  { icon: '🚑', title: 'Emergency Evacuation', desc: 'Medical evacuation to the nearest hospital or back home when local care is insufficient.' },
  { icon: '🧳', title: 'Lost Luggage', desc: 'Compensation for delayed, lost or stolen baggage and personal belongings.' },
  { icon: '✈', title: 'Flight Delays', desc: 'Compensation and hotel costs when flights are significantly delayed or cancelled.' },
  { icon: '🌍', title: 'Adventure Sports', desc: 'Optional add-on for trekking, diving, skiing, safari and other high-activity travel.' },
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
  { icon: '📅', tip: 'Buy travel insurance as soon as you book — cancellation cover only applies from the purchase date, not your travel date.' },
  { icon: '🏥', tip: 'For Schengen visas, your policy must show a minimum of €30,000 medical coverage and cover the entire trip duration.' },
  { icon: '📄', tip: 'Always carry a printed copy of your insurance policy and emergency contact number — mobile batteries die at the worst times.' },
  { icon: '🏔', tip: 'Standard policies often exclude adventure sports. If you are trekking, diving or skiing, ensure your policy specifically covers this.' },
  { icon: '💊', tip: 'Declare any pre-existing medical conditions — failure to disclose can void your claim when you need it most.' },
  { icon: '🔁', tip: 'If you travel more than twice a year, an annual multi-trip policy is almost always better value than single-trip policies.' },
]

export default function InsurancePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Script 1: Flight Compensation Widget */}
      <Script 
        src="https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&width=100&powered_by=true&campaign_id=86&promo_id=2110"
        strategy="afterInteractive"
      />

      {/* Script 2: Flight Delay / Secondary Compensation Widget */}
      <Script 
        src="https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&border_radius=5&plain=true&powered_by=true&promo_id=3408&campaign_id=86"
        strategy="afterInteractive"
      />

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
            <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>⚠</span>
            <p style={{ color: muted, fontSize: '0.85rem', margin: 0 }}>
              Schengen visa applications require proof of travel insurance with minimum €30,000 medical coverage.
            </p>
          </div>

          {/* Grid System for Widgets */}
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16, alignItems: 'stretch', maxWidth: 1200 }}>
            
            {/* Box 1: Flight Compensation Widget */}
            <div style={{ flex: '1 1 300px', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 16 }}>
                ✈ FLIGHT COMPENSATION CLAIM
              </div>
              
              <div style={{ flexGrow: 1, minHeight: 160 }}>
                {/* The script 1 automatically injects itself wherever it's called */}
              </div>
            </div>

            {/* Box 2: Flight Delay / Secondary Compensation Widget */}
            <div style={{ flex: '1 1 300px', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 16 }}>
                ⏳ CHECK DELAYED FLIGHT ELIGIBILITY
              </div>
              
              <div style={{ flexGrow: 1, minHeight: 160 }}>
                {/* The script 2 automatically injects itself wherever it's called */}
              </div>
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
                <div style={{ fontSize: '1.6rem', marginBottom: 14 }}>{item.icon}</div>
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
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>🧭 APPLYING FOR A SCHENGEN VISA?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get your insurance certificate first — you'll need it to complete your visa application</p>
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