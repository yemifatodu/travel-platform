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

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0800,#1a1000,#0d0a14)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(232,160,90,0.08) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            MIDDLE EAST
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            Middle<br /><em style={{ color: gold }}>East</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            Ancient cities carved in rose-red rock. Ultramodern skylines rising from the desert. The world's most spectacular mosques and the most generous hospitality on earth. The Middle East rewards the curious traveller like nowhere else.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://aviasales.tp.st/4CRDbzuv" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              ✈ SEARCH FLIGHTS
            </a>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              PLAN MY TRIP
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[{ num: '8', label: 'Destinations' }, { num: '3', label: 'UNESCO Sites' }, { num: '7★', label: 'Hotels' }, { num: '12°C–45°C', label: 'Temperature Range' }, { num: '3,000+', label: 'Years of History' }].map(s => (
            <div key={s.num} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(200,169,110,0.15)', marginBottom: 48 }}>
          {[{ key: 'destinations', label: 'Destinations' }, { key: 'experiences', label: 'Experiences' }, { key: 'guide', label: 'Planning Guide' }].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '14px 24px', background: 'none', border: 'none', color: activeTab === tab.key ? gold : muted, borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent', cursor: 'pointer', position: 'relative', top: 1, transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
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
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 300, color: cream, marginBottom: 4, lineHeight: 1 }}>{dest.name}</h3>
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: gold, marginBottom: 10 }}>{dest.tagline}</p>
                  <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 14 }}>{dest.description}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {dest.highlights.map(h => (
                      <span key={h} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: gold, padding: '3px 10px' }}>{h}</span>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 14 }}>
                    {[{ label: 'BEST TIME', value: dest.bestTime }, { label: 'STAY', value: dest.duration }, { label: 'FROM', value: dest.from }].map(s => (
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
                          {dest.camps.map((camp, i) => (
                            <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6 }}>{camp}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <a href="https://aviasales.tp.st/4CRDbzuv" target="_blank" rel="noopener noreferrer"
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
                Middle East <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                From floating in the Dead Sea to watching a thousand hot air balloons rise over Cappadocia — the Middle East delivers experiences found nowhere else on earth.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {experienceTypes.map(exp => (
                <div key={exp.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{exp.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{exp.title}</h3>
                  <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{exp.desc}</p>
                </div>
              ))}
            </div>

            {/* Season guide */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>MIDDLE EAST SEASON GUIDE</div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'Nov – Mar', desc: 'Peak season across the Gulf — Dubai, Abu Dhabi, Qatar, Oman. Perfect temperatures 20–28°C. Book hotels well ahead.', level: 'Peak', color: '#f87171' },
                  { period: 'Apr – May', desc: 'Ideal for Jordan (Petra, Wadi Rum), Israel and Turkey. Wildflowers bloom. Comfortable temperatures before summer heat.', level: 'Excellent', color: '#4ade80' },
                  { period: 'Jun – Aug', desc: 'Extreme heat in the Gulf (40–48°C). Turkey and Jordan become popular. The Gulf offers massive hotel discounts.', level: 'Hot', color: '#fb923c' },
                  { period: 'Sep – Oct', desc: 'Shoulder season — Gulf temperatures dropping. Turkey and Cappadocia at their most beautiful. Jordan excellent.', level: 'Great Value', color: '#fbbf24' },
                ].map(row => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 100px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px' }}>{row.level}</span>
                    </div>
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
                Planning Your <em style={{ color: gold }}>Middle East Trip</em>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Cultural tips */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>CULTURAL ESSENTIALS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { icon: '👗', tip: 'Dress modestly in all countries — shoulders and knees covered in public areas, souks, mosques and outside resorts.' },
                    { icon: '🕌', tip: 'Remove shoes before entering mosques. Women should cover hair. Both mosques and churches require respectful behaviour.' },
                    { icon: '🍷', tip: 'Alcohol is available in UAE, Jordan, Lebanon and Turkey. It is prohibited in Saudi Arabia and restricted in Oman.' },
                    { icon: '📸', tip: 'Always ask permission before photographing people. Avoid photographing government buildings, military sites and airports.' },
                    { icon: '🤝', tip: 'Hospitality is sacred across the region. If offered tea, coffee or a meal — accepting graciously is the highest compliment.' },
                    { icon: '🌙', tip: 'During Ramadan, eating and drinking in public during daylight is restricted. Check dates ahead — the experience can be magical.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                      <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packing */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>WHAT TO PACK</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
                  {[
                    { cat: 'Clothing', items: ['Lightweight linen or cotton layers', 'Long sleeves and trousers for souks', 'Scarf or shawl (women — for mosques)', 'Swimwear (for resort/hotel pools)', 'One smart outfit for fine dining'] },
                    { cat: 'Health', items: ['Sun cream SPF 50+', 'Insect repellent (Jordan, Oman)', 'Rehydration sachets', 'Antihistamines', 'Basic first aid kit'] },
                    { cat: 'Tech', items: ['Universal adapter (Type G/C/F)', 'Power bank', 'Travel eSIM (huuboi.com/esim)', 'Offline Google Maps downloaded', 'Translation app with Arabic'] },
                  ].map(s => (
                    <div key={s.cat}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 12 }}>{s.cat}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {s.items.map((item, i) => (
                          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <span style={{ color: gold, fontSize: '0.6rem', marginTop: 3, flexShrink: 0 }}>✓</span>
                            <span style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.5 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Money */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>MONEY & BUDGET</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Dubai / Abu Dhabi', range: '$200–600/day', note: 'Luxury standard' },
                    { dest: 'Saudi Arabia', range: '$150–400/day', note: 'Rapidly developing' },
                    { dest: 'Jordan', range: '$80–200/day', note: 'Good value' },
                    { dest: 'Oman', range: '$100–250/day', note: 'Mid-range friendly' },
                    { dest: 'Istanbul', range: '$60–150/day', note: 'Excellent value' },
                    { dest: 'Cappadocia', range: '$80–200/day', note: 'Cave hotel premium' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '16px 18px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 4 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: gold, fontWeight: 600, marginBottom: 2 }}>{item.range}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.1em', color: dim }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* eSIM strip */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 MIDDLE EAST ESIM</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across UAE, Saudi, Jordan, Oman, Turkey and 50+ more countries</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET ESIM
          </Link>
        </div>

        {/* Related */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari' },
            { label: 'Asia', href: '/asia' },
            { label: 'Travel Guides', href: '/travel-guides' },
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
