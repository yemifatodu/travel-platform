'use client'
import { useState } from 'react'
import Link from 'next/link'

const travelStyles = ['Budget', 'Mid-Range', 'Luxury', 'Ultra-Luxury']
const includeOptions = [
  'International Flights',
  'Accommodation',
  'Food & Dining',
  'Guided Tours',
  'Travel Insurance',
  'Airport Transfers',
  'Visa Fees',
  'Shopping',
]

// Base daily costs per person per style (USD)
const styleCosts: Record<string, { flights: [number,number], hotel: [number,number], food: [number,number], activities: [number,number], transport: [number,number], insurance: [number,number], visa: [number,number], shopping: [number,number] }> = {
  'Budget':        { flights:[300,600],   hotel:[20,60],    food:[15,35],   activities:[10,25],  transport:[5,15],   insurance:[3,6],    visa:[20,50],  shopping:[10,30]  },
  'Mid-Range':     { flights:[600,1200],  hotel:[80,180],   food:[40,80],   activities:[30,70],  transport:[15,35],  insurance:[5,10],   visa:[30,60],  shopping:[30,80]  },
  'Luxury':        { flights:[1200,2500], hotel:[200,500],  food:[80,180],  activities:[80,200], transport:[40,100], insurance:[8,18],   visa:[40,80],  shopping:[80,200] },
  'Ultra-Luxury':  { flights:[3000,8000], hotel:[500,2000], food:[200,500], activities:[200,600],transport:[100,300],insurance:[15,40], visa:[50,120], shopping:[200,600]},
}

// Regional multipliers
const getRegionMultiplier = (dest: string): number => {
  const d = dest.toLowerCase()
  if (/bali|indonesia|vietnam|cambodia|thailand|laos|myanmar|india|nepal|ethiopia|kenya nairobi|ghana|nigeria/.test(d)) return 0.65
  if (/morocco|egypt|jordan|turkey|georgia|albania|serbia|colombia|peru|mexico/.test(d)) return 0.80
  if (/japan|australia|new zealand|singapore|hong kong|norway|switzerland|iceland/.test(d)) return 1.35
  if (/dubai|uae|maldives|seychelles/.test(d)) return 1.50
  if (/uk|london|paris|france|amsterdam|denmark|sweden/.test(d)) return 1.20
  return 1.0
}

const tips: Record<string, string[]> = {
  'Budget': [
    'Book flights 6–8 weeks in advance for the best fares',
    'Use hostels, guesthouses or Airbnb rooms instead of hotels',
    'Eat at local markets and street food stalls — best food, best prices',
    'Use public transport and shared transfers instead of taxis',
    'Travel shoulder season (Apr–May or Sep–Oct) for lower prices',
  ],
  'Mid-Range': [
    'Set a fare price alert on Skyscanner to catch deals early',
    'Book hotels with free cancellation so you can rebook if prices drop',
    'Mix paid tours with free self-guided walking tours',
    'Get a travel eSIM at huuboi.com/esim to avoid roaming charges',
    'Use a no-foreign-fee credit card for all purchases',
  ],
  'Luxury': [
    'Book business class flights 3–4 months ahead for best availability',
    'Look for boutique 5-star hotels — often better value than major chains',
    'Book private tours in advance through GetYourGuide for VIP experiences',
    'Travel with a comprehensive insurance policy covering medical evacuation',
    'Consider a multi-destination trip to maximise your long-haul flight cost',
  ],
  'Ultra-Luxury': [
    'Use a travel concierge service for seamless end-to-end trip management',
    'Private jet charter can be cost-effective for groups of 6+',
    'Book ultra-luxury properties 6–12 months ahead — limited availability',
    'Consider chartering a private yacht for island destinations',
    'Work with specialist luxury safari operators for exclusive wildlife access',
  ],
}

export default function BudgetCalculator() {
  const [form, setForm] = useState({
    destination: '',
    days: 7,
    travelers: 2,
    style: 'Luxury',
    includes: ['International Flights', 'Accommodation', 'Food & Dining'] as string[],
  })
  const [budget, setBudget] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const gold = '#C8A96E'
  const ink = '#080807'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'
  const dim = 'rgba(245,239,228,0.35)'

  const toggle = (item: string) =>
    setForm(f => ({
      ...f,
      includes: f.includes.includes(item)
        ? f.includes.filter(x => x !== item)
        : [...f.includes, item],
    }))

  const calculate = async () => {
    if (!form.destination.trim()) { setError('Please enter a destination'); return }
    setLoading(true)
    setError('')
    setBudget(null)

    // Try AI first, fall back to built-in calculator
    try {
      const res = await fetch('/api/budget-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.total_min) {
        setBudget({ ...data, source: 'ai' })
        setLoading(false)
        return
      }
    } catch {}

    // Built-in calculator fallback — always works
    const mult = getRegionMultiplier(form.destination)
    const costs = styleCosts[form.style]
    const d = form.days
    const t = form.travelers

    const calc = (range: [number, number], perDay = true) => ({
      min: Math.round(range[0] * mult * (perDay ? d : 1) * t),
      max: Math.round(range[1] * mult * (perDay ? d : 1) * t),
    })

    const breakdown: Record<string, { min: number; max: number }> = {}
    let totalMin = 0; let totalMax = 0

    if (form.includes.includes('International Flights')) {
      breakdown['flights'] = calc(costs.flights, false)
    }
    if (form.includes.includes('Accommodation')) {
      breakdown['accommodation'] = calc(costs.hotel)
    }
    if (form.includes.includes('Food & Dining')) {
      breakdown['food_and_dining'] = calc(costs.food)
    }
    if (form.includes.includes('Guided Tours')) {
      breakdown['tours_and_activities'] = calc(costs.activities)
    }
    if (form.includes.includes('Airport Transfers')) {
      breakdown['transfers_and_transport'] = calc(costs.transport)
    }
    if (form.includes.includes('Travel Insurance')) {
      breakdown['travel_insurance'] = calc(costs.insurance)
    }
    if (form.includes.includes('Visa Fees')) {
      breakdown['visa_fees'] = { min: Math.round(costs.visa[0] * t), max: Math.round(costs.visa[1] * t) }
    }
    if (form.includes.includes('Shopping')) {
      breakdown['shopping_and_souvenirs'] = calc(costs.shopping)
    }

    // Add misc buffer
    const miscMin = Math.round(Object.values(breakdown).reduce((s, v) => s + v.min, 0) * 0.08)
    const miscMax = Math.round(Object.values(breakdown).reduce((s, v) => s + v.max, 0) * 0.08)
    breakdown['miscellaneous'] = { min: miscMin, max: miscMax }

    Object.values(breakdown).forEach(v => { totalMin += v.min; totalMax += v.max })

    setBudget({
      total_min: totalMin,
      total_max: totalMax,
      per_day_min: Math.round(totalMin / d / t),
      per_day_max: Math.round(totalMax / d / t),
      breakdown,
      money_tips: tips[form.style],
      source: 'calculator',
    })
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    background: '#1C1B18',
    border: '1px solid rgba(200,169,110,0.2)',
    color: cream,
    padding: '14px 18px',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: "'DM Sans',sans-serif",
    fontWeight: 300,
  } as React.CSSProperties

  const labelStyle = {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.25em',
    color: gold,
    marginBottom: 8,
    display: 'block',
  } as React.CSSProperties

  const categories = budget ? Object.entries(budget.breakdown || {}) : []

  return (
    <div style={{ minHeight: '100vh', background: ink, paddingTop: 100 }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,40px)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            TRAVEL PLANNING TOOL
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,6vw,5.5rem)', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 20 }}>
            Budget <em style={{ color: gold }}>Calculator</em>
          </h1>
          <p style={{ color: muted, lineHeight: 1.8, maxWidth: 500, margin: '0 auto', fontSize: '0.97rem' }}>
            Get a detailed cost estimate for your next trip — broken down by category. Works for any destination worldwide.
          </p>
        </div>

        {/* Form */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,4vw,48px)', marginBottom: 32 }}>

          {/* Row 1: Destination + Days + Travellers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={labelStyle} htmlFor="destination-input">DESTINATION</label>
              <input
                id="destination-input"
                name="destination"
                placeholder="e.g. Bali, Paris, Dubai, Lagos"
                value={form.destination}
                onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>TRIP DURATION: {form.days} DAYS</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                <button onClick={() => setForm(f => ({ ...f, days: Math.max(1, f.days - 1) }))} style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: gold, width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <input type="range" min={1} max={30} value={form.days} onChange={e => setForm(f => ({ ...f, days: +e.target.value }))} style={{ flex: 1, accentColor: gold }} />
                <button onClick={() => setForm(f => ({ ...f, days: Math.min(30, f.days + 1) }))} style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: gold, width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>TRAVELLERS: {form.travelers}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                <button onClick={() => setForm(f => ({ ...f, travelers: Math.max(1, f.travelers - 1) }))} style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: gold, width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <input type="range" min={1} max={10} value={form.travelers} onChange={e => setForm(f => ({ ...f, travelers: +e.target.value }))} style={{ flex: 1, accentColor: gold }} />
                <button onClick={() => setForm(f => ({ ...f, travelers: Math.min(10, f.travelers + 1) }))} style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: gold, width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          </div>

          {/* Travel Style */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>TRAVEL STYLE</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {travelStyles.map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, style: s }))} style={{ background: form.style === s ? gold : 'transparent', border: `1px solid ${form.style === s ? gold : 'rgba(200,169,110,0.2)'}`, color: form.style === s ? ink : muted, padding: '12px 8px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 6 }}>
              {[
                { style: 'Budget', desc: 'Under $80/day' },
                { style: 'Mid-Range', desc: '$80–250/day' },
                { style: 'Luxury', desc: '$250–800/day' },
                { style: 'Ultra-Luxury', desc: '$800+/day' },
              ].map(s => (
                <div key={s.style} style={{ textAlign: 'center', fontSize: '0.65rem', color: dim, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.08em' }}>{s.desc}</div>
              ))}
            </div>
          </div>

          {/* Include Options */}
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>INCLUDE IN ESTIMATE</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 8 }}>
              {includeOptions.map(item => (
                <button key={item} onClick={() => toggle(item)} style={{ background: form.includes.includes(item) ? 'rgba(200,169,110,0.1)' : 'transparent', border: `1px solid ${form.includes.includes(item) ? gold : 'rgba(200,169,110,0.15)'}`, color: form.includes.includes(item) ? gold : dim, padding: '11px 14px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                  <span style={{ width: 14, height: 14, border: `1px solid ${form.includes.includes(item) ? gold : 'rgba(200,169,110,0.3)'}`, background: form.includes.includes(item) ? gold : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: ink, flexShrink: 0 }}>
                    {form.includes.includes(item) ? '✓' : ''}
                  </span>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculate}
            disabled={loading}
            style={{ width: '100%', background: gold, color: ink, border: 'none', padding: '18px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.25em', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.8 : 1, transition: 'opacity 0.2s' }}
          >
            {loading ? '✦ CALCULATING YOUR BUDGET...' : '✦ CALCULATE MY BUDGET'}
          </button>
          {error && <p style={{ color: '#e87070', marginTop: 12, fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
        </div>

        {/* Results */}
        {budget && (
          <div style={{ display: 'grid', gap: 16 }}>

            {/* Total Banner */}
            <div style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.25)', padding: 'clamp(28px,4vw,48px)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.25em', color: dim, marginBottom: 12 }}>
                {form.destination.toUpperCase()} · {form.travelers} TRAVELLER{form.travelers > 1 ? 'S' : ''} · {form.days} DAYS · {form.style.toUpperCase()}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.4rem,6vw,4.5rem)', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 12 }}>
                ${budget.total_min?.toLocaleString()} <span style={{ color: dim, fontSize: '0.5em' }}>–</span> ${budget.total_max?.toLocaleString()}
              </div>
              <div style={{ color: gold, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em' }}>
                ${budget.per_day_min}–${budget.per_day_max} USD PER PERSON PER DAY
              </div>
              {budget.source === 'calculator' && (
                <div style={{ marginTop: 16, fontSize: '0.78rem', color: dim }}>
                  ✦ Smart estimate based on {form.style.toLowerCase()} travel costs · Actual prices vary
                </div>
              )}
            </div>

            {/* Breakdown */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,40px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>COST BREAKDOWN</div>
              <div style={{ display: 'grid', gap: 20 }}>
                {(categories as [string, any][]).map(([cat, vals]) => {
                  const pct = Math.min(100, Math.round(((vals.min + vals.max) / 2 / ((budget.total_min + budget.total_max) / 2)) * 100))
                  return (
                    <div key={cat}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: muted, textTransform: 'uppercase' as const }}>
                          {cat.replace(/_/g, ' ')}
                        </span>
                        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: cream, fontWeight: 600 }}>
                          ${vals.min?.toLocaleString()} – ${vals.max?.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(200,169,110,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${gold}, rgba(200,169,110,0.6))`, borderRadius: 2 }} />
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.65rem', color: dim, marginTop: 4, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em' }}>{pct}% of total</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Money Tips */}
            {budget.money_tips && (
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>
                  ✦ MONEY-SAVING TIPS FOR {form.style.toUpperCase()} TRAVELLERS
                </div>
                <div style={{ display: 'grid', gap: 14 }}>
                  {budget.money_tips.map((tip: string, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span style={{ color: gold, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.1em', minWidth: 24, marginTop: 2 }}>0{i + 1}</span>
                      <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,36px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 6 }}>READY TO BOOK?</div>
                <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Find flights, hotels and packages for {form.destination || 'your destination'}</p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/#tpwl-search" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', background: gold, color: ink, padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>
                  SEARCH & BOOK
                </Link>
                <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>
                  AI TRIP PLANNER
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}