import Link from 'next/link'

export const metadata = {
  title: 'About Us | HUUBOI',
  description: 'HUUBOI is a Global travel platform built to make international travel more accessible, more transparent, and more connected for everyone.',
}

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Global CSS for hover effects + Mobile Responsiveness */}
      <style>{`
        .about-service-link {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #111110;
          border: 1px solid rgba(200,169,110,0.08);
          padding: 14px 20px;
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .about-service-link:hover {
          border-color: #C8A96E;
          background: rgba(200,169,110,0.04);
        }
        .about-all-in-one {
          background: rgba(200,169,110,0.06);
          border: 1px solid rgba(200,169,110,0.2);
          padding: 14px 20px;
          text-align: center;
          text-decoration: none;
          display: block;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .about-all-in-one:hover {
          border-color: #C8A96E;
          background: rgba(200,169,110,0.12);
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 900px) {
          /* Stack float sections */
          .float-section > div[style*="float: left"],
          .float-section > div[style*="float: right"] {
            float: none !important;
            width: 100% !important;
            margin-right: 0 !important;
            padding-right: 0 !important;
            margin-bottom: 24px !important;
          }
          
          /* Founder section: stack image above text */
          .founder-section .float-image,
          .founder-section .float-text {
            float: none !important;
            width: 100% !important;
            margin-right: 0 !important;
            margin-bottom: 24px !important;
          }
          
          /* Partners grid: 2 columns on mobile */
          .partners-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          /* Reduce padding on mobile */
          .page-section {
            padding: clamp(32px, 6vw, 64px) clamp(16px, 4vw, 40px) !important;
          }
          
          /* Adjust heading sizes slightly on mobile */
          .section-title {
            font-size: clamp(1.1rem, 3vw, 1.36rem) !important;
          }
        }
        
        @media (max-width: 480px) {
          /* Partners grid: 1 column on very small screens */
          .partners-grid {
            grid-template-columns: 1fr !important;
          }
          
          /* Further reduce padding */
          .page-section {
            padding: 24px 16px !important;
          }
        }
      `}</style>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg,#080807,#0d0c0a,#0a0c10)',
        borderBottom: '1px solid rgba(200,169,110,0.12)',
        padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,60px) clamp(40px,6vw,80px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* 2X bigger ABOUT HUUBOI */}
          <div style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '1.4rem',
            letterSpacing: '0.3em',
            color: gold,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{ width: 60, height: 2, background: gold, display: 'inline-block' }} />
            ABOUT HUUBOI
          </div>
          {/* 80% size for main heading, reduced bottom margin */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(2.4rem,6.4vw,5.6rem)',
            fontWeight: 300,
            color: cream,
            lineHeight: 0.92,
            marginBottom: 16,
          }}>
            The Future of Travel<br />
            <em style={{ color: gold }}>Is One System.</em>
          </h1>
        </div>
      </div>

      <div className="page-section" style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>

        {/* The problem - Float layout + 2X title + SVG icons */}
        <div className="float-section" style={{ marginBottom: 'clamp(60px,8vw,100px)' }}>
          {/* 2X bigger THE PROBLEM WE SOLVE */}
          <div className="section-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.36rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>
            THE PROBLEM WE SOLVE
          </div>
          
          <div style={{ overflow: 'hidden' }}>
            {/* Left side - Text content */}
            <div style={{ float: 'left', width: '55%', paddingRight: 'clamp(32px,5vw,60px)', marginBottom: 'clamp(24px,3vw,40px)' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(2rem,4vw,3.5rem)',
                fontWeight: 300,
                color: cream,
                lineHeight: 1.2,
                marginBottom: 24,
              }}>
                Planning international travel today is
                <em style={{ color: gold }}> fragmented, inconsistent, and overly complex.</em>
              </h2>
              <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 20 }}>
                Travelers are required to navigate multiple platforms just to complete a single journey — searching flights in one place, booking hotels in another, arranging connectivity elsewhere, and relying on scattered sources for travel requirements and recommendations.
              </p>
              <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 20 }}>
                This fragmented system creates unnecessary friction. Pricing varies across platforms, information is often unclear or outdated, and travelers are left to manually stitch together every part of their trip.
              </p>
              <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, fontWeight: 500 }}>
                Huuboi was built to eliminate this fragmentation.
              </p>
            </div>

            {/* Right side - Clickable buttons with SVG icons */}
            <div style={{ float: 'right', width: '42%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { 
                  label: 'Flights', 
                  href: '#',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                },
                { 
                  label: 'Accommodations', 
                  href: '#',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01"/></svg>
                },
                { 
                  label: 'Tours and Experiences', 
                  href: '#',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                },
                { 
                  label: 'Transfers', 
                  href: '#',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 17h14v-4H5v4ZM3 13V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M7 17v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2M15 17v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2"/></svg>
                },
                { 
                  label: 'eSIM Connectivity', 
                  href: '/esim',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
                },
                { 
                  label: 'Visa Guidance', 
                  href: '#',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 4v16"/></svg>
                },
                { 
                  label: 'Destination Intelligence', 
                  href: '#',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12l4-4"/></svg>
                },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="about-service-link">
                  {item.icon}
                  <span style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: muted,
                  }}>
                    {item.label}
                  </span>
                </Link>
              ))}
              <Link href="#" className="about-all-in-one">
                <span style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: gold,
                }}>
                  ALL IN ONE PLACE
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mission - 2X bigger OUR MISSION */}
        <div style={{
          background: '#111110',
          border: '1px solid rgba(200,169,110,0.15)',
          padding: 'clamp(36px,5vw,64px)',
          marginBottom: 'clamp(60px,8vw,100px)',
        }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="section-title" style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: '1.36rem',
              letterSpacing: '0.25em',
              color: gold,
              marginBottom: 24,
              textAlign: 'center',
            }}>
              OUR MISSION
            </div>
            <blockquote style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 'clamp(1.4rem,3vw,2.2rem)',
              fontWeight: 300,
              color: cream,
              lineHeight: 1.6,
              textAlign: 'center',
              margin: 0,
              fontStyle: 'italic',
            }}>
              "We bring everything you need for global travel into one seamless platform, removing the need to switch between multiple services."
            </blockquote>
          </div>
        </div>

        {/* More than convenience - RESTRUCTURED: Stats now appear after heading, before text */}
        <div style={{ marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div className="section-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.36rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>
            MORE THAN CONVENIENCE
          </div>
          
          {/* Stats grid - now appears directly after heading */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: 2, 
            marginBottom: 'clamp(32px,5vw,48px)' 
          }}>
            {[
              { num: '194+', label: 'Destinations' },
              { num: '6', label: 'Continents' },
              { num: '1', label: 'Platform' },
              { num: '24/7', label: 'Support' },
            ].map(s => (
              <div key={s.num} style={{
                background: '#111110',
                border: '1px solid rgba(200,169,110,0.1)',
                padding: 'clamp(24px,3vw,40px)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 'clamp(2rem,4vw,3rem)',
                  fontWeight: 600,
                  color: gold,
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: dim,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Text content - now appears after stats */}
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 'clamp(2rem,4vw,3rem)',
              fontWeight: 300,
              color: cream,
              lineHeight: 1.1,
              marginBottom: 24,
            }}>
              A unified infrastructure for<br /><em style={{ color: gold }}>modern global travel</em>
            </h2>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 20 }}>
              Huuboi is building a single, connected travel ecosystem that brings together everything needed to plan and experience international travel with confidence.
            </p>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 20 }}>
              From flights and hotel bookings to eSIM connectivity, curated travel experiences, and essential trip services, Huuboi centralizes every step of the journey into one seamless platform.
            </p>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 20 }}>
              Beyond convenience, Huuboi is designed as travel infrastructure — powered by curated insights and structured data to help users make faster, clearer, and more confident decisions.
            </p>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9 }}>
              The result is a smarter, more connected way to move across borders — built for a world where travel should feel effortless.
            </p>
          </div>
        </div>

        {/* Founder Section - Float layout + 2X titles + Bold/Italic name */}
        <div className="founder-section" style={{
          background: '#111110',
          border: '1px solid rgba(200,169,110,0.15)',
          padding: 'clamp(36px,5vw,64px)',
          marginBottom: 'clamp(60px,8vw,100px)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            
            {/* Image floated left */}
            <div className="float-image" style={{ float: 'left', maxWidth: 420, width: '42%', marginRight: 'clamp(32px,5vw,60px)', position: 'relative', marginBottom: 'clamp(24px,3vw,40px)' }}>
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                border: '1px solid rgba(200,169,110,0.2)',
              }}>
                <img
                  src="/founder.jpg"
                  alt="Yemi Fatodu — Founder of HUUBOI"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                />
              </div>
              <div style={{ position: 'absolute', bottom: -12, left: -12, width: 80, height: 80, borderBottom: `2px solid ${gold}`, borderLeft: `2px solid ${gold}` }} />
              <div style={{ position: 'absolute', top: -12, right: -12, width: 80, height: 80, borderTop: `2px solid ${gold}`, borderRight: `2px solid ${gold}` }} />
            </div>

            {/* Text content flows under image */}
            <div className="float-text" style={{ color: muted, fontSize: '0.97rem', lineHeight: 1.9 }}>
              {/* 2X bigger THE FOUNDER */}
              <div className="section-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.36rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>
                THE FOUNDER
              </div>
              
              {/* Bold + Italic Name */}
              <h2 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(2rem,4vw,3rem)',
                fontWeight: 600,
                fontStyle: 'italic',
                color: cream,
                lineHeight: 1.05,
                marginBottom: 8,
              }}>
                Opeyemi Ebenezer Fatodu
              </h2>
              
              {/* 2X bigger FOUNDER · HUUBOI.COM */}
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.24rem', letterSpacing: '0.15em', color: gold, marginBottom: 24 }}>
                FOUNDER · HUUBOI.COM
              </div>
              
              <p style={{ marginBottom: 16 }}>
                <strong style={{ color: cream }}>Opeyemi Ebenezer Fatodu</strong> is a Data Scientist, entrepreneur, and technology enthusiast based in Lagos, Nigeria. With a strong foundation in data analytics, business intelligence, machine learning, and digital transformation, he is passionate about leveraging technology to solve real-world problems and create innovative business solutions.
              </p>
              <p style={{ marginBottom: 16 }}>
                Opeyemi has completed extensive training in data science and analytics, including the Applied Data Science program at WorldQuant University, along with numerous certifications in data science, cloud computing, business intelligence, and advanced analytics.
              </p>
              <p style={{ marginBottom: 16 }}>
                As the founder of <strong style={{ color: gold }}>HUUBOI</strong>, Opeyemi is building a next-generation travel technology platform that brings together bookings, eSIM connectivity, and curated travel experiences into a seamless global travel ecosystem.
              </p>
              <p style={{ marginBottom: 28 }}>
                Driven by curiosity, resilience, and a passion for innovation, Opeyemi continues to pursue opportunities that bridge technology and business while empowering others through data-driven insights and digital transformation.
              </p>
              
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="https://yemifatodu.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    border: '1px solid rgba(200,169,110,0.4)',
                    color: gold,
                    padding: '12px 24px',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  VIEW PORTFOLIO
                </a>
                <Link
                  href="/request-trip"
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    background: gold,
                    color: '#080807',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  PLAN A TRIP
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Position - 2X title + SVG bullets + Better font */}
        <div style={{
          background: 'rgba(200,169,110,0.04)',
          border: '1px solid rgba(200,169,110,0.15)',
          padding: 'clamp(36px,5vw,64px)',
          marginBottom: 'clamp(60px,8vw,100px)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: 'clamp(32px,5vw,60px)',
            alignItems: 'center',
          }}>
            <div>
              {/* 2X bigger OUR POSITION */}
              <div className="section-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.36rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>
                OUR POSITION
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 'clamp(1.8rem,3vw,2.8rem)',
                fontWeight: 300,
                color: cream,
                lineHeight: 1.1,
                marginBottom: 20,
              }}>
                U.S.-Positioned.<br /><em style={{ color: gold }}>Globally Built.</em>
              </h2>
              <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 16 }}>
                As global travel continues to evolve, our mission is simple: to make international travel more accessible, more transparent, and more connected for everyone.
              </p>
              <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9 }}>
                Huuboi is a U.S.-positioned company with a global outlook, built for a new generation of travelers who expect the world to be easier to navigate.
              </p>
            </div>
            
            {/* SVG Bullet Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Global outlook — six continents covered',
                'U.S.-positioned for international reach',
                'Real-time insights and structured data',
                'Curated by real travel experience',
                'Built for faster, smarter decisions',
              ].map((text, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  background: '#1C1B18',
                  border: '1px solid rgba(200,169,110,0.08)',
                  padding: '14px 18px',
                }}>
                  {/* SVG Bullet: Gold circle with check */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span style={{ color: cream, fontSize: '0.9rem', lineHeight: 1.5, fontFamily: "'Cormorant Garamond',serif" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Vision - 2X bigger THE VISION */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div className="section-title" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.36rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>
            THE VISION
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(2rem,5vw,4.5rem)',
            fontWeight: 300,
            color: cream,
            lineHeight: 1.05,
            maxWidth: 800,
            margin: '0 auto 24px',
          }}>
            The future of travel is not more platforms.<br />
            <em style={{ color: gold }}>It is one system that works.</em>
          </h2>
          <p style={{ color: muted, fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 48px' }}>
            We are building it.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/destinations"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                background: gold,
                color: '#080807',
                padding: '16px 36px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              EXPLORE DESTINATIONS
            </Link>
            <Link
              href="/request-trip"
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                border: '1px solid rgba(200,169,110,0.4)',
                color: gold,
                padding: '16px 36px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              PLAN A TRIP
            </Link>
          </div>
        </div>

        {/* Partners - Responsive Grid */}
        <div>
          <div className="section-title" style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '0.68rem',
            letterSpacing: '0.25em',
            color: gold,
            marginBottom: 24,
            textAlign: 'center',
          }}>
            POWERED BY THE WORLD'S BEST
          </div>
          <div className="partners-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {[
              { name: 'Travelpayouts', role: 'Flights and Travel Meta' },
              { name: 'Expedia Group', role: 'Hotels and Packages' },
              { name: 'GetYourGuide', role: 'Tours and Experiences' },
              { name: 'Trip.com', role: 'Global Booking' },
              { name: 'Yesim eSIM', role: 'Travel eSIMs' },
              { name: 'VisaHQ', role: 'Visa Services' },
              { name: '12Go Asia', role: 'Transport and Ferries' },
              { name: 'Kiwitaxi', role: 'Airport Transfers' },
            ].map(p => (
              <div key={p.name} style={{
                background: '#111110',
                border: '1px solid rgba(200,169,110,0.1)',
                padding: '18px 20px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: '0.95rem',
                  color: cream,
                  fontWeight: 600,
                  marginBottom: 4,
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: '0.52rem',
                  letterSpacing: '0.1em',
                  color: dim,
                }}>
                  {p.role}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}