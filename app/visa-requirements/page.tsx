'use client'

import React from 'react'
import Script from 'next/script'
import Link from 'next/link'

export default function VisaPage() {
  const gold = '#C8A96E'
  const ink = '#080807'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'

  return (
    <div style={{ minHeight: '100vh', background: ink, color: cream, paddingTop: '120px' }}>
      
      {/* 1. Load the Library First */}
      <Script 
        src="https://www.visahq.com/scripts/visa-required-widget/1.1.4/loader-bundle.js"
        strategy="beforeInteractive" 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        #vhq-visa-required-widget {
          min-height: 600px;
          width: 100%;
        }
        #vhq-visa-required-widget iframe {
          border: none !important;
          width: 100% !important;
          min-height: 700px !important;
        }
        .widget-container {
          background: #111110;
          border: 1px solid rgba(200,169,110,0.15);
          padding: 20px;
          border-radius: 4px;
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
            Check real-time entry requirements for any destination. Huuboi (huuboi.com) provides seamless integration with global visa processing.
          </p>
        </div>

        <div className="widget-container">
          {/* 2. The Target Div */}
          <div id="vhq-visa-required-widget"></div>

          {/* 3. The Configuration Script executed natively */}
          <script dangerouslySetInnerHTML={{ __html: `
            window.VHQVisaRequiredWidget = window.VHQVisaRequiredWidget || [];
            window.VHQVisaRequiredWidget.push([
              "init",
              {
                "containerId": "vhq-visa-required-widget",
                "language": "en",
                "residency": null,
                "nationality": null,
                "purpose": "tourism"
              }
            ]);
          `}} />
        </div>

        {/* Footer Links */}
        <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid rgba(245,239,228,0.05)', paddingTop: '40px', paddingBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <Link href="/flights" style={{ color: gold, fontSize: '0.7rem', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.15em', textDecoration: 'none' }}>BOOK FLIGHTS</Link>
            <Link href="/hotels" style={{ color: gold, fontSize: '0.7rem', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.15em', textDecoration: 'none' }}>HOTELS</Link>
            <Link href="/esim" style={{ color: gold, fontSize: '0.7rem', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.15em', textDecoration: 'none' }}>PURCHASE ESIM</Link>
          </div>
        </div>
      </div>
    </div>
  )
}