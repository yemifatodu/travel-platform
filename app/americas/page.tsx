'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const destinations = [
  {
    slug: 'new-york', name: 'New York City', country: 'USA',
    tagline: 'The City That Never Sleeps',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['Manhattan', 'Central Park', 'Brooklyn Bridge', 'Broadway', 'MoMA', 'High Line'],
    bestTime: 'Apr–Jun · Sep–Nov', duration: '5–8 nights', from: '$420',
    description: 'New York City operates at a frequency no other city can match — the skyline alone is a work of art, every neighbourhood a different world, the food scene unsurpassed, and a cultural energy that has defined the modern era.',
    experiences: ['Brooklyn Bridge walk at sunrise — Manhattan skyline photography', 'MoMA and the Met in one day (book tickets ahead)', 'High Line elevated park walk through Chelsea', 'One World Trade Center observation deck at sunset', 'Broadway show — book at TKTS for same-day discounts', 'Smorgasburg food market in Brooklyn (weekends)', 'Day trip to the Hamptons or Hudson Valley'],
    hotels: ['The Mark Hotel', 'Aman New York', 'Eleven Madison Park (hotel + restaurant)', 'The Bowery Hotel', 'NoMad Hotel'],
  },
  {
    slug: 'rio-de-janeiro', name: 'Rio de Janeiro', country: 'Brazil',
    tagline: 'The Marvelous City',
    gradient: 'linear-gradient(160deg,#001e14,#003020,#00402a)',
    highlights: ['Christ the Redeemer', 'Copacabana Beach', 'Sugarloaf Mountain', 'Carnival', 'Ipanema', 'Lapa'],
    bestTime: 'Dec–Mar (Carnival) · May–Sep (Dry)', duration: '5–7 nights', from: '$560',
    description: 'Rio de Janeiro is one of the world\'s most dramatically beautiful cities — Christ the Redeemer watching over a city squeezed between mountains and ocean, samba pulsing through every neighbourhood, and beaches that are genuinely a way of life.',
    experiences: ['Christ the Redeemer at sunrise — before the crowds and clouds', 'Sugarloaf Mountain cable car at sunset', 'Copacabana and Ipanema beach morning — açaí and coconut water', 'Samba show at Lapa arches on a Friday night', 'Favela Rocinha walking tour with a local guide', 'Carnival — the greatest party on earth (book 1 year ahead)', 'Helicopter flight over the city and beaches'],
    hotels: ['Belmond Copacabana Palace', 'Hotel Fasano Rio', 'Santa Teresa Hotel MGallery', 'Mama Ruisa'],
  },
  {
    slug: 'machu-picchu', name: 'Machu Picchu', country: 'Peru',
    tagline: 'The Lost City of the Incas',
    gradient: 'linear-gradient(160deg,#060e00,#0c1c00,#122600)',
    highlights: ['Machu Picchu Citadel', 'Inca Trail', 'Sacred Valley', 'Cusco', 'Rainbow Mountain', 'Sun Gate'],
    bestTime: 'May–Sep', duration: '7–10 nights', from: '$620',
    description: 'Machu Picchu is one of the world\'s most extraordinary places — an Inca citadel built at 2,430 metres in the Andean cloud forest, abandoned for 400 years, and rediscovered in 1911. No photograph prepares you for the scale or the emotion of standing there.',
    experiences: ['Machu Picchu at 6am — morning mist over the citadel', 'Inca Trail 4-day trek — one of the world\'s great hikes', 'Sacred Valley — Pisac ruins and Ollantaytambo fortress', 'Rainbow Mountain (Vinicunca) day hike', 'Cusco city walk — Inca stonework beneath Spanish colonial churches', 'Sun Gate (Inti Punku) sunrise above Machu Picchu', 'Peru Rail Vistadome scenic train through the cloud forest'],
    hotels: ['Belmond Sanctuary Lodge (only hotel at Machu Picchu)', 'Inkaterra Machu Picchu Pueblo Hotel', 'Explora Valle Sagrado', 'Palacio del Inka Cusco'],
  },
  {
    slug: 'patagonia', name: 'Patagonia', country: 'Argentina & Chile',
    tagline: 'The End of the World',
    gradient: 'linear-gradient(160deg,#001824,#002a3d,#003852)',
    highlights: ['Torres del Paine', 'Perito Moreno Glacier', 'W Trek', 'El Chaltén', 'Fitz Roy', 'Southern Ice Field'],
    bestTime: 'Nov–Mar', duration: '8–14 nights', from: '$680',
    description: 'Patagonia is wilderness on a scale that makes you feel genuinely small — granite towers soaring from the steppe, glaciers calving thunderously into turquoise lakes, condors riding thermals overhead, and a silence broken only by wind. It is unlike anywhere else.',
    experiences: ['W Trek in Torres del Paine — 4–5 days through three extraordinary valleys', 'Perito Moreno Glacier ice walk — walk on an active glacier', 'El Chaltén day hikes to Fitz Roy and Cerro Torre — free, no permits', 'Glacier Grey and the Southern Patagonian Ice Field boat trip', 'Puerto Natales and Ultima Esperanza Sound boat tour', 'Estancia stay with gaucho horsemanship and lamb asado', 'Seaplane over the Torres del Paine towers'],
    hotels: ['Explora Patagonia', 'EcoCamp Patagonia', 'Las Torres Patagonia', 'Awasi Patagonia', 'Singular Patagonia'],
  },
  {
    slug: 'havana', name: 'Havana', country: 'Cuba',
    tagline: 'Frozen in the Most Beautiful Possible Moment',
    gradient: 'linear-gradient(160deg,#1e0800,#301200,#421c00)',
    highlights: ['Old Havana', 'Malecón', 'Classic Cars', 'Live Salsa', 'Viñales Valley', 'Mojitos'],
    bestTime: 'Nov–Apr', duration: '5–7 nights', from: '$460',
    description: 'Havana is unlike anywhere else on earth — a city of crumbling baroque grandeur, 1950s American cars polished to a shine, salsa spilling from every doorway, and a warmth of spirit that no embargo has diminished.',
    experiences: ['Old Havana (Habana Vieja) UNESCO street walk', 'Malecón sunset with a mojito and live music', 'Classic American car tour around the city', 'Hemingway\'s haunts — La Bodeguita del Medio and El Floridita', 'Cabaret Tropicana — Cuba\'s legendary outdoor show', 'Viñales Valley day trip — tobacco farms and mogote hills', 'Jazz at the Casa de la Música at midnight'],
    hotels: ['Gran Hotel Manzana Kempinski', 'Hotel Nacional de Cuba', 'Saratoga Hotel', 'Casa San Ignacio'],
  },
  {
    slug: 'cartagena', name: 'Cartagena', country: 'Colombia',
    tagline: 'The Jewel of the Caribbean Coast',
    gradient: 'linear-gradient(160deg,#200a00,#341600,#482000)',
    highlights: ['Walled City', 'Rosario Islands', 'Getsemaní', 'Street Food', 'La Popa Hill', 'San Felipe Castle'],
    bestTime: 'Dec–Apr', duration: '4–6 nights', from: '$340',
    description: 'Cartagena is Colombia\'s most seductive city — a perfectly preserved 16th-century walled city of colourful colonial architecture, bougainvillea-draped balconies, Caribbean beaches and one of South America\'s most vibrant food scenes.',
    experiences: ['Walled city evening walk — gold bougainvillea and candlelit restaurants', 'Rosario Islands day trip by speedboat — coral reefs and snorkelling', 'Getsemaní neighbourhood street art and nightlife', 'San Felipe de Barajas Castle at sunset', 'Arepas con huevo breakfast at the public market', 'Boat tour to Playa Blanca on Barú Peninsula', 'Cooking class — Colombian Caribbean cuisine'],
    hotels: ['Casa San Agustín', 'Sophia Hotel', 'Hotel Charleston Santa Teresa', 'Casa Lola Hotel'],
  },
  {
    slug: 'galapagos', name: 'Galápagos Islands', country: 'Ecuador',
    tagline: 'Darwin\'s Laboratory — Still Running',
    gradient: 'linear-gradient(160deg,#001a14,#002822,#003430)',
    highlights: ['Giant Tortoises', 'Marine Iguanas', 'Blue-Footed Boobies', 'Sea Lions', 'Snorkelling', 'Darwin\'s Finches'],
    bestTime: 'Jun–Nov (Diving) · Dec–May (Warm Water)', duration: '7–10 nights', from: '$2,200',
    description: 'The Galápagos Islands are the most extraordinary wildlife destination on earth — animals that have never learned to fear humans, endemic species found nowhere else, and an ecosystem so delicate and so overwhelming that it changed our understanding of life itself.',
    experiences: ['Swimming with sea lions on Española Island', 'Giant tortoise sanctuary at the Darwin Research Station', 'Snorkelling with hammerhead sharks at Darwin\'s Arch', 'Blue-footed booby nesting colony on Genovesa Island', 'Marine iguana colony at Fernandina Island', 'Snorkelling with sea turtles and penguins at Bartolomé', 'Liveaboard cruise to the outer islands'],
    hotels: ['Pikaia Lodge Santa Cruz', 'Finch Bay Eco Hotel', 'Royal Palm Galápagos', 'Liveaboard cruise (Isabela II or National Geographic Islander)'],
  },
  {
    slug: 'cancun', name: 'Mexico & Yucatán', country: 'Mexico',
    tagline: 'Ancient Civilisations, Turquoise Cenotes and Caribbean Beaches',
    gradient: 'linear-gradient(160deg,#001c20,#002c32,#003c44)',
    highlights: ['Chichen Itza', 'Tulum Ruins', 'Cenotes', 'Playa del Carmen', 'Holbox Island', 'Cobá Jungle Pyramid'],
    bestTime: 'Dec–Apr', duration: '7–10 nights', from: '$380',
    description: 'Mexico\'s Yucatán Peninsula packs an extraordinary combination into a small geography — Mayan pyramids rising from jungle, luminescent cenotes (underground swimming holes), Caribbean turquoise sea and an incredible food culture.',
    experiences: ['Chichen Itza at opening — before the heat and the crowds', 'Cenote Ik Kil and Cenote Dos Ojos — swim in underground crystal water', 'Tulum cliff-top Mayan ruins above the Caribbean', 'Cobá — climb the pyramid through the jungle (still permitted)', 'Holbox Island — no cars, bioluminescent water, whale sharks (seasonal)', 'Playa del Carmen 5th Avenue food and nightlife', 'Day trip to Bacalar — the lagoon of seven colours'],
    hotels: ['Azulik Tulum', 'Nomade Tulum', 'Be Tulum', 'Hotel Esencia Riviera Maya', 'Rosewood Mayakoba'],
  },
  {
    slug: 'buenos-aires', name: 'Buenos Aires', country: 'Argentina',
    tagline: 'The Paris of South America',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['Tango', 'Palermo Soho', 'La Boca', 'Recoleta Cemetery', 'Steak Dinner', 'San Telmo Market'],
    bestTime: 'Oct–Dec · Mar–May', duration: '5–7 nights', from: '$280',
    description: 'Buenos Aires is South America\'s most sophisticated city — European architecture, passionate tango, the world\'s finest beef, and a café culture that makes Paris look hurried. The city seduces slowly and thoroughly.',
    experiences: ['Tango show at Café de los Angelitos or El Viejo Almacén', 'Recoleta Cemetery — Eva Perón\'s tomb and extraordinary mausoleums', 'San Telmo Sunday antiques market and tango in the streets', 'Palermo Soho boutiques and restaurant dinner', 'La Boca neighbourhood and Caminito street art', 'Asado (Argentine barbecue) dinner at a parrilla', 'Day trip to Tigre Delta and the Paraná River'],
    hotels: ['Palacio Duhau Park Hyatt', 'Faena Hotel Buenos Aires', 'Hotel Madero', 'Alvear Palace Hotel'],
  },
  {
    slug: 'costa-rica', name: 'Costa Rica', country: 'Costa Rica',
    tagline: 'Pura Vida — The World\'s Best Eco-Tourism',
    gradient: 'linear-gradient(160deg,#001c00,#002c00,#003c00)',
    highlights: ['Arenal Volcano', 'Manuel Antonio', 'Monteverde Cloud Forest', 'Tortuguero Turtles', 'Zip-lining', 'Hot Springs'],
    bestTime: 'Dec–Apr', duration: '7–10 nights', from: '$420',
    description: 'Costa Rica perfected the art of eco-tourism — a country the size of West Virginia that contains 5% of the world\'s biodiversity. Active volcanoes, cloud forests, Pacific and Caribbean beaches, and wildlife so accessible it is almost absurd.',
    experiences: ['Arenal Volcano night hike and lava views', 'Tabacón hot springs under the stars with volcano backdrop', 'Monteverde cloud forest zip-line canopy tour', 'Manuel Antonio National Park — sloths, monkeys and white sand', 'Tortuguero National Park — nesting sea turtles (Jul–Oct)', 'White water rafting on the Pacuare River (Class IV)', 'Corcovado National Park — jaguars, tapirs and scarlet macaws'],
    hotels: ['Nayara Tented Camp', 'Lapa Rios Lodge', 'Andaz Costa Rica Resort', 'Arenas del Mar Manuel Antonio'],
  },
]

const americasTypes = [
  { icon: '🌎', title: 'Natural Wonders', desc: 'Patagonia\'s glaciers, the Galápagos, Iguazu Falls, the Amazon and the Atacama — the Americas contain a disproportionate share of the world\'s great natural spectacles.' },
  { icon: '🏛', title: 'Ancient Civilisations', desc: 'Machu Picchu, Chichen Itza, Teotihuacan, Tiwanaku — the pre-Columbian civilisations of the Americas built some of the world\'s most extraordinary monuments.' },
  { icon: '🎺', title: 'Music & Culture', desc: 'Samba in Rio, tango in Buenos Aires, salsa in Havana, jazz in New Orleans — the Americas invented the music that defined the 20th century.' },
  { icon: '🥩', title: 'Food & Gastronomy', desc: 'Argentine asado, Peruvian ceviche, Mexican tacos, Brazilian churrasco — South American food culture has exploded onto the world stage.' },
  { icon: '🤿', title: 'Ocean & Adventure', desc: 'Caribbean coral reefs, Galápagos marine life, Pacific surf, Patagonian trekking — the Americas offer the full range of ocean and adventure travel.' },
  { icon: '🌆', title: 'World-Class Cities', desc: 'New York, Buenos Aires, Rio, Mexico City, Toronto — the cities of the Americas are among the world\'s most dynamic and culturally rich.' },
]

const routes = [
  { title: 'South America Classic', days: '21 days', cities: 'Lima → Cusco → Machu Picchu → Buenos Aires → Patagonia', desc: 'The grand South American journey — Inca history, city culture and wilderness at the end of the world.' },
  { title: 'Caribbean & Central America', days: '14 days', cities: 'Mexico City → Oaxaca → Tulum → Costa Rica → Cartagena', desc: 'Ancient ruins, beach perfection, cloud forests and Caribbean colonial cities.' },
  { title: 'East Coast USA', days: '14 days', cities: 'New York → Washington D.C. → Boston → Acadia → Montreal', desc: 'The original American cities, great art museums and New England autumn foliage.' },
  { title: 'Brazilian Adventure', days: '12 days', cities: 'São Paulo → Salvador → Pantanal → Amazon → Rio de Janeiro', desc: 'Brazil\'s full diversity — urban culture, Afro-Brazilian heritage, wildlife and the marvelous city.' },
]

export default function AmericasPage() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080a08,#081008,#080810)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(123,200,160,0.07) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            THE AMERICAS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            The <em style={{ color: gold }}>Americas</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            From the Arctic tundra to Patagonia's glaciers, from Manhattan's skyline to the Amazon's cathedral forests — the Americas contain more geographical and cultural diversity than any other landmass on earth.
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
          {[
            { num: '10', label: 'Destinations' },
            { num: '35', label: 'Countries' },
            { num: '8', label: 'UNESCO Natural Sites Featured' },
            { num: '3', label: 'Time Zones Spanned' },
            { num: '#1', label: 'Biodiversity Hotspot (Amazon)' },
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

        {/* EXPERIENCES TAB */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Americas <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                The Americas stretch from Arctic wilderness to tropical rainforest — and every ecosystem between holds extraordinary experiences waiting to be discovered.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {americasTypes.map(type => (
                <div key={type.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{type.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{type.title}</h3>
                  <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{type.desc}</p>
                </div>
              ))}
            </div>

            {/* Routes */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>CLASSIC AMERICAS ROUTES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
                {routes.map(route => (
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
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>AMERICAS BY SEASON</div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'Dec – Apr', desc: 'Best for Caribbean and Mexico (dry season). Patagonia summer — peak trekking season. Rio Carnival in February–March. Cuba and Costa Rica at their best.', level: 'Peak South', color: '#f87171' },
                  { period: 'May – Jun', desc: 'New York and eastern USA spring. Peru dry season begins — ideal for Machu Picchu and Inca Trail. Colombia and Ecuador shoulder season.', level: 'Good Value', color: '#4ade80' },
                  { period: 'Jul – Sep', desc: 'North America summer — ideal for Alaska, Canadian Rockies, national parks. Galápagos best diving season. Brazil and Argentina winter but mild in cities.', level: 'North America Peak', color: '#fbbf24' },
                  { period: 'Oct – Nov', desc: 'New England autumn foliage — spectacular. Patagonia shoulder season with fewer crowds. Good for most of South America before peak season.', level: 'Autumn Magic', color: '#60a5fa' },
                ].map(row => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 120px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px', textAlign: 'center' as const }}>{row.level}</span>
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
                Planning Your <em style={{ color: gold }}>Americas Trip</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Safety & practical */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>PRACTICAL ESSENTIALS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { icon: '💉', tip: 'Yellow fever vaccination required or recommended for most of South America. Malaria prophylaxis for Amazon and jungle regions. Check requirements per country.' },
                    { icon: '💵', tip: 'US dollars are widely accepted or the de facto currency in Ecuador, Panama and Cuba. Carry small bills — change is often scarce. ATMs in cities are reliable.' },
                    { icon: '🚕', tip: 'Use Uber, Cabify or InDriver in major cities — much safer than hailing taxis. In rural areas, arrange transport through your hotel.' },
                    { icon: '🌡', tip: 'Altitude sickness is a serious risk in Peru (Cusco 3,400m), Bolivia and Ecuador. Acclimatise for 2+ days before strenuous activity. Diamox helps many travellers.' },
                    { icon: '📱', tip: 'Get a local SIM or travel eSIM on arrival — essential for Uber and navigation. WhatsApp is the universal communication tool across all of Latin America.' },
                    { icon: '🔐', tip: 'Use hotel safes. Be discreet with phones and cameras on streets. Petty theft is common in tourist areas. Research specific safety advice per city before visiting.' },
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
                    { dest: 'New York City', range: '$150–400/day', note: 'Very expensive' },
                    { dest: 'Galápagos', range: '$250–500/day', note: 'Remote premium' },
                    { dest: 'Patagonia', range: '$120–300/day', note: 'Remote premium' },
                    { dest: 'Rio / Buenos Aires', range: '$80–200/day', note: 'Mid-range' },
                    { dest: 'Machu Picchu / Peru', range: '$60–150/day', note: 'Good value' },
                    { dest: 'Mexico (Yucatán)', range: '$60–150/day', note: 'Good value' },
                    { dest: 'Colombia / Ecuador', range: '$50–120/day', note: 'Excellent value' },
                    { dest: 'Cuba', range: '$60–130/day', note: 'Cash only economy' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600, marginBottom: 2 }}>{item.range}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: dim }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visa overview */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>VISA OVERVIEW</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { heading: 'USA', body: 'ESTA (Visa Waiver) for UK, EU, Australia and many others. B1/B2 tourist visa required for Nigerian, Ghanaian and most African nationalities — apply 3+ months ahead with in-person embassy interview.' },
                    { heading: 'Brazil', body: 'Visa-free for UK, EU, US and Australian passport holders (recently changed). Most African nationals require an e-Visa at visto.mre.gov.br. Yellow fever certificate required for many entry points.' },
                    { heading: 'Peru, Colombia, Ecuador, Costa Rica', body: 'Visa-free for most nationalities for 90 days including most African passports. One of the most accessible regions in the world for international travellers.' },
                    { heading: 'Cuba', body: 'Tourist card (Pink Card) required — sold by airlines and at embassies for ~$25. Travel insurance is mandatory and checked at immigration. US citizens face separate complex restrictions.' },
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

        {/* eSIM strip */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 AMERICAS TRAVEL ESIM</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across USA, Brazil, Mexico, Peru, Colombia, Argentina and 30+ more countries</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET AMERICAS ESIM
          </Link>
        </div>

        {/* Related */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari' },
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
