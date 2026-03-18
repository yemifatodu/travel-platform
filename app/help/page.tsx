'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const gold = '#C8A96E'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'

  const faqs = [
    {
      category: 'BOOKINGS',
      items: [
        {
          q: 'How do I book a flight, hotel or package on HUUBOI?',
          a: 'Use the search tabs at the top of the homepage. Enter your details and click the search button — you will be directed to our trusted partner\'s website (such as Expedia, Booking.com or Aviasales) where you can complete your booking securely.',
        },
        {
          q: 'Does HUUBOI process bookings directly?',
          a: 'No. HUUBOI is a travel aggregator platform. We connect you with leading booking partners. All bookings are completed and managed directly on the partner\'s platform. This means your booking confirmation, payment receipt and customer service for that booking all come from the partner.',
        },
        {
          q: 'Is it safe to book through HUUBOI?',
          a: 'Yes. All our booking partners are established, reputable travel companies including Booking.com, Expedia, GetYourGuide and others. We only partner with trusted providers. The booking process happens on their secure, encrypted websites.',
        },
        {
          q: 'Can I book for multiple travellers?',
          a: 'Yes. When you are redirected to our partner\'s booking page, you can specify the number of travellers, room occupancy, and passenger details as required.',
        },
      ],
    },
    {
      category: 'eSIM',
      items: [
        {
          q: 'What is a travel eSIM?',
          a: 'An eSIM is a digital SIM card that you activate on your phone without needing a physical SIM. It lets you get data connectivity in a foreign country at local rates — no roaming charges, no swapping SIM cards.',
        },
        {
          q: 'How do I get an eSIM through HUUBOI?',
          a: 'Go to huuboi.com/esim, search for your destination country, choose a data plan, and click "Get This eSIM". You will be taken to Yesim\'s website to complete the purchase. After payment, you receive a QR code to activate the eSIM on your device.',
        },
        {
          q: 'Which phones support eSIM?',
          a: 'Most modern smartphones support eSIM including iPhone XS and newer, Samsung Galaxy S20 and newer, Google Pixel 3 and newer, and many others. Check your phone settings under "Mobile Data" or "SIM & Network" to confirm.',
        },
        {
          q: 'Can I use an eSIM alongside my regular SIM?',
          a: 'Yes. Most eSIM-compatible phones support dual SIM — you can keep your regular SIM active for calls and texts, and use the travel eSIM for data abroad.',
        },
      ],
    },
    {
      category: 'CANCELLATIONS & REFUNDS',
      items: [
        {
          q: 'How do I cancel a booking?',
          a: 'Since all bookings are made directly with our partners (Booking.com, Expedia etc.), cancellations must be handled directly with them. Check your booking confirmation email for the partner\'s cancellation policy and contact details.',
        },
        {
          q: 'Can I get a refund?',
          a: 'Refund eligibility depends entirely on the cancellation policy of the third-party provider you booked with. Some fares and rates are non-refundable. Please review the partner\'s refund policy before booking. See our full Refund Policy for more details.',
        },
        {
          q: 'What if there is a problem with my booking?',
          a: 'Contact the booking partner directly using the details in your confirmation email. If you need help finding the right contact, email us at hello@huuboi.com and we will do our best to assist.',
        },
      ],
    },
    {
      category: 'ACCOUNT',
      items: [
        {
          q: 'Do I need an account to use HUUBOI?',
          a: 'No. You can search destinations, browse packages and access our eSIM store without an account. Creating an account unlocks the AI Trip Planner, saved trips, and personalised recommendations.',
        },
        {
          q: 'How do I reset my password?',
          a: 'On the Sign In page, click "Forgot password?" and enter your email address. You will receive a password reset link within a few minutes. Check your spam folder if it does not arrive.',
        },
        {
          q: 'How do I delete my account?',
          a: 'Email us at hello@huuboi.com with the subject "Delete My Account" and we will permanently delete your account and associated data within 7 business days.',
        },
      ],
    },
    {
      category: 'AI TRIP PLANNER',
      items: [
        {
          q: 'How does the AI Trip Planner work?',
          a: 'Tell the AI your destination, travel dates, budget, and preferences. It generates a personalised day-by-day itinerary including flight suggestions, hotel recommendations, activities and hidden gems. Registered users with confirmed bookings get unlimited access.',
        },
        {
          q: 'Is the AI itinerary guaranteed to be accurate?',
          a: 'The AI planner is a helpful starting point, not a guaranteed quote. Always verify prices, availability, visa requirements and travel advisories through official channels before travelling.',
        },
        {
          q: 'Why am I limited to 10 AI prompts?',
          a: 'Unregistered and registered users without bookings receive 10 free AI prompts. Once you have a confirmed booking through HUUBOI, you unlock unlimited AI planning. This helps us keep the service free for genuine travellers.',
        },
      ],
    },
  ]

  let faqIndex = 0

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 100 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,100px) clamp(20px,5vw,60px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            SUPPORT
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 24 }}>
            Help <em style={{ color: gold }}>Center</em>
          </h1>
          <p style={{ color: muted, fontSize: '1rem', maxWidth: 520, lineHeight: 1.85, fontWeight: 300 }}>
            Find answers to common questions, or reach out to us directly at{' '}
            <a href="mailto:hello@huuboi.com" style={{ color: gold, textDecoration: 'none' }}>hello@huuboi.com</a>
          </p>
        </div>

        {/* Quick contact strip */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 64 }}>
          <div style={{ color: muted, fontSize: '0.88rem' }}>Can&apos;t find your answer? We respond within 24 hours.</div>
          <Link href="/contact" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
            CONTACT US
          </Link>
        </div>

        {/* FAQs */}
        {faqs.map(cat => (
          <div key={cat.category} style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.3em', color: gold, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.15)' }}>
              {cat.category}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cat.items.map(item => {
                const idx = faqIndex++
                const isOpen = openFaq === idx
                return (
                  <div key={idx} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden' }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 16 }}
                    >
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: isOpen ? gold : cream, textAlign: 'left', lineHeight: 1.4 }}>{item.q}</span>
                      <span style={{ color: gold, fontSize: '1.1rem', flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(200,169,110,0.08)' }}>
                        <p style={{ color: muted, fontSize: '0.92rem', lineHeight: 1.85, marginTop: 16 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Still need help */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', textAlign: 'center', marginTop: 24 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>STILL NEED HELP?</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 300, color: cream, marginBottom: 12 }}>We are here for you</h3>
          <p style={{ color: muted, fontSize: '0.9rem', marginBottom: 28, lineHeight: 1.7 }}>Send us an email and our team will get back to you within 24 hours.</p>
          <a href="mailto:hello@huuboi.com" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '14px 36px', textDecoration: 'none', display: 'inline-block' }}>
            EMAIL US
          </a>
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/contact" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>Contact Us →</Link>
          <Link href="/refund-policy" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>Refund Policy →</Link>
          <Link href="/" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.4)', textDecoration: 'none' }}>← Back to Home</Link>
        </div>

      </div>
    </div>
  )
}