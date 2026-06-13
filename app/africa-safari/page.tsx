// Africa Safari Page
'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const destinations = [
  {
    slug: 'serengeti',
    name: 'Serengeti',
    country: 'Tanzania',
    tagline: 'The Greatest Wildlife Show on Earth',
    gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)',
    highlights: ['Great Migration', 'Big Five', 'Luxury Tented Camps', 'Balloon Safaris'],
    bestTime: 'Jul–Oct (Migration) · Jan–Feb (Calving)',
    duration: '5–10 nights',
    from: '$3,200',
    description: "Two million wildebeest, 500,000 zebra, and the world's highest concentration of predators. The Serengeti is the benchmark by which all other safari destinations are measured.",
    experiences: [
      'Great Wildebeest Migration river crossings',
      'Hot air balloon safari at sunrise',
      'Walking safari with armed rangers',
      'Night game drives by spotlight',
      'Luxury glamping under the stars',
    ],
    camps: ['Singita Grumeti', "&Beyond Klein's Camp", 'Four Seasons Serengeti', 'Sayari Camp', 'Nomad Lamai'],
  },
  {
    slug: 'masai-mara',
    name: 'Masai Mara',
    country: 'Kenya',
    tagline: "Kenya's Crown Jewel of Wildlife",
    gradient: 'linear-gradient(160deg,#180e00,#2a1800,#3c2200)',
    highlights: ['Big Five', 'Mara River Crossings', 'Masai Culture', 'Year-Round Wildlife'],
    bestTime: 'Jul–Oct (Crossings) · Jan–Mar (Predators)',
    duration: '4–8 nights',
    from: '$2,800',
    description: "The Mara River crossings — where hundreds of thousands of wildebeest hurl themselves into crocodile-infested water — are among the most spectacular events in the natural world.",
    experiences: [
      'Mara River wildebeest crossings',
      'Big Five game drives',
      'Masai village and culture visit',
      'Bush breakfast in the savannah',
      'Hot air balloon over the plains',
    ],
    camps: ["Mahali Mzuri (Virgin)", "Governors' Camp", 'Angama Mara', '&Beyond Bateleur', "Cottar's 1920s Camp"],
  },
]

export default function AfricaSafariPage() {
  const [selectedDest, setSelectedDest] = useState<any>(null)

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      <div style={{
        background: 'linear-gradient(160deg,#0a0800,#0e1008,#080a05)',
        borderBottom: '1px solid rgba(200,169,110,0.12)',
        padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream }}>
            Africa <em style={{ color: gold }}>Safari</em>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 2 }}>
          {destinations.map(dest => (
            <div key={dest.slug}
              onClick={() => setSelectedDest(selectedDest?.slug === dest.slug ? null : dest)}
              style={{ background: '#111110', border: `1px solid ${selectedDest?.slug === dest.slug ? gold : 'rgba(200,169,110,0.1)'}`, cursor: 'pointer' }}>
              <div style={{ background: dest.gradient, height: 130, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 14, left: 18 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', color: gold }}>{dest.country}</div>
                </div>
              </div>
              <div style={{ padding: '20px 22px 22px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: cream }}>{dest.name}</h3>
                <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7 }}>{dest.description}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '14px 0' }}>
                  {dest.highlights.map(h => (
                    <span key={h} style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: gold, padding: '3px 10px', fontSize: '0.55rem' }}>{h}</span>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
                  <div style={{ background: '#1C1B18', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.5rem', color: dim }}>BEST TIME</div>
                    <div style={{ fontSize: '0.88rem', color: cream }}>{dest.bestTime}</div>
                  </div>
                  <div style={{ background: '#1C1B18', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.5rem', color: dim }}>STAY</div>
                    <div style={{ fontSize: '0.88rem', color: cream }}>{dest.duration}</div>
                  </div>
                  <div style={{ background: '#1C1B18', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.5rem', color: dim }}>FROM</div>
                    <div style={{ fontSize: '0.88rem', color: gold }}>{dest.from}</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, fontSize: '0.62rem', color: gold }}>
                  {selectedDest?.slug === dest.slug ? 'CLICK TO CLOSE ↑' : 'SEE DETAILS ↓'}
                </div>
              </div>
              {selectedDest?.slug === dest.slug && (
                <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', padding: '22px 22px 26px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: gold, marginBottom: 12 }}>EXPERIENCES</div>
                      {dest.experiences.map((exp, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                          <span style={{ color: gold }}>✦</span>
                          <span style={{ color: muted, fontSize: '0.85rem' }}>{exp}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6rem', color: gold, marginBottom: 12 }}>TOP CAMPS</div>
                      {dest.camps.map((camp, i) => (
                        <div key={i} style={{ color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6, marginBottom: 6 }}>{camp}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}