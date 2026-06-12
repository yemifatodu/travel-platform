import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.huuboi.com';
  
  // Static pages
  const staticPages = [
    '',
    '/blog',
    '/esim',
    '/hotels',
    '/flights',
    '/car-rentals',
    '/destinations',
    '/travel-guides',
    '/ai-planner',
    '/budget-calculator',
    '/visa-requirements',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic blog posts
  const posts = getAllPosts();
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
