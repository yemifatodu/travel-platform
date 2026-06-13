'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { americasDestinations } from './destinations'
import {
  Plane, Building2, Landmark, Compass, Flag, Star, Clock, DollarSign,
  MapPin, Sun, Bed, Coffee, Camera, Users, Gem, Thermometer,
  Calendar, ChevronUp, ChevronDown, Wifi, Smartphone, Shield, Trees,
  Utensils, Music, Waves, Mountain, Globe, Ship, Car, Syringe, Lock
} from 'lucide-react'

// Huuboi Luxury Palette
const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// Region keys for filter
const regionKeys = ['All', 'USA', 'Canada', 'Mexico', 'Brazil', 'Peru', 'Patagonia', 'Colombia', 'Ecuador', 'Caribbean', 'Central America']

const americasTypes = [
  { icon: Mountain, title: 'Natural Wonders', desc: 'Patagonia\'s glaciers, the Galápagos, Iguazu Falls, the Amazon and the Atacama — the Americas contain a disproportionate share of the world\'s great natural spectacles.' },
  { icon: Landmark, title: 'Ancient Civilisations', desc: 'Machu Picchu, Chichen Itza, Teotihuacan, Tiwanaku — the pre-Columbian civilisations of the Americas built some of the world\'s most extraordinary monuments.' },
  { icon: Music, title: 'Music & Culture', desc: 'Samba in Rio, tango in Buenos Aires, salsa in Havana, jazz in New Orleans — the Americas invented the music that defined the 20th century.' },
  { icon: Utensils, title: 'Food & Gastronomy', desc: 'Argentine asado, Peruvian ceviche, Mexican tacos, Brazilian churrasco — South American food culture has exploded onto the world stage.' },
  { icon: Waves, title: 'Ocean & Adventure', desc: 'Caribbean coral reefs, Galápagos marine life, Pacific surf, Patagonian trekking — the Americas offer the full range of ocean and adventure travel.' },
  { icon: Building2, title: 'World-Class Cities', desc: 'New York, Buenos Aires, Rio, Mexico City, Toronto — the cities of the Americas are among the world\'s most dynamic and culturally rich.' },
]

const routes = [
  { title: 'South America Classic', days: '21 days', cities: 'Lima → Cusco → Machu Picchu → Buenos Aires → Patagonia', desc: 'The grand South American journey — Inca history, city culture and wilderness at the end of the world.' },
  { title: 'Caribbean & Central America', days: '14 days', cities: 'Mexico City → Oaxaca → Tulum → Costa Rica → Cartagena', desc: 'Ancient ruins, beach perfection, cloud forests and Caribbean colonial cities.' },
  { title: 'East Coast USA', days: '14 days', cities: 'New York → Washington D.C. → Boston → Acadia → Montreal', desc: 'The original American cities, great art museums and New England autumn foliage.' },
  { title: 'Brazilian Adventure', days: '12 days', cities: 'São Paulo → Salvador → Pantanal → Amazon → Rio de Janeiro', desc: 'Brazil\'s full diversity — urban culture, Afro-Brazilian heritage, wildlife and the marvelous city.' },
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

export default function AmericasPage() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedDest, setSelectedDest] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  const filtered = americasDestinations.filter(
    (d) => selectedRegion === 'All' || d.region === selectedRegion
  )

  // Get unique countries for stats
  const uniqueCountries = [...new Set(americasDestinations.map(d => d.country))]
  const unescoCount = americasDestinations.filter(d => d.unesco === true).length

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
            <a href="/" target="_blank" rel="noopener noreferrer"
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
            { num: americasDestinations.length.toString(), label: 'Destinations', icon: MapPin },
            { num: `${uniqueCountries.length}+`, label: 'Countries', icon: Flag },
            { num: `${unescoCount}+`, label: 'UNESCO Sites', icon: Star },
            { num: '3', label: 'Time Zones Spanned', icon: Clock },
            { num: '#1', label: 'Biodiversity Hotspot', icon: Trees },
          ].map(s => {
            const IconComp = s.icon
            return (
              <div key={s.label} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <IconComp size={24} strokeWidth={1.2} color={gold} />
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
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
                style={{ background: '#111110', border: `1px solid ${selectedDest?.slug === dest.slug ? gold : 'rgba(200,169,110,0.1)'}`, cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.2s' }}>

                {/* ── RESPONSIVE IMAGE CARD HEADER ── */}
                <div style={{ height: selectedDest?.slug === dest.slug ? 320 : 180, position: 'relative', overflow: 'hidden', transition: 'height 0.4s ease' }}>
                  <picture>
                    {/* Mobile: up to 480px */}
                    <source
                      srcSet={`/images/americas/${dest.slug}-mobile.webp`}
                      media="(max-width: 480px)"
                      type="image/webp"
                    />
                    {/* Tablet: 481px to 1024px */}
                    <source
                      srcSet={`/images/americas/${dest.slug}-tablet.webp`}
                      media="(max-width: 1024px)"
                      type="image/webp"
                    />
                    {/* Desktop: 1025px and above */}
                    <source
                      srcSet={`/images/americas/${dest.slug}-desktop.webp`}
                      type="image/webp"
                    />
                    {/* Fallback JPG */}
                    <img
                      src={`/images/americas/${dest.slug}.jpg`}
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
                          TOP CAMPS & HOTELS
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
                      <a href="/" target="_blank" rel="noopener noreferrer"
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
                Americas <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                The Americas stretch from Arctic wilderness to tropical rainforest — and every ecosystem between holds extraordinary experiences waiting to be discovered.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {americasTypes.map(type => {
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
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Ship size={14} strokeWidth={1.5} color={gold} />
                CLASSIC AMERICAS ROUTES
              </div>
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
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={14} strokeWidth={1.5} color={gold} />
                AMERICAS BY SEASON
              </div>
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
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={14} strokeWidth={1.5} color={gold} />
                  PRACTICAL ESSENTIALS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { icon: Syringe, tip: 'Yellow fever vaccination required or recommended for most of South America. Malaria prophylaxis for Amazon and jungle regions. Check requirements per country.' },
                    { icon: DollarSign, tip: 'US dollars are widely accepted or the de facto currency in Ecuador, Panama and Cuba. Carry small bills — change is often scarce. ATMs in cities are reliable.' },
                    { icon: Car, tip: 'Use Uber, Cabify or InDriver in major cities — much safer than hailing taxis. In rural areas, arrange transport through your hotel.' },
                    { icon: Mountain, tip: 'Altitude sickness is a serious risk in Peru (Cusco 3,400m), Bolivia and Ecuador. Acclimatise for 2+ days before strenuous activity. Diamox helps many travellers.' },
                    { icon: Smartphone, tip: 'Get a local SIM or travel eSIM on arrival — essential for Uber and navigation. WhatsApp is the universal communication tool across all of Latin America.' },
                    { icon: Lock, tip: 'Use hotel safes. Be discreet with phones and cameras on streets. Petty theft is common in tourist areas. Research specific safety advice per city before visiting.' },
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
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <DollarSign size={14} strokeWidth={1.5} color={gold} />
                  BUDGET GUIDE (PER PERSON / DAY)
                </div>
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
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Globe size={14} strokeWidth={1.5} color={gold} />
                  VISA OVERVIEW
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { heading: 'USA', body: 'ESTA (Visa Waiver) for UK, EU, Australia and many others. B1/B2 tourist visa required for Nigerian, Ghanaian and most African nationalities — apply 3+ months ahead with in-person embassy interview.' },
                    { heading: 'Brazil', body: 'Visa-free for UK, EU, US and Australian passport holders (recently changed). Most African nationals require an e-Visa. Yellow fever certificate required for many entry points.' },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Wifi size={32} strokeWidth={1.2} color={gold} />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>AMERICAS TRAVEL ESIM</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across USA, Brazil, Mexico, Peru, Colombia, Argentina and 30+ more countries</p>
            </div>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Smartphone size={14} strokeWidth={1.5} color="#080807" />
            GET AMERICAS ESIM
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





