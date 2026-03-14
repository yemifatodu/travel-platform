
'use client'
export const dynamic = 'force-dynamic'
import { AFFILIATES } from '@/lib/affiliates'


export default function AffiliateSetupPage() {
  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'

  return (
    <div style={{ minHeight: '100vh', background: ink, paddingTop: 100 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 40px' }}>

        <div style={{ marginBottom: 60 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16 }}>INTERNAL REFERENCE</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem,6vw,5rem)', fontWeight: 300, color: cream, marginBottom: 20 }}>
            Affiliate <em style={{ color: gold }}>Setup Guide</em>
          </h1>
          <p style={{ color: 'rgba(245,239,228,0.55)', lineHeight: 1.8, maxWidth: 600 }}>
            Sign up for each affiliate program below, get your unique affiliate ID, then paste it into <code style={{ color: gold, background: 'rgba(200,169,110,0.1)', padding: '2px 8px' }}>lib/affiliates.ts</code> to activate tracking and commission earning.
          </p>
        </div>

        {/* How it works */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 36, marginBottom: 48 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>HOW AFFILIATE COMMISSIONS WORK</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {[
              ['01', 'User visits your site', 'They find a destination or deal they like'],
              ['02', 'They click your partner link', 'Our link contains your unique affiliate ID'],
              ['03', 'They book on the partner site', 'Booking.com, Skyscanner, Viator etc.'],
              ['04', 'You earn commission', 'Paid monthly, directly to your account'],
            ].map(([num, title, sub]) => (
              <div key={num} style={{ padding: '24px 20px', background: '#0d0c0a', borderLeft: `2px solid ${gold}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, color: gold, marginBottom: 10 }}>{num}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.68rem', letterSpacing: '0.12em', color: cream, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(245,239,228,0.45)', lineHeight: 1.6 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* All affiliate programs */}
        <div style={{ display: 'grid', gap: 3 }}>
          {AFFILIATES.map((affiliate, i) => (
            <div key={affiliate.id} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 32px', display: 'grid', gridTemplateColumns: '60px 1fr 1fr 200px', gap: 24, alignItems: 'center' }}>
              {/* Logo + Name */}
              <span style={{ fontSize: '2rem', textAlign: 'center' as const }}>{affiliate.logo}</span>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, color: cream, marginBottom: 4 }}>{affiliate.name}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', color: `#${affiliate.color}` }}>{affiliate.category}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(245,239,228,0.45)', marginTop: 6 }}>{affiliate.description}</div>
              </div>
              {/* Commission */}
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold, marginBottom: 8 }}>COMMISSION RATE</div>
                <div style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 600 }}>{affiliate.commission}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(245,239,228,0.25)', marginTop: 8 }}>
                  ID KEY: <code style={{ color: gold }}>IDS.{affiliate.id}</code>
                </div>
              </div>
              {/* Sign up button */}
              <a href={affiliate.signupUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', background: 'transparent', border: `1px solid #${affiliate.color}50`, color: `#${affiliate.color}`, padding: '12px 20px', textDecoration: 'none', textAlign: 'center' as const, display: 'block', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `#${affiliate.color}20` }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent' }}
              >
                SIGN UP →
              </a>
            </div>
          ))}
        </div>

        {/* Code instructions */}
        <div style={{ marginTop: 48, background: '#0d0c0a', border: '1px solid rgba(200,169,110,0.15)', padding: 36 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>AFTER SIGNING UP — ACTIVATE YOUR IDs</div>
          <p style={{ color: 'rgba(245,239,228,0.55)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: 20 }}>
            Open <code style={{ color: gold, background: 'rgba(200,169,110,0.1)', padding: '2px 8px' }}>lib/affiliates.ts</code> and replace the placeholder values:
          </p>
          <div style={{ background: '#1A1A18', padding: '24px 28px', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 2, color: '#A8C4A0', overflowX: 'auto' as const }}>
            <span style={{ color: '#666' }}>// BEFORE (placeholder)</span><br />
            <span style={{ color: '#888' }}>booking: </span><span style={{ color: '#e87070' }}>'YOUR_BOOKING_AID'</span><br /><br />
            <span style={{ color: '#666' }}>// AFTER (your real ID)</span><br />
            <span style={{ color: '#888' }}>booking: </span><span style={{ color: '#4ade80' }}>'1234567'</span><br />
          </div>
          <p style={{ color: 'rgba(245,239,228,0.4)', fontSize: '0.8rem', marginTop: 16, lineHeight: 1.7 }}>
            After updating the IDs, run <code style={{ color: gold }}>git add . && git commit -m "Add affiliate IDs" && git push</code> — your site will auto-deploy with live tracking within 60 seconds.
          </p>
        </div>

        {/* Estimated earnings */}
        <div style={{ marginTop: 32, background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 36 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>ESTIMATED MONTHLY EARNINGS POTENTIAL</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {[
              ['100 Monthly Visitors', '$50 – $150', 'Getting started'],
              ['1,000 Monthly Visitors', '$500 – $1,500', 'Growing platform'],
              ['10,000 Monthly Visitors', '$5,000 – $15,000', 'Established brand'],
            ].map(([visitors, earning, stage]) => (
              <div key={visitors} style={{ background: '#0d0c0a', padding: '28px 24px', textAlign: 'center' as const }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.35)', marginBottom: 12 }}>{visitors}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: gold, marginBottom: 8 }}>{earning}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.4)' }}>{stage}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'rgba(245,239,228,0.25)', marginTop: 16, textAlign: 'center' as const, fontStyle: 'italic' }}>
            Estimates based on industry average 2–4% click-through rate and 3–8% booking conversion. Actual earnings vary.
          </p>
        </div>

      </div>
    </div>
  )
}
