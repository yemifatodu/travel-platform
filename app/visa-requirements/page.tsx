'use client'
import { useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const regions = ['All', 'Africa', 'Middle East', 'Asia', 'Europe', 'Americas', 'Pacific']

const countries = [
  // ── AFRICA ──────────────────────────────────────────────────────────────
  { country:'Kenya', region:'Africa', flag:'🇰🇪', capital:'Nairobi', currency:'KES', language:'English, Swahili',
    visaTypes:[{type:'e-Visa',cost:'$51',duration:'90 days',processing:'3–5 days'},{type:'Visa on Arrival',cost:'$51',duration:'90 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds ($50/day)','Yellow fever certificate (if from endemic country)'],
    vaccinations:['Yellow Fever (required from endemic countries)','Malaria prophylaxis (strongly recommended)','Hepatitis A & B','Typhoid'],
    tips:'Kenya eVisa is quick at evisa.go.ke. The East Africa Tourist Visa ($100) also covers Uganda and Rwanda — excellent value for multi-country trips.',
    bestTime:'Jul–Oct · Jan–Mar', flightTime:'~8h from London · ~4h from Lagos' },
  { country:'Tanzania', region:'Africa', flag:'🇹🇿', capital:'Dar es Salaam', currency:'TZS', language:'Swahili, English',
    visaTypes:[{type:'e-Visa',cost:'$50',duration:'90 days',processing:'5–7 days'},{type:'Visa on Arrival',cost:'$50',duration:'90 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (MANDATORY)','Sufficient funds'],
    vaccinations:['Yellow Fever (MANDATORY)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Rabies (if trekking)'],
    tips:'Yellow fever certificate is strictly required — you will be turned away without it. Apply for eVisa at immigration.go.tz. Zanzibar uses the same visa as mainland Tanzania.',
    bestTime:'Jul–Oct · Dec–Mar', flightTime:'~9h from London · ~5h from Dubai' },
  { country:'South Africa', region:'Africa', flag:'🇿🇦', capital:'Cape Town / Pretoria', currency:'ZAR', language:'English + 10 official languages',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'Varies',duration:'90 days',processing:'10–15 days'}],
    requirements:['Valid passport (30 days beyond stay)','Return ticket','Proof of accommodation','Sufficient funds','2 blank visa pages in passport'],
    vaccinations:['Yellow Fever (if arriving from endemic country)','Hepatitis A & B','Typhoid','Malaria prophylaxis (Kruger/Limpopo only)'],
    tips:'Most Western passport holders enter visa-free for up to 90 days. Nigerian and many African passport holders require a visa — apply at least 6 weeks ahead.',
    bestTime:'May–Sep (Safari) · Oct–Apr (Cape Town)', flightTime:'~11h from London · ~8h from Dubai' },
  { country:'Morocco', region:'Africa', flag:'🇲🇦', capital:'Rabat', currency:'MAD', language:'Arabic, French, Amazigh',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$45',duration:'90 days',processing:'5–10 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (if rural travel)'],
    tips:'EU, US, UK and many other passport holders enter Morocco visa-free. Morocco has excellent tourist infrastructure and is very accessible.',
    bestTime:'Mar–May · Sep–Nov', flightTime:'~3h from London · ~6h from Lagos' },
  { country:'Nigeria', region:'Africa', flag:'🇳🇬', capital:'Abuja', currency:'NGN', language:'English + 500+ local languages',
    visaTypes:[{type:'e-Visa',cost:'$42–160',duration:'30–90 days',processing:'48h–5 days'},{type:'Visa on Arrival',cost:'$82',duration:'30 days',processing:'On arrival (select nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Hotel booking confirmation','Bank statement','Yellow fever certificate (MANDATORY)','Invitation letter (business)'],
    vaccinations:['Yellow Fever (MANDATORY — no exceptions)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Meningitis'],
    tips:'Yellow fever certificate is absolutely mandatory — carry the physical yellow card. Apply for eVisa at portal.immigration.gov.ng.',
    bestTime:'Nov–Feb', flightTime:'~6h from London · ~7h from Dubai' },
  { country:'UAE (Dubai)', region:'Middle East', flag:'🇦🇪', capital:'Abu Dhabi', currency:'AED', language:'Arabic, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$75–90',duration:'30–90 days',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Most Western, Asian and many African passport holders enter UAE visa-free. UAE is one of the world\'s easiest destinations to enter.',
    bestTime:'Nov–Mar', flightTime:'~7h from London · ~5h from Lagos' },
  { country:'Japan', region:'Asia', flag:'🇯🇵', capital:'Tokyo', currency:'JPY', language:'Japanese',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'Varies',duration:'15–90 days',processing:'5–10 days'}],
    requirements:['Valid passport','Return ticket','Proof of accommodation','Sufficient funds','Completed arrival card'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)','Japanese Encephalitis (rural areas)'],
    tips:'Most Western passport holders enter visa-free for 90 days. Nigerian and many African nationals require a visa — apply with bank statements and itinerary.',
    bestTime:'Mar–May · Oct–Nov', flightTime:'~12h from London · ~9h from Dubai' },
  { country:'France', region:'Europe', flag:'🇫🇷', capital:'Paris', currency:'EUR', language:'French',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements (3 months)','Sufficient funds (€65/day)'],
    vaccinations:['No mandatory vaccinations'],
    tips:'France is part of the Schengen Area — one visa covers 26 European countries. The Schengen visa allows 90 days in any 180-day period.',
    bestTime:'Apr–Jun · Sep–Oct', flightTime:'~2h from London · ~7h from Lagos' },
  { country:'USA', region:'Americas', flag:'🇺🇸', capital:'Washington D.C.', currency:'USD', language:'English',
    visaTypes:[{type:'ESTA (Visa Waiver)',cost:'$21',duration:'90 days',processing:'72h online'},{type:'B1/B2 Tourist Visa',cost:'$185',duration:'10 years (multiple entry)',processing:'2–8 weeks + interview'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Bank statements','Strong ties to home country','DS-160 form (visa applicants)','In-person interview at US Embassy'],
    vaccinations:['No mandatory vaccinations'],
    tips:'ESTA for UK, EU, Japan, Australia and select nationalities. Most African nationals require B1/B2 tourist visa — apply at least 3 months ahead.',
    bestTime:'Year-round (varies by city)', flightTime:'~9h from London · ~13h from Lagos' },
  { country:'Australia', region:'Pacific', flag:'🇦🇺', capital:'Canberra', currency:'AUD', language:'English',
    visaTypes:[{type:'ETA (Electronic Travel Auth)',cost:'AUD $20',duration:'12 months / 90 days per visit',processing:'Instant (most applications)'},{type:'Tourist Visa',cost:'AUD $150',duration:'12 months',processing:'2–8 weeks'}],
    requirements:['Valid passport (6+ months)','Return ticket','Sufficient funds','Health requirement (long stays)','Character requirement'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Australian ETA is instant for eligible passport holders. Nigerian and many African nationals require a Tourist Visa — apply with bank statements and strong ties evidence.',
    bestTime:'Sep–Nov · Mar–May', flightTime:'~21h from London · ~13h from Dubai' },
]

const statusColors: Record<string,string> = {
  'Visa-Free':'#4ade80','e-Visa':'#60a5fa','Visa on Arrival':'#fbbf24',
  'Visa Required':'#f87171','ESTA (Visa Waiver)':'#60a5fa','Schengen Visa':'#60a5fa',
  'Standard Visitor Visa':'#f87171','Jordan Pass':'#fbbf24','Tourist Visa':'#f87171',
  'B1/B2 Tourist Visa':'#f87171','ETA (Electronic Travel Auth)':'#60a5fa',
  'NZeTA':'#60a5fa','East Africa Tourist Visa':'#fbbf24','eVisitor':'#60a5fa',
}

const getMainStatus = (c: typeof countries[0]) => {
  const types = c.visaTypes.map(v=>v.type)
  if (types.some(t=>t==='Visa-Free'||t==='Visa-Free (EU/EEA/UK)'||t==='Visa-Free (Schengen)')) return { label:'Visa-Free Available', color:'#4ade80' }
  if (types.some(t=>t.includes('on Arrival')||t.includes('ESTA')||t.includes('Jordan Pass')||t.includes('KAZA')||t.includes('Tourist Card'))) return { label:'Visa on Arrival', color:'#fbbf24' }
  if (types.some(t=>t.includes('e-Visa')||t.includes('Schengen')||t.includes('ETA')||t.includes('eTA')||t.includes('eVisitor')||t.includes('K-ETA')||t.includes('eTV'))) return { label:'e-Visa Available', color:'#60a5fa' }
  return { label:'Visa Required', color:'#f87171' }
}

export default function VisaRequirements() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof countries[0]|null>(null)

  const filtered = countries.filter(c => {
    const matchRegion = activeRegion==='All'||c.region===activeRegion
    const matchSearch = search===''||c.country.toLowerCase().includes(search.toLowerCase())||c.region.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchSearch
  })

  return (
    <div style={{ minHeight:'100vh', background:'#080807', paddingTop:90 }}>

      {/* Hero */}
      <div style={{ background:'#0d0c0a', borderBottom:'1px solid rgba(200,169,110,0.1)', padding:'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color:gold, marginBottom:16, display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:32, height:1, background:gold, display:'inline-block' }}/>
            VISA & ENTRY
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20, marginBottom:32 }}>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,7vw,6rem)', fontWeight:300, color:cream, lineHeight:1, margin:0 }}>
              Visa <em style={{ color:gold }}>Requirements</em>
            </h1>
            <p style={{ color:muted, fontSize:'0.95rem', maxWidth:400, lineHeight:1.8, margin:0 }}>
              Entry requirements, visa types, costs and vaccination rules for {countries.length}+ destinations worldwide.
            </p>
          </div>
          <div style={{ background:'rgba(200,169,110,0.06)', border:'1px solid rgba(200,169,110,0.2)', padding:'16px 24px', display:'flex', gap:14, alignItems:'flex-start' }}>
            <span style={{ color:gold, fontSize:'1rem', flexShrink:0, marginTop:2 }}>⚠</span>
            <p style={{ color:muted, fontSize:'0.85rem', lineHeight:1.7, margin:0 }}>
              Visa requirements change frequently. Always verify current requirements with the official embassy or consulate of your destination before travelling. Last updated: 2025.
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ borderBottom:'1px solid rgba(200,169,110,0.08)', padding:'14px clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:20, flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.15em', color:dim }}>LEGEND:</span>
          {[{label:'Visa-Free Available',color:'#4ade80'},{label:'Visa on Arrival / e-Visa',color:'#fbbf24'},{label:'Visa Required',color:'#f87171'}].map(l=>(
            <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:l.color }}/>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.1em', color:dim }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ borderBottom:'1px solid rgba(200,169,110,0.1)', padding:'20px clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:16, alignItems:'center', flexWrap:'wrap', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {regions.map(r=>(
              <button key={r} onClick={()=>{ setActiveRegion(r); setSelected(null) }}
                style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.63rem', letterSpacing:'0.12em', padding:'7px 14px', background:activeRegion===r?gold:'transparent', border:`1px solid ${activeRegion===r?gold:'rgba(200,169,110,0.2)'}`, color:activeRegion===r?'#080807':muted, cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap' }}>
                {r}
              </button>
            ))}
          </div>
          <input placeholder="Search country..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.2)', color:cream, padding:'7px 16px', fontSize:'0.85rem', outline:'none', fontFamily:"'DM Sans',sans-serif", width:200 }}/>
        </div>
      </div>

      {/* ── STACK 1: Visa country grid ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', color:dim, marginBottom:20 }}>
          {filtered.length} COUNTR{filtered.length!==1?'IES':'Y'} {activeRegion!=='All'?`IN ${activeRegion.toUpperCase()}`:'WORLDWIDE'}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:selected?'1fr 380px':'1fr', gap:12, alignItems:'start' }}>

          {/* Grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:2 }}>
            {filtered.map(country=>{
              const status = getMainStatus(country)
              const isSel = selected?.country===country.country
              return (
                <button key={country.country} onClick={()=>setSelected(isSel?null:country)}
                  style={{ background:isSel?'#1C1B18':'#111110', border:`1px solid ${isSel?gold:'rgba(200,169,110,0.1)'}`, padding:'18px 20px', cursor:'pointer', textAlign:'left', transition:'all 0.2s', display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:'1.8rem', flexShrink:0 }}>{country.flag}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', color:cream, fontWeight:600, marginBottom:2 }}>{country.country}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.1em', color:dim, marginBottom:6 }}>{country.region} · {country.capital}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:status.color, flexShrink:0 }}/>
                      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.08em', color:status.color }}>{status.label}</span>
                    </div>
                  </div>
                  <span style={{ color:isSel?gold:dim, fontSize:'0.8rem', flexShrink:0 }}>{isSel?'✕':'→'}</span>
                </button>
              )
            })}
            {filtered.length===0&&(
              <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'60px', color:muted, fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontStyle:'italic' }}>
                No countries found — try adjusting your search
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected&&(
            <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.2)', position:'sticky', top:90 }}>
              <div style={{ background:'#1C1B18', padding:'22px 22px 18px', borderBottom:'1px solid rgba(200,169,110,0.1)', display:'flex', gap:14, alignItems:'flex-start' }}>
                <span style={{ fontSize:'2.2rem' }}>{selected.flag}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.55rem', letterSpacing:'0.15em', color:gold, marginBottom:3 }}>{selected.region}</div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.7rem', fontWeight:300, color:cream, lineHeight:1, marginBottom:4 }}>{selected.country}</h2>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.1em', color:dim }}>{selected.capital} · {selected.currency} · {selected.language}</div>
                </div>
                <button onClick={()=>setSelected(null)} style={{ background:'none', border:'none', color:dim, cursor:'pointer', fontSize:'1rem', padding:4, flexShrink:0 }}>✕</button>
              </div>
              <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:18, maxHeight:'72vh', overflowY:'auto' }}>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', color:gold, marginBottom:10 }}>VISA OPTIONS</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {selected.visaTypes.map((v,i)=>(
                      <div key={i} style={{ background:'#1C1B18', padding:'12px 14px', border:`1px solid ${statusColors[v.type]?statusColors[v.type]+'25':'rgba(200,169,110,0.08)'}` }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.1em', color:statusColors[v.type]||gold }}>{v.type}</span>
                          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:cream, fontWeight:600 }}>{v.cost}</span>
                        </div>
                        <div style={{ display:'flex', gap:16 }}>
                          <div>
                            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.48rem', letterSpacing:'0.12em', color:dim, marginBottom:2 }}>DURATION</div>
                            <div style={{ color:muted, fontSize:'0.78rem' }}>{v.duration}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.48rem', letterSpacing:'0.12em', color:dim, marginBottom:2 }}>PROCESSING</div>
                            <div style={{ color:muted, fontSize:'0.78rem' }}>{v.processing}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', color:gold, marginBottom:10 }}>ENTRY REQUIREMENTS</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    {selected.requirements.map((req,i)=>(
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                        <span style={{ color:gold, fontSize:'0.58rem', marginTop:3, flexShrink:0 }}>✓</span>
                        <span style={{ color:muted, fontSize:'0.83rem', lineHeight:1.5 }}>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', color:gold, marginBottom:10 }}>VACCINATIONS</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    {selected.vaccinations.map((vac,i)=>(
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                        <span style={{ color:vac.includes('MANDATORY')?'#f87171':'#fbbf24', fontSize:'0.6rem', marginTop:3, flexShrink:0 }}>💉</span>
                        <span style={{ color:vac.includes('MANDATORY')?'#f87171':muted, fontSize:'0.83rem', lineHeight:1.5, fontWeight:vac.includes('MANDATORY')?600:400 }}>{vac}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background:'rgba(200,169,110,0.06)', border:'1px solid rgba(200,169,110,0.15)', padding:'14px 16px' }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.55rem', letterSpacing:'0.18em', color:gold, marginBottom:6 }}>✦ HUUBOI TIP</div>
                  <p style={{ color:muted, fontSize:'0.83rem', lineHeight:1.75, margin:0 }}>{selected.tips}</p>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
                  {[{label:'BEST TIME',value:selected.bestTime},{label:'FLIGHT TIME',value:selected.flightTime}].map(s=>(
                    <div key={s.label} style={{ background:'#1C1B18', padding:'10px 12px' }}>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.48rem', letterSpacing:'0.12em', color:dim, marginBottom:3 }}>{s.label}</div>
                      <div style={{ color:cream, fontSize:'0.78rem', lineHeight:1.4 }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <a href="https://aviasales.tp.st/4CRDbzuv" target="_blank" rel="noopener noreferrer"
                    style={{ background:gold, color:'#080807', padding:'12px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.68rem', letterSpacing:'0.15em', textDecoration:'none', textAlign:'center', display:'block' }}>
                    ✈ SEARCH FLIGHTS TO {selected.country.toUpperCase().split(' ')[0]}
                  </a>
                  <Link href="/esim"
                    style={{ background:'transparent', border:'1px solid rgba(200,169,110,0.3)', color:gold, padding:'11px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.68rem', letterSpacing:'0.15em', textDecoration:'none', textAlign:'center', display:'block' }}>
                    📱 GET ESIM FOR {selected.country.toUpperCase().split(' ')[0]}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* General tips */}
        <div style={{ marginTop:48, background:'#111110', border:'1px solid rgba(200,169,110,0.15)', padding:'clamp(24px,3vw,36px)' }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color:gold, marginBottom:16 }}>GENERAL VISA TIPS</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16 }}>
            {[
              {icon:'📅',tip:'Apply at least 6–8 weeks before travel for visa applications that require embassy appointments.'},
              {icon:'📄',tip:'Always carry printed copies of your visa, insurance and hotel bookings — digital is not always accepted.'},
              {icon:'💉',tip:'Carry your yellow fever certificate in your travel wallet — it is required for entry to many countries.'},
              {icon:'🛂',tip:'Never overstay a visa — even by one day. Overstaying can result in fines, deportation and future visa bans.'},
              {icon:'🔍',tip:'Check requirements for every country on your route — transit visas may be required even without leaving the airport.'},
              {icon:'📱',tip:'Get a travel eSIM so you have instant connectivity to look up requirements and contact embassies from anywhere.'},
            ].map((item,i)=>(
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{item.icon}</span>
                <p style={{ color:muted, fontSize:'0.87rem', lineHeight:1.7, margin:0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STACK 2: Second visa widget (Travelpayouts Aviasales visa info) ── */}
      <div style={{ borderTop:'1px solid rgba(200,169,110,0.1)', background:'#0a0908', padding:'clamp(40px,6vw,60px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.28em', color:gold, marginBottom:8, display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:28, height:1, background:gold, display:'inline-block' }}/>
            🛂 LIVE VISA & FLIGHT INFO
          </div>
          <p style={{ color:muted, fontSize:'0.85rem', marginBottom:24, fontFamily:"'DM Sans',sans-serif" }}>
            Search live flight prices to your destination — visa information is shown alongside results.
          </p>
          <div style={{ border:'1px solid rgba(200,169,110,0.15)', overflow:'hidden' }}>
            <div id="tp-visa-widget-2" style={{ minHeight:200 }} />
            <Script
              id="tp-visa-2"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    var s = document.createElement('script');
                    s.async = true;
                    s.charset = 'utf-8';
                    s.src = 'https://tpwidg.com/content?currency=usd&trs=508095&shmarker=710879&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&no_labels=&plain=true&promo_id=7879&campaign_id=100';
                    document.getElementById('tp-visa-widget-2').appendChild(s);
                  })();
                `
              }}
            />
          </div>
        </div>
      </div>

      {/* ── STACK 3: Widget M — Travel Insurance ── */}
      <div style={{ borderTop:'1px solid rgba(200,169,110,0.1)', background:'#080807', padding:'clamp(40px,6vw,60px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.28em', color:gold, marginBottom:8, display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:28, height:1, background:gold, display:'inline-block' }}/>
            🛡 TRAVEL INSURANCE
          </div>
          <p style={{ color:muted, fontSize:'0.85rem', marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>
            Many countries require proof of travel insurance for a visa. Get covered before you apply.
          </p>
          <div style={{ background:'rgba(200,169,110,0.06)', border:'1px solid rgba(200,169,110,0.15)', padding:'12px 18px', marginBottom:24, display:'flex', gap:10, alignItems:'center' }}>
            <span style={{ color:'#fbbf24', fontSize:'0.9rem' }}>⚠</span>
            <p style={{ color:muted, fontSize:'0.82rem', margin:0 }}>
              Schengen visas require minimum €30,000 coverage · Saudi Arabia requires insurance · Cuba requires insurance · Angola requires insurance
            </p>
          </div>
          <div style={{ border:'1px solid rgba(200,169,110,0.15)', overflow:'hidden' }}>
            <div id="tp-insurance-widget" style={{ minHeight:200 }} />
            <Script
              id="tp-widget-m"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    var s = document.createElement('script');
                    s.async = true;
                    s.charset = 'utf-8';
                    s.src = 'https://tp.media/content?campaign_id=222&promo_id=8813&shmarker=710879&trs=508095';
                    document.getElementById('tp-insurance-widget').appendChild(s);
                  })();
                `
              }}
            />
          </div>
          <div style={{ marginTop:16, textAlign:'center' }}>
            <Link href="/insurance" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.68rem', letterSpacing:'0.18em', color:gold, textDecoration:'none', borderBottom:'1px solid rgba(200,169,110,0.3)', paddingBottom:3 }}>
              VIEW ALL INSURANCE OPTIONS →
            </Link>
          </div>
        </div>
      </div>

      {/* Related links */}
      <div style={{ padding:'0 clamp(20px,5vw,60px) clamp(40px,6vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:2 }}>
          {[
            {label:'Travel Tips',sub:'Health, safety and packing',href:'/travel-tips'},
            {label:'Africa & Safari',sub:'Africa visa strategy',href:'/africa-safari'},
            {label:'Budget Calculator',sub:'Plan your trip budget',href:'/budget-calculator'},
            {label:'Travel Insurance',sub:'Get covered before you fly',href:'/insurance'},
            {label:'Get a Travel eSIM',sub:'Data in 150+ countries',href:'/esim'},
          ].map(link=>(
            <Link key={link.href} href={link.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.1)', padding:'18px 20px', transition:'border-color 0.2s' }}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(200,169,110,0.35)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', color:gold, marginBottom:3 }}>{link.label} →</div>
                <div style={{ color:dim, fontSize:'0.75rem' }}>{link.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
