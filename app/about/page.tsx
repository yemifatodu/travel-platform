import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | HUUBOI',
  description: 'Our story, mission, and the team behind the world\'s most curated travel platform.',
}

export default function Page() {
  const gold = '#C8A96E'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'
  const dim = 'rgba(245,239,228,0.40)'

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 100 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,100px) clamp(20px,5vw,60px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            OUR STORY
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 32 }}>
            About<br /><em style={{ color: gold }}>HUUBOI</em>
          </h1>
          <p style={{ color: muted, fontSize: '1.05rem', maxWidth: 580, lineHeight: 1.85, fontWeight: 300 }}>
            We are a global travel platform built for the modern explorer — connecting travellers across six continents to world-class destinations, curated experiences, and seamless booking.
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'rgba(200,169,110,0.15)', marginBottom: 64 }} />

        {/* Mission */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, marginBottom: 20 }}>OUR MISSION</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 300, color: cream, marginBottom: 24, lineHeight: 1.2 }}>
            Six Continents. One Platform.
          </h2>
          <p style={{ color: muted, lineHeight: 1.9, fontSize: '0.97rem', marginBottom: 20 }}>
            HUUBOI was founded with a single purpose — to make extraordinary travel accessible, affordable and stress-free for everyone. Whether you are planning a luxury safari in the Serengeti, a backpacking adventure through Southeast Asia, or a business trip to Dubai, we bring every tool you need into one place.
          </p>
          <p style={{ color: muted, lineHeight: 1.9, fontSize: '0.97rem' }}>
            From flights and hotels to eSIMs, transfers and curated packages, HUUBOI is your end-to-end travel companion. We work with the world's leading travel partners — including Booking.com, Expedia, GetYourGuide, Yesim and more — to give you the best prices and the widest choice.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 2, marginBottom: 64 }}>
          {[
            { num: '194+', label: 'Countries Covered' },
            { num: '50K+', label: 'Happy Travellers' },
            { num: '2,400+', label: 'Curated Packages' },
            { num: '24/7', label: 'Customer Support' },
          ].map(s => (
            <div key={s.num} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.4rem', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: dim, marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'rgba(200,169,110,0.15)', marginBottom: 64 }} />

        {/* What we offer */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, marginBottom: 20 }}>WHAT WE OFFER</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 300, color: cream, marginBottom: 36, lineHeight: 1.2 }}>
            Everything Your Journey Needs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {[
              { icon: '✈', title: 'Flights', desc: 'Search and compare flights worldwide with live pricing from leading airlines.' },
              { icon: '🏨', title: 'Hotels & Stays', desc: 'From boutique guesthouses to 5-star resorts — every budget, every destination.' },
              { icon: '📦', title: 'Holiday Packages', desc: 'Handpicked packages combining flights, hotels and experiences in one price.' },
              { icon: '🎯', title: 'Tours & Activities', desc: 'Guided tours, excursions and bucket-list experiences in 190+ countries.' },
              { icon: '🚗', title: 'Car Rentals', desc: 'Rent a car at your destination from trusted providers at competitive rates.' },
              { icon: '📱', title: 'Travel eSIMs', desc: 'Stay connected abroad with instant data eSIMs for 150+ countries.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 24px' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.15em', color: gold, marginBottom: 10 }}>{item.title}</div>
                <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'rgba(200,169,110,0.15)', marginBottom: 64 }} />

        {/* Founder */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, marginBottom: 20 }}>THE FOUNDER</div>
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 300, color: cream, marginBottom: 6 }}>Yemi Fatodu</h3>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: gold, marginBottom: 20 }}>FOUNDER & TRAVEL CURATOR</div>
            <p style={{ color: muted, lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 16 }}>
              HUUBOI was born from a passion for travel and a frustration with fragmented booking experiences. Too many tabs. Too many platforms. Too much confusion.
            </p>
            <p style={{ color: muted, lineHeight: 1.9, fontSize: '0.95rem' }}>
              The vision was simple — build one platform that handles everything a traveller needs, from the moment they dream about a destination to the moment they land back home. HUUBOI is that platform.
            </p>
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(200,169,110,0.1)' }}>
              <a href="mailto:hello@huuboi.com" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>hello@huuboi.com</a>
              <span style={{ color: 'rgba(200,169,110,0.3)', margin: '0 16px' }}>·</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: dim }}>Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <Link href="/" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', background: gold, color: '#080807', padding: '16px 40px', textDecoration: 'none', display: 'inline-block', marginRight: 16 }}>
            EXPLORE HUUBOI
          </Link>
          <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 40px', textDecoration: 'none', display: 'inline-block' }}>
            VIEW DESTINATIONS
          </Link>
        </div>

      </div>
    </div>
  )
}