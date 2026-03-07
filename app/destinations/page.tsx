'use client'
import { useState } from 'react'
import Link from 'next/link'

const destinations = [
  { slug:'dubai',        name:'Dubai',        country:'UAE',           region:'Middle East', tagline:'Gold, Desert & Infinite Luxury',      nights:'5–10', from:1200, emoji:'🏙' },
  { slug:'abu-dhabi',    name:'Abu Dhabi',     country:'UAE',           region:'Middle East', tagline:'Culture Meets Modern Grandeur',        nights:'4–7',  from:1100, emoji:'🕌' },
  { slug:'petra',        name:'Petra',         country:'Jordan',        region:'Middle East', tagline:'The Rose-Red City of the Nabataeans',  nights:'3–5',  from:900,  emoji:'🏛' },
  { slug:'muscat',       name:'Muscat',        country:'Oman',          region:'Middle East', tagline:'Arabia\'s Hidden Gem',                  nights:'4–6',  from:850,  emoji:'⛵' },
  { slug:'serengeti',    name:'Serengeti',     country:'Tanzania',      region:'Africa',      tagline:'The Greatest Show on Earth',           nights:'7–10', from:3200, emoji:'🦁' },
  { slug:'cape-town',    name:'Cape Town',     country:'South Africa',  region:'Africa',      tagline:'Where Mountains Meet the Ocean',       nights:'6–9',  from:1800, emoji:'🏔' },
  { slug:'marrakech',    name:'Marrakech',     country:'Morocco',       region:'Africa',      tagline:'The Red City of a Thousand Colours',   nights:'4–6',  from:800,  emoji:'🕍' },
  { slug:'zanzibar',     name:'Zanzibar',      country:'Tanzania',      region:'Africa',      tagline:'Spice Islands & Turquoise Seas',       nights:'5–8',  from:1400, emoji:'🏝' },
  { slug:'kyoto',        name:'Kyoto',         country:'Japan',         region:'Asia',        tagline:'Where Ancient Japan Lives On',         nights:'6–9',  from:2200, emoji:'⛩' },
  { slug:'bali',         name:'Bali',          country:'Indonesia',     region:'Asia',        tagline:'Island of the Gods',                   nights:'7–10', from:1100, emoji:'🌺' },
  { slug:'tokyo',        name:'Tokyo',         country:'Japan',         region:'Asia',        tagline:'Future Meets Tradition',               nights:'7–10', from:2400, emoji:'🗼' },
  { slug:'maldives',     name:'Maldives',      country:'Maldives',      region:'Asia',        tagline:'Paradise Above and Below the Water',   nights:'5–8',  from:3800, emoji:'🐠' },
  { slug:'singapore',    name:'Singapore',     country:'Singapore',     region:'Asia',        tagline:'The Lion City',                        nights:'4–6',  from:1600, emoji:'🦁' },
  { slug:'amalfi-coast', name:'Amalfi Coast',  country:'Italy',         region:'Europe',      tagline:'Cliffside Villages Above Azure Seas',  nights:'6–9',  from:2600, emoji:'🍋' },
  { slug:'santorini',    name:'Santorini',     country:'Greece',        region:'Europe',      tagline:'Blue Domes & Volcanic Sunsets',        nights:'5–7',  from:2100, emoji:'🌅' },
  { slug:'paris',        name:'Paris',         country:'France',        region:'Europe',      tagline:'The City of Light & Love',             nights:'4–6',  from:1800, emoji:'🗼' },
  { slug:'iceland',      name:'Iceland',       country:'Iceland',       region:'Europe',      tagline:'Fire, Ice & Northern Lights',          nights:'6–8',  from:2800, emoji:'🌋' },
  { slug:'dubrovnik',    name:'Dubrovnik',     country:'Croatia',       region:'Europe',      tagline:'The Pearl of the Adriatic',            nights:'4–6',  from:1600, emoji:'🏰' },
  { slug:'patagonia',    name:'Patagonia',     country:'Argentina',     region:'Americas',    tagline:'At the End of the World',              nights:'8–12', from:4800, emoji:'🏔' },
  { slug:'machu-picchu', name:'Machu Picchu',  country:'Peru',          region:'Americas',    tagline:'The Lost City of the Incas',           nights:'6–9',  from:2900, emoji:'🏛' },
  { slug:'new-york',     name:'New York City', country:'USA',           region:'Americas',    tagline:'The City That Never Sleeps',           nights:'4–7',  from:1900, emoji:'🗽' },
  { slug:'galapagos',    name:'Galápagos',     country:'Ecuador',       region:'Americas',    tagline:'Darwin\'s Living Laboratory',           nights:'7–10', from:5200, emoji:'🐢' },
  { slug:'svalbard',     name:'Svalbard',      country:'Norway',        region:'Arctic',      tagline:'Polar Bears & Northern Lights',        nights:'5–7',  from:5500, emoji:'🐻' },
  { slug:'cuba',         name:'Cuba',          country:'Cuba',          region:'Americas',    tagline:'Revolution, Rum & Classic Cars',        nights:'6–9',  from:1600, emoji:'🎺' },
  { slug:'rwanda',       name:'Rwanda',        country:'Rwanda',        region:'Africa',      tagline:'Land of a Thousand Hills & Gorillas',  nights:'5–8',  from:4200, emoji:'🦍' },
  { slug:'victoria-falls',name:'Victoria Falls',country:'Zimbabwe',     region:'Africa',      tagline:'The Smoke That Thunders',               nights:'4–6',  from:2100, emoji:'💧' },
  { slug:'bhutan',       name:'Bhutan',        country:'Bhutan',        region:'Asia',        tagline:'The Last Shangri-La',                  nights:'7–10', from:3500, emoji:'🏔' },
  { slug:'angkor-wat',   name:'Angkor Wat',    country:'Cambodia',      region:'Asia',        tagline:'Temple Kingdom of the Khmer Empire',   nights:'4–6',  from:1300, emoji:'🛕' },
  { slug:'swiss-alps',   name:'Swiss Alps',    country:'Switzerland',   region:'Europe',      tagline:'Peaks, Powder & Pristine Lakes',       nights:'6–9',  from:3200, emoji:'⛷' },
  { slug:'prague',       name:'Prague',        country:'Czech Republic',region:'Europe',      tagline:'The City of a Hundred Spires',         nights:'4–6',  from:1400, emoji:'🏰' },
]

const regions = ['All', 'Middle East', 'Africa', 'Asia', 'Europe', 'Americas', 'Arctic']
const regionColors: Record<string, string> = {
  'Middle East': 'C8A96E', Africa: '4ade80', Asia: '60a5fa',
  Europe: 'f472b6', Americas: 'fb923c', Arctic: 'a78bfa'
}

export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState('All')
  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'

  const filtered = activeRegion === 'All' ? destinations : destinations.filter(d => d.region === activeRegion)

  return (
    <div style={{ minHeight: '100vh', background: ink, paddingTop: 100 }}>

      {/* Hero */}
      <div style={{ padding: '60px 60px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.35em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
          SIX CONTINENTS · {destinations.length} DESTINATIONS
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 20 }}>
          Explore the <em style={{ color: gold }}>World</em>
        </h1>
        <p style={{ color: 'rgba(245,239,228,0.55)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.8 }}>
          Handpicked destinations across every continent — from Arctic wilderness to tropical paradise.
        </p>
      </div>

      {/* Region Filter */}
      <div style={{ padding: '0 60px', maxWidth: 1200, margin: '0 auto', marginBottom: 48 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
          {regions.map(region => (
            <button key={region} onClick={() => setActiveRegion(region)} style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em',
              padding: '9px 22px', cursor: 'pointer', transition: 'all 0.2s', border: 'none',
              background: activeRegion === region ? gold : 'transparent',
              color: activeRegion === region ? ink : 'rgba(245,239,228,0.5)',
              outline: activeRegion === region ? 'none' : '1px solid rgba(200,169,110,0.2)',
            }}>
              {region === 'All' ? `ALL (${destinations.length})` : region}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div style={{ padding: '0 60px 120px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {filtered.map(dest => {
            const color = regionColors[dest.region] || 'C8A96E'
            return (
              <Link key={dest.slug} href={`/destinations/${dest.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '36px 32px', transition: 'all 0.3s', cursor: 'pointer', height: '100%' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `#${color}50`; el.style.transform = 'translateY(-4px)'; el.style.background = `#${color}08` }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(200,169,110,0.1)'; el.style.transform = 'translateY(0)'; el.style.background = '#111110' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <span style={{ fontSize: '2.2rem' }}>{dest.emoji}</span>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', color: `#${color}`, border: `1px solid #${color}40`, padding: '3px 10px' }}>{dest.region}</span>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.4)', marginBottom: 8 }}>{dest.country}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: cream, marginBottom: 8, lineHeight: 1 }}>{dest.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(245,239,228,0.5)', fontStyle: 'italic', marginBottom: 24, lineHeight: 1.5 }}>{dest.tagline}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.08)', paddingTop: 20 }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.3)', marginBottom: 4 }}>FROM</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, color: gold }}>${dest.from.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.3)', marginBottom: 4 }}>DURATION</div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(245,239,228,0.6)' }}>{dest.nights} nights</div>
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: gold, borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: 2 }}>EXPLORE →</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
