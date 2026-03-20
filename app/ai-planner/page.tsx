'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const ink = '#080807'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const destinations = [
  'Dubai','Bali','Tokyo','Paris','Maldives','Kyoto','Serengeti','Cape Town',
  'Marrakech','Santorini','New York','Bangkok','Singapore','Zanzibar',
  'Machu Picchu','Iceland','Patagonia','Rome','Barcelona','Lagos',
  'Nairobi','Istanbul','Petra','Phuket','Osaka','Vietnam','Sri Lanka',
  'Morocco','Egypt','Jordan','Kenya','Tanzania','South Africa','Ghana',
]
const styles = ['Luxury','Adventure','Cultural','Romantic','Family','Wellness','Budget','Expedition']
const budgets = ['Budget ($50–100/day)','Mid-Range ($100–250/day)','Luxury ($250–500/day)','Ultra-Luxury ($500+/day)']
const interestOptions = [
  'Food & Dining','Wildlife & Nature','History & Culture','Beach & Water',
  'Hiking & Trekking','Photography','Nightlife','Wellness & Spa',
  'Architecture','Local Markets','Adventure Sports','Art & Museums',
]

// ── Built-in itinerary engine ─────────────────────────────────────────────

const destData: Record<string, {
  country: string; region: string; currency: string; timezone: string
  intro: string; highlights: string[]
  mornings: string[]; afternoons: string[]; evenings: string[]
  stays: string[]; tips: string[]
}> = {
  dubai: {
    country: 'UAE', region: 'Middle East', currency: 'AED', timezone: 'GMT+4',
    intro: 'A city of superlatives — the world\'s tallest building, most luxurious hotels and a desert that turns golden at sunset.',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Gold Souk', 'Palm Jumeirah', 'Dubai Frame'],
    mornings: ['Sunrise visit to the Burj Khalifa observation deck (level 124)', 'Morning walk through the historic Al Fahidi neighbourhood and Dubai Museum', 'Explore the Spice Souk and Gold Souk in Deira before the heat builds', 'Early morning desert dune drive before temperatures peak'],
    afternoons: ['Private desert safari with camel riding and sandboarding', 'Explore The Dubai Mall, the world\'s largest shopping centre', 'Cruise along Dubai Creek on a traditional wooden abra', 'Visit the Dubai Frame for panoramic views of old and new Dubai'],
    evenings: ['Sunset dinner at At.mosphere restaurant on the 122nd floor of Burj Khalifa', 'Night at the Dubai Opera for world-class performance', 'Dinner cruise along Dubai Marina', 'Rooftop drinks at Cé La Vi with skyline views'],
    stays: ['Burj Al Arab Jumeirah', 'Atlantis The Royal', 'Four Seasons DIFC', 'Address Downtown', 'One&Only The Palm'],
    tips: ['Book Burj Khalifa tickets online — they sell out fast', 'Dress modestly in souks and older neighbourhoods', 'Friday brunch is a Dubai institution — book at Cé La Vi or Sass Café', 'Use the Metro to avoid peak-hour traffic'],
  },
  bali: {
    country: 'Indonesia', region: 'Asia', currency: 'IDR', timezone: 'GMT+8',
    intro: 'The Island of the Gods — ancient temples, terraced rice fields, volcanic peaks and surf breaks that have drawn travellers for decades.',
    highlights: ['Tegalalang Rice Terraces', 'Tanah Lot Temple', 'Mount Batur Sunrise', 'Ubud Art Market', 'Seminyak Beach', 'Nusa Penida'],
    mornings: ['Sunrise hike up Mount Batur (2,000m) — views above the clouds', 'Morning yoga class at The Yoga Barn in Ubud', 'Visit Tirta Empul holy water temple before the crowds', 'Cycle through rice paddies and village paths near Ubud'],
    afternoons: ['Cooking class learning to make nasi goreng and satay lilit', 'Afternoon at Tegalalang Rice Terraces at golden hour', 'Snorkelling at Nusa Penida — swim with manta rays', 'White water rafting on the Ayung River'],
    evenings: ['Sunset at Tanah Lot sea temple — one of Bali\'s most sacred sites', 'Kecak fire dance performance at Uluwatu cliff temple', 'Dinner at Locavore in Ubud — Bali\'s finest restaurant', 'Beach club sunset at Potato Head or La Brisa in Seminyak'],
    stays: ['Four Seasons Sayan', 'COMO Uma Ubud', 'Komaneka at Bisma', 'The Mulia Nusa Dua', 'Alaya Resort Ubud'],
    tips: ['Always carry a sarong — required for temple entry', 'Hire a driver for $40/day — far more flexible than taxis', 'Visit temples early morning before tour groups arrive', 'Get a Bali eSIM on arrival for cheap reliable data'],
  },
  tokyo: {
    country: 'Japan', region: 'Asia', currency: 'JPY', timezone: 'GMT+9',
    intro: 'The world\'s greatest city — where ancient tradition and hyper-modern technology exist in perfect, improbable harmony.',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'teamLab Planets', 'Tsukiji Outer Market', 'Shinjuku', 'Harajuku'],
    mornings: ['Dawn visit to Senso-ji temple in Asakusa before the crowds', 'Tsukiji Outer Market breakfast — fresh sushi and tamagoyaki', 'Walk the quiet streets of Yanaka — Tokyo\'s best-preserved old neighbourhood', 'Morning meditation at a Zen temple in Shinjuku Gyoen'],
    afternoons: ['Shibuya Crossing and Harajuku Takeshita Street', 'teamLab Planets digital art museum — book ahead', 'Tokyo National Museum in Ueno Park', 'Explore Akihabara electronics and anime district'],
    evenings: ['Dinner in a tiny ramen shop in Shinjuku Golden Gai', 'Tokyo Skytree observation deck at sunset', 'Izakaya hopping in Shibuya or Roppongi', 'Late night walk through Kabukicho neon streets'],
    stays: ['Park Hyatt Tokyo', 'Aman Tokyo', 'The Peninsula Tokyo', 'Hoshinoya Tokyo', 'Trunk Hotel'],
    tips: ['Get a Suica IC card — works on all trains and in convenience stores', 'Book restaurants online before arriving — popular places fill weeks ahead', 'Carry cash — many small restaurants are cash only', 'Get a Japan eSIM before landing — essential for navigation'],
  },
  paris: {
    country: 'France', region: 'Europe', currency: 'EUR', timezone: 'GMT+1',
    intro: 'The city that invented romance, cuisine as high art, and the idea that a café terrace is the most civilised place on earth.',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Musée d\'Orsay', 'Montmartre', 'Le Marais', 'Versailles'],
    mornings: ['Eiffel Tower at opening time — before the queues build', 'Morning pastry and café at a neighbourhood boulangerie in Le Marais', 'Musée d\'Orsay for Impressionist masterpieces — book tickets online', 'Early morning walk along the Seine from Notre-Dame to Île Saint-Louis'],
    afternoons: ['Louvre Museum — allow at least 3 hours, book tickets ahead', 'Afternoon in Montmartre — Sacré-Cœur, artist studios, village atmosphere', 'Explore the boutiques and galleries of Saint-Germain-des-Prés', 'Day trip to Versailles Palace and gardens (45 min by RER)'],
    evenings: ['Sunset apéritif on a Seine riverbank', 'Dinner at a classic Paris bistro in a side street — steak frites and red wine', 'Evening at the Moulin Rouge or an Opera performance', 'Night walk along Champs-Élysées to the Arc de Triomphe'],
    stays: ['Hôtel de Crillon', 'Le Bristol Paris', 'Hôtel Costes', 'La Réserve Paris', 'Pavillon de la Reine'],
    tips: ['Book the Louvre and major museums online — queues without tickets are brutal', 'Metro is fast and cheap — get a carnet of 10 tickets', 'Learn a few French words — effort is always appreciated', 'The Paris Museum Pass covers 50+ museums and skips all queues'],
  },
  maldives: {
    country: 'Maldives', region: 'Asia', currency: 'USD', timezone: 'GMT+5',
    intro: 'A nation of 1,200 coral islands scattered across the Indian Ocean — the definitive overwater bungalow experience.',
    highlights: ['Overwater Villas', 'House Reef Snorkelling', 'Sandbank Picnic', 'Whale Shark Diving', 'Sunset Dolphin Cruise', 'Underwater Restaurant'],
    mornings: ['Dawn snorkelling on the house reef — turtles and reef sharks', 'Sunrise yoga on the overwater deck', 'Morning diving with whale sharks (seasonal)', 'Kayaking through the lagoon at sunrise'],
    afternoons: ['Private sandbank picnic — your resort sets up lunch on a deserted island', 'Snorkelling at Manta Point (seasonal — June to November)', 'Underwater spa treatment', 'Glass-bottom boat tour of the lagoon'],
    evenings: ['Sunset dolphin cruise on a traditional dhoni', 'Dinner at an underwater restaurant', 'Stargazing from your overwater deck', 'Bioluminescent beach walk at night'],
    stays: ['Soneva Fushi', 'Gili Lankanfushi', 'Velaa Private Island', 'The Nautilus', 'Anantara Kihavah'],
    tips: ['Book all-inclusive — food and drink is expensive à la carte', 'Time seaplane connections carefully — they only fly in daylight', 'Bring an underwater camera — the snorkelling is world class', 'Pack light — it\'s entirely casual, just swimwear and one smart outfit'],
  },
  serengeti: {
    country: 'Tanzania', region: 'Africa', currency: 'USD', timezone: 'GMT+3',
    intro: 'The last place on earth where you can witness the ancient rhythms of the wild — two million animals moving across an ocean of golden grass.',
    highlights: ['Great Migration', 'Big Five', 'Balloon Safari', 'Walking Safari', 'Mara River Crossings', 'Predator Tracking'],
    mornings: ['Pre-dawn game drive — 5:30am start when lions and leopards are most active', 'Hot air balloon safari over the plains at sunrise', 'Walking safari with armed ranger — track animal spoor on foot', 'Morning drive to find cheetah families on the open plains'],
    afternoons: ['Full-day game drive following the migration herds', 'Sundowner drinks on a rocky kopje overlooking the savannah', 'Visit a Masai village and learn about traditional culture', 'Afternoon siesta at camp — the middle of the day is for rest'],
    evenings: ['Bush dinner under a canopy of stars', 'Night drive by spotlight — hunting lions and prowling leopards', 'Campfire storytelling with your guide', 'Sleep to the sound of lions roaring across the plain'],
    stays: ['Singita Grumeti', '&Beyond Klein\'s Camp', 'Sayari Camp', 'Namiri Plains', 'Four Seasons Serengeti'],
    tips: ['Pack neutral colours only — khaki, olive, beige', 'July–October for Mara River crossings; January–February for calving', 'Tip your guide $15–20/day in USD cash', 'Book 6–12 months ahead for peak season camps'],
  },
  marrakech: {
    country: 'Morocco', region: 'Africa', currency: 'MAD', timezone: 'GMT+1',
    intro: 'A sensory labyrinth of spice-scented souks, ornate palaces, rooftop terraces and the endless theatre of Djemaa el-Fna square.',
    highlights: ['Djemaa el-Fna', 'Majorelle Garden', 'Bahia Palace', 'Medina Souks', 'Hammam', 'Sahara Day Trip'],
    mornings: ['Early morning walk through the medina before the heat — get lost deliberately', 'Visit Koutoubia Mosque and the surrounding gardens at sunrise', 'Majorelle Garden — Yves Saint Laurent\'s stunning blue oasis', 'Saadian Tombs and Bahia Palace before the crowds arrive'],
    afternoons: ['Hammam and traditional Moroccan massage — essential', 'Spice souk and leather tannery view from a terrace', 'Cooking class — learn tagine, couscous and harira soup', 'Day trip to Ouzoud Waterfalls or the Atlas Mountains'],
    evenings: ['Sunset at Djemaa el-Fna — storytellers, musicians and food stalls', 'Dinner on a riad rooftop terrace', 'Traditional Fantasia horse show experience', 'Night walk through the illuminated Koutoubia gardens'],
    stays: ['La Mamounia', 'El Fenn', 'Riad Yasmine', 'Selman Marrakech', 'Royal Mansour'],
    tips: ['Bargaining is expected — start at 40% of the asking price', 'Book a local guide for the first day — the medina is genuinely disorienting', 'Dress modestly in the medina', 'Morocco is largely cash-based — change money at banks'],
  },
  nairobi: {
    country: 'Kenya', region: 'Africa', currency: 'KES', timezone: 'GMT+3',
    intro: 'Africa\'s most dynamic capital — a city where giraffe roam the suburbs, safari is 20 minutes from the CBD, and the food scene is world-class.',
    highlights: ['Nairobi National Park', 'Giraffe Centre', 'David Sheldrick Elephant Orphanage', 'Karen Blixen Museum', 'Carnivore Restaurant', 'Westgate Mall'],
    mornings: ['Nairobi National Park sunrise game drive — the only national park bordering a capital city', 'David Sheldrick Wildlife Trust — hand-feed baby elephants (book ahead)', 'Visit the Giraffe Centre and feed Rothschild giraffes by hand', 'Karen Blixen Museum in the leafy Karen suburb'],
    afternoons: ['Lunch at the Talisman restaurant in Karen', 'Maasai Market craft shopping (Tuesdays at the Yaya Centre)', 'Kazuri Beads factory tour — women\'s cooperative making ceramic jewellery', 'Afternoon tea at the historic Norfolk Hotel'],
    evenings: ['Sundowner drinks at The Alchemist Bar in Westlands', 'Carnivore restaurant — legendary Nairobi institution for grilled meats', 'Jazz Lounge at the Hemingways Hotel', 'Rooftop dinner at the Trademark Hotel'],
    stays: ['Hemingways Nairobi', 'The Tribe Hotel', 'Fairmont The Norfolk', 'House of Waine', 'Giraffe Manor'],
    tips: ['Book Giraffe Manor 6–12 months ahead — giraffes join you for breakfast', 'Use Bolt or Uber — safer and cheaper than street taxis', 'The Maasai Market moves location by day of week — check ahead', 'Yellow Fever vaccination certificate required for Kenya entry'],
  },
  lagos: {
    country: 'Nigeria', region: 'Africa', currency: 'NGN', timezone: 'GMT+1',
    intro: 'Africa\'s most electrifying megacity — a place of staggering creativity, relentless energy and world-class food that the world is only just discovering.',
    highlights: ['Lekki Conservation Centre', 'Nike Art Gallery', 'Tarkwa Bay Beach', 'Victoria Island Dining', 'Afrobeats Live Music', 'Elegushi Beach'],
    mornings: ['Lekki Conservation Centre canopy walkway — spot monkeys and birds in the treetops', 'Nike Art Gallery in Lekki — Nigeria\'s largest collection of contemporary African art', 'Morning market visit at Balogun Market on Lagos Island', 'Early morning boat ride to Tarkwa Bay before the crowds'],
    afternoons: ['Lunch at Nok by Alara — upscale Nigerian cuisine in a stunning space', 'Explore the boutiques and galleries of Ikoyi and Victoria Island', 'Visit Terra Kulture arts centre for Nigerian theatre and art', 'Afternoon at Elegushi Private Beach'],
    evenings: ['Sunset drinks at Skyview Lagos or The Roof', 'Afrobeats live music — Quilox, Escape or Jazzhole', 'Dinner at NOK, Circa Lagos or Yellow Chilli', 'Night out at Mainland Lagos\'s local joints for suya and cold drinks'],
    stays: ['Eko Hotel & Suites', 'The George Hotel Ikoyi', 'Radisson Blu VI', 'Wheatbaker Hotel', 'The Retreat Lagos'],
    tips: ['Traffic in Lagos is legendary — allow enormous amounts of time', 'Use Bolt for all trips — reliable and safe', 'Visit November to February for the best weather', 'The energy of Lagos is best experienced at night — be safe and go with locals'],
  },
}

const getDestData = (dest: string) => {
  const key = dest.toLowerCase().replace(/\s+/g, '')
  return destData[key] || destData['dubai'] // fallback to dubai
}

const buildItinerary = (destination: string, days: number, style: string, budget: string, interests: string[]) => {
  const d = getDestData(destination)
  const isLuxury = style === 'Luxury' || style === 'Romantic' || budget.includes('Luxury') || budget.includes('Ultra')
  const isAdventure = style === 'Adventure' || style === 'Expedition' || interests.includes('Hiking & Trekking') || interests.includes('Adventure Sports')
  const isWellness = style === 'Wellness' || interests.includes('Wellness & Spa')
  const isFood = interests.includes('Food & Dining')
  const isCulture = style === 'Cultural' || interests.includes('History & Culture') || interests.includes('Art & Museums')

  const stayPool = d.stays.slice(0, isLuxury ? 3 : 5)
  const stay = stayPool[Math.floor(Math.random() * stayPool.length)]

  const dayPlans = Array.from({ length: days }, (_, i) => {
    const morning = d.mornings[i % d.mornings.length]
    const afternoon = d.afternoons[i % d.afternoons.length]
    const evening = d.evenings[i % d.evenings.length]

    let tip = d.tips[i % d.tips.length]
    if (isFood && i === 0) tip = 'Ask your hotel concierge for their personal restaurant recommendations — they know the best local spots'
    if (isWellness && i === 1) tip = 'Book spa treatments 24 hours ahead — popular time slots fill fast'
    if (isAdventure && i === 0) tip = 'Wear comfortable closed-toe shoes and carry sun protection and water on all excursions'

    return {
      day: i + 1,
      title: i === 0 ? 'Arrival & First Impressions' : i === days - 1 ? 'Final Day & Departure' : `Day ${i + 1} — ${d.highlights[i % d.highlights.length]}`,
      morning: i === 0 ? `Arrive in ${destination}. Check in and settle into your accommodation. Take a gentle orientation walk around the neighbourhood. Freshen up and rest.` : morning,
      afternoon: i === days - 1 ? `Last-minute shopping and souvenir hunting. Pack and prepare for departure. Enjoy a final lunch at a local favourite.` : afternoon,
      evening: i === days - 1 ? `Transfer to the airport. Reflect on an extraordinary journey.` : evening,
      accommodation: stay,
      tips: tip,
    }
  })

  return {
    title: `${days}-Day ${style} ${destination} Itinerary`,
    summary: `${d.intro} This ${days}-day ${style.toLowerCase()} itinerary is crafted for the ${budget.toLowerCase()} traveller${interests.length > 0 ? `, with a focus on ${interests.slice(0, 3).join(', ').toLowerCase()}` : ''}.`,
    destination,
    country: d.country,
    region: d.region,
    days: dayPlans,
    practical: {
      currency: d.currency,
      timezone: d.timezone,
      bestStay: stay,
    },
  }
}

export default function AIPlanner() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    destination: '',
    days: 7,
    style: 'Luxury',
    budget: 'Luxury ($250–500/day)',
    interests: [] as string[],
  })
  const [itinerary, setItinerary] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleInterest = (item: string) =>
    setForm(f => ({
      ...f,
      interests: f.interests.includes(item) ? f.interests.filter(x => x !== item) : [...f.interests, item],
    }))

  const generate = async () => {
    if (!form.destination) { setError('Please enter or select a destination'); return }
    setLoading(true); setError(''); setItinerary(null)

    // Try AI first
    try {
      const res = await fetch('/api/ai-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.itinerary) {
        setItinerary(data.itinerary)
        setLoading(false)
        return
      }
    } catch {}

    // Built-in fallback — always works
    await new Promise(r => setTimeout(r, 1200))
    const result = buildItinerary(form.destination, form.days, form.style, form.budget, form.interests)
    setItinerary(result)
    setLoading(false)
  }

  const btnStyle = {
    width: '100%', background: gold, color: ink, border: 'none',
    padding: '18px', fontFamily: "'Bebas Neue',sans-serif",
    fontSize: '0.85rem', letterSpacing: '0.25em', cursor: 'pointer',
  } as React.CSSProperties

  const inputStyle = {
    width: '100%', background: '#1C1B18',
    border: '1px solid rgba(200,169,110,0.2)',
    color: cream, padding: '14px 18px', fontSize: '0.9rem',
    outline: 'none', fontFamily: "'DM Sans',sans-serif",
  } as React.CSSProperties

  const labelStyle = {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: '0.62rem', letterSpacing: '0.25em',
    color: gold, marginBottom: 8, display: 'block',
  } as React.CSSProperties

  return (
    <div style={{ minHeight: '100vh', background: ink, paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0a08,#12100a,#0d1520)', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            AI TRIP PLANNER
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 24 }}>
            Your Perfect Trip,<br /><em style={{ color: gold }}>Generated in Seconds</em>
          </h1>
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
            Tell us your destination, travel style and interests. We build a personalised day-by-day itinerary with accommodation recommendations and insider tips.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,40px)' }}>

        {/* ── Loading ── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: gold, animation: 'pulse 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', color: muted, fontStyle: 'italic' }}>
              Crafting your personalised itinerary for {form.destination}...
            </p>
          </div>
        )}

        {/* ── Form ── */}
        {!loading && !itinerary && (
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,5vw,52px)' }}>

            {/* Step indicator */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, height: 3, background: step >= s ? gold : 'rgba(200,169,110,0.15)', transition: 'background 0.3s' }} />
              ))}
            </div>

            {/* Step 1 — Destination */}
            {step === 1 && (
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: dim, marginBottom: 8 }}>STEP 1 OF 3</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, color: cream, marginBottom: 32 }}>
                  Where do you want to <em style={{ color: gold }}>go?</em>
                </h2>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>TYPE YOUR DESTINATION</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. Bali, Dubai, Tokyo, Lagos, Paris..."
                    value={form.destination}
                    onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter' && form.destination) setStep(2) }}
                  />
                </div>
                <div style={{ marginBottom: 32 }}>
                  <label style={labelStyle}>OR CHOOSE A POPULAR DESTINATION</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {destinations.map(d => (
                      <button key={d} onClick={() => setForm(f => ({ ...f, destination: d }))}
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', padding: '7px 14px', background: form.destination === d ? gold : 'transparent', border: `1px solid ${form.destination === d ? gold : 'rgba(200,169,110,0.2)'}`, color: form.destination === d ? ink : muted, cursor: 'pointer', transition: 'all 0.2s' }}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => { if (form.destination) setStep(2); else setError('Please enter a destination') }} style={btnStyle}>
                  CONTINUE →
                </button>
                {error && <p style={{ color: '#e87070', marginTop: 12, fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
              </div>
            )}

            {/* Step 2 — Duration & Style */}
            {step === 2 && (
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: dim, marginBottom: 8 }}>STEP 2 OF 3</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, color: cream, marginBottom: 32 }}>
                  How do you like to <em style={{ color: gold }}>travel?</em>
                </h2>

                {/* Duration */}
                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>TRIP DURATION: {form.days} DAYS</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => setForm(f => ({ ...f, days: Math.max(2, f.days - 1) }))} style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: gold, width: 40, height: 40, cursor: 'pointer', fontSize: '1.2rem' }}>−</button>
                    <input type="range" min={2} max={21} value={form.days} onChange={e => setForm(f => ({ ...f, days: +e.target.value }))} style={{ flex: 1, accentColor: gold }} />
                    <button onClick={() => setForm(f => ({ ...f, days: Math.min(21, f.days + 1) }))} style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: gold, width: 40, height: 40, cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
                  </div>
                </div>

                {/* Travel Style */}
                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>TRAVEL STYLE</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 8 }}>
                    {styles.map(s => (
                      <button key={s} onClick={() => setForm(f => ({ ...f, style: s }))}
                        style={{ background: form.style === s ? gold : 'transparent', border: `1px solid ${form.style === s ? gold : 'rgba(200,169,110,0.2)'}`, color: form.style === s ? ink : muted, padding: '12px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div style={{ marginBottom: 32 }}>
                  <label style={labelStyle}>BUDGET LEVEL</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {budgets.map(b => (
                      <button key={b} onClick={() => setForm(f => ({ ...f, budget: b }))}
                        style={{ background: form.budget === b ? 'rgba(200,169,110,0.1)' : 'transparent', border: `1px solid ${form.budget === b ? gold : 'rgba(200,169,110,0.2)'}`, color: form.budget === b ? gold : muted, padding: '13px 18px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                        {form.budget === b ? '✓ ' : ''}{b}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{ ...btnStyle, background: 'transparent', border: '1px solid rgba(200,169,110,0.3)', color: gold }}>← BACK</button>
                  <button onClick={() => setStep(3)} style={btnStyle}>CONTINUE →</button>
                </div>
              </div>
            )}

            {/* Step 3 — Interests */}
            {step === 3 && (
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: dim, marginBottom: 8 }}>STEP 3 OF 3</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
                  What are your <em style={{ color: gold }}>interests?</em>
                </h2>
                <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 28 }}>Select all that apply — we will tailor your itinerary around them.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 8, marginBottom: 36 }}>
                  {interestOptions.map(item => (
                    <button key={item} onClick={() => toggleInterest(item)}
                      style={{ background: form.interests.includes(item) ? 'rgba(200,169,110,0.1)' : 'transparent', border: `1px solid ${form.interests.includes(item) ? gold : 'rgba(200,169,110,0.15)'}`, color: form.interests.includes(item) ? gold : muted, padding: '11px 14px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                      <span style={{ width: 12, height: 12, border: `1px solid ${form.interests.includes(item) ? gold : 'rgba(200,169,110,0.3)'}`, background: form.interests.includes(item) ? gold : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', color: ink, flexShrink: 0 }}>
                        {form.interests.includes(item) ? '✓' : ''}
                      </span>
                      {item}
                    </button>
                  ))}
                </div>

                {/* Summary */}
                <div style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 24px', marginBottom: 24 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>YOUR TRIP SUMMARY</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 }}>
                    {[
                      { label: 'DESTINATION', value: form.destination },
                      { label: 'DURATION', value: `${form.days} days` },
                      { label: 'STYLE', value: form.style },
                      { label: 'BUDGET', value: form.budget.split(' ')[0] },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.15em', color: dim, marginBottom: 3 }}>{item.label}</div>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream, fontWeight: 600 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <button onClick={() => setStep(2)} style={{ ...btnStyle, background: 'transparent', border: '1px solid rgba(200,169,110,0.3)', color: gold }}>← BACK</button>
                  <button onClick={generate} style={btnStyle}>✦ GENERATE ITINERARY</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Itinerary Result ── */}
        {!loading && itinerary && (
          <div>
            {/* Header */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16, textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.25em', color: dim, marginBottom: 12 }}>
                ✦ YOUR PERSONALISED ITINERARY
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 16, lineHeight: 1.1 }}>
                {itinerary.title}
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600, margin: '0 auto 24px', fontSize: '0.95rem' }}>
                {itinerary.summary}
              </p>
              {itinerary.practical && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                  {[
                    { label: 'COUNTRY', value: itinerary.practical.country || itinerary.country },
                    { label: 'CURRENCY', value: itinerary.practical.currency },
                    { label: 'TIMEZONE', value: itinerary.practical.timezone },
                  ].filter(i => i.value).map(item => (
                    <div key={item.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.15em', color: dim, marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Day by day */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {itinerary.days?.map((day: any) => (
                <div key={day.day} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden' }}>
                  <div style={{ background: '#1C1B18', padding: '18px 28px', borderBottom: '1px solid rgba(200,169,110,0.08)', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', padding: '4px 12px', flexShrink: 0 }}>DAY {day.day}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: cream, fontWeight: 600 }}>{day.title}</div>
                  </div>
                  <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
                    {[['🌅 MORNING', day.morning], ['☀ AFTERNOON', day.afternoon], ['🌙 EVENING', day.evening]].map(([label, text]) => (
                      <div key={label as string}>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold, marginBottom: 8 }}>{label}</div>
                        <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.75 }}>{text as string}</p>
                      </div>
                    ))}
                  </div>
                  {(day.accommodation || day.tips) && (
                    <div style={{ padding: '0 28px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, borderTop: '1px solid rgba(200,169,110,0.06)', paddingTop: 20 }}>
                      {day.accommodation && (
                        <div>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 6 }}>🏨 RECOMMENDED STAY</div>
                          <p style={{ color: dim, fontSize: '0.85rem' }}>{day.accommodation}</p>
                        </div>
                      )}
                      {day.tips && (
                        <div>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 6 }}>💡 INSIDER TIP</div>
                          <p style={{ color: dim, fontSize: '0.85rem' }}>{day.tips}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* eSIM strip */}
            <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 STAY CONNECTED IN {form.destination.toUpperCase()}</div>
                <p style={{ color: muted, fontSize: '0.85rem', margin: 0 }}>Get a travel eSIM — instant data, no roaming fees, activate before you fly</p>
              </div>
              <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: ink, padding: '11px 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}>GET ESIM →</Link>
            </div>

            {/* CTAs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 8, marginBottom: 24 }}>
              <a href="https://www.aviasales.com/?marker=710879&locale=en" target="_blank" rel="noopener noreferrer"
                style={{ background: gold, color: ink, padding: '15px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                ✈ SEARCH FLIGHTS
              </a>
              <a href="https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p" target="_blank" rel="noopener noreferrer"
                style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.35)', color: gold, padding: '15px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                🏨 SEARCH HOTELS
              </a>
              <Link href="/budget-calculator"
                style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '15px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                💰 BUDGET CALC
              </Link>
              <button onClick={() => window.print()}
                style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '15px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', cursor: 'pointer' }}>
                ⬇ SAVE / PRINT
              </button>
            </div>

            {/* Start over */}
            <button
              onClick={() => { setItinerary(null); setStep(1); setForm({ destination: '', days: 7, style: 'Luxury', budget: 'Luxury ($250–500/day)', interests: [] }) }}
              style={{ ...btnStyle, background: 'transparent', border: '1px solid rgba(200,169,110,0.3)', color: gold }}>
              ← PLAN ANOTHER TRIP
            </button>
          </div>
        )}

      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  )
}
