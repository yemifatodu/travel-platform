'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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
  // AFRICA
  { name:'Lagos', country:'Nigeria', region:'Africa', lat:6.5244, lng:3.3792, highlights:['Nightlife','Culture','Beaches'], bestTime:'Nov–Feb', from:'$320', slug:'lagos' },
  { name:'Cairo', country:'Egypt', region:'Africa', lat:30.0444, lng:31.2357, highlights:['Pyramids','Nile','History'], bestTime:'Oct–Apr', from:'$280', slug:'cairo' },
  { name:'Cape Town', country:'South Africa', region:'Africa', lat:-33.9249, lng:18.4241, highlights:['Table Mountain','Winelands','Beaches'], bestTime:'Nov–Mar', from:'$480', slug:'cape-town' },
  { name:'Nairobi', country:'Kenya', region:'Africa', lat:-1.2921, lng:36.8219, highlights:['Safari','Masai Mara','Wildlife'], bestTime:'Jul–Oct', from:'$420', slug:'nairobi' },
  { name:'Marrakech', country:'Morocco', region:'Africa', lat:31.6295, lng:-7.9811, highlights:['Medina','Souks','Sahara'], bestTime:'Mar–May', from:'$220', slug:'marrakech' },
  { name:'Zanzibar', country:'Tanzania', region:'Africa', lat:-6.1630, lng:39.2026, highlights:['Beaches','Spices','Diving'], bestTime:'Jun–Oct', from:'$380', slug:'zanzibar' },
  { name:'Serengeti', country:'Tanzania', region:'Africa', lat:-2.3333, lng:34.8333, highlights:['Migration','Big Five','Safari'], bestTime:'Jul–Sep', from:'$520', slug:'serengeti' },
  { name:'Accra', country:'Ghana', region:'Africa', lat:5.5571, lng:-0.1969, highlights:['Culture','Beaches','History'], bestTime:'Nov–Mar', from:'$290', slug:'accra' },
  // MIDDLE EAST
  { name:'Dubai', country:'UAE', region:'Middle East', lat:25.2048, lng:55.2708, highlights:['Luxury','Shopping','Architecture'], bestTime:'Nov–Mar', from:'$380', slug:'dubai' },
  { name:'Istanbul', country:'Turkey', region:'Middle East', lat:41.0082, lng:28.9784, highlights:['History','Bazaars','Bosphorus'], bestTime:'Apr–Jun', from:'$240', slug:'istanbul' },
  { name:'Petra', country:'Jordan', region:'Middle East', lat:30.3285, lng:35.4444, highlights:['Ancient City','Desert','Hiking'], bestTime:'Mar–May', from:'$320', slug:'petra' },
  { name:'Muscat', country:'Oman', region:'Middle East', lat:23.5880, lng:58.3829, highlights:['Forts','Beaches','Souqs'], bestTime:'Oct–Apr', from:'$360', slug:'muscat' },
  { name:'Doha', country:'Qatar', region:'Middle East', lat:25.2854, lng:51.5310, highlights:['Luxury','Museums','Desert'], bestTime:'Nov–Mar', from:'$360', slug:'doha' },
  { name:'Riyadh', country:'Saudi Arabia', region:'Middle East', lat:24.7136, lng:46.6753, highlights:['AlUla','Desert','Culture'], bestTime:'Nov–Mar', from:'$400', slug:'riyadh' },
  // EUROPE
  { name:'Paris', country:'France', region:'Europe', lat:48.8566, lng:2.3522, highlights:['Eiffel Tower','Cuisine','Art'], bestTime:'Apr–Jun', from:'$180', slug:'paris' },
  { name:'Rome', country:'Italy', region:'Europe', lat:41.9028, lng:12.4964, highlights:['Colosseum','Vatican','Food'], bestTime:'Apr–May', from:'$200', slug:'rome' },
  { name:'Barcelona', country:'Spain', region:'Europe', lat:41.3851, lng:2.1734, highlights:['Gaudí','Beaches','Nightlife'], bestTime:'May–Jun', from:'$190', slug:'barcelona' },
  { name:'Santorini', country:'Greece', region:'Europe', lat:36.3932, lng:25.4615, highlights:['Sunsets','Caldera','Wine'], bestTime:'May–Oct', from:'$260', slug:'santorini' },
  { name:'London', country:'UK', region:'Europe', lat:51.5074, lng:-0.1278, highlights:['Culture','Museums','History'], bestTime:'May–Sep', from:'$160', slug:'london' },
  { name:'Reykjavik', country:'Iceland', region:'Europe', lat:64.1466, lng:-21.9426, highlights:['Northern Lights','Geysers','Hot Springs'], bestTime:'Sep–Mar', from:'$340', slug:'reykjavik' },
  { name:'Dubrovnik', country:'Croatia', region:'Europe', lat:42.6507, lng:18.0944, highlights:['Old Town','Adriatic','Walls'], bestTime:'May–Jun', from:'$230', slug:'dubrovnik' },
  { name:'Amsterdam', country:'Netherlands', region:'Europe', lat:52.3676, lng:4.9041, highlights:['Canals','Museums','Cycling'], bestTime:'Apr–May', from:'$190', slug:'amsterdam' },
  // ASIA
  { name:'Bali', country:'Indonesia', region:'Asia', lat:-8.3405, lng:115.0920, highlights:['Temples','Surf','Rice Terraces'], bestTime:'Apr–Oct', from:'$420', slug:'bali' },
  { name:'Tokyo', country:'Japan', region:'Asia', lat:35.6762, lng:139.6503, highlights:['Technology','Culture','Food'], bestTime:'Mar–May', from:'$580', slug:'tokyo' },
  { name:'Bangkok', country:'Thailand', region:'Asia', lat:13.7563, lng:100.5018, highlights:['Temples','Street Food','Nightlife'], bestTime:'Nov–Feb', from:'$380', slug:'bangkok' },
  { name:'Maldives', country:'Maldives', region:'Asia', lat:3.2028, lng:73.2207, highlights:['Overwater Villas','Diving','Beaches'], bestTime:'Nov–Apr', from:'$680', slug:'maldives' },
  { name:'Singapore', country:'Singapore', region:'Asia', lat:1.3521, lng:103.8198, highlights:['Food','Gardens','Shopping'], bestTime:'Feb–Apr', from:'$520', slug:'singapore' },
  { name:'Kyoto', country:'Japan', region:'Asia', lat:35.0116, lng:135.7681, highlights:['Temples','Cherry Blossom','Geisha'], bestTime:'Mar–May', from:'$560', slug:'kyoto' },
  { name:'Delhi', country:'India', region:'Asia', lat:28.6139, lng:77.2090, highlights:['History','Food','Culture'], bestTime:'Oct–Mar', from:'$340', slug:'delhi' },
  { name:'Hong Kong', country:'Hong Kong', region:'Asia', lat:22.3193, lng:114.1694, highlights:['Skyline','Food','Shopping'], bestTime:'Oct–Dec', from:'$480', slug:'hong-kong' },
  { name:'Seoul', country:'South Korea', region:'Asia', lat:37.5665, lng:126.9780, highlights:['K-Culture','Food','Temples'], bestTime:'Apr–Jun', from:'$520', slug:'seoul' },
  // AMERICAS
  { name:'New York', country:'USA', region:'Americas', lat:40.7128, lng:-74.0060, highlights:['Manhattan','Broadway','Museums'], bestTime:'Apr–Jun', from:'$420', slug:'new-york' },
  { name:'Rio de Janeiro', country:'Brazil', region:'Americas', lat:-22.9068, lng:-43.1729, highlights:['Carnival','Beaches','Christ Redeemer'], bestTime:'Dec–Mar', from:'$560', slug:'rio-de-janeiro' },
  { name:'Machu Picchu', country:'Peru', region:'Americas', lat:-13.1631, lng:-72.5450, highlights:['Inca Ruins','Hiking','History'], bestTime:'May–Sep', from:'$620', slug:'machu-picchu' },
  { name:'Cancun', country:'Mexico', region:'Americas', lat:21.1619, lng:-86.8515, highlights:['Beaches','Cenotes','Ruins'], bestTime:'Dec–Apr', from:'$380', slug:'cancun' },
  { name:'Buenos Aires', country:'Argentina', region:'Americas', lat:-34.6037, lng:-58.3816, highlights:['Tango','Food','Architecture'], bestTime:'Oct–Apr', from:'$580', slug:'buenos-aires' },
  { name:'Patagonia', country:'Argentina', region:'Americas', lat:-50.9423, lng:-73.4068, highlights:['Glaciers','Hiking','Wildlife'], bestTime:'Nov–Mar', from:'$680', slug:'patagonia' },
  // ARCTIC
  { name:'Svalbard', country:'Norway', region:'Arctic', lat:78.2232, lng:15.6469, highlights:['Northern Lights','Polar Bears','Midnight Sun'], bestTime:'Feb–Apr', from:'$780', slug:'svalbard' },
  { name:'Lapland', country:'Finland', region:'Arctic', lat:68.9010, lng:27.0580, highlights:['Aurora','Dog Sledding','Santa Village'], bestTime:'Dec–Mar', from:'$620', slug:'lapland' },
  // PACIFIC
  { name:'Sydney', country:'Australia', region:'Pacific', lat:-33.8688, lng:151.2093, highlights:['Opera House','Harbour','Beaches'], bestTime:'Sep–Nov', from:'$740', slug:'sydney' },
  { name:'Bora Bora', country:'French Polynesia', region:'Pacific', lat:-16.5004, lng:-151.7415, highlights:['Lagoon','Overwater Bungalows','Snorkelling'], bestTime:'May–Oct', from:'$1,200', slug:'bora-bora' },
  { name:'Hawaii', country:'USA', region:'Pacific', lat:21.3069, lng:-157.8583, highlights:['Volcanoes','Beaches','Surfing'], bestTime:'Apr–Jun', from:'$680', slug:'hawaii' },
  { name:'Queenstown', country:'New Zealand', region:'Pacific', lat:-45.0312, lng:168.6626, highlights:['Adventure','Fjords','Skiing'], bestTime:'Jun–Aug', from:'$820', slug:'queenstown' },
]

const regions = ['All', 'Africa', 'Middle East', 'Europe', 'Asia', 'Americas', 'Arctic', 'Pacific']

export default function MapExplorer() {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [selected, setSelected] = useState<typeof destinations[0] | null>(null)
  const [activeRegion, setActiveRegion] = useState('All')
  const [search, setSearch] = useState('')
  const [mapLoaded, setMapLoaded] = useState(false)

  const filtered = destinations.filter(d => {
    const matchRegion = activeRegion === 'All' || d.region === activeRegion
    const matchSearch = search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchSearch
  })

  // Load Leaflet from CDN
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((window as any).L) { setMapLoaded(true); return }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => setMapLoaded(true)
    document.head.appendChild(script)
  }, [])

  // Initialise map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || leafletMapRef.current) return
    const L = (window as any).L

    const map = L.map(mapRef.current, {
      center: [20, 20],
      zoom: 2,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: true,
      attributionControl: false,
    })

    // Dark styled tiles from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    // Subtle attribution
    L.control.attribution({ prefix: '' }).addTo(map)

    leafletMapRef.current = map

    // Add markers
    destinations.forEach(dest => {
      const color = regionColors[dest.region] || gold
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:10px;height:10px;border-radius:50%;background:${color};border:1.5px solid ${color};box-shadow:0 0 6px ${color}66;cursor:pointer;transition:transform 0.2s;"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      })

      const marker = L.marker([dest.lat, dest.lng], { icon })
        .addTo(map)
        .on('click', () => setSelected(dest))
        .on('mouseover', function (this: any) {
          this.getElement()?.querySelector('div')?.style && (this.getElement().querySelector('div').style.transform = 'scale(1.8)')
        })
        .on('mouseout', function (this: any) {
          this.getElement()?.querySelector('div')?.style && (this.getElement().querySelector('div').style.transform = 'scale(1)')
        })

      markersRef.current.push({ marker, dest })
    })

    return () => {
      map.remove()
      leafletMapRef.current = null
      markersRef.current = []
    }
  }, [mapLoaded])

  // Fly to selected
  useEffect(() => {
    if (!selected || !leafletMapRef.current) return
    leafletMapRef.current.flyTo([selected.lat, selected.lng], 5, { duration: 1.2 })
  }, [selected])

  // Filter markers visibility
  useEffect(() => {
    if (!leafletMapRef.current) return
    const L = (window as any).L
    if (!L) return
    markersRef.current.forEach(({ marker, dest }) => {
      const visible = (activeRegion === 'All' || dest.region === activeRegion) &&
        (search === '' || dest.name.toLowerCase().includes(search.toLowerCase()) || dest.country.toLowerCase().includes(search.toLowerCase()))
      if (visible) {
        if (!leafletMapRef.current.hasLayer(marker)) marker.addTo(leafletMapRef.current)
      } else {
        if (leafletMapRef.current.hasLayer(marker)) marker.remove()
      }
    })
  }, [activeRegion, search])

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
              Click any marker to explore. {destinations.length} destinations across 6 continents.
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

      {/* Map + Panel */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,60px)', display: 'grid', gridTemplateColumns: selected ? '1fr 320px' : '1fr', gap: 12 }}>

        {/* Map container */}
        <div style={{ position: 'relative', border: '1px solid rgba(200,169,110,0.15)', overflow: 'hidden' }}>
          <div ref={mapRef} style={{ height: 520, width: '100%', background: '#0a0c10' }} />

          {!mapLoaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0c10', flexDirection: 'column', gap: 16 }}>
              <div style={{ width: 36, height: 36, border: '2px solid rgba(200,169,110,0.2)', borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: dim }}>LOADING MAP...</p>
            </div>
          )}

          {/* Legend */}
          <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(8,8,7,0.85)', border: '1px solid rgba(200,169,110,0.1)', padding: '10px 14px', display: 'flex', gap: 12, flexWrap: 'wrap', backdropFilter: 'blur(8px)', zIndex: 500 }}>
            {Object.entries(regionColors).map(([region, color]) => (
              <div key={region} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 4px ${color}88` }} />
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.1em', color: dim }}>{region}</span>
              </div>
            ))}
          </div>

          {/* Count */}
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(8,8,7,0.85)', border: '1px solid rgba(200,169,110,0.1)', padding: '6px 12px', zIndex: 500, backdropFilter: 'blur(8px)' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', color: dim }}>{filtered.length} DESTINATIONS</span>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', display: 'flex', flexDirection: 'column', maxHeight: 520 }}>
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
                style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '11px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                SEARCH FLIGHTS
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Destination grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px clamp(20px,5vw,60px) clamp(40px,6vw,80px)' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.25em', color: gold, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
          {activeRegion === 'All' ? 'ALL DESTINATIONS' : activeRegion.toUpperCase()} — {filtered.length} DESTINATIONS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 2 }}>
          {filtered.map(dest => {
            const isSel = selected?.slug === dest.slug
            const color = regionColors[dest.region] || gold
            return (
              <button key={dest.slug} onClick={() => setSelected(isSel ? null : dest)}
                style={{ background: isSel ? 'rgba(200,169,110,0.1)' : '#111110', border: `1px solid ${isSel ? color : 'rgba(200,169,110,0.08)'}`, padding: '14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.08em', color: dim }}>{dest.region}</span>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: isSel ? cream : muted, fontWeight: 600, marginBottom: 2 }}>{dest.name}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.08em', color: isSel ? gold : dim }}>{dest.country} · {dest.from}</div>
              </button>
            )
          })}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
