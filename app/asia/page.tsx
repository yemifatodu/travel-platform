'use client'
import { useState } from 'react'
import ResponsiveImage from '@/components/ResponsiveImage'
import Link from 'next/link'
import { asiaDestinations } from './destinations'
import {
  Plane, Building2, Landmark, Compass, Flag, Star, Clock, DollarSign,
  MapPin, Sun, Bed, Coffee, Camera, Users, Gem, Thermometer,
  Calendar, ChevronUp, ChevronDown, Wifi, Smartphone, Shield, Trees,
  Utensils, Waves, Mountain, Globe, Ship, Car, Syringe, Lock, Train
} from 'lucide-react'

// Huuboi Luxury Palette
const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// Region keys for filter
const regionKeys = ['All', 'Japan', 'China', 'South Korea', 'India', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Singapore', 'Philippines', 'Sri Lanka', 'Nepal', 'Cambodia', 'Maldives']

const asiaTypes = [
  { icon: Landmark, title: 'Cultural & Spiritual', desc: 'Kyoto\'s temples, Bali\'s offerings, Thailand\'s Golden Buddha — Asia is the world\'s spiritual heartland.' },
  { icon: Building2, title: 'Mega-City Energy', desc: 'Tokyo, Bangkok, Singapore, Seoul — Asian cities operate at a frequency no other continent can match.' },
  { icon: Waves, title: 'Tropical Paradise', desc: 'Maldives, Bali, Thailand\'s islands, Philippines — Asia has the world\'s most beautiful beaches.' },
  { icon: Mountain, title: 'Mountain & Nature', desc: 'Japanese Alps, Himalayas, Vietnam\'s limestone karsts, Borneo\'s rainforests.' },
  { icon: Utensils, title: 'World-Class Food', desc: 'From Tokyo\'s 200+ Michelin-starred restaurants to Bangkok\'s legendary street food — Asia is the world\'s greatest food destination.' },
  { icon: Globe, title: 'Ancient Wonders', desc: 'Angkor Wat, Bagan, Great Wall, Borobudur — Asia contains the world\'s most extraordinary ancient monuments.' },
]

const planningTips = [
  { icon: Smartphone, tip: 'Get an eSIM before arrival — Airalo or Holafly work across most Asian countries. Japan requires local pick-up.' },
  { icon: DollarSign, tip: 'Japan, South Korea, Vietnam still largely cash-based. ATMs work but carry local currency for street food and markets.' },
  { icon: Gem, tip: 'Temple etiquette: remove shoes, dress modestly (shoulders and knees covered). Never point feet at Buddha statues.' },
  { icon: Coffee, tip: 'Eat where the locals eat — busy stalls = fresh food. Hawker centres in Singapore are spotless and incredible.' },
  { icon: Train, tip: 'Public transport in Tokyo, Singapore, Seoul is world-class. Use Google Maps or Citymapper for navigation.' },
  { icon: Car, tip: 'Plug types vary — Japan (Type A/B), Bali (C/F), Singapore (G), Thailand (C/O). Bring a universal adapter.' },
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

export default function AsiaPage() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedDest, setSelectedDest] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations')

  const filtered = asiaDestinations.filter(
    (d) => selectedRegion === 'All' || d.region === selectedRegion
  )

  // Get unique countries for stats
  const uniqueCountries = [...new Set(asiaDestinations.map(d => d.country))]
  const unescoCount = asiaDestinations.filter(d => d.unesco === true).length

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg,#080a12,#0e1020,#080a0e)',
        borderBottom: '1px solid rgba(200,169,110,0.12)',
        padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 40% 50%, rgba(200,169,110,0.06) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            ASIA & FAR EAST
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 28 }}>
            Asia <em style={{ color: gold }}>& Far East</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            Asia defies any single definition — it is the sum of dozens of completely different worlds, from Tokyo's neon future to Kyoto's ancient temples, Bali's rice terraces to the Maldives' turquoise waters.
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
        <div style={{ maxWidth: 1200, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: asiaDestinations.length.toString(), label: 'Featured Destinations', icon: MapPin },
            { num: `${uniqueCountries.length}+`, label: 'Countries', icon: Flag },
            { num: `${unescoCount}+`, label: 'UNESCO Sites', icon: Star },
            { num: '60%', label: 'World Population', icon: Users },
            { num: '3', label: 'Major Religions', icon: Gem },
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

      {/* Main Content */}
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

        {/* DESTINATIONS TAB */}
        {activeTab === 'destinations' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 2 }}>
            {filtered.map(dest => (
              <div key={dest.slug}
                onClick={() => setSelectedDest(selectedDest?.slug === dest.slug ? null : dest)}
                style={{ background: '#111110', border: `1px solid ${selectedDest?.slug === dest.slug ? gold : 'rgba(200,169,110,0.1)'}`, cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <div style={{ background: dest.gradient, height: 130, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.75) 0%,transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={12} strokeWidth={1.5} color={gold} />
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: gold }}>{dest.country}</div>
                  </div>
                </div>
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
                Asia <em style={{ color: gold }}>Experiences</em>
              </h2>
              <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>
                Asia defies any single definition — it is the sum of dozens of completely different worlds, each extraordinary in its own right.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
              {asiaTypes.map(type => {
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

            {/* Season Guide */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={14} strokeWidth={1.5} color={gold} />
                ASIA BY SEASON
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { period: 'Dec – Feb', desc: 'Peak season for Thailand, Vietnam (south), Maldives, Bali. Japan snow season in Hokkaido. Best for escaping winter.', level: 'Peak SE Asia', color: '#f87171' },
                  { period: 'Mar – May', desc: 'Japan cherry blossom — Kyoto and Tokyo are extraordinary. Best time for Seoul and Beijing.', level: 'Japan Peak', color: '#f87171' },
                  { period: 'Apr – Oct', desc: 'Bali and Indonesia dry season — ideal for beaches. Vietnam (north) and Philippines best now.', level: 'Bali Peak', color: '#4ade80' },
                  { period: 'Sep – Nov', desc: 'Japan autumn colours — stunning foliage in Kyoto. Maldives shoulder season with lower prices.', level: 'Japan Autumn', color: '#fbbf24' },
                ].map(row => (
                  <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 140px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px', textAlign: 'center' as const }}>{row.level}</span>
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
                Planning Your <em style={{ color: gold }}>Asia Trip</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Practical Tips */}
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={14} strokeWidth={1.5} color={gold} />
                  ASIA ESSENTIALS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                  {planningTips.map((item, i) => {
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
                    { dest: 'Japan', range: '$120–400/day', note: 'Expensive but worth it' },
                    { dest: 'Singapore', range: '$100–300/day', note: 'Premium city' },
                    { dest: 'Maldives', range: '$300–1,000/day', note: 'Remote luxury' },
                    { dest: 'Thailand', range: '$50–200/day', note: 'Great value' },
                    { dest: 'Bali', range: '$50–180/day', note: 'Excellent value' },
                    { dest: 'Vietnam', range: '$35–120/day', note: 'Budget-friendly' },
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
                    { heading: 'Japan', body: 'Visa-free for 70+ countries including USA, UK, EU, Australia. Most African passports require pre-arranged visa — apply 2+ weeks ahead.' },
                    { heading: 'Thailand / Vietnam / Indonesia', body: 'Visa-free or Visa on Arrival for most Western passports. Check updated requirements before travel.' },
                    { heading: 'China', body: 'Visa required for most nationalities. Apply 4–6 weeks ahead through embassy or visa agency.' },
                    { heading: 'Singapore', body: 'Visa-free for 30–90 days for most nationalities. Check ICA website for latest entry rules.' },
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

        {/* eSIM Strip */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Wifi size={32} strokeWidth={1.2} color={gold} />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>ASIA TRAVEL ESIM</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected across Japan, Thailand, Indonesia, Vietnam, Singapore and 50+ more Asian countries</p>
            </div>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Smartphone size={14} strokeWidth={1.5} color="#080807" />
            GET ASIA ESIM
          </Link>
        </div>

        {/* Related Destinations */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari', icon: Compass },
            { label: 'Middle East', href: '/middle-east', icon: Landmark },
            { label: 'Europe', href: '/europe', icon: Globe },
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