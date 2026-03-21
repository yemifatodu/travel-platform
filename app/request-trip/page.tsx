'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const tripTypes = [
  { icon: '🦁', label: 'Safari & Wildlife' },
  { icon: '🏖', label: 'Beach & Island' },
  { icon: '🏛', label: 'Culture & History' },
  { icon: '🏔', label: 'Adventure & Trekking' },
  { icon: '🍷', label: 'Food & Wine' },
  { icon: '💑', label: 'Honeymoon & Romance' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family Holiday' },
  { icon: '🎒', label: 'Multi-Country' },
]

const budgetRanges = [
  '$500 – $1,500 per person',
  '$1,500 – $3,000 per person',
  '$3,000 – $5,000 per person',
  '$5,000 – $10,000 per person',
  '$10,000+ per person',
  'Flexible / Discuss with me',
]

const popularDestinations = [
  'Serengeti, Tanzania', 'Dubai, UAE', 'Bali, Indonesia',
  'Santorini, Greece', 'Machu Picchu, Peru', 'Safari Kenya & Rwanda',
  'Maldives', 'Tokyo, Japan', 'Amalfi Coast, Italy',
  'Morocco Multi-City', 'Patagonia, Argentina', 'Custom Destination',
]

export default function RequestTripPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', whatsapp: '',
    destination: '', package_name: '',
    trip_type: '', travel_dates: '', duration: '',
    guests: '', budget: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [customDest, setCustomDest] = useState(false)

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.destination) {
      alert('Please fill in your name, email and destination.')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
        <div style={{ maxWidth: 560, textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 24 }}>✈</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16 }}>ENQUIRY RECEIVED</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 20 }}>
            We will be in touch <em style={{ color: gold }}>within 24 hours</em>
          </h1>
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.8, marginBottom: 16 }}>
            Thank you {form.name}. Your enquiry for <strong style={{ color: cream }}>{form.destination}</strong> has been received. Check your inbox — we have sent you a confirmation email.
          </p>
          <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 40 }}>
            Want a faster response? WhatsApp us directly and we will reply immediately.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/2347033736377?text=Hi%20HUUBOI%2C%20I%20just%20submitted%20a%20trip%20enquiry" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', background: '#25D366', color: '#fff', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>
              💬 WHATSAPP US NOW
            </a>
            <Link href="/destinations"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.35)', color: gold, padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>
              EXPLORE MORE DESTINATIONS
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080807,#0d0c0a,#0a0c10)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(32px,5vw,60px)', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
              BESPOKE TRAVEL PLANNING
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,7vw,5.5rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 24 }}>
              Let Us Plan<br /><em style={{ color: gold }}>Your Perfect Trip</em>
            </h1>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.85, marginBottom: 0 }}>
              Tell us where you want to go and what you dream of doing. We handle everything — flights, hotels, airport transfers, guided tours, restaurant bookings and the return journey.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { icon: '✈', text: 'Flights researched and booked on your behalf' },
              { icon: '🏨', text: 'Hotels handpicked to match your style and budget' },
              { icon: '🚐', text: 'Airport transfers arranged door to door' },
              { icon: '🧭', text: 'Local guides and tours curated for your interests' },
              { icon: '🍽', text: 'Restaurant reservations made in advance' },
              { icon: '📋', text: 'Full day-by-day itinerary delivered before you travel' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#111110', border: '1px solid rgba(200,169,110,0.08)', padding: '14px 18px' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Step 1 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>STEP 1</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: cream, marginBottom: 20 }}>
            What kind of trip are you planning?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 2 }}>
            {tripTypes.map(t => (
              <button key={t.label} onClick={() => set('trip_type', t.label)}
                style={{ background: form.trip_type === t.label ? 'rgba(200,169,110,0.15)' : '#111110', border: `1px solid ${form.trip_type === t.label ? gold : 'rgba(200,169,110,0.1)'}`, padding: '16px 12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em', color: form.trip_type === t.label ? gold : muted, textAlign: 'center' }}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>STEP 2</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: cream, marginBottom: 20 }}>
            Where do you want to go?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 2, marginBottom: 12 }}>
            {popularDestinations.map(dest => (
              <button key={dest}
                onClick={() => { set('destination', dest === 'Custom Destination' ? '' : dest); setCustomDest(dest === 'Custom Destination') }}
                style={{ background: form.destination === dest ? 'rgba(200,169,110,0.15)' : '#111110', border: `1px solid ${form.destination === dest ? gold : 'rgba(200,169,110,0.1)'}`, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: form.destination === dest ? gold : muted }}>{dest}</span>
              </button>
            ))}
          </div>
          {(customDest || (!popularDestinations.includes(form.destination) && form.destination !== '')) && (
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: '12px 18px' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 6 }}>YOUR DESTINATION</div>
              <input value={form.destination} onChange={e => set('destination', e.target.value)}
                placeholder="Type your destination e.g. Cape Town & Kruger, South Africa"
                style={{ background: 'none', border: 'none', color: cream, fontSize: '0.95rem', width: '100%', outline: 'none', fontFamily: "'DM Sans',sans-serif" }} />
            </div>
          )}
        </div>

        {/* Step 3 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>STEP 3</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: cream, marginBottom: 20 }}>
            Trip details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8, marginBottom: 8 }}>
            {[
              { label: 'TRAVEL DATES', placeholder: 'e.g. March 2025 or flexible', field: 'travel_dates' },
              { label: 'DURATION', placeholder: 'e.g. 7 nights, 10 days', field: 'duration' },
              { label: 'NUMBER OF GUESTS', placeholder: 'e.g. 2 adults, 1 child', field: 'guests' },
            ].map(f => (
              <div key={f.field} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: '14px 18px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 6 }}>{f.label}</div>
                <input value={(form as any)[f.field]} onChange={e => set(f.field, e.target.value)}
                  placeholder={f.placeholder}
                  style={{ background: 'none', border: 'none', color: cream, fontSize: '0.9rem', width: '100%', outline: 'none', fontFamily: "'DM Sans',sans-serif" }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: dim, marginBottom: 10 }}>APPROXIMATE BUDGET</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 2 }}>
              {budgetRanges.map(b => (
                <button key={b} onClick={() => set('budget', b)}
                  style={{ background: form.budget === b ? 'rgba(200,169,110,0.15)' : '#111110', border: `1px solid ${form.budget === b ? gold : 'rgba(200,169,110,0.1)'}`, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.08em', color: form.budget === b ? gold : muted }}>{b}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>STEP 4</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: cream, marginBottom: 20 }}>
            Anything else we should know?
          </h2>
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: '16px 18px' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>YOUR MESSAGE (OPTIONAL)</div>
            <textarea value={form.message} onChange={e => set('message', e.target.value)}
              placeholder="Tell us about special requests, dietary requirements, accessibility needs, specific experiences you want included..."
              rows={5}
              style={{ background: 'none', border: 'none', color: cream, fontSize: '0.9rem', width: '100%', outline: 'none', resize: 'vertical', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7 }} />
          </div>
        </div>

        {/* Step 5 */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 8 }}>STEP 5</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: cream, marginBottom: 20 }}>
            How do we reach you?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8 }}>
            {[
              { label: 'FULL NAME *', placeholder: 'Your full name', field: 'name' },
              { label: 'EMAIL ADDRESS *', placeholder: 'your@email.com', field: 'email' },
              { label: 'PHONE NUMBER', placeholder: '+234 800 000 0000', field: 'phone' },
              { label: 'WHATSAPP NUMBER', placeholder: '+234 800 000 0000', field: 'whatsapp' },
            ].map(f => (
              <div key={f.field} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: '14px 18px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.18em', color: gold, marginBottom: 6 }}>{f.label}</div>
                <input value={(form as any)[f.field]} onChange={e => set(f.field, e.target.value)}
                  placeholder={f.placeholder}
                  style={{ background: 'none', border: 'none', color: cream, fontSize: '0.9rem', width: '100%', outline: 'none', fontFamily: "'DM Sans',sans-serif" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div style={{ borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 32 }}>
          {status === 'error' && (
            <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', padding: '14px 18px', marginBottom: 20 }}>
              <p style={{ color: '#f87171', fontSize: '0.88rem', margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
                Something went wrong. Please try again or WhatsApp us directly.
              </p>
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={handleSubmit} disabled={status === 'sending'}
              style={{ background: gold, color: '#080807', border: 'none', padding: '18px 48px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.82rem', letterSpacing: '0.22em', cursor: status === 'sending' ? 'wait' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
              {status === 'sending' ? 'SENDING...' : 'SEND TRIP ENQUIRY →'}
            </button>
            <a href="https://wa.me/2347033736377?text=Hi%20HUUBOI%2C%20I%20would%20like%20to%20plan%20a%20trip" target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', border: 'none', padding: '18px 28px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.18em', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
              💬 WHATSAPP INSTEAD
            </a>
          </div>
          <p style={{ color: dim, fontSize: '0.78rem', marginTop: 14, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>
            We respond to all enquiries within 24 hours. Your details are never shared with third parties.
          </p>
        </div>

      </div>
    </div>
  )
}
