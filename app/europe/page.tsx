'use client'
import React, { useState } from 'react'
import ResponsiveImage from '@/components/ResponsiveImage'
import Link from 'next/link'
import { europeDestinations } from './destinations'
import {
  Plane, Building2, Landmark, Compass, Flag, Star, Clock, DollarSign,
  MapPin, Sun, Bed, Coffee, Camera, Users, Gem, Thermometer,
  Calendar, ChevronUp, ChevronDown, Wifi, Smartphone, Shield, Train, Utensils, Trees
} from 'lucide-react'

// Huuboi Luxury Palette
const gold = '#C8A96E'
const cream = '#F5F5F0'
const muted = '#A0A095'
const dim = '#60605A'

// Region keys for filter (all European countries)
const regionKeys = ['All', 'France', 'Italy', 'Spain', 'Portugal', 'United Kingdom', 'Germany', 'Switzerland', 'Austria', 'Netherlands', 'Greece', 'Iceland']

const europeTypes = [
  { icon: Building2, title: 'Art & Culture', desc: 'The Louvre, Uffizi, Prado, Rijksmuseum — Europe holds more of the world\'s great art than anywhere else on earth.' },
  { icon: Utensils, title: 'Food & Wine', desc: 'French haute cuisine, Italian pasta, Spanish tapas, Portuguese wine — world-celebrated culinary culture.' },
  { icon: Landmark, title: 'History & Architecture', desc: 'From Roman amphitheatres to medieval castles to baroque palaces — heritage spanning 3,000 years.' },
  { icon: Sun, title: 'Mediterranean Beaches', desc: 'Santorini, Dubrovnik, Mallorca — the perfect combination of beauty, culture and sun.' },
  { icon: Trees, title: 'Alpine Adventures', desc: 'The Swiss Alps, French Alps and Dolomites offer the world\'s finest skiing, hiking and mountain scenery.' },
  { icon: Train, title: 'Rail Journeys', desc: 'The Glacier Express, Orient Express, and Eurostar make city-hopping across the continent effortless.' },
]

const multiCityRoutes = [
  { title: 'Classic Grand Tour', days: '14 days', cities: 'London → Paris → Rome → Venice → Barcelona', desc: 'The original European experience by train and flight.' },
  { title: 'Mediterranean Summer', days: '12 days', cities: 'Athens → Santorini → Mykonos → Dubrovnik → Split', desc: 'Island hopping and coastal beauty across the Eastern Med.' },
  { title: 'Nordic Explorer', days: '10 days', cities: 'Copenhagen → Bergen → Flåm → Oslo → Stockholm', desc: 'Fjords, design, and hygge across Scandinavia.' },
  { title: 'Iberian Peninsula', days: '10 days', cities: 'Madrid → Seville → Córdoba → Lisbon → Porto', desc: 'Moorish palaces and extraordinary food from Spain to Portugal.' },
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

export default function EuropePage() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedDest, setSelectedDest] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  const filtered = europeDestinations.filter(
    (d) => selectedRegion === 'All' || d.country === selectedRegion
  )

  // Get unique countries for stats
  const uniqueCountries = [...new Set(europeDestinations.map(d => d.country))]
  const unescoCount = europeDestinations.filter(d => d.unesco === true).length

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
            Explore <em style={{ color: gold }}>Europe</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            Plan and book your trip seamlessly with <Link href="/" style={{ color: gold, textDecoration: 'none' }}>Huuboi.com</Link>. Discover the continent that gave the world art, architecture, and cuisine. Fifty countries, a thousand languages, and history that never gets old.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/flights" target="_blank"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Plane size={14} strokeWidth={1.5} color="#080807" />
              SEARCH FLIGHTS
            </Link>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={14} strokeWidth={1.5} color={gold} />
              AI TRIP PLANNER
            </Link>
          </div>
        </div>

        {/* Stats - Dynamic */}
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: europeDestinations.length.toString(), label: 'Destinations', icon: MapPin },
            { num: `${uniqueCountries.length}+`, label: 'Countries', icon: Flag },
            { num: `${unescoCount}+`, label: 'UNESCO Sites', icon: Star },
            { num: '26', label: 'Schengen Area', icon: Shield },
            { num: '6', label: 'Culinary Capitals', icon: Utensils },
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

      {/* Content Area */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(200,169,110,0.15)', marginBottom: 48, overflowX: 'auto' }}>
          {[
            { key: 'destinations', label: 'Destinations', icon: MapPin },
            { key: 'experiences', label: 'Experiences', icon: Compass },
            { key: 'guide', label: 'Planning Guide', icon: Calendar },
          ].map(tab => {
            const IconComp = tab.icon
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '14px 24px', background: 'none', border: 'none', color: activeTab === tab.key ? gold : muted, borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
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

        {/* ── DESTINATIONS TAB ── */}
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
                      srcSet={`/images/europe/${dest.slug}-mobile.webp`}
                      media="(max-width: 480px)"
                      type="image/webp"
                    />
                    {/* Tablet: 481px to 1024px */}
                    <source
                      srcSet={`/images/europe/${dest.slug}-tablet.webp`}
                      media="(max-width: 1024px)"
                      type="image/webp"
                    />
                    {/* Desktop: 1025px and above */}
                    <source
                      srcSet={`/images/europe/${dest.slug}-desktop.webp`}
                      type="image/webp"
                    />
                    {/* Fallback JPG */}
                    <img
                      src={`/images/europe/${dest.slug}.jpg`}
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
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 300, color: cream, marginBottom: 4 }}>{dest.name}</h3>
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
                          {dest.camps.map((hotel: string, i: number) => (
                            <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Bed size={10} strokeWidth={1.5} color={gold} />
                              {hotel}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <Link href="/flights" target="_blank" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Plane size={14} strokeWidth={1.5} color="#080807" />
                        SEARCH FLIGHTS
                      </Link>
                      <Link href="/hotels" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Bed size={14} strokeWidth={1.5} color={gold} />
                        BOOK HOTEL
                      </Link>
                      <Link href="/cars" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '12px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Car size={14} strokeWidth={1.5} color={muted} />
                        RENT CAR
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
                Europe rewards the traveller who goes beyond the headline attractions. Plan your perfect route on <Link href="/" style={{ color: gold, textDecoration: 'none' }}>Huuboi.com</Link>.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {europeTypes.map(type => {
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
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Train size={14} strokeWidth={1.5} color={gold} />
                POPULAR MULTI-CITY ROUTES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
                {multiCityRoutes.map(route => (
                  <div key={route.title} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.08)', padding: '24px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: cream, fontWeight: 600 }}>{route.title}</h3>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', color: gold, border: '1px solid rgba(200,169,110,0.25)', padding: '3px 10px' }}>{route.days}</span>
                    </div>
                    <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: gold, marginBottom: 10 }}>{route.cities}</p>
                    <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.65 }}>{route.desc}</p>
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
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={14} strokeWidth={1.5} color={gold} />
                  SCHENGEN VISA & LOGISTICS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>WHAT IS SCHENGEN?</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7 }}>26 countries with one visa. France, Italy, Spain, and more. Check <Link href="/visa-requirements" style={{ color: gold }}>visa requirements</Link> on our site before booking.</p>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>GETTING AROUND</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7 }}>High-speed rail (Eurostar, TGV) is often faster than flying. Use our <Link href="/ai-planner" style={{ color: gold }}>AI Planner</Link> to optimize your route.</p>
                  </div>
                </div>
              </div>

              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <DollarSign size={14} strokeWidth={1.5} color={gold} />
                  DAILY BUDGET ESTIMATES
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                  {[
                    { dest: 'Switzerland', range: '€150–350/day' },
                    { dest: 'London', range: '£100–250/day' },
                    { dest: 'Paris / Rome', range: '€80–200/day' },
                    { dest: 'Prague / Krakow', range: '€40–100/day' },
                  ].map(item => (
                    <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600 }}>{item.range}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Travel Tools Strip */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Wifi size={32} strokeWidth={1.2} color={gold} />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>CONNECTIVITY & PROTECTION</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get your Europe eSIM and <Link href="/travel-insurance" style={{ color: gold, textDecoration: 'none' }}>Travel Insurance</Link> directly on Huuboi.</p>
            </div>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Smartphone size={14} strokeWidth={1.5} color="#080807" />
            GET EUROPE ESIM
          </Link>
        </div>

        {/* Footer Related Links */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari', icon: Compass },
            { label: 'Middle East', href: '/middle-east', icon: Landmark },
            { label: 'Asia & Far East', href: '/asia', icon: MapPin },
            { label: 'Visa Requirements', href: '/visa-requirements', icon: Shield },
          ].map(link => {
            const IconComp = link.icon
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <IconComp size={16} strokeWidth={1.5} color={gold} />
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>{link.label} →</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Missing Car icon component (if not in lucide-react imports)
function Car({ size = 24, strokeWidth = 1.5, color = '#C8A96E' }: { size?: number; strokeWidth?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.5 11.4 1 12.2 1 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}





