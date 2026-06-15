'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plane, Calendar, CalendarDays, RefreshCw, Luggage, Clock, Smartphone } from 'lucide-react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const FlagBadge = ({ code }: { code: string }) => (
  <div style={{
    width: 28, height: 28, borderRadius: '50%', border: `1px solid ${gold}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.05em',
    color: gold, background: 'rgba(200,169,110,0.05)', flexShrink: 0
  }}>
    {code}
  </div>
);

const airlines = [
  { name: 'Emirates', hub: 'Dubai', code: 'AE' },
  { name: 'Ethiopian Airlines', hub: 'Addis Ababa', code: 'ET' },
  { name: 'Kenya Airways', hub: 'Nairobi', code: 'KE' },
  { name: 'British Airways', hub: 'London', code: 'GB' },
  { name: 'Qatar Airways', hub: 'Doha', code: 'QA' },
  { name: 'Turkish Airlines', hub: 'Istanbul', code: 'TR' },
  { name: 'Air France', hub: 'Paris', code: 'FR' },
  { name: 'Singapore Airlines', hub: 'Singapore', code: 'SG' },
]

const tips = [
  { icon: Calendar, tip: 'Book 6–8 weeks ahead for international flights. Last-minute prices can be 2–3x higher.' },
  { icon: CalendarDays, tip: 'Tuesday and Wednesday are consistently the cheapest days to fly.' },
  { icon: RefreshCw, tip: 'Check nearby airports — flying from a secondary airport can save hundreds.' },
  { icon: Luggage, tip: 'Budget airlines add bags to the base fare. Always check the total price including luggage.' },
  { icon: Clock, tip: 'Early morning and late night flights are usually cheaper and less likely to be delayed.' },
  { icon: Smartphone, tip: 'Get a travel eSIM before you land so you can navigate without roaming charges.' },
]

export default function FlightsPage() {
  // We no longer need loading states for the widget, as it's persistent and instant!

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      
      {/* Global Widget CSS Overrides */}
      <style>{`
        .tpwl-widget .wl-tabs__item--hotels,
        .tpwl-widget [data-tab="hotels"],
        .tpwl-widget .mewtwo-hotels-checkbox {
          display: none !important;
        }
        .tpwl-widget button[type="submit"],
        .tpwl-widget .wl-button--primary {
          background: #C8A96E !important;
          color: #080807 !important;
          font-family: 'Bebas Neue', sans-serif !important;
          letter-spacing: 0.1em !important;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .airline-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .airline-card:hover {
          transform: scale(1.05);
          border-color: #C8A96E !important;
          box-shadow: 0 0 20px rgba(200, 169, 110, 0.25);
          z-index: 10;
          background: #181612 !important;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tip-card {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .tip-card:hover {
          transform: translateY(-6px);
          border-color: rgba(200, 169, 110, 0.5) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }
        .tip-card:hover .tip-icon {
          transform: scale(1.1);
          filter: drop-shadow(0 0 8px rgba(200, 169, 110, 0.4));
        }
        .tip-icon { transition: all 0.3s ease; }
      `}</style>

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(160deg,#080810,#0a0808,#080a08)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            FLIGHT SEARCH
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Fly <em style={{ color: gold }}>Anywhere</em>
          </h1>

          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 40 }}>
            Compare flights across 1,200+ airlines worldwide. Live prices, instant results — all on huuboi.com.
          </p>

          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(24px,3vw,36px)', width: '100%' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 16 }}>
              SEARCH LIVE FLIGHT PRICES
            </div>

            <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 20, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>
              Search and compare 1,200+ airlines with live prices. Results load directly on huuboi.com — no redirects.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/flights" style={{ background: gold, color: '#080807', padding: '14px 32px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Plane size={16} strokeWidth={1.5} /> SEARCH FLIGHTS NOW
              </Link>
              <a href="/flights" target="_blank" rel="noopener noreferrer" style={{ border: '1px solid rgba(200,169,110,0.35)', color: gold, padding: '14px 24px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', textDecoration: 'none', display: 'inline-block' }}>
                SEARCH FLIGHTS →
              </a>
            </div>

            <p style={{ color: dim, fontSize: '0.72rem', marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>
              Powered by Huuboi · 1,200+ airlines · Results in English
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* 1. AIRLINES (Animated Infinite Marquee) */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>TRUSTED CARRIERS</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>Top <em style={{ color: gold }}>Airlines</em></h2>
          </div>
          <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', padding: '10px 0' }}>
            <div className="marquee-track">
              {[...airlines, ...airlines].map((airline, i) => (
                <div key={`${airline.name}-${i}`} className="airline-card" style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 30px', display: 'flex', alignItems: 'center', gap: 14, marginRight: 2, cursor: 'pointer', minWidth: '240px' }}>
                  <FlagBadge code={airline.code} />
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: cream, fontWeight: 600, lineHeight: 1.2 }}>{airline.name}</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginTop: 2 }}>HUB: {airline.hub.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. TIPS (Animated Staggered Fade + Gold Script Text) */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>EXPERT ADVICE</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>Booking <em style={{ color: gold }}>Tips</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {tips.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} className="tip-card" style={{ animationDelay: `${i * 0.15}s`, background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div className="tip-icon" style={{ color: gold, flexShrink: 0, marginTop: 2 }}>
                    <IconComp size={22} strokeWidth={1.5} />
                  </div>
                  <p style={{ color: gold, fontSize: '1.1rem', lineHeight: 1.6, margin: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500 }}>
                    {item.tip}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. FLIGHT SEARCH WIDGET CONTAINER */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>LIVE FLIGHT SEARCH</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>Find Your <em style={{ color: gold }}>Flight</em></h2>
          </div>
          
          <div style={{ padding: '24px', minHeight: '300px', display: 'flex', flexDirection: 'column', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.12)', borderRadius: '8px', position: 'relative', width: '100%' }}>
            <div id="tpwl-search" style={{ minHeight: '150px', width: '100%' }}></div>
            <div id="tpwl-tickets" style={{ minHeight: '100px', width: '100%', marginTop: '20px' }}></div>
          </div>
        </div>

      </div>
    </div>
  )
}