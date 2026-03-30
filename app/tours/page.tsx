'use client'
import Link from 'next/link'
import Script from 'next/script'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const featured = [
  {
    title: 'Serengeti Great Migration Safari',
    location: 'Tanzania, Africa',
    duration: '7 days',
    from: '$3,200',
    rating: '4.9',
    reviews: '2,847',
    category: 'Safari',
    gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)',
    link: 'https://www.getyourguide.com/serengeti-l1097/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Petra by Night & Full Day Tour',
    location: 'Jordan, Middle East',
    duration: '2 days',
    from: '$180',
    rating: '4.8',
    reviews: '1,203',
    category: 'History',
    gradient: 'linear-gradient(160deg,#200800,#381200,#4a1800)',
    link: 'https://www.getyourguide.com/petra-l966/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Cappadocia Hot Air Balloon at Sunrise',
    location: 'Turkey, Middle East',
    duration: '1 day',
    from: '$220',
    rating: '4.9',
    reviews: '5,621',
    category: 'Balloon',
    gradient: 'linear-gradient(160deg,#1e0800,#301400,#422000)',
    link: 'https://www.getyourguide.com/cappadocia-l4498/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Bali Temple & Rice Terrace Day Tour',
    location: 'Bali, Indonesia',
    duration: '1 day',
    from: '$45',
    rating: '4.8',
    reviews: '8,934',
    category: 'Culture',
    gradient: 'linear-gradient(160deg,#001a08,#002d10,#00401a)',
    link: 'https://www.getyourguide.com/bali-l97/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Machu Picchu Guided Tour & Train',
    location: 'Peru, Americas',
    duration: '2 days',
    from: '$380',
    rating: '4.9',
    reviews: '3,412',
    category: 'History',
    gradient: 'linear-gradient(160deg,#060e00,#0c1c00,#122600)',
    link: 'https://www.getyourguide.com/machu-picchu-l762/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Maldives Snorkelling & Dolphin Cruise',
    location: 'Maldives, Asia',
    duration: '1 day',
    from: '$95',
    rating: '4.9',
    reviews: '1,876',
    category: 'Water Sports',
    gradient: 'linear-gradient(160deg,#001828,#002440,#003058)',
    link: 'https://www.getyourguide.com/maldives-l973/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Eiffel Tower Skip-the-Line Summit Tour',
    location: 'Paris, France',
    duration: '2 hours',
    from: '$65',
    rating: '4.7',
    reviews: '12,445',
    category: 'City Tour',
    gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)',
    link: 'https://www.getyourguide.com/paris-l16/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Dubai Desert Safari with BBQ Dinner',
    location: 'Dubai, UAE',
    duration: '6 hours',
    from: '$75',
    rating: '4.8',
    reviews: '9,201',
    category: 'Adventure',
    gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)',
    link: 'https://www.getyourguide.com/dubai-l173/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Galápagos Island Hopping Expedition',
    location: 'Ecuador, Americas',
    duration: '8 days',
    from: '$2,800',
    rating: '5.0',
    reviews: '432',
    category: 'Wildlife',
    gradient: 'linear-gradient(160deg,#001a14,#002822,#003430)',
    link: 'https://www.getyourguide.com/galapagos-islands-l762/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Northern Lights Hunting — Iceland',
    location: 'Reykjavik, Iceland',
    duration: '4 hours',
    from: '$95',
    rating: '4.7',
    reviews: '6,789',
    category: 'Nature',
    gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)',
    link: 'https://www.getyourguide.com/reykjavik-l30/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Gorilla Trekking — Rwanda Volcanoes',
    location: 'Rwanda, Africa',
    duration: '1 day',
    from: '$1,500',
    rating: '5.0',
    reviews: '876',
    category: 'Wildlife',
    gradient: 'linear-gradient(160deg,#001800,#002800,#003800)',
    link: 'https://www.getyourguide.com/rwanda-l1050/?partner_id=ZE8RKTS8',
  },
  {
    title: 'Tokyo Street Food Night Walk',
    location: 'Tokyo, Japan',
    duration: '3 hours',
    from: '$55',
    rating: '4.9',
    reviews: '4,123',
    category: 'Food',
    gradient: 'linear-gradient(160deg,#10001a,#1c0030,#280042)',
    link: 'https://www.getyourguide.com/tokyo-l184/?partner_id=ZE8RKTS8',
  },
]

const partners = [
  { name: 'GetYourGuide', desc: '300,000+ experiences in 170 countries. Free cancellation on most activities.' },
  { name: 'Viator', desc: '400,000+ tours and activities. Book with confidence — instant confirmation.' },
  { name: 'WeGoTrip', desc: 'Audio guides and self-guided tours. Explore at your own pace.' },
]

export default function ToursPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080a08,#0a080a,#080a10)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            TOURS & EXPERIENCES
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Experiences<br /><em style={{ color: gold }}>Worth Having</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 48 }}>
            300,000+ guided tours, safaris, diving trips, cooking classes and unforgettable experiences across every continent. Book instantly with free cancellation on most activities.
          </p>

          {/* SCRIPT 1: Replaced Destination Input Search with Script */}
          <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(16px,3vw,32px)', maxWidth: 860 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 20 }}>SEARCH EXPERIENCES</div>
            <div style={{ minHeight: '80px' }}>
              <Script 
                id="tour-widget-1"
                src="https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&language=en&layout=horizontal&cards=4&powered_by=true&campaign_id=89&promo_id=3947" 
                strategy="afterInteractive"
                charSet="utf-8"
              />
            </div>
            <p style={{ color: dim, fontSize: '0.75rem', marginTop: 12, fontFamily: "'DM Sans',sans-serif" }}>
              Powered by GetYourGuide · 300,000+ experiences · Free cancellation on most bookings
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* SCRIPT 2: Placed where Categories used to live */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,40px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, textAlign: 'center' }}>BROWSE POPULAR ACTIVITES</div>
          <div style={{ minHeight: '120px' }}>
            <Script 
              id="tour-widget-2"
              src="https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&locale=260932&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497" 
              strategy="afterInteractive"
              charSet="utf-8"
            />
          </div>
        </div>

        {/* Featured experiences */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>HANDPICKED FOR YOU</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream }}>
                Featured <em style={{ color: gold }}>Experiences</em>
              </h2>
            </div>
            <a href="https://www.getyourguide.com/?partner_id=ZE8RKTS8" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: muted, textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: 3, whiteSpace: 'nowrap' }}>
              VIEW ALL 300,000+ →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 2 }}>
            {featured.map(exp => (
              <a key={exp.title} href={exp.link} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ background: exp.gradient, height: 120, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.7) 0%,transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', background: 'rgba(200,169,110,0.2)', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '3px 10px' }}>{exp.category}</span>
                  </div>
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: cream, fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>{exp.title}</h3>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginBottom: 14 }}>{exp.location}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 2 }}>DURATION</div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', color: muted }}>{exp.duration}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 2 }}>RATING</div>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.1em', color: gold }}>★ {exp.rating} ({exp.reviews})</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 2 }}>FROM</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: gold, fontWeight: 600 }}>{exp.from}</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SCRIPT 3: Positioned above Booking Partners */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,40px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, textAlign: 'center' }}>EXPLORE MORE TOURS</div>
          <div style={{ minHeight: '100px' }}>
            <Script 
              id="tour-widget-3"
              src="https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&product=&language=en&layout=horizontal&powered_by=true&campaign_id=89&promo_id=3948" 
              strategy="afterInteractive"
              charSet="utf-8"
            />
          </div>
        </div>

        {/* Partners */}
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(28px,4vw,48px)', marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 28 }}>OUR BOOKING PARTNERS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 2 }}>
            {partners.map(p => (
              <div key={p.name} style={{ background: '#1C1B18', padding: '22px 22px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', color: gold, marginBottom: 8 }}>{p.name}</div>
                <p style={{ color: muted, fontSize: '0.87rem', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* eSIM */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 TRAVELLING TO YOUR EXPERIENCE?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get a travel eSIM — instant data in 150+ countries, no roaming fees</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', background: gold, color: '#080807', padding: '12px 28px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET ESIM
          </Link>
        </div>

        {/* SCRIPT 4: Placed above footer quick-links */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(20px,3vw,40px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, textAlign: 'center' }}>FIND MORE ATTRACTIONS</div>
          <div style={{ minHeight: '100px' }}>
            <Script 
              id="tour-widget-4"
              src="https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&tours=3&powered_by=true&campaign_id=150&promo_id=4489" 
              strategy="afterInteractive"
              charSet="utf-8"
            />
          </div>
        </div>

        {/* Related */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Africa & Safari', href: '/africa-safari' },
            { label: 'AI Trip Planner', href: '/ai-planner' },
            { label: 'Travel Guides', href: '/travel-guides' },
            { label: 'Visa Requirements', href: '/visa-requirements' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '18px 20px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: gold }}>{link.label} →</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}