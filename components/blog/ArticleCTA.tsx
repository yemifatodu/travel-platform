'use client';

import Link from 'next/link';

interface ArticleCTAProps {
  type: 'esim' | 'flights' | 'hotels' | 'tours' | 'carRentals' | 'aiPlanner' | 'budgetCalculator';
}

const ctaData = {
  esim: { url: '/esim', title: 'Get eSIM', icon: '📱', description: 'Instant data in 200+ countries' },
  flights: { url: '/flights', title: 'Search Flights', icon: '✈️', description: 'Find the best flight deals' },
  hotels: { url: '/hotels', title: 'Book Hotels', icon: '🏨', description: 'Luxury stays worldwide' },
  tours: { url: '/tours', title: 'Tours', icon: '🎒', description: 'Unforgettable experiences' },
  carRentals: { url: '/car-rentals', title: 'Car Rentals', icon: '🚗', description: 'Best rates from top providers' },
  aiPlanner: { url: '/ai-planner', title: 'AI Trip Planner', icon: '🤖', description: 'Plan your perfect itinerary with AI' },
  budgetCalculator: { url: '/budget-calculator', title: 'Budget Calculator', icon: '💰', description: 'Plan your travel budget' },
};

export default function ArticleCTA({ type }: ArticleCTAProps) {
  const cta = ctaData[type];
  if (!cta) return null;

  return (
    <div style={{
      marginTop: 40,
      marginBottom: 40,
      background: '#111110',
      border: '1px solid rgba(200,169,110,0.2)',
      padding: '24px 28px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 40 }}>{cta.icon}</span>
        <div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.65rem', letterSpacing: '0.18em', color: '#C8A96E', marginBottom: 4 }}>
            ✦ RELATED SERVICE ✦
          </div>
          <p style={{ color: 'rgba(245,239,228,0.6)', fontSize: '0.88rem', margin: 0 }}>
            {cta.description}
          </p>
        </div>
      </div>
      <Link
        href={cta.url}
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '0.68rem',
          letterSpacing: '0.15em',
          background: '#C8A96E',
          color: '#080807',
          padding: '12px 24px',
          textDecoration: 'none',
        }}
      >
        {cta.title} →
      </Link>
    </div>
  );
}
