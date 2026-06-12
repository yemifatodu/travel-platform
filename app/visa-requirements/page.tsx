'use client'

import React from 'react'
import Script from 'next/script'
import Link from 'next/link'

export default function VisaRequirementsPage() {
  const gold = '#C8A96E'
  const ink = '#080807'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'

  return (
    <div style={{ minHeight: '100vh', background: ink, color: cream, paddingTop: '120px' }}>
      
      {/* 1. High Priority Script Loading */}
      <Script 
        src="https://www.visahq.com/scripts/visa-required-widget/1.1.4/loader-bundle.js"
        strategy="afterInteractive" 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        #vhq-visa-required-widget {
          min-height: 700px;
          width: 100%;
          background: #111110;
          border-radius: 8px;
        }
        #vhq-visa-required-widget iframe {
          border: none !important;
          width: 100% !important;
          min-height: 750px !important;
        }
        .visa-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .brand-link {
          color: ${gold};
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .brand-link:hover { opacity: 0.8; }
      `}} />

      <div className="visa-container">
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ 
            fontFamily: "'Bebas Neue',sans-serif", 
            fontSize: '0.8rem', 
            letterSpacing: '0.4em', 
            color: gold, 
            marginBottom: '20px' 
          }}>
            HUUBOI TRAVEL INTELLIGENCE
          </div>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond',serif", 
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
            fontWeight: 300, 
            lineHeight: 1,
            marginBottom: '24px' 
          }}>
            Global <em style={{ color: gold }}>Visa Portal</em>
          </h1>
          <p style={{ color: muted, maxWidth: '600px', margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
            Seamlessly plan your next journey. Use the <strong>Huuboi (huuboi.com)</strong> intelligence tool to verify entry requirements and process documents in real-time.
          </p>
        </div>

        {/* The Widget Box */}
        <div style={{ 
          background: '#111110', 
          border: '1px solid rgba(200,169,110,0.2)', 
          padding: '10px', 
          borderRadius: '12px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
        }}>
          {/* Target for the VisaHQ tool */}
          <div id="vhq-visa-required-widget"></div>

          {/* Configuration Script */}
          <Script id="visahq-config" strategy="afterInteractive">
            {`
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
            `}
          </Script>
        </div>

        {/* Integrated Services Section */}
        <div style={{ 
          marginTop: '80px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2px',
          background: 'rgba(200,169,110,0.1)'
        }}>
          <div style={{ background: ink, padding: '40px' }}>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", color: gold, fontSize: '1.2rem', marginBottom: '15px' }}>Next Steps</h3>
            <p style={{ color: muted, fontSize: '0.95rem', lineHeight: 1.7 }}>
              Once your visa status is confirmed, use <Link href="/flights" className="brand-link">Huuboi.com</Link> to secure your flights and arrange premium <Link href="/hotels" className="brand-link">hotel reservations</Link> worldwide.
            </p>
          </div>
          <div style={{ background: ink, padding: '40px' }}>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", color: gold, fontSize: '1.2rem', marginBottom: '15px' }}>Connectivity</h3>
            <p style={{ color: muted, fontSize: '0.95rem', lineHeight: 1.7 }}>
              Stay connected the moment you land. Check for <Link href="/esim" className="brand-link">eSIM availability</Link> and manage your travel connectivity directly through our platform.
            </p>
          </div>
        </div>

        {/* Footer Branding */}
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <p style={{ color: muted, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Huuboi (huuboi.com) — Six Continents. One Platform.
          </p>
        </div>
      </div>
    </div>
  )
}