'use client'
import { useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const destinations = [
  { name: 'Serengeti', country: 'Tanzania', region: 'Africa', slug: 'serengeti', gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', slug: 'cape-town', gradient: 'linear-gradient(160deg,#001018,#001c2d,#002840)' },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa', slug: 'marrakech', gradient: 'linear-gradient(160deg,#200800,#381200,#501c00)' },
  { name: 'Zanzibar', country: 'Tanzania', region: 'Africa', slug: 'zanzibar', gradient: 'linear-gradient(160deg,#001a12,#002d1e,#00402a)' },
  { name: 'Victoria Falls', country: 'Zimbabwe', region: 'Africa', slug: 'victoria-falls', gradient: 'linear-gradient(160deg,#001a10,#002818,#003820)' },
  { name: 'Masai Mara', country: 'Kenya', region: 'Africa', slug: 'masai-mara', gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)' },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', slug: 'dubai', gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)' },
  { name: 'Petra', country: 'Jordan', region: 'Middle East', slug: 'petra', gradient: 'linear-gradient(160deg,#200800,#381200,#4a1800)' },
  { name: 'Istanbul', country: 'Turkey', region: 'Middle East', slug: 'istanbul', gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#400030)' },
  { name: 'Kyoto', country: 'Japan', region: 'Asia', slug: 'kyoto', gradient: 'linear-gradient(160deg,#200015,#380025,#4a0033)' },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', slug: 'bali', gradient: 'linear-gradient(160deg,#001a08,#002d10,#00401a)' },
  { name: 'Maldives', country: 'Maldives', region: 'Asia', slug: 'maldives', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Santorini', country: 'Greece', region: 'Europe', slug: 'santorini', gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)' },
  { name: 'Paris', country: 'France', region: 'Europe', slug: 'paris', gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)' },
  { name: 'Amalfi Coast', country: 'Italy', region: 'Europe', slug: 'amalfi-coast', gradient: 'linear-gradient(160deg,#001428,#002040,#002c58)' },
  { name: 'Machu Picchu', country: 'Peru', region: 'Americas', slug: 'machu-picchu', gradient: 'linear-gradient(160deg,#060e00,#0c1c00,#122600)' },
  { name: 'Patagonia', country: 'Argentina', region: 'Americas', slug: 'patagonia', gradient: 'linear-gradient(160deg,#001824,#002a3d,#003852)' },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'Americas', slug: 'rio-de-janeiro', gradient: 'linear-gradient(160deg,#001e14,#003020,#00402a)' },
]

const packages = [
  { name: 'Desert & Dunes', dest: 'Dubai, UAE', duration: '7 nights', price: '$3,200', type: 'Luxury', region: 'Middle East' },
  { name: 'Great Migration', dest: 'Serengeti, Tanzania', duration: '10 nights', price: '$5,800', type: 'Safari', region: 'Africa' },
  { name: 'Northern Lights', dest: 'Svalbard, Norway', duration: '5 nights', price: '$5,500', type: 'Expedition', region: 'Arctic' },
  { name: 'Temple & Blossom', dest: 'Kyoto, Japan', duration: '8 nights', price: '$3,900', type: 'Cultural', region: 'Asia' },
  { name: 'End of the World', dest: 'Patagonia, Argentina', duration: '10 nights', price: '$4,800', type: 'Adventure', region: 'Americas' },
  { name: 'Spice Route', dest: 'Marrakech, Morocco', duration: '6 nights', price: '$2,400', type: 'Cultural', region: 'Africa' },
  { name: 'Ocean Horizon', dest: 'Maldives', duration: '7 nights', price: '$6,200', type: 'Luxury', region: 'Asia' },
  { name: 'Lost City Trek', dest: 'Machu Picchu, Peru', duration: '9 nights', price: '$3,600', type: 'Adventure', region: 'Americas' },
]

const regionHubs: Record<string, string> = {
  'Africa': '/africa-safari',
  'Middle East': '/middle-east',
  'Asia': '/asia',
  'Europe': '/europe',
  'Americas': '/americas',
  'Arctic': '/map-explorer',
  'Pacific': '/pacific',
}

const testimonials = [
  { name: 'Sarah M.', location: 'London, UK', text: 'The Patagonia expedition was flawlessly organised. Every detail was handled — from the remote trekking lodges to the private glacier tours.', rating: 5 },
  { name: 'Ahmed K.', location: 'Dubai, UAE', text: 'A truly luxurious experience. The team understood exactly what I needed — discretion, quality, and unforgettable moments.', rating: 5 },
  { name: 'Yuki T.', location: 'Tokyo, Japan', text: "Booked the Serengeti package and I'm still in awe. The great migration was beyond anything I imagined.", rating: 5 },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: 'Flights', icon: '✈', fields: [{ placeholder: 'Flying from? e.g. Lagos, London', label: 'FROM' }, { placeholder: 'Flying to? e.g. Dubai, Tokyo', label: 'TO' }, { placeholder: 'Departure date', label: 'DATE' }, { placeholder: 'No. of travellers', label: 'GUESTS' }], link: '/search', cta: 'SEARCH FLIGHTS' },
    { label: 'Hotels', icon: '🏨', fields: [{ placeholder: 'City or destination', label: 'DESTINATION' }, { placeholder: 'Check-in date', label: 'CHECK IN' }, { placeholder: 'Check-out date', label: 'CHECK OUT' }, { placeholder: 'No. of guests', label: 'GUESTS' }], link: 'https://booking.tp.st/bs6F38oi', cta: 'SEARCH HOTELS' },
    { label: 'Packages', icon: '📦', fields: [{ placeholder: 'Flying from?', label: 'FROM' }, { placeholder: 'Destination', label: 'TO' }, { placeholder: 'Travel dates', label: 'DATES' }, { placeholder: 'No. of travellers', label: 'GUESTS' }], link: 'https://booking.tp.st/bs6F38oi', cta: 'SEARCH PACKAGES' },
    { label: 'Activities', icon: '🎯', fields: [{ placeholder: 'City or attraction', label: 'DESTINATION' }, { placeholder: 'Date of activity', label: 'DATE' }, { placeholder: 'No. of travellers', label: 'GUESTS' }, { placeholder: 'e.g. tours, diving, hiking', label: 'CATEGORY' }], link: 'https://www.getyourguide.com/?partner_id=ZE8RKTS8', cta: 'FIND ACTIVITIES' },
    { label: 'Car Rentals', icon: '🚗', fields: [{ placeholder: 'Pick-up location', label: 'PICK UP' }, { placeholder: 'Drop-off location', label: 'DROP OFF' }, { placeholder: 'Pick-up date', label: 'DATE FROM' }, { placeholder: 'Return date', label: 'DATE TO' }], link: 'https://getrentacar.tp.st/CvPLu5ev', cta: 'SEARCH CARS' },
    { label: 'Transfers', icon: '🚌', fields: [{ placeholder: 'From (airport / hotel)', label: 'FROM' }, { placeholder: 'To (airport / hotel)', label: 'TO' }, { placeholder: 'Date & time', label: 'DATE' }, { placeholder: 'No. of passengers', label: 'PASSENGERS' }], link: 'https://kiwitaxi.tp.st/pthb6f1z', cta: 'FIND TRANSFERS' },
    { label: 'eSIM', icon: '📱', fields: [{ placeholder: 'Country you are visiting', label: 'DESTINATION' }, { placeholder: 'Days needed', label: 'DURATION' }, { placeholder: 'e.g. 5GB, 10GB, Unlimited', label: 'DATA PLAN' }, { placeholder: 'No. of SIMs', label: 'QUANTITY' }], link: '/esim', cta: 'GET YOUR eSIM' },
  ]

  const currentTab = tabs[activeTab]

  return (
    <>
      <style>{`
        .dest-grid-home {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .pkg-grid-home {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .search-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 8px;
        }
        @media (max-width: 768px) {
          .dest-grid-home { grid-template-columns: repeat(2, 1fr); }
          .pkg-grid-home { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .dest-grid-home { grid-template-columns: repeat(2, 1fr); }
          .pkg-grid-home { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#0a0a08 0%,#12100a 25%,#0d1520 50%,#080c14 75%,#0a0a08 100%)' }} />
        <div style={{ position: 'absolute', width: '50vw', maxWidth: 700, height: '50vw', maxHeight: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.08) 0%,transparent 70%)', top: -200, right: '5%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,1) 0%,rgba(8,8,7,0.4) 50%,transparent 100%)' }} />
        <div className="page-pad" style={{ position: 'relative', zIndex: 10, paddingBottom: 'clamp(80px,12vw,120px)', maxWidth: 900 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.35em', color: '#C8A96E', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 40, height: 1, background: '#C8A96E', display: 'inline-block' }} />
            LUXURY GLOBAL TRAVEL
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,10vw,9rem)', fontWeight: 300, lineHeight: 0.9, color: '#F5EFE4', marginBottom: 32, letterSpacing: '-0.01em' }}>
            The World<br />
            <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Awaits</em><br />
            You
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.15rem)', color: 'rgba(245,239,228,0.80)', maxWidth: 480, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
            Bespoke journeys crafted for the discerning traveller. Six continents. Infinite stories. One platform.
          </p>
          <div className="hero-buttons">
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', background: '#C8A96E', color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>EXPLORE DESTINATIONS</Link>
            <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', border: '1px solid rgba(200,169,110,0.5)', color: '#C8A96E', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>AI TRIP PLANNER</Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar" style={{ borderTop: '1px solid rgba(200,169,110,0.1)', background: 'rgba(8,8,7,0.85)', backdropFilter: 'blur(8px)' }}>
          {[['194+', 'Countries'], ['50K+', 'Travellers'], ['2,400+', 'Packages'], ['24/7', 'Support']].map(([num, label]) => (
            <div key={num} style={{ padding: 'clamp(16px,3vw,24px) clamp(16px,3vw,40px)', borderRight: '1px solid rgba(200,169,110,0.1)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 600, color: '#C8A96E' }}>{num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.65)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ✈ WIDGET B — Horizontal 4-card deals row (below hero stats bar) */}
      <section style={{ background: '#0a0908', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(32px,5vw,48px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.28em', color: '#C8A96E', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 28, height: 1, background: '#C8A96E', display: 'inline-block' }} />
            LIVE TRAVEL DEALS
          </div>
          <Script
            id="tp-widget-b"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var s = document.createElement('script');
                  s.async = true;
                  s.charset = 'utf-8';
                  s.src = 'https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&language=en&layout=horizontal&cards=4&powered_by=true&campaign_id=89&promo_id=3947';
                  document.getElementById('tp-deals-widget').appendChild(s);
                })();
              `
            }}
          />
          <div id="tp-deals-widget" style={{ minHeight: 120 }} />
        </div>
      </section>

      {/* WHY HUUBOI */}
      <section style={{ background: '#0a0908', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 32, height: 1, background: '#C8A96E', display: 'inline-block' }} />
                WHY HUUBOI
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1.05, marginBottom: 28 }}>
                One Platform.<br />Every Destination.<br />
                <em style={{ color: '#C8A96E' }}>Smarter Decisions.</em>
              </h2>
              <p style={{ color: 'rgba(245,239,228,0.65)', fontSize: '1rem', lineHeight: 1.85, marginBottom: 36 }}>
                HUUBOI brings together flights, hotels, tours, eSIMs and expert travel guides from across six continents — so you stop searching and start discovering.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/search" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', background: '#C8A96E', color: '#080807', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>SEARCH FLIGHTS</Link>
                <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.35)', color: '#C8A96E', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>EXPLORE DESTINATIONS</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[
                { icon: '✈', title: 'All In One Place', body: 'Flights, hotels, tours, eSIMs, transfers and experiences — without ever leaving HUUBOI.' },
                { icon: '🧭', title: 'Expert Guides', body: 'Deep destination guides written by people who have actually been there.' },
                { icon: '💡', title: 'Smarter Decisions', body: 'Visa requirements, best seasons, budget guides and insider tips on every page.' },
                { icon: '🌍', title: 'Six Continents', body: '194 destinations across Africa, Middle East, Asia, Europe, the Americas and the Pacific.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '24px 22px' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.18em', color: '#C8A96E', marginBottom: 8 }}>{item.title}</div>
                  <p style={{ color: 'rgba(245,239,228,0.55)', fontSize: '0.83rem', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH TABS */}
      <section style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.12)' }} className="page-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 0' }}>
          <div style={{ display: 'flex', gap: 0, marginBottom: 28, borderBottom: '1px solid rgba(200,169,110,0.15)', overflowX: 'auto' }}>
            {tabs.map((tab, i) => (
              <button key={tab.label} onClick={() => setActiveTab(i)} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.14em', padding: '14px 16px', background: 'none', border: 'none', color: activeTab === i ? '#C8A96E' : 'rgba(245,239,228,0.60)', borderBottom: activeTab === i ? '2px solid #C8A96E' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>
                <span style={{ marginRight: 5 }}>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
          <div className="search-grid">
            {currentTab.fields.map(field => (
              <div key={field.label} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.22)', padding: '14px 18px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 6 }}>{field.label}</div>
                <input placeholder={field.placeholder} style={{ background: 'none', border: 'none', color: '#F5EFE4', fontSize: '0.9rem', width: '100%', outline: 'none' }} />
              </div>
            ))}
            {activeTab === 0 ? (
              <Link href="/search" style={{ background: '#C8A96E', color: '#080807', padding: '0 20px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.16em', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 56, whiteSpace: 'nowrap', fontWeight: 700 }}>
                {currentTab.cta}
              </Link>
            ) : (
              <a href={currentTab.link} target="_blank" rel="noopener noreferrer" style={{ background: '#C8A96E', color: '#080807', border: 'none', padding: '0 20px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.16em', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 56, whiteSpace: 'nowrap', fontWeight: 700 }}>
                {currentTab.cta}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section-pad page-pad" style={{ background: '#080807' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>194 DESTINATIONS WORLDWIDE</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1 }}>
                Iconic <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Destinations</em>
              </h2>
            </div>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.70)', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 4, whiteSpace: 'nowrap' }}>VIEW ALL 194 →</Link>
          </div>
          <div className="dest-grid-home">
            {destinations.map((dest) => (
              <Link key={dest.slug} href={regionHubs[dest.region] || `/destinations/${dest.slug}`}
                style={{ textDecoration: 'none', display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: dest.gradient }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.92) 0%,rgba(8,8,7,0.2) 65%,transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(12px,2vw,20px)' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 4 }}>{dest.region}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', fontWeight: 600, color: '#F5EFE4', lineHeight: 1.1 }}>{dest.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.70)', marginTop: 4 }}>{dest.country}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', color: '#C8A96E', background: 'none', border: '1px solid rgba(200,169,110,0.4)', padding: '14px 40px', textDecoration: 'none', display: 'inline-block' }}>
              VIEW ALL 194 DESTINATIONS →
            </Link>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section-pad page-pad" style={{ background: '#0d0c0a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>HANDPICKED FOR YOU</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 300, color: '#F5EFE4' }}>
              Featured <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Packages</em>
            </h2>
          </div>
          <div className="pkg-grid-home">
            {packages.map(pkg => (
              <div key={pkg.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(16px,2vw,22px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.35)', display: 'inline-block', padding: '3px 8px' }}>{pkg.type}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.45)' }}>{pkg.region}</div>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,1.8vw,1.3rem)', fontWeight: 600, color: '#F5EFE4', marginBottom: 6, lineHeight: 1.2 }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(245,239,228,0.70)', marginBottom: 3 }}>{pkg.dest}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(245,239,228,0.45)', marginBottom: 16 }}>{pkg.duration}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 12 }}>
                  <div>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(245,239,228,0.45)', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em' }}>FROM</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,1.8vw,1.3rem)', fontWeight: 600, color: '#C8A96E' }}>{pkg.price}</div>
                  </div>
                  <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: '#C8A96E', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 2 }}>REQUEST →</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/packages" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', color: '#C8A96E', background: 'none', border: '1px solid rgba(200,169,110,0.4)', padding: '14px 40px', textDecoration: 'none', display: 'inline-block' }}>
              VIEW ALL PACKAGES →
            </Link>
          </div>
        </div>
      </section>

      {/* AI PROMO */}
      <section className="section-pad page-pad" style={{ background: '#080807', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '50vw', maxWidth: 600, height: '50vw', maxHeight: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 16 }}>POWERED BY AI</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,5rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 24, lineHeight: 1.1 }}>
            Your Perfect Itinerary,<br /><em style={{ color: '#C8A96E' }}>Generated in Seconds</em>
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.75)', lineHeight: 1.8, marginBottom: 48, fontSize: 'clamp(0.9rem,2vw,1rem)' }}>
            Tell us where you dream of going, your budget, and how you like to travel. Our AI builds a fully personalised day-by-day itinerary — flights, hotels, activities, and hidden gems included.
          </p>
          <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.25em', background: '#C8A96E', color: '#080807', padding: '18px 48px', textDecoration: 'none', display: 'inline-block' }}>
            TRY THE AI PLANNER FREE
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad page-pad" style={{ background: '#0d0c0a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>TRAVELLER STORIES</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 300, color: '#F5EFE4' }}>
              Words from the <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Road</em>
            </h2>
          </div>
          <div className="test-grid">
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ color: '#C8A96E', fontSize: '1.2rem', marginBottom: 24 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'rgba(245,239,228,0.92)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 32 }}>"{t.text}"</p>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#F5EFE4' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.55)', marginTop: 4 }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="contact" className="section-pad page-pad" style={{ background: '#080807', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 10 }}>STAY INSPIRED</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 10 }}>
            Travel <em style={{ color: '#C8A96E' }}>Intelligence</em> — Delivered
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.60)', marginBottom: 24, fontSize: '0.82rem', lineHeight: 1.6 }}>Exclusive deals, destination guides, and curated travel insights. No spam — only wanderlust.</p>
          <div className="newsletter-row">
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.25)', borderRight: 'none', color: '#F5EFE4', padding: '13px 20px', fontSize: '0.85rem', outline: 'none', minWidth: 0 }} />
            <button style={{ background: '#C8A96E', color: '#080807', border: 'none', padding: '0 22px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', cursor: 'pointer', whiteSpace: 'nowrap' }}>SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </>
  )
}
