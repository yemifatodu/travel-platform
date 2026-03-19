'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const regions = ['All', 'Africa', 'Middle East', 'Asia', 'Europe', 'Americas', 'Pacific']

const countries = [
  // AFRICA
  {
    country: 'Kenya', region: 'Africa', flag: '🇰🇪', capital: 'Nairobi',
    currency: 'KES', language: 'English, Swahili',
    visaTypes: [
      { type: 'e-Visa', cost: '$51', duration: '90 days', processing: '3–5 business days' },
      { type: 'Visa on Arrival', cost: '$51', duration: '90 days', processing: 'On arrival' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds ($50/day)', 'Yellow fever certificate (if arriving from endemic country)'],
    vaccinations: ['Yellow Fever (required if from endemic country)', 'Malaria prophylaxis (strongly recommended)', 'Hepatitis A & B', 'Typhoid'],
    tips: 'Kenya eVisa is quick and easy to obtain online at evisa.go.ke. Most nationalities qualify. The East Africa Tourist Visa ($100) also covers Uganda and Rwanda and is excellent value for multi-country trips.',
    bestTime: 'Jul–Oct (Migration) · Jan–Mar (Predators)',
    flightTime: '~8h from London · ~10h from Dubai · ~4h from Lagos',
  },
  {
    country: 'Tanzania', region: 'Africa', flag: '🇹🇿', capital: 'Dar es Salaam',
    currency: 'TZS', language: 'Swahili, English',
    visaTypes: [
      { type: 'e-Visa', cost: '$50', duration: '90 days', processing: '5–7 business days' },
      { type: 'Visa on Arrival', cost: '$50', duration: '90 days', processing: 'On arrival' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Yellow fever certificate (mandatory)', 'Sufficient funds'],
    vaccinations: ['Yellow Fever (MANDATORY)', 'Malaria prophylaxis (essential)', 'Hepatitis A & B', 'Typhoid', 'Rabies (if trekking)'],
    tips: 'Yellow fever certificate is strictly required for Tanzania entry — you will be turned away at the border without it. Apply for eVisa at immigration.go.tz. Zanzibar uses the same visa as mainland Tanzania.',
    bestTime: 'Jul–Oct (Serengeti Migration) · Dec–Mar (Southern Circuit)',
    flightTime: '~9h from London · ~5h from Dubai',
  },
  {
    country: 'South Africa', region: 'Africa', flag: '🇿🇦', capital: 'Cape Town / Pretoria',
    currency: 'ZAR', language: 'English (+ 10 official languages)',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '30–90 days', processing: 'On arrival (most nationalities)' },
      { type: 'Tourist Visa', cost: 'Varies', duration: '90 days', processing: '10–15 business days' },
    ],
    requirements: ['Valid passport (30 days beyond stay)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds', '2 blank visa pages in passport'],
    vaccinations: ['Yellow Fever (if arriving from endemic country)', 'Hepatitis A & B', 'Typhoid', 'Malaria prophylaxis (Kruger and Limpopo regions only)'],
    tips: 'Most Western passport holders enter South Africa visa-free for up to 90 days. Nigerian, Ghanaian and many other African passport holders require a visa — apply at least 6 weeks in advance. Your passport must have at least 2 blank pages.',
    bestTime: 'May–Sep (Safari) · Oct–Apr (Cape Town)',
    flightTime: '~11h from London · ~8h from Dubai',
  },
  {
    country: 'Morocco', region: 'Africa', flag: '🇲🇦', capital: 'Rabat',
    currency: 'MAD', language: 'Arabic, French, Amazigh',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '90 days', processing: 'On arrival (most nationalities)' },
      { type: 'Tourist Visa', cost: '$45', duration: '90 days', processing: '5–10 business days' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds'],
    vaccinations: ['Hepatitis A & B', 'Typhoid', 'Rabies (if travelling outside cities)'],
    tips: 'EU, US, UK and many other passport holders enter Morocco visa-free. Nigerian and some other African nationals require a visa — apply through the Moroccan embassy. Morocco is easy to visit and has excellent tourist infrastructure.',
    bestTime: 'Mar–May · Sep–Nov',
    flightTime: '~3h from London · ~4h from Dubai · ~6h from Lagos',
  },
  {
    country: 'Nigeria', region: 'Africa', flag: '🇳🇬', capital: 'Abuja',
    currency: 'NGN', language: 'English (+ 500+ local languages)',
    visaTypes: [
      { type: 'e-Visa', cost: '$42–160', duration: '30–90 days', processing: '48h–5 business days' },
      { type: 'Visa on Arrival', cost: '$82', duration: '30 days', processing: 'On arrival (select nationalities)' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Hotel booking confirmation', 'Bank statement', 'Yellow fever certificate (MANDATORY)', 'Invitation letter (business visa)'],
    vaccinations: ['Yellow Fever (MANDATORY — no exceptions)', 'Malaria prophylaxis (essential)', 'Hepatitis A & B', 'Typhoid', 'Meningitis'],
    tips: 'Yellow fever certificate is absolutely mandatory for Nigeria — carry the physical yellow card. Apply for eVisa at portal.immigration.gov.ng. Response can be slow — apply at least 3 weeks ahead. Visa on Arrival available for select nationalities at Lagos and Abuja airports.',
    bestTime: 'Nov–Feb (Dry Season)',
    flightTime: '~6h from London · ~7h from Dubai',
  },
  {
    country: 'Rwanda', region: 'Africa', flag: '🇷🇼', capital: 'Kigali',
    currency: 'RWF', language: 'Kinyarwanda, English, French',
    visaTypes: [
      { type: 'Visa on Arrival', cost: '$30', duration: '30 days', processing: 'On arrival (most nationalities)' },
      { type: 'e-Visa', cost: '$30', duration: '30 days', processing: '3–5 business days' },
      { type: 'Visa-Free', cost: 'Free', duration: '30 days', processing: 'Select African passports' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Yellow fever certificate (recommended)', 'Gorilla trekking permit if applicable'],
    vaccinations: ['Yellow Fever (recommended)', 'Malaria prophylaxis (essential)', 'Hepatitis A & B', 'Typhoid', 'Rabies (for gorilla trekking)'],
    tips: 'Rwanda is one of Africa\'s easiest countries to visit — visa on arrival for most nationalities. The gorilla trekking permit ($1,500) must be booked separately through Rwanda Development Board months in advance — they sell out fast.',
    bestTime: 'Jun–Sep · Dec–Feb (Dry Seasons)',
    flightTime: '~8h from London · ~5h from Dubai',
  },
  {
    country: 'Ghana', region: 'Africa', flag: '🇬🇭', capital: 'Accra',
    currency: 'GHS', language: 'English',
    visaTypes: [
      { type: 'e-Visa', cost: '$60–150', duration: '30–60 days', processing: '5 business days' },
      { type: 'Visa Required', cost: 'Varies', duration: '30–60 days', processing: '5–10 business days' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Yellow fever certificate (MANDATORY)', 'Bank statement', 'Completed application form'],
    vaccinations: ['Yellow Fever (MANDATORY)', 'Malaria prophylaxis (essential)', 'Hepatitis A & B', 'Typhoid', 'Meningitis'],
    tips: 'Ghana requires a visa for most nationalities — apply through Ghana Immigration Service portal. Yellow fever certificate is mandatory. Accra is one of West Africa\'s most visitor-friendly capitals with excellent infrastructure.',
    bestTime: 'Nov–Mar (Dry Season)',
    flightTime: '~6h from London · ~8h from Dubai',
  },

  // MIDDLE EAST
  {
    country: 'UAE (Dubai)', region: 'Middle East', flag: '🇦🇪', capital: 'Abu Dhabi',
    currency: 'AED', language: 'Arabic, English',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '30–90 days', processing: 'On arrival (most nationalities)' },
      { type: 'Tourist Visa', cost: '$75–90', duration: '30–90 days', processing: '3–5 business days' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds'],
    vaccinations: ['No mandatory vaccinations', 'Hepatitis A & B (recommended)', 'Typhoid (recommended)'],
    tips: 'Most Western, Asian and many African passport holders enter the UAE visa-free for 30–90 days. Nigerian passport holders can obtain a visa on arrival or apply in advance. The UAE is one of the world\'s most straightforward destinations for entry.',
    bestTime: 'Nov–Mar',
    flightTime: '~7h from London · ~4h from Nairobi · ~5h from Lagos',
  },
  {
    country: 'Jordan', region: 'Middle East', flag: '🇯🇴', capital: 'Amman',
    currency: 'JOD', language: 'Arabic, English',
    visaTypes: [
      { type: 'Visa on Arrival', cost: '$56', duration: '30 days', processing: 'On arrival' },
      { type: 'Jordan Pass', cost: '$70–109', duration: '30 days', processing: 'Online pre-purchase' },
      { type: 'e-Visa', cost: '$56', duration: '30 days', processing: '3–5 days' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds'],
    vaccinations: ['Hepatitis A & B', 'Typhoid'],
    tips: 'The Jordan Pass ($70–109 depending on duration) is outstanding value — it includes the visa fee AND entry to Petra (normally $75) plus 40+ other attractions. Buy it before you travel at jordanpass.jo. Almost all nationalities get visa on arrival.',
    bestTime: 'Mar–May · Sep–Nov',
    flightTime: '~5h from London · ~3h from Dubai',
  },
  {
    country: 'Turkey', region: 'Middle East', flag: '🇹🇷', capital: 'Ankara',
    currency: 'TRY', language: 'Turkish',
    visaTypes: [
      { type: 'e-Visa', cost: '$50', duration: '90 days', processing: 'Instant–24h' },
      { type: 'Visa-Free', cost: 'Free', duration: '90 days', processing: 'Select nationalities' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds'],
    vaccinations: ['Hepatitis A & B', 'Typhoid'],
    tips: 'Turkey\'s e-Visa system at evisa.gov.tr is fast and simple — most nationalities receive approval within minutes. Apply online before travel to avoid queues at the border. Turkey is an exceptional value destination with world-class culture.',
    bestTime: 'Apr–Jun · Sep–Oct',
    flightTime: '~4h from London · ~3h from Dubai',
  },

  // ASIA
  {
    country: 'Japan', region: 'Asia', flag: '🇯🇵', capital: 'Tokyo',
    currency: 'JPY', language: 'Japanese',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '90 days', processing: 'On arrival (most nationalities)' },
      { type: 'Tourist Visa', cost: 'Varies', duration: '15–90 days', processing: '5–10 business days' },
    ],
    requirements: ['Valid passport', 'Return ticket', 'Proof of accommodation', 'Sufficient funds', 'Completed arrival card'],
    vaccinations: ['No mandatory vaccinations', 'Hepatitis A & B (recommended)', 'Japanese Encephalitis (rural areas)'],
    tips: 'Most Western and many Asian passport holders enter Japan visa-free for 90 days. Nigerian and many other African nationals require a visa — apply through the Japanese Embassy with bank statements and itinerary. Japan is strict but fair with visa applications.',
    bestTime: 'Mar–May (Cherry Blossom) · Oct–Nov (Autumn)',
    flightTime: '~12h from London · ~9h from Dubai',
  },
  {
    country: 'Bali (Indonesia)', region: 'Asia', flag: '🇮🇩', capital: 'Denpasar (Jakarta)',
    currency: 'IDR', language: 'Bahasa Indonesia, Balinese',
    visaTypes: [
      { type: 'Visa on Arrival', cost: '$35', duration: '30 days (extendable)', processing: 'On arrival' },
      { type: 'e-Visa', cost: '$35', duration: '30 days', processing: '3–5 days' },
      { type: 'Visa-Free', cost: 'Free', duration: '30 days', processing: 'Select nationalities' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds ($1,500 minimum)'],
    vaccinations: ['Hepatitis A & B', 'Typhoid', 'Rabies (if staying long-term)', 'Malaria prophylaxis (outer islands — not Bali itself)'],
    tips: 'Bali visa on arrival is quick and easy — pay at the counter before immigration. Can be extended once for another 30 days at an immigration office for $35. Bali is one of the world\'s most welcoming destinations.',
    bestTime: 'Apr–Oct (Dry Season)',
    flightTime: '~15h from London · ~8h from Dubai',
  },
  {
    country: 'Thailand', region: 'Asia', flag: '🇹🇭', capital: 'Bangkok',
    currency: 'THB', language: 'Thai',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '30–60 days', processing: 'On arrival (most nationalities)' },
      { type: 'Tourist Visa', cost: '$35', duration: '60 days (extendable)', processing: '3–5 days' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of funds (20,000 THB)', 'Proof of accommodation'],
    vaccinations: ['Hepatitis A & B', 'Typhoid', 'Rabies (if staying long-term)', 'Japanese Encephalitis (rural areas)', 'Malaria prophylaxis (border regions only)'],
    tips: 'Thailand offers 30-day visa-free entry for most nationalities, recently extended to 60 days. The Thailand Tourist Visa gives 60 days with one 30-day extension possible. Thailand is highly accessible and a great first Southeast Asia destination.',
    bestTime: 'Nov–Feb',
    flightTime: '~11h from London · ~6h from Dubai',
  },
  {
    country: 'Maldives', region: 'Asia', flag: '🇲🇻', capital: 'Malé',
    currency: 'MVR (USD widely accepted)', language: 'Dhivehi, English',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '30 days (extendable to 90)', processing: 'On arrival — all nationalities' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Confirmed hotel / resort booking', 'Sufficient funds ($100/day)'],
    vaccinations: ['No mandatory vaccinations', 'Hepatitis A & B (recommended)'],
    tips: 'The Maldives is one of the easiest countries in the world to enter — all nationalities receive a free 30-day visa on arrival with no pre-approval needed. Just show your resort booking and return ticket. Alcohol is only available at resort islands — not local islands.',
    bestTime: 'Nov–Apr (Dry Season)',
    flightTime: '~10h from London · ~4h from Dubai',
  },

  // EUROPE
  {
    country: 'France', region: 'Europe', flag: '🇫🇷', capital: 'Paris',
    currency: 'EUR', language: 'French',
    visaTypes: [
      { type: 'Visa-Free (EU/EEA/UK)', cost: 'Free', duration: '90 days', processing: 'On arrival' },
      { type: 'Schengen Visa', cost: '€80', duration: '90 days in 180', processing: '15 business days' },
    ],
    requirements: ['Valid passport (3 months beyond stay)', 'Return ticket', 'Travel insurance (€30,000 minimum)', 'Proof of accommodation', 'Bank statements (3 months)', 'Sufficient funds (€65/day)'],
    vaccinations: ['No mandatory vaccinations'],
    tips: 'France is part of the Schengen Area — one Schengen visa covers 26 European countries. Nigerian, Ghanaian and most African passport holders require a Schengen visa. Apply at the French Embassy at least 3–4 weeks ahead. The Schengen visa allows 90 days in any 180-day period across all Schengen countries.',
    bestTime: 'Apr–Jun · Sep–Oct',
    flightTime: '~2h from London · ~7h from Lagos · ~7h from Dubai',
  },
  {
    country: 'Greece', region: 'Europe', flag: '🇬🇷', capital: 'Athens',
    currency: 'EUR', language: 'Greek',
    visaTypes: [
      { type: 'Visa-Free (EU/EEA/UK)', cost: 'Free', duration: '90 days', processing: 'On arrival' },
      { type: 'Schengen Visa', cost: '€80', duration: '90 days in 180', processing: '15 business days' },
    ],
    requirements: ['Valid passport (3 months beyond stay)', 'Return ticket', 'Travel insurance (€30,000 minimum)', 'Proof of accommodation', 'Bank statements', 'Sufficient funds'],
    vaccinations: ['No mandatory vaccinations'],
    tips: 'Same Schengen visa as France, Italy, Spain and 23 other countries. If visiting multiple Schengen countries, apply at the embassy of your main destination or first point of entry. Greece is highly recommended for its island-hopping accessibility.',
    bestTime: 'May–Jun · Sep–Oct',
    flightTime: '~3.5h from London · ~4h from Dubai',
  },
  {
    country: 'United Kingdom', region: 'Europe', flag: '🇬🇧', capital: 'London',
    currency: 'GBP', language: 'English',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '6 months', processing: 'On arrival (many nationalities)' },
      { type: 'Standard Visitor Visa', cost: '£115', duration: '6 months', processing: '3 weeks' },
      { type: 'Electronic Travel Authorisation', cost: '£10', duration: 'Per trip', processing: '72h (online)' },
    ],
    requirements: ['Valid passport', 'Return ticket', 'Proof of funds', 'Proof of accommodation', 'Strong ties to home country (employment, family)', 'Bank statements (3–6 months)'],
    vaccinations: ['No mandatory vaccinations'],
    tips: 'UK visa applications can be challenging for Nigerian and many African passport holders — strong evidence of ties to home country (employment letter, property ownership, family) is essential. Apply at least 6–8 weeks ahead. The UK Standard Visitor Visa fee is £115 with a high refusal rate — prepare a strong application.',
    bestTime: 'May–Sep',
    flightTime: '~6.5h from Lagos · ~7h from Dubai',
  },

  // AMERICAS
  {
    country: 'USA', region: 'Americas', flag: '🇺🇸', capital: 'Washington D.C.',
    currency: 'USD', language: 'English',
    visaTypes: [
      { type: 'ESTA (Visa Waiver)', cost: '$21', duration: '90 days', processing: '72h (online)' },
      { type: 'B1/B2 Tourist Visa', cost: '$185', duration: '10 years (multiple entry)', processing: '2–8 weeks + interview' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Bank statements', 'Strong ties to home country', 'DS-160 form (visa applicants)', 'In-person interview at US Embassy'],
    vaccinations: ['No mandatory vaccinations'],
    tips: 'Visa Waiver (ESTA) is available for UK, EU, Japan, Australia and select other nationalities. Most African nationals including Nigerians and Ghanaians require the B1/B2 tourist visa — apply at least 3 months ahead due to interview wait times. US visa refusal rates are high for West African applicants — present strong financial and employment evidence.',
    bestTime: 'Year-round (varies by city)',
    flightTime: '~9h from London · ~13h from Lagos',
  },
  {
    country: 'Mexico', region: 'Americas', flag: '🇲🇽', capital: 'Mexico City',
    currency: 'MXN', language: 'Spanish',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '180 days', processing: 'On arrival (most nationalities)' },
      { type: 'Tourist Visa', cost: 'Varies', duration: '180 days', processing: '5–10 business days' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds'],
    vaccinations: ['Hepatitis A & B', 'Typhoid', 'Malaria prophylaxis (jungle regions)'],
    tips: 'Mexico is visa-free for US, UK, EU, Canadian and many other passport holders for up to 180 days — one of the most generous tourist visa policies in the world. On arrival, fill in the Forma Migratoria Multiple (FMM) — keep your stub as you must hand it in on departure.',
    bestTime: 'Dec–Apr',
    flightTime: '~11h from London · ~5h from New York',
  },
  {
    country: 'Brazil', region: 'Americas', flag: '🇧🇷', capital: 'Brasília',
    currency: 'BRL', language: 'Portuguese',
    visaTypes: [
      { type: 'Visa-Free', cost: 'Free', duration: '90 days', processing: 'On arrival (many nationalities)' },
      { type: 'e-Visa', cost: '$80', duration: '90 days', processing: '3–5 days' },
      { type: 'Tourist Visa', cost: '$80', duration: '90 days', processing: '5–10 days' },
    ],
    requirements: ['Valid passport (6+ months)', 'Return ticket', 'Proof of accommodation', 'Sufficient funds', 'Yellow fever certificate (for Amazon regions)'],
    vaccinations: ['Yellow Fever (required for Amazon and some states)', 'Hepatitis A & B', 'Typhoid', 'Malaria prophylaxis (Amazon)'],
    tips: 'Brazil recently expanded visa-free access to US, UK, EU and Australian passport holders. Nigerian and most African nationals require an e-Visa or tourist visa — apply online at visto.mre.gov.br. Yellow fever vaccination is mandatory if visiting the Amazon or certain Brazilian states.',
    bestTime: 'Dec–Mar (Carnival) · Jun–Sep (Dry Season)',
    flightTime: '~11h from London · ~9h from Lagos',
  },
]

const statusColors: Record<string, string> = {
  'Visa-Free': '#4ade80',
  'e-Visa': '#60a5fa',
  'Visa on Arrival': '#fbbf24',
  'Visa Required': '#f87171',
  'ESTA (Visa Waiver)': '#60a5fa',
  'Schengen Visa': '#60a5fa',
  'Standard Visitor Visa': '#f87171',
  'Jordan Pass': '#fbbf24',
  'Tourist Visa': '#f87171',
  'B1/B2 Tourist Visa': '#f87171',
}

const getMainStatus = (country: typeof countries[0]) => {
  const types = country.visaTypes.map(v => v.type)
  if (types.some(t => t === 'Visa-Free')) return { label: 'Visa-Free Available', color: '#4ade80' }
  if (types.some(t => t.includes('on Arrival') || t.includes('ESTA') || t.includes('Jordan Pass'))) return { label: 'Visa on Arrival', color: '#fbbf24' }
  if (types.some(t => t.includes('e-Visa') || t.includes('Schengen'))) return { label: 'e-Visa Available', color: '#60a5fa' }
  return { label: 'Visa Required', color: '#f87171' }
}

export default function VisaRequirements() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof countries[0] | null>(null)

  const filtered = countries.filter(c => {
    const matchRegion = activeRegion === 'All' || c.region === activeRegion
    const matchSearch = search === '' ||
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.region.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            VISA & ENTRY
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 1, margin: 0 }}>
              Visa <em style={{ color: gold }}>Requirements</em>
            </h1>
            <p style={{ color: muted, fontSize: '0.95rem', maxWidth: 400, lineHeight: 1.8, margin: 0 }}>
              Entry requirements, visa types, costs and vaccination rules for {countries.length} destinations worldwide.
            </p>
          </div>

          {/* Disclaimer */}
          <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '16px 24px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ color: gold, fontSize: '1rem', flexShrink: 0, marginTop: 2 }}>⚠</span>
            <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
              Visa requirements change frequently. This information is a general guide only — always verify current requirements with the official embassy or consulate of your destination country before travelling. Requirements may vary significantly based on your passport nationality.
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ borderBottom: '1px solid rgba(200,169,110,0.08)', padding: '16px clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', color: dim }}>LEGEND:</span>
          {[
            { label: 'Visa-Free Available', color: '#4ade80' },
            { label: 'Visa on Arrival / e-Visa', color: '#fbbf24' },
            { label: 'Visa Required', color: '#f87171' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em', color: dim }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ borderBottom: '1px solid rgba(200,169,110,0.1)', padding: '20px clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {regions.map(r => (
              <button key={r} onClick={() => { setActiveRegion(r); setSelected(null) }}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.63rem', letterSpacing: '0.12em', padding: '7px 14px', background: activeRegion === r ? gold : 'transparent', border: `1px solid ${activeRegion === r ? gold : 'rgba(200,169,110,0.2)'}`, color: activeRegion === r ? '#080807' : muted, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                {r}
              </button>
            ))}
          </div>
          <input
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', color: cream, padding: '7px 16px', fontSize: '0.85rem', outline: 'none', fontFamily: "'DM Sans',sans-serif", width: 200 }}
          />
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 12, alignItems: 'start' }}>

          {/* Country grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 2 }}>
            {filtered.map(country => {
              const status = getMainStatus(country)
              const isSel = selected?.country === country.country
              return (
                <button key={country.country}
                  onClick={() => setSelected(isSel ? null : country)}
                  style={{ background: isSel ? '#1C1B18' : '#111110', border: `1px solid ${isSel ? gold : 'rgba(200,169,110,0.1)'}`, padding: '20px 22px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: '2rem', flexShrink: 0 }}>{country.flag}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: cream, fontWeight: 600, marginBottom: 3 }}>{country.country}</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', color: dim, marginBottom: 8 }}>{country.region} · {country.capital}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: status.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: status.color }}>{status.label}</span>
                    </div>
                  </div>
                  <span style={{ color: isSel ? gold : dim, fontSize: '0.8rem', flexShrink: 0 }}>{isSel ? '✕' : '→'}</span>
                </button>
              )
            })}

            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: muted, fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', fontStyle: 'italic' }}>
                No countries found — try adjusting your search
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', position: 'sticky', top: 90 }}>

              {/* Header */}
              <div style={{ background: '#1C1B18', padding: '24px 24px 20px', borderBottom: '1px solid rgba(200,169,110,0.1)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2.5rem' }}>{selected.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', color: gold, marginBottom: 4 }}>{selected.region}</div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 6 }}>{selected.country}</h2>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim }}>{selected.capital} · {selected.currency} · {selected.language}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: dim, cursor: 'pointer', fontSize: '1rem', padding: 4, flexShrink: 0 }}>✕</button>
              </div>

              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20, maxHeight: '70vh', overflowY: 'auto' }}>

                {/* Visa types */}
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>VISA OPTIONS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {selected.visaTypes.map((v, i) => (
                      <div key={i} style={{ background: '#1C1B18', padding: '14px 16px', border: `1px solid ${statusColors[v.type] ? statusColors[v.type] + '30' : 'rgba(200,169,110,0.1)'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', color: statusColors[v.type] || gold }}>{v.type}</span>
                          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream, fontWeight: 600 }}>{v.cost}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 16 }}>
                          <div>
                            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 2 }}>DURATION</div>
                            <div style={{ color: muted, fontSize: '0.8rem' }}>{v.duration}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 2 }}>PROCESSING</div>
                            <div style={{ color: muted, fontSize: '0.8rem' }}>{v.processing}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>ENTRY REQUIREMENTS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {selected.requirements.map((req, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: gold, fontSize: '0.6rem', marginTop: 3, flexShrink: 0 }}>✓</span>
                        <span style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.5 }}>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vaccinations */}
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>VACCINATIONS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {selected.vaccinations.map((vac, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: vac.includes('MANDATORY') ? '#f87171' : '#fbbf24', fontSize: '0.6rem', marginTop: 3, flexShrink: 0 }}>💉</span>
                        <span style={{ color: vac.includes('MANDATORY') ? '#f87171' : muted, fontSize: '0.85rem', lineHeight: 1.5, fontWeight: vac.includes('MANDATORY') ? 600 : 400 }}>{vac}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.15)', padding: '16px 18px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>✦ HUUBOI TIP</div>
                  <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.75, margin: 0 }}>{selected.tips}</p>
                </div>

                {/* Practical info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <div style={{ background: '#1C1B18', padding: '12px 14px' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 4 }}>BEST TIME TO VISIT</div>
                    <div style={{ color: cream, fontSize: '0.82rem' }}>{selected.bestTime}</div>
                  </div>
                  <div style={{ background: '#1C1B18', padding: '12px 14px' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 4 }}>FLIGHT TIME</div>
                    <div style={{ color: cream, fontSize: '0.82rem' }}>{selected.flightTime}</div>
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="https://aviasales.tp.st/4CRDbzuv" target="_blank" rel="noopener noreferrer"
                    style={{ background: gold, color: '#080807', padding: '13px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                    ✈ SEARCH FLIGHTS TO {selected.country.toUpperCase().split(' ')[0]}
                  </a>
                  <Link href="/esim"
                    style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                    📱 GET {selected.country.toUpperCase().split(' ')[0]} ESIM
                  </Link>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Bottom strips */}
        <div style={{ marginTop: 48, background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,36px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 16 }}>GENERAL VISA TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {[
              { icon: '📅', tip: 'Apply at least 6–8 weeks before travel for visa applications that require embassy appointments.' },
              { icon: '📄', tip: 'Always carry printed copies of your visa, insurance and hotel bookings — digital is not always accepted.' },
              { icon: '💉', tip: 'Carry your yellow fever vaccination certificate in your travel wallet — it is required for entry to many countries.' },
              { icon: '🛂', tip: 'Never overstay a visa — even by one day. Overstaying can result in fines, deportation and future visa bans.' },
              { icon: '🔍', tip: 'Check requirements for every country on your route — transit visas may be required even if you are not leaving the airport.' },
              { icon: '📱', tip: 'Get a travel eSIM so you have instant connectivity to look up requirements and contact embassies from anywhere.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related links */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Travel Tips', sub: 'Health, safety and packing', href: '/travel-tips' },
            { label: 'Africa & Safari', sub: 'Africa visa strategy', href: '/africa-safari' },
            { label: 'Budget Calculator', sub: 'Plan your trip budget', href: '/budget-calculator' },
            { label: 'Get a Travel eSIM', sub: 'Data in 150+ countries', href: '/esim' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold, marginBottom: 3 }}>{link.label} →</div>
                <div style={{ color: dim, fontSize: '0.75rem' }}>{link.sub}</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
