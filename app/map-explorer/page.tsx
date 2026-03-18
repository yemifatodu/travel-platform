'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

interface Destination {
  name: string; country: string; region: string; slug: string
  x: number; y: number; highlights: string[]; bestTime: string; from: string
}

const destinations: Destination[] = [
  { name:'Lagos',country:'Nigeria',region:'Africa',slug:'lagos',x:46.5,y:48,highlights:['Nightlife','Culture','Beaches'],bestTime:'Nov–Feb',from:'$320' },
  { name:'Cairo',country:'Egypt',region:'Africa',slug:'cairo',x:55,y:36,highlights:['Pyramids','Nile','History'],bestTime:'Oct–Apr',from:'$280' },
  { name:'Cape Town',country:'South Africa',region:'Africa',slug:'cape-town',x:52,y:72,highlights:['Table Mountain','Winelands','Beaches'],bestTime:'Nov–Mar',from:'$480' },
  { name:'Nairobi',country:'Kenya',region:'Africa',slug:'nairobi',x:57,y:53,highlights:['Safari','Masai Mara','Wildlife'],bestTime:'Jul–Oct',from:'$420' },
  { name:'Marrakech',country:'Morocco',region:'Africa',slug:'marrakech',x:43,y:34,highlights:['Medina','Souks','Sahara'],bestTime:'Mar–May',from:'$220' },
  { name:'Zanzibar',country:'Tanzania',region:'Africa',slug:'zanzibar',x:57,y:57,highlights:['Beaches','Spices','Diving'],bestTime:'Jun–Oct',from:'$380' },
  { name:'Accra',country:'Ghana',region:'Africa',slug:'accra',x:45,y:49,highlights:['Culture','Beaches','History'],bestTime:'Nov–Mar',from:'$290' },
  { name:'Serengeti',country:'Tanzania',region:'Africa',slug:'serengeti',x:56,y:54,highlights:['Migration','Big Five','Safari'],bestTime:'Jul–Sep',from:'$520' },
  { name:'Abuja',country:'Nigeria',region:'Africa',slug:'abuja',x:47,y:47,highlights:['Culture','Architecture','Parks'],bestTime:'Nov–Feb',from:'$300' },
  { name:'Dubai',country:'UAE',region:'Middle East',slug:'dubai',x:62,y:38,highlights:['Luxury','Shopping','Architecture'],bestTime:'Nov–Mar',from:'$380' },
  { name:'Istanbul',country:'Turkey',region:'Middle East',slug:'istanbul',x:56,y:28,highlights:['History','Bazaars','Bosphorus'],bestTime:'Apr–Jun',from:'$240' },
  { name:'Petra',country:'Jordan',region:'Middle East',slug:'petra',x:57,y:36,highlights:['Ancient City','Desert','Hiking'],bestTime:'Mar–May',from:'$320' },
  { name:'Muscat',country:'Oman',region:'Middle East',slug:'muscat',x:63,y:40,highlights:['Forts','Beaches','Souqs'],bestTime:'Oct–Apr',from:'$360' },
  { name:'Doha',country:'Qatar',region:'Middle East',slug:'doha',x:62,y:40,highlights:['Luxury','Museums','Desert'],bestTime:'Nov–Mar',from:'$360' },
  { name:'Paris',country:'France',region:'Europe',slug:'paris',x:47,y:23,highlights:['Eiffel Tower','Cuisine','Art'],bestTime:'Apr–Jun',from:'$180' },
  { name:'Rome',country:'Italy',region:'Europe',slug:'rome',x:51,y:26,highlights:['Colosseum','Vatican','Food'],bestTime:'Apr–May',from:'$200' },
  { name:'Barcelona',country:'Spain',region:'Europe',slug:'barcelona',x:47,y:26,highlights:['Gaudí','Beaches','Nightlife'],bestTime:'May–Jun',from:'$190' },
  { name:'Santorini',country:'Greece',region:'Europe',slug:'santorini',x:54,y:29,highlights:['Sunsets','Caldera','Wine'],bestTime:'May–Oct',from:'$260' },
  { name:'London',country:'UK',region:'Europe',slug:'london',x:46,y:20,highlights:['Culture','Museums','History'],bestTime:'May–Sep',from:'$160' },
  { name:'Reykjavik',country:'Iceland',region:'Europe',slug:'reykjavik',x:38,y:13,highlights:['Northern Lights','Geysers','Hot Springs'],bestTime:'Sep–Mar',from:'$340' },
  { name:'Dubrovnik',country:'Croatia',region:'Europe',slug:'dubrovnik',x:52,y:27,highlights:['Old Town','Adriatic','Walls'],bestTime:'May–Jun',from:'$230' },
  { name:'Amsterdam',country:'Netherlands',region:'Europe',slug:'amsterdam',x:48,y:21,highlights:['Canals','Museums','Cycling'],bestTime:'Apr–May',from:'$190' },
  { name:'Prague',country:'Czech Republic',region:'Europe',slug:'prague',x:51,y:22,highlights:['Old Town','Castle','Beer'],bestTime:'May–Sep',from:'$180' },
  { name:'Bali',country:'Indonesia',region:'Asia',slug:'bali',x:77,y:57,highlights:['Temples','Surf','Rice Terraces'],bestTime:'Apr–Oct',from:'$420' },
  { name:'Tokyo',country:'Japan',region:'Asia',slug:'tokyo',x:84,y:30,highlights:['Technology','Culture','Food'],bestTime:'Mar–May',from:'$580' },
  { name:'Bangkok',country:'Thailand',region:'Asia',slug:'bangkok',x:77,y:46,highlights:['Temples','Street Food','Nightlife'],bestTime:'Nov–Feb',from:'$380' },
  { name:'Maldives',country:'Maldives',region:'Asia',slug:'maldives',x:66,y:52,highlights:['Overwater Villas','Diving','Beaches'],bestTime:'Nov–Apr',from:'$680' },
  { name:'Singapore',country:'Singapore',region:'Asia',slug:'singapore',x:78,y:53,highlights:['Food','Gardens','Shopping'],bestTime:'Feb–Apr',from:'$520' },
  { name:'Kyoto',country:'Japan',region:'Asia',slug:'kyoto',x:83,y:31,highlights:['Temples','Cherry Blossom','Geisha'],bestTime:'Mar–May',from:'$560' },
  { name:'Rajasthan',country:'India',region:'Asia',slug:'rajasthan',x:67,y:37,highlights:['Palaces','Forts','Desert'],bestTime:'Oct–Mar',from:'$340' },
  { name:'Hong Kong',country:'Hong Kong',region:'Asia',slug:'hong-kong',x:81,y:36,highlights:['Skyline','Food','Shopping'],bestTime:'Oct–Dec',from:'$480' },
  { name:'Seoul',country:'South Korea',region:'Asia',slug:'seoul',x:83,y:29,highlights:['K-Culture','Food','Temples'],bestTime:'Apr–Jun',from:'$520' },
  { name:'New York',country:'USA',region:'Americas',slug:'new-york',x:23,y:27,highlights:['Manhattan','Broadway','Museums'],bestTime:'Apr–Jun',from:'$420' },
  { name:'Rio',country:'Brazil',region:'Americas',slug:'rio-de-janeiro',x:29,y:63,highlights:['Carnival','Beaches','Christ Redeemer'],bestTime:'Dec–Mar',from:'$560' },
  { name:'Machu Picchu',country:'Peru',region:'Americas',slug:'machu-picchu',x:23,y:60,highlights:['Inca Ruins','Hiking','History'],bestTime:'May–Sep',from:'$620' },
  { name:'Cancun',country:'Mexico',region:'Americas',slug:'cancun',x:19,y:42,highlights:['Beaches','Cenotes','Ruins'],bestTime:'Dec–Apr',from:'$380' },
  { name:'Patagonia',country:'Argentina',region:'Americas',slug:'patagonia',x:22,y:78,highlights:['Glaciers','Hiking','Wildlife'],bestTime:'Nov–Mar',from:'$680' },
  { name:'Havana',country:'Cuba',region:'Americas',slug:'havana',x:20,y:40,highlights:['Old Town','Music','Classic Cars'],bestTime:'Nov–Apr',from:'$460' },
  { name:'Svalbard',country:'Norway',region:'Arctic',slug:'svalbard',x:52,y:8,highlights:['Northern Lights','Polar Bears','Midnight Sun'],bestTime:'Feb–Apr',from:'$780' },
  { name:'Lapland',country:'Finland',region:'Arctic',slug:'lapland',x:54,y:12,highlights:['Aurora','Dog Sledding','Santa Village'],bestTime:'Dec–Mar',from:'$620' },
  { name:'Sydney',country:'Australia',region:'Pacific',slug:'sydney',x:85,y:68,highlights:['Opera House','Harbour','Beaches'],bestTime:'Sep–Nov',from:'$740' },
  { name:'Bora Bora',country:'French Polynesia',region:'Pacific',slug:'bora-bora',x:5,y:61,highlights:['Lagoon','Overwater Bungalows','Snorkelling'],bestTime:'May–Oct',from:'$1,200' },
  { name:'Hawaii',country:'USA',region:'Pacific',slug:'hawaii',x:8,y:37,highlights:['Volcanoes','Beaches','Surfing'],bestTime:'Apr–Jun',from:'$680' },
  { name:'Queenstown',country:'New Zealand',region:'Pacific',slug:'queenstown',x:87,y:74,highlights:['Adventure','Fjords','Skiing'],bestTime:'Jun–Aug',from:'$820' },
]

const regionColors: Record<string,string> = {
  Africa:'#C8A96E', 'Middle East':'#E8A05A', Europe:'#7BA7BC',
  Asia:'#9B8FC8', Americas:'#7BC8A0', Arctic:'#A8C8E8', Pacific:'#C87B9B',
}
const regions = ['All','Africa','Middle East','Europe','Asia','Americas','Arctic','Pacific']

export default function MapExplorer() {
  const [selected, setSelected] = useState<Destination|null>(null)
  const [activeRegion, setActiveRegion] = useState('All')
  const [hovering, setHovering] = useState<string|null>(null)
  const [search, setSearch] = useState('')

  const filtered = destinations.filter(d => {
    const matchRegion = activeRegion === 'All' || d.region === activeRegion
    const matchSearch = search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchSearch
  })

  return (
    <div style={{ minHeight:'100vh', background:'#080807', paddingTop:90 }}>

      {/* Header */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(32px,5vw,60px) clamp(20px,5vw,60px) 0' }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color:gold, marginBottom:16, display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:32, height:1, background:gold, display:'inline-block' }} />
            EXPLORE THE WORLD
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20 }}>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,6vw,5rem)', fontWeight:300, color:cream, lineHeight:1, margin:0 }}>
              Map <em style={{ color:gold }}>Explorer</em>
            </h1>
            <p style={{ color:muted, fontSize:'0.9rem', maxWidth:340, lineHeight:1.7, margin:0 }}>
              Click any dot to explore. {destinations.length} destinations, 6 continents.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:20 }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {regions.map(r => (
              <button key={r} onClick={() => { setActiveRegion(r); setSelected(null) }}
                style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.12em', padding:'7px 14px', background:activeRegion===r?(r==='All'?gold:regionColors[r]||gold):'transparent', border:`1px solid ${activeRegion===r?(r==='All'?gold:regionColors[r]||gold):'rgba(200,169,110,0.2)'}`, color:activeRegion===r?'#080807':muted, cursor:'pointer', transition:'all 0.2s' }}>
                {r}
              </button>
            ))}
          </div>
          <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.2)', color:cream, padding:'7px 14px', fontSize:'0.85rem', outline:'none', fontFamily:"'DM Sans',sans-serif", width:160 }} />
        </div>
      </div>

      {/* Map + Panel */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(20px,5vw,60px)', display:'grid', gridTemplateColumns:selected?'1fr 320px':'1fr', gap:12 }}>

        {/* SVG Map */}
        <div style={{ background:'#0d0c0a', border:'1px solid rgba(200,169,110,0.12)', position:'relative', overflow:'hidden' }}>
          <svg viewBox="0 0 100 85" style={{ width:'100%', display:'block' }}>
            <rect width="100" height="85" fill="#0d0c0a" />
            {[10,20,30,40,50,60,70,80].map(x=><line key={`v${x}`} x1={x} y1="0" x2={x} y2="85" stroke="rgba(200,169,110,0.04)" strokeWidth="0.15"/>)}
            {[10,20,30,40,50,60,70,80].map(y=><line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(200,169,110,0.04)" strokeWidth="0.15"/>)}
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(200,169,110,0.08)" strokeWidth="0.2" strokeDasharray="1,1"/>
            <polygon points="8,12 25,12 32,18 32,30 28,38 22,44 16,44 10,38 8,28 6,20" fill="rgba(200,169,110,0.06)" stroke="rgba(200,169,110,0.12)" strokeWidth="0.15"/>
            <polygon points="18,46 30,46 34,52 32,65 26,76 20,78 16,70 14,60 16,50" fill="rgba(200,169,110,0.06)" stroke="rgba(200,169,110,0.12)" strokeWidth="0.15"/>
            <polygon points="44,14 56,14 58,20 56,28 50,30 46,28 44,22" fill="rgba(200,169,110,0.06)" stroke="rgba(200,169,110,0.12)" strokeWidth="0.15"/>
            <polygon points="44,32 58,32 62,40 62,52 56,64 50,72 44,70 40,58 38,46 40,38" fill="rgba(200,169,110,0.06)" stroke="rgba(200,169,110,0.12)" strokeWidth="0.15"/>
            <polygon points="58,12 90,12 92,22 90,34 84,40 74,44 66,44 60,38 56,28 56,20" fill="rgba(200,169,110,0.06)" stroke="rgba(200,169,110,0.12)" strokeWidth="0.15"/>
            <polygon points="72,44 84,44 84,52 78,58 72,56 68,50" fill="rgba(200,169,110,0.06)" stroke="rgba(200,169,110,0.12)" strokeWidth="0.15"/>
            <polygon points="78,60 90,60 92,68 88,74 80,74 76,68" fill="rgba(200,169,110,0.06)" stroke="rgba(200,169,110,0.12)" strokeWidth="0.15"/>
            {[
              {label:'AMERICAS',x:20,y:35,region:'Americas'},
              {label:'EUROPE',x:50,y:20,region:'Europe'},
              {label:'AFRICA',x:50,y:52,region:'Africa'},
              {label:'MIDDLE EAST',x:60,y:35,region:'Middle East'},
              {label:'ASIA',x:74,y:25,region:'Asia'},
              {label:'PACIFIC',x:85,y:66,region:'Pacific'},
            ].map(l=>(
              <text key={l.label} x={l.x} y={l.y} textAnchor="middle"
                style={{ fontFamily:'sans-serif', fontSize:'1.8px', fill:activeRegion===l.region?regionColors[l.region]:'rgba(200,169,110,0.1)', letterSpacing:'0.3px', fontWeight:600 }}>
                {l.label}
              </text>
            ))}
            {filtered.map(dest => {
              const isSel = selected?.slug===dest.slug
              const isHov = hovering===dest.slug
              const color = regionColors[dest.region]||gold
              const r = isSel?1.8:isHov?1.4:1.0
              return (
                <g key={dest.slug} onClick={()=>setSelected(isSel?null:dest)} onMouseEnter={()=>setHovering(dest.slug)} onMouseLeave={()=>setHovering(null)} style={{ cursor:'pointer' }}>
                  {isSel&&<circle cx={dest.x} cy={dest.y} r={3.5} fill="none" stroke={color} strokeWidth="0.25" opacity="0.35"/>}
                  <circle cx={dest.x} cy={dest.y} r={r} fill={isSel||isHov?color:`${color}88`} stroke={color} strokeWidth="0.2"/>
                  {(isSel||isHov)&&<text x={dest.x+1.6} y={dest.y+0.6} style={{ fontFamily:'sans-serif', fontSize:'2px', fill:cream, fontWeight:600 }}>{dest.name}</text>}
                </g>
              )
            })}
          </svg>
          <div style={{ position:'absolute', bottom:10, left:10, display:'flex', gap:10, flexWrap:'wrap' }}>
            {Object.entries(regionColors).map(([region,color])=>(
              <div key={region} style={{ display:'flex', alignItems:'center', gap:4 }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:color }}/>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.1em', color:dim }}>{region}</span>
              </div>
            ))}
          </div>
          <div style={{ position:'absolute', top:10, right:10, fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.12em', color:dim }}>
            {filtered.length} DESTINATIONS
          </div>
        </div>

        {/* Detail Panel */}
        {selected&&(
          <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.2)', display:'flex', flexDirection:'column', maxHeight:500 }}>
            <div style={{ background:'#1C1B18', padding:'22px 20px', borderBottom:'1px solid rgba(200,169,110,0.1)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', color:regionColors[selected.region]||gold, marginBottom:4 }}>{selected.region} · {selected.country}</div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.8rem', fontWeight:300, color:cream, margin:0, lineHeight:1 }}>{selected.name}</h2>
                </div>
                <button onClick={()=>setSelected(null)} style={{ background:'none', border:'none', color:dim, cursor:'pointer', fontSize:'1rem', padding:4 }}>✕</button>
              </div>
            </div>
            <div style={{ padding:'20px', flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.55rem', letterSpacing:'0.18em', color:gold, marginBottom:8 }}>HIGHLIGHTS</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {selected.highlights.map(h=>(
                    <span key={h} style={{ background:'rgba(200,169,110,0.1)', border:'1px solid rgba(200,169,110,0.2)', color:gold, padding:'3px 10px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.1em' }}>{h}</span>
                  ))}
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
                {[{label:'BEST TIME',value:selected.bestTime,color:cream},{label:'FLIGHTS FROM',value:selected.from,color:gold}].map(s=>(
                  <div key={s.label} style={{ background:'#1C1B18', padding:'12px 14px' }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.15em', color:dim, marginBottom:4 }}>{s.label}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:s.color, fontWeight:600 }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.55rem', letterSpacing:'0.18em', color:gold, marginBottom:8 }}>NEARBY IN {selected.region.toUpperCase()}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                  {destinations.filter(d=>d.region===selected.region&&d.slug!==selected.slug).slice(0,4).map(d=>(
                    <button key={d.slug} onClick={()=>setSelected(d)}
                      style={{ background:'transparent', border:'1px solid rgba(200,169,110,0.1)', color:muted, padding:'9px 12px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.1em', cursor:'pointer', textAlign:'left', display:'flex', justifyContent:'space-between' }}>
                      <span>{d.name}, {d.country}</span>
                      <span style={{ color:gold }}>{d.from}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding:'16px 20px', borderTop:'1px solid rgba(200,169,110,0.1)', display:'flex', flexDirection:'column', gap:8 }}>
              <Link href="/ai-planner" style={{ background:gold, color:'#080807', padding:'13px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.15em', textDecoration:'none', textAlign:'center', display:'block' }}>
                PLAN TRIP TO {selected.name.toUpperCase()}
              </Link>
              <a href="https://aviasales.tp.st/4CRDbzuv" target="_blank" rel="noopener noreferrer"
                style={{ background:'transparent', border:'1px solid rgba(200,169,110,0.3)', color:gold, padding:'12px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.15em', textDecoration:'none', textAlign:'center', display:'block' }}>
                SEARCH FLIGHTS
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Destination Grid */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'20px clamp(20px,5vw,60px) clamp(40px,6vw,80px)' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.25em', color:gold, marginBottom:16, paddingBottom:10, borderBottom:'1px solid rgba(200,169,110,0.1)' }}>
          {activeRegion==='All'?'ALL DESTINATIONS':activeRegion.toUpperCase()} — {filtered.length} DESTINATIONS
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:2 }}>
          {filtered.map(dest=>{
            const isSel = selected?.slug===dest.slug
            const color = regionColors[dest.region]||gold
            return (
              <button key={dest.slug} onClick={()=>setSelected(isSel?null:dest)}
                style={{ background:isSel?'rgba(200,169,110,0.1)':'#111110', border:`1px solid ${isSel?color:'rgba(200,169,110,0.08)'}`, padding:'14px', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}>
                <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:5 }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:color, flexShrink:0 }}/>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.55rem', letterSpacing:'0.08em', color:dim }}>{dest.region}</span>
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'0.95rem', color:isSel?cream:muted, fontWeight:600, marginBottom:2 }}>{dest.name}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.08em', color:isSel?gold:dim }}>{dest.country} · {dest.from}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
