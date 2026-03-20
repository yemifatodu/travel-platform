import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: { default: 'HUUBOI — Global Travel Experiences', template: '%s | HUUBOI' },
  description: 'Bespoke global travel. Luxury expeditions, curated adventures, and unforgettable journeys across six continents.',
  keywords: ['luxury travel', 'global travel', 'adventure travel', 'travel packages', 'holiday booking'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.huuboi.com',
    siteName: 'HUUBOI',
    title: 'HUUBOI — Global Travel Experiences',
    description: 'Bespoke global travel. Luxury meets adventure.',
  },
  twitter: { card: 'summary_large_image', title: 'HUUBOI', description: 'Bespoke global travel.' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Travelpayouts verification */}
        <Script
          id="travelpayouts-verify"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function () {
              var script = document.createElement("script");
              script.async = 1;
              script.src = 'https://tp-em.com/NTA4MDk1.js?t=508095';
              document.head.appendChild(script);
            })();`
          }}
        />
        {/* Travelpayouts White Label Widget */}
        <Script
          id="travelpayouts-wl"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function () {
              var script = document.createElement("script");
              script.async = 1;
              script.type = "module";
              script.src = "https://tpwidg.com/wl_web/main.js?wl_id=15099";
              document.head.appendChild(script);
            })();`
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
