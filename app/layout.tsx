import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChatButton } from '@/components/ui/ChatButton'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: { default: 'HUUBOI — Global Travel Platform', template: '%s | HUUBOI' },
  description: 'One platform for global travel. Flights, hotels, tours, eSIMs, visa guidance and destination intelligence — all in one place.',
  keywords: ['global travel', 'flight search', 'hotel booking', 'travel platform', 'international travel', 'travel eSIM'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.huuboi.com',
    siteName: 'HUUBOI',
    title: 'HUUBOI — Global Travel Platform',
    description: 'One platform for global travel. Six continents. One system that works.',
  },
  twitter: { card: 'summary_large_image', title: 'HUUBOI', description: 'One platform for global travel.' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatButton />
      </body>
    </html>
  )
}
