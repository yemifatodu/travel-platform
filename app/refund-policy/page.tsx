import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | HUUBOI',
  description: 'HUUBOI refund and cancellation policy — understand your rights before you book.',
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
            Refund &amp;<br />Cancellation Policy
          </h1>
          <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>
            Last updated: March 2026 &nbsp;·&nbsp; HUUBOI.COM
          </p>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(200,169,110,0.15)', marginBottom: 56 }} />

        {/* Important notice box */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.25)', padding: '28px 32px', marginBottom: 56 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>IMPORTANT</div>
          <p style={{ color: muted, fontSize: '0.93rem', lineHeight: 1.8 }}>
            HUUBOI is a travel aggregator platform. We do not process payments or hold bookings directly. All bookings are made with our third-party partners (such as Booking.com, Expedia, GetYourGuide, Yesim and others). Refunds and cancellations are governed by each partner&apos;s individual policies — not by HUUBOI.
          </p>
        </div>

        {section('1. Our Role as an Aggregator', [
          'HUUBOI connects users with travel service providers through affiliate links. When you complete a booking, your contract is with the third-party provider — not with HUUBOI. We earn a commission for facilitating the connection.',
          'Because we do not process your payment or hold your booking, we cannot issue refunds directly. All refund and cancellation requests must be directed to the provider you booked with.',
        ])}

        {section('2. Cancellation by the Traveller', [
          'Your ability to cancel and receive a refund depends entirely on the fare type, rate, or plan you purchased and the cancellation policy of the booking provider.',
          'Flexible / Free Cancellation: Many hotels and packages offer free cancellation up to a specified date before check-in. These are clearly marked at the time of booking.',
          'Non-Refundable Rates: Some discounted fares, promotional hotel rates and activity bookings are non-refundable. Please read all terms carefully before confirming a non-refundable booking.',
          'Partially Refundable: Some bookings may allow partial refunds depending on how far in advance you cancel. The specific terms will be stated in your booking confirmation.',
        ])}

        {section('3. How to Cancel a Booking', [
          'Step 1: Locate your booking confirmation email from the travel provider (e.g. Booking.com, Expedia, GetYourGuide).',
          'Step 2: Follow the cancellation instructions in the confirmation email or log in to the provider\'s website/app and manage your booking there.',
          'Step 3: If you experience difficulty, contact the provider\'s customer support team directly using the details in your confirmation.',
          'If you need help identifying the right provider to contact, email us at hello@huuboi.com with your booking details and we will assist where possible.',
        ])}

        {section('4. Flights', [
          'Flight refund and cancellation policies vary by airline and fare class. Low-cost carrier fares are typically non-refundable but may allow date changes for a fee.',
          'If your flight is cancelled by the airline, you are generally entitled to a full refund or rebooking under aviation consumer protection rules. Contact the airline directly.',
          'We recommend purchasing travel insurance that covers flight cancellation for added peace of mind.',
        ])}

        {section('5. Hotels & Accommodation', [
          'Hotel cancellation policies range from fully flexible (free cancellation before a set date) to strictly non-refundable.',
          'The cancellation deadline and refund amount will be clearly stated at the time of booking on the partner\'s website. Always check the policy before confirming.',
          'In cases of genuine emergency (medical or natural disaster), many providers will consider exceptional cancellation requests — contact the property directly.',
        ])}

        {section('6. Tours & Activities', [
          'Tour and activity cancellations are governed by the operator\'s policy. Most operators offer a refund if cancelled 24–48 hours in advance. Last-minute cancellations are typically non-refundable.',
          'Weather-related cancellations by the operator will usually result in a full refund or the option to reschedule.',
        ])}

        {section('7. eSIM', [
          'eSIM purchases through our partner Yesim are generally non-refundable once the eSIM has been activated or the QR code has been scanned.',
          'If an eSIM fails to work due to a technical issue, contact Yesim support directly at yesim.app. They will assist with troubleshooting or replacement.',
          'Unused, unactivated eSIMs may be eligible for a refund within 14 days of purchase — contact Yesim for their current policy.',
        ])}

        {section('8. Travel Insurance', [
          'We strongly recommend purchasing comprehensive travel insurance for all trips. A good travel insurance policy can cover trip cancellation, medical emergencies, lost luggage and flight delays.',
          'HUUBOI partners with several travel insurance providers. Visit huuboi.com and search for insurance in our travel tools section.',
        ])}

        {section('9. Contact for Assistance', [
          'While HUUBOI cannot process refunds directly, we are happy to help you navigate the process.',
          'Email: hello@huuboi.com\nSubject: Refund Assistance\nPlease include: your booking reference, the provider name, travel dates and a brief description of your issue.',
          'We will respond within 24 hours and do our best to point you in the right direction.',
        ])}

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid rgba(200,169,110,0.15)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/terms" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>Terms & Conditions →</Link>
          <Link href="/privacy-policy" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>Privacy Policy →</Link>
          <Link href="/contact" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>Contact Us →</Link>
          <Link href="/" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.4)', textDecoration: 'none' }}>← Back to Home</Link>
        </div>

      </div>
    </div>
  )
}
