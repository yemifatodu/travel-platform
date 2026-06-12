'use client';

import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  gradient: string;
}

interface RelatedArticlesProps {
  articles: BlogPost[];
  currentSlug: string;
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div style={{ marginTop: 48 }}>
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        color: '#C8A96E',
        marginBottom: 20,
        paddingBottom: 12,
        borderBottom: '1px solid rgba(200,169,110,0.1)'
      }}>
        MORE FROM THE JOURNAL
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 2
      }}>
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#111110',
              border: '1px solid rgba(200,169,110,0.1)',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
              height: '100%',
            }}>
              <div style={{ height: 80, background: article.gradient }} />
              <div style={{ padding: '16px 18px 20px' }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#C8A96E', marginBottom: 6 }}>
                  {article.category}
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: '#F5EFE4', lineHeight: 1.3 }}>
                  {article.title}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}