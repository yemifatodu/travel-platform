'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const StarFilledIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill={gold} stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 9.5 8.5 3 9.5l5 4.5-1.5 6.5L12 17l5.5 3.5-1.5-6.5 5-4.5-6.5-1z"/></svg>
)

const SearchIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
)

const allHotels = [
  { name: 'Four Seasons Safari Lodge', location: 'Serengeti, Tanzania', type: 'Safari Lodge', stars: 5, from: '$1,200/night', highlight: 'Infinity pool overlooking the Serengeti plains', gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)' },
  { name: 'Burj Al Arab Jumeirah', location: 'Dubai, UAE', type: 'Luxury Resort', stars: 7, from: '$1,800/night', highlight: "The world's most iconic hotel — built on its own island", gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)' },
  { name: 'Soneva Fushi', location: 'Maldives', type: 'Overwater Villa', stars: 5, from: '$2,400/night', highlight: 'Private overwater villa with glass floor and direct lagoon access', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Aman Tokyo', location: 'Tokyo, Japan', type: 'Luxury Hotel', stars: 5, from: '$900/night', highlight: 'Minimalist Japanese luxury on the 33rd floor with Mount Fuji views', gradient: 'linear-gradient(160deg,#10001a,#1c0030,#280042)' },
  { name: 'Belmond Copacabana Palace', location: 'Rio de Janeiro, Brazil', type: 'Luxury Hotel', stars: 5, from: '$480/night', highlight: "Rio's legendary beachfront palace overlooking Copacabana", gradient: 'linear-gradient(160deg,#001e14,#003020,#00402a)' },
  { name: 'Katikies Oia', location: 'Santorini, Greece', type: 'Boutique Hotel', stars: 5, from: '$680/night', highlight: 'Carved into the caldera cliff with the most famous sunset view in the world', gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)' },
  { name: 'Singita Sabora Tented Camp', location: 'Serengeti, Tanzania', type: 'Safari Lodge', stars: 5, from: '$1,600/night', highlight: '1920s explorer aesthetic deep in the Grumeti Game Reserve', gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)' },
  { name: 'Le Bristol Paris', location: 'Paris, France', type: 'Palace Hotel', stars: 5, from: '$1,100/night', highlight: "One of Paris's greatest palace hotels on Rue du Favbourg Saint-Honore", gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)' },
  { name: 'Longitude 131', location: 'Uluru, Australia', type: 'Luxury Camp', stars: 5, from: '$1,100/night', highlight: 'Tented luxury camp with direct Uluru views and Milky Way stargazing', gradient: 'linear-gradient(160deg,#2a0a00,#401200,#561a00)' },
  { name: 'The Ritz-Carlton', location: 'Kyoto, Japan', type: 'Luxury Hotel', stars: 5, from: '$850/night', highlight: 'Traditional Japanese aesthetics meets modern luxury in the heart of Kyoto.', gradient: 'linear-gradient(160deg,#1a0a00,#2d1500,#3d2000)' },
  { name: 'Cheval Blanc Randheli', location: 'Maldives', type: 'Overwater Villa', stars: 5, from: '$2,100/night', highlight: 'LVMH-owned luxury with private pools and world-class spa treatments.', gradient: 'linear-gradient(160deg,#001520,#002535,#00354a)' },
  { name: 'Giraffe Manor', location: 'Nairobi, Kenya', type: 'Boutique Hotel', stars: 5, from: '$950/night', highlight: 'Breakfast with resident Rothschild giraffes in this iconic colonial-era manor.', gradient: 'linear-gradient(160deg,#151000,#251c00,#352800)' },
]

const categories = ['All', 'Safari Lodge', 'Luxury Resort', 'Overwater Villa', 'Luxury Hotel', 'Boutique Hotel', 'Palace Hotel', 'Luxury Camp']

export default function AllHotelsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => { setMounted(true) }, [])

  // Scroll Animation Observer
  useEffect(() => {
    if (!mounted) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [mounted])

  const filteredHotels = allHotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || hotel.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .scroll-animate { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .hotel-grid-card { transition: transform 0.3s ease, border-color 0.3s ease; }
        .hotel-grid-card:hover { transform: translateY(-6px); border-color: rgba(200,169,110,0.4) !important; }
        .filter-pill { transition: all 0.2s ease; cursor: pointer; }
        .filter-pill:hover { background: rgba(200,169,110,0.1) !important; }
      `}</style>

      {/* Simple Header */}
      <div style={{ background: 'linear-gradient(160deg,#080a10,#0a080c,#080807)', borderBottom: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link href="/hotels" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            ← BACK TO HOTELS
          </Link>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: cream, lineHeight: 0.95 }}>
            All <em style={{ color: gold }}>Hotels & Stays</em>
          </h1>
          <p style={{ color: muted, fontSize: 'clamp(0.95rem,2vw,1.1rem)', maxWidth: 520, lineHeight: 1.8, marginTop: 16 }}>
            Browse our complete curated collection of the world's most extraordinary accommodations.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,60px) clamp(20px,5vw,60px)' }}>
        
        {/* Search & Filter Bar */}
        <div className="scroll-animate" style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {/* Search Input */}
          <div style={{ position: 'relative', maxWidth: 400 }}>
            <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: gold }}>
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Search by name or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: '#111110', border: '1px solid rgba(200,169,110,0.2)', borderRadius: '6px', padding: '14px 16px 14px 48px', color: cream, fontSize: '0.9rem', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className="filter-pill"
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  fontFamily: "'Bebas Neue',sans-serif", 
                  fontSize: '0.65rem', 
                  letterSpacing: '0.12em', 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? gold : 'rgba(200,169,110,0.2)',
                  background: selectedCategory === cat ? 'rgba(200,169,110,0.15)' : 'transparent',
                  color: selectedCategory === cat ? gold : dim
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filteredHotels.map((hotel, index) => (
            <div key={hotel.name} className="scroll-animate hotel-grid-card" style={{ animationDelay: `${index * 0.05}s`, background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', cursor: 'pointer', borderRadius: '8px' }}
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}> {/* Scrolls to top where widget is */}
              <div style={{ background: hotel.gradient, height: 140, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.8) 0%,transparent 60%)' }} />
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.12em', background: 'rgba(200,169,110,0.2)', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '3px 10px', borderRadius: '4px' }}>{hotel.type}</span>
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[...Array(Math.min(hotel.stars, 5))].map((_, i) => <StarFilledIcon key={i} />)}
                  </div>
                </div>
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: cream, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>{hotel.name}</h3>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: dim, marginBottom: 10 }}>{hotel.location}</div>
                <p style={{ color: muted, fontSize: '0.83rem', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hotel.highlight}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.08)', paddingTop: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.5rem', letterSpacing: '0.12em', color: dim, marginBottom: 2 }}>FROM</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: gold, fontWeight: 600 }}>{hotel.from}</div>
                  </div>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: gold }}>SEARCH →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHotels.length === 0 && (
          <div className="scroll-animate" style={{ textAlign: 'center', padding: '60px 20px', color: dim }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: cream, marginBottom: 8 }}>No hotels found matching your criteria.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: gold, background: 'none', border: '1px solid gold', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', marginTop: 16 }}>
              CLEAR FILTERS
            </button>
          </div>
        )}

      </div>
    </div>
  )
}