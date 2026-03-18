'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

export const posts = [
  {
    slug: 'best-time-visit-dubai',
    title: 'Best Time to Visit Dubai: A Complete Seasonal Guide',
    category: 'Destination Guide',
    date: 'March 2025',
    readTime: '8 min',
    excerpt: 'Dubai is a year-round destination but knowing the best time to visit can transform your experience. We break down every season.',
    gradient: 'linear-gradient(135deg,#1a0e00,#3d2800)',
    author: 'HUUBOI Editorial',
    content: [
      { type: 'intro', text: 'Dubai operates on a different calendar to most destinations. While much of the world plans around summer holidays, Dubai\'s sweet spot is the northern hemisphere\'s winter — and understanding this rhythm is the first step to planning a perfect trip.' },
      { type: 'heading', text: 'November to March: Peak Season' },
      { type: 'text', text: 'This is Dubai at its finest. Temperatures sit at a perfect 20–28°C, the city buzzes with events and outdoor dining comes alive. The Dubai Shopping Festival (December to February) brings incredible deals and entertainment. New Year\'s Eve fireworks at the Burj Khalifa are among the world\'s most spectacular. Book well ahead — hotels command premium prices and availability is tight.' },
      { type: 'heading', text: 'April and October: Shoulder Season' },
      { type: 'text', text: 'These transitional months offer a compelling balance — the tail of comfortable weather, lower prices than peak and fewer crowds. April can still reach 35°C but evenings remain pleasant. October marks the return of Dubai\'s social season with outdoor events and cooler nights. Excellent value for savvy travellers.' },
      { type: 'heading', text: 'May to September: Summer' },
      { type: 'text', text: 'Summer in Dubai is genuinely extreme — temperatures regularly exceed 42°C with high humidity. Outdoor activities are largely impossible during daylight hours. That said, summer has its appeal: hotel rates drop by 40–60%, malls and indoor attractions are empty, and the city\'s world-class dining and nightlife scene operates at full steam. If you can handle the heat (and stay near your hotel pool), summer Dubai offers extraordinary value.' },
      { type: 'heading', text: 'Ramadan' },
      { type: 'text', text: 'Ramadan (dates shift annually — check ahead) is a fascinating time to visit if you approach it with cultural sensitivity. The city transforms at night with Iftar feasts, traditional music and a deeply communal atmosphere. Restaurants open after sunset and many hotels offer spectacular Iftar buffets. Eating and drinking in public during daylight is prohibited — be respectful.' },
      { type: 'tip', text: 'Our verdict: November to February for the classic Dubai experience. April or October for better value. Summer only if you\'re heat-tolerant and want unbeatable hotel deals.' },
    ],
  },
  {
    slug: 'luxury-safari-serengeti',
    title: 'Planning a Luxury Safari in the Serengeti: Everything You Need to Know',
    category: 'Safari',
    date: 'February 2025',
    readTime: '12 min',
    excerpt: 'From the great migration to luxury tented camps — our complete guide to experiencing the Serengeti in style.',
    gradient: 'linear-gradient(135deg,#0a0800,#2a1500)',
    author: 'HUUBOI Editorial',
    content: [
      { type: 'intro', text: 'The Serengeti is one of the last places on earth where you can witness nature operating entirely on its own terms. Two million wildebeest, 500,000 zebra, and countless predators playing out an ancient drama across 30,000 square kilometres of golden savannah. A luxury safari here is not just a holiday — it is a perspective shift.' },
      { type: 'heading', text: 'The Great Migration: Timing Your Visit' },
      { type: 'text', text: 'The migration is a year-round event but certain moments are unmissable. The famous Mara River crossings — where hundreds of thousands of wildebeest plunge into crocodile-infested waters — happen from July to October in the northern Serengeti. January and February bring the calving season in the southern Serengeti: thousands of wildebeest calves born daily, attracting cheetahs, lions and hyenas. Both are extraordinary.' },
      { type: 'heading', text: 'Choosing Your Camp' },
      { type: 'text', text: 'The difference between a good and great safari often comes down to your camp. The Serengeti has options ranging from mobile tented camps that follow the migration to permanent luxury lodges. &Beyond Kleins Camp offers exceptional privacy in the remote northeast. Singita Grumeti has arguably the finest facilities on the continent. For the Mara River crossings, Four Seasons Serengeti or Sayari Camp place you perfectly. Book 6–12 months ahead for July to October.' },
      { type: 'heading', text: 'What to Expect Each Day' },
      { type: 'text', text: 'A typical safari day starts before dawn — 5:30am wake-up for a 6am game drive when predators are most active and golden light illuminates the landscape. Three to four hours in the bush, breakfast back at camp, a midday rest, then an afternoon drive from 4pm until after sunset for nocturnal wildlife. Expert guides make an extraordinary difference — they spot a lion\'s ear above grass at 200 metres, read animal behaviour and know the bush intimately.' },
      { type: 'heading', text: 'Beyond the Serengeti' },
      { type: 'text', text: 'Combine with the Ngorongoro Crater (a volcanic caldera with the world\'s highest concentration of predators), Zanzibar for a beach finish, or the Masai Mara across the Kenyan border for the river crossings. A 10–14 day itinerary combining Serengeti, Ngorongoro and Zanzibar is the classic East Africa journey.' },
      { type: 'tip', text: 'Budget guidance: Quality tented camps run $600–1,200 per person per night fully inclusive. This sounds steep but includes all game drives, meals, drinks, laundry and park fees — and the experience is genuinely unlike anything else.' },
    ],
  },
  {
    slug: 'iceland-northern-lights',
    title: 'Chasing the Northern Lights in Iceland: Insider Tips',
    category: 'Adventure',
    date: 'January 2025',
    readTime: '10 min',
    excerpt: 'The aurora borealis is unpredictable but not unplannable. Here is how to maximise your chances of seeing it.',
    gradient: 'linear-gradient(135deg,#001530,#002050)',
    author: 'HUUBOI Editorial',
    content: [
      { type: 'intro', text: 'Few natural phenomena match the Northern Lights for pure, jaw-dropping magic. Green curtains of light rippling across a black sky, shifting into violet and white, reflected in frozen lakes below. Iceland — dark, remote, and geologically dramatic — is one of the world\'s best stages for this spectacle.' },
      { type: 'heading', text: 'When to Go' },
      { type: 'text', text: 'Aurora season runs September to March when Iceland has enough darkness. The absolute peak is around the winter solstice (mid-December) when nights stretch to 20 hours. September and October offer a compelling combination: reasonable temperatures, dramatic autumn landscapes and long dark nights. January and February are coldest but skies are often clearest.' },
      { type: 'heading', text: 'Forecasting and Finding the Lights' },
      { type: 'text', text: 'The aurora cannot be guaranteed — that is part of its magic. But you can dramatically improve your odds. Download the Icelandic Met Office Aurora Forecast app and look for KP3 or above on clear nights. Cloud cover is your enemy — check weather forecasts obsessively. Head at least 40 minutes from Reykjavik to escape light pollution. Þingvellir National Park, the Snæfellsnes Peninsula and the south coast near Vík are excellent dark sky locations.' },
      { type: 'heading', text: 'Photography Tips' },
      { type: 'text', text: 'Manual mode: ISO 1600–3200, aperture f/2.8 or wider, shutter speed 5–15 seconds. A sturdy tripod is essential. Shoot in RAW for post-processing flexibility. Include foreground interest — a frozen waterfall, a farm, your silhouette — to give the image scale and drama. Charge batteries indoors before heading out as cold destroys battery life rapidly.' },
      { type: 'heading', text: 'Beyond the Lights' },
      { type: 'text', text: 'Iceland in winter offers far more than aurora hunting. The ice caves in Vatnajökull glacier (accessible October to March) are otherworldly blue cathedrals. Snow-capped waterfalls like Skógafoss and Seljalandsfoss are dramatically beautiful in winter. The Blue Lagoon (book well ahead) and Reykjavik\'s geothermal swimming pools are the perfect way to end a cold night outside.' },
      { type: 'tip', text: 'Real talk: On a 7-night trip in winter, most visitors see the aurora 1–3 times. Some see it every night. Some see it zero times. Go for Iceland itself — the aurora is a bonus, not the whole show.' },
    ],
  },
  {
    slug: 'kyoto-hidden-gems',
    title: "Kyoto's Hidden Gems: Beyond the Tourist Trail",
    category: 'Culture',
    date: 'December 2024',
    readTime: '9 min',
    excerpt: 'Most visitors only see Fushimi Inari and Arashiyama. These are the temples, districts, and experiences the guidebooks miss.',
    gradient: 'linear-gradient(135deg,#1a0010,#2d0020)',
    author: 'HUUBOI Editorial',
    content: [
      { type: 'intro', text: 'Kyoto has 1,600 temples and shrines. Most tourists visit the same five. The city rewards those who wander off the main routes with quiet gardens, neighbourhood tea houses, and thousand-year-old districts where time has barely moved.' },
      { type: 'heading', text: 'Fushimi Inari Without the Crowds' },
      { type: 'text', text: 'The famous orange torii gates are unmissable — but the experience at midday in peak season is pure tourist chaos. Arrive before 6am and you will have this sacred mountain almost entirely to yourself as dawn light filters through the gates. Most visitors only go as far as the first viewing platform (20 minutes up). The full hike to the summit takes 2–3 hours and the upper reaches are serene.' },
      { type: 'heading', text: 'Nishiki Market: The Real One' },
      { type: 'text', text: 'The famous covered Nishiki Market is worth a morning — but arrive before 9am before the tour groups. Try pickled vegetables, fresh tofu, grilled skewers and matcha soft serve. The real local market experience is at Demachi Masugata, a small neighbourhood market near Kyoto University where actual Kyoto residents shop.' },
      { type: 'heading', text: 'Philosopher\'s Path at Cherry Blossom' },
      { type: 'text', text: 'The two-kilometre canal path lined with cherry trees is one of Japan\'s most photographed walks. The secret: walk it at 7am before the crowds, or visit in the evenings when lanterns glow and the atmosphere is entirely different. The small temples and cafés along the path — Nanzen-ji, Eikan-do, Honen-in — are each worth time.' },
      { type: 'heading', text: 'Kurama: The Mountain Village' },
      { type: 'text', text: 'Take the charming single-carriage Eizan Railway 30 minutes north of Kyoto to Kurama — a mountain village with a cedar-forested temple complex, natural hot springs (onsen) and hiking trails. Almost no international tourists. The two-hour hike over the mountain to Kibune, a riverside village of traditional restaurants, is one of the finest walks near any Japanese city.' },
      { type: 'heading', text: 'Where Locals Actually Eat' },
      { type: 'text', text: 'Skip the tourist kaiseki restaurants and head to Pontocho alley at dinner — pick any place that looks full of Japanese people. Hirano-ya in the Fushimi neighbourhood serves exceptional traditional Kyoto cuisine. For ramen, Ippudo and Kyoto Ramen Koji (in Kyoto Station) are excellent. Morning tofu breakfast at Tousuiro near Nishiki Market is a Kyoto institution.' },
      { type: 'tip', text: 'Kyoto pro tip: rent a bicycle for the day — the city is perfectly flat and cycling between temples through quiet residential streets is the finest way to experience it.' },
    ],
  },
  {
    slug: 'bali-wellness-retreat',
    title: 'The Ultimate Bali Wellness Retreat Guide',
    category: 'Wellness',
    date: 'November 2024',
    readTime: '7 min',
    excerpt: 'From Ubud jungle spas to beachside yoga retreats — Bali is the wellness capital of the world for good reason.',
    gradient: 'linear-gradient(135deg,#0a1500,#1a2800)',
    author: 'HUUBOI Editorial',
    content: [
      { type: 'intro', text: 'Bali has earned its reputation as the world\'s wellness capital not through marketing but through something genuine — a spiritual culture thousands of years old, extraordinary natural beauty, world-class practitioners and an infrastructure of retreat centres, spas and yoga studios that is unmatched anywhere.' },
      { type: 'heading', text: 'Ubud: The Heart of It All' },
      { type: 'text', text: 'Ubud is Bali\'s cultural and wellness hub. The Yoga Barn offers daily classes in a stunning jungle setting. Como Shambhala Estate is arguably the finest wellness resort in Southeast Asia — set in a forested river valley with Ayurvedic treatments, nutritional cuisine and movement classes. Komaneka at Bisma and Four Seasons Sayan offer more intimate luxury wellness experiences.' },
      { type: 'heading', text: 'Traditional Balinese Treatments' },
      { type: 'text', text: 'A traditional Balinese massage — combining acupressure, reflexology and gentle stretching — is deeply therapeutic and costs $15–25 at a reputable local spa. Mandi lulur (a royal Javanese body scrub with rice, turmeric and herbs) is a beautiful ritual. Seek out a traditional healer (balian) for a cultural experience that predates modern wellness by centuries.' },
      { type: 'heading', text: 'Yoga Retreats' },
      { type: 'text', text: 'Bali hosts hundreds of yoga retreats from weekend intensives to month-long immersions. The Bali Spirit Festival (April) is the world\'s largest yoga and dance festival. Radiantly Alive, Taksu Yoga and Desa Seni in Canggu are excellent year-round studios. For a beachside practice, Seminyak and Canggu have studios where classes end with sunset ocean views.' },
      { type: 'heading', text: 'Detox and Fasting Retreats' },
      { type: 'text', text: 'Fivelements near Ubud is one of Asia\'s most respected detox and healing centres — expect raw food, water fasting programs, energy healing and deep detoxification over 3–14 days. The Retreat Bali in Ubud combines medically supervised fasting with daily yoga and meditation. These experiences are genuinely transformative but require commitment.' },
      { type: 'tip', text: 'Wellness budget guide: Day spa treatments $20–60. Quality yoga retreat $80–200 per day. Luxury wellness resort $300–600 per night all-inclusive. A week at a mid-range retreat with accommodation, meals and treatments: $800–1,500 total.' },
    ],
  },
  {
    slug: 'patagonia-trekking',
    title: 'Trekking in Patagonia: The W Trek and Beyond',
    category: 'Adventure',
    date: 'October 2024',
    readTime: '15 min',
    excerpt: "The W Trek in Torres del Paine is one of the world's great hikes. Here's how to plan it — from budget to luxury.",
    gradient: 'linear-gradient(135deg,#001a20,#002d3d)',
    author: 'HUUBOI Editorial',
    content: [
      { type: 'intro', text: 'At the bottom of the world, where the Andes dissolve into the Southern Ocean, Patagonia offers something increasingly rare: wilderness on a scale that makes you feel genuinely small. Torres del Paine National Park is the centrepiece — granite towers soaring 2,800 metres from the steppe, glaciers calving into turquoise lakes, condors riding thermals overhead.' },
      { type: 'heading', text: 'The W Trek Explained' },
      { type: 'text', text: 'The W Trek takes its name from the shape it traces through the park — roughly 80km over 4–5 days connecting three major valleys. The route passes the Torres Base (the iconic granite towers), Valle del Francés (a hanging glacier and rock amphitheatre) and the Grey Glacier (a river of blue ice draining the Southern Patagonian Ice Field). It is one of the world\'s great multi-day hikes — challenging but not technical.' },
      { type: 'heading', text: 'When to Go' },
      { type: 'text', text: 'The Patagonian trekking season runs October to April (southern hemisphere spring and summer). December to February is peak season with the most reliable weather and the longest daylight hours. November and March offer a balance of good conditions with fewer hikers on the trail. The park is effectively closed May to September — extreme winds and snow make trekking dangerous.' },
      { type: 'heading', text: 'Accommodation: Camping vs Lodges' },
      { type: 'text', text: 'The W Trek can be done camping (book refugio campsites through CONAF months ahead — they sell out fast) or in the growing network of EcoCamp, Las Torres Patagonia and Explora Patagonia lodges. Lodge trekking — hiking the circuit during the day and returning to a hot shower and gourmet dinner — has transformed Patagonia accessibility. Expect $300–600 per person per night at premium lodges, inclusive of guides and meals.' },
      { type: 'heading', text: 'The Full Circuit' },
      { type: 'text', text: 'For experienced trekkers, the full Paine Circuit adds the spectacular and remote back side of the massif — 120km over 8–10 days. The O Circuit (combining the W and the back side) is one of South America\'s ultimate trekking achievements. Weather on the back side is more severe and the terrain more challenging — proper gear and experience are essential.' },
      { type: 'heading', text: 'Beyond Torres del Paine' },
      { type: 'text', text: 'Combine with a visit to Perito Moreno Glacier across the border in Argentina — you can walk on the ice and watch house-sized blocks calve into the lake below. El Chaltén, the trekking capital of Argentine Patagonia, offers day hikes to Cerro Torre and Mount Fitz Roy with zero park entrance fees.' },
      { type: 'tip', text: 'Essential gear: waterproof everything (jacket, trousers, bag cover), gaiters, trekking poles, sun protection (UV is intense at this latitude) and layers for temperature swings of 20°C in a single day. The wind in Patagonia is legendary — 100km/h gusts are not uncommon.' },
    ],
  },
  {
    slug: 'nigeria-travel-guide-2025',
    title: 'Nigeria in 2025: Why Now is the Time to Visit',
    category: 'Destination Guide',
    date: 'April 2025',
    readTime: '9 min',
    excerpt: 'Lagos is one of Africa\'s most exciting cities — vibrant, creative, and endlessly surprising. Here is your complete guide.',
    gradient: 'linear-gradient(135deg,#001a10,#003020)',
    author: 'HUUBOI Editorial',
    content: [
      { type: 'intro', text: 'Nigeria is not just Africa\'s most populous country — it is one of its most dynamic, creative and rewarding destinations for the traveller willing to look beyond the headlines. Lagos in particular is undergoing a cultural renaissance that has the world paying attention.' },
      { type: 'heading', text: 'Lagos: Africa\'s Cultural Capital' },
      { type: 'text', text: 'Lagos moves at a pace that can be overwhelming and exhilarating in equal measure. The Lekki-Ikoyi area has emerged as a hub of world-class restaurants, art galleries and boutique hotels. The Nike Art Gallery in Lekki houses Nigeria\'s largest collection of contemporary African art. The Afrobeats music scene is unmissable — live performances happen nightly across the city\'s clubs and lounges.' },
      { type: 'heading', text: 'Beaches and Island Life' },
      { type: 'text', text: 'Tarkwa Bay — accessible only by boat from Lagos Island — offers a calmer escape from the city\'s intensity with beach bars and water sports. Elegushi Beach in Lekki is the city\'s social beach with excellent food vendors and weekend energy. For a longer beach escape, Badagry (2 hours from Lagos) combines Atlantic beaches with the deeply moving history of the transatlantic slave trade.' },
      { type: 'heading', text: 'Beyond Lagos' },
      { type: 'text', text: 'Abuja, the capital, is modern, clean and well-organised with excellent hotels and the spectacular Zuma Rock outside the city. Calabar in the south is Nigeria\'s most visitor-friendly city — famous for its Carnival in December (Africa\'s biggest street party), seafood and warm hospitality. The ancient Osun-Osogbo Sacred Grove is a UNESCO World Heritage Site of genuine spiritual power.' },
      { type: 'heading', text: 'Food Culture' },
      { type: 'text', text: 'Nigerian cuisine is one of West Africa\'s great culinary traditions. Jollof rice (the subject of passionate West African debate), suya (spiced grilled meat), egusi soup, pounded yam and fresh fish pepper soup are essential eating. High-end Nigerian cuisine has found a global audience — restaurants like Nok by Alara in Lagos are drawing international food press.' },
      { type: 'tip', text: 'Practical tips: Book accommodation in Victoria Island or Lekki for the best base. Get a local SIM on arrival. Traffic in Lagos is legendary — allow enormous amounts of time and use Bolt or Uber. Visit November to February for the best weather.' },
    ],
  },
  {
    slug: 'solo-travel-tips-2025',
    title: '10 Rules for Solo Travel in 2025',
    category: 'Travel Tips',
    date: 'May 2025',
    readTime: '7 min',
    excerpt: 'Solo travel has never been more accessible — or more rewarding. These are the principles that experienced solo travellers live by.',
    gradient: 'linear-gradient(135deg,#0a0018,#180030)',
    author: 'HUUBOI Editorial',
    content: [
      { type: 'intro', text: 'Solo travel is the fastest-growing segment in global tourism and for good reason. There is a particular quality of freedom in it — an openness to serendipity, a sharpness of attention and a depth of connection with places that is harder to achieve in a group. These are the principles that make solo travel safe, enjoyable and genuinely life-changing.' },
      { type: 'heading', text: '01. Research neighbourhoods, not just cities' },
      { type: 'text', text: 'Knowing which areas of a city are walkable at night, which have good transport links and which to approach with caution is the foundation of confident solo travel. This research takes one evening before you fly and pays dividends every day of your trip.' },
      { type: 'heading', text: '02. Stay in boutique hotels or small guesthouses' },
      { type: 'text', text: 'Large chain hotels are anonymous. Small boutique properties mean staff who know your name, genuine local recommendations and often a communal breakfast table where solo travellers naturally connect. The owner of a small guesthouse is usually the best guide to a city you will ever meet.' },
      { type: 'heading', text: '03. Get a travel eSIM before you land' },
      { type: 'text', text: 'Being connected from the moment you step off the plane — maps working, translation ready, Uber loaded — removes enormous friction from solo travel. A travel eSIM costs $10–30 for a week of data and is activated before departure. The alternative — searching for a SIM shop while jetlagged in an unfamiliar airport — is entirely avoidable.' },
      { type: 'heading', text: '04. Say yes to the first invitation' },
      { type: 'text', text: 'The most memorable solo travel experiences come from unexpected connections — the guesthouse owner who invites you to a family dinner, the fellow traveller who suggests a beach you had not heard of, the local who offers to show you the neighbourhood. Solo travel makes you more approachable and more open. Use that.' },
      { type: 'heading', text: '05. Share your itinerary with someone at home' },
      { type: 'text', text: 'Not for safety theatre but for genuine peace of mind — yours and theirs. A simple "I\'m in X, heading to Y tomorrow, staying at Z" message costs nothing and means someone knows where you are. This one habit removes most of the anxiety solo travel generates in the people who love you.' },
      { type: 'tip', text: 'The best solo travel destinations in 2025: Japan (supremely safe, easy to navigate, endlessly interesting), Portugal (warm, welcoming, excellent value), Bali (infrastructure built for independent travellers), Colombia (transformed in the last decade — Cartagena and Medellín are outstanding) and Morocco (challenging but deeply rewarding).' },
    ],
  },
]

const categories = ['All', 'Destination Guide', 'Adventure', 'Safari', 'Culture', 'Wellness', 'Travel Tips']

export default function BlogPage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = posts.filter(p => {
    const matchCat = filter === 'All' || p.category === filter
    const matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const [featured, ...rest] = filtered

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 80 }}>

      {/* Hero */}
      <div style={{ background: '#0d0c0a', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,60px)', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            TRAVEL INTELLIGENCE
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 24 }}>
            The <em style={{ color: gold, fontStyle: 'italic' }}>Journal</em>
          </h1>
          <p style={{ color: muted, maxWidth: 560, lineHeight: 1.8, fontSize: 'clamp(0.9rem,2vw,1.05rem)' }}>
            Destination guides, insider tips, and travel stories from across six continents.
          </p>
        </div>
      </div>

      {/* Filters + search */}
      <div style={{ padding: '28px clamp(20px,5vw,60px)', borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ display: 'flex', gap: 12, maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.63rem', letterSpacing: '0.18em', padding: '7px 16px', background: filter === cat ? gold : 'transparent', color: filter === cat ? '#080807' : muted, border: `1px solid ${filter === cat ? gold : 'rgba(200,169,110,0.2)'}`, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                {cat}
              </button>
            ))}
          </div>
          <input placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', color: cream, padding: '7px 16px', fontSize: '0.85rem', outline: 'none', fontFamily: "'DM Sans',sans-serif", width: 200 }} />
        </div>
      </div>

      <div style={{ padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,60px)', maxWidth: 1200, margin: '0 auto' }}>

        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', background: '#111110', border: '1px solid rgba(200,169,110,0.15)', overflow: 'hidden' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.15)')}>
              <div style={{ height: 'clamp(200px,30vw,360px)', background: featured.gradient, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,transparent,rgba(8,8,7,0.3))' }} />
                <div style={{ position: 'absolute', top: 24, left: 24 }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, border: '1px solid rgba(200,169,110,0.5)', padding: '4px 12px' }}>FEATURED</span>
                </div>
              </div>
              <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: gold, marginBottom: 14 }}>{featured.category} · {featured.date} · {featured.readTime} read</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600, color: cream, lineHeight: 1.2, marginBottom: 16 }}>{featured.title}</h2>
                <p style={{ color: muted, lineHeight: 1.75, fontSize: '0.92rem', marginBottom: 24 }}>{featured.excerpt}</p>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: gold, borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 2, alignSelf: 'flex-start' }}>READ ARTICLE →</span>
              </div>
            </div>
          </Link>
        )}

        {/* Articles count */}
        {filtered.length > 0 && (
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: dim, marginBottom: 20 }}>
            {rest.length} MORE ARTICLE{rest.length !== 1 ? 'S' : ''}
          </div>
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: 2 }}>
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', height: '100%', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                <div style={{ height: 160, background: post.gradient, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.5),transparent)' }} />
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.18em', color: gold, marginBottom: 10 }}>{post.category} · {post.date} · {post.readTime} read</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontWeight: 600, color: cream, lineHeight: 1.3, marginBottom: 10 }}>{post.title}</h3>
                  <p style={{ color: muted, fontSize: '0.85rem', lineHeight: 1.65, marginBottom: 18 }}>{post.excerpt}</p>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, borderBottom: '1px solid rgba(200,169,110,0.3)', paddingBottom: 2 }}>READ MORE →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: muted, fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', fontStyle: 'italic' }}>
            No articles found — try a different search or category
          </div>
        )}

        {/* Newsletter strip */}
        <div style={{ marginTop: 80, background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: gold, marginBottom: 12 }}>STAY INSPIRED</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: cream, marginBottom: 12 }}>
            New articles every <em style={{ color: gold }}>week</em>
          </h3>
          <p style={{ color: muted, marginBottom: 28, fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 400, margin: '0 auto 28px' }}>
            Destination guides, travel tips and exclusive deals delivered to your inbox.
          </p>
          <div style={{ display: 'flex', maxWidth: 460, margin: '0 auto', gap: 0 }}>
            <input type="email" placeholder="your@email.com"
              style={{ flex: 1, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.25)', borderRight: 'none', color: cream, padding: '14px 20px', fontSize: '0.9rem', outline: 'none', fontFamily: "'DM Sans',sans-serif", minWidth: 0 }} />
            <button style={{ background: gold, color: '#080807', border: 'none', padding: '0 24px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              SUBSCRIBE
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}