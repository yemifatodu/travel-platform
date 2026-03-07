import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: '[YOUR BRAND] — Global Travel Experiences', template: '%s | [YOUR BRAND]' },
  description: 'Bespoke global travel. Luxury expeditions, curated adventures, and unforgettable journeys across six continents.',
  keywords: ['luxury travel', 'global travel', 'adventure travel', 'travel packages', 'holiday booking'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: '[YOUR BRAND]',
    title: '[YOUR BRAND] — Global Travel Experiences',
    description: 'Bespoke global travel. Luxury meets adventure.',
  },
  twitter: { card: 'summary_large_image', title: '[YOUR BRAND]', description: 'Bespoke global travel.' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}