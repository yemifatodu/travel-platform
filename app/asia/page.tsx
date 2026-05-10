'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AsiaPage() {
  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'guide'>('destinations');
  const [selectedDest, setSelectedDest] = useState<any>(null);

  // --- 2. THEME CONSTANTS (Huuboi Aesthetic) ---
  const gold = '#C8A96E';
  const cream = '#F5F5F0';
  const muted = '#A8A8A3';
  const dim = '#666660';

  // --- 3. DATA ARRAYS ---
  const asiaDestinations = [
    {
      slug: 'kyoto-japan',
      name: 'Kyoto, Japan',
      bestTime: 'Mar – May',
      duration: '4–6 Days',
      from: '$1,200',
      experiences: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Traditional Tea Ceremony'],
      hotels: ['Aman Kyoto', 'The Ritz-Carlton, Kyoto', 'Hoshinoya Kyoto']
    },
    {
      slug: 'bali-indonesia',
      name: 'Ubud, Bali',
      bestTime: 'Apr – Oct',
      duration: '5–7 Days',
      from: '$850',
      experiences: ['Tegalalang Rice Terrace', 'Sacred Monkey Forest', 'Yoga Retreats'],
      hotels: ['Mandapa, a Ritz-Carlton Reserve', 'Four Seasons Sayan']
    }
  ];

  const asiaTypes = [
    { title: 'Cultural Bliss', icon: '⛩️', desc: 'Ancient temples, spiritual rituals, and deep-rooted traditions.' },
    { title: 'Modern Neon', icon: '🏙️', desc: 'High-tech mega-cities, vibrant nightlife, and futuristic skylines.' },
    { title: 'Tropical Escape', icon: '🏝️', desc: 'Pristine beaches, private island resorts, and crystal waters.' },
    { title: 'Mountain Zen', icon: '🏔️', desc: 'The Himalayas, tea plantations, and high-altitude serenity.' }
  ];

  return (
    <div style={{ background: '#080807', minHeight: '100vh', color: cream, padding: '40px 20px', fontFamily: "'Cormorant Garamond', serif" }}>
      
      {/* TAB NAVIGATION */}
      <div style={{ display: 'flex', gap: '30px', marginBottom: '40px', borderBottom: `1px solid ${dim}40`, paddingBottom: '10px' }}>
        {['destinations', 'experiences', 'guide'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === tab ? gold : muted,
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.2em',
              cursor: 'pointer',
              fontSize: '0.8rem',
              textTransform: 'uppercase'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DESTINATIONS LIST */}
      {activeTab === 'destinations' && (
        <div style={{ display: 'grid', gap: '2px' }}>
          {asiaDestinations.map((dest) => (
            <div key={dest.slug} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)' }}>
              <div 
                onClick={() => setSelectedDest(selectedDest?.slug === dest.slug ? null : dest)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ padding: '20px' }}> 
                   <h3 style={{ marginBottom: '15px', color: cream, fontSize: '1.4rem' }}>{dest.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 14 }}>
                    {[
                      { label: 'BEST TIME', value: dest.bestTime }, 
                      { label: 'STAY', value: dest.duration }, 
                      { label: 'FROM', value: dest.from }
                    ].map(s => (
                      <div key={s.label} style={{ background: '#1C1B18', padding: '10px 12px' }}>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', color: dim, marginBottom: 3 }}>{s.label}</div>
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.88rem', color: s.label === 'FROM' ? gold : cream, fontWeight: 600 }}>{s.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: selectedDest?.slug === dest.slug ? muted : gold }}>
                    {selectedDest?.slug === dest.slug ? 'CLICK TO CLOSE ↑' : 'SEE DETAILS ↓'}
                  </div>
                </div> 
              </div>

              {selectedDest?.slug === dest.slug && (
                <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', padding: '22px 22px 26px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>EXPERIENCES</div>
                      {dest.experiences.map((exp: string, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }}>
                          <span style={{ color: gold, fontSize: '0.6rem', marginTop: 2 }}>✦</span>
                          <span style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.5 }}>{exp}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>TOP HOTELS</div>
                      {dest.hotels.map((hotel: string, i: number) => (
                        <div key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, borderBottom: '1px solid rgba(200,169,110,0.06)', paddingBottom: 6, marginBottom: 6 }}>{hotel}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a href="https://huuboi.com/flights" target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none' }}>
                      ✈ SEARCH FLIGHTS
                    </a>
                    <Link href="/ai-planner"
                      style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.3)', color: gold, padding: '12px 24px', textDecoration: 'none' }}>
                      PLAN THIS TRIP
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* EXPERIENCES */}
      {activeTab === 'experiences' && (
        <div>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
              Asia <em style={{ color: gold }}>Experiences</em>
            </h2>
            <p style={{ color: muted, lineHeight: 1.8, maxWidth: 600 }}>Asia defies any single definition — it is the sum of dozens of completely different worlds, each extraordinary in its own right.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2, marginBottom: 56 }}>
            {asiaTypes.map(type => (
              <div key={type.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{type.icon}</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', color: gold, marginBottom: 10 }}>{type.title}</h3>
                <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75 }}>{type.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>ASIA BY SEASON</div>
            <div style={{ display: 'grid', gap: 16 }}>
              {[
                { period: 'Dec – Feb', desc: 'Peak season for Thailand, Maldives, and Vietnam south. Japan snow season.', level: 'Peak SE Asia', color: '#f87171' },
                { period: 'Mar – May', desc: 'Japan cherry blossom — Kyoto and Tokyo are extraordinary.', level: 'Japan Peak', color: '#f87171' },
                { period: 'Apr – Oct', desc: 'Bali and Indonesia dry season — ideal conditions.', level: 'Bali Peak', color: '#4ade80' },
                { period: 'Sep – Nov', desc: 'Japan autumn colours. Maldives shoulder season.', level: 'Japan Autumn', color: '#fbbf24' },
              ].map(row => (
                <div key={row.period} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 110px', gap: 16, alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(200,169,110,0.08)' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', color: gold }}>{row.period}</div>
                  <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: row.color, border: `1px solid ${row.color}40`, padding: '3px 10px', textAlign: 'center' }}>{row.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GUIDE */}
      {activeTab === 'guide' && (
        <div>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
              Asia Planning <em style={{ color: gold }}>Guide</em>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>ASIA ESSENTIALS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
                {[
                  { icon: '💴', tip: 'Japan and South Korea are still largely cash-based. Carry local currency.' },
                  { icon: '📱', tip: 'Get a local SIM or travel eSIM — essential for navigation in Asian cities.' },
                  { icon: '🙏', tip: 'Temple etiquette: remove shoes, dress modestly (shoulders and knees covered).' },
                  { icon: '🍜', tip: 'Eat where the locals eat — street food and hawker centres are often safest.' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                    <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,40px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>BUDGET GUIDE (PER DAY)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 2 }}>
                {[
                  { dest: 'Japan', range: '$120–300', note: 'Expensive' },
                  { dest: 'Bali', range: '$50–150', note: 'Excellent value' },
                  { dest: 'Thailand', range: '$40–120', note: 'Great value' },
                  { dest: 'Vietnam', range: '$35–80', note: 'Budget-friendly' }
                ].map(item => (
                  <div key={item.dest} style={{ background: '#1C1B18', padding: '14px 16px' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 3 }}>{item.dest}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: gold, fontWeight: 600 }}>{item.range}</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', color: dim }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* eSIM Section */}
      <div style={{ marginTop: 48, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 ASIA TRAVEL ESIM</div>
          <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Stay connected with Huuboi eSIM across 50+ Asian countries.</p>
        </div>
        <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none' }}>
          GET ASIA ESIM
        </Link>
      </div>

      {/* FOOTER NAV */}
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
        {[
          { label: 'Africa & Safari', href: '/africa-safari' },
          { label: 'Travel Insurance', href: '/travel-insurance' },
          { label: 'Visa Requirements', href: '/visa-requirements' },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold }}>EXPLORE {link.label.toUpperCase()} →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



