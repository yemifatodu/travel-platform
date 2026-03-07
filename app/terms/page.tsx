import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms governing your use of our platform and services.',
}

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 120 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 16 }}>📜 NAVIGATION</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1, marginBottom: 24 }}>Terms & Conditions</h1>
          <p style={{ color: 'rgba(245,239,228,0.55)', fontSize: '1rem', maxWidth: 600, lineHeight: 1.8 }}>The terms governing your use of our platform and services.</p>
        </div>
        {/* Coming Soon Notice */}
        <div style={{ border: '1px solid rgba(200,169,110,0.2)', padding: '48px', background: '#1C1B18', maxWidth: 600 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 16 }}>IN DEVELOPMENT</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#F5EFE4', marginBottom: 16 }}>This page is being built</h2>
          <p style={{ color: 'rgba(245,239,228,0.5)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 32 }}>
            Connect your APIs, add your content, and this page will come to life. See the README for implementation guide.
          </p>
          <Link href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', border: '1px solid #C8A96E', color: '#C8A96E', padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}>← BACK TO HOME</Link>
        </div>
      </div>
    </div>
  )
}
