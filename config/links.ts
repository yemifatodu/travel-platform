// config/links.ts
// CENTRAL LINKS CONFIGURATION - Update URLs here and they update everywhere

export const siteLinks = {
  // Main Services
  esim: {
    url: '/esim',
    title: 'Get eSIM',
    icon: '📱',
    description: 'Instant data in 200+ countries. No roaming fees.',
  },
  flights: {
    url: '/flights',
    title: 'Search Flights',
    icon: '✈️',
    description: 'Find the best flight deals worldwide.',
  },
  hotels: {
    url: '/hotels',
    title: 'Book Hotels',
    icon: '🏨',
    description: 'Luxury stays. Best price guarantee.',
  },
  tours: {
    url: '/tours',
    title: 'Tours & Activities',
    icon: '🎒',
    description: 'Book unforgettable experiences.',
  },
  carRentals: {
    url: '/car-rentals',
    title: 'Car Rentals',
    icon: '🚗',
    description: 'Best rates from top providers.',
  },
  
  // Tools
  aiPlanner: {
    url: '/ai-planner',
    title: 'AI Trip Planner',
    icon: '🤖',
    description: 'Plan your perfect itinerary with AI.',
  },
  budgetCalculator: {
    url: '/budget-calculator',
    title: 'Budget Calculator',
    icon: '💰',
    description: 'Plan your travel budget accurately.',
  },
  priceAlerts: {
    url: '/price-alerts',
    title: 'Price Alerts',
    icon: '🔔',
    description: 'Get notified when prices drop.',
  },
  mapExplorer: {
    url: '/map-explorer',
    title: 'Map Explorer',
    icon: '🗺️',
    description: 'Discover destinations on the map.',
  },
  
  // Destinations
  africa: {
    url: '/destinations/africa',
    title: 'Africa',
    icon: '🦁',
  },
  asia: {
    url: '/destinations/asia',
    title: 'Asia',
    icon: '🏯',
  },
  europe: {
    url: '/destinations/europe',
    title: 'Europe',
    icon: '🏰',
  },
  americas: {
    url: '/destinations/americas',
    title: 'Americas',
    icon: '🗽',
  },
  pacific: {
    url: '/destinations/pacific',
    title: 'Pacific',
    icon: '🏝️',
  },
  middleEast: {
    url: '/destinations/middle-east',
    title: 'Middle East',
    icon: '🕌',
  },
  
  // Content
  travelGuides: {
    url: '/travel-guides',
    title: 'Travel Guides',
  },
  blog: {
    url: '/blog',
    title: 'Blog',
  },
  
  // Support
  about: {
    url: '/about',
    title: 'About Us',
  },
  contact: {
    url: '/contact',
    title: 'Contact',
  },
  help: {
    url: '/help',
    title: 'Help Center',
  },
  
  // Legal
  privacy: {
    url: '/privacy-policy',
    title: 'Privacy Policy',
  },
  terms: {
    url: '/terms',
    title: 'Terms of Service',
  },
  refund: {
    url: '/refund-policy',
    title: 'Refund Policy',
  },
};

// Helper function to get link by key
export function getLink(key: keyof typeof siteLinks): string {
  return siteLinks[key]?.url || '/';
}

// Get all service links (for CTAs)
export function getServiceLinks() {
  return {
    esim: siteLinks.esim,
    flights: siteLinks.flights,
    hotels: siteLinks.hotels,
    tours: siteLinks.tours,
    carRentals: siteLinks.carRentals,
    aiPlanner: siteLinks.aiPlanner,
    budgetCalculator: siteLinks.budgetCalculator,
  };
}

// Get all destination links
export function getDestinationLinks() {
  return {
    africa: siteLinks.africa,
    asia: siteLinks.asia,
    europe: siteLinks.europe,
    americas: siteLinks.americas,
    pacific: siteLinks.pacific,
    middleEast: siteLinks.middleEast,
  };
}
