'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script' // Added for the transfer widgets

const destinations = [
  { name: 'Serengeti', country: 'Tanzania', region: 'Africa', slug: 'serengeti', gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', slug: 'cape-town', gradient: 'linear-gradient(160deg,#001018,#001c2d,#002840)' },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa', slug: 'marrakech', gradient: 'linear-gradient(160deg,#200800,#381200,#501c00)' },
  { name: 'Zanzibar', country: 'Tanzania', region: 'Africa', slug: 'zanzibar', gradient: 'linear-gradient(160deg,#001a12,#002d1e,#00402a)' },
  { name: 'Victoria Falls', country: 'Zimbabwe', region: 'Africa', slug: 'victoria-falls', gradient: 'linear-gradient(160deg,#001a10,#002818,#003820)' },
  { name: 'Masai Mara', country: 'Kenya', region: 'Africa', slug: 'masai-mara', gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)' },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', slug: 'dubai', gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)' },
  { name: 'Petra', country: 'Jordan', region: 'Middle East', slug: 'petra', gradient: 'linear-gradient(160deg,#200800,#381200,#4a1800)' },
  { name: 'Istanbul', country: 'Turkey', region: 'Middle East', slug: 'istanbul', gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#400030)' },
  { name: 'Kyoto', country: 'Japan', region: 'Asia', slug: 'kyoto', gradient: 'linear-gradient(160deg,#200015,#380025,#4a0033)' },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', slug: 'bali', gradient: 'linear-gradient(160deg,#001a08,#002d10,#00401a)' },
  { name: 'Maldives', country: 'Maldives', region: 'Asia', slug: 'maldives', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Santorini', country: 'Greece', region: 'Europe', slug: 'santorini', gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)' },
  { name: 'Paris', country: 'France', region: 'Europe', slug: 'paris', gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)' },
  { name: 'Amalfi Coast', country: 'Italy', region: 'Europe', slug: 'amalfi-coast', gradient: 'linear-gradient(160deg,#001428,#002040,#002c58)' },
  { name: 'Machu Picchu', country: 'Peru', region: 'Americas', slug: 'machu-picchu', gradient: 'linear-gradient(160deg,#060e00,#0c1c00,#122600)' },
  { name: 'Patagonia', country: 'Argentina', region: 'Americas', slug: 'patagonia', gradient: 'linear-gradient(160deg,#001824,#002a3d,#003852)' },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'Americas', slug: 'rio-de-janeiro', gradient: 'linear-gradient(160deg,#001e14,#003020,#00402a)' },
]

const packages = [
  { name: 'Desert & Dunes', dest: 'Dubai, UAE', duration: '7 nights', price: '$3,200', type: 'Luxury', region: 'Middle East' },
  { name: 'Great Migration', dest: 'Serengeti, Tanzania', duration: '10 nights', price: '$5,800', type: 'Safari', region: 'Africa' },
  { name: 'Northern Lights', dest: 'Svalbard, Norway', duration: '5 nights', price: '$5,500', type: 'Expedition', region: 'Arctic' },
  { name: 'Temple & Blossom', dest: 'Kyoto, Japan', duration: '8 nights', price: '$3,900', type: 'Cultural', region: 'Asia' },
  { name: 'End of the World', dest: 'Patagonia, Argentina', duration: '10 nights', price: '$4,800', type: 'Adventure', region: 'Americas' },
  { name: 'Spice Route', dest: 'Marrakech, Morocco', duration: '6 nights', price: '$2,400', type: 'Cultural', region: 'Africa' },
  { name: 'Ocean Horizon', dest: 'Maldives', duration: '7 nights', price: '$6,200', type: 'Luxury', region: 'Asia' },
  { name: 'Lost City Trek', dest: 'Machu Picchu, Peru', duration: '9 nights', price: '$3,600', type: 'Adventure', region: 'Americas' },
]

const regionHubs: Record<string, string> = {
  'Africa': '/africa-safari',
  'Middle East': '/middle-east',
  'Asia': '/asia',
  'Europe': '/europe',
  'Americas': '/americas',
  'Arctic': '/map-explorer',
  'Pacific': '/pacific',
}

const testimonials = [
  { name: 'Sarah M.', location: 'London, UK', text: 'The Patagonia expedition was flawlessly organised. Every detail was handled — from the remote trekking lodges to the private glacier tours.', rating: 5 },
  { Ahmed K.', location: 'Dubai, UAE', text: 'A truly luxurious experience. The team understood exactly what I needed — discretion, quality, and unforgettable moments.', rating: 5 },
  { name: 'Yuki T.', location: 'Tokyo, Japan', text: "Booked the Serengeti package and I'm still in awe. The great migration was beyond anything I imagined.", rating: 5 },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    // 1. Safe Execution of Travel Payouts Script inside React on Mount
    const existingScript = document.querySelector('script[src*="wl_id=15518"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.type = "module";
      script.src = "https://tpwidg.com/wl_web/main.js?wl_id=15518";
      document.head.appendChild(script);
    }

    // 2. Inject CSS to force clear visibility and fix bounding box issues
    const style = document.createElement('style');
    style.innerHTML = `
      /* --- HIDE DEFAULT HOTEL TAB & HOTEL CHECKBOX --- */
      .tpwl-widget .wl-tabs__item--hotels, 
      .tpwl-widget [data-tab="hotels"],
      .tpwl-widget .mewtwo-hotels-checkbox { 
        display: none !important; 
      }

      /* --- FIXING DISTORTED TEXT COLORS & THEME --- */
      .tpwl-widget, .TPWL-widget, #tpwl-main-form {
        background: #1C1B18 !important;
        border: none !important;
        color: #F5EFE4 !important;
      }

      /* Make all labels clearly readable */
      .tpwl-widget label,
      .tpwl-widget span,
      .tpwl-widget div,
      .tpwl-widget .mewtwo-placeholder-label {
        color: rgba(245, 239, 228, 0.85) !important;
      }

      /* Ensure clear contrast when typing inside search inputs */
      .tpwl-widget input {
        background: #0d0c0a !important;
        color: #F5EFE4 !important;
        border: 1px solid rgba(200, 169, 110, 0.25) !important;
      }
      
      .tpwl-widget input::placeholder {
        color: rgba(245, 239, 228, 0.45) !important;
      }

      /* Turn actionable buttons into your classic Gold aesthetic */
      .tpwl-widget button[type="submit"],
      .tpwl-widget .wl-button--primary {
        background: #C8A96E !important;
        color: #080807 !important;
        font-family: 'Bebas Neue', sans-serif !important;
        letter-spacing: 0.1em !important;
      }

      /* --- RESTORED TO FULL WIDTH & BRIGHT BACKGROUND --- */
      #tpwl-search, #tpwl-main-form {
        max-width: 100% !important;
        margin: 0 auto !important;
        background: #FDFBF7 !important; /* Off-white visible background */
        padding: 15px !important;
        border-radius: 8px !important;
      }
      
      /* Force dark text for readability on the bright form box */
      #tpwl-search label, 
      #tpwl-search span, 
      #tpwl-search .mewtwo-placeholder-label {
        color: #1C1B18 !important;
      }

      /* --- REDUCE HEIGHT AND BRIGHTEN TICKET RESULTS --- */
      .tpwl-widget .wl-ticket, 
      .tpwl-widget .wl-card {
        background: #FFFFFF !important; /* Pure white background for better contrast */
        border: 1px solid rgba(200, 169, 110, 0.25) !important;
        max-height: 160px !important; /* Shrinks the height significantly */
        overflow: hidden !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
      }
      
      /* Force rich dark text for extreme readability against the white background */
      .tpwl-widget .wl-ticket *, 
      .tpwl-widget .wl-card *,
      .tpwl-widget .wl-ticket__price,
      .tpwl-widget .wl-ticket__flight-title {
        color: #080807 !important; 
      }

      /* Handle secondary/subtext gray descriptions inside the white ticket */
      .tpwl-widget .wl-ticket__airline-name,
      .tpwl-widget .wl-ticket__baggage-rule,
      .tpwl-widget [class*="text--gray"],
      .tpwl-widget [class*="text--muted"] {
        color: #555555 !important;
      }
      
      /* Make sure location dropdown choices are readable */
      .tpwl-widget .mewtwo-autocomplete-list,
      .tpwl-widget .wl-autocomplete__dropdown {
        background: #1C1B18 !important;
        color: #F5EFE4 !important;
        border: 1px solid rgba(200, 169, 110, 0.2) !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Removed all clicks except Flights
  const tabs = [
    { label: 'Flights', icon: '✈', link: '/search' }
  ]

  return (
    <>
      <style>{`
        .dest-grid-home {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .pkg-grid-home {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .test-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .dest-grid-home { grid-template-columns: repeat(2, 1fr); }
          .pkg-grid-home { grid-template-columns: repeat(2, 1fr); }
          .test-grid { grid-template-columns: 1fr; }
          #tpwl-search, #tpwl-main-form { max-width: 100% !important; } 
        }
      `}</style>

      {/* HERO — Top boundary fixed to prevent collision with Header */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#0a0a08 0%,#12100a 25%,#0d1520 50%,#080c14 75%,#0a0a08 100%)' }} />
        <div style={{ position: 'absolute', width: '50vw', maxWidth: 700, height: '50vw', maxHeight: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.08) 0%,transparent 70%)', top: -200, right: '5%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,1) 0%,rgba(8,8,7,0.4) 50%,transparent 100%)' }} />
        
        {/* Adjusted padding top to 120px to perfectly clear global site headers */}
        <div className="page-pad" style={{ position: 'relative', zIndex: 10, paddingTop: '120px', paddingBottom: 'clamp(50px,8vw,80px)', maxWidth: 600 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 25, height: 1, background: '#C8A96E', display: 'inline-block' }} />
            LUXURY GLOBAL TRAVEL
          </div>
          
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,6.5vw,6rem)', fontWeight: 300, lineHeight: 0.9, color: '#F5EFE4', marginBottom: 20, letterSpacing: '-0.01em' }}>
            The World<br/>
            <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Awaits</em><br/>
            You
          </h1>
          <p style={{ fontSize: 'clamp(0.75rem,1.5vw,0.85rem)', color: 'rgba(245,239,228,0.70)', maxWidth: 350, lineHeight: 1.6, marginBottom: 32, fontWeight: 300 }}>
            Bespoke journeys crafted for the discerning traveller. Six continents. Infinite stories. One platform.
          </p>
          <div className="hero-buttons">
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', background: '#C8A96E', color: '#080807', padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}>EXPLORE DESTINATIONS</Link>
            <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.5)', color: '#C8A96E', padding: '12px 28px', textDecoration: 'none', display: 'inline-block', marginLeft: '10px' }}>AI TRIP PLANNER</Link>
          </div>
        </div>

        <div className="stats-bar" style={{ display: 'flex', borderTop: '1px solid rgba(200,169,110,0.1)', background: 'rgba(8,8,7,0.85)', backdropFilter: 'blur(8px)', marginTop: 'auto' }}>
          {[
            ['194+','Countries'],
            ['50K+','Travellers'],
            ['2,400+','Packages'],
            ['24/7','Support']
          ].map(([num, label]) => (
            <div key={num} style={{ flex: 1, padding: '12px 0', borderRight: '1px solid rgba(200,169,110,0.1)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2vw,1.4rem)', fontWeight: 600, color: '#C8A96E' }}>{num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.65)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY HUUBOI — REDUCED TO 4/5 SCALE */}
      <section style={{ background: '#0a0908', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(32px,4.8vw,48px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(24px,3.2vw,40px)', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 25, height: 1, background: '#C8A96E', display: 'inline-block' }} />
                WHY HUUBOI
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.4rem,3.2vw,2.5rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1.05, marginBottom: 16 }}>
                One Platform.<br />Every Destination.<br />
                <em style={{ color: '#C8A96E' }}>Smarter Decisions.</em>
              </h2>
              <p style={{ color: 'rgba(245,239,228,0.65)', fontSize: '0.72rem', lineHeight: 1.7, marginBottom: 20 }}>
                HUUBOI brings together flights, hotels, tours, eSIMs and expert travel guides from across six continents — so you stop searching and start discovering.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[
                { icon: '✈', title: 'All In One Place', body: 'Flights, hotels, tours, eSIMs, transfers and experiences — without ever leaving HUUBOI.' },
                { icon: '🧭', title: 'Expert Guides', body: 'Deep destination guides written by people who have actually been there.' },
                { icon: '💡', title: 'Smarter Decisions', body: 'Visa requirements, best seasons, budget guides and insider tips on every page.' },
                { icon: '🌍', title: 'Six Continents', body: '194 destinations across Africa, Middle East, Asia, Europe, the Americas and the Pacific.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '16px' }}>
                  <div style={{ fontSize: '1rem', marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: '#C8A96E', marginBottom: 4 }}>{item.title}</div>
                  <p style={{ color: 'rgba(245,239,228,0.55)', fontSize: '0.6rem', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH FRAME */}
      <section style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.12)' }} className="page-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '30px 0' }}>
          
          <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid rgba(200,169,110,0.15)', overflowX: 'auto' }}>
            {tabs.map((tab, i) => (
              <a key={tab.label} href={tab.link} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.12em', padding: '12px 14px', background: 'none', border: 'none', color: activeTab === i ? '#C8A96E' : 'rgba(245,239,228,0.60)', borderBottom: activeTab === i ? '2px solid #C8A96E' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s', textDecoration: 'none' }}>
                <span style={{ marginRight: 5 }}>{tab.icon}</span>{tab.label}
              </a>
            ))}
          </div>
          
          <div style={{ padding: '15px' }}>
            <div id="tpwl-search"></div>
            <div id="tpwl-tickets"></div>
          </div>
        </div>
      </section>

      {/* AIRPORT TRANSFERS — Added Here to perfectly bridge flights and destinations */}
      <section style={{ background: '#080807', borderBottom: '1px solid rgba(200,169,110,0.12)' }} className="page-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(30px,5vw,50px) 0' }}>
          
          {/* Global CSS Overrides for Widget Contrast */}
          <style jsx global>{`
            .tpwl-widget input,
            .tpwl-widget select,
            .tpwl-widget .m-input,
            .tpwl-widget .m-select,
            .kiwitaxi-widget input,
            .kiwitaxi-widget select {
              color: #080807 !important;
              background-color: #FFFFFF !important;
            }
            
            .tpwl-widget .m-dropdown,
            .tpwl-widget .m-autocomplete__list,
            [class*="dropdown"],
            [class*="autocomplete"] {
              color: #080807 !important;
            }

            .tpwl-widget button[type="submit"],
            .tpwl-widget .m-button--primary,
            .kiwitaxi-widget button {
              background-color: #C8A96E !important;
              color: #080807 !important;
            }
          `}</style>

          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 20 }}>
            AIRPORT TRANSFERS — SEARCH & BOOK YOUR RIDE
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
            
            {/* Wrapper for Widget 1 */}
            <div style={{ flex: '1 1 300px', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(16px,2vw,24px)', minHeight: 200 }}>
              <Script 
                id="transfer-widget-1"
                src="https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&language=en&theme=9&powered_by=true&campaign_id=1&promo_id=1486" 
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>

            {/* Wrapper for Widget 2 */}
            <div style={{ flex: '1 1 300px', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(16px,2vw,24px)', minHeight: 200 }}>
              <Script 
                id="transfer-widget-2"
                src="https://tpwidg.com/content?trs=508095&powered_by=true&shmarker=710879&language=en&display_currency=USD&transfer_type=any&hide_form_extras=true&hide_external_links=true&disable_currency_selector=true&campaign_id=1&promo_id=691" 
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>
          </div>

          <p style={{ color: 'rgba(245,239,228,0.35)', fontSize: '0.75rem', marginTop: 10, fontFamily: "'DM Sans',sans-serif" }}>
            Powered by Kiwitaxi · Available in 120+ countries · Instant confirmation · Direct booking on huuboi.com
          </p>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section-pad page-pad" style={{ background: '#080807', padding: '40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 30 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 8 }}>194 DESTINATIONS WORLDWIDE</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1 }}>
                Iconic <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Destinations</em>
              </h2>
            </div>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.70)', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 2, whiteSpace: 'nowrap' }}>VIEW ALL 194 →</Link>
          </div>
          <div className="dest-grid-home">
            {destinations.map((dest) => (
              <Link key={dest.slug} href={regionHubs[dest.region] || `/destinations/${dest.slug}`}
                style={{ textDecoration: 'none', display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: dest.gradient }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.92) 0%,rgba(8,8,7,0.2) 65%,transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: '#C8A96E', marginBottom: 2 }}>{dest.region}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(0.95rem,2vw,1.3rem)', fontWeight: 600, color: '#F5EFE4', lineHeight: 1.1 }}>{dest.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(245,239,228,0.70)', marginTop: 2 }}>{dest.country}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section-pad page-pad" style={{ background: '#0d0c0a', padding: '40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 8 }}>HANDPICKED FOR YOU</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 300, color: '#F5EFE4' }}>
              Featured <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Packages</em>
            </h2>
          </div>
          <div className="pkg-grid-home">
            {packages.map(pkg => (
              <div key={pkg.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.12)', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.15em', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.35)', display: 'inline-block', padding: '2px 6px' }}>{pkg.type}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(245,239,228,0.45)' }}>{pkg.region}</div>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', fontWeight: 600, color: '#F5EFE4', marginBottom: 4, lineHeight: 1.2 }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.7rem', color: 'rgba(245,239,228,0.70)', marginBottom: 2 }}>{pkg.dest}</p>
                <p style={{ fontSize: '0.65rem', color: 'rgba(245,239,228,0.45)', marginBottom: 12 }}>{pkg.duration}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 10 }}>
                  <div>
                    <div style={{ fontSize: '0.5rem', color: 'rgba(245,239,228,0.45)', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.05em' }}>FROM</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', fontWeight: 600, color: '#C8A96E' }}>{pkg.price}</div>
                  </div>
                  <Link href="/request-trip" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: '#C8A96E', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 1 }}>REQUEST →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI PROMO — Widened text container to sit natively against mobile and desktop widths */}
      <section className="section-pad page-pad" style={{ background: '#080807', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(30px)' }} />
        
        {/* Swapped maxWidth: 450 to 1200 to let it fill standard content bounding boxes */}
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 10 }}>POWERED BY AI</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 14, lineHeight: 1.1 }}>
            Your Perfect Itinerary,<br/><em style={{ color: '#C8A96E' }}>Generated in Seconds</em>
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.75)', lineHeight: 1.6, marginBottom: 24, fontSize: '1rem', maxWidth: 700, margin: '0 auto 24px auto' }}>
            Tell us where you dream of going, your budget, and how you like to travel. Our AI builds a fully personalised day-by-day itinerary — flights, hotels, activities, and hidden gems included.
          </p>
          <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: '#C8A96E', color: '#080807', padding: '12px 32px', textDecoration: 'none', display: 'inline-block' }}>
            TRY THE AI PLANNER FREE
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad page-pad" style={{ background: '#0d0c0a', padding: '40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 8 }}>TRAVELLER STORIES</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', fontWeight: 300, color: '#F5EFE4' }}>
              Words from the <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Road</em>
            </h2>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="test-grid" style={{ width: '66.6%' }}>
              {testimonials.map(t => (
                <div key={t.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '15px' }}>
                  <div style={{ color: '#C8A96E', fontSize: '0.75rem', marginBottom: 10 }}>{'★'.repeat(t.rating)}</div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.75rem', color: 'rgba(245,239,228,0.92)', lineHeight: 1.5, fontStyle: 'italic', marginBottom: 12 }}>"{t.text}"</p>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 500, color: '#F5EFE4' }}>{t.name}</div>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(245,239,228,0.55)', marginTop: 2 }}>{t.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER — Widened elements and upscaled typography for scannability */}
      <section id="contact" style={{ background: '#080807', borderTop: '1px solid rgba(200,169,110,0.1)', padding: '60px 0' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '0 20px' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 10 }}>STAY INSPIRED</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: '#F5EFE4', marginBottom: 10 }}>
            Travel <em style={{ color: '#C8A96E' }}>Intelligence</em> — Delivered
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.60)', marginBottom: 24, fontSize: '0.9rem', lineHeight: 1.6 }}>Exclusive deals, destination guides, and curated travel insights.</p>
          
          <div className="newsletter-row" style={{ display: 'flex', maxWidth: 450, margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.25)', borderRight: 'none', color: '#F5EFE4', padding: '14px 16px', fontSize: '0.85rem', outline: 'none', minWidth: 0 }} />
            <button style={{ background: '#C8A96E', color: '#080807', border: 'none', padding: '0 24px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.1em', cursor: 'pointer', whiteSpace: 'nowrap' }}>SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </>
  )
}