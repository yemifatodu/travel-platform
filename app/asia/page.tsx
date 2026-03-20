'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const destinations = [
  {
    slug: 'bali', name: 'Bali', country: 'Indonesia',
    tagline: 'The Island of the Gods',
    gradient: 'linear-gradient(160deg,#001a08,#002d10,#00401a)',
    highlights: ['Tegalalang Terraces', 'Tanah Lot Temple', 'Mount Batur', 'Seminyak', 'Nusa Penida'],
    bestTime: 'Apr–Oct', duration: '7–12 nights', from: '$420',
    description: 'Bali is a living, breathing spiritual experience — ancient Hindu temples draped in incense smoke, rice terraces carved into volcanic hillsides, world-class surf breaks and a wellness scene that has drawn seekers for decades.',
    experiences: ['Sunrise hike up Mount Batur above the clouds', 'Tegalalang Rice Terrace at golden hour', 'Tanah Lot sea temple at sunset', 'Swim with manta rays at Nusa Penida', 'Traditional Balinese massage at a jungle spa', 'Kecak fire dance at Uluwatu cliff temple'],
    hotels: ['Four Seasons Sayan', 'COMO Uma Ubud', 'Komaneka at Bisma', 'The Mulia Nusa Dua', 'Alaya Resort Ubud'],
  },
  {
    slug: 'tokyo', name: 'Tokyo', country: 'Japan',
    tagline: 'The World\'s Greatest City',
    gradient: 'linear-gradient(160deg,#10001a,#1c0030,#280042)',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'teamLab', 'Tsukiji Market', 'Shinjuku'],
    bestTime: 'Mar–May · Oct–Nov', duration: '6–10 nights', from: '$580',
    description: 'Tokyo operates at a frequency entirely its own — the world\'s largest city by some measures, yet somehow orderly, beautiful and deeply human. Ancient temples sit between skyscrapers. The food alone justifies the flight.',
    experiences: ['Senso-ji temple at dawn in Asakusa', 'teamLab Planets digital art museum', 'Tsukiji outer market breakfast — fresh sushi at 6am', 'Shibuya crossing at night', 'Day trip to Nikko — ornate mountain shrines', 'Michelin-starred ramen in a 6-seat basement shop'],
    hotels: ['Park Hyatt Tokyo', 'Aman Tokyo', 'The Peninsula Tokyo', 'Hoshinoya Tokyo', 'Trunk Hotel'],
  },
  {
    slug: 'kyoto', name: 'Kyoto', country: 'Japan',
    tagline: 'Where Ancient Japan Lives On',
    gradient: 'linear-gradient(160deg,#200015,#380025,#4a0033)',
    highlights: ['Fushimi Inari', 'Arashiyama Bamboo', 'Gion District', 'Philosopher\'s Path', 'Nishiki Market'],
    bestTime: 'Mar–May · Oct–Nov', duration: '4–7 nights', from: '$560',
    description: 'If Tokyo is Japan\'s future, Kyoto is its soul. Seventeen UNESCO World Heritage Sites. 1,600 Buddhist temples and Shinto shrines. The geisha district of Gion where time has barely moved. Cherry blossoms that have been celebrated for over a thousand years.',
    experiences: ['Fushimi Inari gates at 6am — before any other tourists', 'Arashiyama bamboo grove at dawn', 'Nishiki Market tasting walk', 'Evening in Gion watching geiko (geisha) on their way to appointments', 'Philosopher\'s Path in cherry blossom season', 'Kinkaku-ji Golden Pavilion reflected in the mirror pond'],
    hotels: ['Aman Kyoto', 'The Ritz-Carlton Kyoto', 'Hyatt Regency Kyoto', 'Tawaraya Ryokan (historic inn)', 'Noku Kyoto'],
  },
  {
    slug: 'maldives', name: 'Maldives', country: 'Maldives',
    tagline: 'Paradise Above and Below the Water',
    gradient: 'linear-gradient(160deg,#001828,#002440,#003058)',
    highlights: ['Overwater Villas', 'House Reef Snorkelling', 'Whale Sharks', 'Sandbank Picnic', 'Bioluminescence'],
    bestTime: 'Nov–Apr', duration: '5–8 nights', from: '$680',
    description: 'The Maldives is the definitive overwater bungalow experience — a nation of 1,200 coral islands scattered across the Indian Ocean, each resort on its own private island with a house reef teeming with turtles and reef sharks just steps from your door.',
    experiences: ['Dawn snorkelling on the house reef', 'Private sandbank picnic set up by your resort', 'Whale shark snorkelling (seasonal)', 'Sunset dolphin dhow cruise', 'Bioluminescent beach walk at midnight', 'Spa treatment in an overwater treatment room'],
    hotels: ['Soneva Fushi', 'Gili Lankanfushi', 'Velaa Private Island', 'The Nautilus', 'Anantara Kihavah'],
  },
  {
    slug: 'singapore', name: 'Singapore', country: 'Singapore',
    tagline: 'The Lion City — Asia\'s Greatest Food City',
    gradient: 'linear-gradient(160deg,#001428,#001e40,#002858)',
    highlights: ['Gardens by the Bay', 'Hawker Centre Food', 'Marina Bay Sands', 'Sentosa', 'Little India'],
    bestTime: 'Feb–Apr', duration: '3–5 nights', from: '$520',
    description: 'Singapore is the world\'s most ambitious city-state — immaculately clean, impossibly efficient, and home to one of the world\'s greatest food cultures. The hawker centres serve meals that put most restaurants to shame, and the Gardens by the Bay are genuinely extraordinary.',
    experiences: ['Gardens by the Bay — Supertree Grove light show at night', 'Maxwell Food Centre hawker centre for chicken rice', 'Marina Bay Sands infinity pool at sunset (hotel guests only)', 'Singapore Botanic Gardens — UNESCO-listed', 'Night Safari at Singapore Zoo — world\'s first', 'Chinatown, Little India and Arab Street in one morning walk'],
    hotels: ['Marina Bay Sands', 'Capella Singapore', 'The Fullerton Hotel', 'Raffles Singapore', 'Andaz Singapore'],
  },
  {
    slug: 'bangkok', name: 'Bangkok', country: 'Thailand',
    tagline: 'The City That Never Stops',
    gradient: 'linear-gradient(160deg,#1a0800,#2c1200,#401c00)',
    highlights: ['Grand Palace', 'Wat Pho Temple', 'Chatuchak Market', 'Khao San Road', 'Floating Markets'],
    bestTime: 'Nov–Feb', duration: '4–6 nights', from: '$380',
    description: 'Bangkok is one of Asia\'s great overwhelming cities — chaotic, golden, spiritual and utterly alive. The Grand Palace is astonishing. The street food is world-class. The rooftop bars are spectacular. And the temples somehow remain serene despite millions of visitors.',
    experiences: ['Grand Palace and Wat Phra Kaew at opening time', 'Wat Pho reclining Buddha and traditional massage', 'Chao Phraya river boat — the original Bangkok highway', 'Damnoen Saduak floating market at dawn', 'Chatuchak Weekend Market — 15,000 stalls', 'Rooftop cocktails at Sky Bar on State Tower (The Hangover II)'],
    hotels: ['Capella Bangkok', 'Mandarin Oriental Bangkok (1876)', 'The Peninsula Bangkok', 'Park Hyatt Bangkok', 'Rosewood Bangkok'],
  },
  {
    slug: 'phuket', name: 'Phuket & Thai Islands', country: 'Thailand',
    tagline: 'Emerald Waters and Limestone Cliffs',
    gradient: 'linear-gradient(160deg,#001820,#002430,#003040)',
    highlights: ['Phang Nga Bay', 'Phi Phi Islands', 'Maya Bay', 'Similan Islands Diving', 'Patong Beach'],
    bestTime: 'Nov–Apr', duration: '7–10 nights', from: '$320',
    description: 'Thailand\'s islands offer some of the world\'s most dramatic coastal scenery — emerald lagoons enclosed by vertical limestone karst, white sand beaches and some of Southeast Asia\'s finest diving. Koh Lanta and Koh Yao Noi remain beautifully quiet.',
    experiences: ['Phang Nga Bay kayaking through sea caves', 'Similan Islands liveaboard diving trip', 'Sunset at Promthep Cape', 'Long-tail boat to Maya Bay (Phi Phi Leh) at sunrise', 'Cooking class in Phuket Old Town', 'Island-hopping by speedboat to Koh Phi Phi and Koh Yao'],
    hotels: ['Amanpuri', 'Sri Panwa', 'The Surin Phuket', 'Six Senses Yao Noi', 'Anantara Layan'],
  },
  {
    slug: 'vietnam', name: 'Vietnam', country: 'Vietnam',
    tagline: 'A Country That Gets Under Your Skin',
    gradient: 'linear-gradient(160deg,#001018,#001a28,#002438)',
    highlights: ['Ha Long Bay', 'Hoi An Old Town', 'Hanoi Old Quarter', 'Hue Imperial City', 'Phong Nha Caves'],
    bestTime: 'Feb–Apr · Aug–Oct', duration: '10–14 nights', from: '$380',
    description: 'Vietnam rewards travellers with extraordinary diversity from north to south — Ha Long Bay\'s emerald karst seascape, the golden lantern-lit streets of Hoi An, the imperial grandeur of Hue and the world\'s largest cave systems in Phong Nha.',
    experiences: ['Ha Long Bay overnight junk cruise — kayak through caves at dawn', 'Hoi An lantern festival walk through the old town', 'Motorbike through the Hai Van mountain pass', 'Son Doong Cave expedition (world\'s largest cave)', 'Hanoi street food walking tour at night', 'Mekong Delta boat journey from Ho Chi Minh City'],
    hotels: ['Six Senses Con Dao', 'Amanoi', 'Nam Hai Hoi An', 'La Siesta Hoi An', 'Sofitel Legend Metropole Hanoi'],
  },
  {
    slug: 'india', name: 'Rajasthan & Kerala', country: 'India',
    tagline: 'A Subcontinent of a Thousand Worlds',
    gradient: 'linear-gradient(160deg,#240800,#3a1000,#501800)',
    highlights: ['Taj Mahal', 'Jaipur Pink City', 'Kerala Backwaters', 'Jodhpur Blue City', 'Udaipur Lakes'],
    bestTime: 'Oct–Mar', duration: '10–16 nights', from: '$340',
    description: 'India demands surrender to its beautiful chaos. Rajasthan\'s royal palaces and painted cities, Kerala\'s hushed backwater canals and spice-scented hills — two of the world\'s most extraordinary travel experiences in one country.',
    experiences: ['Taj Mahal at sunrise — before 8am for the golden light', 'Houseboat stay on Kerala backwaters', 'Jaipur Amber Fort elephant or jeep ascent', 'Sunset at Udaipur\'s Lake Pichola from a rooftop', 'Jodhpur blue city walk and Mehrangarh Fort', 'Ayurvedic treatment at a Kerala retreat'],
    hotels: ['Aman-i-Khás Ranthambore', 'Taj Lake Palace Udaipur', 'SUJÁN Sher Bagh', 'The Leela Palace Udaipur', 'CGH Earth Kerala'],
  },
  {
    slug: 'cambodia', name: 'Angkor Wat', country: 'Cambodia',
    tagline: 'The Greatest Temple Complex on Earth',
    gradient: 'linear-gradient(160deg,#1a0a00,#2c1600,#402000)',
    highlights: ['Angkor Wat Sunrise', 'Ta Prohm Tree Roots', 'Bayon Temple', 'Tonle Sap Lake', 'Phnom Penh'],
    bestTime: 'Nov–Mar', duration: '4–6 nights', from: '$280',
    description: 'Angkor Wat is the largest religious monument ever built — a 12th-century Hindu-Buddhist temple complex covering 400 square kilometres of jungle in northwest Cambodia. No photograph prepares you for the scale of it.',
    experiences: ['Angkor Wat sunrise from the reflection pool', 'Ta Prohm — trees consuming the temple stones', 'Bayon temple with its 216 enormous stone faces', 'Cycle the Angkor Archaeological Park at dawn', 'Tonle Sap floating village boat tour', 'Tuol Sleng Genocide Museum in Phnom Penh — essential history'],
    hotels: ['Amansara', 'Shinta Mani Angkor', 'Belmond La Résidence d\'Angkor', 'Park Hyatt Siem Reap'],
  },
]

const asiaTypes = [
  { icon: '🍜', title: 'Food & Culinary', desc: 'From Tokyo\'s Michelin stars to Bangkok\'s street stalls — Asia is the world\'s greatest food destination. Every city, a different cuisine.' },
  { icon: '⛩', title: 'Temples & Spirituality', desc: 'Angkor Wat, Kyoto\'s 1,600 temples, Bali\'s daily offerings — Asia\'s spiritual depth is without equal anywhere in the world.' },
  { icon: '🏖', title: 'Islands & Beaches', desc: 'Maldives, Bali, Phuket, Phi Phi, Palawan — Asia has the world\'s finest tropical island experiences across a vast geography.' },
  { icon: '🌿', title: 'Wellness & Retreats', desc: 'Bali is the world\'s wellness capital. Thailand, India and Sri Lanka offer Ayurvedic and yoga retreat experiences unavailable elsewhere.' },
  { icon: '🏙', title: 'World-Class Cities', desc: 'Tokyo, Singapore, Hong Kong, Bangkok, Seoul — Asia\'s cities are among the world\'s most extraordinary urban environments.' },
  { icon: '🤿', title: 'Diving & Marine Life', desc: 'The Coral Triangle (Indonesia, Philippines, Malaysia) contains 75% of the world\'s coral species. The Maldives adds whale sharks and mantas.' },
]

export default function AsiaPage() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080810,#10081a,#0a0a08)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(155,143,200,0.08) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            ASIA & FAR EAST
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            Asia &<br /><em style={{ color: gold }}>Far East</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            Half the world's population. The world's greatest food cultures. Ancient civilisations still breathing. Tropical islands of impossible beauty. Asia is not a destination — it is a lifetime of travel.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://www.aviasales.com/?marker=710879&locale=en" target="_blank" rel="noopener noreferrer"
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
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[{ num: '10', label: 'Destinations' }, { num: '48', label: 'Countries' }, { num: '4.7B', label: 'People' }, { num: '7', label: 'UNESCO Sites Featured' }, { num: '1', label: 'World\'s Best Food City (Tokyo)' }].map(s => (
            <div key={s.num} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
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

        {/* DESTINATIONS */}
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
                        {dest.experiences.map((exp, i) => (
                          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }}>
                            <span style={{ color: gold, fontSize: '0.6rem', marginTop: 2 }}>✦</span>
                            <span style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.5 }}>{exp}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>TOP HOTELS</div>
                        {dest.hotels.map((hotel, i) => (
                          <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6, marginBottom: 6 }}>{hotel}</div>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <a href="https://www.aviasales.com/?marker=710879&locale=en" target="_blank" rel="noopener noreferrer"
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

        {/* EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Asia <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>Asia defies any single definition — it is the sum of dozens of completely different worlds, each extraordinary in its own right.</p>
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

            {/* Asia by season */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>ASIA BY SEASON</div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'Dec – Feb', desc: 'Peak season for Thailand, Maldives, Vietnam south, Cambodia, Malaysia. Japan is cold but beautiful with snow. Bali dry season begins.', level: 'Peak SE Asia', color: '#f87171' },
                  { period: 'Mar – May', desc: 'Japan cherry blossom — the most magical month in Asia. Kyoto and Tokyo are extraordinary. Good for Vietnam central and north.', level: 'Japan Peak', color: '#f87171' },
                  { period: 'Apr – Oct', desc: 'Bali and Indonesia dry season — ideal conditions. Good for Himalayan trekking in Nepal. Japan summer festivals.', level: 'Bali Peak', color: '#4ade80' },
                  { period: 'Sep – Nov', desc: 'Japan autumn colours — second most beautiful season after cherry blossom. Good for Vietnam north. Maldives shoulder season.', level: 'Japan Autumn', color: '#fbbf24' },
                ].map(row => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px', textAlign: 'center' }}>{row.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GUIDE */}
        {activeTab === 'guide' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Asia Planning <em style={{ color: gold }}>Guide</em>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Essential tips */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>ASIA ESSENTIALS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { icon: '💴', tip: 'Japan and South Korea are still largely cash-based. Carry local currency. Elsewhere in Asia, cards are widely accepted.' },
                    { icon: '📱', tip: 'Get a local SIM or travel eSIM on arrival — essential for navigation in Asian cities. Download offline maps before landing.' },
                    { icon: '🙏', tip: 'Temple etiquette: remove shoes, dress modestly (shoulders and knees covered), speak quietly and never turn your back on a Buddha image.' },
                    { icon: '🍜', tip: 'Eat where the locals eat — street food and hawker centres are often safer and always better than tourist restaurants.' },
                    { icon: '🚗', tip: 'Traffic in Asian cities is intense. Budget enormous amounts of time for transfers. Grab (the Asian Uber) works across Southeast Asia.' },
                    { icon: '💉', tip: 'Check vaccination requirements per country — Hepatitis A and Typhoid are recommended for most of Asia. Malaria prophylaxis for rural areas.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                      <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget guide */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>BUDGET GUIDE (PER PERSON / DAY)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Japan', range: '$120–300/day', note: 'Expensive but worth it' },
                    { dest: 'Singapore', range: '$100–250/day', note: 'Modern and pricey' },
                    { dest: 'Maldives', range: '$300–800/day', note: 'Ultra luxury' },
                    { dest: 'Bali', range: '$50–150/day', note: 'Excellent value' },
                    { dest: 'Thailand', range: '$40–120/day', note: 'Great value' },
                    { dest: 'Vietnam', range: '$35–80/day', note: 'Budget-friendly' },
                    { dest: 'India', range: '$30–100/day', note: 'Very affordable' },
                    { dest: 'Cambodia', range: '$35–80/day', note: 'Budget-friendly' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600, marginBottom: 2 }}>{item.range}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: dim }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* eSIM */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 ASIA TRAVEL ESIM</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across Japan, Thailand, Bali, Singapore, Vietnam, India and 50+ more Asian countries</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET ASIA ESIM
          </Link>
        </div>

        {/* Related */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari' },
            { label: 'Middle East', href: '/middle-east' },
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
