'use client'
import Link from 'next/link'

const destinations = [
  { name: 'Dubai', country: 'UAE', region: 'Middle East', slug: 'dubai', gradient: 'linear-gradient(135deg,#1a0e00,#3d2800,#C8A96E22)' },
  { name: 'Patagonia', country: 'Argentina', region: 'Americas', slug: 'patagonia', gradient: 'linear-gradient(135deg,#001a20,#002d3d,#1a4a5a)' },
  { name: 'Svalbard', country: 'Norway', region: 'Arctic', slug: 'svalbard', gradient: 'linear-gradient(135deg,#00082a,#001040,#002266)' },
  { name: 'Kyoto', country: 'Japan', region: 'Asia', slug: 'kyoto', gradient: 'linear-gradient(135deg,#1a0010,#2d0020,#4a0035)' },
  { name: 'Amalfi Coast', country: 'Italy', region: 'Europe', slug: 'amalfi-coast', gradient: 'linear-gradient(135deg,#001020,#002040,#003366)' },
  { name: 'Serengeti', country: 'Tanzania', region: 'Africa', slug: 'serengeti', gradient: 'linear-gradient(135deg,#0a0800,#1a1400,#2a2000)' },
]

const packages = [
  { name: 'Desert & Dunes', dest: 'Dubai, UAE', duration: '7 nights', price: '$3,200', type: 'Luxury' },
  { name: 'End of the World', dest: 'Patagonia, Argentina', duration: '10 nights', price: '$4,800', type: 'Adventure' },
  { name: 'Northern Lights', dest: 'Svalbard, Norway', duration: '5 nights', price: '$5,500', type: 'Expedition' },
  { name: 'Temple & Blossom', dest: 'Kyoto, Japan', duration: '8 nights', price: '$3,900', type: 'Cultural' },
]

const testimonials = [
  { name: 'Sarah M.', location: 'London, UK', text: 'The Patagonia expedition was flawlessly organised. Every detail was handled — from the remote trekking lodges to the private glacier tours.', rating: 5 },
  { name: 'Ahmed K.', location: 'Dubai, UAE', text: 'A truly luxurious experience. The team understood exactly what I needed — discretion, quality, and unforgettable moments.', rating: 5 },
  { name: 'Yuki T.', location: 'Tokyo, Japan', text: 'Booked the Serengeti package and I\'m still in awe. The great migration was beyond anything I imagined.', rating: 5 },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0a0a08 0%, #12100a 25%, #0d1520 50%, #080c14 75%, #0a0a08 100%)' }} />
        {/* Orbs */}
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)', top: -200, right: '5%', filter: 'blur(60px)', animation: 'float1 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,60,120,0.12) 0%, transparent 70%)', bottom: '10%', left: '0%', filter: 'blur(60px)', animation: 'float2 10s ease-in-out infinite' }} />
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        {/* Overlay gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,1) 0%, rgba(8,8,7,0.4) 50%, transparent 100%)' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 60px 100px', maxWidth: 900 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.75rem', letterSpacing: '0.35em', color: '#C8A96E', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 40, height: 1, background: '#C8A96E', display: 'inline-block' }} />
            LUXURY GLOBAL TRAVEL
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 300, lineHeight: 0.9, color: '#F5EFE4', marginBottom: '32px', letterSpacing: '-0.01em' }}>
            The World<br/>
            <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Awaits</em><br/>
            You
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(245,239,228,0.65)', maxWidth: 480, lineHeight: 1.8, marginBottom: '48px', fontWeight: 300 }}>
            Bespoke journeys crafted for the discerning traveller. Six continents. Infinite stories. One platform.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', background: '#C8A96E', color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s' }}>
              EXPLORE DESTINATIONS
            </Link>
            <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', border: '1px solid rgba(200,169,110,0.5)', color: '#C8A96E', padding: '16px 36px', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s' }}>
              ✦ AI TRIP PLANNER
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, borderTop: '1px solid rgba(200,169,110,0.1)', background: 'rgba(8,8,7,0.8)', backdropFilter: 'blur(8px)', display: 'flex', zIndex: 10 }}>
          {[['190+','Countries Covered'],['50K+','Happy Travellers'],['2,400+','Curated Packages'],['24/7','Expert Support']].map(([num, label]) => (
            <div key={num} style={{ flex: 1, padding: '24px 40px', borderRight: '1px solid rgba(200,169,110,0.1)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: '#C8A96E' }}>{num}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.4)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <section style={{ background: '#0d0c0a', padding: '0 60px', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 0' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 28, borderBottom: '1px solid rgba(200,169,110,0.15)' }}>
            {['✈ Flights','🏨 Hotels','📦 Packages','🎯 Activities','🚗 Car Rentals'].map((tab, i) => (
              <button key={tab} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', padding: '12px 24px', background: 'none', border: 'none', color: i === 0 ? '#C8A96E' : 'rgba(245,239,228,0.4)', borderBottom: i === 0 ? '2px solid #C8A96E' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>{tab}</button>
            ))}
          </div>
          {/* Search Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: 12 }}>
            {[
              { placeholder: 'Flying from?', label: 'FROM' },
              { placeholder: 'Flying to?', label: 'TO' },
              { placeholder: 'Departure', label: 'DATE' },
              { placeholder: 'Travellers', label: 'GUESTS' },
            ].map(field => (
              <div key={field.label} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.15)', padding: '14px 18px' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 6 }}>{field.label}</div>
                <input placeholder={field.placeholder} style={{ background: 'none', border: 'none', color: '#F5EFE4', fontSize: '0.9rem', width: '100%', outline: 'none' }} />
              </div>
            ))}
            <button style={{ background: '#C8A96E', color: '#080807', border: 'none', padding: '0 32px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.85rem', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.3s' }}>SEARCH</button>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section style={{ padding: '120px 60px', background: '#080807' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>SIX CONTINENTS</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1 }}>
                Iconic <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Destinations</em>
              </h2>
            </div>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.5)', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: 4 }}>VIEW ALL →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {destinations.map((dest, i) => (
              <Link key={dest.slug} href={`/destinations/${dest.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', aspectRatio: i < 2 ? '4/3' : '4/5', overflow: 'hidden', background: dest.gradient, gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 1' : undefined }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.9) 0%, rgba(8,8,7,0.2) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 8 }}>{dest.region}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: i === 0 ? '3rem' : '1.8rem', fontWeight: 600, color: '#F5EFE4', lineHeight: 1 }}>{dest.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(245,239,228,0.5)', marginTop: 6 }}>{dest.country}</div>
                </div>
                {/* Subtle pattern */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(200,169,110,0.05) 0%, transparent 60%)' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section style={{ padding: '120px 60px', background: '#0d0c0a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>HANDPICKED FOR YOU</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: '#F5EFE4' }}>
              Featured <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Packages</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {packages.map(pkg => (
              <div key={pkg.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: 32, transition: 'all 0.4s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 20, border: '1px solid rgba(200,169,110,0.3)', display: 'inline-block', padding: '4px 10px' }}>{pkg.type}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, color: '#F5EFE4', marginBottom: 8 }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(245,239,228,0.5)', marginBottom: 4 }}>{pkg.dest}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.35)', marginBottom: 28 }}>{pkg.duration}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(245,239,228,0.35)', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em' }}>FROM</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 600, color: '#C8A96E' }}>{pkg.price}</div>
                  </div>
                  <Link href="/packages" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8A96E', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 2 }}>VIEW →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI TRIP PLANNER PROMO ── */}
      <section style={{ padding: '120px 60px', background: '#080807', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 16 }}>POWERED BY AI</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 24, lineHeight: 1.1 }}>
            Your Perfect Itinerary,<br/><em style={{ color: '#C8A96E' }}>Generated in Seconds</em>
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.6)', lineHeight: 1.8, marginBottom: 48, fontSize: '1rem' }}>
            Tell us where you dream of going, your budget, and how you like to travel. Our AI builds a fully personalised day-by-day itinerary — flights, hotels, activities, and hidden gems included.
          </p>
          <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.85rem', letterSpacing: '0.25em', background: '#C8A96E', color: '#080807', padding: '18px 48px', textDecoration: 'none', display: 'inline-block' }}>
            ✦ TRY THE AI PLANNER — FREE
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '120px 60px', background: '#0d0c0a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>TRAVELLER STORIES</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: '#F5EFE4' }}>
              Words from the <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Road</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: '40px 36px' }}>
                <div style={{ color: '#C8A96E', fontSize: '1.2rem', marginBottom: 24 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: 'rgba(245,239,228,0.85)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 32 }}>"{t.text}"</p>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#F5EFE4' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.4)', marginTop: 4 }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / NEWSLETTER ── */}
      <section id="contact" style={{ padding: '120px 60px', background: '#080807', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 16 }}>STAY INSPIRED</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 16 }}>
            Travel <em style={{ color: '#C8A96E' }}>Intelligence</em> — Delivered
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.5)', marginBottom: 40, fontSize: '0.9rem', lineHeight: 1.7 }}>Exclusive deals, destination guides, and curated travel insights. No spam — only wanderlust.</p>
          <div style={{ display: 'flex', gap: 0 }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.2)', borderRight: 'none', color: '#F5EFE4', padding: '16px 24px', fontSize: '0.875rem', outline: 'none' }} />
            <button style={{ background: '#C8A96E', color: '#080807', border: 'none', padding: '0 28px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', cursor: 'pointer', whiteSpace: 'nowrap' }}>SUBSCRIBE</button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-40px) scale(1.05); } }
        @keyframes float2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(30px); } }
      `}</style>
    </>
  )
}

