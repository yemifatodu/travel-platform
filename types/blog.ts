// types/blog.ts
import { siteLinks } from '@/config/links';

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  gradient: string;
  content: string;
  relatedLinks?: {
    esim?: boolean;
    flights?: boolean;
    hotels?: boolean;
    tours?: boolean;
    carRentals?: boolean;
    aiPlanner?: boolean;
    budgetCalculator?: boolean;
  };
}

// CTA Link type using the central config
export interface CTALink {
  title: string;
  url: string;
  icon: string;
  description: string;
}

// Helper to get CTA from central config
export function getCTALink(type: keyof typeof siteLinks): CTALink | null {
  const link = siteLinks[type];
  if (link && 'description' in link) {
    return {
      title: link.title,
      url: link.url,
      icon: link.icon,
      description: link.description,
    };
  }
  return null;
}