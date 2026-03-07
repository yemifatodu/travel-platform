'use client'
import { useState } from 'react'

export default function PriceAlerts() {
  const [form, setForm] = useState({ origin: '', destination: '', travel_date: '', trip_type: 'flight' })
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'

  const analyze = async () => {
    if (!form.origin || !form.destination || !form.travel_date) { setError('Please fill all fields'); return }
    setLoading(true); setError(''); setPrediction(null)
    try {
      const res = await fetch('/api/price-prediction', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.prediction) setPrediction(data.prediction)
      else setError(data.error || 'Analysis failed. Ensure OPENAI_API_KEY is set.')
    } catch { setError('Request failed.') }
    finally { setLoading(false) }
  }

  const recColor = prediction?.recommendation === 'buy_now' ? '#4ade80' : prediction?.recommendation === 'book_immediately' ? '#f87171' : '#fbbf24'
  const inputStyle = { width:'100%', background:'#1C1B18', border:'1px solid rgba(200,169,110,0.2)', color: cream, padding:'14px 18px', fontSize:'0.9rem', outline:'none' }
  const labelStyle = { fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color: gold, marginBottom:8, display:'block' }

  return (
    <div style={{ minHeight:'100vh', background: ink, paddingTop:100 }}>
      <div style={{ maxWidth:800, margin:'0 auto', padding:'60px 40px' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color: gold, marginBottom:16 }}>✦ AI PRICE INTELLIGENCE</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(3rem,5vw,5rem)', fontWeight:300, color: cream, lineHeight:1, marginBottom:16 }}>
            Price <em style={{ color: gold }}>Prediction</em>
          </h1>
          <p style={{ color:'rgba(245,239,228,0.5)', lineHeight:1.8 }}>Our AI analyses historical pricing patterns to tell you the best time to book.</p>
        </div>

        {/* Form */}
        <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.15)', padding:40, marginBottom:32 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
            <div>
              <label style={labelStyle}>FLYING FROM</label>
              <input placeholder="e.g. London, Dubai, New York" value={form.origin} onChange={e=>setForm(f=>({...f,origin:e.target.value}))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>FLYING TO</label>
              <input placeholder="e.g. Tokyo, Paris, Bali" value={form.destination} onChange={e=>setForm(f=>({...f,destination:e.target.value}))} style={inputStyle} />
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:28 }}>
            <div>
              <label style={labelStyle}>TRAVEL DATE</label>
              <input type="date" value={form.travel_date} onChange={e=>setForm(f=>({...f,travel_date:e.target.value}))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>TYPE</label>
              <select value={form.trip_type} onChange={e=>setForm(f=>({...f,trip_type:e.target.value}))} style={{...inputStyle, appearance:'none' as const}}>
                <option value="flight">✈ Flight</option>
                <option value="hotel">🏨 Hotel</option>
                <option value="package">📦 Package</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} disabled={loading} style={{ width:'100%', background: gold, color: ink, border:'none', padding:'16px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.8rem', letterSpacing:'0.2em', cursor:'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? '✦ ANALYSING PRICE TRENDS...' : '✦ ANALYSE PRICES NOW'}
          </button>
          {error && <p style={{ color:'#e87070', marginTop:16, fontSize:'0.85rem', textAlign:'center' }}>{error}</p>}
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div style={{ display:'grid', gap:16 }}>
            {/* Main verdict */}
            <div style={{ background:'#111110', border:`1px solid ${recColor}40`, padding:40, textAlign:'center' }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color: gold, marginBottom:16 }}>AI VERDICT</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'3rem', fontWeight:600, color: recColor, marginBottom:8, textTransform:'uppercase' }}>
                {prediction.recommendation?.replace(/_/g,' ')}
              </div>
              <div style={{ color:'rgba(245,239,228,0.5)', fontSize:'0.85rem', marginBottom:24 }}>{prediction.reasoning}</div>
              <div style={{ display:'inline-flex', gap:8, alignItems:'center', border:`1px solid rgba(245,239,228,0.1)`, padding:'8px 20px' }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.15em', color:'rgba(245,239,228,0.4)' }}>CONFIDENCE</span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', color: gold }}>{prediction.confidence}%</span>
              </div>
            </div>
            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
              {[['PRICE LEVEL', prediction.current_price_level?.toUpperCase()],['TREND', prediction.price_trend?.toUpperCase()],['PREDICTED CHANGE', prediction.predicted_price_change]].map(([k,v]) => (
                <div key={k} style={{ background:'#1C1B18', border:'1px solid rgba(200,169,110,0.1)', padding:'24px', textAlign:'center' }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', color: gold, marginBottom:10 }}>{k}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', color: cream }}>{v}</div>
                </div>
              ))}
            </div>
            {/* Tips */}
            {prediction.tips && (
              <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.1)', padding:32 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color: gold, marginBottom:20 }}>💡 BOOKING TIPS</div>
                <ul style={{ listStyle:'none', display:'grid', gap:12 }}>
                  {prediction.tips.map((tip: string, i: number) => (
                    <li key={i} style={{ display:'flex', gap:16, color:'rgba(245,239,228,0.65)', fontSize:'0.875rem', lineHeight:1.6 }}>
                      <span style={{ color: gold, minWidth:20, fontFamily:"'Bebas Neue',sans-serif" }}>0{i+1}</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
