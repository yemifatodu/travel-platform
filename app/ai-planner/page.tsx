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
  }
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

  const generate = async () => {
    setLoading(true)

    await new Promise(r => setTimeout(r, 1000))

    setItinerary(
      buildItinerary(
        form.destination,
        form.days,
        form.style,
        form.budget,
        form.interests
      )
    )

    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: ink, paddingTop: 90 }}>

      {/* HERO */}
      <div style={{ padding: 60, textAlign: 'center' }}>
        <h1 style={{ color: cream }}>AI Travel Planner</h1>
      </div>

      {/* RESULT */}
      {itinerary && (
        <div style={{ padding: 40 }}>
          <h2 style={{ color: gold }}>{itinerary.title}</h2>
          <p style={{ color: muted }}>{itinerary.summary}</p>

          {itinerary.days.map((d: any) => (
            <div key={d.day} style={{ marginTop: 20, padding: 20, border: '1px solid #333' }}>
              <h3 style={{ color: cream }}>Day {d.day}</h3>
              <p>{d.morning}</p>
              <p>{d.afternoon}</p>
              <p>{d.evening}</p>
            </div>
          ))}
        </div>
      )}

      {/* BUTTON */}
      {!itinerary && (
        <button onClick={generate} style={{ padding: 20, background: gold }}>
          Generate
        </button>
      )}

      {/* FIXED CTA */}
      <a href="/" target="_blank" rel="noopener noreferrer">
        Flights
      </a>
    </div>
  )
}





