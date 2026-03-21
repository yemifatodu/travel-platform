'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const stories = [
  { name: 'Adaeze O.', location: 'Lagos, Nigeria', destination: 'Serengeti, Tanzania', avatar: '🇳🇬', story: 'I never thought I would witness the Great Migration in my lifetime. HUUBOI made it happen in 3 weeks from first enquiry to departure. The tented camp was extraordinary — lions walking past at sunrise.', rating: 5, trip: 'Safari Package' },
  { name: 'James K.', location: 'London, UK', destination: 'Maldives', avatar: '🇬🇧', story: 'Our honeymoon at Soneva Fushi was flawless. Every detail was handled — transfers by seaplane, champagne on arrival, private dining on the sandbank. Worth every penny.', rating: 5, trip: 'Honeymoon Package' },
  { name: 'Fatima A.', location: 'Dubai, UAE', destination: 'Morocco Multi-City', avatar: '🇦🇪', story: 'Marrakech, the Sahara and Fes in 10 days. The riad in Marrakech was stunning and the Sahara overnight camp under the stars was something I will never forget.', rating: 5, trip: 'Morocco Adventure' },
  { name: 'David M.', location: 'Nairobi, Kenya', destination: 'Santorini, Greece', avatar: '🇰🇪', story: 'My wife wanted Santorini for her birthday. HUUBOI found us a cave suite in Oia with caldera views at a price I could not find anywhere else. The sunset lived up to the hype.', rating: 5, trip: 'Europe Break' },
  { name: 'Chisom E.', location: 'Abuja, Nigeria', destination: 'Dubai & Maldives', avatar: '🇳🇬', story: 'Two destinations in one trip — Dubai for shopping and the Maldives for the overwater bungalow I had dreamed about since I was 16. HUUBOI connected it all seamlessly.', rating: 5, trip: 'Combo Package' },
  { name: 'Sarah L.', location: 'Cape Town, South Africa', destination: 'Bali, Indonesia', avatar: '🇿🇦', story: 'Solo trip to Bali and I was nervous. The itinerary was detailed, the hotel in Ubud was perfect, and the private driver made everything so easy. I am already planning my return.', rating: 5, trip: 'Bali Solo Trip' },
]

const travelStyles = [
  { icon: '👑', style: 'Luxury', desc: 'Five-star hotels, private transfers, fine dining and exclusive experiences.' },
  { icon: '🎒', style: 'Adventure', desc: 'Trekking, safaris, diving, climbing and the kind of stories you tell for decades.' },
  { icon: '💑', style: 'Romantic', desc: 'Honeymoons, anniversaries and weekend escapes for two.' },
  { icon: '👨‍👩‍👧‍👦', style: 'Family', desc: 'Child-friendly itineraries, safe destinations and activities everyone enjoys.' },
  { icon: '🧘', style: 'Wellness', desc: 'Retreats, spa journeys, yoga and travel that restores rather than exhausts.' },
  { icon: '🌍', style: 'Cultural', desc: 'History, art, food and the lived experience of the places you visit.' },
]

export default function CommunityPage() {
  const [activeStyle, setActiveStyle] = useState<string | null>(null)

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#080807,#0d0c0a,#080810)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            TRAVELLER COMMUNITY
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 300, color: cream, lineHeight: 0.92, marginBottom: 24 }}>
            Stories from<br /><em style={{ color: gold }}>the Road</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginBottom: 40 }}>
            Real travellers. Real experiences. Every journey planned through HUUBOI is a story worth telling — here are some of them.
          </p>
          <Link href="/request-trip"
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
            START YOUR STORY
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,60px)' }}>

        {/* Travel styles */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>HOW DO YOU TRAVEL?</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 28 }}>
            Find Your <em style={{ color: gold }}>Travel Style</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 2 }}>
            {travelStyles.map(s => (
              <div key={s.style}
                onClick={() => setActiveStyle(activeStyle === s.style ? null : s.style)}
                style={{ background: activeStyle === s.style ? 'rgba(200,169,110,0.1)' : '#111110', border: `1px solid ${activeStyle === s.style ? gold : 'rgba(200,169,110,0.1)'}`, padding: '24px 22px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', color: activeStyle === s.style ? gold : cream, marginBottom: 8 }}>{s.style}</div>
                <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                {activeStyle === s.style && (
                  <Link href={`/request-trip`}
                    onClick={e => e.stopPropagation()}
                    style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '10px 20px', textDecoration: 'none', display: 'inline-block', marginTop: 16 }}>
                    PLAN A {s.style.toUpperCase()} TRIP →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Traveller stories */}
        <div style={{ marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 10 }}>TRAVELLER STORIES</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 36 }}>
            Words from the <em style={{ color: gold }}>Road</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 2 }}>
            {stories.map(story => (
              <div key={story.name} style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '28px 26px' }}>
                <div style={{ color: gold, fontSize: '1rem', marginBottom: 16, letterSpacing: 2 }}>{'★'.repeat(story.rating)}</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'rgba(245,239,228,0.90)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 24 }}>"{story.story}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '1.1rem' }}>{story.avatar}</span>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', color: cream }}>{story.name}</span>
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim }}>{story.location}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginBottom: 2 }}>DESTINATION</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: gold }}>{story.destination}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share your story CTA */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(32px,5vw,56px)', textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 16 }}>READY TO CREATE YOUR STORY?</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 16 }}>
            Your Next Adventure <em style={{ color: gold }}>Starts Here</em>
          </h2>
          <p style={{ color: muted, fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 32px' }}>
            Join thousands of travellers who trusted HUUBOI to plan their dream trip. Tell us where you want to go — we handle everything else.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-trip"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              PLAN MY TRIP
            </Link>
            <a href="https://wa.me/2347033736377?text=Hi%20HUUBOI%2C%20I%20would%20like%20to%20plan%20a%20trip"
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: '#25D366', color: '#fff', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              💬 WHATSAPP US
            </a>
          </div>
        </div>

        {/* Related */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Request a Trip', href: '/request-trip' },
            { label: 'Travel Guides', href: '/travel-guides' },
            { label: 'Deals', href: '/deals' },
            { label: 'AI Trip Planner', href: '/ai-planner' },
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
