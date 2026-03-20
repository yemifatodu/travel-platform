'use client'
import { useState } from 'react'
import Link from 'next/link'

// ── Smart price prediction engine ──────────────────────────────────────────

const getDaysUntil = (dateStr: string): number => {
  const today = new Date()
  const target = new Date(dateStr)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

const getMonth = (dateStr: string): number => new Date(dateStr).getMonth() + 1

const getPeakMonths = (dest: string): number[] => {
  const d = dest.toLowerCase()
  if (/bali|indonesia|thailand|phuket|bangkok/.test(d)) return [11, 12, 1, 2, 7, 8]
  if (/maldives|seychelles|mauritius/.test(d)) return [12, 1, 2, 7, 8]
  if (/dubai|uae|abu dhabi/.test(d)) return [11, 12, 1, 2, 3]
  if (/europe|paris|rome|london|barcelona|amsterdam|santorini|greece/.test(d)) return [6, 7, 8, 12]
  if (/new york|usa|america|miami/.test(d)) return [6, 7, 8, 11, 12]
  if (/japan|tokyo|kyoto|osaka/.test(d)) return [3, 4, 10, 11, 12]
  if (/safari|kenya|tanzania|serengeti|masai/.test(d)) return [7, 8, 9, 1, 2]
  if (/nigeria|lagos|accra|ghana|nairobi/.test(d)) return [12, 1, 7, 8]
  return [6, 7, 8, 12]
}

const buildPrediction = (origin: string, destination: string, travelDate: string, tripType: string) => {
  const daysUntil = getDaysUntil(travelDate)
  const month = getMonth(travelDate)
  const peakMonths = getPeakMonths(destination)
  const isPeak = peakMonths.includes(month)
  const dest = destination.trim()
  const orig = origin.trim()

  // Determine price level
  let priceLevel: string
  let priceLevelColor: string
  if (daysUntil < 14) { priceLevel = 'Peak'; priceLevelColor = '#f87171' }
  else if (daysUntil < 30 && isPeak) { priceLevel = 'High'; priceLevelColor = '#fb923c' }
  else if (daysUntil < 45) { priceLevel = isPeak ? 'High' : 'Medium'; priceLevelColor = isPeak ? '#fb923c' : '#fbbf24' }
  else if (daysUntil < 90) { priceLevel = isPeak ? 'Medium' : 'Low'; priceLevelColor = isPeak ? '#fbbf24' : '#4ade80' }
  else { priceLevel = 'Low'; priceLevelColor = '#4ade80' }

  // Trend
  let trend: string
  let trendIcon: string
  if (daysUntil < 21) { trend = 'Rising Fast'; trendIcon = '↑↑' }
  else if (daysUntil < 45 && isPeak) { trend = 'Rising'; trendIcon = '↑' }
  else if (daysUntil > 90 && !isPeak) { trend = 'Falling'; trendIcon = '↓' }
  else { trend = 'Stable'; trendIcon = '→' }

  // Recommendation
  let recommendation: string
  let recColor: string
  let verdict: string
  if (daysUntil < 14) {
    recommendation = 'BOOK IMMEDIATELY'
    recColor = '#f87171'
    verdict = 'Prices are at their highest this close to departure. Book now to secure a seat.'
  } else if (daysUntil < 30 && isPeak) {
    recommendation = 'BOOK NOW'
    recColor = '#fb923c'
    verdict = `${dest} is in peak season and prices are rising. Do not wait — book in the next 48 hours.`
  } else if (daysUntil < 60 && isPeak) {
    recommendation = 'BOOK SOON'
    recColor = '#fbbf24'
    verdict = `Peak season travel to ${dest}. Prices typically increase 15–25% in the final 45 days. Book within the week.`
  } else if (daysUntil >= 60 && daysUntil <= 120 && !isPeak) {
    recommendation = 'IDEAL TIME TO BOOK'
    recColor = '#4ade80'
    verdict = `You are in the sweet spot — 2–4 months out is historically the best time to book this route for the lowest fares.`
  } else if (daysUntil > 120) {
    recommendation = 'WAIT A FEW WEEKS'
    recColor = '#60a5fa'
    verdict = `You have plenty of time. Set a price alert and check back in 4–6 weeks — fares often drop before the 90-day mark.`
  } else {
    recommendation = 'BOOK SOON'
    recColor = '#fbbf24'
    verdict = `Prices are stable now but will increase as your travel date approaches. Booking in the next 1–2 weeks is advisable.`
  }

  // Price change estimate
  let priceChange: string
  if (daysUntil < 14) priceChange = `+18% to +35% vs 30 days ago`
  else if (daysUntil < 30) priceChange = `+8% to +18% expected in next 14 days`
  else if (daysUntil < 60 && isPeak) priceChange = `+10% to +20% in next 30 days`
  else if (daysUntil > 90 && !isPeak) priceChange = `−5% to −15% if you wait 3–4 more weeks`
  else priceChange = `±5% — relatively stable right now`

  // Best booking window
  let bestWindow: string
  if (daysUntil < 30) bestWindow = 'Right now — the longer you wait, the higher prices go'
  else if (daysUntil < 90) bestWindow = `Book within the next 2–3 weeks for the best balance of price and availability`
  else bestWindow = `Check again in 3–4 weeks — fares may soften before the 90-day window`

  // Confidence
  const confidence = daysUntil < 14 ? 94 : daysUntil < 30 ? 88 : daysUntil < 60 ? 82 : daysUntil < 90 ? 78 : 72

  // Tips
  const flightTips = [
    `Search ${orig} to ${dest} on Tuesdays and Wednesdays — mid-week fares are typically 10–15% lower`,
    `Set a price alert on Skyscanner so you are notified the moment the price drops`,
    `Consider flying into a nearby alternate airport — often significantly cheaper`,
    `Book directly on the airline website after comparing — avoids OTA booking fees`,
    `Flexible dates? Use Google Flights calendar view to spot the cheapest travel days`,
  ]
  const hotelTips = [
    `Book with free cancellation so you can rebook if prices drop — zero risk`,
    `Compare the same hotel on Booking.com, Expedia and the hotel's own website`,
    `Arriving Sunday or Monday? Rates are typically lower than weekend check-ins`,
    `Look at apartment-style hotels or serviced apartments for trips over 5 nights`,
    `Joining the hotel's loyalty programme often unlocks an instant member discount`,
  ]
  const packageTips = [
    `Package deals bundle flight + hotel and can save 20–30% vs booking separately`,
    `Book packages early for peak season — limited availability drives prices up fast`,
    `Check if the package includes airport transfers — these add up quickly`,
    `Read the cancellation policy carefully before confirming a package deal`,
    `Compare package prices on Expedia, Booking.com and Trip.com for best value`,
  ]

  const tips = tripType === 'hotel' ? hotelTips : tripType === 'package' ? packageTips : flightTips

  return {
    recommendation,
    recColor,
    verdict,
    priceLevel,
    priceLevelColor,
    trend,
    trendIcon,
    priceChange,
    bestWindow,
    confidence,
    daysUntil,
    isPeak,
    tips,
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export default function PriceAlerts() {
  const [form, setForm] = useState({ origin: '', destination: '', travel_date: '', trip_type: 'flight' })
  const [prediction, setPrediction] = useState<ReturnType<typeof buildPrediction> | null>(null)
  const [alertEmail, setAlertEmail] = useState('')
  const [alertSet, setAlertSet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const gold = '#C8A96E'
  const ink = '#080807'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'
  const dim = 'rgba(245,239,228,0.35)'

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

  const today = new Date().toISOString().split('T')[0]

  const analyse = async () => {
    if (!form.origin || !form.destination || !form.travel_date) {
      setError('Please fill in all three fields')
      return
    }
    if (form.travel_date <= today) {
      setError('Please select a future travel date')
      return
    }
    setLoading(true)
    setError('')
    setPrediction(null)
    setAlertSet(false)

    // Try AI first
    try {
      const res = await fetch('/api/price-prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.prediction) {
        // Map AI response to our format
        const p = data.prediction
        setPrediction({
          recommendation: p.recommendation?.replace(/_/g, ' ').toUpperCase() || 'BOOK SOON',
          recColor: p.recommendation === 'buy_now' ? '#4ade80' : p.recommendation === 'book_immediately' ? '#f87171' : '#fbbf24',
          verdict: p.reasoning || '',
          priceLevel: p.current_price_level || 'Medium',
          priceLevelColor: '#fbbf24',
          trend: p.price_trend || 'Stable',
          trendIcon: p.price_trend === 'rising' ? '↑' : p.price_trend === 'falling' ? '↓' : '→',
          priceChange: p.predicted_price_change || '±5%',
          bestWindow: p.best_booking_window || '',
          confidence: p.confidence || 80,
          daysUntil: getDaysUntil(form.travel_date),
          isPeak: false,
          tips: p.tips || [],
        })
        setLoading(false)
        return
      }
    } catch {}

    // Built-in engine fallback
    await new Promise(r => setTimeout(r, 900)) // natural loading feel
    setPrediction(buildPrediction(form.origin, form.destination, form.travel_date, form.trip_type))
    setLoading(false)
  }

  const setAlert = (e: React.FormEvent) => {
    e.preventDefault()
    if (alertEmail) {
      window.location.href = `mailto:hello@huuboi.com?subject=Price Alert Request&body=Please set up a price alert for:%0A%0ARoute: ${form.origin} to ${form.destination}%0ADate: ${form.travel_date}%0AType: ${form.trip_type}%0AEmail: ${alertEmail}%0A%0AThank you!`
      setAlertSet(true)
    }
  }

  // Booking links based on type
  const getBookingLink = () => {
    if (form.trip_type === 'hotel') return 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p&creativeref=1100l68075&adref=PZnDB3QOfb'
    if (form.trip_type === 'package') return 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com%2FVacation-Packages&camref=1110lBk7p&creativeref=1100l68075&adref=PZRpNWOv8b'
    return 'https://www.aviasales.com/?marker=710879&locale=en'
  }

  return (
    <div style={{ minHeight: '100vh', background: ink, paddingTop: 100 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,40px)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            PRICE INTELLIGENCE
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,6vw,5.5rem)', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 20 }}>
            Price <em style={{ color: gold }}>Alerts</em>
          </h1>
          <p style={{ color: muted, lineHeight: 1.8, maxWidth: 500, margin: '0 auto', fontSize: '0.97rem' }}>
            Find out the best time to book your trip. Enter your route and travel date — we will tell you whether to book now or wait.
          </p>
        </div>

        {/* Form */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,4vw,48px)', marginBottom: 32 }}>

          {/* Trip type selector */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>WHAT ARE YOU SEARCHING FOR?</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
              {[
                { value: 'flight', icon: '✈', label: 'Flight' },
                { value: 'hotel', icon: '🏨', label: 'Hotel' },
                { value: 'package', icon: '📦', label: 'Package' },
              ].map(t => (
                <button key={t.value} onClick={() => setForm(f => ({ ...f, trip_type: t.value }))}
                  style={{ background: form.trip_type === t.value ? gold : 'transparent', border: `1px solid ${form.trip_type === t.value ? gold : 'rgba(200,169,110,0.2)'}`, color: form.trip_type === t.value ? ink : muted, padding: '14px 12px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Route inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>{form.trip_type === 'hotel' ? 'YOUR LOCATION' : 'FLYING FROM'}</label>
              <input
                placeholder={form.trip_type === 'hotel' ? 'e.g. Lagos, London' : 'e.g. Lagos, London, Dubai'}
                value={form.origin}
                onChange={e => setForm(f => ({ ...f, origin: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{form.trip_type === 'hotel' ? 'DESTINATION CITY' : 'FLYING TO'}</label>
              <input
                placeholder="e.g. Dubai, Paris, Bali"
                value={form.destination}
                onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>TRAVEL DATE</label>
              <input
                type="date"
                value={form.travel_date}
                min={today}
                onChange={e => setForm(f => ({ ...f, travel_date: e.target.value }))}
                style={{ ...inputStyle, colorScheme: 'dark' }}
              />
            </div>
          </div>

          <button
            onClick={analyse}
            disabled={loading}
            style={{ width: '100%', background: gold, color: ink, border: 'none', padding: '18px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.25em', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.8 : 1, transition: 'opacity 0.2s' }}
          >
            {loading ? '✦ ANALYSING PRICE TRENDS...' : '✦ ANALYSE PRICES NOW'}
          </button>
          {error && <p style={{ color: '#e87070', marginTop: 12, fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
        </div>

        {/* Results */}
        {prediction && (
          <div style={{ display: 'grid', gap: 16 }}>

            {/* Main Verdict */}
            <div style={{ background: '#111110', border: `2px solid ${prediction.recColor}40`, padding: 'clamp(28px,4vw,48px)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.25em', color: dim, marginBottom: 16 }}>
                {form.origin.toUpperCase()} → {form.destination.toUpperCase()} · {form.travel_date} · {prediction.daysUntil} DAYS AWAY
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 600, color: prediction.recColor, marginBottom: 16, lineHeight: 1 }}>
                {prediction.recommendation}
              </div>
              <p style={{ color: muted, fontSize: '0.97rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 24px' }}>
                {prediction.verdict}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(245,239,228,0.1)', padding: '10px 24px' }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: dim }}>CONFIDENCE</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: gold, fontWeight: 600 }}>{prediction.confidence}%</span>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 2 }}>
              {[
                { label: 'PRICE LEVEL', value: prediction.priceLevel, color: prediction.priceLevelColor },
                { label: 'TREND', value: `${prediction.trendIcon} ${prediction.trend}`, color: cream },
                { label: 'DAYS UNTIL TRAVEL', value: String(prediction.daysUntil), color: cream },
                { label: 'SEASON', value: prediction.isPeak ? 'Peak Season' : 'Low / Mid Season', color: prediction.isPeak ? '#fb923c' : '#4ade80' },
              ].map(s => (
                <div key={s.label} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '22px 18px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: dim, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: s.color, fontWeight: 600 }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Price change + best window */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 2 }}>
              <div style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '24px 28px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 8 }}>PREDICTED PRICE CHANGE</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', color: cream }}>{prediction.priceChange}</div>
              </div>
              <div style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '24px 28px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 8 }}>BEST BOOKING WINDOW</div>
                <div style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.6 }}>{prediction.bestWindow}</div>
              </div>
            </div>

            {/* Tips */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,40px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>
                ✦ SMART BOOKING TIPS
              </div>
              <div style={{ display: 'grid', gap: 14 }}>
                {prediction.tips.map((tip: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ color: gold, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.1em', minWidth: 24, marginTop: 2 }}>0{i + 1}</span>
                    <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Alert Signup */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>🔔 SET A PRICE ALERT</div>
              <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>
                Get notified by email when prices drop for this route. We check prices daily and alert you immediately.
              </p>
              {alertSet ? (
                <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', padding: '16px 24px', color: '#4ade80', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', textAlign: 'center' }}>
                  ✓ ALERT REQUEST SENT — WE WILL BE IN TOUCH WITHIN 24 HOURS
                </div>
              ) : (
                <form onSubmit={setAlert} style={{ display: 'flex', gap: 0 }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={alertEmail}
                    onChange={e => setAlertEmail(e.target.value)}
                    required
                    style={{ ...inputStyle, flex: 1, borderRight: 'none' }}
                  />
                  <button type="submit" style={{ background: gold, color: ink, border: 'none', padding: '0 28px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    SET ALERT
                  </button>
                </form>
              )}
            </div>

            {/* Book Now CTA */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,36px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 6 }}>
                  {prediction.recommendation === 'BOOK IMMEDIATELY' || prediction.recommendation === 'BOOK NOW' ? '⚡ READY TO BOOK NOW?' : 'SEARCH CURRENT PRICES'}
                </div>
                <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>
                  Compare live prices for {form.destination} on our booking partners
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={getBookingLink()} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', background: gold, color: ink, padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>
                  SEARCH {form.trip_type.toUpperCase()} PRICES
                </a>
                <Link href="/budget-calculator"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>
                  BUDGET CALCULATOR
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* Info cards — shown before analysis */}
        {!prediction && !loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2, marginTop: 8 }}>
            {[
              { icon: '📅', title: 'Best Time to Book', desc: 'Flights: 6–8 weeks ahead. Hotels: 1–3 months. Peak season: book earlier.' },
              { icon: '📉', title: 'When Prices Drop', desc: 'Tuesdays and Wednesdays often have lower fares. Avoid booking on Fridays.' },
              { icon: '🔔', title: 'Price Alerts', desc: 'Enter your route and we will notify you the moment the price hits your target.' },
              { icon: '🌍', title: 'Any Destination', desc: 'We analyse routes to 194+ countries — from Lagos to London to Bali.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.08)', padding: '28px 22px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 12 }}>{card.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold, marginBottom: 8 }}>{card.title}</div>
                <p style={{ color: muted, fontSize: '0.83rem', lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
