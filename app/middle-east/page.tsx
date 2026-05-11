'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const destinations = [
  {
    slug: 'dubai', name: 'Dubai', country: 'UAE',
    tagline: 'The City That Refused to Be Ordinary',
    gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)',
    highlights: ['Burj Khalifa', 'Luxury Shopping', 'Desert Safari', 'Fine Dining', 'Palm Jumeirah'],
    bestTime: 'Nov–Mar', duration: '4–7 nights', from: '$380',
    description: 'A city of relentless ambition — the world\'s tallest building, most extravagant hotels and a desert that turns gold at sunset. Dubai has reinvented itself into one of the world\'s great travel destinations.',
    experiences: ['Sunrise at the Burj Khalifa observation deck (level 124)', 'Private desert safari with glamping under the stars', 'Dinner at At.mosphere — the world\'s highest restaurant', 'Traditional abra crossing on Dubai Creek', 'Afternoon at the Dubai Mall and Burj Lake fountain show', 'Sunset drinks at Cé La Vi rooftop'],
    camps: ['Burj Al Arab Jumeirah', 'Atlantis The Royal', 'Four Seasons DIFC', 'One&Only The Palm', 'Waldorf Astoria Dubai'],
  },
  {
    slug: 'abu-dhabi', name: 'Abu Dhabi', country: 'UAE',
    tagline: 'Culture Meets Modern Grandeur',
    gradient: 'linear-gradient(160deg,#180c00,#2c1800,#402400)',
    highlights: ['Sheikh Zayed Mosque', 'Louvre Abu Dhabi', 'Yas Island', 'Desert Liwa', 'Saadiyat Beach'],
    bestTime: 'Nov–Mar', duration: '3–5 nights', from: '$340',
    description: 'The UAE\'s thoughtful sibling — less flashy than Dubai but richer in culture. The Sheikh Zayed Grand Mosque is one of the world\'s most beautiful buildings, and the Louvre Abu Dhabi is genuinely world-class.',
    experiences: ['Sheikh Zayed Grand Mosque at dawn', 'Louvre Abu Dhabi — extraordinary architecture and art', 'Yas Marina Circuit — drive the F1 track', 'Empty Quarter desert excursion to the Liwa Oasis', 'Qasr Al Hosn heritage site', 'Saadiyat Island beach and cultural district'],
    camps: ['Emirates Palace Mandarin Oriental', 'Qasr Al Sarab Desert Resort', 'St. Regis Saadiyat Island', 'Jumeirah at Saadiyat Island'],
  },
  {
    slug: 'saudi-arabia', name: 'AlUla & Riyadh', country: 'Saudi Arabia',
    tagline: 'Arabia\'s Greatest Ancient Secret Revealed',
    gradient: 'linear-gradient(160deg,#1c0e00,#2e1800,#422200)',
    highlights: ['Hegra (Mada\'in Saleh)', 'AlUla Old Town', 'Elephant Rock', 'Diriyah', 'Edge of the World'],
    bestTime: 'Nov–Mar', duration: '5–8 nights', from: '$400',
    description: 'Saudi Arabia has opened its doors and what lies inside has astonished the world. AlUla\'s Hegra — Nabataean tombs older than Petra carved into rose-red cliffs — is one of the most extraordinary archaeological sites on earth.',
    experiences: ['Hegra UNESCO site — rock-cut Nabataean tombs at sunrise', 'Elephant Rock at golden hour', 'AlUla old town wander', 'Edge of the World escarpment near Riyadh', 'Diriyah heritage site — birthplace of the Saudi state', 'Hot air balloon over AlUla valley'],
    camps: ['Banyan Tree AlUla', 'Shebara Resort AlUla', 'Habitas AlUla', 'Rosewood Diriyah'],
  },
  {
    slug: 'jordan', name: 'Petra & Wadi Rum', country: 'Jordan',
    tagline: 'The Rose-Red City and the Martian Desert',
    gradient: 'linear-gradient(160deg,#200800,#381200,#4a1800)',
    highlights: ['Petra Treasury', 'Wadi Rum Desert', 'Dead Sea', 'Aqaba Diving', 'Jerash Ruins'],
    bestTime: 'Mar–May · Sep–Nov', duration: '5–7 nights', from: '$320',
    description: 'Jordan packs more extraordinary experiences into a small country than almost anywhere on earth. Petra\'s rose-red Nabataean city, the surreal red canyons of Wadi Rum, the lowest point on earth at the Dead Sea and some of the Middle East\'s best diving at Aqaba.',
    experiences: ['Petra by Night — thousands of candles lining the Siq', 'Petra Treasury at dawn — before the crowds arrive', 'Wadi Rum 4WD and overnight Bedouin camp', 'Float effortlessly in the Dead Sea', 'Snorkelling and diving at Aqaba Red Sea', 'Roman ruins at Jerash — one of the best-preserved outside Italy'],
    camps: ['Kempinski Hotel Ishtar Dead Sea', 'Six Senses Shaharut', 'Memories Aicha Petra', 'Captain\'s Desert Camp Wadi Rum'],
  },
  {
    slug: 'oman', name: 'Muscat & Oman', country: 'Oman',
    tagline: 'Arabia\'s Hidden Gem of Authenticity',
    gradient: 'linear-gradient(160deg,#141000,#221c00,#302600)',
    highlights: ['Sultan Qaboos Mosque', 'Wahiba Sands', 'Wadi Shab', 'Musandam Fjords', 'Nizwa Fort'],
    bestTime: 'Oct–Apr', duration: '6–9 nights', from: '$360',
    description: 'Oman is what the Gulf looked like before oil — authentic, traditional, spectacularly beautiful and genuinely welcoming. The Musandam Peninsula\'s fjords could be Norway. The Wahiba Sands rival the Sahara. Wadi Shab is one of the Middle East\'s most beautiful gorges.',
    experiences: ['Sultan Qaboos Grand Mosque in Muscat', 'Dhow cruise through the Musandam fjords', 'Wadi Shab gorge hike and swim through turquoise pools', 'Overnight in a luxury desert camp in Wahiba Sands', 'Nizwa Fort and Friday cattle market', 'Swim in natural rock pools at Wadi Bani Khalid'],
    camps: ['Alila Jabal Akhdar', 'Six Senses Zighy Bay', 'The Chedi Muscat', 'Desert Nights Camp Wahiba'],
  },
  {
    slug: 'istanbul', name: 'Istanbul', country: 'Turkey',
    tagline: 'Where Two Continents Meet',
    gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#400030)',
    highlights: ['Hagia Sophia', 'Grand Bazaar', 'Bosphorus Cruise', 'Topkapi Palace', 'Spice Market'],
    bestTime: 'Apr–Jun · Sep–Oct', duration: '4–6 nights', from: '$240',
    description: 'Istanbul is the only city in the world that straddles two continents — and that duality runs through everything. Byzantine churches became Ottoman mosques. Ancient bazaars trade alongside Michelin-starred restaurants. The Bosphorus connects the Black Sea to the Mediterranean.',
    experiences: ['Hagia Sophia and Blue Mosque — the heart of old Istanbul', 'Grand Bazaar — 4,000 shops across 61 covered streets', 'Sunset Bosphorus cruise with dinner', 'Topkapi Palace and imperial treasury', 'Spice Bazaar and Galata Bridge fish sandwiches', 'Rooftop terrace drinks overlooking the Golden Horn'],
    camps: ['Four Seasons Istanbul at the Bosphorus', 'Çırağan Palace Kempinski', 'The Stay Bosphorus', 'Soho House Istanbul'],
  },
  {
    slug: 'cappadocia', name: 'Cappadocia', country: 'Turkey',
    tagline: 'A Landscape From Another World',
    gradient: 'linear-gradient(160deg,#1e0800,#301400,#422000)',
    highlights: ['Hot Air Balloon Sunrise', 'Fairy Chimneys', 'Cave Hotels', 'Underground Cities', 'Rose Valley'],
    bestTime: 'Apr–Jun · Sep–Nov', duration: '3–4 nights', from: '$280',
    description: 'Cappadocia is genuinely one of the world\'s most surreal landscapes — thousands of tufa rock formations shaped by millions of years of volcanic activity, riddled with ancient cave churches and honeycombed with underground cities. The hot air balloon sunrise is one of travel\'s great experiences.',
    experiences: ['Hot air balloon at sunrise over the fairy chimneys', 'Rose Valley sunset hike', 'Underground city of Derinkuyu — 18 levels deep', 'Göreme Open Air Museum — Byzantine cave frescoes', 'Horse trek through the Love Valley', 'Dinner in a cave restaurant with live whirling dervish performance'],
    camps: ['Argos in Cappadocia', 'Museum Hotel Uçhisar', 'Kayakapi Premium Caves', 'Sultan Cave Suites'],
  },
  {
    slug: 'qatar', name: 'Doha', country: 'Qatar',
    tagline: 'The Gulf\'s Most Cultured Capital',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['Museum of Islamic Art', 'Souq Waqif', 'The Pearl', 'Desert Safari', 'Katara Cultural Village'],
    bestTime: 'Nov–Mar', duration: '3–5 nights', from: '$360',
    description: 'Qatar has invested extraordinary resources into becoming a genuine cultural destination. The Museum of Islamic Art — designed by I.M. Pei — is one of the world\'s finest. Souq Waqif is a beautifully restored traditional market. The desert on the city\'s doorstep is spectacular.',
    experiences: ['Museum of Islamic Art — world-class collection in a stunning building', 'Souq Waqif — traditional market with falconry and spices', 'Inland Sea (Khor Al Adaid) — UNESCO-recognised desert sea', 'The Pearl-Qatar — luxury island with marina and boutiques', 'Katara Cultural Village amphitheatre', 'Dhow harbour sunset'],
    camps: ['Mandarin Oriental Doha', 'Four Seasons Hotel Doha', 'The Ned Doha', 'Banana Island Resort'],
  },
]

const experienceTypes = [
  { icon: '🏙', title: 'Luxury City Breaks', desc: 'Dubai and Abu Dhabi set the global standard for luxury hotels, fine dining and world-class shopping in a desert metropolis.' },
  { icon: '🏛', title: 'Ancient Civilisations', desc: 'Petra, Hegra, Jerash and Cappadocia — the Middle East contains some of the world\'s most important and least visited archaeological sites.' },
  { icon: '🐪', title: 'Desert Adventures', desc: 'From the Wadi Rum\'s Martian landscape to the Wahiba Sands and Saudi\'s Empty Quarter — the Arabian desert is extraordinary.' },
  { icon: '🎈', title: 'Hot Air Ballooning', desc: 'Cappadocia\'s balloon sunrise is one of travel\'s great experiences. Dubai and Petra also offer balloon flights over dramatic landscapes.' },
  { icon: '🤿', title: 'Red Sea Diving', desc: 'Jordan\'s Aqaba and Egypt\'s Sinai coast offer some of the world\'s best diving — warm water, extraordinary coral and minimal crowds.' },
  { icon: '🕌', title: 'Islamic Architecture', desc: 'The Sheikh Zayed Mosque, Sultan Qaboos Grand Mosque and Istanbul\'s Blue Mosque are among the world\'s most beautiful buildings.' },
]

export default function MiddleEast() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* HERO */}
      <div style={{
        background: 'linear-gradient(160deg,#0a0800,#1a1000,#0d0a14)',
        borderBottom: '1px solid rgba(200,169,110,0.12)',
        padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(232,160,90,0.08) 0%, transparent 70%)'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          <div style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            color: gold,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            MIDDLE EAST
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(3rem,8vw,7rem)',
            fontWeight: 300,
            color: cream,
            lineHeight: 0.92,
            marginBottom: 28
          }}>
            Middle<br /><em style={{ color: gold }}>East</em>
          </h1>

          <p style={{
            color: muted,
            fontSize: 'clamp(0.95rem,2vw,1.1rem)',
            maxWidth: 560,
            lineHeight: 1.8,
            marginBottom: 40
          }}>
            Ancient cities carved in rose-red rock. Ultramodern skylines rising from the desert.
            The Middle East delivers unmatched travel experiences.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>

            {/* FIXED LINK */}
            <a
              href="/flights"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                background: gold,
                color: '#080807',
                padding: '16px 36px',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              ✈ SEARCH FLIGHTS
            </a>

            <Link
              href="/ai-planner"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                border: '1px solid rgba(200,169,110,0.4)',
                color: gold,
                padding: '16px 36px',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              PLAN MY TRIP
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div style={{
          maxWidth: 1200,
          margin: '48px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
          gap: 2
        }}>
          {[{ num: '8', label: 'Destinations' }, { num: '3', label: 'UNESCO Sites' }].map(s => (
            <div key={s.num} style={{
              background: 'rgba(8,8,7,0.6)',
              border: '1px solid rgba(200,169,110,0.1)',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: '2rem',
                fontWeight: 600,
                color: gold
              }}>
                {s.num}
              </div>
              <div style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                color: dim,
                marginTop: 6
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>

        {/* TABS */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(200,169,110,0.15)',
          marginBottom: 48
        }}>
          {[
            { key: 'destinations', label: 'Destinations' },
            { key: 'experiences', label: 'Experiences' },
            { key: 'guide', label: 'Planning Guide' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab.key ? gold : muted,
                padding: '14px 24px',
                cursor: 'pointer',
                fontFamily: "'Bebas Neue',sans-serif"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===================== EXPERIENCES TAB ===================== */}
        {activeTab === 'experiences' && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: cream }}>
              Middle East <em style={{ color: gold }}>Experiences</em>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2 }}>
              {experienceTypes.map(exp => (
                <div key={exp.title} style={{ background: '#111110', padding: 28, border: '1px solid rgba(200,169,110,0.1)' }}>
                  <div style={{ fontSize: '2rem' }}>{exp.icon}</div>
                  <h3 style={{ color: gold }}>{exp.title}</h3>
                  <p style={{ color: muted }}>{exp.desc}</p>
                </div>
              ))}
            </div>

            {/* SEASON GUIDE */}
            <div style={{ marginTop: 40, background: '#111110', padding: 40 }}>
              {[
                { period: 'Nov – Mar', desc: 'Peak Gulf season 20–28°C', level: 'Peak', color: '#f87171' },
                { period: 'Apr – May', desc: 'Jordan & Turkey ideal', level: 'Excellent', color: '#4ade80' },
                { period: 'Jun – Aug', desc: 'Extreme Gulf heat', level: 'Hot', color: '#fb923c' },
                { period: 'Sep – Oct', desc: 'Best balance season', level: 'Great', color: '#fbbf24' }
              ].map(row => (
                <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 100px', marginBottom: 12 }}>
                  <div style={{ color: gold }}>{row.period}</div>
                  <div style={{ color: muted }}>{row.desc}</div>
                  <div style={{ color: row.color }}>{row.level}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== GUIDE TAB ===================== */}
        {activeTab === 'guide' && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: cream }}>
              Planning Your <em style={{ color: gold }}>Trip</em>
            </h2>

            <div style={{ background: '#111110', padding: 30 }}>
              {[
                { icon: '👗', tip: 'Dress modestly in public areas' },
                { icon: '🕌', tip: 'Respect mosque rules' },
                { icon: '🍷', tip: 'Alcohol rules vary by country' },
                { icon: '📸', tip: 'Ask before photographing people' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span>{item.icon}</span>
                  <p style={{ color: muted }}>{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}