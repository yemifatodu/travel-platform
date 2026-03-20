import Link from 'next/link'
import { posts } from '../page'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug)
  return {
    title: post ? `${post.title} | HUUBOI Journal` : 'Blog | HUUBOI',
    description: post?.excerpt || '',
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const gold = '#C8A96E'
  const cream = '#F5EFE4'
  const muted = 'rgba(245,239,228,0.60)'
  const dim = 'rgba(245,239,228,0.35)'

  const post = posts.find(p => p.slug === params.slug)
  const related = posts.filter(p => p.slug !== params.slug).slice(0, 3)

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 120, textAlign: 'center', padding: '120px 24px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem', fontWeight: 300, color: cream, marginBottom: 24 }}>Article not found</h1>
        <Link href="/blog" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>← BACK TO JOURNAL</Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 80 }}>

      {/* Hero banner */}
      <div style={{ background: post.gradient, minHeight: 320, position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,1) 0%,rgba(8,8,7,0.5) 50%,transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', width: '100%', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>
          <Link href="/blog" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.5)', textDecoration: 'none', display: 'inline-block', marginBottom: 24 }}>← THE JOURNAL</Link>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', background: 'rgba(200,169,110,0.2)', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '4px 12px' }}>{post.category}</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim }}>{post.date}</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.12em', color: dim }}>{post.readTime} read</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 16 }}>{post.title}</h1>
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.7, maxWidth: 560 }}>{post.excerpt}</p>
          <div style={{ marginTop: 20, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: dim }}>BY {post.author.toUpperCase()}</div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {post.content.map((block, i) => {
            if (block.type === 'intro') return (
              <p key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.5vw,1.3rem)', color: cream, lineHeight: 1.8, fontStyle: 'italic', borderLeft: `3px solid ${gold}`, paddingLeft: 24 }}>
                {block.text}
              </p>
            )
            if (block.type === 'heading') return (
              <h2 key={i} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.82rem', letterSpacing: '0.25em', color: gold, marginTop: 16, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.15)' }}>
                {block.text}
              </h2>
            )
            if (block.type === 'tip') return (
              <div key={i} style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '20px 24px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 8 }}>✦ HUUBOI VERDICT</div>
                <p style={{ color: muted, fontSize: '0.92rem', lineHeight: 1.8, margin: 0 }}>{block.text}</p>
              </div>
            )
            return (
              <p key={i} style={{ color: muted, lineHeight: 1.9, fontSize: '0.97rem' }}>{block.text}</p>
            )
          })}
        </div>

        {/* eSIM strip */}
        <div style={{ marginTop: 56, background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 TRAVELLING SOON?</div>
            <p style={{ color: muted, fontSize: '0.88rem', margin: 0 }}>Get a travel eSIM — instant data in 150+ countries, no roaming fees</p>
          </div>
          <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '12px 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}>GET ESIM →</Link>
        </div>

        {/* Booking CTAs */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 8 }}>
          <a href="https://www.aviasales.com/?marker=710879&locale=en" target="_blank" rel="noopener noreferrer"
            style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.25)', color: gold, padding: '14px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            ✈ SEARCH FLIGHTS
          </a>
          <a href="https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p" target="_blank" rel="noopener noreferrer"
            style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.25)', color: gold, padding: '14px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            🏨 SEARCH HOTELS
          </a>
          <Link href="/budget-calculator"
            style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.25)', color: gold, padding: '14px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            💰 BUDGET CALC
          </Link>
          <Link href="/ai-planner"
            style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.25)', color: gold, padding: '14px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            🤖 AI PLANNER
          </Link>
        </div>

        {/* Related articles */}
        <div style={{ marginTop: 64 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>MORE FROM THE JOURNAL</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 2 }}>
            {related.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                  <div style={{ height: 80, background: p.gradient }} />
                  <div style={{ padding: '16px 18px 20px' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: gold, marginBottom: 6 }}>{p.category}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream, lineHeight: 1.3 }}>{p.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(200,169,110,0.1)' }}>
          <Link href="/blog" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>← BACK TO THE JOURNAL</Link>
        </div>
      </div>
    </div>
  )
}

