import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return { title: `${params.slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())} — Travel Blog` }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 120 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 60px' }}>
        <Link href="/blog" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}>← BACK TO BLOG</Link>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#C8A96E', marginBottom: 20 }}>TRAVEL STORY</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1.15, marginBottom: 24 }}>{title}</h1>
        <p style={{ color: 'rgba(245,239,228,0.4)', fontSize: '0.8rem', marginBottom: 60, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}>BY EDITORIAL TEAM · 5 MIN READ</p>
        <div style={{ border: '1px solid rgba(200,169,110,0.15)', padding: 40, background: '#1C1B18' }}>
          <p style={{ color: 'rgba(245,239,228,0.5)', lineHeight: 1.8 }}>This blog post will be populated from your Supabase <code style={{ color: '#C8A96E' }}>blog_posts</code> table. Connect your CMS or write content directly in the database.</p>
        </div>
      </div>
    </div>
  )
}
