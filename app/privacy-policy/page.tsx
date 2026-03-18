import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | HUUBOI',
  description: 'How HUUBOI collects, uses and protects your personal information.',
}

export default function Page() {
  const gold = '#C8A96E'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'

  const section = (title: string, content: string[]) => (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.25em', color: gold, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.15)' }}>
        {title}
      </h2>
      {content.map((para, i) => (
        <p key={i} style={{ color: muted, lineHeight: 1.9, fontSize: '0.93rem', marginBottom: 14 }}>{para}</p>
      ))}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 100 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(40px,8vw,100px) clamp(20px,5vw,60px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            LEGAL
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 24 }}>
            Privacy Policy
          </h1>
          <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>
            Last updated: March 2026 &nbsp;·&nbsp; HUUBOI.COM
          </p>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(200,169,110,0.15)', marginBottom: 56 }} />

        {section('1. Introduction', [
          'Welcome to HUUBOI ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, store, and share information about you when you visit huuboi.com or use our services.',
          'By using our platform, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our services.',
        ])}

        {section('2. Information We Collect', [
          'Personal Information: When you register an account or make an enquiry, we may collect your name, email address, phone number, country of residence and payment details.',
          'Usage Data: We automatically collect information about how you interact with our website, including pages visited, time spent, search queries, browser type and IP address.',
          'Travel Preferences: If you use our AI Trip Planner or booking tools, we may store destination preferences, travel dates, budget ranges and other travel-related information you provide.',
          'Cookies: We use cookies and similar tracking technologies to improve your experience. You can control cookies through your browser settings.',
        ])}

        {section('3. How We Use Your Information', [
          'To provide and maintain our services, including processing bookings and enquiries.',
          'To personalise your experience and show you relevant destinations, deals and packages.',
          'To send transactional emails such as booking confirmations, and with your consent, promotional communications.',
          'To analyse usage patterns and improve the functionality of our platform.',
          'To comply with legal obligations and prevent fraudulent activity.',
        ])}

        {section('4. Sharing Your Information', [
          'We do not sell your personal data to third parties.',
          'We share your information with trusted third-party service providers who help us operate our platform, including booking partners (Booking.com, Expedia, GetYourGuide, Yesim and others), analytics providers and payment processors. These partners are bound by their own privacy policies.',
          'We may disclose your information if required by law or to protect the rights, property or safety of HUUBOI, our users or the public.',
        ])}

        {section('5. Affiliate Partners', [
          'HUUBOI works with affiliate partners to offer flights, hotels, car rentals, tours, eSIMs and other travel services. When you click through to a partner\'s website or complete a booking, that partner\'s privacy policy will apply to the data you provide them.',
          'We may earn a commission when you make a purchase through our affiliate links. This does not affect the price you pay.',
        ])}

        {section('6. Data Retention', [
          'We retain your personal information for as long as your account is active or as needed to provide our services. You may request deletion of your account and associated data at any time by contacting us at hello@huuboi.com.',
        ])}

        {section('7. Your Rights', [
          'Depending on your location, you may have the right to access, correct, or delete your personal data; to object to or restrict our processing of your data; and to data portability.',
          'To exercise any of these rights, please contact us at hello@huuboi.com. We will respond to all requests within 30 days.',
        ])}

        {section('8. Security', [
          'We implement industry-standard security measures to protect your data, including SSL encryption, secure servers and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
        ])}

        {section('9. Children\'s Privacy', [
          'Our platform is not directed at children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.',
        ])}

        {section('10. Changes to This Policy', [
          'We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. Your continued use of HUUBOI after changes are posted constitutes your acceptance of the updated policy.',
        ])}

        {section('11. Contact Us', [
          'If you have any questions about this Privacy Policy or how we handle your data, please contact us:',
          'Email: hello@huuboi.com\nWebsite: www.huuboi.com\nCompany: HUUBOI\nLocation: Lagos, Nigeria',
        ])}

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(200,169,110,0.15)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/terms" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>Terms & Conditions →</Link>
          <Link href="/refund-policy" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>Refund Policy →</Link>
          <Link href="/" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.4)', textDecoration: 'none' }}>← Back to Home</Link>
        </div>

      </div>
    </div>
  )
}