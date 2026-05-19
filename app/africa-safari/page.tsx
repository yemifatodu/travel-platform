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
    description:
      "Two million wildebeest, 500,000 zebra, and the world's highest concentration of predators. The Serengeti is the benchmark by which all other safari destinations are measured.",
    experiences: [
      'Great Wildebeest Migration river crossings',
      'Hot air balloon safari at sunrise',
      'Walking safari with armed rangers',
      'Night game drives by spotlight',
      'Luxury glamping under the stars',
    ],
    camps: ['Singita Grumeti', "&Beyond Klein's Camp", 'Four Seasons Serengeti', 'Sayari Camp', 'Nomad Lamai'],
  },
  {
    slug: 'masai-mara',
    name: 'Masai Mara',
    country: 'Kenya',
    tagline: "Kenya's Crown Jewel of Wildlife",
    gradient: 'linear-gradient(160deg,#180e00,#2a1800,#3c2200)',
    highlights: ['Big Five', 'Mara River Crossings', 'Masai Culture', 'Year-Round Wildlife'],
    bestTime: 'Jul–Oct (Crossings) · Jan–Mar (Predators)',
    duration: '4–8 nights',
    from: '$2,800',
    description:
      'The Mara River crossings — where hundreds of thousands of wildebeest hurl themselves into crocodile-infested water — are among the most spectacular events in the natural world.',
    experiences: [
      'Mara River wildebeest crossings',
      'Big Five game drives',
      'Masai village and culture visit',
      'Bush breakfast in the savannah',
      'Hot air balloon over the plains',
    ],
    camps: ["Mahali Mzuri (Virgin)", "Governors' Camp", 'Angama Mara', '&Beyond Bateleur', "Cottar's 1920s Camp"],
  },
  {
    slug: 'okavango',
    name: 'Okavango Delta',
    country: 'Botswana',
    tagline: "The World's Largest Inland Delta",
    gradient: 'linear-gradient(160deg,#001c10,#002c1a,#003c22)',
    highlights: ['Mokoro Canoe Safaris', 'Walking Safaris', 'Wild Dogs', 'Fly-In Luxury'],
    bestTime: 'May–Oct (Dry Season)',
    duration: '5–8 nights',
    from: '$4,200',
    description:
      'A UNESCO World Heritage Site unlike any other — a vast inland delta where the Okavango River fans out into a labyrinth of lagoons, channels and islands teeming with wildlife.',
    experiences: [
      'Mokoro canoe safaris through papyrus channels',
      'Walking safaris on islands',
      'Fly-in light aircraft transfers',
      'Wild dog tracking',
      'Elephant herds at sunset waterholes',
    ],
    camps: ['andBeyond Xaranna', 'Wilderness Vumbura Plains', 'Mombo Camp', 'Duba Plains', 'Belmond Eagle Island Lodge'],
  },
  {
    slug: 'kruger',
    name: 'Kruger National Park',
    country: 'South Africa',
    tagline: 'Africa’s Most Accessible Safari',
    gradient: 'linear-gradient(160deg,#180e00,#2a1800,#3c2200)',
    highlights: ['Big Five', 'Self-Drive Safari', 'Private Concessions', 'Cape Town Add-On'],
    bestTime: 'May–Sep (Dry Season)',
    duration: '4–7 nights',
    from: '$1,400',
    description:
      'Nearly 2 million hectares of wilderness, home to Africa’s Big Five and over 500 bird species.',
    experiences: [
      'Self-drive safari routes',
      'Private reserve game drives',
      'Night drives',
      'Bush walks',
      'Leopard sightings',
    ],
    camps: ['Singita Sabi Sand', 'Lion Sands Ivory Lodge', 'Londolozi Tree Camp', "&Beyond Kirkman's Kamp", 'Inyati Game Lodge'],
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
    description:
      "A collapsed volcano hosting 25,000 animals in a self-contained ecosystem.",
    experiences: [
      'Crater floor game drives',
      'Black rhino spotting',
      'Hippo pool picnics',
      'Masai village visits',
      'Crater rim sunsets',
    ],
    camps: ['Ngorongoro Crater Lodge', 'The Manor at Ngorongoro', 'Serena Lodge', 'Entamanu Ngorongoro'],
  },
  {
    slug: 'rwanda-gorillas',
    name: 'Rwanda Gorillas',
    country: 'Rwanda',
    tagline: 'Face to Face with Mountain Gorillas',
    gradient: 'linear-gradient(160deg,#001800,#002800,#003800)',
    highlights: ['Gorilla Trekking', 'Golden Monkeys', 'Volcano Hikes', 'Conservation'],
    bestTime: 'Jun–Sep & Dec–Feb',
    duration: '3–5 nights',
    from: '$3,600',
    description:
      'One of the most powerful wildlife encounters on earth.',
    experiences: [
      'Gorilla trekking',
      'Golden monkey tracking',
      'Volcano hikes',
      'Kigali memorial',
      'Dian Fossey Centre',
    ],
    camps: ['One&Only Gorilla’s Nest', 'Bisate Lodge', 'Virunga Lodge', 'Sabyinyo Lodge'],
  },
  {
    slug: 'zanzibar',
    name: 'Zanzibar',
    country: 'Tanzania',
    tagline: 'Spice Islands & White Sand Beaches',
    gradient: 'linear-gradient(160deg,#001a12,#002d1e,#00402a)',
    highlights: ['Beaches', 'Stone Town', 'Diving', 'Spice Tours'],
    bestTime: 'Jun–Oct & Dec–Feb',
    duration: '5–8 nights',
    from: '$1,400',
    description:
      'A perfect safari extension into the Indian Ocean.',
    experiences: [
      'Mnemba snorkeling',
      'Spice farm tours',
      'Dhow sunset cruises',
      'Stone Town walks',
      'Dolphin trips',
    ],
    camps: ['The Residence', 'Zuri Zanzibar', 'Mnemba Island Lodge', '&Beyond Mnemba', 'Park Hyatt Zanzibar'],
  },
  {
    slug: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    tagline: 'Where Mountains Meet Ocean',
    gradient: 'linear-gradient(160deg,#001018,#001c2d,#002840)',
    highlights: ['Table Mountain', 'Winelands', 'Penguins', 'Cape Point'],
    bestTime: 'Oct–Apr',
    duration: '5–8 nights',
    from: '$1,800',
    description:
      'One of the most beautiful cities in the world.',
    experiences: [
      'Table Mountain hike',
      'Cape Point drive',
      'Penguin colony',
      'Wine tasting',
      'Waterfront dining',
    ],
    camps: ['The Silo Hotel', 'Ellerman House', 'Cape Grace', 'Mount Nelson', '12 Apostles Hotel'],
  },
]

const regionKeys = ['All', 'East Africa', 'Southern Africa', 'West Africa', 'North Africa']
const regionMap: Record<string, string> = {
  serengeti: 'East Africa',
  'masai-mara': 'East Africa',
  okavango: 'Southern Africa',
  kruger: 'Southern Africa',
  ngorongoro: 'East Africa',
  'rwanda-gorillas': 'East Africa',
  zanzibar: 'East Africa',
  'cape-town': 'Southern Africa',
}

const safariTypes = [
  { icon: '🦁', title: 'Big Five Safari', desc: 'Lion, leopard, elephant, buffalo, rhino — the ultimate safari goal. Best in Serengeti, Masai Mara, Kruger.' },
  { icon: '🦍', title: 'Gorilla Trekking', desc: 'Face-to-face with mountain gorillas in Rwanda or Uganda. Permit required — book months ahead.' },
  { icon: '🚁', title: 'Fly-In Safari', desc: 'Light aircraft transfers to remote luxury camps. Time-efficient and unforgettable views.' },
  { icon: '🛶', title: 'Water Safari', desc: 'Mokoro canoes in Okavango, boat safaris in Chobe, river cruises in Zambezi.' },
  { icon: '🚶', title: 'Walking Safari', desc: 'Track wildlife on foot with armed guides. Intimate and educational bush experience.' },
  { icon: '🎈', title: 'Hot Air Balloon', desc: 'Sunrise over the Serengeti or Masai Mara — champagne breakfast in the bush.' },
]

const planningTips = [
  { icon: '🦟', tip: 'Malaria is present in most safari regions. Take prophylaxis, use repellent, sleep under nets. Consult a travel clinic 6–8 weeks before departure.' },
  { icon: '💉', tip: 'Yellow fever vaccination required if traveling from endemic countries. Hepatitis A, Typhoid, and Tetanus recommended for all travelers.' },
  { icon: '📷', tip: 'Camera with 200–400mm zoom lens essential. Bring spare batteries and memory cards — charging may be limited in camps.' },
  { icon: '🧥', tip: 'Pack neutral colors (khaki, olive, beige). Mornings and evenings can be cold on open vehicles — warm jacket needed even in summer.' },
  { icon: '💵', tip: 'Tipping is customary: $10–20 per day for guides, $5–10 for camp staff. Carry small USD bills for tips and incidentals.' },
  { icon: '📱', tip: 'Mobile coverage exists in most camps but slow. Download offline maps. eSIM works well in South Africa, Kenya, Tanzania, Rwanda.' },
]

export default function AfricaSafariPage() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedDest, setSelectedDest] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'types' | 'guide'>('destinations')

  const filtered = safariDestinations.filter(
    (d) => selectedRegion === 'All' || regionMap[d.slug] === selectedRegion
  )

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg,#0a0800,#0e1008,#080a05)',
        borderBottom: '1px solid rgba(200,169,110,0.12)',
        padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 40% 50%, rgba(200,169,110,0.08) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block', marginRight: 12 }} />
            AFRICA SAFARI
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            Africa <em style={{ color: gold }}>Safari</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            The world's greatest wildlife destinations — from the Great Migration in the Serengeti to gorilla trekking in Rwanda and the Okavango Delta's watery wilderness.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none' }}>
              ✈ SEARCH AFRICA FLIGHTS
            </a>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none' }}>
              PLAN MY SAFARI
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: '8', label: 'Featured Destinations' },
            { num: '10+', label: 'Countries' },
            { num: '12', label: 'UNESCO Sites' },
            { num: '30%', label: "World's Wildlife" },
            { num: '#1', label: 'Safari Capital' },
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
            { key: 'types', label: 'Safari Types' },
            { key: 'guide', label: 'Planning Guide' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '14px 24px', background: 'none', border: 'none', color: activeTab === tab.key ? gold : muted, borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Region Filter - only show on Destinations tab */}
        {activeTab === 'destinations' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 32, background: '#111110', border: '1px solid rgba(200,169,110,0.1)' }}>
            {regionKeys.map(region => (
              <button key={region} onClick={() => setSelectedRegion(region)}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', background: selectedRegion === region ? gold : 'transparent', color: selectedRegion === region ? '#080807' : muted, border: 'none', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s' }}>
                {region}
              </button>
            ))}
          </div>
        )}

        {/* DESTINATIONS TAB */}
        {activeTab === 'destinations' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 2 }}>
            {filtered.map(dest => (
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
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>TOP CAMPS & LODGES</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {dest.camps.map((camp, i) => (
                            <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6 }}>{camp}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <a href="/" target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none' }}>
                        ✈ SEARCH FLIGHTS
                      </a>
                      <Link href="/ai-planner"
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px 24px', textDecoration: 'none' }}>
                        PLAN THIS SAFARI
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

        {/* SAFARI TYPES TAB */}
        {activeTab === 'types' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Safari <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                From classic game drives to intimate walking safaris and gorilla trekking — Africa offers wildlife encounters you won't find anywhere else.
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
          </div>
        )}

        {/* PLANNING GUIDE TAB */}
        {activeTab === 'guide' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Planning Your <em style={{ color: gold }}>African Safari</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>PRACTICAL TIPS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {planningTips.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                      <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>BUDGET GUIDE (PER PERSON / DAY)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Budget Safari', range: '$150–250/day', note: 'Camping, group tours' },
                    { dest: 'Mid-Range', range: '$300–600/day', note: 'Comfortable lodges, private vehicle' },
                    { dest: 'Luxury Safari', range: '$700–1,500/day', note: 'High-end camps, fly-in' },
                    { dest: 'Premium (eg. Singita)', range: '$2,000+/day', note: 'Ultra-luxury, all-inclusive' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600, marginBottom: 2 }}>{item.range}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: dim }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>WHEN TO GO</div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {[
                    { period: 'Jul–Oct', desc: 'Great Migration river crossings in Serengeti/Masai Mara. Peak season — book 9–12 months ahead.', level: 'Peak Migration' },
                    { period: 'Jun–Sep', desc: 'Dry season — best wildlife viewing across Southern & East Africa. Cooler temperatures.', level: 'Dry Season' },
                    { period: 'Dec–Mar', desc: 'Calving season in Serengeti. Green season in Southern Africa — lush landscapes, lower rates.', level: 'Calving / Green' },
                    { period: 'May & Nov', desc: 'Shoulder months — good wildlife, fewer crowds, lower prices.', level: 'Shoulder' },
                  ].map(row => (
                    <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 110px', gap: 16, alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                      <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', color: gold, border: `1px solid ${gold}40`, padding: '3px 10px', textAlign: 'center' }}>{row.level}</span>
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
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 AFRICA TRAVEL ESIM</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across South Africa, Kenya, Tanzania, Rwanda, Ghana, Nigeria and 20+ more African countries</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET AFRICA ESIM
          </Link>
        </div>

        {/* Related Destinations */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Middle East', href: '/middle-east' },
            { label: 'Europe', href: '/europe' },
            { label: 'Asia & Far East', href: '/asia' },
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