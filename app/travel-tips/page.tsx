'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const categories = ['All', 'Packing', 'Money & Budgeting', 'Safety', 'Flights', 'Accommodation', 'Health', 'Tech & Connectivity', 'Africa & Safari']

const tips = [
  // PACKING
  {
    category: 'Packing',
    icon: '🎒',
    title: 'The One-Bag Rule',
    body: 'Pack everything you think you need, then remove a third of it. You will never regret packing light — you will always regret packing heavy. A 20-litre carry-on is enough for 2 weeks anywhere in the world if you pack smart.',
    tags: ['Packing', 'Beginner'],
  },
  {
    category: 'Packing',
    icon: '👕',
    title: 'The 3-3-3 Clothing Formula',
    body: '3 tops, 3 bottoms, 3 pairs of socks and underwear. Everything should mix and match. Choose neutral colours — navy, grey, black, white, olive. Add one layer for cold and one smart item for dinners. That is a complete wardrobe for any trip.',
    tags: ['Packing', 'Clothing'],
  },
  {
    category: 'Packing',
    icon: '💊',
    title: 'Always Pack a Day Bag Pharmacy',
    body: 'In your carry-on: ibuprofen, antihistamine, rehydration sachets, plasters, antiseptic wipes and a small roll of medical tape. This small kit has saved hundreds of traveller trips. Do not rely on finding a pharmacy in the first hours of arrival.',
    tags: ['Packing', 'Health'],
  },
  {
    category: 'Packing',
    icon: '🔌',
    title: 'The Universal Adapter + Power Bank',
    body: 'One universal travel adapter covers every country. A 20,000mAh power bank keeps your phone and camera alive on long days. Pack both in your carry-on — checked bags can get lost, but your electronics should always be with you.',
    tags: ['Packing', 'Tech'],
  },
  {
    category: 'Packing',
    icon: '🧴',
    title: 'Solid Toiletries Save Space and Airport Hassle',
    body: 'Solid shampoo bars, conditioner bars and solid sunscreen eliminate the 100ml liquid rule stress at security. They also last longer, weigh less and are better for the environment. Switch to solid toiletries and never think about airport security liquids again.',
    tags: ['Packing', 'Eco'],
  },
  {
    category: 'Packing',
    icon: '📋',
    title: 'Digital Copies of Everything',
    body: 'Photograph your passport, visa, insurance documents, hotel confirmations and travel itinerary. Email them to yourself and save them in Google Drive. If your bag is stolen, you can reconstruct your entire trip from your phone.',
    tags: ['Packing', 'Safety', 'Documents'],
  },

  // MONEY & BUDGETING
  {
    category: 'Money & Budgeting',
    icon: '💳',
    title: 'Get a No-Foreign-Fee Card Before You Travel',
    body: 'Most bank cards charge 1.5–3.5% on every foreign transaction plus ATM fees. A Wise, Revolut or Chase Sapphire card eliminates these fees entirely. On a two-week trip spending $3,000, this saves you $50–100 in unnecessary charges.',
    tags: ['Money', 'Cards'],
  },
  {
    category: 'Money & Budgeting',
    icon: '💵',
    title: 'Always Carry Some Local Cash',
    body: 'Even the most cashless cities have cash-only restaurants, taxis, market vendors and tipping situations. Arrive with the local equivalent of $50–100 in small bills. Change money at the destination — airport exchange rates are almost always worse than in-city banks or ATMs.',
    tags: ['Money', 'Cash'],
  },
  {
    category: 'Money & Budgeting',
    icon: '🏧',
    title: 'ATM Strategy: Withdraw More, Less Often',
    body: 'Most ATMs charge a fixed fee per withdrawal regardless of amount. Withdraw the maximum sensible amount each time rather than small amounts repeatedly. Use bank ATMs inside bank branches — standalone ATMs in tourist areas often charge higher fees and are targets for card skimming.',
    tags: ['Money', 'ATM'],
  },
  {
    category: 'Money & Budgeting',
    icon: '📊',
    title: 'The 50/30/20 Daily Budget Rule',
    body: 'Split your daily budget: 50% on accommodation, 30% on food and activities, 20% as a buffer. The buffer almost always gets used — transport delays, entrance fees, a spontaneous dinner. Travellers who budget without a buffer consistently overspend.',
    tags: ['Money', 'Budget', 'Planning'],
  },
  {
    category: 'Money & Budgeting',
    icon: '🤝',
    title: 'Negotiate — But Respectfully',
    body: 'In Morocco, Southeast Asia, West Africa and much of the Middle East, the first price quoted is a starting point, not the final price. Counter-offer at 40–50% of the asking price and meet in the middle. Always negotiate with a smile — it is a social ritual, not a confrontation.',
    tags: ['Money', 'Negotiation', 'Culture'],
  },

  // SAFETY
  {
    category: 'Safety',
    icon: '🔐',
    title: 'The Decoy Wallet Trick',
    body: 'Carry a cheap wallet with a small amount of cash and an expired card. If you are robbed, hand this over. Keep your real cards, most of your cash and your phone in a hidden money belt or a zipped inner pocket. This small precaution works.',
    tags: ['Safety', 'Anti-Theft'],
  },
  {
    category: 'Safety',
    icon: '📍',
    title: 'Share Your Location With Someone at Home',
    body: 'Before any solo excursion, share your live location via WhatsApp, Google Maps or Find My Friends with a trusted person at home. A simple "I am heading to X, back by Y" message takes 10 seconds and gives both you and your loved ones peace of mind.',
    tags: ['Safety', 'Solo Travel'],
  },
  {
    category: 'Safety',
    icon: '🚕',
    title: 'Only Use Registered Taxis or Ride Apps',
    body: 'Uber, Bolt, Careem, Grab — in every city these apps show your driver\'s name, photo and plate number, track the route and have a digital record of every trip. Never accept a ride from an unmarked car offering cheap fares outside airports or transport hubs.',
    tags: ['Safety', 'Transport'],
  },
  {
    category: 'Safety',
    icon: '🌐',
    title: 'Know the Emergency Number',
    body: 'Before arriving anywhere new, spend 2 minutes finding: the local emergency number (not always 999 or 911), the nearest hospital to your accommodation, and your country\'s embassy or consulate address and phone number. Save all three in your phone contacts.',
    tags: ['Safety', 'Emergency'],
  },
  {
    category: 'Safety',
    icon: '🔒',
    title: 'Use a VPN on Public WiFi',
    body: 'Airport, hotel and café WiFi are hunting grounds for data theft. A VPN (NordVPN or ExpressVPN) encrypts your connection and protects your banking and email on any public network. At $3–5 per month it is one of the cheapest and most effective travel safety tools.',
    tags: ['Safety', 'Tech', 'Digital'],
  },

  // FLIGHTS
  {
    category: 'Flights',
    icon: '✈',
    title: 'The Best Days and Times to Book Flights',
    body: 'Studies consistently show that Tuesday and Wednesday are the cheapest days to fly. Search on incognito mode or clear cookies — some booking sites raise prices after repeat searches. Set fare alerts on Google Flights or Skyscanner so you are notified when your route drops.',
    tags: ['Flights', 'Money'],
  },
  {
    category: 'Flights',
    icon: '⏰',
    title: 'The Sweet Spot Booking Window',
    body: 'For domestic flights: 1–3 months ahead. For international flights: 3–6 months ahead. For peak season (Christmas, summer school holidays): 6–9 months ahead. Booking too early or too late both tend to mean higher prices — the sweet spot is the middle window.',
    tags: ['Flights', 'Planning'],
  },
  {
    category: 'Flights',
    icon: '💺',
    title: 'How to Get the Best Seat',
    body: 'Use SeatGuru.com to see the exact layout of your aircraft and identify seats to avoid (near toilets, no window, no recline). Check in online exactly 24 hours before departure — many airlines release held seats at this point. Exit row seats offer extra legroom at no cost on many airlines.',
    tags: ['Flights', 'Comfort'],
  },
  {
    category: 'Flights',
    icon: '🥤',
    title: 'The Flight Hydration Rule',
    body: 'Cabin air is extremely dry — humidity at altitude is 10–20%, drier than most deserts. Drink 250ml of water for every hour of flight time. Avoid excessive alcohol and caffeine which accelerate dehydration. Bring an empty refillable bottle through security and fill it after.',
    tags: ['Flights', 'Health'],
  },
  {
    category: 'Flights',
    icon: '🕐',
    title: 'Always Build in Connection Buffer Time',
    body: 'A 45-minute connection that works on paper is a 45-minute sprint through an unfamiliar airport while hoping your first flight was on time. Allow 90 minutes minimum for domestic connections and 2.5 hours for international ones. Missing a connection costs far more than the time saved.',
    tags: ['Flights', 'Planning'],
  },

  // ACCOMMODATION
  {
    category: 'Accommodation',
    icon: '🏨',
    title: 'Book Direct for the Best Rate',
    body: 'After finding a hotel on Booking.com or Expedia, visit the hotel\'s own website or call them directly. Hotels often price-match and add perks — free breakfast, room upgrades, late checkout — to guests who book direct, since they avoid paying the 15–25% OTA commission.',
    tags: ['Accommodation', 'Money'],
  },
  {
    category: 'Accommodation',
    icon: '📍',
    title: 'Location Beats Stars Every Time',
    body: 'A 3-star hotel in a central, walkable location is worth more than a 5-star hotel requiring a 40-minute taxi to reach anything. Research the neighbourhood before booking. Being able to walk to restaurants, transport and attractions transforms the travel experience.',
    tags: ['Accommodation', 'Planning'],
  },
  {
    category: 'Accommodation',
    icon: '🛎',
    title: 'Always Ask for What You Need',
    body: 'Hotels rarely volunteer upgrades, early check-ins or late checkouts — but they frequently grant them when asked politely. Call the front desk the day before arrival. Mention if it is a special occasion. The worst they can say is no, and a surprising number say yes.',
    tags: ['Accommodation', 'Upgrades'],
  },
  {
    category: 'Accommodation',
    icon: '⭐',
    title: 'Read the Most Recent Reviews Only',
    body: 'A hotel with 500 reviews averaging 8.5 matters less than the reviews from the last 3 months. Management changes, renovations and ownership transitions can completely change a property. Filter reviews to the last 90 days for a current picture of any accommodation.',
    tags: ['Accommodation', 'Research'],
  },

  // HEALTH
  {
    category: 'Health',
    icon: '💉',
    title: 'Visit a Travel Clinic 6 Weeks Before Departure',
    body: 'Some vaccines require multiple doses spaced weeks apart. A travel clinic assesses your specific destinations and activities and recommends the right vaccinations and malaria prophylaxis. Yellow fever, typhoid, hepatitis A and B, and meningitis are commonly required for African travel.',
    tags: ['Health', 'Africa', 'Preparation'],
  },
  {
    category: 'Health',
    icon: '🦟',
    title: 'Malaria Prevention — Non-Negotiable',
    body: 'If travelling to malaria-risk areas (sub-Saharan Africa, parts of Asia and South America), take anti-malarials as prescribed, use DEET repellent, wear long sleeves after sunset and sleep under a mosquito net. Malaria is preventable — do not skip this step.',
    tags: ['Health', 'Africa', 'Safety'],
  },
  {
    category: 'Health',
    icon: '💧',
    title: 'Water Safety Rules',
    body: 'In developing countries: drink only bottled or purified water, use bottled water even to brush teeth, avoid ice in drinks unless you are certain it was made from purified water, and be cautious with raw salads washed in tap water. A travel-sized UV water purifier (SteriPen) is a worthwhile investment.',
    tags: ['Health', 'Food Safety'],
  },
  {
    category: 'Health',
    icon: '🩺',
    title: 'Travel Insurance — Get It, Read It',
    body: 'Medical evacuation from a remote location can cost $50,000–200,000. Travel insurance costs $50–200 for a 2-week trip. Get comprehensive cover that includes medical evacuation, trip cancellation and baggage loss. Read the policy — know what is and is not covered before you need to make a claim.',
    tags: ['Health', 'Insurance'],
  },

  // TECH & CONNECTIVITY
  {
    category: 'Tech & Connectivity',
    icon: '📱',
    title: 'Get a Travel eSIM — It Changes Everything',
    body: 'A travel eSIM gives you instant data connectivity from the moment you land — no searching for SIM shops, no roaming charges, no juggling physical cards. HUUBOI\'s eSIM store covers 150+ countries. Activate before you fly and land ready to go.',
    tags: ['Tech', 'eSIM', 'Connectivity'],
    cta: { label: 'Get a Travel eSIM', href: '/esim' },
  },
  {
    category: 'Tech & Connectivity',
    icon: '📥',
    title: 'Download Offline Maps Before You Land',
    body: 'Google Maps allows full offline map downloads — search "download offline map" in the app and select your destination region. Download Translate\'s offline language packs for your destination. Download your airline app, Uber and hotel apps. Do all of this on home WiFi before departure.',
    tags: ['Tech', 'Navigation'],
  },
  {
    category: 'Tech & Connectivity',
    icon: '🔋',
    title: 'Manage Battery Life Like a Pro',
    body: 'Enable Low Power Mode, reduce screen brightness and turn off Background App Refresh on long days out. Carry a 20,000mAh power bank. Turn on Airplane Mode in areas with no signal — constantly searching for signal drains battery faster than almost anything else.',
    tags: ['Tech', 'Battery'],
  },
  {
    category: 'Tech & Connectivity',
    icon: '🌍',
    title: 'Essential Travel Apps to Install',
    body: 'Google Maps (offline), Google Translate (offline packs), Bolt/Uber (transport), XE Currency (exchange rates), TripAdvisor (restaurant research), WhatsApp (communication), and your airline app. Install them all before departure on home WiFi.',
    tags: ['Tech', 'Apps'],
  },

  // AFRICA & SAFARI
  {
    category: 'Africa & Safari',
    icon: '🦁',
    title: 'Safari Clothing: Colour Matters',
    body: 'Wear neutral colours on safari — khaki, olive, beige, brown. Avoid white (too bright), black (attracts tsetse flies) and blue (attracts tsetse flies). Bright colours startle wildlife. Every item of clothing you pack for safari should blend with the bush.',
    tags: ['Safari', 'Africa', 'Packing'],
  },
  {
    category: 'Africa & Safari',
    icon: '📷',
    title: 'Safari Photography: The Rule of Patience',
    body: 'The best safari photographs come from waiting. Find a lion resting near a kill and stay for an hour. Position your vehicle with the light behind you. A 200mm lens minimum — a 400mm or 500mm is ideal. Shoot in RAW format, bracket your exposures and always keep your camera accessible.',
    tags: ['Safari', 'Photography'],
  },
  {
    category: 'Africa & Safari',
    icon: '🌍',
    title: 'Africa Visa Strategy',
    body: 'East Africa: Kenya, Uganda and Rwanda now offer a single East Africa Tourist Visa ($100) covering all three countries. Tanzania is separate. Southern Africa: South Africa visa-free for many nationalities. Botswana visa-free for 90 days for most. Always check current requirements 6 weeks before travel as policies change.',
    tags: ['Africa', 'Visa', 'Planning'],
  },
  {
    category: 'Africa & Safari',
    icon: '💰',
    title: 'Tipping in Africa',
    body: 'Tipping is an important and expected part of the tourism economy across Africa. Safari guide: $15–25 per day. Tracker: $10–15 per day. Camp staff collective: $10–15 per day. City hotel staff: $2–5 per service. Always tip in USD cash — it is the most useful currency across the continent.',
    tags: ['Africa', 'Money', 'Culture'],
  },
  {
    category: 'Africa & Safari',
    icon: '🏥',
    title: 'Health Preparation for African Travel',
    body: 'Yellow fever vaccination certificate is required for entry to many African countries. Malaria prophylaxis is essential for most of sub-Saharan Africa. Hepatitis A, typhoid and rabies vaccines are recommended for adventurous travel. Visit a travel clinic 6–8 weeks before departure.',
    tags: ['Africa', 'Health', 'Safety'],
  },
]

export default function TravelTips() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = tips.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory
    const matchSearch = search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.body.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            EXPERT ADVICE
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 1, margin: 0 }}>
              Travel <em style={{ color: gold }}>Tips</em>
            </h1>
            <p style={{ color: muted, fontSize: '0.95rem', maxWidth: 400, lineHeight: 1.8, margin: 0 }}>
              {tips.length} expert tips across {categories.length - 1} categories — from first-time travellers to seasoned explorers.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ borderBottom: '1px solid rgba(200,169,110,0.1)', padding: '24px clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setExpanded(null) }}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.63rem', letterSpacing: '0.12em', padding: '7px 14px', background: activeCategory === cat ? gold : 'transparent', border: `1px solid ${activeCategory === cat ? gold : 'rgba(200,169,110,0.2)'}`, color: activeCategory === cat ? '#080807' : muted, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                {cat}
              </button>
            ))}
          </div>
          <input
            placeholder="Search tips..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', color: cream, padding: '7px 16px', fontSize: '0.85rem', outline: 'none', fontFamily: "'DM Sans',sans-serif", width: 200 }}
          />
        </div>
      </div>

      {/* Tips grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,60px)' }}>

        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: dim, marginBottom: 24 }}>
          {filtered.length} TIP{filtered.length !== 1 ? 'S' : ''} {activeCategory !== 'All' ? `IN ${activeCategory.toUpperCase()}` : 'TOTAL'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 2 }}>
          {filtered.map((tip, idx) => {
            const isOpen = expanded === idx
            return (
              <div key={idx}
                style={{ background: '#111110', border: `1px solid ${isOpen ? 'rgba(200,169,110,0.3)' : 'rgba(200,169,110,0.1)'}`, transition: 'border-color 0.2s', overflow: 'hidden' }}>

                {/* Card header — always visible */}
                <button
                  onClick={() => setExpanded(isOpen ? null : idx)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '24px 24px 20px', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.6rem', flexShrink: 0, marginTop: 2 }}>{tip.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', color: gold, marginBottom: 6 }}>{tip.category}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: cream, lineHeight: 1.3, fontWeight: 600 }}>{tip.title}</div>
                  </div>
                  <span style={{ color: gold, fontSize: '0.9rem', flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none', marginTop: 4 }}>+</span>
                </button>

                {/* Expanded body */}
                {isOpen && (
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(200,169,110,0.08)' }}>
                    <p style={{ color: muted, fontSize: '0.92rem', lineHeight: 1.85, marginTop: 16, marginBottom: 16 }}>{tip.body}</p>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: tip.cta ? 16 : 0 }}>
                      {tip.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.15)', color: dim, padding: '3px 10px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Optional CTA */}
                    {tip.cta && (
                      <Link href={tip.cta.href}
                        style={{ display: 'inline-block', marginTop: 12, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '10px 20px', textDecoration: 'none' }}>
                        {tip.cta.label} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: muted, fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', fontStyle: 'italic' }}>
            No tips found — try a different search or category
          </div>
        )}

        {/* eSIM promo strip */}
        <div style={{ marginTop: 64, background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(24px,3vw,40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, marginBottom: 8 }}>📱 PRO TIP: GET A TRAVEL ESIM</div>
            <p style={{ color: muted, fontSize: '0.92rem', lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
              The single most impactful travel tech upgrade — instant data in 150+ countries, no roaming fees, activate before you fly. Used by frequent travellers worldwide.
            </p>
          </div>
          <Link href="/esim"
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '14px 32px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            GET YOUR ESIM →
          </Link>
        </div>

        {/* Related links */}
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 2 }}>
          {[
            { label: 'Travel Guides', sub: 'In-depth destination guides', href: '/travel-guides' },
            { label: 'Budget Calculator', sub: 'Estimate your trip cost', href: '/budget-calculator' },
            { label: 'Africa & Safari', sub: 'Safari planning guide', href: '/africa-safari' },
            { label: 'The Journal', sub: 'Travel stories and advice', href: '/blog' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', color: gold, marginBottom: 4 }}>{link.label} →</div>
                <div style={{ color: dim, fontSize: '0.78rem' }}>{link.sub}</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
