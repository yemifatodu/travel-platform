// app/travel-guides/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { guides, regions, gold, cream, muted, dim } from './guidesData'

export default function TravelGuides() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = guides.filter(g => {
    const matchRegion = activeRegion === 'All' || g.region === activeRegion
    const matchSearch = search === '' || g.title.toLowerCase().includes(search.toLowerCase()) || g.destination.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            EXPERT TRAVEL GUIDES
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: cream, lineHeight: 1, margin: 0 }}>
              Travel <em style={{ color: gold }}>Guides</em>
            </h1>
            <p style={{ color: muted, fontSize: '0.9rem', maxWidth: 360, lineHeight: 1.7, margin: 0 }}>
              In-depth guides for {guides.length} destinations — written by experienced travellers.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  padding: '7px 14px',
                  background: activeRegion === r ? gold : 'transparent',
                  border: `1px solid ${activeRegion === r ? gold : 'rgba(200,169,110,0.2)'}`,
                  color: activeRegion === r ? '#080807' : muted,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {r}
              </button>
            ))}
          </div>
          <input
            placeholder="Search guides..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: '#111110',
              border: '1px solid rgba(200,169,110,0.2)',
              color: cream,
              padding: '7px 14px',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: "'DM Sans',sans-serif",
              width: 200,
            }}
          />
        </div>

        {/* Guides count */}
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: dim, marginBottom: 20 }}>
          {filtered.length} GUIDE{filtered.length !== 1 ? 'S' : ''} FOUND
        </div>

        {/* Guide Cards - Now using Link instead of button */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 2 }}>
          {filtered.map(guide => (
            <Link
              key={guide.slug}
              href={`/travel-guides/${guide.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  background: '#111110',
                  border: '1px solid rgba(200,169,110,0.1)',
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}
              >
                {/* Colour banner */}
                <div
                  style={{
                    background: guide.gradient,
                    height: 120,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(8,8,7,0.7) 0%, transparent 60%)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: '0.58rem',
                        letterSpacing: '0.15em',
                        color: gold,
                      }}
                    >
                      📍 {guide.destination}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '22px 22px 24px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: '0.58rem',
                        letterSpacing: '0.12em',
                        background: 'rgba(200,169,110,0.1)',
                        border: '1px solid rgba(200,169,110,0.2)',
                        color: gold,
                        padding: '3px 10px',
                      }}
                    >
                      {guide.region}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: '0.58rem',
                        letterSpacing: '0.1em',
                        color: dim,
                        padding: '3px 0',
                      }}
                    >
                      {guide.readTime}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 'clamp(1.1rem,2vw,1.35rem)',
                      fontWeight: 600,
                      color: cream,
                      lineHeight: 1.25,
                      marginBottom: 10,
                    }}
                  >
                    {guide.title}
                  </h2>
                  <p
                    style={{
                      color: muted,
                      fontSize: '0.83rem',
                      lineHeight: 1.65,
                      marginBottom: 18,
                    }}
                  >
                    {guide.subtitle}
                  </p>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: '0.62rem',
                      letterSpacing: '0.18em',
                      color: gold,
                    }}
                  >
                    READ GUIDE →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              color: muted,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: '1.2rem',
              fontStyle: 'italic',
            }}
          >
            No guides found — try adjusting your filters
          </div>
        )}
      </div>
    </div>
  )
}