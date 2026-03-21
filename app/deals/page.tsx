'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const deals = [
  {
    title: 'Lagos to Dubai Return',
    type: 'Flight Deal',
    icon: '✈',
    saving: 'Save up to 35%',
    badge: 'HOT DEAL',
    badgeColor: '#f87171',
    desc: 'Return flights from Lagos to Dubai with Emirates or Air Peace. Includes 30kg checked baggage.',
    from: '$380',
    was: '$590',
    link: 'https://www.aviasales.com/?marker=710879&locale=en',
    expires: 'Limited time',
  },
  {
    title: 'Maldives Overwater Villa',
    type: 'Hotel Deal',
    icon: '🏨',
    saving: 'From $299/night',
    badge: 'BEST VALUE',
    badgeColor: '#4ade80',
    desc: 'Overwater bungalows with direct lagoon access. Breakfast included. Free cancellation.',
    from: '$299',
    was: '$480',
    link: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FHotels&camref=1110lBk7p',
    expires: 'Book 30 days ahead',
  },
  {
    title: 'Serengeti Safari Package',
    type: 'Safari Package',
    icon: '🦁',
    saving: 'Save $800 per person',
    badge: 'LIMITED',
    badgeColor: '#fbbf24',
    desc: '7 nights luxury tented camp during the Great Migration. Game drives twice daily. All meals included.',
    from: '$3,200',
    was: '$4,000',
    link: '/request-trip',
    expires: 'Jul–Oct departures',
    internal: true,
  },
  {
    title: 'Bali 10-Night Retreat',
    type: 'Package Deal',
    icon: '🌿',
    saving: 'Save up to 25%',
    badge: 'POPULAR',
    badgeColor: '#60a5fa',
    desc: 'Flights + boutique hotel in Ubud. Includes daily breakfast, one spa treatment and temple tour.',
    from: '$1,890',
    was: '$2,520',
    link: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FVacation-Packages&camref=1110lBk7p',
    expires: 'Apr–Oct travel',
  },
  {
    title: 'Dubai Desert Safari + BBQ',
    type: 'Experience Deal',
    icon: '🎯',
    saving: 'Save 20%',
    badge: 'TOP RATED',
    badgeColor: '#a78bfa',
    desc: 'Evening desert safari with dune bashing, camel ride, traditional BBQ dinner and live entertainment.',
    from: '$60',
    was: '$75',
    link: 'https://www.getyourguide.com/dubai-l173/?partner_id=ZE8RKTS8',
    expires: 'Year-round',
  },
  {
    title: 'Cape Town + Safari Combo',
    type: 'Combo Deal',
    icon: '🌍',
    saving: 'Save $600 per person',
    badge: 'NEW',
    badgeColor: '#4ade80',
    desc: '5 nights Cape Town + 4 nights Kruger National Park private game reserve. Flights included.',
    from: '$2,800',
    was: '$3,400',
    link: '/request-trip',
    expires: 'May–Sep departures',
    internal: true,
  },
  {
    title: 'Paris City Break',
    type: 'Hotel Deal',
    icon: '🗼',
    saving: 'From £89/night',
    badge: 'GREAT VALUE',
    badgeColor: '#fbbf24',
    desc: 'Central Paris boutique hotels with breakfast. Walking distance to Eiffel Tower and Louvre.',
    from: '£89',
    was: '£145',
    link: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FHotels&camref=1110lBk7p',
    expires: 'Mar–Jun · Sep–Oct',
  },
  {
    title: 'Morocco 7-Night Adventure',
    type: 'Package Deal',
    icon: '🕌',
    saving: 'Save 30%',
    badge: 'HOT DEAL',
    badgeColor: '#f87171',
    desc: 'Marrakech, Sahara Desert camp and Fes medina. Flights, riads and guided tours included.',
    from: '$1,400',
    was: '$2,000',
    link: '/request-trip',
    expires: 'Mar–May · Sep–Nov',
    internal: true,
  },
]

const categories = [
  { icon: '✈', label: 'Flight Deals', link: 'https://www.aviasales.com/?marker=710879&locale=en' },
  { icon: '🏨', label: 'Hotel Deals', link: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FHotels&camref=1110lBk7p' },
  { icon: '📦', label: 'Package Deals', link: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FVacation-Packages&camref=1110lBk7p' },
  { icon: '🦁', label: 'Safari Deals', link: '/request-trip' },
  { icon: '🎯', label: 'Experience Deals', link: 'https://www.getyourguide.com/?partner_id=ZE8RKTS8' },
  { icon: '🚗', label: 'Car Rental Deals', link: 'https://getrentacar.tp.st/CvPLu5ev' },
]

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0800,#100c00,#080810)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            DEALS & OFFERS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Best Travel <em style={{ color: gold }}>Deals</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8 }}>
            Handpicked flight deals, hotel offers, safari packages and experiences — updated regularly. Book fast, prices change daily.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Categories */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => setActiveCategory('All')}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', padding: '8px 18px', background: activeCategory === 'All' ? gold : 'transparent', border: `1px solid ${activeCategory === 'All' ? gold : 'rgba(200,169,110,0.2)'}`, color: activeCategory === 'All' ? '#080807' : muted, cursor: 'pointer', transition: 'all 0.2s' }}>
              ALL DEALS
            </button>
            {categories.map(cat => (
              <button key={cat.label} onClick={() => setActiveCategory(cat.label)}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', padding: '8px 18px', background: activeCategory === cat.label ? gold : 'transparent', border: `1px solid ${activeCategory === cat.label ? gold : 'rgba(200,169,110,0.2)'}`, color: activeCategory === cat.label ? '#080807' : muted, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deals grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 2, marginBottom: 'clamp(48px,7vw,80px)' }}>
          {deals.map(deal => (
            <div key={deal.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Top bar */}
              <div style={{ background: '#1C1B18', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.2rem' }}>{deal.icon}</span>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: dim }}>{deal.type}</span>
                </div>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', color: deal.badgeColor, border: `1px solid ${deal.badgeColor}40`, padding: '3px 10px' }}>{deal.badge}</span>
              </div>

              {/* Content */}
              <div style={{ padding: '20px 22px', flex: 1 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', color: cream, fontWeight: 600, lineHeight: 1.2, marginBottom: 8 }}>{deal.title}</h3>
                <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 16 }}>{deal.desc}</p>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', color: dim, marginBottom: 4 }}>⏰ {deal.expires}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: '#4ade80', marginBottom: 16 }}>✦ {deal.saving}</div>
              </div>

              {/* Price + CTA */}
              <div style={{ padding: '16px 22px 20px', borderTop: '1px solid rgba(200,169,110,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 2 }}>FROM</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', color: gold, fontWeight: 600, lineHeight: 1 }}>{deal.from}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.1em', color: dim, textDecoration: 'line-through', marginTop: 2 }}>was {deal.was}</div>
                </div>
                {deal.internal ? (
                  <Link href={deal.link}
                    style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 20px', textDecoration: 'none', display: 'inline-block' }}>
                    REQUEST →
                  </Link>
                ) : (
                  <a href={deal.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 20px', textDecoration: 'none', display: 'inline-block' }}>
                    BOOK NOW →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom package strip */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>CANT FIND WHAT YOU WANT?</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 12 }}>
              Get a <em style={{ color: gold }}>Custom Deal</em>
            </h2>
            <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
              Tell us your destination, dates and budget. We will find the best available deal and put together a personalised package just for you.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/request-trip"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 32px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
              REQUEST A CUSTOM PACKAGE
            </Link>
            <a href="https://wa.me/2347033736377?text=Hi%20HUUBOI%2C%20I%20am%20looking%20for%20a%20travel%20deal%20to%20"
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: '#25D366', color: '#fff', padding: '16px 32px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
              💬 WHATSAPP FOR DEALS
            </a>
          </div>
        </div>

        {/* Related */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Flights', href: '/flights' },
            { label: 'Hotels', href: '/hotels' },
            { label: 'Tours & Experiences', href: '/tours' },
            { label: 'Request a Trip', href: '/request-trip' },
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
