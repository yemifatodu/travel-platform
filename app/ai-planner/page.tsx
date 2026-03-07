'use client'
import { useState } from 'react'

const destinations = ['Dubai','Patagonia','Svalbard','Kyoto','Bali','Tokyo','Maldives','Paris','Santorini','Serengeti','Cape Town','Marrakech','Machu Picchu','New York City','Zanzibar','Singapore','Angkor Wat','Bhutan','Dubrovnik','Iceland']
const styles = ['Luxury','Adventure','Cultural','Budget','Family','Backpacker','Romantic','Expedition']
const budgets = ['Budget ($50–100/day)','Mid-Range ($100–250/day)','Luxury ($250–500/day)','Ultra-Luxury ($500+/day)']
const interestOptions = ['Food & Dining','Wildlife & Nature','History & Culture','Beach & Water','Hiking & Trekking','Photography','Nightlife','Wellness & Spa','Architecture','Local Markets','Adventure Sports','Art & Museums']

export default function AIPlanner() {
  const [form, setForm] = useState({ destination: '', days: 7, style: 'Luxury', budget: 'Luxury ($250–500/day)', interests: [] as string[] })
  const [itinerary, setItinerary] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const toggleInterest = (i: string) => {
    setForm(f => ({ ...f, interests: f.interests.includes(i) ? f.interests.filter(x => x !== i) : [...f.interests, i] }))
  }

  const generate = async () => {
    if (!form.destination) { setError('Please select a destination'); return }
    setLoading(true); setError(''); setItinerary(null)
    try {
      const res = await fetch('/api/ai-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: form.destination, days: form.days, style: form.style.toLowerCase(), budget: form.budget, interests: form.interests })
      })
      const data = await res.json()
      if (data.itinerary) { setItinerary(data.itinerary); setStep(3) }
      else setError(data.error || 'Generation failed. Please add your OpenAI API key to .env.local')
    } catch { setError('Request failed. Ensure OPENAI_API_KEY is set in your .env.local file.') }
    finally { setLoading(false) }
  }

  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'
  const s = {
    page: { minHeight: '100vh', background: ink, paddingTop: 100 },
    wrap: { maxWidth: 900, margin: '0 auto', padding: '60px 40px' },
    label: { fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color: gold, marginBottom: 10, display:'block' },
    select: { width:'100%', background:'#1C1B18', border:'1px solid rgba(200,169,110,0.2)', color: cream, padding:'14px 18px', fontSize:'0.9rem', outline:'none', appearance:'none' as const },
    btn: { fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.8rem', letterSpacing:'0.2em', background: gold, color: ink, border:'none', padding:'18px 48px', cursor:'pointer', width:'100%', transition:'all 0.3s' },
  }

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom: 60 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color: gold, marginBottom: 16 }}>✦ POWERED BY GPT-4</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(3rem,6vw,5.5rem)', fontWeight:300, color: cream, lineHeight:1, marginBottom: 20 }}>
            AI Trip <em style={{ color: gold }}>Planner</em>
          </h1>
          <p style={{ color:'rgba(245,239,228,0.55)', maxWidth:500, margin:'0 auto', lineHeight:1.8 }}>
            Tell us your dream destination and travel style. Our AI builds a complete personalised day-by-day itinerary in seconds.
          </p>
        </div>

        {/* Step indicators */}
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom: 56 }}>
          {['Destination & Dates','Preferences','Your Itinerary'].map((label,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background: step > i+1 ? gold : step === i+1 ? gold : 'transparent', border:`1px solid ${step >= i+1 ? gold : 'rgba(200,169,110,0.2)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', color: step >= i+1 ? ink : 'rgba(245,239,228,0.3)' }}>{i+1}</div>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', color: step >= i+1 ? cream : 'rgba(245,239,228,0.3)' }}>{label}</span>
              {i < 2 && <div style={{ width:40, height:1, background:'rgba(200,169,110,0.15)' }} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ display:'grid', gap:24 }}>
            <div>
              <label style={s.label}>WHERE DO YOU WANT TO GO?</label>
              <select style={s.select} value={form.destination} onChange={e => setForm(f=>({...f,destination:e.target.value}))}>
                <option value="">Select a destination...</option>
                {destinations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>HOW MANY DAYS? <span style={{ color: gold }}>{form.days} days</span></label>
              <input type="range" min={2} max={21} value={form.days} onChange={e => setForm(f=>({...f,days:+e.target.value}))}
                style={{ width:'100%', accentColor: gold }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', color:'rgba(245,239,228,0.35)', letterSpacing:'0.1em', marginTop:6 }}>
                <span>2 DAYS</span><span>21 DAYS</span>
              </div>
            </div>
            <button style={s.btn} onClick={() => { if(!form.destination){setError('Please select a destination');return} setError(''); setStep(2) }}>
              CONTINUE →
            </button>
            {error && <p style={{ color:'#e87070', textAlign:'center', fontSize:'0.85rem' }}>{error}</p>}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ display:'grid', gap:32 }}>
            <div>
              <label style={s.label}>TRAVEL STYLE</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                {styles.map(s2 => (
                  <button key={s2} onClick={() => setForm(f=>({...f,style:s2}))}
                    style={{ background: form.style===s2 ? gold : 'transparent', border:`1px solid ${form.style===s2 ? gold : 'rgba(200,169,110,0.2)'}`, color: form.style===s2 ? ink : cream, padding:'12px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s' }}>
                    {s2}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={s.label}>DAILY BUDGET</label>
              <select style={s.select} value={form.budget} onChange={e => setForm(f=>({...f,budget:e.target.value}))}>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={s.label}>INTERESTS (SELECT ALL THAT APPLY)</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                {interestOptions.map(i => (
                  <button key={i} onClick={() => toggleInterest(i)}
                    style={{ background: form.interests.includes(i) ? 'rgba(200,169,110,0.15)' : 'transparent', border:`1px solid ${form.interests.includes(i) ? gold : 'rgba(200,169,110,0.15)'}`, color: form.interests.includes(i) ? gold : 'rgba(245,239,228,0.5)', padding:'10px 14px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', textAlign:'left' }}>
                    {form.interests.includes(i) ? '✓ ' : ''}{i}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <button onClick={() => setStep(1)} style={{ ...s.btn, background:'transparent', border:'1px solid rgba(200,169,110,0.3)', color: gold }}>← BACK</button>
              <button onClick={generate} disabled={loading} style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}>
                {loading ? '✦ GENERATING YOUR ITINERARY...' : '✦ GENERATE MY ITINERARY'}
              </button>
            </div>
            {loading && (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.4rem', color:'rgba(245,239,228,0.5)', fontStyle:'italic', marginBottom:12 }}>
                  Crafting your perfect journey to {form.destination}...
                </div>
                <div style={{ display:'flex', gap:6, justifyContent:'center' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width:8, height:8, borderRadius:'50%', background: gold, animation:`pulse 1.4s ease-in-out ${i*0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            {error && <p style={{ color:'#e87070', textAlign:'center', fontSize:'0.85rem' }}>{error}</p>}
          </div>
        )}

        {/* Step 3 — Itinerary Result */}
        {step === 3 && itinerary && (
          <div>
            <div style={{ marginBottom:48, padding:'32px 40px', background:'#1C1B18', border:'1px solid rgba(200,169,110,0.2)' }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color: gold, marginBottom:12 }}>YOUR AI-GENERATED ITINERARY</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.5rem', fontWeight:300, color: cream, marginBottom:12 }}>{itinerary.title}</h2>
              <p style={{ color:'rgba(245,239,228,0.6)', lineHeight:1.7, fontSize:'0.95rem' }}>{itinerary.summary}</p>
            </div>
            <div style={{ display:'grid', gap:16, marginBottom:40 }}>
              {itinerary.days?.map((day: any) => (
                <div key={day.day} style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.1)', overflow:'hidden' }}>
                  <div style={{ background:'rgba(200,169,110,0.08)', padding:'16px 28px', borderBottom:'1px solid rgba(200,169,110,0.1)', display:'flex', alignItems:'center', gap:16 }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.2em', color: gold, border:`1px solid ${gold}`, padding:'4px 12px' }}>DAY {day.day}</span>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', color: cream }}>{day.title}</span>
                  </div>
                  <div style={{ padding:'24px 28px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24 }}>
                    {[['🌅 MORNING', day.morning],['☀ AFTERNOON', day.afternoon],['🌙 EVENING', day.evening]].map(([label,text]) => (
                      <div key={label as string}>
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', color: gold, marginBottom:8 }}>{label}</div>
                        <p style={{ color:'rgba(245,239,228,0.65)', fontSize:'0.83rem', lineHeight:1.7 }}>{text}</p>
                      </div>
                    ))}
                  </div>
                  {(day.accommodation || day.tips) && (
                    <div style={{ padding:'0 28px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, borderTop:'1px solid rgba(200,169,110,0.06)', paddingTop:20 }}>
                      {day.accommodation && <div><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', color: gold, marginBottom:6 }}>🏨 STAY</div><p style={{ color:'rgba(245,239,228,0.55)', fontSize:'0.82rem' }}>{day.accommodation}</p></div>}
                      {day.tips && <div><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', color: gold, marginBottom:6 }}>💡 PRO TIP</div><p style={{ color:'rgba(245,239,228,0.55)', fontSize:'0.82rem' }}>{day.tips}</p></div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <button onClick={() => { setItinerary(null); setStep(1); setForm({ destination:'', days:7, style:'Luxury', budget:'Luxury ($250–500/day)', interests:[] }) }}
                style={{ ...s.btn, background:'transparent', border:'1px solid rgba(200,169,110,0.3)', color: gold }}>
                ← PLAN ANOTHER TRIP
              </button>
              <button onClick={() => window.print()} style={s.btn}>⬇ SAVE ITINERARY</button>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  )
}
