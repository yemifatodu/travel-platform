import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Rentals & Transfers | Huuboi',
  description: 'Drive yourself with a rental car, or book a pre-arranged transfer with a driver.',
}

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.62)'

const CarIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z" />
    <circle cx="7.5" cy="13.5" r="1" />
    <circle cx="16.5" cy="13.5" r="1" />
  </svg>
)

const VanIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 17H2V7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v3h3.2a1 1 0 0 1 .8.4l2 2.6a1 1 0 0 1 .2.6V17h-1.2" />
    <path d="M10 17h4" />
    <path d="M6 10h6" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const options = [
  {
    href: '/car-rentals',
    icon: <CarIcon />,
    title: 'Car rental',
    text: 'Self-drive hire. Compare cars from our rental partners and drive on your own schedule.',
    cta: 'Rent a car',
  },
  {
    href: '/transfers',
    icon: <VanIcon />,
    title: 'Transfers',
    text: 'A pre-booked ride with a driver between airports, ports and stations. Currently available in Spain.',
    cta: 'Book a transfer',
  },
]

export default function GroundTransportPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #1C1B18, #080807 60%)', paddingTop: 90 }}>
      <style>{`
        .gt-card { display: block; text-decoration: none; background: #111110; border: 1px solid rgba(200,169,110,0.25); border-radius: 14px; padding: 36px 32px; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .gt-card:hover { transform: translateY(-6px); border-color: rgba(200,169,110,0.7); box-shadow: 0 20px 44px rgba(0,0,0,0.5); }
        .gt-badge { width: 72px; height: 72px; border-radius: 50%; border: 1px solid rgba(200,169,110,0.45); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; background: rgba(200,169,110,0.07); transition: background 0.3s ease; }
        .gt-card:hover .gt-badge { background: rgba(200,169,110,0.18); }
        .gt-cta { display: inline-flex; align-items: center; gap: 8px; color: #C8A96E; font-family: Bebas Neue, sans-serif; letter-spacing: 0.16em; font-size: 0.85rem; text-transform: uppercase; transition: gap 0.25s ease; }
        .gt-card:hover .gt-cta { gap: 14px; }
      `}</style>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 36px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.28em', color: gold, marginBottom: 14 }}>GROUND TRANSPORT</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: cream, lineHeight: 1.1, margin: '0 0 18px' }}>
          Car rentals and <em style={{ color: gold, fontStyle: 'italic' }}>transfers</em>
        </h1>
        <p style={{ color: muted, fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
          Choose how you want to get around: drive yourself, or have a driver take you there.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 96px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {options.map((o) => (
          <Link key={o.href} href={o.href} className="gt-card">
            <div className="gt-badge">{o.icon}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: '1.9rem', color: cream, margin: '0 0 10px' }}>{o.title}</h2>
            <p style={{ color: muted, fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 24px' }}>{o.text}</p>
            <span className="gt-cta">{o.cta} <ArrowIcon /></span>
          </Link>
        ))}
      </section>
    </div>
  )
}