'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// SVG Icons (gold stroke, 1.5px width)
const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  </svg>
)
const IdCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h.01M11 15h2M7 11h.01M15 11h2M7 7h10"/>
  </svg>
)
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const FuelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 22v-8a2 2 0 0 1 2-2h2.5a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h2"/><path d="M7 15v7"/><path d="M3 18h8"/>
  </svg>
)
const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
  </svg>
)
const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6-10V4m6 3l5.447-2.724A1 1 0 0 1 21 5.618v10.764a1 1 0 0 1-.553.894L15 20v-6"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
  </svg>
)

const tips = [
  { icon: <ClipboardIcon />, tip: 'Always book in advance — prices increase significantly closer to your travel date, especially in peak season.' },
  { icon: <IdCardIcon />, tip: 'Carry your driving licence plus an International Driving Permit (IDP) — required in many countries outside your home nation.' },
  { icon: <ShieldIcon />, tip: 'Check what insurance is included. CDW (Collision Damage Waiver) is essential — decline the full excess waiver if your credit card covers it.' },
  { icon: <FuelIcon />, tip: 'Note the fuel policy before you drive away. Full-to-full is always best — avoid pre-pay fuel options.' },
  { icon: <CameraIcon />, tip: 'Photograph the car thoroughly before driving off — every scratch, dent and mark — and make sure the agent notes any existing damage.' },
  { icon: <MapIcon />, tip: 'Download offline maps before picking up. Mobile data can be patchy in remote areas and roaming charges expensive without an eSIM.' },
]

// YOUR SAVED WIDGET URLS
const WIDGET_URL_1 = "https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&locale=en&powered_by=true&transfer_options_limit=10&transfer_options=MCR&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879"
const WIDGET_URL_2 = "https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&powered_by=true&border_radius=5&plain=true&show_logo=true&color_background=%23ffca28&color_button=%2355a539&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10"

export default function CarRentalsPage() {

  useEffect(() => {
    // Add containment CSS - scoped to prevent spill-over to other pages
    const style = document.createElement('style');
    style.id = 'car-rentals-containment';
    style.textContent = `
      /* Contain widget overflow - prevents spill-over */
      #car-rent-widget-container-1,
      #car-rent-widget-container-3 {
        contain: layout style paint !important;
        overflow: hidden !important;
        position: relative !important;
        isolation: isolate !important;
      }
      
      /* Force any modals/dropdowns from widgets to stay inside container */
      #car-rent-widget-container-1 > *,
      #car-rent-widget-container-3 > * {
        contain: layout style paint !important;
      }
      
      /* If Travelpayouts injects modals outside container, hide them on other pages */
      body:not([data-car-rentals-active]) [class*="tp-widget"] [class*="modal"],
      body:not([data-car-rentals-active]) [class*="tp-widget"] [class*="dropdown"],
      body:not([data-car-rentals-active]) [class*="tp-widget"] [role="dialog"],
      body:not([data-car-rentals-active]) [class*="tp-"],
      body:not([data-car-rentals-active]) [id*="travelpayouts"] {
        display: none !important;
        pointer-events: none !important;
      }
      
      /* Style inputs inside widgets */
      #car-rent-widget-container-1 input,
      #car-rent-widget-container-3 input {
        background: #1a1a1a !important;
        border: 1px solid rgba(200,169,110,0.3) !important;
        color: #F5EFE4 !important;
        padding: 10px !important;
        border-radius: 4px !important;
      }
    `;
    document.head.appendChild(style);

    // Mark page as active for CSS scoping
    document.body.setAttribute('data-car-rentals-active', 'true');

    // Helper: Inject script with retry logic and error handling
    const injectWidget = (containerId: string, src: string, label: string) => {
      const tryInject = () => {
        const container = document.getElementById(containerId);
        if (!container) {
          console.warn(`⏳ Waiting for ${containerId}...`);
          return false;
        }
        if (container.innerHTML.trim() !== '' || container.querySelector(`script[src="${src}"]`)) {
          console.log(`✅ ${label} already loaded or container not empty`);
          return true;
        }
        
        const script = document.createElement('script');
        script.async = true;
        script.charset = 'utf-8';
        script.src = src;
        script.onload = () => console.log(`✅ ${label} loaded successfully`);
        script.onerror = () => {
          console.error(`❌ ${label} failed to load`);
          container.innerHTML = `<p style="color:${gold};font-size:0.8rem;text-align:center">Widget unavailable. <a href="/help" style="color:${gold};text-decoration:underline">Get help</a></p>`;
        };
        container.appendChild(script);
        return true;
      };

      // Try immediately, then retry every 500ms up to 5 times
      if (!tryInject()) {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (tryInject() || attempts >= 5) {
            clearInterval(interval);
            if (attempts >= 5) {
              console.error(`❌ ${label} failed after 5 attempts`);
              const container = document.getElementById(containerId);
              if (container) {
                container.innerHTML = `<p style="color:${gold};font-size:0.8rem;text-align:center">Loading error. <button onclick="window.location.reload()" style="background:${gold};color:#080807;border:none;padding:4px 12px;border-radius:4px;cursor:pointer;margin-top:8px">Retry</button></p>`;
              }
            }
          }
        }, 500);
      }
    };

    // ✅ WIDGET 1: Top Transfer/Whitelist Widget (YOUR SAVED URL)
    injectWidget(
      'car-rent-widget-container-1',
      WIDGET_URL_1,
      'Transfer/Whitelist Widget #1'
    );

    // ✅ WIDGET 2: Car Rental Search (YOUR SAVED URL - FIXED)
    injectWidget(
      'car-rent-widget-container-3',
      WIDGET_URL_2,
      'Car Rental Search Widget #2'
    );

    // Cleanup function
    return () => {
      // Remove containment CSS
      const styleEl = document.getElementById('car-rentals-containment');
      if (styleEl) styleEl.remove();
      
      // Remove page marker
      document.body.removeAttribute('data-car-rentals-active');
      
      // Remove injected scripts and reset containers
      ['car-rent-widget-container-1', 'car-rent-widget-container-3'].forEach(id => {
        const container = document.getElementById(id);
        if (container) {
          container.querySelectorAll('script[src*="tpwidg.com"]').forEach(s => s.remove());
          // Only clear if no Travelpayouts widget is actively rendering
          if (!container.querySelector('.tp-widget, [class*="travelpayouts"]')) {
            container.innerHTML = '';
          }
        }
      });
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#0a0808,#100c08,#080a10)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            CAR RENTALS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Drive the<br /><em style={{ color: gold }}>World</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 48 }}>
            Compare car rental prices from 900+ suppliers worldwide. Economy to luxury, city runabouts to 4WD safari vehicles — find the right car at the right price.
          </p>

          {/* WIDGET 1 Container - Transfer/Whitelist */}
          <div style={{ 
            background: '#111110', 
            border: '1px solid rgba(200,169,110,0.2)', 
            padding: 'clamp(16px,3vw,36px)', 
            maxWidth: 860, 
            position: 'relative', 
            zIndex: 1,
            contain: 'layout style paint',
            overflow: 'hidden'
          }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 20 }}>SEARCH RENTALS & TRANSFERS</div>
            
            {/* INJECTION POINT */}
            <div 
              id="car-rent-widget-container-1" 
              style={{ 
                minHeight: '100px', 
                position: 'relative',
                contain: 'layout style paint',
                overflow: 'hidden'
              }} 
            />

            <p style={{ color: dim, fontSize: '0.75rem', textAlign: 'center', marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>
              Best price guarantee · Powered by global local networks
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Tips - SVG Icons */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>RENTAL TIPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {tips.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* eSIM strip - SVG Icon */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PhoneIcon />
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>DRIVING ABROAD?</div>
              <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get a travel eSIM — offline maps, navigation and local data without roaming fees</p>
            </div>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET ESIM
          </Link>
        </div>

        {/* WIDGET 3 Container - Car Rental Search */}
        <div style={{ 
          background: '#111110', 
          border: '1px solid rgba(200,169,110,0.15)', 
          padding: 'clamp(20px,3vw,40px)', 
          marginBottom: 'clamp(48px,7vw,80px)', 
          position: 'relative', 
          zIndex: 1,
          contain: 'layout style paint',
          overflow: 'hidden'
        }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, textAlign: 'center' }}>COMPARE MORE RATES</div>
          
          {/* INJECTION POINT */}
          <div 
            id="car-rent-widget-container-3" 
            style={{ 
              minHeight: '100px', 
              position: 'relative',
              contain: 'layout style paint',
              overflow: 'hidden'
            }} 
          />
        </div>

        {/* Related Links - CSS-only hover */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Airport Transfers', href: '/transfers' },
            { label: 'Travel Insurance', href: '/help' },
            { label: 'Visa Requirements', href: '/visa-requirements' },
            { label: 'Budget Calculator', href: '/budget-calculator' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div className="car-rental-related-card" style={{ 
                background: '#111110', 
                border: '1px solid rgba(200,169,110,0.1)', 
                padding: '18px 20px' 
              }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold }}>{link.label} →</div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* CSS for related card hover (scoped) */}
      <style jsx>{`
        .car-rental-related-card {
          transition: border-color 0.2s ease;
        }
        .car-rental-related-card:hover {
          border-color: rgba(200,169,110,0.35) !important;
        }
      `}</style>
    </div>
  )
}