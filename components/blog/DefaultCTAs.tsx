'use client';

import Link from 'next/link';

const quickLinks = [
  { url: '/flights', title: 'Flights', icon: '✈️' },
  { url: '/hotels', title: 'Hotels', icon: '🏨' },
  { url: '/esim', title: 'eSIM', icon: '📱' },
  { url: '/tours', title: 'Tours', icon: '🎒' },
  { url: '/car-rentals', title: 'Cars', icon: '🚗' },
  { url: '/ai-planner', title: 'AI Planner', icon: '🤖' },
];

export default function DefaultCTAs() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: 12,
      marginTop: 40,
      marginBottom: 40,
    }}>
      {quickLinks.map((link) => (
        <Link
          key={link.url}
          href={link.url}
          style={{
            background: 'rgba(200,169,110,0.05)',
            border: '1px solid rgba(200,169,110,0.2)',
            padding: '12px 8px',
            textAlign: 'center',
            textDecoration: 'none',
            color: '#C8A96E',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
          }}
        >
          {link.icon} {link.title}
        </Link>
      ))}
    </div>
  );
}