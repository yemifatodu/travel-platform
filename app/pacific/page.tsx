'use client'
import React, { useState } from 'react'
import ResponsiveImage from '@/components/ResponsiveImage'
import Link from 'next/link'
import { pacificDestinations } from './destinations'
import {
  Plane, Building2, Landmark, Compass, Flag, Star, Clock, DollarSign,
  MapPin, Sun, Bed, Coffee, Camera, Users, Gem, Thermometer,
  Calendar, ChevronUp, ChevronDown, Wifi, Smartphone, Shield, Trees,
  Utensils, Waves, Mountain, Globe, Ship, Car, Syringe, Lock, Battery,
  Volume2, Droplets, Fish, Airplay, Anchor, Wind, Umbrella, CloudRain
} from 'lucide-react'

// Huuboi Luxury Palette
const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// Region keys for filter
const regionKeys = ['All', 'Australia', 'New Zealand', 'Fiji', 'French Polynesia', 'Hawaii', 'Cook Islands', 'Samoa']

const pacificTypes = [
  { icon: Fish, title: 'Diving & Marine Life', desc: 'The Great Barrier Reef, Fijian Coral Triangle, Bora Bora lagoon and the waters off Moorea contain some of the world\'s greatest concentrations of marine biodiversity.' },
  { icon: Mountain, title: 'Adventure & Extreme Sports', desc: 'Queenstown invented modern adventure tourism. New Zealand\'s Fiordland and Australia\'s outback offer wilderness on a scale that genuinely humbles.' },
  { icon: Umbrella, title: 'Island Paradise', desc: 'French Polynesia, Fiji, Hawaii and the Cook Islands set the global standard for tropical island beauty — overwater bungalows, turquoise lagoons and white sand.' },
  { icon: Trees, title: 'Wildlife & Nature', desc: 'Australia\'s unique wildlife — kangaroos, koalas, wombats, quolls — is found nowhere else on earth. The Great Barrier Reef adds an entire ocean ecosystem.' },
  { icon: Waves, title: 'Surf & Ocean Culture', desc: 'Hawaii\'s North Shore, Byron Bay, Raglan in New Zealand — the Pacific rim is where surfing was born and where its greatest breaks still define the sport.' },
  { icon: Globe, title: 'Sacred Landscapes', desc: 'Uluru, the thermal fields of Rotorua, the volcanic fire of the Big Island — the Pacific carries a geological energy and indigenous spiritual tradition found nowhere else.' },
]

const routes = [
  { title: 'Australia Grand Tour', days: '21 days', cities: 'Sydney → Great Barrier Reef → Uluru → Melbourne → Tasmania', desc: 'The full Australian experience from world-class harbour city to the red centre, reef and beyond.' },
  { title: 'New Zealand North & South', days: '16 days', cities: 'Auckland → Rotorua → Tongariro → Wellington → Queenstown → Milford Sound', desc: 'Both islands — volcanic north, fjord south. The most scenically diverse country per square kilometre on earth.' },
  { title: 'Polynesian Triangle', days: '14 days', cities: 'Tahiti → Bora Bora → Moorea → Rarotonga → Aitutaki', desc: 'French Polynesia\'s finest islands plus the Cook Islands\' secret lagoon.' },
  { title: 'Pacific Island Hop', days: '18 days', cities: 'Hawaii → Fiji → Vanuatu → New Caledonia → Sydney', desc: 'Across the Pacific from Hawaiian volcanoes to Australian harbour — island by island.' },
]

// Helper component for expandable description
function ExpandableDescription({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shortDescription = description.substring(0, 120)
  
  if (description.length <= 120) {
    return <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 14 }}>{description}</p>
  }
  
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
        {isExpanded ? description : `${shortDescription}...`}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsExpanded(!isExpanded)
        }}
        style={{
          background: 'none',
          border: 'none',
          color: gold,
          fontSize: '0.65rem',
          fontFamily: "'Bebas Neue',sans-serif",
          letterSpacing: '0.1em',
          cursor: 'pointer',
          padding: '6px 0 0 0',
          marginTop: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {isExpanded ? (
          <>
            <ChevronUp size={12} strokeWidth={1.5} color={gold} />
            READ LESS
          </>
        ) : (
          <>
            <ChevronDown size={12} strokeWidth={1.5} color={gold} />
            READ MORE
          </>
        )}
      </button>
    </div>
  )
}

export default function PacificPage() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedDest, setSelectedDest] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  const filtered = pacificDestinations.filter(
    (d) => selectedRegion === 'All' || d.region === selectedRegion
  )

  // Get unique countries for stats
  const uniqueCountries = [...new Set(pacificDestinations.map(d => d.country))]
  const unescoCount = pacificDestinations.filter(d => d.unesco === true).length

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
            <a href="/flights" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Plane size={14} strokeWidth={1.5} color="#080807" />
              SEARCH FLIGHTS
            </a>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={14} strokeWidth={1.5} color={gold} />
              PLAN MY TRIP
            </Link>
          </div>
        </div>

        {/* Stats - Dynamic */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: pacificDestinations.length.toString(), label: 'Destinations', icon: MapPin },
            { num: `${uniqueCountries.length}+`, label: 'Countries', icon: Flag },
            { num: `${unescoCount}+`, label: 'UNESCO Sites', icon: Star },
            { num: '25,000+', label: 'Pacific Islands', icon: Waves },
            { num: '#1', label: 'Coral Biodiversity', icon: Fish },
          ].map(s => {
            const IconComp = s.icon
            return (
              <div key={s.label} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <IconComp size={24} strokeWidth={1.2} color={gold} />
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.5vw,1.8rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(200,169,110,0.15)', marginBottom: 48 }}>
          {[
            { key: 'destinations', label: 'Destinations', icon: MapPin },
            { key: 'experiences', label: 'Experiences', icon: Compass },
            { key: 'guide', label: 'Planning Guide', icon: Calendar },
          ].map(tab => {
            const IconComp = tab.icon
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '14px 24px', background: 'none', border: 'none', color: activeTab === tab.key ? gold : muted, borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent', cursor: 'pointer', position: 'relative', top: 1, transition: 'color 0.2s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconComp size={14} strokeWidth={1.5} color={activeTab === tab.key ? gold : muted} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Region Filter - only on Destinations tab */}
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
                style={{ background: '#111110', border: `1px solid ${selectedDest?.slug === dest.slug ? gold : 'rgba(200,169,110,0.1)'}`, cursor: 'pointer', overflow: 'visible', transition: 'border-color 0.2s' }}>

                {/* ── RESPONSIVE IMAGE CARD HEADER ── */}
                <div style={{ height: selectedDest?.slug === dest.slug ? 320 : 180, position: 'relative', overflow: 'hidden', transition: 'height 0.4s ease' }}>
                  <picture>
                    {/* Mobile: up to 480px */}
                    <source
                      srcSet={`/images/pacific/${dest.slug}-mobile.webp`}
                      media="(max-width: 480px)"
                      type="image/webp"
                    />
                    {/* Tablet: 481px to 1024px */}
                    <source
                      srcSet={`/images/pacific/${dest.slug}-tablet.webp`}
                      media="(max-width: 1024px)"
                      type="image/webp"
                    />
                    {/* Desktop: 1025px and above */}
                    <source
                      srcSet={`/images/pacific/${dest.slug}-desktop.webp`}
                      type="image/webp"
                    />
                    {/* Fallback JPG */}
                    <img
                      src={`/images/pacific/${dest.slug}.jpg`}
                      alt={dest.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement
                        img.style.display = 'none';
                        (img.parentElement?.parentElement as HTMLElement).style.background = dest.gradient
                      }}
                    />
                  </picture>
                  {/* Gradient overlay for text readability */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.75) 0%,transparent 60%)' }} />
                  {/* Country label */}
                  <div style={{ position: 'absolute', bottom: 14, left: 18, display: 'flex', alignItems: 'center', gap: 6, zIndex: 2 }}>
                    <MapPin size={12} strokeWidth={1.5} color={gold} />
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold }}>{dest.country}</div>
                  </div>
                </div>
                {/* ── END RESPONSIVE IMAGE CARD HEADER ── */}

                <div style={{ padding: '20px 22px 22px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 300, color: cream, marginBottom: 4, lineHeight: 1 }}>{dest.name}</h3>
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.12em', color: gold, marginBottom: 10 }}>{dest.tagline}</p>
                  
                  <ExpandableDescription description={dest.description} />
                  
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {dest.highlights.map((h: string) => (
                      <span key={h} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: gold, padding: '3px 10px' }}>{h}</span>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 14 }}>
                    {[
                      { label: 'BEST TIME', value: dest.bestTime, icon: Sun },
                      { label: 'STAY', value: dest.duration, icon: Bed },
                      { label: 'FROM', value: dest.from, icon: DollarSign },
                    ].map(s => {
                      const IconComp = s.icon
                      return (
                        <div key={s.label} style={{ background: '#1C1B18', padding: '10px 12px' }}>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', color: dim, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <IconComp size={10} strokeWidth={1.5} color={dim} />
                            {s.label}
                          </div>
                          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.88rem', color: s.label === 'FROM' ? gold : cream, fontWeight: 600 }}>{s.value}</div>
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: selectedDest?.slug === dest.slug ? muted : gold, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {selectedDest?.slug === dest.slug ? (
                      <>
                        <ChevronUp size={14} strokeWidth={1.5} color={muted} />
                        CLICK TO CLOSE
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} strokeWidth={1.5} color={gold} />
                        SEE DETAILS
                      </>
                    )}
                  </div>
                </div>
                {selectedDest?.slug === dest.slug && (
                  <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', padding: '22px 22px 26px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
                      <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Star size={12} strokeWidth={1.5} color={gold} />
                          EXPERIENCES
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {dest.experiences.map((exp: string, i: number) => (
                            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                              <span style={{ color: gold, fontSize: '0.6rem', marginTop: 2 }}>✦</span>
                              <span style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.5 }}>{exp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Building2 size={12} strokeWidth={1.5} color={gold} />
                          TOP HOTELS
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {(dest.camps || []).map((item: string, i: number) => (
                            <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Bed size={10} strokeWidth={1.5} color={gold} />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <a href="/flights" target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Plane size={14} strokeWidth={1.5} color="#080807" />
                        SEARCH FLIGHTS
                      </a>
                      <Link href="/ai-planner"
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <MapPin size={14} strokeWidth={1.5} color={gold} />
                        PLAN THIS TRIP
                      </Link>
                      <Link href="/budget-calculator"
                        style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '12px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <DollarSign size={14} strokeWidth={1.5} color={muted} />
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
                Pacific <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                The Pacific demands long flights and rewards them handsomely — experiences that simply do not exist anywhere else on earth, from bungee jumping above an Alpine lake to swimming in a Polynesian lagoon at midnight.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {pacificTypes.map(type => {
                const IconComp = type.icon
                return (
                  <div key={type.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                    <div style={{ marginBottom: 16, color: gold, display: 'flex' }}>
                      <IconComp size={32} strokeWidth={1.2} />
                    </div>
                    <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{type.title}</h3>
                    <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{type.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Routes */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Ship size={14} strokeWidth={1.5} color={gold} />
                CLASSIC PACIFIC ROUTES
              </div>
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
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={14} strokeWidth={1.5} color={gold} />
                PACIFIC BY SEASON
              </div>
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

        {/* PLANNING GUIDE TAB */}
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
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={14} strokeWidth={1.5} color={gold} />
                  PACIFIC ESSENTIALS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { icon: Plane, tip: 'The Pacific requires long-haul flights from most of the world. From Lagos: Sydney is ~20 hours via Dubai. From London: Sydney is ~22 hours. Build in a stopover — Singapore, Dubai or Hong Kong work well.' },
                    { icon: Clock, tip: 'Jet lag is significant crossing to Australia and New Zealand. Arrive a day or two early before any important commitments. Eastward travel (Americas to Pacific) is harder than westward.' },
                    { icon: Battery, tip: 'Australia and New Zealand use Type I plugs (unique to the region) — bring a universal adapter. French Polynesia uses French Type E/F plugs. Fiji uses Type I like Australia.' },
                    { icon: Syringe, tip: 'No mandatory vaccinations for Australia, New Zealand or most Pacific islands. Tropical islands require standard precautions — Hepatitis A, Typhoid and sun protection are essential.' },
                    { icon: DollarSign, tip: 'Australia and New Zealand are expensive — budget $150–300 AUD/NZD per person per day. French Polynesia is very expensive — $300–600 USD/day at resorts. Fiji offers more value.' },
                    { icon: Smartphone, tip: 'Get a travel eSIM before departure — essential for navigating Australian cities and keeping connected on island hops. Roaming charges in the Pacific are extreme without a local solution.' },
                  ].map((item, i) => {
                    const IconComp = item.icon
                    return (
                      <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, color: gold, display: 'flex', marginTop: 2 }}>
                          <IconComp size={20} strokeWidth={1.5} />
                        </span>
                        <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Budget Guide */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <DollarSign size={14} strokeWidth={1.5} color={gold} />
                  BUDGET GUIDE (PER PERSON / DAY)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Bora Bora', range: '$500–1,200/day', note: 'Ultra-luxury' },
                    { dest: 'Sydney / Auckland', range: '$200–400/day', note: 'Expensive' },
                    { dest: 'Queenstown', range: '$250–500/day', note: 'Premium adventure' },
                    { dest: 'Fiji (resort)', range: '$300–600/day', note: 'All-inclusive value' },
                    { dest: 'Hawaii', range: '$250–500/day', note: 'US pricing' },
                    { dest: 'Cook Islands', range: '$200–400/day', note: 'Good value' },
                    { dest: 'Australia (outback)', range: '$150–300/day', note: 'Remote premium' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600, marginBottom: 2 }}>{item.range}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: dim }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visa Overview */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Globe size={14} strokeWidth={1.5} color={gold} />
                  VISA OVERVIEW
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { heading: 'Australia', body: 'eVisitor visa for EU nationals, ETA for US/Canada/Korea. Most African nationals require Visitor visa (subclass 600) — apply 3+ months ahead. Biometrics and bank statements required.' },
                    { heading: 'New Zealand', body: 'NZeTA for most nationalities (US, UK, EU, Canada, Japan). Most African nationals require Visitor visa — apply 3 months ahead. Proof of onward travel essential.' },
                    { heading: 'French Polynesia', body: 'Visa-free for EU, US, Canada, many others for 90 days. French Polynesia is an overseas territory of France — Schengen visa valid for French Polynesia.' },
                    { heading: 'Fiji / Cook Islands', body: 'Visa-free for most nationalities for 30-90 days. Easy access — one of the most accessible regions in the South Pacific.' },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Wifi size={32} strokeWidth={1.2} color={gold} />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>🌏 PACIFIC TRAVEL ESIM</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across Australia, New Zealand, Fiji, French Polynesia, Hawaii and more</p>
            </div>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Smartphone size={14} strokeWidth={1.5} color="#080807" />
            GET PACIFIC ESIM
          </Link>
        </div>

        {/* Related */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari', icon: Compass },
            { label: 'Europe', href: '/europe', icon: Landmark },
            { label: 'Asia & Far East', href: '/asia', icon: MapPin },
            { label: 'Visa Requirements', href: '/visa-requirements', icon: Shield },
          ].map(link => {
            const IconComp = link.icon
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s', display: 'flex', alignItems: 'center', gap: 12 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                  <IconComp size={16} strokeWidth={1.5} color={gold} />
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>EXPLORE {link.label.toUpperCase()} →</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}






