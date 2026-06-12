import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import ArticleCTA from '@/components/blog/ArticleCTA';
import RelatedArticles from '@/components/blog/RelatedArticles';
import DefaultCTAs from '@/components/blog/DefaultCTAs';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found | HUUBOI' };
  return {
    title: `${post.title} | HUUBOI Travel Journal`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const gold = '#C8A96E';
  const cream = '#F5EFE4';
  const muted = 'rgba(245,239,228,0.60)';
  const dim = 'rgba(245,239,228,0.35)';

  const post = getPostBySlug(params.slug);
  const relatedPosts = getRelatedPosts(params.slug, 3);

  if (!post) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HUUBOI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.huuboi.com/android-chrome-512x512.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 80 }}>
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

        <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: cream, marginTop: 32, marginBottom: 16 }}>{children}</h1>,
                h2: ({ children }) => <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.82rem', letterSpacing: '0.25em', color: gold, marginTop: 32, paddingBottom: 12, borderBottom: `1px solid rgba(200,169,110,0.15)` }}>{children}</h2>,
                p: ({ children }) => <p style={{ color: muted, lineHeight: 1.9, fontSize: '0.97rem', marginBottom: 20 }}>{children}</p>,
                blockquote: ({ children }) => (
                  <div style={{ background: 'rgba(200,169,110,0.06)', border: `1px solid rgba(200,169,110,0.2)`, padding: '20px 24px', margin: '24px 0' }}>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 8 }}>✦ HUUBOI VERDICT</div>
                    <p style={{ color: muted, fontSize: '0.92rem', lineHeight: 1.8, margin: 0 }}>{children}</p>
                  </div>
                ),
                ul: ({ children }) => <ul style={{ color: muted, lineHeight: 1.8, marginBottom: 20, paddingLeft: 24 }}>{children}</ul>,
                li: ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>,
                a: ({ href, children }) => {
                  const isInternal = href?.startsWith('/');
                  if (isInternal && href) {
                    return <Link href={href} style={{ color: gold, textDecoration: 'underline' }}>{children}</Link>;
                  }
                  return <a href={href} style={{ color: gold, textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">{children}</a>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {post.category === 'Travel Tips' && <ArticleCTA type="esim" />}
          {post.category === 'Destination Guide' && <ArticleCTA type="hotels" />}
          {post.category === 'Adventure' && <ArticleCTA type="tours" />}
          {post.category === 'Wellness' && <ArticleCTA type="aiPlanner" />}
          {post.category === 'Safari' && <ArticleCTA type="tours" />}
          {post.category === 'Culture' && <ArticleCTA type="hotels" />}
          
          <DefaultCTAs />
          <RelatedArticles articles={relatedPosts} currentSlug={post.slug} />

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(200,169,110,0.1)' }}>
            <Link href="/blog" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: gold, textDecoration: 'none' }}>← BACK TO THE JOURNAL</Link>
          </div>
        </div>
      </div>
    </>
  );
}