'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    VHQVisaRequiredWidget: any
  }
}

export default function VisaPage() {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.VHQVisaRequiredWidget = window.VHQVisaRequiredWidget || []
      window.VHQVisaRequiredWidget.push([
        'init',
        {
          containerId: 'vhq-visa-required-widget',
          language: 'en',
          residency: null,
          nationality: null,
          purpose: 'tourism',
        },
      ])
    }
  }, [])

  return (
    <>
      <Script
        src="https://www.visahq.com/scripts/visa-required-widget/1.1.4/loader-bundle.js"
        strategy="afterInteractive"
      />

      {/* Standard CSS injection to avoid Vercel Build Errors */}
      <style dangerouslySetInnerHTML={{ __html: `
        .visa-shell {
          max-width: 950px;
          margin: 60px auto;
          padding: 28px;
          background: #0b0b0b;
          border-radius: 22px;
          color: #f5efe4;
          font-family: Inter, sans-serif;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .visa-header { margin-bottom: 24px; }
        .visa-header h1 { font-size: 34px; margin-bottom: 8px; font-weight: 700; }
        .visa-header p { opacity: 0.65; font-size: 15px; }

        .visa-filters { display: flex; gap: 12px; margin-bottom: 22px; flex-wrap: wrap; }
        .visa-filters input {
          flex: 1;
          min-width: 220px;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: #111;
          color: white;
          outline: none;
        }

        .visa-filters button {
          padding: 14px 20px;
          border-radius: 14px;
          border: none;
          background: #c8a96e;
          color: #000;
          font-weight: 700;
          cursor: pointer;
        }

        .visa-widget-container {
          background: #101010;
          border-radius: 18px;
          overflow: hidden;
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        #vhq-visa-required-widget iframe {
          border: none !important;
          width: 100% !important;
          min-height: 700px !important;
          border-radius: 14px !important;
        }

        @media (max-width: 768px) {
          .visa-shell { margin: 20px; padding: 20px; }
          .visa-filters { flex-direction: column; }
          .visa-filters button { width: 100%; }
        }
      `}} />

      <div className="visa-shell" style={{ marginTop: '100px' }}>
        <div className="visa-header">
          <h1 style={{ color: '#c8a96e' }}>Visa Requirements Checker</h1>
          <p>Instant travel visa information worldwide via <strong>huuboi.com</strong></p>
        </div>

        <div className="visa-filters">
          <input placeholder="Your nationality" />
          <input placeholder="Destination country" />
          <button>Check Visa</button>
        </div>

        <div className="visa-widget-container">
          <div id="vhq-visa-required-widget"></div>
        </div>
      </div>
    </>
  )
}



