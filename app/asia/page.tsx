'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const destinations = [
  {
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    tagline: 'Japan\'s Cultural Heart',
    gradient: 'linear-gradient(160deg,#1a0a1a,#2d142d,#401e40)',
    highlights: ['Fushimi Inari', 'Arashiyama Bamboo', 'Geisha Culture', 'Kiyomizu-dera', 'Tea Ceremonies'],
    bestTime: 'Mar–May (Cherry Blossom) · Oct–Nov (Autumn)',
    duration: '4–6 nights',
    from: '$1,200',
    description: 'Kyoto is Japan\'s most beautiful city — 1,600 Buddhist temples, 400 Shinto shrines, 17 UNESCO World Heritage sites, and the world\'s most exquisite gardens. It is the soul of traditional Japan.',
    experiences: [
      'Fushimi Inari Shrine — 10,000 red torii gates up the mountain',
      'Arashiyama Bamboo Grove at sunrise — before the crowds',
      'Traditional tea ceremony in Gion district',
      'Kiyomizu-dera Temple sunset overlooking Kyoto',
      'Golden Pavilion (Kinkaku-ji) in morning light',
      'Philosopher\'s Path cherry blossom walk',
    ],
    hotels: ['Aman Kyoto', 'The Ritz-Carlton Kyoto', 'Hoshinoya Kyoto', 'Four Seasons Kyoto', 'Park Hyatt Kyoto'],
  },
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    tagline: 'The World\'s Greatest Metropolis',
    gradient: 'linear-gradient(160deg,#0a1428,#142040,#1e2c58)',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tsukiji Market', 'Shinjuku', 'Akihabara'],
    bestTime: 'Mar–May · Oct–Nov',
    duration: '5–7 nights',
    from: '$1,400',
    description: 'Tokyo is a city of 37 million people that somehow works perfectly — ultra-modern neon skyscrapers beside ancient temples, the world\'s finest restaurants, and a sense of order that feels almost miraculous.',
    experiences: [
      'Shibuya Crossing — the world\'s busiest pedestrian scramble',
      'Senso-ji Temple in Asakusa — Tokyo\'s oldest temple',
      'Tsukiji Outer Market — tuna auction and sushi breakfast',
      'Shinjuku Golden Gai — tiny bars in post-war buildings',
      'Meiji Shrine — forested sanctuary in the city centre',
      'TeamLab Borderless — immersive digital art museum',
    ],
    hotels: ['Aman Tokyo', 'Hoshinoya Tokyo', 'Andaz Tokyo', 'Park Hyatt Tokyo', 'The Tokyo Edition'],
  },
  {
    slug: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    tagline: 'Island of the Gods',
    gradient: 'linear-gradient(160deg,#001c10,#00301a,#004424)',
    highlights: ['Rice Terraces', 'Ubud', 'Beach Clubs', 'Temples', 'Yoga Retreats'],
    bestTime: 'Apr–Oct',
    duration: '5–8 nights',
    from: '$850',
    description: 'Bali has been seducing travellers for a century — volcanic mountains, spice-scented jungle, rice paddies terraced into impossible green slopes, and a Hindu culture that permeates every aspect of life.',
    experiences: [
      'Tegalalang Rice Terrace sunrise',
      'Sacred Monkey Forest in Ubud',
      'Sunset at Uluwatu Temple with Kecak fire dance',
      'Mount Batur sunrise trek',
      'Spa and yoga retreat in Ubud',
      'Beach day at Seminyak or Nusa Dua',
    ],
    hotels: ['Mandapa Ritz-Carlton Reserve', 'Four Seasons Sayan', 'Capella Ubud', 'The Edge Bali', 'Amandari'],
  },
  {
    slug: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    tagline: 'The Most Exhilarating Chaos in Asia',
    gradient: 'linear-gradient(160deg,#1a0a00,#2c1400,#3e1e00)',
    highlights: ['Grand Palace', 'Floating Markets', 'Tuk Tuks', 'Street Food', 'Night Markets'],
    bestTime: 'Nov–Feb',
    duration: '4–6 nights',
    from: '$520',
    description: 'Bangkok assaults every sense in the best possible way — the heat, the smells, the traffic, the temples, the street food, the shopping, and a nightlife that never stops. It is gloriously, chaotically alive.',
    experiences: [
      'Grand Palace and Wat Phra Kaew (Emerald Buddha)',
      'Wat Arun at sunset — climb the porcelain tower',
      'Chinatown street food walk (Yaowarat)',
      'Floating market day trip (Damnoen Saduak)',
      'Lumphini Park monitor lizards at dusk',
      'Sky bar at Lebua (Hangover movie)',
    ],
    hotels: ['Mandarin Oriental Bangkok', 'The Siam', 'Capella Bangkok', 'Four Seasons Bangkok', 'Rosewood Bangkok'],
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    tagline: 'Asia\'s Ultra-Modern Garden City',
    gradient: 'linear-gradient(160deg,#001a20,#002c34,#003e48)',
    highlights: ['Marina Bay Sands', 'Gardens by the Bay', 'Hawker Centres', 'Sentosa', 'Orchard Road'],
    bestTime: 'Feb–Apr · Nov–Jan',
    duration: '4–5 nights',
    from: '$680',
    description: 'Singapore is what happens when a city-state has a vision — immaculate gardens, world-class architecture, genuinely extraordinary food, and everything works perfectly. It is Asia condensed into one gleaming island.',
    experiences: [
      'Supertree Grove at Gardens by the Bay — light show at 7:45pm',
      'Marina Bay Sands infinity pool (hotel guests only)',
      'Hawker centre lunch — Maxwell or Lau Pa Sat',
      'Singapore Botanic Gardens — UNESCO rainforest in the city',
      'Little India and Kampong Glam heritage walk',
      'Sentosa Island — cable car and Universal Studios',
    ],
    hotels: ['Marina Bay Sands', 'Raffles Singapore', 'The Fullerton Bay', 'Capella Sentosa', 'Mandarin Oriental'],
  },
  {
    slug: 'hanoi',
    name: 'Hanoi',
    country: 'Vietnam',
    tagline: 'The Soul of Old Vietnam',
    gradient: 'linear-gradient(160deg,#1a0a00,#2c1400,#3e1e00)',
    highlights: ['Old Quarter', 'Ha Long Bay', 'Egg Coffee', 'Hoan Kiem Lake', 'Street Food'],
    bestTime: 'Oct–Dec · Mar–Apr',
    duration: '4–6 nights',
    from: '$380',
    description: 'Hanoi is Vietnam\'s elegant, chaotic capital — a thousand-year-old city of lakes, shaded boulevards, centuries-old temples, French colonial architecture, and the best street food on earth.',
    experiences: [
      'Hoan Kiem Lake and Ngoc Son Temple at dawn',
      'Old Quarter walking tour — 36 ancient streets',
      'Egg coffee at Cafe Giang (original since 1946)',
      'Ha Long Bay overnight cruise — limestone karsts',
      'Train Street — houses inches from passing trains',
      'Water puppet theatre — traditional Vietnamese art',
    ],
    hotels: ['Sofitel Legend Metropole', 'Capella Hanoi', 'Hotel de l\'Opera', 'Peridot Grand', 'Apricot Hotel'],
  },
  {
    slug: 'chiang-mai',
    name: 'Chiang Mai',
    country: 'Thailand',
    tagline: 'The Rose of the North',
    gradient: 'linear-gradient(160deg,#1a1000,#2c2000,#3e3000)',
    highlights: ['Doi Suthep', 'Night Bazaar', 'Elephant Sanctuary', 'Temples', 'Cooking Classes'],
    bestTime: 'Nov–Feb',
    duration: '4–6 nights',
    from: '$420',
    description: 'Chiang Mai is Thailand\'s cultural capital — 300+ Buddhist temples, a weekly Sunday night market that transforms the old city, jungles outside the city limits, and the friendliest people in Thailand.',
    experiences: [
      'Doi Suthep temple — golden chedi overlooking the city',
      'Elephant Nature Park — ethical sanctuary',
      'Sunday Night Market — the biggest in Thailand',
      'Thai cooking class with market tour',
      'Monk chat at Wat Phra Singh',
      'Zip-lining through the jungle canopy',
    ],
    hotels: ['Four Seasons Chiang Mai', 'Anantara Chiang Mai', '137 Pillars House', 'Rachamankha', 'Villa Mahabhirom'],
  },
  {
    slug: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    tagline: 'The Ultimate Overwater Escape',
    gradient: 'linear-gradient(160deg,#001428,#002040,#002c58)',
    highlights: ['Overwater Bungalows', 'Snorkelling', 'Private Islands', 'Sunset Cruises', 'Underwater Dining'],
    bestTime: 'Nov–Apr',
    duration: '5–7 nights',
    from: '$1,800',
    description: 'The Maldives is the world\'s most beautiful island nation — 1,200 coral islands scattered across the Indian Ocean, impossibly turquoise water, white sandbanks, and overwater bungalows that define tropical luxury.',
    experiences: [
      'Snorkelling with manta rays and whale sharks',
      'Overwater villa sunrise from your deck',
      'Private sandbank picnic',
      'Sunset dolphin cruise',
      'Underwater restaurant dining',
      'Scuba diving in Hanifaru Bay',
    ],
    hotels: ['Soneva Jani', 'Gili Lankanfushi', 'Conrad Maldives', 'St. Regis Maldives', 'Cheval Blanc Randheli'],
  },
]

const asiaTypes = [
  { icon: '⛩️', title: 'Cultural & Spiritual', desc: 'Kyoto\'s temples, Bali\'s offerings, Thailand\'s Golden Buddha — Asia is the world\'s spiritual heartland.' },
  { icon: '🏙️', title: 'Mega-City Energy', desc: 'Tokyo, Bangkok, Singapore, Seoul — Asian cities operate at a frequency no other continent can match.' },
  { icon: '🏝️', title: 'Tropical Paradise', desc: 'Maldives, Bali, Thailand\'s islands, Philippines — Asia has the world\'s most beautiful beaches.' },
  { icon: '🗻', title: 'Mountain & Nature', desc: 'Japanese Alps, Himalayas, Vietnam\'s limestone karsts, Borneo\'s rainforests.' },
  { icon: '🍜', title: 'World-Class Food', desc: 'From Tokyo\'s 200+ Michelin-starred restaurants to Bangkok\'s legendary street food — Asia is the world\'s greatest food destination.' },
  { icon: '🎌', title: 'Ancient Wonders', desc: 'Angkor Wat, Bagan, Great Wall, Borobudur — Asia contains the world\'s most extraordinary ancient monuments.' },
]

const planningTips = [
  { icon: '📱', tip: 'Get an eSIM before arrival — Airalo or Holafly work across most Asian countries. Japan requires local pick-up.' },
  { icon: '💴', tip: 'Japan, South Korea, Vietnam still largely cash-based. ATMs work but carry local currency for street food and markets.' },
  { icon: '🙏', tip: 'Temple etiquette: remove shoes, dress modestly (shoulders and knees covered). Never point feet at Buddha statues.' },
  { icon: '🍜', tip: 'Eat where the locals eat — busy stalls = fresh food. Hawker centres in Singapore are spotless and incredible.' },
  { icon: '🚇', tip: 'Public transport in Tokyo, Singapore, Seoul is world-class. Use Google Maps or Citymapper for navigation.' },
  { icon: '🔌', tip: 'Plug types vary — Japan (Type A/B), Bali (C/F), Singapore (G), Thailand (C/O). Bring a universal adapter.' },
]

export default function AsiaPage() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg,#080a12,#0e1020,#080a0e)',
        borderBottom: '1px solid rgba(200,169,110,0.12)',
        padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 40% 50%, rgba(200,169,110,0.06) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block', marginRight: 12 }} />
            ASIA & FAR EAST
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            Asia <em style={{ color: gold }}>& Far East</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            Asia defies any single definition — it is the sum of dozens of completely different worlds, from Tokyo's neon future to Kyoto's ancient temples, Bali's rice terraces to the Maldives' turquoise waters.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/flights" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none' }}>
              ✈ SEARCH FLIGHTS
            </a>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none' }}>
              PLAN MY TRIP
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: '8', label: 'Featured Destinations' },
            { num: '15+', label: 'Countries' },
            { num: '40+', label: 'UNESCO Sites' },
            { num: '60%', label: 'World Population' },
            { num: '3', label: 'Major Religions' },
          ].map(s => (
            <div key={s.num} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(200,169,110,0.15)', marginBottom: 48 }}>
          {[
            { key: 'destinations', label: 'Destinations' },
            { key: 'experiences', label: 'Experiences' },
            { key: 'guide', label: 'Planning Guide' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '14px 24px', background: 'none', border: 'none', color: activeTab === tab.key ? gold : muted, borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* DESTINATIONS TAB */}
        {activeTab === 'destinations' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 2 }}>
            {destinations.map(dest => (
              <div key={dest.slug}
                onClick={() => setSelectedDest(selectedDest?.slug === dest.slug ? null : dest)}
                style={{ background: '#111110', border: `1px solid ${selectedDest?.slug === dest.slug ? gold : 'rgba(200,169,110,0.1)'}`, cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <div style={{ background: dest.gradient, height: 130, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.75) 0%,transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 18 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold }}>{dest.country}</div>
                  </div>
                </div>
                <div style={{ padding: '20px 22px 22px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 300, color: cream, marginBottom: 4 }}>{dest.name}</h3>
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: gold, marginBottom: 10 }}>{dest.tagline}</p>
                  <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 14 }}>{dest.description}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {dest.highlights.map(h => (
                      <span key={h} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: gold, padding: '3px 10px' }}>{h}</span>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 14 }}>
                    {[
                      { label: 'BEST TIME', value: dest.bestTime },
                      { label: 'STAY', value: dest.duration },
                      { label: 'FROM', value: dest.from },
                    ].map(s => (
                      <div key={s.label} style={{ background: '#1C1B18', padding: '10px 12px' }}>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', color: dim, marginBottom: 3 }}>{s.label}</div>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.88rem', color: s.label === 'FROM' ? gold : cream, fontWeight: 600 }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: selectedDest?.slug === dest.slug ? muted : gold }}>
                    {selectedDest?.slug === dest.slug ? 'CLICK TO CLOSE ↑' : 'SEE DETAILS ↓'}
                  </div>
                </div>
                {selectedDest?.slug === dest.slug && (
                  <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', padding: '22px 22px 26px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
                      <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>EXPERIENCES</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {dest.experiences.map((exp, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                              <span style={{ color: gold, fontSize: '0.6rem', marginTop: 2 }}>✦</span>
                              <span style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.5 }}>{exp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>TOP HOTELS</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {dest.hotels.map((hotel, i) => (
                            <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6 }}>{hotel}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <a href="/flights" target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none' }}>
                        ✈ SEARCH FLIGHTS
                      </a>
                      <Link href="/ai-planner"
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px 24px', textDecoration: 'none' }}>
                        PLAN THIS TRIP
                      </Link>
                      <Link href="/budget-calculator"
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '12px 24px', textDecoration: 'none' }}>
                        ESTIMATE BUDGET
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCES TAB */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Asia <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                Asia defies any single definition — it is the sum of dozens of completely different worlds, each extraordinary in its own right.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {asiaTypes.map(type => (
                <div key={type.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{type.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{type.title}</h3>
                  <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{type.desc}</p>
                </div>
              ))}
            </div>

            {/* Season Guide */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>ASIA BY SEASON</div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'Dec – Feb', desc: 'Peak season for Thailand, Vietnam (south), Maldives, Bali. Japan snow season in Hokkaido. Best for escaping winter.', level: 'Peak SE Asia', color: '#f87171' },
                  { period: 'Mar – May', desc: 'Japan cherry blossom — Kyoto and Tokyo are extraordinary. Best time for Seoul and Beijing.', level: 'Japan Peak', color: '#f87171' },
                  { period: 'Apr – Oct', desc: 'Bali and Indonesia dry season — ideal for beaches. Vietnam (north) and Philippines best now.', level: 'Bali Peak', color: '#4ade80' },
                  { period: 'Sep – Nov', desc: 'Japan autumn colours — stunning foliage in Kyoto. Maldives shoulder season with lower prices.', level: 'Japan Autumn', color: '#fbbf24' },
                ].map(row => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 140px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px', textAlign: 'center' }}>{row.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PLANNING GUIDE TAB */}
        {activeTab === 'guide' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Planning Your <em style={{ color: gold }}>Asia Trip</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Practical Tips */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>ASIA ESSENTIALS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {planningTips.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                      <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Guide */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>BUDGET GUIDE (PER PERSON / DAY)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Japan', range: '$120–400/day', note: 'Expensive but worth it' },
                    { dest: 'Singapore', range: '$100–300/day', note: 'Premium city' },
                    { dest: 'Maldives', range: '$300–1,000/day', note: 'Remote luxury' },
                    { dest: 'Thailand', range: '$50–200/day', note: 'Great value' },
                    { dest: 'Bali', range: '$50–180/day', note: 'Excellent value' },
                    { dest: 'Vietnam', range: '$35–120/day', note: 'Budget-friendly' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600, marginBottom: 2 }}>{item.range}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: dim }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visa Overview */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>VISA OVERVIEW</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { heading: 'Japan', body: 'Visa-free for 70+ countries including USA, UK, EU, Australia. Most African passports require pre-arranged visa — apply 2+ weeks ahead.' },
                    { heading: 'Thailand / Vietnam / Indonesia', body: 'Visa-free or Visa on Arrival for most Western passports. Check updated requirements before travel.' },
                    { heading: 'China', body: 'Visa required for most nationalities. Apply 4–6 weeks ahead through embassy or visa agency.' },
                    { heading: 'Singapore', body: 'Visa-free for 30–90 days for most nationalities. Check ICA website for latest entry rules.' },
                  ].map(item => (
                    <div key={item.heading}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>{item.heading}</div>
                      <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* eSIM Strip */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 ASIA TRAVEL ESIM</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across Japan, Thailand, Indonesia, Vietnam, Singapore and 50+ more Asian countries</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET ASIA ESIM
          </Link>
        </div>

        {/* Related Destinations */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari' },
            { label: 'Middle East', href: '/middle-east' },
            { label: 'Europe', href: '/europe' },
            { label: 'Visa Requirements', href: '/visa-requirements' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>EXPLORE {link.label.toUpperCase()} →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}