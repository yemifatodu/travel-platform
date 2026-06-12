# [YOUR BRAND] — Global Travel Platform

A full-stack travel website built with **Next.js 14 · Vercel · Supabase**.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Backend | Vercel Serverless Functions |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| CDN | Vercel Edge Network (global) |
| Payments | Stripe |
| Email | Resend |
| AI | OpenAI API |

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/travel-platform
cd travel-platform
npm install
```

### 2. Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open the **SQL Editor** and run `lib/supabase/schema.sql`
3. Copy your project URL and anon key

### 3. Configure Environment
```bash
cp .env.local.example .env.local
# Fill in your Supabase URL, keys, and API keys
```

### 4. Run Locally
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts — add environment variables in Vercel dashboard
```

### 6. Connect Custom Domain
1. In Vercel dashboard → Project → Settings → Domains
2. Add your domain (e.g. `yourbrand.com`)
3. Update DNS records with your registrar

---

## 📁 Project Structure

```
travel-platform/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── flights/                # Flight search
│   ├── hotels/                 # Hotel search
│   ├── packages/               # Vacation packages
│   ├── tours/                  # Tours & activities
│   ├── car-rentals/            # Car rentals
│   ├── deals/                  # Travel deals
│   ├── destinations/           # Destination pages (SEO)
│   ├── blog/                   # Travel blog
│   ├── travel-guides/          # Destination guides (SEO)
│   ├── travel-tips/            # Travel tips
│   ├── visa-requirements/      # Visa info
│   ├── ai-planner/             # AI itinerary generator
│   ├── budget-calculator/      # Budget tool
│   ├── price-alerts/           # Price alert system
│   ├── map-explorer/           # Interactive map
│   ├── community/              # Reviews & community
│   ├── auth/
│   │   ├── login/              # Login page
│   │   └── signup/             # Sign up page
│   ├── dashboard/              # User dashboard
│   │   ├── trips/              # My bookings
│   │   └── wishlist/           # Saved trips
│   ├── booking/
│   │   ├── checkout/           # Checkout
│   │   └── confirmation/       # Booking confirmed
│   ├── about/                  # About us
│   ├── contact/                # Contact form
│   ├── help/                   # FAQ / Help center
│   ├── privacy-policy/         # Privacy policy
│   ├── terms/                  # Terms & conditions
│   └── refund-policy/          # Refund policy
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation
│   │   └── Footer.tsx          # Footer
│   ├── sections/               # Homepage sections
│   ├── booking/                # Booking UI components
│   ├── search/                 # Search components
│   └── ui/                     # Reusable UI elements
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client
│   │   └── schema.sql          # Full DB schema (run once)
│   ├── api/                    # API helper functions
│   └── utils/                  # Utilities
│
├── types/
│   └── database.ts             # TypeScript types for all 25 tables
│
├── styles/
│   └── globals.css             # Global styles + Tailwind
│
├── .env.local.example          # Environment variable template
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🗄️ Database (25 Tables)

### Users & Auth (5 tables)
- `users` — Core profiles
- `user_profiles` — Extended preferences (travel style, currency)
- `user_sessions` — Active sessions
- `user_roles` — admin / traveler / vendor / editor
- `password_resets` — Recovery tokens

### Destinations & Locations (5 tables)
- `countries` — 195 countries with ISO codes
- `cities` — Cities linked to countries
- `airports` — IATA airport data
- `destinations` — Featured travel destinations (full-text search)
- `attractions` — Tourist attractions per destination

### Travel Products (6 tables)
- `airlines` — Airline companies
- `flights` — Cached flight data from APIs
- `hotels` — Hotel listings
- `rooms` — Room types per hotel
- `tours_activities` — Tours & experiences
- `car_rentals` — Vehicle rentals

### Bookings & Payments (4 tables)
- `bookings` — Master booking records
- `booking_items` — Individual items per booking
- `payments` — Payment transactions (Stripe)
- `refunds` — Refund management

### Reviews (2 tables)
- `reviews` — User reviews (hotels, tours, destinations)
- `ratings` — Detailed star ratings

### Content & SEO (2 tables)
- `travel_guides` — Destination guides
- `blog_posts` — Travel articles

### Personalization (1 table)
- `wishlists` — Saved trips

### Bonus Tables
- `price_alerts` — Flight/hotel price notifications
- `loyalty_transactions` — Points & rewards
- `coupons` — Discount codes

---

## 🔌 API Integrations (Phase 2)

| Feature | Recommended API |
|---|---|
| Flights | Amadeus, Skyscanner, Sabre |
| Hotels | Booking.com Demand API, Expedia |
| Activities | Viator, GetYourGuide |
| Car Rentals | RentalCars, Cartrawler |
| Maps | Google Maps, Mapbox |
| Weather | OpenWeatherMap |
| Currency | ExchangeRate-API |
| Payments | Stripe |
| Email | Resend |
| AI Features | OpenAI GPT-4 |

---

## 💰 Monthly Costs

| Service | Free Tier | Paid |
|---|---|---|
| Vercel | Free (hobby) | $20/mo (pro) |
| Supabase | Free (500MB) | $25/mo (pro) |
| Domain | — | $10–15/yr |
| **Total MVP** | **$0/mo** | **~$45/mo** |

---

## 🗺️ Build Roadmap

### Phase 1 — MVP (Month 1–2)
- [x] Homepage + UI
- [x] Database schema
- [ ] Auth (login/signup)
- [ ] Destination pages
- [ ] Blog + guides
- [ ] Contact form

### Phase 2 — Bookings (Month 3–4)
- [ ] Flight search (API)
- [ ] Hotel search (API)
- [ ] Stripe checkout
- [ ] User dashboard
- [ ] Email confirmations

### Phase 3 — Growth (Month 5–6)
- [ ] AI itinerary generator
- [ ] Loyalty program
- [ ] Price alerts
- [ ] Affiliate program
- [ ] Analytics dashboard

---

## 📞 Support
Built with ♥ using Next.js, Vercel & Supabase.
