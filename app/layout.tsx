import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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
        <Script
          id="travelpayouts"
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
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
