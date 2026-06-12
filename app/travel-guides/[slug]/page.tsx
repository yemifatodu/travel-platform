// app/travel-guides/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guides, gold, cream, muted, dim } from '../guidesData'

// Pre-build all guide pages at deploy time
export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

// Revalidate pages every hour (ISR)
export const revalidate = 3600

// Dynamic meta tags for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug)

  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  return {
    title: `${guide.title} | HUUBOI Travel Guide`,
    description: guide.subtitle,
    openGraph: {
      title: guide.title,
      description: guide.subtitle,
      type: 'article',
    },
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug)

  if (!guide) {
    notFound()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(32px,6vw,80px) clamp(20px,5vw,60px)' }}>
        {/* Back button */}
        <Link
          href="/travel-guides"
          style={{
            background: 'none',
            color: gold,
            textDecoration: 'none',
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            marginBottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          ← ALL GUIDES
        </Link>

        {/* Guide Header */}
        <div
          style={{
            background: guide.gradient,
            padding: 'clamp(32px,5vw,56px)',
            marginBottom: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8,8,7,0.85) 0%, transparent 70%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  background: 'rgba(200,169,110,0.2)',
                  border: '1px solid rgba(200,169,110,0.4)',
                  color: gold,
                  padding: '4px 12px',
                }}
              >
                {guide.region}
              </span>
              <span
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  background: 'rgba(200,169,110,0.1)',
                  border: '1px solid rgba(200,169,110,0.2)',
                  color: muted,
                  padding: '4px 12px',
                }}
              >
                {guide.category}
              </span>
              <span
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  color: dim,
                  padding: '4px 0',
                }}
              >
                {guide.readTime}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(2rem,5vw,3.5rem)',
                fontWeight: 300,
                color: cream,
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              {guide.title}
            </h1>

            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.7, maxWidth: 560 }}>
              {guide.subtitle}
            </p>

            <div
              style={{
                marginTop: 20,
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                color: dim,
              }}
            >
              📍 {guide.destination}
            </div>
          </div>
        </div>

        {/* Guide Content - Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {guide.sections.map((section, i) => (
            <div key={i} style={{ borderLeft: `2px solid rgba(200,169,110,0.2)`, paddingLeft: 24 }}>
              <h2
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '0.25em',
                  color: gold,
                  marginBottom: 14,
                }}
              >
                {section.heading}
              </h2>
              <p style={{ color: muted, lineHeight: 1.9, fontSize: '0.97rem' }}>{section.body}</p>
            </div>
          ))}

          {/* Insider Tips */}
          <div
            style={{
              background: '#111110',
              border: '1px solid rgba(200,169,110,0.15)',
              padding: 'clamp(24px,3vw,36px)',
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: gold,
                marginBottom: 20,
              }}
            >
              ✦ INSIDER TIPS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {guide.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      color: gold,
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      minWidth: 24,
                      marginTop: 2,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* eSIM Call to Action */}
          <div
            style={{
              background: 'rgba(200,169,110,0.06)',
              border: '1px solid rgba(200,169,110,0.2)',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  color: gold,
                  marginBottom: 4,
                }}
              >
                📱 STAY CONNECTED IN {guide.destination.toUpperCase()}
              </div>
              <p style={{ color: muted, fontSize: '0.85rem', margin: 0 }}>
                Get an instant travel eSIM — no roaming fees, activate before you fly
              </p>
            </div>
            <Link
              href="/esim"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                background: gold,
                color: '#080807',
                padding: '11px 24px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              GET ESIM
            </Link>
          </div>

          {/* CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8 }}>
            <a
              href={guide.flightLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: gold,
                color: '#080807',
                padding: '16px',
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block',
              }}
            >
              ✈ SEARCH FLIGHTS
            </a>
            <a
              href={guide.hotelLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                border: '1px solid rgba(200,169,110,0.4)',
                color: gold,
                padding: '16px',
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block',
              }}
            >
              🏨 SEARCH HOTELS
            </a>
            <Link
              href="/budget-calculator"
              style={{
                background: 'transparent',
                border: '1px solid rgba(200,169,110,0.2)',
                color: muted,
                padding: '16px',
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block',
              }}
            >
              💰 BUDGET CALCULATOR
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}