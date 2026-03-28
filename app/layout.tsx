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
  title: { default: 'HUUBOI — Global Travel Platform', template: '%s | HUUBOI' },
  description: 'One platform for global travel. Flights, hotels, tours, eSIMs, visa guidance and destination intelligence — all in one place.',
  keywords: ['global travel', 'flight search', 'hotel booking', 'travel platform', 'international travel', 'travel eSIM'],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.huuboi.com',
    siteName: 'HUUBOI',
    title: 'HUUBOI — Global Travel Platform',
    description: 'One platform for global travel. Six continents. One system that works.',
    images: [{ url: '/android-chrome-512x512.png', width: 512, height: 512, alt: 'HUUBOI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HUUBOI',
    description: 'One platform for global travel.',
    images: ['/android-chrome-512x512.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
      </body>
    </html>
  )
}
