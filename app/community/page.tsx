'use client'
import { useState } from 'react'
import Link from 'next/link'

const travelStyles = ['Luxury','Adventure','Cultural','Beach','Family','Backpacker','Romantic','Wildlife']
const interestOptions = ['Food & Dining','Wildlife','History','Beaches','Hiking','Photography','Nightlife','Wellness','Architecture','Markets']
const seasons = ['Spring (Mar–May)','Summer (Jun–Aug)','Autumn (Sep–Nov)','Winter (Dec–Feb)']
const budgets = ['Budget','Mid-Range','Luxury','Ultra-Luxury']

export default function RecommendationsPage() {
  const [form, setForm] = useState({ budget:'Luxury', duration:10, travel_style:'Adventure', interests:[] as string[], from_country:'', season:'Winter (Dec–Feb)', avoid:'' })
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const gold='#C8A96E', ink='#080807', cream='#F5EFE4'
  const toggleInterest = (i:string) => setForm(f=>({...f, interests: f.interests.includes(i)?f.interests.filter(x=>x!==i):[...f.interests,i]}))

  const getRecommendations = async () => {
    setLoading(true); setError(''); setResults([])
    try {
      const res = await fetch('/api/recommendations', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({...form, avoid: form.avoid ? form.avoid.split(',').map(s=>s.trim()) : []})
      })
      const data = await res.json()
      if (data.recommendations) setResults(data.recommendations)
      else setError(data.error || 'Failed. Ensure OPENAI_API_KEY is set.')
    } catch { setError('Request failed.') }
    finally { setLoading(false) }
  }

  const inputStyle = { width:'100%', background:'#1C1B18', border:'1px solid rgba(200,169,110,0.2)', color:cream, padding:'12px 16px', fontSize:'0.875rem', outline:'none' }
  const labelStyle = { fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.25em', color:gold, marginBottom:8, display:'block' }

  return (
    <div style={{ minHeight:'100vh', background:ink, paddingTop:100 }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'60px 40px' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color:gold, marginBottom:16 }}>✦ AI-POWERED</div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(3rem,5vw,5rem)', fontWeight:300, color:cream, lineHeight:1, marginBottom:16 }}>
            Where Should You <em style={{color:gold}}>Go?</em>
          </h1>
          <p style={{ color:'rgba(245,239,228,0.5)', lineHeight:1.8, maxWidth:500, margin:'0 auto' }}>Tell us about yourself and our AI finds your perfect destinations.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'380px 1fr', gap:32 }}>
          {/* Form Panel */}
          <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.15)', padding:36, height:'fit-content' }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.25em', color:gold, marginBottom:28 }}>YOUR TRAVEL PROFILE</div>

            <div style={{ marginBottom:20 }}>
              <label style={labelStyle}>DEPARTING FROM</label>
              <input placeholder="Your country / city" value={form.from_country} onChange={e=>setForm(f=>({...f,from_country:e.target.value}))} style={inputStyle} />
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={labelStyle}>TRIP DURATION: {form.duration} DAYS</label>
              <input type="range" min={3} max={30} value={form.duration} onChange={e=>setForm(f=>({...f,duration:+e.target.value}))} style={{ width:'100%', accentColor:gold }} />
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={labelStyle}>BUDGET</label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                {budgets.map(b=>(
                  <button key={b} onClick={()=>setForm(f=>({...f,budget:b}))} style={{ background:form.budget===b?gold:'transparent', border:`1px solid ${form.budget===b?gold:'rgba(200,169,110,0.2)'}`, color:form.budget===b?ink:cream, padding:'8px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.1em', cursor:'pointer' }}>{b}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={labelStyle}>TRAVEL STYLE</label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                {travelStyles.map(s=>(
                  <button key={s} onClick={()=>setForm(f=>({...f,travel_style:s}))} style={{ background:form.travel_style===s?gold:'transparent', border:`1px solid ${form.travel_style===s?gold:'rgba(200,169,110,0.2)'}`, color:form.travel_style===s?ink:cream, padding:'8px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.1em', cursor:'pointer' }}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={labelStyle}>SEASON</label>
              <select value={form.season} onChange={e=>setForm(f=>({...f,season:e.target.value}))} style={{...inputStyle, appearance:'none' as const}}>
                {seasons.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={labelStyle}>INTERESTS</label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                {interestOptions.map(i=>(
                  <button key={i} onClick={()=>toggleInterest(i)} style={{ background:form.interests.includes(i)?'rgba(200,169,110,0.15)':'transparent', border:`1px solid ${form.interests.includes(i)?gold:'rgba(200,169,110,0.1)'}`, color:form.interests.includes(i)?gold:'rgba(245,239,228,0.45)', padding:'7px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.08em', cursor:'pointer' }}>
                    {form.interests.includes(i)?'✓ ':''}{i}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom:28 }}>
              <label style={labelStyle}>AVOID (OPTIONAL)</label>
              <input placeholder="e.g. Crowds, Cold Weather" value={form.avoid} onChange={e=>setForm(f=>({...f,avoid:e.target.value}))} style={inputStyle} />
            </div>
            <button onClick={getRecommendations} disabled={loading} style={{ width:'100%', background:gold, color:ink, border:'none', padding:'16px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.75rem', letterSpacing:'0.2em', cursor:'pointer', opacity:loading?0.7:1 }}>
              {loading?'✦ FINDING YOUR DESTINATIONS...':'✦ FIND MY DESTINATIONS'}
            </button>
            {error && <p style={{ color:'#e87070', marginTop:12, fontSize:'0.8rem', textAlign:'center' }}>{error}</p>}
          </div>

          {/* Results */}
          <div>
            {!results.length && !loading && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', opacity:0.4, textAlign:'center', padding:40 }}>
                <div style={{ fontSize:'4rem', marginBottom:16 }}>🌍</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.5rem', color:cream }}>Your personalised destinations will appear here</div>
              </div>
            )}
            {loading && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:300 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.3rem', color:'rgba(245,239,228,0.4)', fontStyle:'italic', marginBottom:20 }}>Searching the world for you...</div>
                <div style={{ display:'flex', gap:8 }}>
                  {[0,1,2].map(i=><div key={i} style={{ width:10, height:10, borderRadius:'50%', background:gold, animation:`pulse 1.4s ${i*0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div style={{ display:'grid', gap:16 }}>
              {results.map((r:any, i:number) => (
                <div key={i} style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.12)', padding:28, transition:'border-color 0.3s', cursor:'pointer' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(200,169,110,0.35)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(200,169,110,0.12)'}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                    <div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', color:gold, marginBottom:6 }}>{r.continent} · {r.country}</div>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:600, color:cream, marginBottom:4 }}>{r.destination}</h3>
                      <p style={{ color:'rgba(245,239,228,0.55)', fontSize:'0.875rem', lineHeight:1.6 }}>{r.why}</p>
                    </div>
                    <div style={{ textAlign:'center', minWidth:70, marginLeft:20 }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', fontWeight:600, color:gold }}>{r.match_score}</div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.55rem', letterSpacing:'0.15em', color:'rgba(245,239,228,0.35)' }}>MATCH %</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' as const, marginBottom:16 }}>
                    {r.best_for?.map((tag:string)=>(
                      <span key={tag} style={{ border:'1px solid rgba(200,169,110,0.2)', padding:'3px 10px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.12em', color:'rgba(245,239,228,0.5)' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ fontSize:'0.8rem', color:'rgba(245,239,228,0.4)' }}>✨ <span style={{ color:'rgba(245,239,228,0.65)' }}>{r.highlight}</span></div>
                    <Link href={`/destinations/${r.destination.toLowerCase().replace(/\s+/g,'-')}`} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.15em', color:gold, textDecoration:'none', borderBottom:`1px solid rgba(200,169,110,0.3)`, paddingBottom:2 }}>EXPLORE →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}`}</style>
    </div>
  )
}
