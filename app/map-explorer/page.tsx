'use client'
import { useState } from 'react'
import Link from 'next/link'
import MapExplorerComponent from '@/components/MapExplorer' // 👈 Importing your new map!

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const regionColors: Record<string, string> = {
  Africa: '#C8A96E',
  'Middle East': '#E8A05A',
  Europe: '#7BA7BC',
  Asia: '#9B8FC8',
  Americas: '#7BC8A0',
  Arctic: '#A8C8E8',
  Pacific: '#C87B9B',
}

const destinations = [
  // (Your massive list of 43 destinations remains untouched here...)
  { name:'Lagos', country:'Nigeria', region:'Africa', highlights:['Nightlife','Culture','Beaches'], bestTime:'Nov–Feb', from:'$320', slug:'lagos' },
  { name:'Cairo', country:'Egypt', region:'Africa', highlights:['Pyramids','Nile','History'], bestTime:'Oct–Apr', from:'$280', slug:'cairo' },
  { name:'Cape Town', country:'South Africa', region:'Africa', highlights:['Table Mountain','Winelands','Beaches'], bestTime:'Nov–Mar', from:'$480', slug:'cape-town' },
  { name:'Nairobi', country:'Kenya', region:'Africa', highlights:['Safari','Masai Mara','Wildlife'], bestTime:'Jul–Oct', from:'$420', slug:'nairobi' },
  { name:'Marrakech', country:'Morocco', region:'Africa', highlights:['Medina','Souks','Sahara'], bestTime:'Mar–May', from:'$220', slug:'marrakech' },
  { name:'Zanzibar', country:'Tanzania', region:'Africa', highlights:['Beaches','Spices','Diving'], bestTime:'Jun–Oct', from:'$380', slug:'zanzibar' },
  { name:'Serengeti', country:'Tanzania', region:'Africa', highlights:['Migration','Big Five','Safari'], bestTime:'Jul–Sep', from:'$520', slug:'serengeti' },
  { name:'Accra', country:'Ghana', region:'Africa', highlights:['Culture','Beaches','History'], bestTime:'Nov–Mar', from:'$290', slug:'accra' },
  { name:'Dubai', country:'UAE', region:'Middle East', highlights:['Luxury','Shopping','Architecture'], bestTime:'Nov–Mar', from:'$380', slug:'dubai' },
  { name:'Istanbul', country:'Turkey', region:'Middle East', highlights:['History','Bazaars','Bosphorus'], bestTime:'Apr–Jun', from:'$240', slug:'istanbul' },
  { name:'Petra', country:'Jordan', region:'Middle East', highlights:['Ancient City','Desert','Hiking'], bestTime:'Mar–May', from:'$320', slug:'petra' },
  { name:'Muscat', country:'Oman', region:'Middle East', highlights:['Forts','Beaches','Souqs'], bestTime:'Oct–Apr', from:'$360', slug:'muscat' },
  { name:'Doha', country:'Qatar', region:'Middle East', highlights:['Luxury','Museums','Desert'], bestTime:'Nov–Mar', from:'$360', slug:'doha' },
  { name:'Riyadh', country:'Saudi Arabia', region:'Middle East', highlights:['AlUla','Desert','Culture'], bestTime:'Nov–Mar', from:'$400', slug:'riyadh' },
  { name:'Paris', country:'France', region:'Europe', highlights:['Eiffel Tower','Cuisine','Art'], bestTime:'Apr–Jun', from:'$180', slug:'paris' },
  { name:'Rome', country:'Italy', region:'Europe', highlights:['Colosseum','Vatican','Food'], bestTime:'Apr–May', from:'$200', slug:'rome' },
  { name:'Barcelona', country:'Spain', region:'Europe', highlights:['Gaudí','Beaches','Nightlife'], bestTime:'May–Jun', from:'$190', slug:'barcelona' },
  { name:'Santorini', country:'Greece', region:'Europe', highlights:['Sunsets','Caldera','Wine'], bestTime:'May–Oct', from:'$260', slug:'santorini' },
  { name:'London', country:'UK', region:'Europe', highlights:['Culture','Museums','History'], bestTime:'May–Sep', from:'$160', slug:'london' },
  { name:'Reykjavik', country:'Iceland', region:'Europe', highlights:['Northern Lights','Geysers','Hot Springs'], bestTime:'Sep–Mar', from:'$340', slug:'reykjavik' },
  { name:'Dubrovnik', country:'Croatia', region:'Europe', highlights:['Old Town','Adriatic','Walls'], bestTime:'May–Jun', from:'$230', slug:'dubrovnik' },
  { name:'Amsterdam', country:'Netherlands', region:'Europe', highlights:['Canals','Museums','Cycling'], bestTime:'Apr–May', from:'$190', slug:'amsterdam' },
  { name:'Bali', country:'Indonesia', region:'Asia', highlights:['Temples','Surf','Rice Terraces'], bestTime:'Apr–Oct', from:'$420', slug:'bali' },
  { name:'Tokyo', country:'Japan', region:'Asia', highlights:['Technology','Culture','Food'], bestTime:'Mar–May', from:'$580', slug:'tokyo' },
  { name:'Bangkok', country:'Thailand', region:'Asia', highlights:['Temples','Street Food','Nightlife'], bestTime:'Nov–Feb', from:'$380', slug:'bangkok' },
  { name:'Maldives', country:'Maldives', region:'Asia', highlights:['Overwater Villas','Diving','Beaches'], bestTime:'Nov–Apr', from:'$680', slug:'maldives' },
  { name:'Singapore', country:'Singapore', region:'Asia', highlights:['Food','Gardens','Shopping'], bestTime:'Feb–Apr', from:'$520', slug:'singapore' },
  { name:'Kyoto', country:'Japan', region:'Asia', highlights:['Temples','Cherry Blossom','Geisha'], bestTime:'Mar–May', from:'$560', slug:'kyoto' },
  { name:'Delhi', country:'India', region:'Asia', highlights:['History','Food','Culture'], bestTime:'Oct–Mar', from:'$340', slug:'delhi' },
  { name:'Hong Kong', country:'Hong Kong', region:'Asia', highlights:['Skyline','Food','Shopping'], bestTime:'Oct–Dec', from:'$480', slug:'hong-kong' },
  { name:'Seoul', country:'South Korea', region:'Asia', highlights:['K-Culture','Food','Temples'], bestTime:'Apr–Jun', from:'$520', slug:'seoul' },
  { name:'New York', country:'USA', region:'Americas', highlights:['Manhattan','Broadway','Museums'], bestTime:'Apr–Jun', from:'$420', slug:'new-york' },
  { name:'Rio de Janeiro', country:'Brazil', region:'Americas', highlights:['Carnival','Beaches','Christ Redeemer'], bestTime:'Dec–Mar', from:'$560', slug:'rio-de-janeiro' },
  { name:'Machu Picchu', country:'Peru', region:'Americas', highlights:['Inca Ruins','Hiking','History'], bestTime:'May–Sep', from:'$620', slug:'machu-picchu' },
  { name:'Cancun', country:'Mexico', region:'Americas', highlights:['Beaches','Cenotes','Ruins'], bestTime:'Dec–Apr', from:'$380', slug:'cancun' },
  { name:'Buenos Aires', country:'Argentina', region:'Americas', highlights:['Tango','Food','Architecture'], bestTime:'Oct–Apr', from:'$580', slug:'buenos-aires' },
  { name:'Patagonia', country:'Argentina', region:'Americas', highlights:['Glaciers','Hiking','Wildlife'], bestTime:'Nov–Mar', from:'$680', slug:'patagonia' },
  { name:'Svalbard', country:'Norway', region:'Arctic', highlights:['Northern Lights','Polar Bears','Midnight Sun'], bestTime:'Feb–Apr', from:'$780', slug:'svalbard' },
  { name:'Lapland', country:'Finland', region:'Arctic', highlights:['Aurora','Dog Sledding','Santa Village'], bestTime:'Dec–Mar', from:'$620', slug:'lapland' },
  { name:'Sydney', country:'Australia', region:'Pacific', highlights:['Opera House','Harbour','Beaches'], bestTime:'Sep–Nov', from:'$740', slug:'sydney' },
  { name:'Bora Bora', country:'French Polynesia', region:'Pacific', highlights:['Lagoon','Overwater Bungalows','Snorkelling'], bestTime:'May–Oct', from:'$1,200', slug:'bora-bora' },
  { name:'Hawaii', country:'USA', region:'Pacific', highlights:['Volcanoes','Beaches','Surfing'], bestTime:'Apr–Jun', from:'$680', slug:'hawaii' },
  { name:'Queenstown', country:'New Zealand', region:'Pacific', highlights:['Adventure','Fjords','Skiing'], bestTime:'Jun–Aug', from:'$820', slug:'queenstown' },
]

const regions = ['All', 'Africa', 'Middle East', 'Europe', 'Asia', 'Americas', 'Arctic', 'Pacific']

export default function MapExplorer() {
  const [selected, setSelected] = useState<typeof destinations[0] | null>(null)
  const [activeRegion, setActiveRegion] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = destinations.filter(d => {
    const matchRegion = activeRegion === 'All' || d.region === activeRegion
    const matchSearch = search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,60px) 0' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            EXPLORE THE WORLD
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: cream, lineHeight: 1, margin: 0 }}>
              Map <em style={{ color: gold }}>Explorer</em>
            </h1>
            <p style={{ color: muted, fontSize: '0.9rem', maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
              Explore destinations across {destinations.length} global regions. Click a location below to focus the map.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {regions.map(r => (
              <button key={r} onClick={() => { setActiveRegion(r); setSelected(null) }}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', padding: '7px 14px', background: activeRegion === r ? (r === 'All' ? gold : regionColors[r] || gold) : 'transparent', border: `1px solid ${activeRegion === r ? (r === 'All' ? gold : regionColors[r] || gold) : 'rgba(200,169,110,0.2)'}`, color: activeRegion === r ? '#080807' : muted, cursor: 'pointer', transition: 'all 0.2s' }}>
                {r}
              </button>
            ))}
          </div>
          <input placeholder="Search destination..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', color: cream, padding: '7px 16px', fontSize: '0.85rem', outline: 'none', fontFamily: "'DM Sans',sans-serif", width: 200 }} />
        </div>
      </div>

      {/* Interactive Google Map */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)' }}>
        <div style={{ border: '1px solid rgba(200,169,110,0.15)', overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold }}>✈ DESTINATION EXPLORER</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', color: muted }}>
              — {selected ? `Viewing ${selected.name}` : 'Select a grid card below to zoom the map'}
            </span>
          </div>
          
          <div className="map-container-responsive" style={{ width: '100%', background: '#0a0c10', position: 'relative' }}>
            {/* 🚀 REAL GOOGLE MAPS INJECTED HERE INSTEAD OF IFRAME */}
            <MapExplorerComponent selectedCityName={selected ? selected.name : null} />
          </div>
        </div>
      </div>

      {/* Destination grid + detail panel */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)', display: 'grid', gridTemplateColumns: selected ? '1fr 320px' : '1fr', gap: 12 }}>

        {/* Destination grid */}
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.25em', color: gold, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
            {activeRegion === 'All' ? 'ALL DESTINATIONS' : activeRegion.toUpperCase()} — {filtered.length} DESTINATIONS
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 6 }}>
            {filtered.map(dest => {
              const isSel = selected?.slug === dest.slug
              const color = regionColors[dest.region] || gold
              return (
                <button key={dest.slug} onClick={() => setSelected(isSel ? null : dest)}
                  style={{ 
                    background: isSel ? 'rgba(200,169,110,0.15)' : '#111110', 
                    border: isSel ? `2px solid ${gold}` : '1px solid rgba(200,169,110,0.25)', 
                    padding: '10px 12px', 
                    cursor: 'pointer', 
                    textAlign: 'left', 
                    transition: 'all 0.2s',
                    boxShadow: isSel ? `0 0 10px rgba(200,169,110,0.3)` : 'none'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.08em', color: dim }}>{dest.region}</span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.85rem', color: isSel ? cream : muted, fontWeight: 600, marginBottom: 1 }}>{dest.name}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.50rem', letterSpacing: '0.08em', color: isSel ? gold : dim }}>{dest.country} · {dest.from}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ background: '#111110', border: `1px solid ${gold}`, display: 'flex', flexDirection: 'column', maxHeight: 600 }}>
            <div style={{ background: '#1C1B18', padding: '20px 20px 16px', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.18em', color: regionColors[selected.region] || gold, marginBottom: 4 }}>{selected.region} · {selected.country}</div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 300, color: cream, margin: 0, lineHeight: 1 }}>{selected.name}</h2>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: dim, cursor: 'pointer', fontSize: '1rem', padding: 4 }}>✕</button>
              </div>
            </div>

            <div style={{ padding: '18px 20px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>HIGHLIGHTS</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selected.highlights.map(h => (
                    <span key={h} style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: gold, padding: '3px 10px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em' }}>{h}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {[{ label: 'BEST TIME', value: selected.bestTime, color: cream }, { label: 'FLIGHTS FROM', value: selected.from, color: gold }].map(s => (
                  <div key={s.label} style={{ background: '#1C1B18', padding: '12px 14px' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.15em', color: dim, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: s.color, fontWeight: 600 }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>NEARBY IN {selected.region.toUpperCase()}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {destinations.filter(d => d.region === selected.region && d.slug !== selected.slug).slice(0, 4).map(d => (
                    <button key={d.slug} onClick={() => setSelected(d)}
                      style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.1)', color: muted, padding: '9px 12px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{d.name}, {d.country}</span>
                      <span style={{ color: gold }}>{d.from}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(200,169,110,0.1)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/ai-planner" style={{ background: gold, color: '#080807', padding: '12px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                PLAN TRIP TO {selected.name.toUpperCase()}
              </Link>
              <a href="https://aviasales.tp.st/4CRDbzuv" target="_blank" rel="noopener noreferrer"
                style={{ background: 'transparent', border: `1px solid ${gold}`, color: gold, padding: '11px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                SEARCH FLIGHTS →
              </a>
            </div>
          </div>
        )}
      </div>

      <div style={{ height: 60 }} />
      
      <style>{`
        .map-container-responsive {
          height: 350px;
        }
        @media (min-width: 768px) {
          .map-container-responsive {
            height: 500px;
          }
        }
      `}</style>
    </div>
  )
}