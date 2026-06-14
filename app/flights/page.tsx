'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plane, Calendar, CalendarDays, RefreshCw, Luggage, Clock, Smartphone } from 'lucide-react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// Elegant circular badge to replace flag emojis with a luxury aesthetic
const FlagBadge = ({ code }: { code: string }) => (
  <div style={{
    width: 28,
    height: 28,
    borderRadius: '50%',
    border: `1px solid ${gold}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: '0.6rem',
    letterSpacing: '0.05em',
    color: gold,
    background: 'rgba(200,169,110,0.05)',
    flexShrink: 0
  }}>
    {code}
  </div>
);

const popularRoutes = [
  { origin: 'Lagos', to: 'Dubai', code: 'LOS → DXB', from_code: 'NG', to_code: 'AE', price: '$380' },
  { origin: 'Lagos', to: 'London', code: 'LOS → LHR', from_code: 'NG', to_code: 'GB', price: '$520' },
  { origin: 'Lagos', to: 'New York', code: 'LOS → JFK', from_code: 'NG', to_code: 'US', price: '$680' },
  { origin: 'Lagos', to: 'Nairobi', code: 'LOS → NBO', from_code: 'NG', to_code: 'KE', price: '$290' },
  { origin: 'London', to: 'Bali', code: 'LHR → DPS', from_code: 'GB', to_code: 'ID', price: '$620' },
  { origin: 'Dubai', to: 'Maldives', code: 'DXB → MLE', from_code: 'AE', to_code: 'MV', price: '$180' },
  { origin: 'London', to: 'Cape Town', code: 'LHR → CPT', from_code: 'GB', to_code: 'ZA', price: '$580' },
  { origin: 'New York', to: 'Paris', code: 'JFK → CDG', from_code: 'US', to_code: 'FR', price: '$420' },
  { origin: 'Dubai', to: 'Bangkok', code: 'DXB → BKK', from_code: 'AE', to_code: 'TH', price: '$220' },
  { origin: 'London', to: 'Tokyo', code: 'LHR → NRT', from_code: 'GB', to_code: 'JP', price: '$680' },
  { origin: 'Lagos', to: 'Accra', code: 'LOS → ACC', from_code: 'NG', to_code: 'GH', price: '$120' },
  { origin: 'London', to: 'Santorini', code: 'LHR → JTR', from_code: 'GB', to_code: 'GR', price: '$180' },
]

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
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Fallback timer to hide loader if widget takes too long
    const timer = setTimeout(() => setLoading(false), 5000)
    const scriptId = "tpwl-script-tag";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.type = "module";
      script.src = "https://tpwidg.com/wl_web/main.js?wl_id=15518";
     
      // Optimization bypasses
      script.setAttribute("data-noptimize", "1");
      script.setAttribute("data-cfasync", "false");
      script.setAttribute("data-wpfc-render", "false");
      script.setAttribute("seraph-accel-crit", "1");
      script.setAttribute("data-no-defer", "1");
     
      script.onload = () => {
        setLoading(false);
      };
     
      document.head.appendChild(script);
    } else {
      setLoading(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [mounted]);

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      
      {/* Widget CSS Overrides */}
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
      `}</style>

      {/* Hero with search CTA */}
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

          {/* Search box with integrated widget */}
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(24px,3vw,36px)', maxWidth: 680 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 16 }}>
              SEARCH LIVE FLIGHT PRICES
            </div>

            <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 20, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>
              Search and compare 1,200+ airlines with live prices. Results load directly on huuboi.com — no redirects.
            </p>

            {/* WIDGET CONTAINER */}
            <div style={{ padding: '24px', minHeight: '300px', display: 'flex', flexDirection: 'column', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.12)', borderRadius: '8px', position: 'relative' }}>
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', color: 'rgba(245,239,228,0.60)', fontSize: '0.75rem', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em' }}>
                  LOADING SECURE SEARCH PORTAL...
                </div>
              )}
             
              {/* Travel Payouts injects form and tickets safely in here */}
              <div id="tpwl-search" style={{ minHeight: '150px', width: '100%' }}></div>
              <div id="tpwl-tickets" style={{ minHeight: '100px', width: '100%', marginTop: '20px' }}></div>
            </div>

            <p style={{ color: dim, fontSize: '0.72rem', marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>
              Powered by Huuboi · 1,200+ airlines · Results in English
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Popular routes */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>
                POPULAR ROUTES
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>
                Most Searched <em style={{ color: gold }}>Routes</em>
              </h2>
            </div>

            <Link href="/search" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: muted, textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: 3 }}>
              SEARCH ALL ROUTES →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 2 }}>
            {popularRoutes.map(route => (
              <Link key={route.code} href="/search" style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <FlagBadge code={route.from_code} />
                    <div style={{ flex: 1, height: 1, background: 'rgba(200,169,110,0.2)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ color: gold }}>
                        <Plane size={14} strokeWidth={1.5} />
                      </div>
                    </div>
                    <FlagBadge code={route.to_code} />
                  </div>

                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim, marginBottom: 4 }}>
                    {route.code}
                  </div>

                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream, fontWeight: 600, marginBottom: 2 }}>
                    {route.origin} → {route.to}
                  </div>

                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', color: gold, marginTop: 8 }}>
                    FROM {route.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>
              TRUSTED CARRIERS
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>
              Top <em style={{ color: gold }}>Airlines</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 2 }}>
            {airlines.map(airline => (
              <div key={airline.name} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <FlagBadge code={airline.code} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream, fontWeight: 600, lineHeight: 1.2 }}>{airline.name}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginTop: 2 }}>HUB: {airline.hub.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>
              EXPERT ADVICE
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>
              Booking <em style={{ color: gold }}>Tips</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {tips.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ color: gold, flexShrink: 0, marginTop: 2 }}>
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>
                  <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.tip}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
