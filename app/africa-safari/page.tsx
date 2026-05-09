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

const africaRegions = ['All', 'East Africa', 'Southern Africa', 'West Africa', 'North Africa']

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
  { icon: '🦁', title: 'Big Five Safari', desc: 'Lion, leopard, elephant, buffalo, rhino.' },
  { icon: '🦍', title: 'Gorilla Trekking', desc: 'Rwanda & Uganda forest encounters.' },
  { icon: '🚁', title: 'Fly-In Safari', desc: 'Remote luxury access by aircraft.' },
  { icon: '🛶', title: 'Water Safari', desc: 'Delta canoe and river safaris.' },
  { icon: '🚶', title: 'Walking Safari', desc: 'Bush tracking on foot.' },
  { icon: '🎈', title: 'Hot Air Balloon', desc: 'Sunrise aerial safaris.' },
]

const packingList = [
  { category: 'Clothing', items: ['Neutral safari colors', 'Light layers', 'Warm jacket', 'Walking shoes'] },
  { category: 'Gear', items: ['Binoculars', 'Camera zoom lens', 'Power bank', 'Head torch'] },
  { category: 'Health', items: ['Malaria meds', 'Repellent', 'Sunblock', 'First aid'] },
  { category: 'Documents', items: ['Passport', 'Insurance', 'Visa', 'Cash tips'] },
]

export default function AfricaSafari() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [selectedDest, setSelectedDest] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'types' | 'guide'>('destinations')

  const filtered = safariDestinations.filter(
    (d) => activeRegion === 'All' || regionMap[d.slug] === activeRegion
  )

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      {/* HERO */}
      <div style={{ padding: '80px 40px', color: cream }}>
        <h1>Africa Safari</h1>

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <a
            href="/flights"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: gold, color: '#000', padding: '12px 24px', textDecoration: 'none' }}
          >
            SEARCH AFRICA FLIGHTS
          </a>

          <Link href="/ai-planner" style={{ color: gold }}>
            PLAN MY SAFARI
          </Link>
        </div>
      </div>

      {/* REGION FILTER */}
      <div style={{ display: 'flex', gap: 10, padding: 20 }}>
        {africaRegions.map((r) => (
          <button
            key={r}
            onClick={() => setActiveRegion(r)}
            style={{
              background: activeRegion === r ? gold : 'transparent',
              color: cream,
              border: '1px solid #333',
              padding: '6px 12px',
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* DESTINATIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, padding: 20 }}>
        {filtered.map((dest) => (
          <div
            key={dest.slug}
            onClick={() => setSelectedDest(dest)}
            style={{ background: '#111', padding: 20, border: '1px solid #222' }}
          >
            <h3 style={{ color: cream }}>{dest.name}</h3>
            <p style={{ color: muted }}>{dest.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}