-- ══════════════════════════════════════════════════════════════════
-- [YOUR BRAND] — 30 Featured Destinations Seed
-- Run AFTER schema.sql and seed_countries.sql
-- ══════════════════════════════════════════════════════════════════

INSERT INTO public.destinations (name, slug, continent, tagline, description, is_featured, is_published, best_time, avg_budget, meta_title, meta_desc) VALUES

-- ── MIDDLE EAST ──
('Dubai',           'dubai',            'Middle East', 'Gold, Desert & Infinite Luxury',          'Ultramodern skylines meeting ancient desert culture. The world''s most audacious city.',                    TRUE,  TRUE, 'Oct–Apr', '$150–$500/day', 'Dubai Travel Guide',       'Discover the best of Dubai.'),
('Abu Dhabi',       'abu-dhabi',        'Middle East', 'Grandeur Meets Tradition',                'The UAE''s capital blends Sheikh Zayed''s majestic mosque with Formula 1 racing and desert safaris.',       TRUE,  TRUE, 'Oct–Apr', '$120–$450/day', 'Abu Dhabi Travel Guide',   'Explore Abu Dhabi''s culture and luxury.'),
('Petra',           'petra',            'Middle East', 'The Rose-Red City of Stone',              'An ancient Nabataean city carved into rose-coloured rock — one of the world''s greatest archaeological wonders.', TRUE,  TRUE, 'Mar–May', '$60–$200/day',  'Petra Jordan Travel Guide','Visit the ancient wonder of Petra.'),
('Riyadh',          'riyadh',           'Middle East', 'Saudi Arabia''s Awakening Capital',       'A city rapidly transforming — ancient forts, futuristic towers, and world-class hospitality.',               FALSE, TRUE, 'Nov–Feb', '$100–$400/day', 'Riyadh Travel Guide',      'Explore Saudi Arabia''s capital.'),
('Muscat',          'muscat',           'Middle East', 'Arabian Elegance by the Sea',             'Oman''s capital is a treasure of whitewashed mosques, souqs, and dramatic mountain coastlines.',              TRUE,  TRUE, 'Oct–Apr', '$80–$250/day',  'Muscat Oman Travel Guide', 'Discover Muscat''s charm and culture.'),

-- ── AFRICA ──
('Serengeti',       'serengeti',        'Africa',      'The Greatest Show on Earth',              'Home to the most spectacular wildlife migration — millions of wildebeest, zebra, and the big cats that follow.', TRUE,  TRUE, 'Jun–Oct', '$300–$800/day', 'Serengeti Safari Guide',   'Plan your Serengeti wildlife safari.'),
('Cape Town',       'cape-town',        'Africa',      'Where Mountains Meet the Ocean',          'One of the world''s most beautiful cities — Table Mountain, white beaches, vineyards, and vibrant culture.',   TRUE,  TRUE, 'Nov–Mar', '$80–$300/day',  'Cape Town Travel Guide',   'Explore Cape Town''s natural beauty.'),
('Marrakech',       'marrakech',        'Africa',      'The Red City of a Thousand Colours',      'A sensory explosion of spice-filled souqs, ornate riads, and the legendary Djemaa el-Fna square.',            TRUE,  TRUE, 'Oct–Apr', '$50–$200/day',  'Marrakech Travel Guide',   'Discover the magic of Marrakech.'),
('Zanzibar',        'zanzibar',         'Africa',      'Spice Island Paradise',                   'White-sand beaches, turquoise Indian Ocean waters, and a UNESCO World Heritage Stone Town.',                   TRUE,  TRUE, 'Jun–Oct', '$80–$250/day',  'Zanzibar Travel Guide',    'Plan your Zanzibar beach escape.'),
('Victoria Falls',  'victoria-falls',   'Africa',      'The Smoke That Thunders',                 'One of the seven natural wonders — the world''s largest waterfall on the Zimbabwe–Zambia border.',             TRUE,  TRUE, 'Feb–May', '$100–$400/day', 'Victoria Falls Guide',     'Visit the majestic Victoria Falls.'),
('Rwandan Gorillas','rwanda-gorillas',  'Africa',      'Face to Face with Mountain Gorillas',     'The rare and profound experience of trekking through Volcanoes National Park to meet mountain gorillas.',       TRUE,  TRUE, 'Jun–Sep', '$500–$1500/day','Rwanda Gorilla Trekking',  'Book a gorilla trekking experience.'),

-- ── ASIA ──
('Kyoto',           'kyoto',            'Asia',        'Where Ancient Japan Lives On',            'A city of a thousand temples, geisha districts, bamboo forests, and transcendent seasonal beauty.',            TRUE,  TRUE, 'Mar–May', '$80–$250/day',  'Kyoto Japan Travel Guide', 'Experience ancient Japan in Kyoto.'),
('Bali',            'bali',             'Asia',        'Island of the Gods',                      'Terraced rice paddies, sacred Hindu temples, world-class surf, and a culture unlike anywhere on earth.',        TRUE,  TRUE, 'Apr–Oct', '$50–$200/day',  'Bali Travel Guide',        'Discover Bali''s spiritual beauty.'),
('Tokyo',           'tokyo',            'Asia',        'Future Meets Tradition',                  'The world''s most dynamic megacity — ancient shrines next to neon-lit skyscrapers and Michelin-starred dining.', TRUE,  TRUE, 'Mar–May', '$100–$350/day', 'Tokyo Travel Guide',       'Explore the wonders of Tokyo.'),
('Maldives',        'maldives',         'Asia',        'Paradise Above and Below the Water',      'Overwater villas, crystal lagoons, and the world''s finest coral reefs across 1,200 tropical islands.',         TRUE,  TRUE, 'Nov–Apr', '$300–$1000/day','Maldives Travel Guide',    'Plan your Maldives luxury escape.'),
('Angkor Wat',      'angkor-wat',       'Asia',        'The Lost Temple Kingdom',                 'The world''s largest religious monument — a breathtaking Khmer Empire complex in the jungles of Cambodia.',    TRUE,  TRUE, 'Nov–Mar', '$40–$150/day',  'Angkor Wat Cambodia Guide','Explore the ancient temples of Angkor.'),
('Bhutan',          'bhutan',           'Asia',        'The Last Himalayan Kingdom',              'A land of Tiger''s Nest monasteries, gross national happiness, and pristine Himalayan wilderness.',              TRUE,  TRUE, 'Oct–Dec', '$200–$600/day', 'Bhutan Travel Guide',      'Journey to the Kingdom of Bhutan.'),
('Singapore',       'singapore',        'Asia',        'The City Where Everything Works',         'Ultra-modern architecture, street food paradise, lush gardens, and a melting pot of Asian cultures.',           TRUE,  TRUE, 'Feb–Apr', '$120–$400/day', 'Singapore Travel Guide',   'Discover Singapore''s urban wonders.'),

-- ── EUROPE ──
('Amalfi Coast',    'amalfi-coast',     'Europe',      'Cliffside Villages Above Azure Seas',     'Dramatic coastline, pastel villages, and Mediterranean cuisine along Italy''s most iconic shore.',              TRUE,  TRUE, 'May–Sep', '$120–$400/day', 'Amalfi Coast Italy Guide', 'Explore the stunning Amalfi Coast.'),
('Santorini',       'santorini',        'Europe',      'Blue Domes & Volcanic Sunsets',           'Greece''s most iconic island — volcanic caldera views, white-washed villages, and legendary sunsets.',           TRUE,  TRUE, 'Apr–Oct', '$150–$500/day', 'Santorini Greece Guide',   'Plan your Santorini dream holiday.'),
('Paris',           'paris',            'Europe',      'The City of Light & Love',                'The Eiffel Tower, world-class cuisine, and the most romantic streets on earth. Paris never disappoints.',        TRUE,  TRUE, 'Apr–Jun', '$120–$400/day', 'Paris Travel Guide',       'Explore the magic of Paris.'),
('Swiss Alps',      'swiss-alps',       'Europe',      'Peaks, Chocolate & Mountain Railways',    'Iconic alpine villages, world-class skiing, and breathtaking scenery across the roof of Europe.',                TRUE,  TRUE, 'Dec–Mar', '$200–$600/day', 'Swiss Alps Travel Guide',  'Discover the Swiss Alps adventure.'),
('Prague',          'prague',           'Europe',      'The City of a Hundred Spires',            'A fairy-tale medieval city of Gothic architecture, cobblestone lanes, and legendary Czech hospitality.',          FALSE, TRUE, 'Apr–Oct', '$60–$200/day',  'Prague Travel Guide',      'Explore Prague''s medieval charm.'),
('Dubrovnik',       'dubrovnik',        'Europe',      'The Pearl of the Adriatic',               'Croatia''s walled old city rising above the impossibly blue Adriatic Sea.',                                       TRUE,  TRUE, 'May–Sep', '$80–$300/day',  'Dubrovnik Croatia Guide',  'Discover Dubrovnik''s beauty.'),
('Iceland',         'iceland',          'Europe',      'Fire, Ice & Northern Lights',             'Volcanoes, geysers, waterfalls, midnight sun, and some of the world''s most dramatic landscapes.',               TRUE,  TRUE, 'Jun–Aug', '$150–$500/day', 'Iceland Travel Guide',     'Plan your Iceland adventure.'),

-- ── AMERICAS ──
('Patagonia',       'patagonia',        'Americas',    'At the End of the World',                 'Wild glaciers, jagged peaks, and untamed steppe at the southern tip of South America.',                          TRUE,  TRUE, 'Nov–Mar', '$80–$300/day',  'Patagonia Travel Guide',   'Explore Patagonia''s wild landscapes.'),
('Machu Picchu',    'machu-picchu',     'Americas',    'The Lost City of the Incas',              'One of humanity''s greatest achievements — an ancient Inca citadel set high in the Andean cloud forest.',        TRUE,  TRUE, 'Apr–Oct', '$80–$250/day',  'Machu Picchu Peru Guide',  'Visit the iconic Machu Picchu.'),
('New York City',   'new-york-city',    'Americas',    'The City That Never Sleeps',              'The world''s cultural capital — Times Square, Central Park, the Met, and the most iconic skyline on earth.',      TRUE,  TRUE, 'Apr–Jun', '$150–$500/day', 'New York City Travel Guide','Explore the best of New York City.'),
('Galápagos Islands','galapagos',       'Americas',    'Darwin''s Living Laboratory',             'The world''s greatest natural sanctuary — giant tortoises, marine iguanas, and pristine volcanic archipelago.',   TRUE,  TRUE, 'Jun–Nov', '$200–$600/day', 'Galápagos Islands Guide',  'Discover the unique Galápagos wildlife.'),
('Cuba',            'cuba',             'Americas',    'Vintage Cars & Caribbean Soul',           'Havana''s crumbling colonial grandeur, salsa rhythms, pristine beaches, and a culture frozen in time.',           FALSE, TRUE, 'Nov–Apr', '$60–$200/day',  'Cuba Travel Guide',        'Explore the vibrant culture of Cuba.'),

-- ── ARCTIC ──
('Svalbard',        'svalbard',         'Arctic',      'Polar Bears & Northern Lights',           'One of the world''s last true wilderness frontiers — an Arctic archipelago of raw, brutal beauty.',               TRUE,  TRUE, 'Feb–Apr', '$200–$600/day', 'Svalbard Arctic Guide',    'Plan your Arctic Svalbard expedition.')

ON CONFLICT (slug) DO UPDATE SET
  name        = EXCLUDED.name,
  tagline     = EXCLUDED.tagline,
  description = EXCLUDED.description,
  best_time   = EXCLUDED.best_time,
  avg_budget  = EXCLUDED.avg_budget,
  is_featured = EXCLUDED.is_featured;

-- Summary
SELECT continent, COUNT(*) as destinations
FROM public.destinations
GROUP BY continent
ORDER BY destinations DESC;
