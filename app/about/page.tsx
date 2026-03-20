import Link from 'next/link'

export const metadata = {
  title: 'About Us | HUUBOI',
  description: 'HUUBOI is a global travel platform bringing together flights, hotels, tours, eSIMs and expert destination guides across six continents.',
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
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            OUR STORY
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 32 }}>
            One Platform.<br />
            <em style={{ color: gold }}>Every Destination.</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(1rem,2vw,1.2rem)', maxWidth: 620, lineHeight: 1.85 }}>
            HUUBOI was built for travellers who value their time. We bring together flights, hotels, tours, eSIMs and expert travel guides from across six continents — so you stop searching and start discovering.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>THE PROBLEM WE SOLVED</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: cream, lineHeight: 1.05, marginBottom: 24 }}>
              Most travel platforms<br />make you <em style={{ color: gold }}>work</em>.
            </h2>
            <p style={{ color: muted, fontSize: '0.97rem', lineHeight: 1.85, marginBottom: 20 }}>
              Twelve open tabs. Four comparison sites. Contradictory reviews. And still no certainty you made the right call. You spend hours researching and still leave wondering if there was something better.
            </p>
            <p style={{ color: muted, fontSize: '0.97rem', lineHeight: 1.85 }}>
              HUUBOI was built to end that frustration. One platform with everything you need — flights, hotels, tours, transfers, eSIMs, visa guides, destination intelligence and expert recommendations — all in one place, curated by people who have actually been there.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[
              { num: '194+', label: 'Destinations' },
              { num: '6', label: 'Continents' },
              { num: '50K+', label: 'Travellers' },
              { num: '2,400+', label: 'Packages' },
            ].map(s => (
              <div key={s.num} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,40px)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: gold, lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: dim }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What we offer */}
        <div style={{ marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 16 }}>WHAT WE OFFER</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: cream }}>
              Everything You Need to <em style={{ color: gold }}>Travel Better</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 2 }}>
            {[
              { icon: '✈', title: 'Flights', body: 'Search and compare flights across 1,200+ airlines through our Travelpayouts integration. Best prices, flexible dates, one search.' },
              { icon: '🏨', title: 'Hotels & Stays', body: 'From boutique guesthouses to seven-star resorts — 28 million+ properties worldwide through Expedia, Booking.com and more.' },
              { icon: '🎯', title: 'Tours & Experiences', body: 'Over 300,000 guided tours, activities and experiences through GetYourGuide, Viator and WeGoTrip. Book with confidence.' },
              { icon: '📱', title: 'Travel eSIMs', body: 'Instant data in 150+ countries. No roaming fees, no plastic SIM cards. Get connected before you land at huuboi.com/esim.' },
              { icon: '🛂', title: 'Visa Intelligence', body: 'Entry requirements, visa types, costs, processing times and vaccination rules for 75+ countries — all in one place.' },
              { icon: '🧭', title: 'Destination Guides', body: 'Deep, expert-written guides for Africa, Middle East, Asia, Europe, the Americas and the Pacific. Real information, not AI fluff.' },
              { icon: '🤖', title: 'AI Trip Planner', body: 'Tell us your destination, budget and travel style. Our AI builds a personalised day-by-day itinerary in seconds.' },
              { icon: '💰', title: 'Budget Calculator', body: 'Realistic daily budget estimates for every major destination — accommodation, food, transport, activities and more.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', color: gold, marginBottom: 10 }}>{item.title}</div>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(32px,5vw,60px)', marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(32px,5vw,60px)', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>THE FOUNDER</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 20 }}>
                Yemi Fatodu
              </h2>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: gold, marginBottom: 20 }}>
                FOUNDER · LAGOS, NIGERIA
              </div>
              <p style={{ color: muted, fontSize: '0.95rem', lineHeight: 1.85, marginBottom: 16 }}>
                HUUBOI was founded by Yemi Fatodu, a Data Scientist and entrepreneur based in Lagos, Nigeria — with a vision to make extraordinary travel accessible, intelligent and effortless for every traveller regardless of where they are starting from.
              </p>
              <p style={{ color: muted, fontSize: '0.95rem', lineHeight: 1.85 }}>
                Built on the belief that the best travel decisions come from the best information — HUUBOI combines cutting-edge technology with genuine destination expertise to give travellers everything they need in one place.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'MISSION', value: 'Make extraordinary travel accessible to every traveller on earth.' },
                { label: 'VISION', value: 'The world\'s most trusted one-stop travel platform — six continents, one login.' },
                { label: 'VALUES', value: 'Honesty, expertise, accessibility and a genuine love of the world.' },
              ].map(item => (
                <div key={item.label} style={{ background: '#1C1B18', padding: '20px 22px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>{item.label}</div>
                  <p style={{ color: muted, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners */}
        <div style={{ marginBottom: 'clamp(60px,8vw,100px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>OUR PARTNERS</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: cream }}>
              Powered by the <em style={{ color: gold }}>World's Best</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 2 }}>
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
              <div key={p.name} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream, fontWeight: 600, marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', color: dim }}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(36px,5vw,64px)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 16 }}>START YOUR JOURNEY</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 20 }}>
            The World is <em style={{ color: gold }}>Waiting</em>
          </h2>
          <p style={{ color: muted, fontSize: '0.97rem', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 36px' }}>
            194 destinations. Six continents. One platform. Everything you need to travel better starts here.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              EXPLORE DESTINATIONS
            </Link>
            <Link href="/contact" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              GET IN TOUCH
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
