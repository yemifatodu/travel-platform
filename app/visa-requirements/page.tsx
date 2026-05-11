'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link'

export default function VisaPage() {
  const gold = '#C8A96E'
  const ink = '#080807'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'

  const handleWidgetInit = () => {
    if (typeof window !== 'undefined') {
      // We cast window to 'any' to bypass the TypeScript error
      const win = window as any;
      win.VHQVisaRequiredWidget = win.VHQVisaRequiredWidget || [];
      win.VHQVisaRequiredWidget.push([
        "init",
        {
          "containerId": "vhq-visa-required-widget",
          "language": "en",
          "residency": null,
          "nationality": null,
          "purpose": "tourism"
        }
      ]);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: ink, color: cream, paddingTop: '120px' }}>
      <Script 
        src="https://www.visahq.com/scripts/visa-required-widget/1.1.4/loader-bundle.js"
        strategy="afterInteractive"
        onLoad={handleWidgetInit}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        #vhq-visa-required-widget iframe {
          border: none !important;
          width: 100% !important;
          min-height: 700px !important;
          background: transparent !important;
        }
        .widget-holder {
          background: #111110;
          border: 1px solid rgba(200,169,110,0.15);
          border-radius: 4px;
          overflow: hidden;
          padding: 20px;
        }
      `}} />

      <div style={{ maxWidth: '950px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.3em', color: gold, marginBottom: '16px' }}>
            HUUBOI GLOBAL ACCESS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, marginBottom: '20px', lineHeight: 1 }}>
            Visa <em style={{ color: gold }}>Requirements</em>
          </h1>
          <p style={{ color: muted, maxWidth: '550px', margin: '0 auto', lineHeight: 1.8 }}>
            Access real-time documentation requirements for over 200 countries. Huuboi (huuboi.com) makes international travel planning seamless and secure.
          </p>
        </div>

        <div className="widget-holder">
          <div id="vhq-visa-required-widget">
            <div style={{ padding: '100px 0', textAlign: 'center', fontFamily: "'Bebas Neue',sans-serif", color: gold, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              LOADING VISA INTELLIGENCE...
            </div>
          </div>
        </div>

        {/* Brand Visibility Section */}
        <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid rgba(245,239,228,0.05)', paddingTop: '40px', paddingBottom: '80px' }}>
          <p style={{ color: muted, fontSize: '0.9rem', marginBottom: '24px' }}>
            Need help? Contact our travel desk at <strong>hello@huuboi.com</strong>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <Link href="/flights" style={{ color: gold, fontSize: '0.7rem', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.15em', textDecoration: 'none' }}>BOOK FLIGHTS</Link>
            <Link href="/hotels" style={{ color: gold, fontSize: '0.7rem', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.15em', textDecoration: 'none' }}>HOTEL RESERVATIONS</Link>
            <Link href="/cars" style={{ color: gold, fontSize: '0.7rem', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.15em', textDecoration: 'none' }}>CAR RENTALS</Link>
          </div>
        </div>
      </div>
    </div>
  )
}