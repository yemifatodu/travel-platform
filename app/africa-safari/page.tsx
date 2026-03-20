'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const safariDestinations = [
  {
    slug: 'serengeti',
    name: 'Serengeti',
    country: 'Tanzania',
    tagline: 'The Greatest Wildlife Show on Earth',
    gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)',
    highlights: ['Great Migration', 'Big Five', 'Luxury Tented Camps', 'Balloon Safaris'],
    bestTime: 'Jul–Oct (Migration) · Jan–Feb (Calving)',
    duration: '5–10 nights',
    from: '$3,200',
    description: 'Two million wildebeest, 500,000 zebra, and the world\'s highest concentration of predators. The Serengeti is the benchmark by which all other safari destinations are measured.',
    experiences: ['Great Wildebeest Migration river crossings', 'Hot air balloon safari at sunrise', 'Walking safari with armed rangers', 'Night game drives by spotlight', 'Luxury glamping under the stars'],
    camps: ['Singita Grumeti', '&Beyond Klein\'s Camp', 'Four Seasons Serengeti', 'Sayari Camp', 'Nomad Lamai'],
  },
  {
    slug: 'masai-mara',
    name: 'Masai Mara',
    country: 'Kenya',
    tagline: 'Kenya\'s Crown Jewel of Wildlife',
    gradient: 'linear-gradient(160deg,#180e00,#2a1800,#3c2200)',
    highlights: ['Big Five', 'Mara River Crossings', 'Masai Culture', 'Year-Round Wildlife'],
    bestTime: 'Jul–Oct (Crossings) · Jan–Mar (Predators)',
    duration: '4–8 nights',
    from: '$2,800',
    description: 'The Mara River crossings — where hundreds of thousands of wildebeest hurl themselves into crocodile-infested water — are among the most spectacular events in the natural world.',
    experiences: ['Mara River wildebeest crossings', 'Big Five game drives', 'Masai village and culture visit', 'Bush breakfast in the savannah', 'Hot air balloon over the plains'],
    camps: ['Mahali Mzuri (Virgin)', 'Governors\' Camp', 'Angama Mara', 'andBeyond Bateleur', 'Cottar\'s 1920s Camp'],
  },
  {
    slug: 'okavango',
    name: 'Okavango Delta',
    country: 'Botswana',
    tagline: 'The World\'s Largest Inland Delta',
    gradient: 'linear-gradient(160deg,#001c10,#002c1a,#003c22)',
    highlights: ['Mokoro Canoe Safaris', 'Walking Safaris', 'Wild Dogs', 'Fly-In Luxury'],
    bestTime: 'May–Oct (Dry Season)',
    duration: '5–8 nights',
    from: '$4,200',
    description: 'A UNESCO World Heritage Site unlike any other — a vast inland delta where the Okavango River fans out into a labyrinth of lagoons, channels and islands teeming with wildlife.',
    experiences: ['Mokoro (dugout canoe) through papyrus channels', 'Walking safari on dry-season islands', 'Fly-in camp transfers by light aircraft', 'Wild dog pack tracking', 'Elephant herds at sunset waterholes'],
    camps: ['andBeyond Xaranna', 'Wilderness Vumbura Plains', 'Mombo Camp', 'Duba Plains', 'Belmond Eagle Island Lodge'],
  },
  {
    slug: 'kruger',
    name: 'Kruger National Park',
    country: 'South Africa',
    tagline: 'Africa\'s Most Accessible Safari',
    gradient: 'linear-gradient(160deg,#180e00,#2a1800,#3c2200)',
    highlights: ['Big Five', 'Self-Drive Safari', 'Private Concessions', 'Combine with Cape Town'],
    bestTime: 'May–Sep (Dry Season)',
    duration: '4–7 nights',
    from: '$1,400',
    description: 'Nearly 2 million hectares of pristine African bush, home to the Big Five and over 500 bird species. Kruger offers an unmatched range — from budget camping to ultra-luxury private reserves.',
    experiences: ['Self-drive game viewing on 2,600km of roads', 'Big Five tracking on private reserves', 'Night drives and bush walks', 'Combine with Cape Town and the Winelands', 'Leopard sightings in the south'],
    camps: ['Singita Sabi Sand', 'Lion Sands Ivory Lodge', 'Londolozi Tree Camp', '&Beyond Kirkman\'s Kamp', 'Inyati Game Lodge'],
  },
  {
    slug: 'ngorongoro',
    name: 'Ngorongoro Crater',
    country: 'Tanzania',
    tagline: 'The Natural Wonder That Holds a World',
    gradient: 'linear-gradient(160deg,#0e1400,#182000,#222c00)',
    highlights: ['Black Rhino', 'Big Five Density', 'Crater Floor Drive', 'Masai Heritage'],
    bestTime: 'Year-Round · Jun–Sep Best',
    duration: '2–4 nights',
    from: '$1,800',
    description: 'A 600-metre-deep volcanic caldera sheltering the world\'s highest density of predators. Some 25,000 large animals live permanently on the crater floor — including one of Africa\'s last black rhino populations.',
    experiences: ['Full-day crater floor game drive', 'Black rhino tracking on foot', 'Picnic breakfast at the hippo pool', 'Masai village visit on the crater rim', 'Sunset sundowners on the crater rim'],
    camps: ['andBeyond Ngorongoro Crater Lodge', 'The Manor at Ngorongoro', 'Ngorongoro Serena Lodge', 'Entamanu Ngorongoro'],
  },
  {
    slug: 'rwanda-gorillas',
    name: 'Rwanda Gorillas',
    country: 'Rwanda',
    tagline: 'Face to Face with Mountain Gorillas',
    gradient: 'linear-gradient(160deg,#001800,#002800,#003800)',
    highlights: ['Mountain Gorilla Trekking', 'Golden Monkey Trek', 'Volcano Hikes', 'Conservation'],
    bestTime: 'Jun–Sep & Dec–Feb (Dry Seasons)',
    duration: '3–5 nights',
    from: '$3,600',
    description: 'Spending one hour with a mountain gorilla family in their natural forest habitat is one of the most profound wildlife encounters on earth. Rwanda\'s Volcanoes National Park is the world\'s best place to do it.',
    experiences: ['Mountain gorilla trekking permit ($1,500)', 'Golden monkey tracking in bamboo forest', 'Twin Lakes and Musanze Caves', 'Kigali Genocide Memorial — deeply moving', 'Dian Fossey Research Centre visit'],
    camps: ['One&Only Gorilla\'s Nest', 'Bisate Lodge', 'Virunga Lodge', 'Sabyinyo Silverback Lodge'],
  },
  {
    slug: 'zanzibar',
    name: 'Zanzibar',
    country: 'Tanzania',
    tagline: 'Spice Islands, White Sand & Turquoise Seas',
    gradient: 'linear-gradient(160deg,#001a12,#002d1e,#00402a)',
    highlights: ['White Sand Beaches', 'Stone Town UNESCO', 'Diving & Snorkelling', 'Spice Tours'],
    bestTime: 'Jun–Oct & Dec–Feb',
    duration: '5–8 nights',
    from: '$1,400',
    description: 'The perfect safari extension — trade the dust and drama of the savannah for powder-white beaches, warm Indian Ocean water and the maze of centuries-old Stone Town.',
    experiences: ['Snorkelling with sea turtles at Mnemba Atoll', 'Spice tour through vanilla and clove plantations', 'Sunset dhow cruise', 'Stone Town UNESCO old town walking tour', 'Dolphin swimming at Kizimkazi'],
    camps: ['The Residence Zanzibar', 'Zuri Zanzibar', 'Mnemba Island Lodge', '&Beyond Mnemba Island', 'Park Hyatt Zanzibar'],
  },
  {
    slug: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    tagline: 'Where Mountains, Vineyards & Ocean Collide',
    gradient: 'linear-gradient(160deg,#001018,#001c2d,#002840)',
    highlights: ['Table Mountain', 'Winelands', 'Boulders Beach Penguins', 'Cape Peninsula'],
    bestTime: 'Oct–Apr (Summer)',
    duration: '5–8 nights',
    from: '$1,800',
    description: 'Consistently voted the world\'s most beautiful city — for good reason. Cape Town combines dramatic mountain scenery, world-class beaches, superb cuisine and the world\'s finest wine region within an hour\'s drive.',
    experiences: ['Table Mountain cable car or hike', 'Cape Peninsula drive to Cape Point', 'Boulders Beach African penguin colony', 'Stellenbosch and Franschhoek wine tasting', 'V&A Waterfront and Kalk Bay seafood'],
    camps: ['The Silo Hotel', 'Ellerman House', 'Cape Grace', 'Belmond Mount Nelson', 'Twelve Apostles Hotel'],
  },
]

const africaRegions = ['All', 'East Africa', 'Southern Africa', 'West Africa', 'North Africa']

const regionMap: Record<string, string> = {
  'serengeti': 'East Africa',
  'masai-mara': 'East Africa',
  'okavango': 'Southern Africa',
  'kruger': 'Southern Africa',
  'ngorongoro': 'East Africa',
  'rwanda-gorillas': 'East Africa',
  'zanzibar': 'East Africa',
  'cape-town': 'Southern Africa',
}

const safariTypes = [
  { icon: '🦁', title: 'Classic Big Five Safari', desc: 'Lion, leopard, elephant, buffalo and rhino — the iconic African wildlife experience. Kenya and Tanzania are the benchmarks.' },
  { icon: '🦍', title: 'Gorilla Trekking', desc: 'A one-hour encounter with mountain gorilla families in Rwanda or Uganda. Transformative, limited-permit access.' },
  { icon: '🚁', title: 'Fly-In Luxury Safari', desc: 'Access remote wilderness by light aircraft. Botswana\'s Okavango Delta and Zambia\'s Luangwa Valley are accessed this way.' },
  { icon: '🛶', title: 'Water Safari', desc: 'Mokoro canoes through the Okavango Delta or boat safari on the Chobe River — wildlife viewing from the water.' },
  { icon: '🚶', title: 'Walking Safari', desc: 'Track animals on foot with armed rangers. The most intimate and thrilling way to experience the bush.' },
  { icon: '🎈', title: 'Hot Air Balloon', desc: 'Drift over the Serengeti or Masai Mara at dawn — a bird\'s eye view of the savannah and the migration below.' },
]

const packingList = [
  { category: 'Clothing', items: ['Neutral colours — khaki, olive, beige, brown', 'Lightweight long sleeves (sun and insects)', 'Fleece or light down jacket (cold mornings)', 'Waterproof jacket', 'Comfortable walking shoes', 'Sandals for camp'] },
  { category: 'Equipment', items: ['Binoculars (8x42 minimum)', 'Camera with zoom lens (200mm+)', 'Power bank and universal adaptors', 'Head torch', 'Dry bag for electronics'] },
  { category: 'Health & Safety', items: ['Malaria prophylaxis (consult your doctor)', 'DEET insect repellent', 'Sun cream SPF 50+', 'Antihistamines', 'Basic first aid kit', 'Water purification tablets'] },
  { category: 'Documents', items: ['Yellow fever vaccination certificate', 'Passport valid 6+ months', 'Travel insurance documents', 'Safari booking confirmations', 'USD cash for tips ($10–15/guide/day)'] },
]

export default function AfricaSafari() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [selectedDest, setSelectedDest] = useState<typeof safariDestinations[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'types' | 'guide'>('destinations')

  const filtered = safariDestinations.filter(d =>
    activeRegion === 'All' || regionMap[d.slug] === activeRegion
  )

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0800,#1a1000,#0d1400)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(200,169,110,0.07) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            AFRICA & SAFARI
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            Africa &<br /><em style={{ color: gold }}>Safari</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            The last great wilderness. From the Serengeti plains to the Okavango Delta, from Gorilla treks in Rwanda to Cape Town's ocean shores — Africa is unlike anywhere else on earth.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://www.aviasales.com/?marker=710879&locale=en" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              ✈ SEARCH AFRICA FLIGHTS
            </a>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              PLAN MY SAFARI
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: '54', label: 'Countries' },
            { num: '8', label: 'Safari Regions' },
            { num: '1.5M+', label: 'Wildebeest' },
            { num: '700+', label: 'Mountain Gorillas' },
            { num: '3,000+', label: 'Mammal Species' },
          ].map(s => (
            <div key={s.num} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(200,169,110,0.15)', marginBottom: 48 }}>
          {[
            { key: 'destinations', label: 'Safari Destinations' },
            { key: 'types', label: 'Safari Types' },
            { key: 'guide', label: 'Planning Guide' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '14px 24px', background: 'none', border: 'none', color: activeTab === tab.key ? gold : muted, borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent', cursor: 'pointer', position: 'relative', top: 1, transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── DESTINATIONS TAB ── */}
        {activeTab === 'destinations' && (
          <>
            {/* Region filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
              {africaRegions.map(r => (
                <button key={r} onClick={() => setActiveRegion(r)}
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', padding: '8px 18px', background: activeRegion === r ? gold : 'transparent', border: `1px solid ${activeRegion === r ? gold : 'rgba(200,169,110,0.2)'}`, color: activeRegion === r ? '#080807' : muted, cursor: 'pointer', transition: 'all 0.2s' }}>
                  {r}
                </button>
              ))}
            </div>

            {/* Destination Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 2, marginBottom: 16 }}>
              {filtered.map(dest => (
                <div key={dest.slug}
                  onClick={() => setSelectedDest(selectedDest?.slug === dest.slug ? null : dest)}
                  style={{ background: '#111110', border: `1px solid ${selectedDest?.slug === dest.slug ? gold : 'rgba(200,169,110,0.1)'}`, cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.2s' }}>

                  {/* Banner */}
                  <div style={{ background: dest.gradient, height: 140, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.75) 0%,transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold }}>{regionMap[dest.slug]} · {dest.country}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '22px 22px 24px' }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', fontWeight: 300, color: cream, marginBottom: 4, lineHeight: 1 }}>{dest.name}</h3>
                    <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: gold, marginBottom: 12 }}>{dest.tagline}</p>
                    <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 16 }}>{dest.description}</p>

                    {/* Highlights */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                      {dest.highlights.map(h => (
                        <span key={h} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: gold, padding: '3px 10px' }}>{h}</span>
                      ))}
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 16 }}>
                      {[
                        { label: 'BEST TIME', value: dest.bestTime },
                        { label: 'STAY', value: dest.duration },
                        { label: 'FROM', value: dest.from },
                      ].map(s => (
                        <div key={s.label} style={{ background: '#1C1B18', padding: '10px 12px' }}>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', color: dim, marginBottom: 3 }}>{s.label}</div>
                          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.9rem', color: s.label === 'FROM' ? gold : cream, fontWeight: 600 }}>{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: selectedDest?.slug === dest.slug ? muted : gold }}>
                      {selectedDest?.slug === dest.slug ? 'CLICK TO CLOSE ↑' : 'SEE DETAILS ↓'}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {selectedDest?.slug === dest.slug && (
                    <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', padding: '24px 22px 28px' }}>
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
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>TOP CAMPS & LODGES</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {dest.camps.map((camp, i) => (
                              <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6 }}>
                                {camp}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <a href="https://www.aviasales.com/?marker=710879&locale=en" target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
                          ✈ SEARCH FLIGHTS
                        </a>
                        <Link href="/ai-planner"
                          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
                          PLAN THIS TRIP
                        </Link>
                        <Link href="/budget-calculator"
                          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
                          ESTIMATE BUDGET
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── SAFARI TYPES TAB ── */}
        {activeTab === 'types' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Choose Your <em style={{ color: gold }}>Safari Style</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                No two safaris are alike. Whether you want to drift over the plains in a hot air balloon or track gorillas on foot through rainforest — Africa offers experiences that suit every traveller and budget.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {safariTypes.map(type => (
                <div key={type.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{type.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{type.title}</h3>
                  <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{type.desc}</p>
                </div>
              ))}
            </div>

            {/* Safari Season Calendar */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 32 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>AFRICA SAFARI SEASON CALENDAR</div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'Jan – Feb', event: 'Wildebeest calving season — Southern Serengeti. Thousands of calves born daily, predators at peak activity.', level: 'Excellent', color: '#4ade80' },
                  { period: 'Mar – May', event: 'Long rains in East Africa. Lush scenery, excellent for photography. Fewer tourists, lower prices.', level: 'Good', color: '#fbbf24' },
                  { period: 'Jun – Jul', event: 'Migration moves north into Masai Mara. Dry season begins — best game viewing in Southern Africa.', level: 'Peak', color: '#f87171' },
                  { period: 'Aug – Oct', event: 'Mara River crossings at their most spectacular. Peak safari season across East and Southern Africa.', level: 'Peak', color: '#f87171' },
                  { period: 'Nov – Dec', event: 'Short rains. Migration turns south. Green season with excellent bird watching and lower rates.', level: 'Good', color: '#fbbf24' },
                ].map(row => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.event}</p>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px' }}>{row.level}</span>
                    </div>
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
                Safari Planning <em style={{ color: gold }}>Guide</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                Everything you need to know before you go — from vaccinations to packing lists, tipping culture to booking timelines.
              </p>
            </div>

            {/* Timeline */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>BOOKING TIMELINE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { time: '12 Months Before', action: 'Book peak-season camps (July–October). The best Serengeti and Mara camps sell out over a year ahead.' },
                  { time: '6 Months Before', action: 'Book shoulder season safaris. Arrange gorilla trekking permits ($1,500 each — very limited). Book flights.' },
                  { time: '3 Months Before', action: 'Confirm all transfers and internal flights. Apply for visas if required (Kenya, Tanzania). Get travel insurance.' },
                  { time: '6 Weeks Before', action: 'Start malaria prophylaxis if prescribed. Yellow fever vaccination (required for most African countries). First aid kit.' },
                  { time: '2 Weeks Before', action: 'Confirm all bookings. Pack — keep luggage under 15kg for bush planes (soft bags only — no hard cases).' },
                ].map(item => (
                  <div key={item.time} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', color: gold, minWidth: 140, marginTop: 2, flexShrink: 0 }}>{item.time}</div>
                    <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{item.action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Packing List */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>SAFARI PACKING LIST</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
                {packingList.map(section => (
                  <div key={section.category}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 12 }}>{section.category}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {section.items.map((item, i) => (
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

            {/* Tipping guide */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>TIPPING GUIDE (USD)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
                {[
                  { role: 'Safari Guide', amount: '$15–25 / day' },
                  { role: 'Tracker', amount: '$10–15 / day' },
                  { role: 'Camp Staff (total)', amount: '$10–15 / day' },
                  { role: 'Lodge Manager', amount: '$5–10 / stay' },
                  { role: 'Transfer Driver', amount: '$5–10 / trip' },
                  { role: 'Gorilla Trekking Guide', amount: '$20–30 / trek' },
                ].map(tip => (
                  <div key={tip.role} style={{ background: '#1C1B18', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', color: muted }}>{tip.role}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600 }}>{tip.amount}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: dim, fontSize: '0.8rem', marginTop: 16, lineHeight: 1.6 }}>Tipping is an important part of safari income for local staff. Always tip in USD cash. Some camps include a tip kitty — check your booking details.</p>
            </div>
          </div>
        )}

        {/* eSIM strip */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 AFRICA TRAVEL ESIM</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across Africa with an instant eSIM — works in Kenya, Tanzania, South Africa, Rwanda and 50+ more</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET AFRICA ESIM
          </Link>
        </div>

        {/* Related links */}
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Travel Guides', sub: 'Kenya Safari · Morocco · Nigeria', href: '/travel-guides' },
            { label: 'Budget Calculator', sub: 'Estimate your safari cost', href: '/budget-calculator' },
            { label: 'Price Alerts', sub: 'Best time to book Africa flights', href: '/price-alerts' },
            { label: 'Map Explorer', sub: 'Find Africa on the map', href: '/map-explorer' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: gold, marginBottom: 4 }}>{link.label} →</div>
                <div style={{ color: dim, fontSize: '0.78rem' }}>{link.sub}</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

