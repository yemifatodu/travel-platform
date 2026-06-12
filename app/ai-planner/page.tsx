'use client'
import { useState, useEffect } from 'react'

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

const budgets = [
  'Budget ($50–100/day)',
  'Mid-Range ($100–250/day)',
  'Luxury ($250–500/day)',
  'Ultra-Luxury ($500+/day)'
]

const interestOptions = [
  'Food & Dining','Wildlife & Nature','History & Culture','Beach & Water',
  'Hiking & Trekking','Photography','Nightlife','Wellness & Spa',
  'Architecture','Local Markets','Adventure Sports','Art & Museums',
]

// ── DATA ENGINE ─────────────────────────────────────────────

const destData: Record<string, any> = {
  dubai: {
    country: 'UAE',
    region: 'Middle East',
    currency: 'AED',
    timezone: 'GMT+4',
    intro: `A city of superlatives — the world's tallest building, most luxurious hotels and a desert that turns golden at sunset.`,
    highlights: ['Burj Khalifa','Desert Safari','Dubai Mall','Gold Souk','Palm Jumeirah','Dubai Frame'],
    mornings: [
      'Sunrise visit to the Burj Khalifa observation deck (level 124)',
      'Morning walk through Al Fahidi neighbourhood and Dubai Museum',
      'Explore Spice Souk and Gold Souk in Deira',
      'Early morning desert dune drive before heat builds'
    ],
    afternoons: [
      'Private desert safari with camel riding and sandboarding',
      'Explore The Dubai Mall',
      'Cruise Dubai Creek on a traditional abra',
      'Visit Dubai Frame for panoramic views'
    ],
    evenings: [
      'Dinner at At.mosphere on the 122nd floor',
      'Dubai Opera performance',
      'Dinner cruise in Dubai Marina',
      'Rooftop drinks at Cé La Vi'
    ],
    stays: ['Burj Al Arab Jumeirah','Atlantis The Royal','Four Seasons DIFC','Address Downtown','One&Only The Palm'],
    tips: [
      'Book Burj Khalifa tickets early',
      'Dress modestly in older areas',
      'Friday brunch is a Dubai tradition',
      'Use Metro to avoid traffic'
    ],
  },
  bali: {
    country: 'Indonesia',
    region: 'Asia',
    currency: 'IDR',
    timezone: 'GMT+8',
    intro: `The Island of the Gods — ancient temples, terraced rice fields, volcanic peaks and surf breaks that have drawn travellers for decades.`,
    highlights: ['Tegalalang Rice Terraces','Tanah Lot Temple','Mount Batur','Ubud','Seminyak','Nusa Penida'],
    mornings: [
      'Sunrise hike up Mount Batur above the clouds',
      'Morning yoga in Ubud',
      'Visit Tirta Empul temple early',
      'Cycle through rice paddies near Ubud'
    ],
    afternoons: [
      'Cooking class: nasi goreng and satay',
      'Golden hour at rice terraces',
      'Snorkelling at Nusa Penida',
      'White water rafting on Ayung River'
    ],
    evenings: [
      'Sunset at Tanah Lot temple',
      'Kecak fire dance at Uluwatu',
      'Dinner at Locavore',
      'Beach club sunset in Seminyak'
    ],
    stays: ['Four Seasons Sayan','COMO Uma Ubud','Komaneka Bisma','The Mulia','Alaya Resort Ubud'],
    tips: [
      'Carry a sarong for temples',
      'Hire a driver daily',
      'Visit temples early',
      'Use eSIM on arrival'
    ],
  },
  tokyo: {
    country: 'Japan',
    region: 'Asia',
    currency: 'JPY',
    timezone: 'GMT+9',
    intro: `The world's greatest city — where ancient tradition and hyper-modern technology exist in harmony.`,
    highlights: ['Shibuya','Senso-ji','teamLab Planets','Tsukiji','Shinjuku','Harajuku'],
    mornings: [
      'Sunrise at Senso-ji temple',
      'Tsukiji sushi breakfast',
      'Yanaka old town walk',
      'Zen meditation in Shinjuku Gyoen'
    ],
    afternoons: [
      'Shibuya Crossing',
      'teamLab Planets museum',
      'Tokyo National Museum',
      'Akihabara district'
    ],
    evenings: [
      'Ramen in Golden Gai',
      'Tokyo Skytree sunset',
      'Izakaya hopping',
      'Kabukicho night walk'
    ],
    stays: ['Park Hyatt Tokyo','Aman Tokyo','Peninsula Tokyo','Hoshinoya','Trunk Hotel'],
    tips: [
      'Use Suica card',
      'Book restaurants early',
      'Carry cash',
      'Get eSIM before arrival'
    ],
  },
  paris: {
    country: 'France',
    region: 'Europe',
    currency: 'EUR',
    timezone: 'GMT+1',
    intro: `The city that defines romance, cuisine and café culture.`,
    highlights: ['Eiffel Tower','Louvre','Orsay','Montmartre','Le Marais','Versailles'],
    mornings: [
      'Eiffel Tower early access',
      'Le Marais bakery breakfast',
      'Orsay Museum visit',
      'Seine riverside walk'
    ],
    afternoons: [
      'Louvre exploration',
      'Montmartre village',
      'Saint-Germain shopping',
      'Versailles day trip'
    ],
    evenings: [
      'Seine sunset drinks',
      'Paris bistro dinner',
      'Moulin Rouge show',
      'Champs-Élysées night walk'
    ],
    stays: ['Hôtel de Crillon','Le Bristol','Hôtel Costes','La Réserve','Pavillon Reine'],
    tips: [
      'Book museums online',
      'Use Metro',
      'Learn basic French',
      'Use museum pass'
    ],
  },
  maldives: {
    country: 'Maldives',
    region: 'Asia',
    currency: 'USD',
    timezone: 'GMT+5',
    intro: `A nation of coral islands and overwater villas in the Indian Ocean.`,
    highlights: ['Villas','Snorkelling','Sandbank','Whale Sharks','Dolphins','Underwater Dining'],
    mornings: [
      'Sunrise snorkelling',
      'Overwater yoga',
      'Whale shark diving',
      'Kayaking lagoon'
    ],
    afternoons: [
      'Private sandbank picnic',
      'Manta ray snorkelling',
      'Underwater spa',
      'Glass boat tour'
    ],
    evenings: [
      'Sunset dolphin cruise',
      'Underwater dining',
      'Stargazing villa deck',
      'Bioluminescent beach'
    ],
    stays: ['Soneva Fushi','Gili Lankanfushi','Velaa','Nautilus','Anantara Kihavah'],
    tips: [
      'Go all-inclusive',
      'Daylight seaplanes only',
      'Bring underwater camera',
      'Pack light'
    ],
  },
  kyoto: {
    country: 'Japan',
    region: 'Asia',
    currency: 'JPY',
    timezone: 'GMT+9',
    intro: `Japan's cultural heart — ancient temples, traditional tea houses, and stunning bamboo forests.`,
    highlights: ['Fushimi Inari','Arashiyama Bamboo','Kinkaku-ji','Gion','Nijo Castle','Philosopher\'s Path'],
    mornings: [
      'Early morning Fushimi Inari hike',
      'Arashiyama bamboo forest walk',
      'Tea ceremony in Gion',
      'Kinkaku-ji golden pavilion visit'
    ],
    afternoons: [
      'Nishiki Market food tour',
      'Philosopher\'s Path walk',
      'Kyoto Imperial Palace',
      'Kimono rental and photoshoot'
    ],
    evenings: [
      'Gion geisha district walk',
      'Pontocho alley dinner',
      'Traditional kaiseki meal',
      'Night temple illumination'
    ],
    stays: ['Hiiragiya Ryokan','Four Seasons Kyoto','Ritz-Carlton Kyoto','Gion Hatanaka','Seikoro Inn'],
    tips: ['Buy bus pass','Visit temples early','Try kaiseki','Reserve ryokan in advance'],
  },
  serengeti: {
    country: 'Tanzania',
    region: 'Africa',
    currency: 'TZS',
    timezone: 'GMT+3',
    intro: `The most iconic wildlife destination on Earth — endless plains, great migration, and the big five.`,
    highlights: ['Great Migration','Big Five','Ngorongoro Crater','Seronera River','Balloon Safari','Masai Village'],
    mornings: [
      'Game drive at sunrise',
      'Hot air balloon safari',
      'Ngorongoro Crater descent',
      'Early morning wildlife photography'
    ],
    afternoons: [
      'River crossing viewing',
      'Picnic in the plains',
      'Masai village visit',
      'Rhino spotting'
    ],
    evenings: [
      'Sundowner in the bush',
      'Lodge deck stargazing',
      'Traditional dance performance',
      'Night game drive'
    ],
    stays: ['Four Seasons Serengeti','Singita Sasakwa','&Beyond Serengeti','Asilia Namiri Plains','Lemala Nanyukie'],
    tips: ['Dry season best','Bring binoculars','Pack neutral colors','Book early for migration'],
  },
  cagetown: {
    country: 'South Africa',
    region: 'Africa',
    currency: 'ZAR',
    timezone: 'GMT+2',
    intro: `Where mountains meet the ocean — table mountain, pristine beaches, and world-class winelands.`,
    highlights: ['Table Mountain','Cape of Good Hope','Robben Island','V&A Waterfront','Kirstenbosch','Boulders Beach'],
    mornings: [
      'Table Mountain cable car',
      'Boulders Beach penguins',
      'Kirstenbosch Botanical Garden',
      'Bo-Kaap colorful houses walk'
    ],
    afternoons: [
      'Cape Point hike',
      'Stellenbosch wine tasting',
      'Robben Island tour',
      'Chapman\'s Peak Drive'
    ],
    evenings: [
      'V&A Waterfront dinner',
      'Sunset at Signal Hill',
      'Camps Bay sunset',
      'Long Street nightlife'
    ],
    stays: ['One&Only Cape Town','Mount Nelson','The Silo','Cape Grace','Ellerman House'],
    tips: ['Book cable car online','Rent a car','Visit during summer','Do wine tram tour'],
  },
}

const getDestData = (dest: string) => {
  const key = dest.toLowerCase().replace(/\s+/g, '')
  return destData[key] || destData['dubai']
}

const buildItinerary = (destination: string, days: number, style: string, budget: string, interests: string[]) => {
  const d = getDestData(destination)
  const stay = d.stays[0]

  const dayPlans = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: i === 0 ? 'Arrival & First Impressions' : `Day ${i + 1} — ${d.highlights[i % d.highlights.length]}`,
    morning: d.mornings[i % d.mornings.length],
    afternoon: d.afternoons[i % d.afternoons.length],
    evening: d.evenings[i % d.evenings.length],
    accommodation: stay,
    tips: d.tips[i % d.tips.length],
  }))

  return {
    title: `${days}-Day ${style} ${destination} Itinerary`,
    summary: d.intro,
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

// ── MAIN COMPONENT ─────────────────────────────────────────────

export default function AIPlanner() {
  const [mounted, setMounted] = useState(false)
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

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInterestToggle = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const generate = async () => {
    if (!form.destination) {
      alert('Please select a destination')
      return
    }
    
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setItinerary(buildItinerary(form.destination, form.days, form.style, form.budget, form.interests))
    setLoading(false)
    setStep(4)
  }

  const resetPlanner = () => {
    setItinerary(null)
    setStep(1)
    setForm({
      destination: '',
      days: 7,
      style: 'Luxury',
      budget: 'Luxury ($250–500/day)',
      interests: [],
    })
  }

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: ink, paddingTop: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: gold, fontSize: 18 }}>Loading AI Travel Planner...</div>
      </div>
    )
  }

  return (
    <div suppressHydrationWarning style={{ minHeight: '100vh', background: ink, paddingTop: 90 }}>

      {/* HERO SECTION */}
      <div style={{ 
        padding: '60px 20px', 
        textAlign: 'center',
        borderBottom: `1px solid ${dim}`,
        marginBottom: 40
      }}>
        <h1 style={{ 
          color: cream, 
          fontSize: '3rem', 
          marginBottom: 16,
          fontWeight: 400,
          letterSpacing: '-0.02em'
        }}>
          AI Travel Planner
        </h1>
        <p style={{ color: muted, fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
          Let AI craft your perfect journey — personalized itineraries tailored to your style, budget, and interests.
        </p>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: 80,
          textAlign: 'center'
        }}>
          <div style={{ 
            width: 48, 
            height: 48, 
            border: `3px solid ${dim}`,
            borderTopColor: gold,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: 24
          }} />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ color: cream, fontSize: '1.2rem' }}>Crafting your personalized itinerary...</p>
          <p style={{ color: muted, marginTop: 12 }}>Analyzing destinations and creating recommendations</p>
        </div>
      )}

      {/* STEP 1: DESTINATION SELECTION */}
      {!loading && !itinerary && step === 1 && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 60px' }}>
          <div style={{ 
            background: 'rgba(245,239,228,0.05)', 
            padding: 32, 
            borderRadius: 16,
            border: `1px solid ${dim}`
          }}>
            <h2 style={{ color: gold, fontSize: '1.5rem', marginBottom: 24 }}>Where would you like to go?</h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
              gap: 12,
              marginBottom: 32
            }}>
              {destinations.map(dest => (
                <button
                  key={dest}
                  onClick={() => {
                    setForm(prev => ({ ...prev, destination: dest }))
                    setStep(2)
                  }}
                  style={{
                    padding: '12px 16px',
                    background: form.destination === dest ? gold : 'transparent',
                    color: form.destination === dest ? ink : cream,
                    border: `1px solid ${dim}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: 14,
                  }}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: TRIP DETAILS */}
      {!loading && !itinerary && step === 2 && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 60px' }}>
          <div style={{ 
            background: 'rgba(245,239,228,0.05)', 
            padding: 32, 
            borderRadius: 16,
            border: `1px solid ${dim}`
          }}>
            <h2 style={{ color: gold, fontSize: '1.5rem', marginBottom: 8 }}>
              Customize your {form.destination} trip
            </h2>
            <p style={{ color: muted, marginBottom: 32 }}>Tell us how you like to travel</p>

            {/* Days Selection */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ color: cream, display: 'block', marginBottom: 12, fontWeight: 500 }}>
                Trip Duration
              </label>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[3, 5, 7, 10, 14].map(days => (
                  <button
                    key={days}
                    onClick={() => setForm(prev => ({ ...prev, days }))}
                    style={{
                      padding: '10px 20px',
                      background: form.days === days ? gold : 'transparent',
                      color: form.days === days ? ink : cream,
                      border: `1px solid ${dim}`,
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    {days} {days === 1 ? 'day' : 'days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ color: cream, display: 'block', marginBottom: 12, fontWeight: 500 }}>
                Travel Style
              </label>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {styles.map(style => (
                  <button
                    key={style}
                    onClick={() => setForm(prev => ({ ...prev, style }))}
                    style={{
                      padding: '10px 20px',
                      background: form.style === style ? gold : 'transparent',
                      color: form.style === style ? ink : cream,
                      border: `1px solid ${dim}`,
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Selection */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ color: cream, display: 'block', marginBottom: 12, fontWeight: 500 }}>
                Budget Range
              </label>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {budgets.map(budget => (
                  <button
                    key={budget}
                    onClick={() => setForm(prev => ({ ...prev, budget }))}
                    style={{
                      padding: '10px 20px',
                      background: form.budget === budget ? gold : 'transparent',
                      color: form.budget === budget ? ink : cream,
                      border: `1px solid ${dim}`,
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 14,
                    }}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between', marginTop: 40 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  color: cream,
                  border: `1px solid ${dim}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                style={{
                  padding: '12px 24px',
                  background: gold,
                  color: ink,
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Continue to Interests →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: INTERESTS */}
      {!loading && !itinerary && step === 3 && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 60px' }}>
          <div style={{ 
            background: 'rgba(245,239,228,0.05)', 
            padding: 32, 
            borderRadius: 16,
            border: `1px solid ${dim}`
          }}>
            <h2 style={{ color: gold, fontSize: '1.5rem', marginBottom: 8 }}>
              What excites you?
            </h2>
            <p style={{ color: muted, marginBottom: 32 }}>Select all that interest you</p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
              gap: 12,
              marginBottom: 32
            }}>
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  style={{
                    padding: '12px 16px',
                    background: form.interests.includes(interest) ? gold : 'transparent',
                    color: form.interests.includes(interest) ? ink : cream,
                    border: `1px solid ${dim}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 14,
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between', marginTop: 20 }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  color: cream,
                  border: `1px solid ${dim}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                ← Back
              </button>
              <button
                onClick={generate}
                style={{
                  padding: '12px 32px',
                  background: gold,
                  color: ink,
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Generate My Itinerary →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: ITINERARY RESULT */}
      {!loading && itinerary && (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px 60px' }}>
          {/* Header */}
          <div style={{ 
            background: `linear-gradient(135deg, ${gold}20 0%, transparent 100%)`,
            padding: 40,
            borderRadius: 16,
            marginBottom: 32,
            border: `1px solid ${dim}`,
            textAlign: 'center'
          }}>
            <h2 style={{ color: gold, fontSize: '2rem', marginBottom: 16 }}>{itinerary.title}</h2>
            <p style={{ color: cream, fontSize: '1.1rem', marginBottom: 16 }}>{itinerary.summary}</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: muted, fontSize: 14 }}>📍 {itinerary.destination}, {itinerary.country}</span>
              <span style={{ color: muted, fontSize: 14 }}>💰 {itinerary.practical.currency}</span>
              <span style={{ color: muted, fontSize: 14 }}>🕐 {itinerary.practical.timezone}</span>
            </div>
          </div>

          {/* Daily Itinerary */}
          {itinerary.days.map((d: any, idx: number) => (
            <div 
              key={d.day} 
              style={{ 
                marginBottom: 24, 
                padding: 28, 
                background: 'rgba(245,239,228,0.03)',
                border: `1px solid ${dim}`,
                borderRadius: 12,
                transition: 'transform 0.2s'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 16, 
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: `1px solid ${dim}`
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  background: gold,
                  color: ink,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 600
                }}>
                  {d.day}
                </div>
                <h3 style={{ color: cream, fontSize: '1.5rem', margin: 0 }}>{d.title}</h3>
              </div>
              
              <div style={{ display: 'grid', gap: 20 }}>
                <div>
                  <div style={{ color: gold, fontSize: 14, marginBottom: 8 }}>🌅 MORNING</div>
                  <p style={{ color: cream, margin: 0, lineHeight: 1.6 }}>{d.morning}</p>
                </div>
                <div>
                  <div style={{ color: gold, fontSize: 14, marginBottom: 8 }}>☀️ AFTERNOON</div>
                  <p style={{ color: cream, margin: 0, lineHeight: 1.6 }}>{d.afternoon}</p>
                </div>
                <div>
                  <div style={{ color: gold, fontSize: 14, marginBottom: 8 }}>🌙 EVENING</div>
                  <p style={{ color: cream, margin: 0, lineHeight: 1.6 }}>{d.evening}</p>
                </div>
                <div style={{ 
                  marginTop: 16, 
                  paddingTop: 16, 
                  borderTop: `1px solid ${dim}`,
                  background: 'rgba(200,169,110,0.05)',
                  padding: 16,
                  borderRadius: 8
                }}>
                  <div style={{ color: gold, fontSize: 14, marginBottom: 8 }}>💡 PRO TIP</div>
                  <p style={{ color: muted, margin: 0, fontSize: 14 }}>{d.tips}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Stay Recommendation */}
          <div style={{ 
            padding: 28, 
            background: `linear-gradient(135deg, ${gold}10 0%, transparent 100%)`,
            borderRadius: 12,
            border: `1px solid ${gold}40`,
            marginTop: 32,
            marginBottom: 32
          }}>
            <h3 style={{ color: gold, marginBottom: 12 }}>🏨 Recommended Stay</h3>
            <p style={{ color: cream, fontSize: '1.1rem' }}>{itinerary.practical.bestStay}</p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, marginBottom: 60 }}>
            <button
              onClick={resetPlanner}
              style={{
                padding: '14px 28px',
                background: 'transparent',
                color: cream,
                border: `1px solid ${dim}`,
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Plan Another Trip
            </button>
            <button
              onClick={() => window.print()}
              style={{
                padding: '14px 28px',
                background: gold,
                color: ink,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Print / Save Itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  )
}