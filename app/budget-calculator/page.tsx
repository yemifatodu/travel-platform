'use client'
import { useState } from 'react'

const styles = ['Budget','Mid-Range','Luxury','Ultra-Luxury']
const includeOptions = ['International Flights','Accommodation','Guided Tours','Travel Insurance','Airport Transfers','Visa Fees']

export default function BudgetCalculator() {
  const [form, setForm] = useState({ destination:'', days:7, travelers:2, style:'Luxury', includes: ['International Flights','Accommodation'] as string[] })
  const [budget, setBudget] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const gold='#C8A96E', ink='#080807', cream='#F5EFE4'

  const toggle = (item:string) => setForm(f=>({...f, includes: f.includes.includes(item)?f.includes.filter(x=>x!==item):[...f.includes,item]}))

  const calculate = async () => {
    if (!form.destination) { setError('Please enter a destination'); return }
    setLoading(true); setError(''); setBudget(null)
    try {
      const res = await fetch('/api/budget-estimate', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      const data = await res.json()
      if (data.total_min) setBudget(data)
      else setError(data.error || 'Failed. Ensure OPENAI_API_KEY is set.')
    } catch { setError('Request failed.') }
    finally { setLoading(false) }
  }

  const inputStyle = { width:'100%', background:'#1C1B18', border:'1px solid rgba(200,169,110,0.2)', color:cream, padding:'14px 18px', fontSize:'0.9rem', outline:'none' }
  const labelStyle = { fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.25em', color:gold, marginBottom:8, display:'block' }
  const categories = budget ? Object.entries(budget.breakdown || {}) : []

  return (
    <div style={{ minHeight:'100vh', background:ink, paddingTop:100 }}>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'60px 40px' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color:gold, marginBottom:16 }}>✦ AI BUDGET INTELLIGENCE</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(3rem,5vw,5rem)', fontWeight:300, color:cream, lineHeight:1, marginBottom:16 }}>
            Travel <em style={{color:gold}}>Budget</em> Calculator
          </h1>
          <p style={{ color:'rgba(245,239,228,0.5)', lineHeight:1.8 }}>Get an AI-powered cost estimate for your next trip — broken down by category.</p>
        </div>

        {/* Input Form */}
        <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.15)', padding:40, marginBottom:32 }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:20, marginBottom:24 }}>
            <div><label style={labelStyle}>DESTINATION</label><input placeholder="e.g. Bali, Paris, Dubai" value={form.destination} onChange={e=>setForm(f=>({...f,destination:e.target.value}))} style={inputStyle} /></div>
            <div><label style={labelStyle}>DAYS: {form.days}</label><input type="range" min={2} max={30} value={form.days} onChange={e=>setForm(f=>({...f,days:+e.target.value}))} style={{ width:'100%', accentColor:gold, marginTop:8 }} /></div>
            <div><label style={labelStyle}>TRAVELLERS: {form.travelers}</label><input type="range" min={1} max={10} value={form.travelers} onChange={e=>setForm(f=>({...f,travelers:+e.target.value}))} style={{ width:'100%', accentColor:gold, marginTop:8 }} /></div>
          </div>
          <div style={{ marginBottom:24 }}>
            <label style={labelStyle}>TRAVEL STYLE</label>
            <div style={{ display:'flex', gap:8 }}>
              {styles.map(s=><button key={s} onClick={()=>setForm(f=>({...f,style:s}))} style={{ flex:1, background:form.style===s?gold:'transparent', border:`1px solid ${form.style===s?gold:'rgba(200,169,110,0.2)'}`, color:form.style===s?ink:cream, padding:'10px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.1em', cursor:'pointer' }}>{s}</button>)}
            </div>
          </div>
          <div style={{ marginBottom:28 }}>
            <label style={labelStyle}>INCLUDE IN ESTIMATE</label>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
              {includeOptions.map(item=><button key={item} onClick={()=>toggle(item)} style={{ background:form.includes.includes(item)?'rgba(200,169,110,0.12)':'transparent', border:`1px solid ${form.includes.includes(item)?gold:'rgba(200,169,110,0.15)'}`, color:form.includes.includes(item)?gold:'rgba(245,239,228,0.45)', padding:'10px 12px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.1em', cursor:'pointer', textAlign:'left' as const }}>
                {form.includes.includes(item)?'✓ ':''}{item}
              </button>)}
            </div>
          </div>
          <button onClick={calculate} disabled={loading} style={{ width:'100%', background:gold, color:ink, border:'none', padding:'16px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.8rem', letterSpacing:'0.2em', cursor:'pointer', opacity:loading?0.7:1 }}>
            {loading?'✦ CALCULATING...':'✦ CALCULATE MY BUDGET'}
          </button>
          {error && <p style={{ color:'#e87070', marginTop:12, fontSize:'0.85rem', textAlign:'center' }}>{error}</p>}
        </div>

        {/* Budget Results */}
        {budget && (
          <div style={{ display:'grid', gap:16 }}>
            {/* Total */}
            <div style={{ background:'#1C1B18', border:'1px solid rgba(200,169,110,0.2)', padding:'40px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color:gold, marginBottom:12 }}>ESTIMATED TOTAL FOR {form.travelers} TRAVELLER{form.travelers>1?'S':''} · {form.days} DAYS</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'4rem', fontWeight:300, color:cream, marginBottom:8 }}>
                ${budget.total_min?.toLocaleString()} – ${budget.total_max?.toLocaleString()}
              </div>
              <div style={{ color:'rgba(245,239,228,0.4)', fontSize:'0.85rem' }}>
                ${budget.per_day_min} – ${budget.per_day_max} per person/day
              </div>
            </div>
            {/* Breakdown */}
            <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.1)', padding:32 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color:gold, marginBottom:24 }}>COST BREAKDOWN</div>
              <div style={{ display:'grid', gap:16 }}>
                {categories.map(([cat, vals]:any) => {
                  const maxVal = budget.total_max || 1
                  const pct = Math.round(((vals.min+vals.max)/2 / maxVal) * 100)
                  return (
                    <div key={cat}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', color:'rgba(245,239,228,0.6)', textTransform:'uppercase' as const }}>{cat.replace(/_/g,' ')}</span>
                        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:cream }}>${vals.min?.toLocaleString()} – ${vals.max?.toLocaleString()}</span>
                      </div>
                      <div style={{ height:4, background:'rgba(200,169,110,0.1)', borderRadius:2 }}>
                        <div style={{ height:'100%', width:`${pct}%`, background:gold, borderRadius:2, transition:'width 0.8s ease' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Tips */}
            {budget.money_tips && (
              <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.1)', padding:32 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color:gold, marginBottom:20 }}>💰 MONEY-SAVING TIPS</div>
                <ul style={{ listStyle:'none', display:'grid', gap:12 }}>
                  {budget.money_tips.map((tip:string, i:number) => (
                    <li key={i} style={{ display:'flex', gap:16, color:'rgba(245,239,228,0.65)', fontSize:'0.875rem', lineHeight:1.6 }}>
                      <span style={{ color:gold, fontFamily:"'Bebas Neue',sans-serif", minWidth:20 }}>0{i+1}</span>{tip}
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
