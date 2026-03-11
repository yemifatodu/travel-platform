'use client'
import { useState } from 'react'
import Link from 'next/link'

const posts = [
  { slug: 'best-time-visit-dubai', title: 'Best Time to Visit Dubai: A Complete Seasonal Guide', category: 'Destination Guide', date: 'March 2025', readTime: '8 min', excerpt: 'Dubai is a year-round destination but knowing the best time to visit can transform your experience. We break down every season.', gradient: 'linear-gradient(135deg,#1a0e00,#3d2800)' },
  { slug: 'luxury-safari-serengeti', title: 'Planning a Luxury Safari in the Serengeti: Everything You Need to Know', category: 'Safari', date: 'February 2025', readTime: '12 min', excerpt: 'From the great migration to luxury tented camps — our complete guide to experiencing the Serengeti in style.', gradient: 'linear-gradient(135deg,#0a0800,#2a1500)' },
  { slug: 'iceland-northern-lights', title: 'Chasing the Northern Lights in Iceland: Insider Tips', category: 'Adventure', date: 'January 2025', readTime: '10 min', excerpt: 'The aurora borealis is unpredictable but not unplannable. Here is how to maximise your chances of seeing it.', gradient: 'linear-gradient(135deg,#001530,#002050)' },
  { slug: 'kyoto-hidden-gems', title: "Kyoto's Hidden Gems: Beyond the Tourist Trail", category: 'Culture', date: 'December 2024', readTime: '9 min', excerpt: 'Most visitors only see Fushimi Inari and Arashiyama. These are the temples, districts, and experiences the guidebooks miss.', gradient: 'linear-gradient(135deg,#1a0010,#2d0020)' },
  { slug: 'bali-wellness-retreat', title: 'The Ultimate Bali Wellness Retreat Guide', category: 'Wellness', date: 'November 2024', readTime: '7 min', excerpt: 'From Ubud jungle spas to beachside yoga retreats — Bali is the wellness capital of the world for good reason.', gradient: 'linear-gradient(135deg,#0a1500,#1a2800)' },
  { slug: 'patagonia-trekking', title: 'Trekking in Patagonia: The W Trek and Beyond', category: 'Adventure', date: 'October 2024', readTime: '15 min', excerpt: 'The W Trek in Torres del Paine is one of the world\'s great hikes. Here\'s how to plan it — from budget to luxury.', gradient: 'linear-gradient(135deg,#001a20,#002d3d)' },
]

const categories = ['All', 'Destination Guide', 'Adventure', 'Safari', 'Culture', 'Wellness']

export default function BlogPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter)
  const [featured, ...rest] = filtered

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ background: '#0d0c0a', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 16 }}>TRAVEL INTELLIGENCE</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1, marginBottom: 24 }}>
            The <em style={{ color: '#C8A96E', fontStyle: 'italic' }}>Journal</em>
          </h1>
          <p style={{ color: 'rgba(245,239,228,0.55)', maxWidth: 600, lineHeight: 1.8, fontSize: 'clamp(0.9rem,2vw,1.1rem)' }}>
            Destination guides, insider tips, and travel inspiration from our expert team.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '32px clamp(20px,5vw,60px)', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ display: 'flex', gap: 8, maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', padding: '8px 20px', background: filter === cat ? '#C8A96E' : 'transparent', color: filter === cat ? '#080807' : 'rgba(245,239,228,0.5)', border: '1px solid', borderColor: filter === cat ? '#C8A96E' : 'rgba(200,169,110,0.2)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,60px)', maxWidth: 1200, margin: '0 auto' }}>
        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 0, background: '#111110', border: '1px solid rgba(200,169,110,0.15)', overflow: 'hidden' }}>
              <div style={{ height: 'clamp(200px,30vw,360px)', background: featured.gradient, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(8,8,7,0.3))' }} />
                <div style={{ position: 'absolute', top: 24, left: 24 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.5)', padding: '4px 12px' }}>FEATURED</span>
                </div>
              </div>
              <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 16 }}>{featured.category} · {featured.readTime} read</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600, color: '#F5EFE4', lineHeight: 1.2, marginBottom: 16 }}>{featured.title}</h2>
                <p style={{ color: 'rgba(245,239,228,0.55)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 24 }}>{featured.excerpt}</p>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8A96E', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 2, alignSelf: 'flex-start' }}>READ ARTICLE →</span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 24 }}>
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', transition: 'border-color 0.3s' }}>
              <div style={{ height: 180, background: post.gradient, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.6), transparent)' }} />
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 12 }}>{post.category} · {post.readTime} read</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.2rem,2.5vw,1.5rem)', fontWeight: 600, color: '#F5EFE4', lineHeight: 1.3, marginBottom: 12 }}>{post.title}</h3>
                <p style={{ color: 'rgba(245,239,228,0.5)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 20 }}>{post.excerpt}</p>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: 2 }}>READ MORE →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
