'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plane, Calendar, CalendarDays, RefreshCw, Luggage, Clock, Smartphone } from 'lucide-react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// Airline logos from Clearbit CDN
const airlines = [
  { name: 'Emirates', hub: 'Dubai', code: 'AE', logo: 'https://logo.clearbit.com/emirates.com' },
  { name: 'Ethiopian Airlines', hub: 'Addis Ababa', code: 'ET', logo: 'https://logo.clearbit.com/ethiopianairlines.com' },
  { name: 'Kenya Airways', hub: 'Nairobi', code: 'KE', logo: 'https://logo.clearbit.com/kenya-airways.com' },
  { name: 'British Airways', hub: 'London', code: 'GB', logo: 'https://logo.clearbit.com/britishairways.com' },
  { name: 'Qatar Airways', hub: 'Doha', code: 'QA', logo: 'https://logo.clearbit.com/qatarairways.com' },
  { name: 'Turkish Airlines', hub: 'Istanbul', code: 'TR', logo: 'https://logo.clearbit.com/turkishairlines.com' },
  { name: 'Air France', hub: 'Paris', code: 'FR', logo: 'https://logo.clearbit.com/airfrance.com' },
  { name: 'Singapore Airlines', hub: 'Singapore', code: 'SG', logo: 'https://logo.clearbit.com/singaporeair.com' },
]

const tips = [
  { icon: Calendar, tip: 'Book 6–8 weeks ahead for international flights. Last-minute prices can be 2–3x higher.' },
  { icon: CalendarDays, tip: 'Tuesday and Wednesday are consistently the cheapest days to fly.' },
  { icon: RefreshCw, tip: 'Check nearby airports — flying from a secondary airport can save hundreds.' },
  { icon: Luggage, tip: 'Budget airlines add bags to the base fare. Always check the total price including luggage.' },
  { icon: Clock, tip: 'Early morning and late night flights are usually cheaper and less likely to be delayed.' },
  { icon: Smartphone, tip: 'Get a travel eSIM before you land so you can navigate without roaming charges.' },
]

const AirlineLogo = ({ airline }: { airline: typeof airlines[0] }) => {
  const [imgError, setImgError] = useState(false)
  if (imgError) {
    return (
      <div style={{ width: 48, height: 48, borderRadius: '50%', border: `1px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', color: gold, background: 'rgba(200,169,110,0.05)', flexShrink: 0 }}>
        {airline.code}
      </div>
    )
  }
  return (
    <img src={airline.logo} alt={airline.name} onError={() => setImgError(true)} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'contain', background: '#fff', padding: '4px', flexShrink: 0, border: `1px solid rgba(200,169,110,0.2)` }} />
  )
}

export default function FlightsPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [clickedCard, setClickedCard] = useState<string | null>(null)

  useEffect(() => { setMounted(true) }, [])

  // Function to inject the widget script
  const injectWidget = () => {
    const scriptId = "tpwl-script-tag";
    const existingScript = document.getElementById(scriptId);
    
    if (existingScript) existingScript.remove();

    setLoading(true);
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.type = "module";
    script.src = "https://tpwidg.com/wl_web/main.js?wl_id=15518";
    script.setAttribute("data-noptimize", "1");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-wpfc-render", "false");
    script.setAttribute("seraph-accel-crit", "1");
    script.setAttribute("data-no-defer", "1");
    
    script.onload = () => setLoading(false);
    document.head.appendChild(script);
  }

  // Initial load
  useEffect(() => {
    if (!mounted) return;
    injectWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Manual Refresh Handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Small delay to let the UI update and show the spinning icon
    setTimeout(() => {
      injectWidget();
      setIsRefreshing(false);
    }, 300);
  };

  // Mobile scroll animation for airline cards
  useEffect(() => {
    if (!mounted) return;
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mobile-pulse-gold');
            setTimeout(() => entry.target.classList.remove('mobile-pulse-gold'), 2000);
          }
        })
      },
      { threshold: 0.5 }
    );
    const cards = document.querySelectorAll('.airline-card');
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [mounted]);

  const handleCardClick = (airlineName: string) => {
    setClickedCard(airlineName);
    setTimeout(() => setClickedCard(null), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      <style>{`
        .tpwl-widget .wl-tabs__item--hotels, .tpwl-widget [data-tab="hotels"], .tpwl-widget .mewtwo-hotels-checkbox { display: none !important; }
        .tpwl-widget button[type="submit"], .tpwl-widget .wl-button--primary { background: #C8A96E !important; color: #080807 !important; font-family: 'Bebas Neue', sans-serif !important; letter-spacing: 0.1em !important; }

        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 40s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        
        .airline-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; border-radius: 12px !important; }
        .airline-card:hover { transform: translateY(-8px) scale(1.02); border-color: ${gold} !important; box-shadow: 0 12px 32px rgba(200, 169, 110, 0.3), 0 0 20px rgba(200, 169, 110, 0.2) !important; z-index: 10; }
        .airline-card.clicked { background: ${gold} !important; border-color: ${gold} !important; box-shadow: 0 12px 32px rgba(200, 169, 110, 0.4) !important; }
        .airline-card.clicked .airline-name, .airline-card.clicked .airline-hub { color: #080807 !important; }
        
        @keyframes pulseGold { 0%, 100% { border-color: rgba(200,169,110,0.1); box-shadow: 0 8px 24px rgba(0,0,0,0.4); } 50% { border-color: ${gold}; box-shadow: 0 12px 32px rgba(200, 169, 110, 0.3); } }
        .airline-card.mobile-pulse-gold { animation: pulseGold 2s ease-in-out; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .tip-card { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .tip-card:hover { transform: translateY(-6px); border-color: rgba(200, 169, 110, 0.5) !important; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4); }
        .tip-card:hover .tip-icon { transform: scale(1.1); filter: drop-shadow(0 0 8px rgba(200, 169, 110, 0.4)); }
        .tip-icon { transition: all 0.3s ease; }
        
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }
      `}</style>

      {/* HERO SECTION & LIVE WIDGET */}
      <div style={{ background: 'linear-gradient(160deg,#080810,#0a0808,#080a08)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            FLIGHT SEARCH
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 20 }}>
            Fly <em style={{ color: gold }}>Anywhere</em>
          </h1>

          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 40 }}>
            Compare flights across 1,200+ airlines worldwide. Live prices, instant results — all on huuboi.com.
          </p>

          {/* WIDGET CONTAINER WITH REFRESH BUTTON */}
          <div style={{ position: 'relative', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px, 3vw, 32px)', borderRadius: '8px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            
            {/* Refresh Button */}
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              title="Refresh Flight Widget"
              style={{
                position: 'absolute', top: 16, right: 16, zIndex: 20,
                background: (isRefreshing || loading) ? 'rgba(200,169,110,0.1)' : 'transparent',
                border: '1px solid rgba(200,169,110,0.3)', borderRadius: '6px', padding: '8px',
                cursor: (isRefreshing || loading) ? 'not-allowed' : 'pointer', color: gold,
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { if (!isRefreshing && !loading) { e.currentTarget.style.background = gold; e.currentTarget.style.color = '#080807'; e.currentTarget.style.borderColor = gold; } }}
              onMouseLeave={(e) => { if (!isRefreshing && !loading) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = gold; e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)'; } }}
            >
              <RefreshCw size={18} strokeWidth={1.5} className={isRefreshing || loading ? 'spinning' : ''} />
            </button>

            {(loading || isRefreshing) && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', color: dim, fontSize: '0.75rem', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em' }}>
                {isRefreshing ? 'RELOADING SEARCH PORTAL...' : 'LOADING SECURE SEARCH PORTAL...'}
              </div>
            )}
            
            <div id="tpwl-search" style={{ minHeight: '150px', width: '100%' }}></div>
            <div id="tpwl-tickets" style={{ minHeight: '100px', width: '100%', marginTop: '20px' }}></div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>
        {/* 1. AIRLINES */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>TRUSTED CARRIERS</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>Top <em style={{ color: gold }}>Airlines</em></h2>
          </div>
          <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', padding: '20px 0' }}>
            <div className="marquee-track">
              {[...airlines, ...airlines].map((airline, i) => (
                <div key={`${airline.name}-${i}`} className={`airline-card ${clickedCard === airline.name ? 'clicked' : ''}`} onClick={() => handleCardClick(airline.name)} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 16, marginRight: 16, minWidth: '280px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                  <AirlineLogo airline={airline} />
                  <div>
                    <div className="airline-name" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', color: cream, fontWeight: 600, lineHeight: 1.2 }}>{airline.name}</div>
                    <div className="airline-hub" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: dim, marginTop: 4 }}>HUB: {airline.hub.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. TIPS */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>EXPERT ADVICE</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>Booking <em style={{ color: gold }}>Tips</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {tips.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} className="tip-card" style={{ animationDelay: `${i * 0.15}s`, background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '24px', display: 'flex', gap: 16, alignItems: 'flex-start', borderRadius: '8px' }}>
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
      </div>
    </div>
  )
}