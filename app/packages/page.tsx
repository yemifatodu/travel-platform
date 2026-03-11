'use client'
import { useState } from 'react'
import Link from 'next/link'

const packages = [
  { name: 'Desert & Dunes', dest: 'Dubai, UAE', duration: '7 nights', price: '$3,200', type: 'Luxury', slug: 'dubai', gradient: 'linear-gradient(135deg,#1a0e00,#3d2800)', desc: 'Private desert camps, dune bashing, luxury spa retreats and world-class dining in the heart of the UAE.', includes: ['5-star hotel','Desert safari','City tour','Airport transfers'] },
  { name: 'End of the World', dest: 'Patagonia, Argentina', duration: '10 nights', price: '$4,800', type: 'Adventure', slug: 'patagonia', gradient: 'linear-gradient(135deg,#001a20,#002d3d)', desc: 'Trek through Torres del Paine, spot glaciers, and stay in eco-lodges at the edge of the earth.', includes: ['Eco-lodge stays','Guided treks','Glacier boat tour','All meals'] },
  { name: 'Northern Lights', dest: 'Svalbard, Norway', duration: '5 nights', price: '$5,500', type: 'Expedition', slug: 'svalbard', gradient: 'linear-gradient(135deg,#00082a,#001040)', desc: 'Chase the aurora borealis, snowmobile across Arctic tundra, and sleep under the midnight sky.', includes: ['Arctic lodge','Snowmobile safari','Dog sledding','Aurora guide'] },
  { name: 'Temple & Blossom', dest: 'Kyoto, Japan', duration: '8 nights', price: '$3,900', type: 'Cultural', slug: 'kyoto', gradient: 'linear-gradient(135deg,#1a0010,#2d0020)', desc: 'Discover ancient temples, tea ceremony traditions, and geisha districts in Japan\'s cultural capital.', includes: ['Ryokan stay','Tea ceremony','Temple tours','Bullet train pass'] },
  { name: 'Safari & Spice', dest: 'Serengeti, Tanzania', duration: '9 nights', price: '$6,200', type: 'Wildlife', slug: 'serengeti', gradient: 'linear-gradient(135deg,#0a0800,#2a1500)', desc: 'Witness the great migration, stay in luxury tented camps, and explore Zanzibar\'s spice markets.', includes: ['Luxury tented camp','Daily game drives','Zanzibar extension','Bush dinners'] },
  { name: 'Amalfi Dream', dest: 'Amalfi Coast, Italy', duration: '7 nights', price: '$4,100', type: 'Romantic', slug: 'amalfi-coast', gradient: 'linear-gradient(135deg,#001020,#003366)', desc: 'Sail along the coastline, dine in cliffside restaurants, and explore Positano and Ravello.', includes: ['Boutique hotel','Private boat day','Wine tasting','Cooking class'] },
  { name: 'Arctic Expedition', dest: 'Iceland', duration: '6 nights', price: '$3,600', type: 'Adventure', slug: 'iceland', gradient: 'linear-gradient(135deg,#001530,#002050)', desc: 'Explore volcanic landscapes, soak in geothermal pools, and chase waterfalls across Iceland.', includes: ['Boutique guesthouse','Golden Circle tour','Blue Lagoon','Northern lights hunt'] },
  { name: 'Bali Sanctuary', dest: 'Bali, Indonesia', duration: '10 nights', price: '$2,800', type: 'Wellness', slug: 'bali', gradient: 'linear-gradient(135deg,#0a1500,#1a2800)', desc: 'Jungle retreats, rice terrace walks, temple ceremonies and daily spa treatments in paradise.', includes: ['Villa with pool','Daily spa','Temple tours','Cooking class'] },
]

const types = ['All', 'Luxury', 'Adventure', 'Cultural', 'Wildlife', 'Romantic', 'Wellness', 'Expedition']

export default function PackagesPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? packages : packages.filter(p => p.type === filter)

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(to bottom, #0d0c0a, #080807)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', textAlign: 'center', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 16 }}>HANDPICKED FOR YOU</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1, marginBottom: 24 }}>
          Travel <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>Packages</em>
        </h1>
        <p style={{ color: 'rgba(245,239,228,0.55)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8, fontSize: 'clamp(0.9rem,2vw,1.1rem)' }}>
          Curated journeys across six continents. Every detail handled — flights, hotels, experiences, and transfers.
        </p>
      </div>

      {/* Filters */}
      <div style={{ padding: '32px clamp(20px,5vw,60px)', borderBottom: '1px solid rgba(200,169,110,0.1)', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap' }}>
          {types.map(type => (
            <button key={type} onClick={() => setFilter(type)}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', padding: '8px 20px', background: filter === type ? '#C8A96E' : 'transparent', color: filter === type ? '#080807' : 'rgba(245,239,228,0.5)', border: '1px solid', borderColor: filter === type ? '#C8A96E' : 'rgba(200,169,110,0.2)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      <div style={{ padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 24 }}>
          {filtered.map(pkg => (
            <div key={pkg.name} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', transition: 'all 0.3s' }}>
              {/* Card image area */}
              <div style={{ height: 200, background: pkg.gradient, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 24 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.8), transparent)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.4)', display: 'inline-block', padding: '3px 10px', marginBottom: 8 }}>{pkg.type}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: '#F5EFE4', lineHeight: 1 }}>{pkg.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(245,239,228,0.6)', marginTop: 4 }}>{pkg.dest} · {pkg.duration}</p>
                </div>
              </div>
              {/* Card body */}
              <div style={{ padding: 28 }}>
                <p style={{ color: 'rgba(245,239,228,0.6)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 20 }}>{pkg.desc}</p>
                <div style={{ marginBottom: 24 }}>
                  {pkg.includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: '#C8A96E', fontSize: '0.7rem' }}>✦</span>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(245,239,228,0.5)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 20 }}>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.35)' }}>FROM</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: '#C8A96E' }}>{pkg.price}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(245,239,228,0.3)' }}>per person</div>
                  </div>
                  <Link href={`/booking/checkout?package=${pkg.slug}`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', background: '#C8A96E', color: '#080807', padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
                    BOOK NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
