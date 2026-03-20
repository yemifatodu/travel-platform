'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const guides = [
  {
    slug: 'dubai-luxury-guide',
    title: 'The Ultimate Dubai Luxury Guide',
    subtitle: 'How to experience the world\'s most extravagant city — from private desert camps to rooftop infinity pools',
    region: 'Middle East',
    destination: 'Dubai, UAE',
    category: 'Luxury',
    readTime: '8 min read',
    gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)',
    sections: [
      { heading: 'When to Go', body: 'November to March is peak season — temperatures are perfect at 20–28°C and the city comes alive with events, outdoor dining and the Dubai Shopping Festival. Avoid June to August when temperatures exceed 40°C.' },
      { heading: 'Where to Stay', body: 'The Burj Al Arab remains the global icon of ultra-luxury. Atlantis The Royal is the newest ultra-luxury resort with jaw-dropping architecture. For something more intimate, the Four Seasons DIFC and the Address Downtown both offer exceptional service in prime locations.' },
      { heading: 'Must-Do Experiences', body: 'A private desert safari with overnight glamping under the stars. Dinner at Nobu, Zuma or Nusr-Et overlooking the Marina. The Burj Khalifa observation deck at sunset. A private yacht charter along Dubai Creek. Shopping at The Dubai Mall and the old Gold and Spice Souks in Deira.' },
      { heading: 'Getting Around', body: 'Dubai\'s metro is modern and affordable, connecting major attractions. Taxis and Careem (the regional Uber) are widely available and inexpensive. For luxury, hire a private car with driver for the day — most high-end hotels can arrange this.' },
      { heading: 'Money & Budgeting', body: 'Dubai is expensive but not as expensive as many assume. Budget $250–400 per person per day for a luxury experience including a 5-star hotel, meals at quality restaurants and activities. The UAE has no income or sales tax — prices are as listed.' },
    ],
    tips: ['Book Burj Khalifa tickets weeks in advance — they sell out fast', 'Friday brunch is a Dubai institution — try it at Cé La Vi or Sass Café', 'Dress modestly when visiting souks or older neighbourhoods', 'The Dubai Metro is air-conditioned and far faster than taxis during rush hour'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'bali-complete-guide',
    title: 'Bali: The Complete Travel Guide',
    subtitle: 'Temples, rice terraces, world-class surf and spiritual retreats — everything you need to know',
    region: 'Asia',
    destination: 'Bali, Indonesia',
    category: 'Culture & Nature',
    readTime: '10 min read',
    gradient: 'linear-gradient(160deg,#001a08,#002d10,#00401a)',
    sections: [
      { heading: 'When to Go', body: 'April to October is the dry season and the best time to visit. July and August are peak months — expect higher prices and crowds but guaranteed sunshine. May, June and September are the sweet spot: dry weather with fewer tourists and better rates.' },
      { heading: 'Where to Stay', body: 'Seminyak and Canggu are Bali\'s trendiest areas with great restaurants, beach clubs and boutique hotels. Ubud is the cultural heart — ideal for rice terrace walks and yoga retreats. Nusa Dua is the luxury resort strip, calmer and more family-friendly. The Mulia, Four Seasons Jimbaran and COMO Uma Ubud are the top luxury picks.' },
      { heading: 'Must-Do Experiences', body: 'Sunrise hike up Mount Batur (2,000m) for views above the clouds. Tegalalang Rice Terrace at golden hour. Tanah Lot sea temple at sunset. A traditional Balinese cooking class. White water rafting on the Ayung River. Snorkelling or diving at Nusa Penida to swim with manta rays.' },
      { heading: 'Food & Dining', body: 'Do not leave without trying nasi goreng (fried rice), babi guling (suckling pig) and satay lilit at a local warung. For fine dining, Locavore in Ubud is Bali\'s best restaurant. La Brisa and Motel Mexicola in Seminyak are unmissable for atmosphere.' },
      { heading: 'Getting Around', body: 'Hire a private driver for the day ($35–50) for maximum flexibility. Grab (the local Uber) works well in Seminyak and Ubud. Scooter rental is popular but only recommended if you have riding experience — traffic can be chaotic.' },
    ],
    tips: ['Respect temple dress codes — always carry a sarong', 'Negotiate at markets but with a smile — it\'s expected', 'Get a local SIM or Bali eSIM on arrival for cheap data', 'Try to visit temples early morning before tour groups arrive'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'safari-kenya-guide',
    title: 'Kenya Safari: The Definitive Guide',
    subtitle: 'Witness the Great Migration and the Big Five — how to plan the perfect African safari',
    region: 'Africa',
    destination: 'Masai Mara, Kenya',
    category: 'Wildlife & Safari',
    readTime: '12 min read',
    gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)',
    sections: [
      { heading: 'When to Go', body: 'The Great Wildebeest Migration runs year-round but the famous river crossings — where millions of wildebeest cross the Mara River under attack from crocodiles — happen July to October. This is the absolute peak season. January to March is excellent for predator sightings and has fewer tourists.' },
      { heading: 'Which Camp to Choose', body: 'The Masai Mara has camps ranging from tented bush camps to ultra-luxury lodges. &Beyond Kichwa Tembo, Governors\' Camp and Mahali Mzuri (Richard Branson\'s camp) are among the finest. Book at least 6 months ahead for peak season — the best camps sell out quickly.' },
      { heading: 'What to Expect', body: 'Safari days start early — 6am game drives are when predators are most active. A typical day includes two 3-hour game drives (morning and evening), meals at camp, and afternoon relaxation. Experienced guides will find lion prides, cheetah families and elephant herds with remarkable reliability.' },
      { heading: 'Beyond the Mara', body: 'Combine the Masai Mara with a stay on the Kenyan coast — Diani Beach is a world-class tropical beach just 90 minutes from Mombasa. Or add Amboseli National Park for stunning views of Kilimanjaro with elephants in the foreground.' },
      { heading: 'Budget & Booking', body: 'Kenya safari is not cheap — expect $400–800 per person per night at a quality tented camp, inclusive of game drives, meals and park fees. However, the experience is genuinely life-changing and comparable to nowhere else on earth.' },
    ],
    tips: ['Pack neutral colours — khaki, olive and brown. Avoid bright colours', 'Bring a quality zoom lens if you are a photographer — 200mm minimum', 'Yellow Fever vaccination required for Kenya entry', 'Combine with Zanzibar or the Kenyan coast for a beach finish'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'morocco-travel-guide',
    title: 'Morocco: Medinas, Sahara & the Atlas',
    subtitle: 'From the blue streets of Chefchaouen to sleeping under stars in the Sahara Desert',
    region: 'Africa',
    destination: 'Marrakech & Beyond',
    category: 'Culture & Adventure',
    readTime: '9 min read',
    gradient: 'linear-gradient(160deg,#200800,#381200,#501c00)',
    sections: [
      { heading: 'When to Go', body: 'March to May and September to November are the best times — warm, sunny and comfortable. Ramadan can be a beautiful time to visit for cultural immersion but note that many restaurants close during daylight hours. Summer (June–August) is extremely hot inland but manageable on the coast.' },
      { heading: 'Marrakech Essentials', body: 'Stay inside or near the medina for the full experience — Riad Yasmine, El Fenn and La Mamounia (the grand dame of Moroccan hotels) are all outstanding. Spend a morning getting lost in the souks, visit the Bahia Palace and Majorelle Garden, and end at Djemaa el-Fna square at dusk for storytellers and food stalls.' },
      { heading: 'The Sahara Desert', body: 'A 3-day trip from Marrakech or Fes to the Erg Chebbi dunes at Merzouga is unmissable. Ride camels at sunset, sleep in a luxury desert camp under impossible stars and watch the sunrise paint the dunes gold. Longer routes through the Draa Valley and Todra Gorge are equally spectacular.' },
      { heading: 'Chefchaouen & the North', body: 'The blue-painted mountain town of Chefchaouen is one of Africa\'s most photogenic places. Combine with Fes — Morocco\'s oldest city and home to the world\'s oldest university and the vast, medieval Fes el Bali medina.' },
      { heading: 'Food & Drink', body: 'Moroccan cuisine is extraordinary — tagine, couscous, b\'stilla (sweet pigeon pastry) and harira soup. Drink sweet mint tea everywhere. The best food is often in traditional riads and local restaurants in the medina — avoid tourist traps on the main squares.' },
    ],
    tips: ['Bargaining is expected everywhere — start at 40% of the asking price', 'Book a local guide for the Fes medina — it is genuinely easy to get lost', 'Morocco is largely cash-based — change money at banks not street changers', 'A grand taxi between cities is cheap and authentic'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'japan-first-time-guide',
    title: 'Japan for First-Time Visitors',
    subtitle: 'Tokyo, Kyoto, Osaka and beyond — your complete first-timer\'s guide to Japan',
    region: 'Asia',
    destination: 'Japan',
    category: 'Culture & Food',
    readTime: '11 min read',
    gradient: 'linear-gradient(160deg,#200015,#380025,#4a0033)',
    sections: [
      { heading: 'When to Go', body: 'Cherry blossom season (late March to mid-April) is magical but extremely popular — book flights and hotels 6+ months ahead. Autumn foliage (late October to mid-November) is equally beautiful with fewer crowds. Winter is excellent for snow festivals in Hokkaido and skiing.' },
      { heading: '2-Week Itinerary', body: 'Days 1–5 Tokyo: Shibuya crossing, Senso-ji temple in Asakusa, teamLab digital art museum, Tsukiji outer market, Harajuku and Shinjuku. Days 6–8 Kyoto: Fushimi Inari shrine (go at dawn), Arashiyama bamboo grove, Nishiki Market, geisha district of Gion. Days 9–10 Nara and Osaka: feed deer in Nara Park, eat your way through Dotonbori in Osaka.' },
      { heading: 'Transport', body: 'Buy a Japan Rail Pass before you leave home — it covers the famous Shinkansen bullet trains and is extraordinary value for multi-city travel. Within cities, IC cards (Suica or Pasmo) work on all trains, buses and even convenience store payments. Tokyo\'s subway is complex but highly efficient.' },
      { heading: 'Food Culture', body: 'Japan has more Michelin stars than any country on earth. Street food in Tokyo\'s depachika (department store food halls) and Osaka\'s Dotonbori is world-class. Must try: ramen, sushi at Tsukiji, takoyaki (octopus balls), wagyu beef and matcha everything. Convenience stores (7-Eleven, Lawson) serve genuinely excellent food.' },
      { heading: 'Etiquette', body: 'Remove shoes when entering homes and many traditional restaurants. No eating while walking. Queue patiently — Japanese queuing culture is exemplary. Tipping is not practised and can cause offence. Tattoos may restrict access to some onsen (hot spring baths).' },
    ],
    tips: ['Get a pocket WiFi or Japan eSIM — essential for navigation', 'Book popular restaurants online before you arrive — many are fully booked', 'Visit temples and shrines early morning for peaceful, crowd-free experience', 'Cash is still king in Japan — always carry yen'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'maldives-honeymoon-guide',
    title: 'Maldives: The Ultimate Honeymoon Guide',
    subtitle: 'Overwater bungalows, turquoise lagoons and total seclusion — planning your perfect Maldives escape',
    region: 'Asia',
    destination: 'Maldives',
    category: 'Luxury & Romance',
    readTime: '7 min read',
    gradient: 'linear-gradient(160deg,#001828,#002440,#003058)',
    sections: [
      { heading: 'When to Go', body: 'November to April is the dry season with crystal clear water and calm seas — perfect visibility for diving and snorkelling. The wet season (May to October) brings occasional rain but also lower prices and fewer tourists. The Maldives is warm year-round at 28–32°C.' },
      { heading: 'Choosing a Resort', body: 'Each resort in the Maldives is on its own private island — you are completely secluded. Soneva Fushi (barefoot luxury), Gili Lankanfushi (no shoes allowed), The Nautilus and Velaa Private Island are among the finest. Mid-range travellers should consider Cinnamon Hakuraa Huraa or the SAii resorts for excellent value.' },
      { heading: 'Overwater Bungalows', body: 'The iconic overwater bungalow experience is available at most resorts. The best ones have glass floors for watching reef fish, direct ocean access from your deck, outdoor bathtubs and uninterrupted horizon views. Book the sunrise or sunset side depending on your preference.' },
      { heading: 'Activities', body: 'Snorkelling the house reef — most resorts have pristine reefs steps from shore. Diving with whale sharks and manta rays (seasonal). Sunset dolphin cruises. Sandbank picnics — your resort sets up a private lunch on a deserted sandbar. Spa treatments in over-water treatment rooms.' },
      { heading: 'Getting There', body: 'Fly into Malé (MLE). From Malé, you reach your resort by speedboat (30–90 minutes) or seaplane (15–45 minutes). Seaplanes are spectacular but can only fly during daylight — time your connection carefully. Many resorts include transfers in their packages.' },
    ],
    tips: ['Book at least 6 months ahead for peak season and festive periods', 'All-inclusive packages offer best value — food and drink is expensive à la carte', 'Bring underwater camera — the snorkelling is world class', 'Pack light — the Maldives is casual. You won\'t need much beyond swimwear and one smart outfit'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'paris-city-guide',
    title: 'Paris: A City Guide for the Discerning Traveller',
    subtitle: 'Beyond the Eiffel Tower — discovering the Paris that Parisians actually love',
    region: 'Europe',
    destination: 'Paris, France',
    category: 'City Break',
    readTime: '8 min read',
    gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)',
    sections: [
      { heading: 'When to Go', body: 'April to June is the classic Paris season — flowers in bloom, warm sun, café terraces full. September and October are equally lovely with golden light and slightly fewer tourists. Christmas in Paris is magical. Avoid August when many Parisian restaurants and shops close for summer holidays.' },
      { heading: 'Neighbourhoods', body: 'Le Marais for galleries, vintage shopping and the Jewish quarter. Saint-Germain-des-Prés for literary cafés and boutiques. Montmartre for the Sacré-Cœur and village atmosphere. Canal Saint-Martin for hip cafés and young Parisian energy. The 7th arrondissement for the Eiffel Tower and Musée d\'Orsay.' },
      { heading: 'Museums & Culture', body: 'Book the Louvre and Musée d\'Orsay tickets online — queues without pre-booking are brutal. The Musée Picasso, Centre Pompidou and Fondation Louis Vuitton are worth a morning each. For a local experience, explore the smaller museums: Musée Rodin and Musée de l\'Orangerie are gems.' },
      { heading: 'Food & Restaurants', body: 'Paris rewards those who venture off the tourist trail. A classic bistro lunch — steak frites, vin rouge, tarte tatin — in a side street off the main boulevards is the quintessential Paris experience. For fine dining, Guy Savoy, Le Cinq and Septime are among the world\'s best.' },
      { heading: 'Day Trips', body: 'Versailles (45 minutes by RER) is unmissable — book tickets in advance. Giverny (Monet\'s garden) is stunning in spring. Champagne region (1.5 hours by TGV) for vineyard tours and tastings.' },
    ],
    tips: ['Learn a few words of French — effort is always appreciated', 'Biking along the Seine is free with Vélib\' bike share', 'Book popular restaurants at least a week ahead', 'The Paris Museum Pass covers 50+ museums and skips all queues'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'iceland-northern-lights-guide',
    title: 'Iceland: Chasing the Northern Lights',
    subtitle: 'Auroras, glaciers, geysers and midnight sun — your complete Iceland adventure guide',
    region: 'Europe',
    destination: 'Iceland',
    category: 'Adventure',
    readTime: '9 min read',
    gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)',
    sections: [
      { heading: 'When to Go', body: 'For Northern Lights, visit September to March when nights are long and dark. The peak is around the winter solstice (December). For the Midnight Sun and hiking, June to August is spectacular with nearly 24 hours of daylight. The Ring Road (Route 1) is accessible year-round but winter driving requires experience.' },
      { heading: 'Northern Lights Tips', body: 'The Northern Lights (Aurora Borealis) need clear skies and darkness. Download the Aurora Forecast app and head away from city lights when activity is KP3 or above. Þingvellir National Park, the Snæfellsnes Peninsula and Vík are excellent dark sky spots. Be patient — nights without sightings are common.' },
      { heading: 'The Ring Road', body: 'Driving Iceland\'s Ring Road (1,332km) in 7–10 days is the classic way to see the country. Highlights: the Golden Circle (Geysir, Gullfoss waterfall, Þingvellir), Jökulsárlón glacier lagoon, Skógafoss and Seljalandsfoss waterfalls, and the surreal black sand beach at Reynisfjara.' },
      { heading: 'Activities', body: 'Snorkelling in Silfra fissure (between the American and Eurasian tectonic plates in crystal clear water). Glacier hiking on Vatnajökull. Whale watching from Húsavík. Ice caving in winter. Geothermal baths — the Sky Lagoon in Reykjavik and the remote Landmannalaugar hot springs.' },
      { heading: 'Budget & Costs', body: 'Iceland is expensive — budget $200–350 per person per day including a mid-range guesthouse, rental car, petrol and meals. Cooking your own meals in guesthouse kitchens cuts costs significantly. Petrol is expensive — fill up in towns, not at highway stations.' },
    ],
    tips: ['Book accommodation months ahead — Iceland is hugely popular and rural guesthouses fill fast', 'Pack waterproof layers even in summer — weather changes in minutes', 'Northern Lights tours from Reykjavik run nightly in winter', 'A 4WD is essential if you plan to drive the highland roads (F-roads)'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'machu-picchu-guide',
    title: 'Machu Picchu: The Sacred Valley Guide',
    subtitle: 'Inca citadels, mountain railways and the ancient city in the clouds',
    region: 'Americas',
    destination: 'Peru',
    category: 'Adventure & History',
    readTime: '10 min read',
    gradient: 'linear-gradient(160deg,#060e00,#0c1c00,#122600)',
    sections: [
      { heading: 'When to Go', body: 'May to September is the dry season — best weather for hiking the Inca Trail and visiting Machu Picchu. June and July are the busiest months. April and October offer good weather with fewer crowds. Avoid January and February when heavy rains can cause trail closures.' },
      { heading: 'Getting There', body: 'Fly to Lima, then connect to Cusco (1.5 hours). Acclimatise in Cusco for 2–3 days at 3,400m — altitude sickness is real and ruins trips if ignored. Then take the PeruRail or Inca Rail scenic train (3.5 hours) through the Sacred Valley to Aguas Calientes, the gateway town to Machu Picchu.' },
      { heading: 'Machu Picchu Itself', body: 'Book tickets online at machupicchutickets.com — only 5,940 visitors per day are allowed and they sell out weeks ahead. Arrive at 6am when the site opens to beat crowds and catch morning mist over the citadel. Hire a licensed guide for 2–3 hours to understand what you are seeing — it transforms the experience.' },
      { heading: 'The Inca Trail', body: 'The classic 4-day Inca Trail trek is one of the world\'s great hikes — passing Inca ruins, cloud forest and mountain passes before the dramatic Sun Gate entrance to Machu Picchu. It must be booked through a licensed operator, 6+ months ahead. Permits are strictly limited.' },
      { heading: 'Sacred Valley', body: 'Spend 2–3 days in the Sacred Valley before Machu Picchu: Pisac market and ruins, Ollantaytambo fortress and the salt mines of Maras and the circular terraces of Moray are all extraordinary. Stay at Explora Valle Sagrado or Inkaterra Hacienda Urubamba for a luxurious base.' },
    ],
    tips: ['Take altitude sickness medication (Diamox) if prescribed by your doctor', 'No tripods allowed inside Machu Picchu — use a handheld stabiliser', 'Hire a guide at the entrance — unlicensed guides are not permitted', 'The Huayna Picchu and Machu Picchu Mountain hikes require separate tickets'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
  {
    slug: 'santorini-greek-islands',
    title: 'Santorini & the Greek Islands',
    subtitle: 'White-washed villages, sunsets over the caldera and island-hopping by ferry',
    region: 'Europe',
    destination: 'Greece',
    category: 'Beach & Romance',
    readTime: '8 min read',
    gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)',
    sections: [
      { heading: 'When to Go', body: 'May, June and September are the best months — warm enough to swim, less crowded than peak July and August, and accommodation prices are 30–40% lower. October is beautiful with warm sea temperatures and very few tourists. Avoid the August peak if you dislike crowds.' },
      { heading: 'Santorini Highlights', body: 'Oia at sunset is one of the world\'s great spectacles — arrive 2 hours early to claim your spot. The caldera views from Fira and Imerovigli are equally dramatic. Black sand beaches at Perissa and Perivolos. Akrotiri — the Minoan city buried by volcanic ash, often called the "Greek Pompeii". Wine tasting at Santo Wines or Venetsanos winery.' },
      { heading: 'Island Hopping', body: 'Combine Santorini with Mykonos (cosmopolitan nightlife), Paros (relaxed and beautiful), Naxos (largest island, best food), Milos (dramatic volcanic scenery and lunar beaches) and Folegandros (the quiet, authentic island). Ferries connect all islands — book Hellenic Seaways or Blue Star in advance in summer.' },
      { heading: 'Where to Stay', body: 'For the classic caldera view, stay in Oia, Imerovigli or Fira. Cave hotels carved into the volcanic cliff (caldera properties) are the most dramatic — Grace Hotel, Katikies and Canaves Oia Suites are the finest. Budget travellers get equally stunning views staying in Firostefani.' },
      { heading: 'Food & Wine', body: 'Santorini\'s volcanic soil produces unique wines — Assyrtiko white wine is crisp, mineral and perfect with seafood. Try fava (yellow split pea purée), tomatokeftedes (tomato fritters) and fresh grilled octopus. For the best meals, explore restaurants away from the main caldera strip.' },
    ],
    tips: ['Book caldera-view accommodation 3–6 months ahead for summer', 'Rent an ATV to explore the island at your own pace', 'The ferry from Athens (Piraeus) to Santorini takes 5–8 hours — book ahead', 'Avoid driving in Oia — parking is impossible. Walk or take the cable car'],
    flightLink: 'https://www.aviasales.com/?marker=710879&locale=en',
    hotelLink: 'https://expedia.com/affiliate?siteid=1&landingPage=https%3A%2F%2Fwww.expedia.com&camref=1110lBk7p',
  },
]

const categories = ['All', 'Luxury', 'Culture & Nature', 'Wildlife & Safari', 'Adventure', 'City Break', 'Beach & Romance', 'Culture & Food', 'Luxury & Romance', 'Culture & Adventure', 'Adventure & History']
const regions = ['All', 'Africa', 'Middle East', 'Asia', 'Europe', 'Americas']

export default function TravelGuides() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')
  const [openGuide, setOpenGuide] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = guides.filter(g => {
    const matchRegion = activeRegion === 'All' || g.region === activeRegion
    const matchCategory = activeCategory === 'All' || g.category === activeCategory
    const matchSearch = search === '' || g.title.toLowerCase().includes(search.toLowerCase()) || g.destination.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchCategory && matchSearch
  })

  const currentGuide = guides.find(g => g.slug === openGuide)

  if (currentGuide) {
    return (
      <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(32px,6vw,80px) clamp(20px,5vw,60px)' }}>

          {/* Back button */}
          <button onClick={() => setOpenGuide(null)}
            style={{ background: 'none', border: 'none', color: gold, cursor: 'pointer', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}>
            ← ALL GUIDES
          </button>

          {/* Guide Header */}
          <div style={{ background: currentGuide.gradient, padding: 'clamp(32px,5vw,56px)', marginBottom: 40, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.85) 0%, transparent 70%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', background: 'rgba(200,169,110,0.2)', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '4px 12px' }}>{currentGuide.region}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '4px 12px' }}>{currentGuide.category}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: dim, padding: '4px 0' }}>{currentGuide.readTime}</span>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 16 }}>{currentGuide.title}</h1>
              <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.7, maxWidth: 560 }}>{currentGuide.subtitle}</p>
              <div style={{ marginTop: 20, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.15em', color: dim }}>📍 {currentGuide.destination}</div>
            </div>
          </div>

          {/* Guide Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {currentGuide.sections.map((section, i) => (
              <div key={i} style={{ borderLeft: `2px solid rgba(200,169,110,0.2)`, paddingLeft: 24 }}>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', color: gold, marginBottom: 14 }}>{section.heading}</h2>
                <p style={{ color: muted, lineHeight: 1.9, fontSize: '0.97rem' }}>{section.body}</p>
              </div>
            ))}

            {/* Tips */}
            <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.15)', padding: 'clamp(24px,3vw,36px)' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>✦ INSIDER TIPS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {currentGuide.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ color: gold, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.1em', minWidth: 24, marginTop: 2 }}>0{i + 1}</span>
                    <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* eSIM tip */}
            <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', color: gold, marginBottom: 4 }}>📱 STAY CONNECTED IN {currentGuide.destination.toUpperCase()}</div>
                <p style={{ color: muted, fontSize: '0.85rem', margin: 0 }}>Get an instant travel eSIM — no roaming fees, activate before you fly</p>
              </div>
              <Link href="/esim" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.15em', background: gold, color: '#080807', padding: '11px 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}>GET ESIM</Link>
            </div>

            {/* CTAs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8 }}>
              <a href={currentGuide.flightLink} target="_blank" rel="noopener noreferrer"
                style={{ background: gold, color: '#080807', padding: '16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.18em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                ✈ SEARCH FLIGHTS
              </a>
              <a href={currentGuide.hotelLink} target="_blank" rel="noopener noreferrer"
                style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.4)', color: gold, padding: '16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.18em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                🏨 SEARCH HOTELS
              </a>
              <Link href="/budget-calculator"
                style={{ background: 'transparent', border: '1px solid rgba(200,169,110,0.2)', color: muted, padding: '16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.18em', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                💰 BUDGET CALCULATOR
              </Link>
            </div>

            {/* More guides */}
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: gold, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(200,169,110,0.1)' }}>MORE GUIDES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 8 }}>
                {guides.filter(g => g.slug !== currentGuide.slug).slice(0, 4).map(g => (
                  <button key={g.slug} onClick={() => { setOpenGuide(g.slug); window.scrollTo(0, 0) }}
                    style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '16px', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: gold, marginBottom: 6 }}>{g.region}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: cream, lineHeight: 1.3 }}>{g.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            EXPERT TRAVEL GUIDES
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: cream, lineHeight: 1, margin: 0 }}>
              Travel <em style={{ color: gold }}>Guides</em>
            </h1>
            <p style={{ color: muted, fontSize: '0.9rem', maxWidth: 360, lineHeight: 1.7, margin: 0 }}>
              In-depth guides for {guides.length} destinations — written by experienced travellers.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {regions.map(r => (
              <button key={r} onClick={() => setActiveRegion(r)}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', padding: '7px 14px', background: activeRegion === r ? gold : 'transparent', border: `1px solid ${activeRegion === r ? gold : 'rgba(200,169,110,0.2)'}`, color: activeRegion === r ? '#080807' : muted, cursor: 'pointer', transition: 'all 0.2s' }}>
                {r}
              </button>
            ))}
          </div>
          <input placeholder="Search guides..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', color: cream, padding: '7px 14px', fontSize: '0.85rem', outline: 'none', fontFamily: "'DM Sans',sans-serif", width: 200 }} />
        </div>

        {/* Guides count */}
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: dim, marginBottom: 20 }}>
          {filtered.length} GUIDE{filtered.length !== 1 ? 'S' : ''} FOUND
        </div>

        {/* Guide Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 2 }}>
          {filtered.map(guide => (
            <button key={guide.slug} onClick={() => { setOpenGuide(guide.slug); window.scrollTo(0, 0) }}
              style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', overflow: 'hidden', height: '100%', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>

                {/* Colour banner */}
                <div style={{ background: guide.gradient, height: 120, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.7) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', color: gold }}>📍 {guide.destination}</div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '22px 22px 24px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.12em', background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)', color: gold, padding: '3px 10px' }}>{guide.region}</span>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em', color: dim, padding: '3px 0' }}>{guide.readTime}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2vw,1.35rem)', fontWeight: 600, color: cream, lineHeight: 1.25, marginBottom: 10 }}>{guide.title}</h2>
                  <p style={{ color: muted, fontSize: '0.83rem', lineHeight: 1.65, marginBottom: 18 }}>{guide.subtitle}</p>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', color: gold }}>READ GUIDE →</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: muted, fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', fontStyle: 'italic' }}>
            No guides found — try adjusting your filters
          </div>
        )}

      </div>
    </div>
  )
}

