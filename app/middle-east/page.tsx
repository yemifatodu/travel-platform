'use client'
import React, { useState } from 'react'
import ResponsiveImage from '@/components/ResponsiveImage'
import Link from 'next/link'
import { middleEastDestinations } from './destinations'
import {
  Plane, Building2, Landmark, Compass, Flag, Star, Clock, DollarSign,
  MapPin, Sun, Bed, Coffee, Camera, Users, Gem, Thermometer,
  Calendar, ChevronUp, ChevronDown, Wifi, Smartphone, Shield
} from 'lucide-react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// Region keys for filter
const regionKeys = ['All', 'UAE', 'Saudi Arabia', 'Jordan', 'Oman', 'Turkey', 'Qatar', 'Egypt', 'Israel/Palestine', 'Lebanon', 'Bahrain', 'Kuwait']

const experienceTypes = [
  { icon: Building2, title: 'Luxury City Breaks', desc: 'Dubai and Abu Dhabi set the global standard for luxury hotels, fine dining and world-class shopping in a desert metropolis.' },
  { icon: Landmark, title: 'Ancient Civilisations', desc: 'Petra, Hegra, Jerash and Cappadocia — the Middle East contains some of the world\'s most important and least visited archaeological sites.' },
  { icon: Compass, title: 'Desert Adventures', desc: 'From the Wadi Rum\'s Martian landscape to the Wahiba Sands and Saudi\'s Empty Quarter — the Arabian desert is extraordinary.' },
  { icon: Sun, title: 'Hot Air Ballooning', desc: 'Cappadocia\'s balloon sunrise is one of travel\'s great experiences. Dubai and Petra also offer balloon flights over dramatic landscapes.' },
  { icon: Droplets, title: 'Red Sea Diving', desc: 'Jordan\'s Aqaba and Egypt\'s Sinai coast offer some of the world\'s best diving — warm water, extraordinary coral and minimal crowds.' },
  { icon: Gem, title: 'Islamic Architecture', desc: 'The Sheikh Zayed Mosque, Sultan Qaboos Grand Mosque and Istanbul\'s Blue Mosque are among the world\'s most beautiful buildings.' },
]

// Droplets icon component
function Droplets({ size = 24, strokeWidth = 1.5, color = '#C8A96E' }: { size?: number; strokeWidth?: number; color?: string }) {
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
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  )
}

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

export default function MiddleEastPage() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedDest, setSelectedDest] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  const filtered = middleEastDestinations.filter(
    (d) => selectedRegion === 'All' || d.country === selectedRegion
  )

  // Get unique countries for stats
  const uniqueCountries = [...new Set(middleEastDestinations.map(d => d.country))]
  const unescoCount = middleEastDestinations.filter(d => d.unesco === true).length

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg,#0a0800,#1a1000,#0d0a14)',
        borderBottom: '1px solid rgba(200,169,110,0.12)',
        padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(232,160,90,0.08) 0%, transparent 70%)'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            color: gold,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            MIDDLE EAST
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(3rem,8vw,7rem)',
            fontWeight: 300,
            color: cream,
            lineHeight: 0.92,
            marginBottom: 28
          }}>
            Middle<br /><em style={{ color: gold }}>East</em>
          </h1>

          <p style={{
            color: muted,
            fontSize: 'clamp(0.95rem,2vw,1.1rem)',
            maxWidth: 560,
            lineHeight: 1.8,
            marginBottom: 40
          }}>
            Ancient cities carved in rose-red rock. Ultramodern skylines rising from the desert.
            The Middle East delivers unmatched travel experiences.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="/flights"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                background: gold,
                color: '#080807',
                padding: '16px 36px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Plane size={14} strokeWidth={1.5} color="#080807" />
              SEARCH FLIGHTS
            </a>
            <Link
              href="/ai-planner"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                border: '1px solid rgba(200,169,110,0.4)',
                color: gold,
                padding: '16px 36px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Calendar size={14} strokeWidth={1.5} color={gold} />
              PLAN MY TRIP
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          maxWidth: 1200,
          margin: '48px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
          gap: 2,
          position: 'relative',
          zIndex: 1
        }}>
          {[
            { num: middleEastDestinations.length.toString(), label: 'Destinations', icon: MapPin },
            { num: `${uniqueCountries.length}+`, label: 'Countries', icon: Flag },
            { num: `${unescoCount}+`, label: 'UNESCO Sites', icon: Star },
            { num: '3', label: 'Time Zones', icon: Clock },
            { num: '2', label: 'Continents', icon: Compass },
          ].map(s => {
            const IconComp = s.icon
            return (
              <div key={s.label} style={{
                background: 'rgba(8,8,7,0.6)',
                border: '1px solid rgba(200,169,110,0.1)',
                padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <IconComp size={24} strokeWidth={1.2} color={gold} />
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 'clamp(1.3rem,3vw,2rem)',
                  fontWeight: 600,
                  color: gold,
                  lineHeight: 1
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.55rem',
                  letterSpacing: '0.18em',
                  color: dim,
                  marginTop: 6
                }}>
                  {s.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid rgba(200,169,110,0.15)',
          marginBottom: 48
        }}>
          {[
            { key: 'destinations', label: 'Destinations', icon: MapPin },
            { key: 'experiences', label: 'Experiences', icon: Compass },
            { key: 'guide', label: 'Planning Guide', icon: Calendar }
          ].map(tab => {
            const IconComp = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  padding: '14px 24px',
                  background: 'none',
                  border: 'none',
                  color: activeTab === tab.key ? gold : muted,
                  borderBottom: activeTab === tab.key ? `2px solid ${gold}` : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <IconComp size={14} strokeWidth={1.5} color={activeTab === tab.key ? gold : muted} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Region Filter */}
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
            {filtered.map((dest: any) => (
              <div key={dest.slug}
                onClick={() => setSelectedDest(selectedDest?.slug === dest.slug ? null : dest)}
                style={{
                  background: '#111110',
                  border: `1px solid ${selectedDest?.slug === dest.slug ? gold : 'rgba(200,169,110,0.1)'}`,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s'
                }}>

                {/* ── RESPONSIVE IMAGE CARD HEADER ── */}
                <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
                  <picture>
                    {/* Mobile: up to 480px */}
                    <source
                      srcSet={`/images/middle-east/${dest.slug}-mobile.webp`}
                      media="(max-width: 480px)"
                      type="image/webp"
                    />
                    {/* Tablet: 481px to 1024px */}
                    <source
                      srcSet={`/images/middle-east/${dest.slug}-tablet.webp`}
                      media="(max-width: 1024px)"
                      type="image/webp"
                    />
                    {/* Desktop: 1025px and above */}
                    <source
                      srcSet={`/images/middle-east/${dest.slug}-desktop.webp`}
                      type="image/webp"
                    />
                    {/* Fallback JPG */}
                    <img
                      src={`/images/middle-east/${dest.slug}.jpg`}
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
                    ].map((s) => {
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
                          TOP CAMPS & LODGES
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
                Middle East <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                From desert camps to ancient tombs, the Middle East offers experiences found nowhere else on earth.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {experienceTypes.map((exp) => {
                const IconComp = exp.icon
                return (
                  <div key={exp.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                    <div style={{ marginBottom: 16, color: gold, display: 'flex' }}>
                      <IconComp size={32} strokeWidth={1.2} />
                    </div>
                    <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{exp.title}</h3>
                    <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{exp.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Season Guide */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={14} strokeWidth={1.5} color={gold} />
                MIDDLE EAST BY SEASON
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'Nov – Mar', desc: 'Peak Gulf season — 20–28°C, perfect for Dubai, Abu Dhabi, Doha, Oman. Also ideal for Petra and Wadi Rum.', level: 'Peak Season', color: '#f87171' },
                  { period: 'Apr – May', desc: 'Turkey and Jordan at their best — wildflowers, mild temperatures, fewer crowds.', level: 'Ideal for Turkey/Jordan', color: '#4ade80' },
                  { period: 'Jun – Aug', desc: 'Extreme Gulf heat (45°C+). Avoid unless staying indoors. Cappadocia still pleasant mornings/evenings.', level: 'Very Hot', color: '#fb923c' },
                  { period: 'Sep – Oct', desc: 'Best balance — Gulf temperatures drop, Jordan and Turkey still beautiful. Shoulder season prices.', level: 'Great Balance', color: '#fbbf24' },
                ].map((row) => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 140px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px', textAlign: 'center' }}>{row.level}</span>
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
                Planning Your <em style={{ color: gold }}>Middle East Trip</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={14} strokeWidth={1.5} color={gold} />
                  PRACTICAL TIPS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { icon: Users, tip: 'Dress modestly in public areas — shoulders and knees covered, especially near mosques and traditional markets.' },
                    { icon: Gem, tip: 'Respect mosque rules — remove shoes, women cover hair. Non-Muslims are welcome in most major mosques outside prayer times.' },
                    { icon: Coffee, tip: 'Alcohol laws vary sharply — legal in UAE, Qatar, Oman (hotels only), Turkey, Jordan. Illegal in Saudi Arabia. Never drink in public.' },
                    { icon: Camera, tip: 'Ask before photographing people, especially women and anyone in uniform. Military and government buildings are prohibited.' },
                    { icon: DollarSign, tip: 'Cash is still king in traditional markets and taxis. US dollars widely accepted in Gulf, but Jordan and Turkey prefer local currency.' },
                    { icon: Thermometer, tip: 'Summer (Jun–Aug) in Gulf states is extreme (45°C+). Plan indoor activities. Winter (Nov–Mar) is peak season with perfect weather.' },
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
                    { dest: 'Dubai / Abu Dhabi', range: '$120–300/day', note: 'Luxury premium' },
                    { dest: 'Doha / Muscat', range: '$100–250/day', note: 'High-end' },
                    { dest: 'Istanbul / Cappadocia', range: '$60–150/day', note: 'Good value' },
                    { dest: 'Jordan / Petra', range: '$50–120/day', note: 'Budget-friendly' },
                  ].map((item) => (
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
                  <Shield size={14} strokeWidth={1.5} color={gold} />
                  VISA OVERVIEW
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {[
                    { heading: 'UAE', body: 'Visa-free for many nationalities. Most African passports require pre-arranged visa — apply 2+ weeks ahead.' },
                    { heading: 'Turkey', body: 'e-Visa available online for most nationalities — quick and straightforward. Valid for 90 days.' },
                    { heading: 'Jordan', body: 'Jordan Pass includes visa fee + entry to Petra, Wadi Rum. Buy before arrival — highly recommended.' },
                    { heading: 'Saudi Arabia', body: 'e-Visa available for tourism since 2019. Also eligible for Visa on Arrival for many nationalities.' },
                  ].map((item) => (
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

        {/* eSIM Strip */}
        <div style={{
          marginTop: 48,
          background: 'rgba(200,169,110,0.06)',
          border: '1px solid rgba(200,169,110,0.2)',
          padding: '22px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Smartphone size={32} strokeWidth={1.2} color={gold} />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>MIDDLE EAST TRAVEL ESIM</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across UAE, Saudi Arabia, Qatar, Oman, Turkey, Jordan and more</p>
            </div>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Wifi size={14} strokeWidth={1.5} color="#080807" />
            GET MIDDLE EAST ESIM
          </Link>
        </div>

        {/* Related Destinations */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          <Link href="/africa-safari" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#111110',
              border: '1px solid rgba(200,169,110,0.1)',
              padding: '18px 20px',
              transition: 'border-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
              <Compass size={16} strokeWidth={1.5} color={gold} />
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>EXPLORE AFRICA & SAFARI →</div>
            </div>
          </Link>

          <Link href="/asia" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#111110',
              border: '1px solid rgba(200,169,110,0.1)',
              padding: '18px 20px',
              transition: 'border-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
              <MapPin size={16} strokeWidth={1.5} color={gold} />
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>EXPLORE ASIA & FAR EAST →</div>
            </div>
          </Link>

          <Link href="/europe" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#111110',
              border: '1px solid rgba(200,169,110,0.1)',
              padding: '18px 20px',
              transition: 'border-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
              <Landmark size={16} strokeWidth={1.5} color={gold} />
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>EXPLORE EUROPE →</div>
            </div>
          </Link>

          <Link href="/visa-requirements" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#111110',
              border: '1px solid rgba(200,169,110,0.1)',
              padding: '18px 20px',
              transition: 'border-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
              <Shield size={16} strokeWidth={1.5} color={gold} />
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>EXPLORE VISA REQUIREMENTS →</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}


