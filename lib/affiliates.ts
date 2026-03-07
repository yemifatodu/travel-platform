// ══════════════════════════════════════════════════════════════════
// [YOUR BRAND] — Affiliate Partners Configuration
// Replace YOUR_AFFILIATE_ID placeholders with your real IDs
// Sign up links included in comments
// ══════════════════════════════════════════════════════════════════

export interface AffiliatePartner {
  id: string
  name: string
  logo: string
  color: string
  category: string
  commission: string
  description: string
  signupUrl: string
  buildUrl: (params: AffiliateParams) => string
}

export interface AffiliateParams {
  destination?: string
  cityCode?: string
  countryCode?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  origin?: string
  currency?: string
}

// ── YOUR AFFILIATE IDs ── Replace these with your real IDs after signing up
const IDS = {
  booking:      'YOUR_BOOKING_AID',        // affiliate.booking.com
  skyscanner:   'YOUR_SKYSCANNER_ID',      // partners.skyscanner.net
  expedia:      'YOUR_EXPEDIA_ID',         // expediapartnersolutions.com
  tripadvisor:  'YOUR_TRIPADVISOR_ID',     // tripadvisor.com/affiliates
  viator:       'YOUR_VIATOR_ID',          // viator.com/affiliate-program
  airbnb:       'YOUR_AIRBNB_ID',          // airbnb.com/associates
  getyourguide: 'YOUR_GYG_PARTNER_ID',     // partner.getyourguide.com
  rentalcars:   'YOUR_RENTALCARS_AFF_ID',  // rentalcars.com/affiliates
}

export const AFFILIATES: AffiliatePartner[] = [
  {
    id: 'booking',
    name: 'Booking.com',
    logo: '🏨',
    color: '003580',
    category: 'Hotels',
    commission: '25–40% of Booking.com commission',
    description: 'World\'s largest hotel booking platform. 28M+ listings.',
    signupUrl: 'https://affiliate.booking.com',
    buildUrl: ({ destination = '', checkIn = '', checkOut = '', guests = 2 }) =>
      `https://www.booking.com/search.html?ss=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${guests}&aid=${IDS.booking}&label=travel-platform`,
  },
  {
    id: 'skyscanner',
    name: 'Skyscanner',
    logo: '✈',
    color: '0770E3',
    category: 'Flights',
    commission: '$0.15–0.25 per click / CPA on bookings',
    description: 'Compare flights from 1,200+ airlines. Best for flight search.',
    signupUrl: 'https://partners.skyscanner.net',
    buildUrl: ({ origin = '', destination = '', checkIn = '' }) => {
      const date = checkIn ? checkIn.replace(/-/g, '') : ''
      return `https://www.skyscanner.net/transport/flights/${origin}/${destination}/${date}/?ref=${IDS.skyscanner}`
    },
  },
  {
    id: 'expedia',
    name: 'Expedia',
    logo: '🌐',
    color: 'FFC72C',
    category: 'Packages',
    commission: '2–6% on hotels, $0.50 on flights',
    description: 'Flight + hotel packages. Great for bundle deals.',
    signupUrl: 'https://expediapartnersolutions.com',
    buildUrl: ({ destination = '', checkIn = '', checkOut = '', guests = 2 }) =>
      `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(destination)}&startDate=${checkIn}&endDate=${checkOut}&adults=${guests}&affcid=${IDS.expedia}`,
  },
  {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    logo: '🦉',
    color: '00AF87',
    category: 'Reviews & Hotels',
    commission: '50% of TripAdvisor revenue per click',
    description: 'Reviews, hotels, and experiences. Huge trust factor.',
    signupUrl: 'https://www.tripadvisor.com/affiliates',
    buildUrl: ({ destination = '' }) =>
      `https://www.tripadvisor.com/Search?q=${encodeURIComponent(destination)}&src=${IDS.tripadvisor}`,
  },
  {
    id: 'viator',
    name: 'Viator',
    logo: '🎯',
    color: '179BD7',
    category: 'Tours & Activities',
    commission: '8% per booking',
    description: '300,000+ tours and experiences worldwide.',
    signupUrl: 'https://www.viator.com/affiliate-program',
    buildUrl: ({ destination = '' }) =>
      `https://www.viator.com/searchResults/all?text=${encodeURIComponent(destination)}&pid=${IDS.viator}&mcid=42383&medium=api`,
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    logo: '🏠',
    color: 'FF5A5F',
    category: 'Stays',
    commission: '$0–75 per new guest signup',
    description: 'Unique stays, villas, and apartments worldwide.',
    signupUrl: 'https://www.airbnb.com/associates',
    buildUrl: ({ destination = '', checkIn = '', checkOut = '', guests = 2 }) =>
      `https://www.airbnb.com/s/${encodeURIComponent(destination)}/homes?checkin=${checkIn}&checkout=${checkOut}&adults=${guests}&af=${IDS.airbnb}`,
  },
  {
    id: 'getyourguide',
    name: 'GetYourGuide',
    logo: '🗺',
    color: 'FF6D00',
    category: 'Experiences',
    commission: '8% per booking',
    description: 'Local tours, activities, and skip-the-line tickets.',
    signupUrl: 'https://partner.getyourguide.com',
    buildUrl: ({ destination = '' }) =>
      `https://www.getyourguide.com/s/?q=${encodeURIComponent(destination)}&partner_id=${IDS.getyourguide}`,
  },
  {
    id: 'rentalcars',
    name: 'RentalCars',
    logo: '🚗',
    color: 'E31837',
    category: 'Car Rentals',
    commission: '5–10% per booking',
    description: 'Compare 900+ car rental companies globally.',
    signupUrl: 'https://www.rentalcars.com/affiliates',
    buildUrl: ({ destination = '', checkIn = '', checkOut = '' }) =>
      `https://www.rentalcars.com/SearchResults.do?country=${encodeURIComponent(destination)}&puDay=${checkIn}&doDay=${checkOut}&affiliateCode=${IDS.rentalcars}`,
  },
]

// Helper: get affiliates by category
export const getAffiliatesByCategory = (category: string) =>
  AFFILIATES.filter(a => a.category === category)

// Helper: get all unique categories
export const getCategories = () =>
  [...new Set(AFFILIATES.map(a => a.category))]

// Helper: build tracked affiliate URL with UTM params
export const buildTrackedUrl = (affiliate: AffiliatePartner, params: AffiliateParams): string => {
  const base = affiliate.buildUrl(params)
  const utm = `utm_source=travel-platform&utm_medium=affiliate&utm_campaign=${affiliate.id}`
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}${utm}`
}
