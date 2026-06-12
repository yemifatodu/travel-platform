import Link from 'next/link';
import { Metadata } from 'next';

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  gradient: string;
}

const posts: BlogPost[] = [
  {
    slug: 'best-time-to-visit-dubai',
    title: 'Best Time to Visit Dubai: A Complete Seasonal Guide',
    category: 'Destination Guide',
    date: 'March 2025',
    readTime: '8 min',
    author: 'HUUBOI TRAVEL',
    excerpt: 'Dubai is a year-round destination but knowing the best time to visit can transform your experience.',
    gradient: 'linear-gradient(135deg, rgba(200,169,110,0.15) 0%, rgba(200,169,110,0.05) 100%)',
  },
  {
    slug: 'luxury-safari-serengeti',
    title: 'Planning a Luxury Safari in the Serengeti: Everything You Need to Know',
    category: 'Safari',
    date: 'February 2025',
    readTime: '12 min',
    author: 'HUUBOI TRAVEL',
    excerpt: 'From the great migration to luxury tented camps — our complete guide to experiencing the Serengeti in style.',
    gradient: 'linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.03) 100%)',
  },
  {
    slug: 'northern-lights-iceland',
    title: 'Chasing the Northern Lights in Iceland: Insider Tips',
    category: 'Adventure',
    date: 'January 2025',
    readTime: '10 min',
    author: 'HUUBOI TRAVEL',
    excerpt: 'The aurora borealis is unpredictable but not unplannable. Here is how to maximise your chances.',
    gradient: 'linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(200,169,110,0.02) 100%)',
  },
  {
    slug: 'kyoto-hidden-gems',
    title: "Kyoto's Hidden Gems: Beyond the Tourist Trail",
    category: 'Culture',
    date: 'December 2024',
    readTime: '9 min',
    author: 'HUUBOI TRAVEL',
    excerpt: 'Most visitors only see Fushimi Inari and Arashiyama. These are the temples and experiences the guidebooks miss.',
    gradient: 'linear-gradient(135deg, rgba(200,169,110,0.14) 0%, rgba(200,169,110,0.04) 100%)',
  },
  {
    slug: 'bali-wellness-retreat',
    title: 'The Ultimate Bali Wellness Retreat Guide',
    category: 'Wellness',
    date: 'November 2024',
    readTime: '7 min',
    author: 'HUUBOI TRAVEL',
    excerpt: 'From Ubud jungle spas to beachside yoga retreats — Bali is the wellness capital of the world.',
    gradient: 'linear-gradient(135deg, rgba(200,169,110,0.11) 0%, rgba(200,169,110,0.03) 100%)',
  },
  {
    slug: 'patagonia-trekking',
    title: 'Trekking in Patagonia: The W Trek and Beyond',
    category: 'Adventure',
    date: 'October 2024',
    readTime: '15 min',
    author: 'HUUBOI TRAVEL',
    excerpt: 'The W Trek in Torres del Paine is one of the world\'s greatest hikes. Here\'s how to plan it.',
    gradient: 'linear-gradient(135deg, rgba(200,169,110,0.13) 0%, rgba(200,169,110,0.03) 100%)',
  },
];

export const metadata: Metadata = {
  title: 'Travel Journal | HUUBOI',
  description: 'Destination guides, travel tips, and stories from across six continents.',
  keywords: 'travel blog, destination guides, travel tips, luxury travel, adventure travel',
  openGraph: {
    title: 'Travel Journal | HUUBOI',
    description: 'Destination guides, travel tips, and stories from across six continents.',
    type: 'website',
    url: 'https://www.huuboi.com/blog',
    siteName: 'HUUBOI',
  },
};

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080807' }}>
      <div style={{ padding: '80px 24px 60px', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,169,110,0.12) 0%, transparent 70%)', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.3em', fontSize: '0.8rem', color: '#C8A96E', marginBottom: 16 }}>✦ THE JOURNAL ✦</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 20 }}>Stories from the Road</h1>
          <p style={{ fontSize: '1rem', color: 'rgba(245,239,228,0.6)', maxWidth: 560, margin: '0 auto' }}>Destination guides, travel tips, and inspiration from across six continents.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#111110',
                border: '1px solid rgba(200,169,110,0.15)',
                transition: 'all 0.2s',
                overflow: 'hidden',
                height: '100%',
              }}>
                <div style={{ height: 160, background: post.gradient }} />
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', color: '#C8A96E' }}>{post.category}</span>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(245,239,228,0.4)' }}>{post.date} · {post.readTime}</span>
                  </div>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 500, color: '#F5EFE4', marginBottom: 10, lineHeight: 1.4 }}>{post.title}</h2>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(245,239,228,0.6)', lineHeight: 1.5, marginBottom: 16 }}>{post.excerpt}</p>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#C8A96E' }}>READ MORE →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
