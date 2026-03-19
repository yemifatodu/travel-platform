'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const destinations = [
  {
    slug: 'sydney', name: 'Sydney', country: 'Australia',
    tagline: 'The Harbour City — Where the World Wants to Live',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['Opera House', 'Harbour Bridge', 'Bondi Beach', 'The Rocks', 'Manly Ferry', 'Blue Mountains'],
    bestTime: 'Sep–Nov · Mar–May', duration: '5–8 nights', from: '$740',
    description: 'Sydney is the city that makes people question every life decision that brought them somewhere else — a spectacular harbour, world-class beaches within the city limits, extraordinary food, and a quality of life that consistently ranks among the world\'s highest.',
    experiences: ['Sydney Opera House guided tour and evening performance', 'Harbour Bridge climb at dawn — 360 degree panorama', 'Bondi to Coogee coastal walk — world-class urban coastline', 'Manly Ferry from Circular Quay — the world\'s great commute', 'The Rocks historic neighbourhood and weekend market', 'Blue Mountains day trip — Three Sisters and Scenic Railway', 'Helicopter flight over the harbour at sunset'],
    hotels: ['Park Hyatt Sydney', 'Capella Sydney', 'Quay Hotel', 'The Langham Sydney', 'One&Only Wolgan Valley (Blue Mountains)'],
  },
  {
    slug: 'great-barrier-reef', name: 'Great Barrier Reef', country: 'Australia',
    tagline: 'The Living Wonder Visible From Space',
    gradient: 'linear-gradient(160deg,#001c28,#002c3d,#003c52)',
    highlights: ['Diving & Snorkelling', 'Whitsunday Islands', 'Whitehaven Beach', 'Liveaboard Diving', 'Sea Turtles', 'Cairns'],
    bestTime: 'Jun–Oct', duration: '5–8 nights', from: '$680',
    description: 'The Great Barrier Reef is the world\'s largest coral ecosystem — 2,300 kilometres of living reef containing more species of fish, coral and marine life than almost anywhere on earth. Snorkelling or diving here for the first time is a life-changing experience.',
    experiences: ['Liveaboard dive trip to the Outer Reef — 3 days, multiple dives', 'Whitehaven Beach — consistently rated one of the world\'s most beautiful', 'Sea turtle encounter at Lady Elliot Island', 'Helicopter flight over the Heart Reef', 'Snorkelling with reef sharks and rays at Agincourt Reef', 'Sailing the Whitsunday Islands on a bareboat charter', 'Night dive at the ribbon reefs — bioluminescent plankton'],
    hotels: ['Qualia Hamilton Island', 'Lizard Island Resort', 'Heron Island Resort', 'Orpheus Island Lodge'],
  },
  {
    slug: 'uluru', name: 'Uluru & Red Centre', country: 'Australia',
    tagline: 'The Sacred Heart of the Continent',
    gradient: 'linear-gradient(160deg,#2a0a00,#401200,#561a00)',
    highlights: ['Uluru Sunrise', 'Kata Tjuta Domes', 'Aboriginal Culture', 'Milky Way Stargazing', 'Desert Walk', 'Field of Light'],
    bestTime: 'May–Sep', duration: '3–4 nights', from: '$580',
    description: 'Uluru is one of the world\'s most sacred and spiritually powerful places — a 348-metre sandstone monolith rising from the Australian desert, changing colour from ochre to blood red to violet as the sun moves across the sky. Nothing prepares you for the scale or the silence.',
    experiences: ['Uluru sunrise from the designated viewing area — bring warm layers', 'Uluru base walk — 10.6km around the rock with Anangu cultural guides', 'Kata Tjuta Valley of the Winds walk at dawn', 'Bruce Munro\'s Field of Light art installation at night', 'Milky Way stargazing — one of the world\'s darkest skies', 'Dot painting workshop with Anangu artists', 'Sunset champagne dinner in the desert with Uluru backdrop'],
    hotels: ['Longitude 131° (luxury desert camp)', 'Sails in the Desert', 'Desert Gardens Hotel'],
  },
  {
    slug: 'queenstown', name: 'Queenstown', country: 'New Zealand',
    tagline: 'The Adventure Capital of the World',
    gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)',
    highlights: ['Bungee Jumping', 'Milford Sound', 'Remarkables Skiing', 'Lake Wakatipu', 'Fiordland', 'Wine Country'],
    bestTime: 'Jun–Aug (Skiing) · Dec–Mar (Summer)', duration: '5–8 nights', from: '$820',
    description: 'Queenstown is adventure made permanent — every activity ever invented for adrenaline lives here, surrounded by mountain scenery so dramatic it looks like a film set. Because it is — Lord of the Rings was filmed in almost every direction.',
    experiences: ['AJ Hackett Kawarau Bridge bungee — the original commercial bungee jump', 'Milford Sound fjord cruise — the eighth wonder of the world', 'Remarkables ski field on a powder day', 'Shotover Jet boat canyon sprint', 'Skydive from 15,000 feet over Lake Wakatipu', 'Fergburger at 2am — an institution that no one questions', 'Central Otago Pinot Noir wine trail by bicycle'],
    hotels: ['Matakauri Lodge', 'The Rees Hotel', 'Eichardt\'s Private Hotel', 'Azur Lodge', 'Blanket Bay'],
  },
  {
    slug: 'milford-sound', name: 'Milford Sound & Fiordland', country: 'New Zealand',
    tagline: 'Rudyard Kipling Called It the Eighth Wonder',
    gradient: 'linear-gradient(160deg,#001e10,#002e18,#003e20)',
    highlights: ['Fiord Cruise', 'Mitre Peak', 'Underwater Observatory', 'Milford Track', 'Doubtful Sound', 'Waterfalls'],
    bestTime: 'Oct–Apr', duration: '2–3 nights', from: '$680',
    description: 'Milford Sound is one of the world\'s most spectacular places — sheer granite cliffs rising 1,200 metres from a fjord carved by glaciers, waterfalls plunging directly into dark sea water, and a silence and scale that makes human beings feel appropriately small.',
    experiences: ['Overnight cruise on Milford Sound — waterfalls by moonlight', 'Mitre Peak in morning mist from the cruise bow', 'Milford Track — the finest walk in the world (4 days, guided or independent)', 'Underwater Observatory — unique look at the fjord below the surface', 'Doubtful Sound overnight cruise — even more remote and spectacular', 'Kayak under the waterfalls at Stirling Falls', 'Scenic flight from Queenstown — glaciers and peaks from above'],
    hotels: ['Milford Sound Lodge', 'Te Anau Lodge', 'Fiordland Lodge Te Anau', 'Overnight cruise vessel'],
  },
  {
    slug: 'bora-bora', name: 'Bora Bora', country: 'French Polynesia',
    tagline: 'The Pearl of the Pacific',
    gradient: 'linear-gradient(160deg,#001828,#002440,#003058)',
    highlights: ['Overwater Bungalows', 'Mount Otemanu', 'Lagoon Snorkelling', 'Shark Feeding', 'Manta Rays', 'Sunset Cruises'],
    bestTime: 'May–Oct', duration: '7–10 nights', from: '$1,200',
    description: 'Bora Bora is what the word paradise was invented to describe — a volcanic peak rising from a luminescent turquoise lagoon, encircled by a coral reef, with overwater bungalows hanging above water so clear you can see every fish from your bed.',
    experiences: ['Wake up in an overwater bungalow above the lagoon — slide into the water from your deck', 'Shark and ray feeding snorkel excursion in the lagoon', 'Mount Otemanu 4WD safari to the summit viewpoint', 'Private catamaran sunset cruise around the island', 'Manta ray snorkelling at the cleaning station', 'Night snorkelling — bioluminescent plankton', 'Helicopter over the entire atoll and lagoon'],
    hotels: ['Four Seasons Resort Bora Bora', 'The St. Regis Bora Bora', 'InterContinental Thalasso', 'Le Bora Bora by Pearl Resorts', 'Sofitel Bora Bora Private Island'],
  },
  {
    slug: 'moorea', name: 'Moorea', country: 'French Polynesia',
    tagline: 'Bora Bora\'s More Beautiful and Less Visited Sister',
    gradient: 'linear-gradient(160deg,#001c24,#002c38,#003c4c)',
    highlights: ['Cook\'s Bay', 'Dolphin Watching', 'Belvedere Lookout', 'Pineapple Wine', 'Snorkelling', 'Whale Season'],
    bestTime: 'May–Oct', duration: '4–6 nights', from: '$680',
    description: 'Moorea is what travellers discover when they want Bora Bora without the crowds or the price — a jagged volcanic island of extraordinary beauty just 17 kilometres from Tahiti, with two spectacular bays, wild hinterland and some of the Pacific\'s best snorkelling.',
    experiences: ['Belvedere Lookout — the most dramatic viewpoint in French Polynesia', 'Swimming with spinner dolphins in the wild — a regular morning occurrence', 'Whale watching Jul–Nov — humpback whales with calves', 'Ray Village — snorkel with stingrays in shallow water', 'ATV or 4WD circuit of the island interior — pineapple plantations and peaks', 'Cook\'s Bay sunset from a waterfront restaurant', 'Island night cultural show with traditional dance'],
    hotels: ['Hilton Moorea Lagoon Resort', 'Sofitel Moorea Ia Ora Beach Resort', 'Manava Beach Resort', 'Fare Miti (private villa)'],
  },
  {
    slug: 'fiji', name: 'Fiji', country: 'Fiji',
    tagline: 'Bula — The World\'s Friendliest Islands',
    gradient: 'linear-gradient(160deg,#001c14,#002c1e,#003c28)',
    highlights: ['Yasawa Islands', 'Beqa Lagoon Diving', 'Village Kava Ceremony', 'Taveuni Garden Island', 'Manta Rays', 'Overwater Bure'],
    bestTime: 'May–Oct', duration: '7–10 nights', from: '$620',
    description: 'Fiji is the Pacific\'s warmest welcome — 330 islands of extraordinary beauty, a culture built around joy and hospitality, world-class diving in the Coral Triangle, and resorts ranging from backpacker surf camps to ultra-luxury private islands.',
    experiences: ['Beqa Lagoon bull shark dive — one of the world\'s great dives', 'Yasawa Island Group day sail or liveaboard — the outer islands', 'Traditional kava ceremony in a Fijian village', 'Taveuni Island rainforest and the 180th meridian', 'Snorkelling with manta rays at Drawaqa Island', 'Mamanuca Islands seaplane hop between islands', 'Firewalking ceremony — a genuine Fijian tradition'],
    hotels: ['Laucala Island Resort', 'Kokomo Private Island', 'Turtle Island', 'Royal Davui Island', 'Jean-Michel Cousteau Resort'],
  },
  {
    slug: 'hawaii', name: 'Hawaii', country: 'USA',
    tagline: 'Where Volcanoes Meet the Pacific',
    gradient: 'linear-gradient(160deg,#200800,#301400,#402000)',
    highlights: ['Volcanoes National Park', 'Na Pali Coast', 'Road to Hana', 'Waimea Canyon', 'Big Wave Surfing', 'Haleakalā Sunrise'],
    bestTime: 'Apr–Jun · Sep–Nov', duration: '7–12 nights', from: '$680',
    description: 'Hawaii is unlike any other US destination and unlike any other Pacific island — active volcanoes adding new land to the earth as you watch, the world\'s most powerful surf, ancient Polynesian culture, and a landscape that ranges from tropical rainforest to high-altitude desert in a single island.',
    experiences: ['Volcanoes National Park lava flow viewing at night on the Big Island', 'Na Pali Coast boat tour from Kauai — the world\'s most dramatic coastline', 'Road to Hana on Maui — 620 curves and 59 bridges', 'Haleakalā volcano sunrise — above the clouds at 3,055 metres', 'Waimea Canyon on Kauai — the Grand Canyon of the Pacific', 'Pipeline surf watching on Oahu\'s North Shore in winter', 'Manta ray night snorkel off Kona — 100% encounter rate'],
    hotels: ['Four Seasons Resort Hualalai', 'Andaz Maui at Wailea', 'Four Seasons Resort Lanai', 'Sensei Lanai', 'Koa Kea Hotel Kauai'],
  },
  {
    slug: 'cook-islands', name: 'Cook Islands', country: 'Cook Islands',
    tagline: 'The Pacific the Way it Used to Be',
    gradient: 'linear-gradient(160deg,#001e18,#002e24,#003e30)',
    highlights: ['Aitutaki Lagoon', 'Rarotonga', 'Muri Beach', 'Island Night', 'Snorkelling', 'Tumunu Bush Beer'],
    bestTime: 'Apr–Nov', duration: '7–10 nights', from: '$920',
    description: 'The Cook Islands are what French Polynesia was 30 years ago — genuinely remote, culturally intact, with arguably the most beautiful lagoon in the entire Pacific at Aitutaki and almost none of the commercialism that has reached Bora Bora.',
    experiences: ['Aitutaki lagoon day cruise — the most beautiful lagoon you have never heard of', 'Muri Lagoon snorkelling at dawn — completely empty', 'Island Night show — traditional Polynesian dancing and umu feast', 'Rarotonga cross-island track hike — jungle mountain interior', 'Te Vara Nui cultural village overwater night show', 'Tumunu bush beer gathering in Aitutaki — genuine local tradition', 'Scuba diving at Avarua Harbour wreck'],
    hotels: ['Pacific Resort Aitutaki', 'Aitutaki Lagoon Private Island Resort', 'Te Manava Luxury Villas Rarotonga', 'The Rarotongan Beach Resort'],
  },
]

const pacificTypes = [
  { icon: '🤿', title: 'Diving & Marine Life', desc: 'The Great Barrier Reef, Fijiian Coral Triangle, Bora Bora lagoon and the waters off Moorea contain some of the world\'s greatest concentrations of marine biodiversity.' },
  { icon: '🏔', title: 'Adventure & Extreme Sports', desc: 'Queenstown invented modern adventure tourism. New Zealand\'s Fiordland and Australia\'s outback offer wilderness on a scale that genuinely humbles.' },
  { icon: '🌺', title: 'Island Paradise', desc: 'French Polynesia, Fiji, Hawaii and the Cook Islands set the global standard for tropical island beauty — overwater bungalows, turquoise lagoons and white sand.' },
  { icon: '🦘', title: 'Wildlife & Nature', desc: 'Australia\'s unique wildlife — kangaroos, koalas, wombats, quolls — is found nowhere else on earth. The Great Barrier Reef adds an entire ocean ecosystem.' },
  { icon: '🏄', title: 'Surf & Ocean Culture', desc: 'Hawaii\'s North Shore, Byron Bay, Raglan in New Zealand — the Pacific rim is where surfing was born and where its greatest breaks still define the sport.' },
  { icon: '🪨', title: 'Sacred Landscapes', desc: 'Uluru, the thermal fields of Rotorua, the volcanic fire of the Big Island — the Pacific carries a geological energy and indigenous spiritual tradition found nowhere else.' },
]

const routes = [
  { title: 'Australia Grand Tour', days: '21 days', cities: 'Sydney → Great Barrier Reef → Uluru → Melbourne → Tasmania', desc: 'The full Australian experience from world-class harbour city to the red centre, reef and beyond.' },
  { title: 'New Zealand North & South', days: '16 days', cities: 'Auckland → Rotorua → Tongariro → Wellington → Queenstown → Milford Sound', desc: 'Both islands — volcanic north, fjord south. The most scenically diverse country per square kilometre on earth.' },
  { title: 'Polynesian Triangle', days: '14 days', cities: 'Tahiti → Bora Bora → Moorea → Rarotonga → Aitutaki', desc: 'French Polynesia\'s finest islands plus the Cook Islands\' secret lagoon.' },
  { title: 'Pacific Island Hop', days: '18 days', cities: 'Hawaii → Fiji → Vanuatu → New Caledonia → Sydney', desc: 'Across the Pacific from Hawaiian volcanoes to Australian harbour — island by island.' },
]

export default function PacificPage() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080a10,#081018,#080810)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(123,155,200,0.08) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            PACIFIC & OCEANIA
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            Pacific &<br /><em style={{ color: gold }}>Oceania</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            The world's largest ocean. The planet's most isolated islands. Ancient cultures that navigated by stars. Active volcanoes building new land. Lagoons so blue they look painted. The Pacific rewards those who make the journey.
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
            { num: '25,000+', label: 'Pacific Islands' },
            { num: '2,300km', label: 'Great Barrier Reef' },
            { num: '330', label: 'Fijian Islands' },
            { num: '#1', label: "World's Friendliest Culture (Fiji)" },
          ].map(s => (
            <div key={s.num} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.5vw,1.8rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
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

        {/* EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                Pacific <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                The Pacific demands long flights and rewards them handsomely — experiences that simply do not exist anywhere else on earth, from bungee jumping above an Alpine lake to swimming in a Polynesian lagoon at midnight.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {pacificTypes.map(type => (
                <div key={type.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{type.icon}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{type.title}</h3>
                  <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{type.desc}</p>
                </div>
              ))}
            </div>

            {/* Routes */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>CLASSIC PACIFIC ROUTES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
                {routes.map(route => (
                  <div key={route.title} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.08)', padding: '24px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: cream, fontWeight: 600, margin: 0 }}>{route.title}</h3>
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
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>PACIFIC BY SEASON</div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'May – Oct', desc: 'Dry season for Fiji, French Polynesia and Cook Islands — ideal weather, calm seas. Australian outback and reef at their best. New Zealand ski season Jun–Sep.', level: 'Peak Islands', color: '#f87171' },
                  { period: 'Sep – Nov', desc: 'Australian spring — Sydney and southeast Australia at their most beautiful. Great Barrier Reef warm and clear. New Zealand summer begins — Milford Sound access excellent.', level: 'Australia Peak', color: '#4ade80' },
                  { period: 'Dec – Mar', desc: 'New Zealand summer — Queenstown adventures, Milford Track perfect. Australia beach season. French Polynesia wet season — fewer crowds, lower prices, still warm.', level: 'NZ Summer', color: '#fbbf24' },
                  { period: 'Apr – May', desc: 'Shoulder season across most of the Pacific. Cyclone season ending in Polynesia. Great value for Fiji and Cook Islands before peak. Australia and NZ both pleasant.', level: 'Good Value', color: '#60a5fa' },
                ].map(row => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px', textAlign: 'center' as const }}>{row.level}</span>
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
                Planning Your <em style={{ color: gold }}>Pacific Trip</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Practical */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>PACIFIC ESSENTIALS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { icon: '✈', tip: 'The Pacific requires long-haul flights from most of the world. From Lagos: Sydney is ~20 hours via Dubai. From London: Sydney is ~22 hours. Build in a stopover — Singapore, Dubai or Hong Kong work well.' },
                    { icon: '⏰', tip: 'Jet lag is significant crossing to Australia and New Zealand. Arrive a day or two early before any important commitments. Eastward travel (Americas to Pacific) is harder than westward.' },
                    { icon: '🔌', tip: 'Australia and New Zealand use Type I plugs (unique to the region) — bring a universal adapter. French Polynesia uses French Type E/F plugs. Fiji uses Type I like Australia.' },
                    { icon: '💊', tip: 'No mandatory vaccinations for Australia, New Zealand or most Pacific islands. Tropical islands require standard precautions — Hepatitis A, Typhoid and sun protection are essential.' },
                    { icon: '💵', tip: 'Australia and New Zealand are expensive — budget $150–300 AUD/NZD per person per day. French Polynesia is very expensive — $300–600 USD/day at resorts. Fiji offers more value.' },
                    { icon: '📱', tip: 'Get a travel eSIM before departure — essential for navigating Australian cities and keeping connected on island hops. Roaming charges in the Pacific are extreme without a local solution.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                      <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>BUDGET GUIDE (PER PERSON / DAY)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Bora Bora', range: '$400–800/day', note: 'Ultra luxury' },
                    { dest: 'Cook Islands', range: '$200–500/day', note: 'Remote premium' },
                    { dest: 'Sydney / Melbourne', range: 'A$150–350/day', note: 'Major cities' },
                    { dest: 'Queenstown NZ', range: 'NZ$150–350/day', note: 'Adventure premium' },
                    { dest: 'French Polynesia', range: '$250–600/day', note: 'Resort dependent' },
                    { dest: 'Great Barrier Reef', range: 'A$150–400/day', note: 'Liveaboard extra' },
                    { dest: 'Fiji', range: '$100–300/day', note: 'Best Pacific value' },
                    { dest: 'Hawaii', range: '$150–350/day', note: 'US prices apply' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600, marginBottom: 2 }}>{item.range}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: dim }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visa */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>VISA OVERVIEW</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { heading: 'Australia', body: 'ETA (AUD $20) or eVisitor (free for EU) instantly online. Nigerian and most African nationals require a Tourist Visa (AUD $150) — apply at immi.homeaffairs.gov.au with bank statements and strong ties evidence. Australia is strict.' },
                    { heading: 'New Zealand', body: 'NZeTA (NZD $17–23) for eligible nationalities. Most require a Visitor Visa (NZD $211). Nigeria and most African passports require full visa application — apply at immigration.govt.nz well ahead.' },
                    { heading: 'French Polynesia', body: 'Part of France — EU passport holders enter freely. UK, US, Canadian and most Western nationalities enter visa-free for 90 days. Most African nationals require a French visa — apply through the French Embassy.' },
                    { heading: 'Fiji & Pacific Islands', body: 'Fiji is visa-free for most nationalities for 4 months including many African passports. Hawaii is USA — ESTA or B1/B2 visa rules apply. Cook Islands visa-free for most nationalities for 31 days.' },
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

        {/* eSIM */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 PACIFIC TRAVEL ESIM</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across Australia, New Zealand, Fiji, French Polynesia, Hawaii and every island in between</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET PACIFIC ESIM
          </Link>
        </div>

        {/* Related */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Asia & Far East', href: '/asia' },
            { label: 'The Americas', href: '/americas' },
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
