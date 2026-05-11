'use client'

import { useState } from 'react'
import Link from 'next/link'

// Huuboi Luxury Palette
const gold = '#C8A96E'
const cream = '#F5F5F0'
const muted = '#A0A095'
const dim = '#60605A'

const destinations = [
  {
    slug: 'paris', name: 'Paris', country: 'France',
    tagline: 'The City of Light',
    gradient: 'linear-gradient(160deg,#0a0a15,#1a1a2e,#16213e)',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine Cruise', 'Montmartre', 'Le Marais', 'Pastries'],
    bestTime: 'Apr–Jun · Sep–Oct', duration: '3–5 nights', from: '$180',
    description: 'Paris remains the world\'s most iconic city for a reason. From the Haussmann architecture to the legendary cafés and some of the world\'s greatest art, it is the heart of European culture.',
    experiences: ['Private evening cruise on the Seine', 'Macaron masterclass in Saint-Germain-des-Prés', 'Sunrise at Trocadéro for Eiffel Tower views', 'Afternoon at the Musée d\'Orsay', 'Dinner at a Michelin-starred bistro in Le Marais'],
    hotels: ['Hôtel de Crillon', 'Le Meurice', 'Cheval Blanc Paris', 'Hôtel Plaza Athénée', 'The Ritz Paris'],
  },
  {
    slug: 'rome', name: 'Rome', country: 'Italy',
    tagline: 'The Eternal City',
    gradient: 'linear-gradient(160deg,#1a0f0a,#2d1b14,#3d2b1f)',
    highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Pantheon', 'Trastevere', 'Gelato'],
    bestTime: 'Apr–May · Sep–Oct', duration: '4–6 nights', from: '$160',
    description: 'A city that is effectively a giant open-air museum. Rome blends 2,800 years of history with a vibrant, modern energy that revolves around incredible food and the art of "la dolce vita".',
    experiences: ['Sunrise tour of the Colosseum and Forum', 'Vatican Museums & Sistine Chapel early access', 'Pasta making class with a local chef', 'Evening walk through Trastevere', 'Coffee at Sant\'Eustachio Il Caffè'],
    hotels: ['Hotel de Russie', 'Hotel Hassler', 'J.K. Place Roma', 'Hotel Eden', 'Portrait Roma'],
  },
  {
    slug: 'santorini', name: 'Santorini', country: 'Greece',
    tagline: 'Aegean Luxury & Sunsets',
    gradient: 'linear-gradient(160deg,#001f3f,#003366,#004080)',
    highlights: ['Oia Sunset', 'Blue Domes', 'Caldera Views', 'Volcanic Beaches', 'Winery Tours', 'Akrotiri'],
    bestTime: 'May–Jun · Sep–Oct', duration: '3–5 nights', from: '$220',
    description: 'The crown jewel of the Cyclades. Santorini is defined by its dramatic volcanic cliffs, whitewashed villages, and sunsets that draw travellers from every corner of the globe.',
    experiences: ['Catamaran cruise around the Caldera', 'Wine tasting in Pyrgos at sunset', 'Hiking from Fira to Oia (3 hours)', 'Private dinner overlooking the Aegean', 'Exploring the ancient ruins of Akrotiri'],
    hotels: ['Grace Hotel', 'Canaves Oia Epitome', 'Katikies Santorini', 'Andronis Luxury Suites'],
  },
  {
    slug: 'iceland', name: 'Iceland', country: 'Iceland',
    tagline: 'Fire, Ice and the Northern Lights',
    gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)',
    highlights: ['Northern Lights', 'Golden Circle', 'Blue Lagoon', 'Vatnajökull Glacier', 'Midnight Sun', 'Ice Caves'],
    bestTime: 'Jun–Aug (Midnight Sun) · Sep–Mar (Aurora)', duration: '6–9 nights', from: '$340',
    description: 'Iceland is one of the world\'s most extreme and spectacular destinations — a living geological laboratory where geysers erupt, glaciers calve into black sand beaches, and the sky turns green with the Northern Lights.',
    experiences: ['Northern Lights hunting (Sep–Mar)', 'Golden Circle — Geysir, Gullfoss, Þingvellir', 'Ice cave expedition inside Vatnajökull', 'Blue Lagoon geothermal spa', 'Snorkelling in Silfra fissure', 'Midnight Sun coastal drive in June'],
    hotels: ['ION Adventure Hotel', 'Deplar Farm', '101 Hotel Reykjavik', 'Fosshotel Glacier Lagoon', 'Hotel Rangá'],
  },
  {
    slug: 'swiss-alps', name: 'Swiss Alps', country: 'Switzerland',
    tagline: 'The Roof of Europe',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['Matterhorn', 'Jungfraujoch', 'Zermatt', 'Interlaken', 'Lake Geneva', 'Alpine Villages'],
    bestTime: 'Dec–Mar (Skiing) · Jun–Sep (Hiking)', duration: '5–8 nights', from: '$420',
    description: 'The Swiss Alps are the benchmark by which all mountain destinations are measured — the Matterhorn\'s peak, the Jungfrau railway, and picture-perfect villages unchanged for centuries.',
    experiences: ['Jungfraujoch — the "Top of Europe"', 'Matterhorn view from car-free Zermatt', 'Paragliding over Interlaken Valley', 'St. Moritz or Verbier for world-class skiing', 'Glacier Express scenic train journey'],
    hotels: ['The Alpina Gstaad', 'Badrutt\'s Palace St. Moritz', 'Grand Hotel Zermatterhof', 'Victoria-Jungfrau Grand Hotel'],
  },
  {
    slug: 'lisbon', name: 'Lisbon & Porto', country: 'Portugal',
    tagline: 'Europe\'s Most Soulful Cities',
    gradient: 'linear-gradient(160deg,#1c0e00,#2e1800,#402200)',
    highlights: ['Alfama District', 'Tram 28', 'Fado Music', 'Belém Tower', 'Douro Valley Wine', 'Pastéis de Nata'],
    bestTime: 'Mar–Jun · Sep–Oct', duration: '5–7 nights', from: '$140',
    description: 'Lisbon and Porto are two of Europe\'s most beautiful and underrated cities — fado-haunted Alfama, azulejo-tiled façades, and a melancholy beauty that gets under your skin.',
    experiences: ['Tram 28 through Alfama at golden hour', 'Fado music at a traditional adega', 'Pastéis de Nata at Pastéis de Belém', 'Port wine tasting in Vila Nova de Gaia', 'Douro Valley wine country day trip'],
    hotels: ['Bairro Alto Hotel Lisbon', 'Verride Palácio Santa Catarina', 'The Yeatman Porto', 'Torel Palace Porto'],
  },
]

const europeTypes = [
  { icon: '🎨', title: 'Art & Culture', desc: 'The Louvre, Uffizi, Prado, Rijksmuseum — Europe holds more of the world\'s great art than anywhere else on earth.' },
  { icon: '🍷', title: 'Food & Wine', desc: 'French haute cuisine, Italian pasta, Spanish tapas, Portuguese wine — world-celebrated culinary culture.' },
  { icon: '🏰', title: 'History & Architecture', desc: 'From Roman amphitheatres to medieval castles to baroque palaces — heritage spanning 3,000 years.' },
  { icon: '🏖', title: 'Mediterranean Beaches', desc: 'Santorini, Amalfi, Dubrovnik, Mallorca — the perfect combination of beauty, culture and sun.' },
  { icon: '⛷', title: 'Alpine Adventures', desc: 'The Swiss Alps, French Alps and Dolomites offer the world\'s finest skiing, hiking and mountain scenery.' },
  { icon: '🚂', title: 'Rail Journeys', desc: 'The Glacier Express, Orient Express, and Eurostar make city-hopping across the continent effortless.' },
]

const multiCityRoutes = [
  { title: 'Classic Grand Tour', days: '14 days', cities: 'London → Paris → Rome → Venice → Barcelona', desc: 'The original European experience by train and flight.' },
  { title: 'Mediterranean Summer', days: '12 days', cities: 'Athens → Santorini → Mykonos → Dubrovnik → Split', desc: 'Island hopping and coastal beauty across the Eastern Med.' },
  { title: 'Nordic Explorer', days: '10 days', cities: 'Copenhagen → Bergen → Flåm → Oslo → Stockholm', desc: 'Fjords, design, and hygge across Scandinavia.' },
  { title: 'Iberian Peninsula', days: '10 days', cities: 'Madrid → Seville → Córdoba → Lisbon → Porto', desc: 'Moorish palaces and extraordinary food from Spain to Portugal.' },
]

export default function EuropePage() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080810,#0e0818,#100a08)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(123,167,188,0.08) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            EUROPE
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            Explore <em style={{ color: gold }}>Europe</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            Plan and book your trip seamlessly with <Link href="https://huuboi.com" style={{ color: gold, textDecoration: 'none' }}>Huuboi.com</Link>. Discover the continent that gave the world art, architecture, and cuisine. Fifty countries, a thousand languages, and history that never gets old.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/flights" target="_blank"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              ✈ SEARCH FLIGHTS
            </Link>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              AI TRIP PLANNER
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: '12', label: 'Top Cities' },
            { num: '50', label: 'Countries' },
            { num: '500+', label: 'UNESCO Sites' },
            { num: '26', label: 'Schengen Area' },
            { num: '6', label: 'Culinary Capitals' },
          ].map(s => (
            <div key={s.num} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(200,169,110,0.15)', marginBottom: 48, overflowX: 'auto' }}>
          {[
            { key: 'destinations', label: 'Destinations' },
            { key: 'experiences', label: 'Experiences' },
            { key: 'guide', label: 'Planning Guide' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '14px 24px', background: 'none', border: 'none', color: activeTab === tab.key ? gold : muted, borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── DESTINATIONS TAB ── */}
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
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: gold }}>{selectedDest?.slug === dest.slug ? 'CLOSE ↑' : 'SEE DETAILS ↓'}</div>
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
                      <Link href="/flights" target="_blank" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none' }}>✈ BOOK FLIGHT</Link>
                      <Link href="/hotels" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px 24px', textDecoration: 'none' }}>BOOK HOTEL</Link>
                      <Link href="/cars" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '12px 24px', textDecoration: 'none' }}>RENT CAR</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── EXPERIENCES TAB ── */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Europe <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                Europe rewards the traveller who goes beyond the headline attractions. Plan your perfect route on <Link href="https://huuboi.com" style={{ color: gold, textDecoration: 'none' }}>huuboi.com</Link>.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {europeTypes.map(type => (
                <div key={type.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{type.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{type.title}</h3>
                  <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{type.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>POPULAR MULTI-CITY ROUTES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
                {multiCityRoutes.map(route => (
                  <div key={route.title} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.08)', padding: '24px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: cream, fontWeight: 600 }}>{route.title}</h3>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', color: gold, border: '1px solid rgba(200,169,110,0.25)', padding: '3px 10px' }}>{route.days}</span>
                    </div>
                    <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: gold, marginBottom: 10 }}>{route.cities}</p>
                    <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.65 }}>{route.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PLANNING GUIDE TAB ── */}
        {activeTab === 'guide' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Planning Your <em style={{ color: gold }}>Europe Trip</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>SCHENGEN VISA & LOGISTICS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>WHAT IS SCHENGEN?</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7 }}>26 countries with one visa. France, Italy, Spain, and more. Check <Link href="/visa-requirements" style={{ color: gold }}>visa requirements</Link> on our site before booking.</p>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>GETTING AROUND</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7 }}>High-speed rail (Eurostar, TGV) is often faster than flying. Use our <Link href="/ai-planner" style={{ color: gold }}>AI Planner</Link> to optimize your route.</p>
                  </div>
                </div>
              </div>

              {/* Budget grid */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>DAILY BUDGET ESTIMATES</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Switzerland', range: '€150–350/day' },
                    { dest: 'London', range: '£100–250/day' },
                    { dest: 'Paris / Rome', range: '€80–200/day' },
                    { dest: 'Prague / Krakow', range: '€40–100/day' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600 }}>{item.range}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Travel Tools Strip */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 CONNECTIVITY & PROTECTION</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get your Europe eSIM and <Link href="/travel-insurance" style={{ color: gold, textDecoration: 'none' }}>Travel Insurance</Link> directly on Huuboi.</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none' }}>
            GET EUROPE ESIM
          </Link>
        </div>

        {/* Footer Related Links */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari' },
            { label: 'Middle East', href: '/middle-east' },
            { label: 'Asia & Far East', href: '/asia' },
            { label: 'Visa Requirements', href: '/visa-requirements' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>{link.label} →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}