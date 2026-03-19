'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const destinations = [
  {
    slug: 'paris', name: 'Paris', country: 'France',
    tagline: 'The City That Invented Romance',
    gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)',
    highlights: ['Eiffel Tower', 'Louvre', 'Montmartre', 'Seine River', 'Versailles', 'Le Marais'],
    bestTime: 'Apr–Jun · Sep–Oct', duration: '4–7 nights', from: '$180',
    description: 'Paris is the city that invented the idea of the city as an art form. Every arrondissement a different world. Every café terrace a stage. Every meal a statement of civilisation. No city has been more written about or more deserving of every word.',
    experiences: ['Eiffel Tower at opening — before the queues', 'Louvre Museum — book online, allow 3 hours minimum', 'Morning croissant at a neighbourhood boulangerie in Le Marais', 'Sunset apéritif on the Seine riverbank', 'Musée d\'Orsay for Impressionism — one of the world\'s great collections', 'Day trip to Versailles Palace and gardens (45 min by RER)', 'Evening walk from Notre-Dame across Île Saint-Louis'],
    hotels: ['Hôtel de Crillon', 'Le Bristol Paris', 'Hôtel Costes', 'La Réserve Paris', 'Pavillon de la Reine Le Marais'],
  },
  {
    slug: 'rome', name: 'Rome', country: 'Italy',
    tagline: 'The Eternal City',
    gradient: 'linear-gradient(160deg,#1a0800,#2c1200,#401c00)',
    highlights: ['Colosseum', 'Vatican', 'Trevi Fountain', 'Pantheon', 'Trastevere', 'Borghese Gallery'],
    bestTime: 'Apr–May · Sep–Oct', duration: '4–6 nights', from: '$200',
    description: 'Rome is the world in miniature — every street a layer of history, every piazza a theatre, every meal a celebration. The sheer density of extraordinary things is overwhelming. Three days barely scratches the surface.',
    experiences: ['Colosseum and Roman Forum at opening — arrive before 9am', 'Vatican Museums and Sistine Chapel — book tickets weeks ahead', 'Gelato at night at Giolitti or Della Palma', 'Borghese Gallery — one of the world\'s finest art collections (booking essential)', 'Trastevere evening walk and dinner', 'Sunrise at Trevi Fountain — before the crowds arrive at 7am', 'Day trip to Pompeii or Ostia Antica'],
    hotels: ['Hotel Eden', 'J.K. Place Roma', 'Hotel de Russie', 'Villa Spalletti Trivelli', 'Palazzo Manfredi'],
  },
  {
    slug: 'amalfi', name: 'Amalfi Coast', country: 'Italy',
    tagline: 'Cliffside Villages Above Azure Seas',
    gradient: 'linear-gradient(160deg,#001428,#002040,#002c58)',
    highlights: ['Positano', 'Ravello', 'Capri Island', 'Boat to Grotta Azzurra', 'Limoncello', 'Path of the Gods'],
    bestTime: 'May–Jun · Sep–Oct', duration: '5–8 nights', from: '$380',
    description: 'The Amalfi Coast is one of Europe\'s most spectacular stretches of coastline — vertical cliffs plunging into the Tyrrhenian Sea, pastel-painted villages clinging impossibly to the rock face, and a way of life that has barely changed in centuries.',
    experiences: ['Drive the Amalfi Coast road — terrifying, exhilarating, unmissable', 'Boat trip to Capri and the Grotta Azzurra (Blue Grotto)', 'Path of the Gods hike from Agerola to Positano', 'Ravello gardens and classical music concert', 'Private boat hire for the day along the coast', 'Limoncello tasting at a family distillery in Minori', 'Sunset dinner in Positano overlooking the sea'],
    hotels: ['Hotel Santa Caterina Amalfi', 'Le Sirenuse Positano', 'Belmond Hotel Caruso Ravello', 'Hotel Caesar Augustus Capri'],
  },
  {
    slug: 'santorini', name: 'Santorini', country: 'Greece',
    tagline: 'Blue Domes & Volcanic Sunsets',
    gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)',
    highlights: ['Oia Sunset', 'Caldera Views', 'Black Sand Beach', 'Akrotiri Ruins', 'Vineyard Tour', 'Fira'],
    bestTime: 'May–Jun · Sep–Oct', duration: '5–7 nights', from: '$260',
    description: 'Santorini is genuinely unlike anywhere else on earth — a volcanic caldera with crescent-shaped cliffs rising 300 metres from the sea, white-washed villages perched on the edge, and a light that has been called the most beautiful in the world.',
    experiences: ['Oia sunset — arrive 2 hours early to claim a spot', 'Sunrise walk along the caldera from Fira to Oia (2 hours)', 'Akrotiri Minoan excavations — the "Greek Pompeii"', 'Perissa black sand beach', 'Santorini wine tasting at Santo Wines or Venetsanos', 'Catamaran sunset cruise with dinner', 'Helicopter transfer from Athens for arrival drama'],
    hotels: ['Grace Hotel Santorini', 'Katikies Oia', 'Canaves Oia Suites', 'Mystique Oia', 'Andronis Boutique Hotel'],
  },
  {
    slug: 'barcelona', name: 'Barcelona', country: 'Spain',
    tagline: 'Gaudí, Beaches and an Unstoppable Energy',
    gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#3e0030)',
    highlights: ['Sagrada Família', 'Park Güell', 'La Barceloneta', 'La Boqueria', 'Gothic Quarter', 'El Born'],
    bestTime: 'May–Jun · Sep–Oct', duration: '4–6 nights', from: '$190',
    description: 'Barcelona is the most seductive city in Europe — Gaudí\'s surreal architecture around every corner, beaches within walking distance of the old town, the world\'s best food market, and a nightlife scene that starts at midnight and runs until dawn.',
    experiences: ['Sagrada Família interior — book far ahead, arrive at opening', 'Park Güell mosaic terraces at dawn (timed tickets required)', 'La Boqueria market — go early, eat everything', 'Gothic Quarter narrow street walk — get lost deliberately', 'Barceloneta beach morning swim followed by seafood lunch', 'Tapas and vermouth crawl through El Born and Gràcia', 'Cable car to Montjuïc for sunset city panorama'],
    hotels: ['Hotel Arts Barcelona', 'Mandarin Oriental Barcelona', 'Casa Camper', 'Hotel Neri', 'El Palace Barcelona'],
  },
  {
    slug: 'dubrovnik', name: 'Dubrovnik', country: 'Croatia',
    tagline: 'The Pearl of the Adriatic',
    gradient: 'linear-gradient(160deg,#000e18,#001828,#002238)',
    highlights: ['City Walls Walk', 'Old Town', 'Lokrum Island', 'Cable Car', 'Hvar Day Trip', 'Game of Thrones Sites'],
    bestTime: 'May–Jun · Sep–Oct', duration: '4–6 nights', from: '$230',
    description: 'Dubrovnik\'s walled old town is one of Europe\'s most perfectly preserved medieval cities — limestone streets polished to marble by centuries of footsteps, baroque churches, Renaissance fountains and the Adriatic glittering below its walls.',
    experiences: ['Old Town walls walk at sunset — 2km circuit, unmissable', 'Cable car to Mount Srđ for panoramic views', 'Kayak around the city walls to Lokrum Island', 'Day trip to Hvar by catamaran', 'Game of Thrones filming locations tour', 'Sunset boat trip to Elaphiti Islands', 'Fresh seafood dinner at a konoba in the old town'],
    hotels: ['Villa Orsula', 'Hotel Excelsior', 'Rixos Premium Dubrovnik', 'Hotel Pucić Palace', 'Sun Gardens Dubrovnik'],
  },
  {
    slug: 'london', name: 'London', country: 'United Kingdom',
    tagline: 'The City Where Everything Happens',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['British Museum', 'Tate Modern', 'Borough Market', 'Hyde Park', 'Notting Hill', 'The Thames'],
    bestTime: 'May–Sep', duration: '4–7 nights', from: '$160',
    description: 'London is the city where every neighbourhood is a different city — the financial city, the royal city, the creative city, the multicultural city. The sheer density of world-class museums, restaurants, theatre and culture is unmatched anywhere on earth.',
    experiences: ['British Museum — free entry, allow a full day', 'Borough Market on a Friday or Saturday morning', 'Tate Modern and a walk across the Millennium Bridge', 'Afternoon tea at Claridge\'s or The Ritz', 'Notting Hill and Portobello Road on a Saturday', 'Evening at the National Theatre on the South Bank', 'Day trip to the Cotswolds or Stonehenge'],
    hotels: ['Claridge\'s', 'The Connaught', 'Sketch London', 'The Ned', 'Ham Yard Hotel'],
  },
  {
    slug: 'amsterdam', name: 'Amsterdam', country: 'Netherlands',
    tagline: 'Canals, Culture and Complete Freedom',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['Rijksmuseum', 'Anne Frank House', 'Jordaan Canal Walk', 'Van Gogh Museum', 'Vondelpark', 'Day Trips'],
    bestTime: 'Apr–May · Sep–Oct', duration: '3–5 nights', from: '$190',
    description: 'Amsterdam is Europe\'s most liveable great city — compact, cycling-friendly, architecturally beautiful and with world-class museums. The Rijksmuseum houses Rembrandt\'s Night Watch. The Anne Frank House is one of the most moving experiences in Europe.',
    experiences: ['Rijksmuseum — one of the world\'s great art museums (book ahead)', 'Anne Frank House — book tickets weeks in advance, deeply moving', 'Jordaan neighbourhood canal walk at golden hour', 'Van Gogh Museum — the world\'s largest Van Gogh collection', 'Hire a bicycle for the day — the authentic Amsterdam experience', 'Cheese market at Alkmaar (30 min by train)', 'Day trip to Keukenhof tulip gardens (April–May only)'],
    hotels: ['Conservatorium Hotel', 'Waldorf Astoria Amsterdam', 'The Dylan Amsterdam', 'Hotel V Nesplein', 'Pulitzer Amsterdam'],
  },
  {
    slug: 'prague', name: 'Prague', country: 'Czech Republic',
    tagline: 'The City of a Hundred Spires',
    gradient: 'linear-gradient(160deg,#0e0018,#180028,#220038)',
    highlights: ['Prague Castle', 'Charles Bridge', 'Old Town Square', 'Josefov', 'Wenceslas Square', 'Czech Beer'],
    bestTime: 'Apr–Jun · Sep–Oct', duration: '3–5 nights', from: '$120',
    description: 'Prague is Europe\'s best-kept secret no longer — but it remains one of the continent\'s most beautiful cities. Gothic cathedrals, baroque palaces, art nouveau cafés and a medieval astronomical clock that draws crowds every hour on the hour.',
    experiences: ['Prague Castle complex — the largest ancient castle in the world', 'Charles Bridge at 6am — before any tourists arrive', 'Old Town Square astronomical clock on the hour', 'Josefov Jewish Quarter — six synagogues and a medieval cemetery', 'Evening classical music concert in a baroque church', 'Czech beer tasting tour through Žižkov district', 'Day trip to Kutná Hora and the Sedlec Ossuary (bone church)'],
    hotels: ['Four Seasons Hotel Prague', 'Augustine Prague', 'Hotel Josef', 'The Mark Luxury Hotel', 'Aria Hotel Prague'],
  },
  {
    slug: 'iceland', name: 'Iceland', country: 'Iceland',
    tagline: 'Fire, Ice and the Northern Lights',
    gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)',
    highlights: ['Northern Lights', 'Golden Circle', 'Blue Lagoon', 'Vatnajökull Glacier', 'Midnight Sun', 'Ice Caves'],
    bestTime: 'Jun–Aug (Midnight Sun) · Sep–Mar (Aurora)', duration: '6–9 nights', from: '$340',
    description: 'Iceland is one of the world\'s most extreme and spectacular destinations — a living geological laboratory where geysers erupt, glaciers calve into black sand beaches, and the sky turns green with the Northern Lights. There is nothing else like it.',
    experiences: ['Northern Lights hunting Sep–Mar (KP3+ forecast needed)', 'Golden Circle — Geysir, Gullfoss, Þingvellir in one day', 'Ice cave expedition inside Vatnajökull glacier (winter)', 'Blue Lagoon geothermal spa (book well ahead)', 'Snorkelling in Silfra fissure between two tectonic plates', 'Midnight Sun coastal drive in June', 'Whale watching from Húsavík in summer'],
    hotels: ['ION Adventure Hotel', 'Deplar Farm', '101 Hotel Reykjavik', 'Fosshotel Glacier Lagoon', 'Hotel Rangá'],
  },
  {
    slug: 'swiss-alps', name: 'Swiss Alps', country: 'Switzerland',
    tagline: 'The Roof of Europe',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['Matterhorn', 'Jungfraujoch', 'Zermatt', 'Interlaken', 'Lake Geneva', 'Alpine Villages'],
    bestTime: 'Dec–Mar (Skiing) · Jun–Sep (Hiking)', duration: '5–8 nights', from: '$420',
    description: 'The Swiss Alps are the benchmark by which all mountain destinations are measured — the Matterhorn\'s impossible pyramid peak, the Jungfrau railway climbing to 3,454 metres, precision-engineered ski resorts and picture-perfect villages unchanged for centuries.',
    experiences: ['Jungfraujoch — the "Top of Europe" by mountain railway', 'Matterhorn view from Zermatt — no cars, pristine village', 'Paragliding over Interlaken Valley', 'St. Moritz or Verbier for world-class skiing', 'Lake Geneva steamer cruise from Geneva to Montreux', 'Cheese and chocolate fondue in a mountain hut', 'Glacier Express scenic train from Zermatt to St. Moritz'],
    hotels: ['The Alpina Gstaad', 'Badrutt\'s Palace St. Moritz', 'Grand Hotel Zermatterhof', 'Victoria-Jungfrau Grand Hotel Interlaken'],
  },
  {
    slug: 'lisbon', name: 'Lisbon & Porto', country: 'Portugal',
    tagline: 'Europe\'s Most Soulful Cities',
    gradient: 'linear-gradient(160deg,#1c0e00,#2e1800,#402200)',
    highlights: ['Alfama District', 'Tram 28', 'Fado Music', 'Belém Tower', 'Douro Valley Wine', 'Pastéis de Nata'],
    bestTime: 'Mar–Jun · Sep–Oct', duration: '5–7 nights', from: '$140',
    description: 'Lisbon and Porto are two of Europe\'s most beautiful and underrated cities — fado-haunted Alfama, azulejo-tiled façades, remarkable food and wine, and a melancholy beauty that gets under your skin.',
    experiences: ['Tram 28 through Alfama at golden hour', 'Fado music at a traditional adega in Alfama at night', 'Belém Tower and Jerónimos Monastery', 'Pastéis de Nata at Pastéis de Belém (since 1837)', 'Porto Ribeira waterfront and Douro River cruise', 'Port wine tasting in a cave at Vila Nova de Gaia', 'Douro Valley wine country day trip — terraced vineyards above the river'],
    hotels: ['Bairro Alto Hotel Lisbon', 'Verride Palácio Santa Catarina', 'The Yeatman Porto', 'Torel Palace Porto', 'Sublime Comporta'],
  },
]

const europeTypes = [
  { icon: '🎨', title: 'Art & Culture', desc: 'The Louvre, Uffizi, Prado, Rijksmuseum, National Gallery — Europe holds more of the world\'s great art than anywhere else on earth.' },
  { icon: '🍷', title: 'Food & Wine', desc: 'French haute cuisine, Italian pasta and pizza, Spanish tapas, Portuguese wine — European food culture is the world\'s most celebrated.' },
  { icon: '🏰', title: 'History & Architecture', desc: 'From Roman amphitheatres to medieval castles to baroque palaces — Europe\'s built heritage spans 3,000 years of civilisation.' },
  { icon: '🏖', title: 'Mediterranean Beaches', desc: 'Santorini, Amalfi, Dubrovnik, Mallorca — the Mediterranean coastline offers Europe\'s finest combination of beauty, culture and sun.' },
  { icon: '⛷', title: 'Alpine Adventures', desc: 'The Swiss Alps, French Alps and Dolomites offer the world\'s finest skiing, hiking and mountain scenery across four seasons.' },
  { icon: '🚂', title: 'Rail Journeys', desc: 'The Glacier Express, Orient Express, Eurostar and Interrail — Europe\'s train network makes city-hopping across the continent effortless.' },
]

const multiCityRoutes = [
  { title: 'Classic Grand Tour', days: '14 days', cities: 'London → Paris → Rome → Florence → Venice → Barcelona', desc: 'The original European experience — five of the continent\'s greatest cities in two weeks by train and flight.' },
  { title: 'Mediterranean Summer', days: '12 days', cities: 'Athens → Santorini → Mykonos → Dubrovnik → Split', desc: 'Island hopping and coastal beauty across the Eastern Mediterranean.' },
  { title: 'Nordic Explorer', days: '10 days', cities: 'Copenhagen → Bergen → Flåm → Oslo → Stockholm', desc: 'Fjords, design, hygge and the Northern Lights across Scandinavia.' },
  { title: 'Iberian Peninsula', days: '10 days', cities: 'Madrid → Toledo → Seville → Córdoba → Lisbon → Porto', desc: 'Moorish palaces, flamenco, fado and extraordinary food from Spain to Portugal.' },
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
            <em style={{ color: gold }}>Europe</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            The continent that gave the world art, architecture, cuisine and philosophy. Fifty countries, a thousand languages, and cities that have been drawing travellers for three thousand years. Europe never gets old.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://aviasales.tp.st/4CRDbzuv" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              ✈ SEARCH FLIGHTS
            </a>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              PLAN MY EUROPE TRIP
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: '12', label: 'Destinations' },
            { num: '50', label: 'Countries' },
            { num: '500+', label: 'UNESCO Sites' },
            { num: '26', label: 'Schengen Countries' },
            { num: '6', label: 'Michelin-Starred Cities' },
          ].map(s => (
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
          {[
            { key: 'destinations', label: 'Destinations' },
            { key: 'experiences', label: 'Experiences' },
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 2 }}>
            {destinations.map(dest => (
              <div key={dest.slug}
                onClick={() => setSelectedDest(selectedDest?.slug === dest.slug ? null : dest)}
                style={{ background: '#111110', border: `1px solid ${selectedDest?.slug === dest.slug ? gold : 'rgba(200,169,110,0.1)'}`, cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.2s' }}>

                {/* Banner */}
                <div style={{ background: dest.gradient, height: 130, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.75) 0%,transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 18 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold }}>{dest.country}</div>
                  </div>
                </div>

                {/* Card content */}
                <div style={{ padding: '20px 22px 22px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 300, color: cream, marginBottom: 4, lineHeight: 1 }}>{dest.name}</h3>
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: gold, marginBottom: 10 }}>{dest.tagline}</p>
                  <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 14 }}>{dest.description}</p>

                  {/* Highlight tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {dest.highlights.map(h => (
                      <span key={h} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: gold, padding: '3px 10px' }}>{h}</span>
                    ))}
                  </div>

                  {/* Stats */}
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

                {/* Expanded */}
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
                      <a href="https://aviasales.tp.st/4CRDbzuv" target="_blank" rel="noopener noreferrer"
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
        )}

        {/* ── EXPERIENCES TAB ── */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Europe <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                Europe rewards the traveller who goes beyond the headline attractions — the neighbourhood restaurant, the regional train, the village no one has heard of yet.
              </p>
            </div>

            {/* Experience types */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {europeTypes.map(type => (
                <div key={type.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{type.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{type.title}</h3>
                  <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{type.desc}</p>
                </div>
              ))}
            </div>

            {/* Multi-city routes */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>POPULAR MULTI-CITY ROUTES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
                {multiCityRoutes.map(route => (
                  <div key={route.title} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.08)', padding: '24px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: cream, fontWeight: 600, margin: 0 }}>{route.title}</h3>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', color: gold, border: '1px solid rgba(200,169,110,0.25)', padding: '3px 10px', flexShrink: 0, marginLeft: 8 }}>{route.days}</span>
                    </div>
                    <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: gold, marginBottom: 10 }}>{route.cities}</p>
                    <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{route.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Season guide */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginTop: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>EUROPE BY SEASON</div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'Mar – May', desc: 'Spring in Europe — Paris in bloom, tulips in Amsterdam, wildflowers on the Amalfi Coast. Fewer crowds and reasonable prices. Ideal for most of Western Europe.', level: 'Excellent', color: '#4ade80' },
                  { period: 'Jun – Aug', desc: 'Peak season — long days, beach weather, festivals. Sardinia, Croatia and Greece are spectacular. Book accommodation months ahead. Prices peak in August.', level: 'Peak Season', color: '#f87171' },
                  { period: 'Sep – Oct', desc: 'Arguably the best time for Europe — summer heat fades, crowds thin, grape harvest begins. Tuscany, Douro Valley and Burgundy at their most beautiful.', level: 'Best Value', color: '#fbbf24' },
                  { period: 'Nov – Feb', desc: 'Winter magic — Christmas markets in Prague, Vienna and Strasbourg are unmissable. Alps skiing from December. Southern Europe (Lisbon, Seville) mild and quiet.', level: 'Off-Peak', color: '#60a5fa' },
                ].map(row => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 100px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px', textAlign: 'center' }}>{row.level}</span>
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

              {/* Schengen info */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>SCHENGEN VISA GUIDE</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
                  {[
                    { heading: 'What is Schengen?', body: '26 European countries share the Schengen Area — one visa covers all of them. France, Italy, Spain, Germany, Greece, Switzerland, Netherlands and more. The UK is NOT part of Schengen.' },
                    { heading: 'Who needs a Schengen Visa?', body: 'EU, EEA and UK passport holders enter freely. US, Canadian and Australian passport holders enter visa-free for 90 days. Most African passport holders including Nigerian and Ghanaian require a visa — apply at the embassy of your main destination.' },
                    { heading: 'How to apply', body: 'Apply at least 3–4 weeks ahead at your nearest consulate. You will need: bank statements (3 months), confirmed accommodation, return ticket, travel insurance (€30,000 minimum cover), and your itinerary. Refusal rates are significant — prepare a strong application.' },
                    { heading: 'The 90/180 rule', body: 'Schengen visa allows 90 days in any 180-day period across all 26 countries. You cannot stay more than 90 days total — even across multiple countries. The UK counts separately and also gives 90 days visa-free for eligible nationalities.' },
                  ].map(item => (
                    <div key={item.heading}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>{item.heading}</div>
                      <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Getting around */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>GETTING AROUND EUROPE</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
                  {[
                    { icon: '🚄', title: 'High-Speed Rail', desc: 'Eurostar London–Paris (2h15), TGV Paris–Marseille (3h), Frecciarossa Rome–Milan (3h). Book ahead for best prices.' },
                    { icon: '✈', title: 'Budget Airlines', desc: 'Ryanair, EasyJet, Wizz Air connect European cities from €20–80. Book 6–8 weeks ahead. Watch for hidden bag fees.' },
                    { icon: '🚌', title: 'FlixBus', desc: 'Comfortable coaches connecting 30+ countries from €5. Slower but very cheap for routes not served by rail.' },
                    { icon: '🚗', title: 'Car Hire', desc: 'Essential for the Amalfi Coast, Scottish Highlands, French countryside and Croatia. Book ahead in peak season.' },
                  ].map(item => (
                    <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: gold, marginBottom: 6 }}>{item.title}</div>
                        <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget guide */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>BUDGET GUIDE (PER PERSON / DAY)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Switzerland', range: '€150–350/day', note: 'Most expensive in Europe' },
                    { dest: 'London', range: '£100–250/day', note: 'Very expensive' },
                    { dest: 'Paris / Rome', range: '€80–200/day', note: 'Expensive but manageable' },
                    { dest: 'Barcelona / Amsterdam', range: '€70–180/day', note: 'Mid-range' },
                    { dest: 'Lisbon / Porto', range: '€50–120/day', note: 'Excellent value' },
                    { dest: 'Prague / Krakow', range: '€40–100/day', note: 'Best value in Europe' },
                    { dest: 'Croatia / Greece', range: '€60–150/day', note: 'Good value coastal' },
                    { dest: 'Iceland', range: '€120–280/day', note: 'Expensive but unique' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600, marginBottom: 2 }}>{item.range}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: dim }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packing */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>EUROPE PACKING ESSENTIALS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
                  {[
                    { cat: 'Documents', items: ['Passport (3 months beyond stay)', 'Schengen visa (if required)', 'Travel insurance documents', 'Printed accommodation bookings', 'EHIC card (EU health coverage)'] },
                    { cat: 'Clothing', items: ['Layers — weather changes fast', 'Comfortable walking shoes (cobblestones!)', 'One smart outfit for fine dining', 'Light rain jacket year-round', 'Swimwear for Mediterranean coast'] },
                    { cat: 'Tech', items: ['Type C/G universal adapter', 'Travel eSIM (huuboi.com/esim)', 'Offline Google Maps downloaded', 'Rail app (Trainline or Raileurope)', 'Translation app for menus'] },
                  ].map(s => (
                    <div key={s.cat}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 10 }}>{s.cat}</div>
                      {s.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
                          <span style={{ color: gold, fontSize: '0.58rem', marginTop: 3, flexShrink: 0 }}>✓</span>
                          <span style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
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
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 EUROPE TRAVEL ESIM</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>One eSIM covers all 26 Schengen countries plus UK — no roaming fees across Europe</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET EUROPE ESIM
          </Link>
        </div>

        {/* Related */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari' },
            { label: 'Middle East', href: '/middle-east' },
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
