'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

interface EsimPlan {
  id: string
  country: string
  country_code: string
  flag: string
  continent: string
  data_amount: string
  duration: string
  price: number
  currency: string
  validity_days: number
}

interface CountryGroup {
  name: string
  code: string
  flag: string
  continent: string
  plans: EsimPlan[]
}

const continents = ['All', 'Africa', 'Americas', 'Asia', 'Middle East', 'Europe', 'Oceania']

const benefits = [
  { icon: '📱', title: 'Instant Delivery', desc: 'Receive your eSIM QR code instantly after purchase — no shipping, no waiting.' },
  { icon: '🌍', title: 'Global Coverage', desc: 'Stay connected in 200+ countries with reliable local networks.' },
  { icon: '💸', title: 'No Roaming Fees', desc: 'Avoid expensive international roaming charges from your home provider.' },
  { icon: '🔄', title: 'Keep Your Number', desc: 'Use eSIM for data while keeping your physical SIM for calls and texts.' },
  { icon: '⚡', title: 'Easy Activation', desc: 'Scan QR code on arrival — connect to local networks instantly.' },
  { icon: '🎯', title: 'Flexible Plans', desc: 'Choose from 3, 5, 7, 15, or 30-day plans based on your trip length.' },
]

const steps = [
  { step: '01', title: 'Check Compatibility', desc: 'Ensure your phone is eSIM-compatible (iPhone XS+, Pixel 3+, Samsung S20+).' },
  { step: '02', title: 'Choose Your Plan', desc: 'Select your destination and data package based on your trip length.' },
  { step: '03', title: 'Purchase & Install', desc: 'Buy online, scan the QR code, and follow setup instructions.' },
  { step: '04', title: 'Stay Connected', desc: 'Activate on arrival — enjoy fast, reliable data without roaming fees.' },
]

export default function ESimPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [countries, setCountries] = useState<CountryGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch eSIM data from Supabase
  useEffect(() => {
    const fetchEsimData = async () => {
      try {
        setLoading(true)
        
        // Fetch all active eSIM plans from Supabase
        const { data, error: supabaseError } = await supabase
          .from('esim_plans')
          .select('*')
          .eq('is_active', true)
          .order('country', { ascending: true })
        
        if (supabaseError) throw supabaseError
        
        if (!data || data.length === 0) {
          setError('No eSIM plans found. Please check back later.')
          return
        }
        
        // Group plans by country
        const countryMap = new Map<string, CountryGroup>()
        
        data.forEach((plan: EsimPlan) => {
          if (!countryMap.has(plan.country)) {
            countryMap.set(plan.country, {
              name: plan.country,
              code: plan.country_code,
              flag: plan.flag,
              continent: plan.continent,
              plans: []
            })
          }
          countryMap.get(plan.country)!.plans.push(plan)
        })
        
        setCountries(Array.from(countryMap.values()))
      } catch (err) {
        console.error('Error fetching eSIM data:', err)
        setError('Failed to load eSIM plans. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchEsimData()
  }, [])

  // Filter countries based on search and continent
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesContinent = selectedContinent === 'All' || country.continent === selectedContinent
    return matchesSearch && matchesContinent
  })

  // Get plans for selected country
  const selectedCountryData = selectedCountry 
    ? countries.find(c => c.name === selectedCountry)
    : null

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: gold, fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem' }}>Loading eSIM plans from {countries.length || '200+'} countries...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20 }}>
        <div style={{ color: '#f87171', fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem' }}>{error}</div>
        <button onClick={() => window.location.reload()} style={{ background: gold, color: '#080807', padding: '12px 24px', border: 'none', fontFamily: "'Bebas Neue',sans-serif", cursor: 'pointer' }}>RETRY</button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg,#0a0805,#12100a,#0a0805)',
        borderBottom: '1px solid rgba(200,169,110,0.12)',
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,169,110,0.06) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block', marginRight: 12 }} />
            HUUBOI eSIM
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block', marginLeft: 12 }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 20 }}>
            Stay Connected <em style={{ color: gold }}>Anywhere</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 560, lineHeight: 1.8, marginBottom: 32, marginLeft: 'auto', marginRight: 'auto' }}>
            Instant eSIM delivery for {countries.length}+ countries. No roaming fees. Keep your number. Connect in minutes.
          </p>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 800, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 2, position: 'relative', zIndex: 1 }}>
          {[
            { num: `${countries.length}+`, label: 'Countries Covered' },
            { num: '24/7', label: 'Support' },
            { num: 'Instant', label: 'Delivery' },
            { num: 'No Contract', label: 'Pay as You Go' },
          ].map(s => (
            <div key={s.num} style={{ background: 'rgba(8,8,7,0.6)', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 600, color: gold, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: dim, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Search & Filter Section */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 24 }}>
            {continents.map(continent => (
              <button key={continent} onClick={() => setSelectedContinent(continent)}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', background: selectedContinent === continent ? gold : 'transparent', color: selectedContinent === continent ? '#080807' : muted, border: `1px solid ${selectedContinent === continent ? gold : 'rgba(200,169,110,0.2)'}`, padding: '10px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
                {continent}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative' }}>
            <input type="text" placeholder="Search for a country... (e.g., Nigeria, Japan, USA)"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: '16px 20px', color: cream, fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', outline: 'none' }} />
            <span style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: dim }}>🔍</span>
          </div>
        </div>

        {/* Country Grid */}
        {!selectedCountry ? (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>
                SELECT YOUR DESTINATION
              </div>
              <p style={{ color: muted, fontSize: '0.9rem' }}>{filteredCountries.length} countries available</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 2 }}>
              {filteredCountries.map(country => (
                <div key={country.code} onClick={() => setSelectedCountry(country.name)}
                  style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = gold)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                  <span style={{ fontSize: '1.5rem' }}>{country.flag}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream }}>{country.name}</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: dim }}>{country.continent}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <button onClick={() => setSelectedCountry(null)}
              style={{ background: 'none', border: 'none', color: gold, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              ← BACK TO {filteredCountries.length} COUNTRIES
            </button>

            {/* Plans for selected country */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <span style={{ fontSize: '3rem' }}>{selectedCountryData?.flag}</span>
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', fontWeight: 300, color: cream, margin: 0 }}>{selectedCountry}</h2>
                  <p style={{ color: muted, fontSize: '0.9rem', marginTop: 4 }}>{selectedCountryData?.plans.length} data plans available — no contracts, no surprises</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 2 }}>
              {selectedCountryData?.plans.map((plan) => (
                <div key={plan.id} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '22px', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = gold)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 600, color: gold }}>{plan.data_amount}</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim }}>{plan.duration}</div>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', fontWeight: 600, color: cream }}>
                      {plan.currency} {plan.price}
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: gold, padding: '3px 8px' }}>📱 eSIM</span>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: gold, padding: '3px 8px' }}>⏱️ {plan.validity_days} days</span>
                    </div>
                  </div>
                  <a href={`/checkout?plan=${plan.id}`} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 20px', textDecoration: 'none', display: 'inline-block', width: '100%', textAlign: 'center' }}>
                    GET eSIM →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div style={{ marginTop: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,2.5rem)', fontWeight: 300, color: cream }}>
              Why Choose <em style={{ color: gold }}>Huuboi eSIM</em>
            </h2>
            <p style={{ color: muted, maxWidth: 500, margin: '12px auto 0' }}>The smart way to stay connected while traveling</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2 }}>
            {benefits.map(benefit => (
              <div key={benefit.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{benefit.icon}</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>{benefit.title}</h3>
                <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{ marginTop: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,2.5rem)', fontWeight: 300, color: cream }}>
              How <em style={{ color: gold }}>It Works</em>
            </h2>
            <p style={{ color: muted, maxWidth: 500, margin: '12px auto 0' }}>Get connected in 4 simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 2 }}>
            {steps.map(step => (
              <div key={step.step} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.5rem', color: gold, opacity: 0.4, marginBottom: 8 }}>{step.step}</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.9rem', letterSpacing: '0.15em', color: cream, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility Check */}
        <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,32px)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>📱 IS YOUR PHONE COMPATIBLE?</div>
          <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 20 }}>Most modern smartphones support eSIM — iPhone XS and newer, Google Pixel 3 and newer, Samsung S20 and newer.</p>
          <a href="/compatibility" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}>
            CHECK COMPATIBILITY →
          </a>
        </div>

        {/* Related Links */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari' },
            { label: 'Americas', href: '/americas' },
            { label: 'Asia & Far East', href: '/asia' },
            { label: 'Support Center', href: '/support' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>EXPLORE {link.label.toUpperCase()} →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}