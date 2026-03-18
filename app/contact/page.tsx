'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Page() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const gold = '#C8A96E'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'
  const dim = 'rgba(245,239,228,0.35)'

  const inputStyle = {
    width: '100%',
    background: '#111110',
    border: '1px solid rgba(200,169,110,0.2)',
    color: cream,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.93rem',
    padding: '14px 18px',
    outline: 'none',
    marginBottom: 16,
    fontWeight: 300,
  } as React.CSSProperties

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:hello@huuboi.com?subject=${encodeURIComponent(form.subject || 'Contact from huuboi.com')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    setSent(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 100 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px,8vw,100px) clamp(20px,5vw,60px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            GET IN TOUCH
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 24 }}>
            Contact <em style={{ color: gold }}>Us</em>
          </h1>
          <p style={{ color: muted, fontSize: '1rem', maxWidth: 520, lineHeight: 1.85, fontWeight: 300 }}>
            Have a question about a booking, a destination, or our platform? Our team is here to help — reach out and we will get back to you within 24 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48 }}>

          {/* Contact Form */}
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>SEND A MESSAGE</div>

            {sent ? (
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.3)', padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', fontWeight: 300, color: cream, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7 }}>Your email client should have opened. If not, email us directly at hello@huuboi.com</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold, marginBottom: 6 }}>YOUR NAME</div>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="e.g. Yemi Fatodu"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold, marginBottom: 6 }}>EMAIL ADDRESS</div>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold, marginBottom: 6 }}>SUBJECT</div>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="e.g. Question about a booking"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  />
                </div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: gold, marginBottom: 6 }}>MESSAGE</div>
                  <textarea
                    style={{ ...inputStyle, minHeight: 160, resize: 'vertical' }}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: gold, color: '#080807', border: 'none', padding: '16px 40px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', cursor: 'pointer', width: '100%' }}
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>CONTACT DETAILS</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { icon: '✉', label: 'EMAIL', value: 'hello@huuboi.com', link: 'mailto:hello@huuboi.com' },
                { icon: '🌐', label: 'WEBSITE', value: 'www.huuboi.com', link: 'https://www.huuboi.com' },
                { icon: '📍', label: 'LOCATION', value: 'Lagos, Nigeria', link: null },
                { icon: '🕐', label: 'SUPPORT HOURS', value: '24 / 7 — We always respond within 24 hours', link: null },
              ].map(item => (
                <div key={item.label} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: dim, marginBottom: 4 }}>{item.label}</div>
                    {item.link ? (
                      <a href={item.link} style={{ color: gold, fontSize: '0.9rem', textDecoration: 'none' }}>{item.value}</a>
                    ) : (
                      <div style={{ color: muted, fontSize: '0.9rem' }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 24px' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: gold, marginBottom: 12 }}>QUICK LINKS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Help Center & FAQs', href: '/help' },
                  { label: 'Refund & Cancellation Policy', href: '/refund-policy' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms & Conditions', href: '/terms' },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: muted, textDecoration: 'none' }}>
                    → {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}