import Link from 'next/link'

export const metadata = {
  title: 'About Us | HUUBOI',
  description: 'HUUBOI is a U.S.-positioned global travel platform built to make international travel more accessible, more transparent, and more connected for everyone.',
}

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080807,#0d0c0a,#0a0c10)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 40, height: 1, background: gold, display: 'inline-block' }} />
            ABOUT HUUBOI
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 32 }}>
            The Future of Travel<br />
            <em style={{ color: gold }}>Is One System.</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(1rem,2vw,1.2rem)', maxWidth: 640, lineHeight: 1.85 }}>
            A U.S.-positioned global travel platform built for a new generation of travellers who expect the world to be easier to navigate.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>

        {/* The problem */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,80px)', marginBottom: 'clamp(60px,8vw,100px)', alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>THE PROBLEM WE SOLVE</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: cream, lineHeight: 1.05, marginBottom: 28 }}>
              Planning an international trip today is
              <em style={{ color: gold }}> fragmented, time-consuming, and often uncertain.</em>
            </h2>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 20 }}>
              From comparing flights and hotels across multiple platforms to navigating unclear visa requirements and unreliable recommendations, travelers are forced to piece everything together on their own.
            </p>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, fontWeight: 500 }}>
              Huuboi was built to end that frustration.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {['✈ Flights', '🏨 Accommodations', '🎯 Tours & Experiences', '🚐 Transfers', '📱 eSIM Connectivity', '🛂 Visa Guidance', '🧭 Destination Intelligence'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#111110', border: '1px solid rgba(200,169,110,0.08)', padding: '14px 20px' }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: muted }}>{item}</span>
              </div>
            ))}
            <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '14px 20px', textAlign: 'center' }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold }}>ALL IN ONE PLACE</span>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(36px,5vw,64px)', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 24, textAlign: 'center' }}>OUR MISSION</div>
            <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.4rem,3vw,2.2rem)', fontWeight: 300, color: cream, lineHeight: 1.6, textAlign: 'center', margin: 0, fontStyle: 'italic' }}>
              "We bring everything you need for global travel into one seamless platform — no more switching between platforms, no more guesswork. Just clear, reliable access to the information and tools you need to move confidently across borders."
            </blockquote>
          </div>
        </div>

        {/* More than convenience */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,80px)', marginBottom: 'clamp(60px,8vw,100px)', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>MORE THAN CONVENIENCE</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 24 }}>
              Digital infrastructure for<br /><em style={{ color: gold }}>modern, borderless travel</em>
            </h2>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 20 }}>
              We are building the digital infrastructure for modern, borderless travel — designed to simplify how people plan, access, and experience the world. By integrating travel services with real-time insights and structured data, we reduce friction in global mobility and empower travelers to make better, faster decisions.
            </p>
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9 }}>
              Every recommendation on Huuboi is shaped by real travel experience, curated insights, and a commitment to clarity over noise. We don't just aggregate options — we help you choose the right ones.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[
              { num: '194+', label: 'Destinations' },
              { num: '6', label: 'Continents' },
              { num: '50K+', label: 'Travellers' },
              { num: '1', label: 'Platform' },
            ].map(s => (
              <div key={s.num} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,40px)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: gold, lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: dim }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(36px,5vw,64px)', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(32px,5vw,60px)', alignItems: 'center' }}>

            {/* Photo */}
            <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', border: '1px solid rgba(200,169,110,0.2)' }}>
                <img
                  src="/founder.jpg"
                  alt="Yemi Fatodu — Founder of HUUBOI"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                />
              </div>
              {/* Gold accent line */}
              <div style={{ position: 'absolute', bottom: -12, left: -12, width: 80, height: 80, borderBottom: `2px solid ${gold}`, borderLeft: `2px solid ${gold}` }} />
              <div style={{ position: 'absolute', top: -12, right: -12, width: 80, height: 80, borderTop: `2px solid ${gold}`, borderRight: `2px solid ${gold}` }} />
            </div>

            {/* Bio */}
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>THE FOUNDER</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: cream, lineHeight: 1.05, marginBottom: 8 }}>
                Yemi Fatodu
              </h2>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: gold, marginBottom: 24 }}>
                FOUNDER · HUUBOI.COM
              </div>
              <p style={{ color: muted, fontSize: '0.97rem', lineHeight: 1.9, marginBottom: 16 }}>
                Yemi Fatodu is the founder of Huuboi.com, combining a passion for travel with expertise in data science and business intelligence. With a certification in Applied Data Science from WorldQuant University and an advanced diploma in Database & SQL, Yemi brings hands-on experience in managing complex travel data and building smart, user-centric digital solutions.
              </p>
              <p style={{ color: muted, fontSize: '0.97rem', lineHeight: 1.9, marginBottom: 28 }}>
                His career as a data analyst and business intelligence professional equips him to transform travel planning into seamless, personalized experiences.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://yemifatodu.github.io" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
                  VIEW PORTFOLIO →
                </a>
                <Link href="/request-trip"
                  style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none', display: 'inline-block' }}>
                  PLAN A TRIP
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div style={{ background: 'rgba(200,169,110,0.04)', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(36px,5vw,64px)', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(32px,5vw,60px)', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>OUR POSITION</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 20 }}>
                U.S.-Positioned.<br /><em style={{ color: gold }}>Globally Built.</em>
              </h2>
              <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9, marginBottom: 16 }}>
                As global travel continues to evolve, our mission is simple: to make international travel more accessible, more transparent, and more connected for everyone.
              </p>
              <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.9 }}>
                Huuboi is a U.S.-positioned company with a global outlook, built for a new generation of travelers who expect the world to be easier to navigate.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { icon: '🌍', text: 'Global outlook — six continents covered' },
                { icon: '🇺🇸', text: 'U.S.-positioned for international reach' },
                { icon: '🔍', text: 'Real-time insights and structured data' },
                { icon: '✦', text: 'Curated by real travel experience' },
                { icon: '⚡', text: 'Built for faster, smarter decisions' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', gap: 14, alignItems: 'center', background: '#1C1B18', border: '1px solid rgba(200,169,110,0.08)', padding: '14px 18px' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 24 }}>THE VISION</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 300, color: cream, lineHeight: 1.05, marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
            The future of travel isn't more platforms.<br />
            <em style={{ color: gold }}>It's one system that works.</em>
          </h2>
          <p style={{ color: muted, fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 48px' }}>
            We're building it.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/destinations"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              EXPLORE DESTINATIONS
            </Link>
            <Link href="/request-trip"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              PLAN A TRIP
            </Link>
          </div>
        </div>

        {/* Partners */}
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 24, textAlign: 'center' }}>POWERED BY THE WORLD'S BEST</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 2 }}>
            {[
              { name: 'Travelpayouts', role: 'Flights & Travel Meta' },
              { name: 'Expedia Group', role: 'Hotels & Packages' },
              { name: 'GetYourGuide', role: 'Tours & Experiences' },
              { name: 'Trip.com', role: 'Global Booking' },
              { name: 'Yesim eSIM', role: 'Travel eSIMs' },
              { name: 'VisaHQ', role: 'Visa Services' },
              { name: '12Go Asia', role: 'Transport & Ferries' },
              { name: 'Kiwitaxi', role: 'Airport Transfers' },
            ].map(p => (
              <div key={p.name} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem', color: cream, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.52rem', letterSpacing: '0.1em', color: dim }}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
