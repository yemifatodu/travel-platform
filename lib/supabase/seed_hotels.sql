-- ══════════════════════════════════════════════════════════════════
-- Huuboi Stays — Sample Hotels + Rooms Seed
-- Run in the Supabase SQL Editor AFTER schema.sql.
-- Safe to re-run: hotels are upserted on slug, rooms are cleared and
-- re-inserted per hotel so running this twice won't duplicate rows.
-- ══════════════════════════════════════════════════════════════════

-- 1. Hotels ----------------------------------------------------------

INSERT INTO public.hotels
  (name, slug, category, star_rating, description, address, cover_image, gallery, amenities, avg_rating, review_count, is_featured, is_published)
VALUES
  ('Four Seasons Safari Lodge', 'four-seasons-safari-lodge', 'safari_lodge', 5,
   'An intimate luxury lodge overlooking the Serengeti plains, with an infinity pool positioned for front-row views of the wildebeest migration.',
   'Serengeti National Park, Tanzania',
   'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
   ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'],
   ARRAY['Infinity Pool', 'Game Drives', 'Spa', 'Free Wi-Fi', 'All-Inclusive Dining'],
   4.8, 214, TRUE, TRUE),

  ('Soneva Fushi', 'soneva-fushi', 'resort', 5,
   'Private overwater villas with glass floors and direct lagoon access, set on a private island in the Baa Atoll.',
   'Baa Atoll, Maldives',
   'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80',
   ARRAY['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80'],
   ARRAY['Private Beach', 'Overwater Villas', 'Snorkeling', 'Spa', 'Free Wi-Fi'],
   4.9, 342, TRUE, TRUE),

  ('Aman Tokyo', 'aman-tokyo', 'hotel', 5,
   'Minimalist Japanese luxury on the 33rd floor of the Otemachi Tower, with sweeping views toward Mount Fuji on clear days.',
   'Otemachi, Tokyo, Japan',
   'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
   ARRAY['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80'],
   ARRAY['City Views', 'Onsen Spa', 'Fine Dining', 'Free Wi-Fi', 'Fitness Center'],
   4.9, 187, TRUE, TRUE),

  ('Katikies Oia', 'katikies-oia', 'boutique', 5,
   'Carved into the caldera cliff face in Oia, home to one of the most photographed sunset views in the world.',
   'Oia, Santorini, Greece',
   'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
   ARRAY['https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'],
   ARRAY['Caldera View', 'Infinity Pool', 'Free Wi-Fi', 'Breakfast Included'],
   4.7, 298, TRUE, TRUE),

  ('Belmond Copacabana Palace', 'belmond-copacabana-palace', 'hotel', 5,
   'Rio''s legendary beachfront art deco palace, overlooking Copacabana Beach since 1923.',
   'Copacabana, Rio de Janeiro, Brazil',
   'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
   ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'],
   ARRAY['Beachfront', 'Pool', 'Spa', 'Free Wi-Fi', 'Fine Dining'],
   4.6, 421, FALSE, TRUE),

  ('Giraffe Manor', 'giraffe-manor', 'boutique', 5,
   'An iconic colonial-era manor where resident Rothschild giraffes greet guests at breakfast.',
   'Nairobi, Kenya',
   'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
   ARRAY['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'],
   ARRAY['Wildlife Encounters', 'Garden', 'Free Wi-Fi', 'Breakfast Included'],
   4.9, 156, FALSE, TRUE),

  ('The Ritz-Carlton Kyoto', 'ritz-carlton-kyoto', 'hotel', 5,
   'Traditional Japanese aesthetics meet modern luxury on the banks of the Kamogawa River in central Kyoto.',
   'Kamogawa Riverside, Kyoto, Japan',
   'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
   ARRAY['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],
   ARRAY['River View', 'Onsen Spa', 'Fine Dining', 'Free Wi-Fi'],
   4.8, 203, FALSE, TRUE),

  ('Longitude 131', 'longitude-131', 'glamping', 5,
   'Tented luxury camp with direct Uluru views and some of the clearest stargazing skies on Earth.',
   'Uluru-Kata Tjuta National Park, Australia',
   'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
   ARRAY['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80'],
   ARRAY['Uluru Views', 'Stargazing Deck', 'All-Inclusive Dining', 'Guided Tours'],
   4.9, 98, FALSE, TRUE)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  star_rating = EXCLUDED.star_rating,
  description = EXCLUDED.description,
  address = EXCLUDED.address,
  cover_image = EXCLUDED.cover_image,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  avg_rating = EXCLUDED.avg_rating,
  review_count = EXCLUDED.review_count,
  is_featured = EXCLUDED.is_featured,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();

-- 2. Rooms -------------------------------------------------------------
-- Clear existing rooms for these hotels first so re-running this file
-- doesn't create duplicates, then insert fresh room sets.

DELETE FROM public.rooms
WHERE hotel_id IN (
  SELECT id FROM public.hotels WHERE slug IN (
    'four-seasons-safari-lodge', 'soneva-fushi', 'aman-tokyo', 'katikies-oia',
    'belmond-copacabana-palace', 'giraffe-manor', 'ritz-carlton-kyoto', 'longitude-131'
  )
);

INSERT INTO public.rooms (hotel_id, name, room_type, description, max_occupancy, bed_type, base_price, currency, amenities, is_available)
VALUES
  ((SELECT id FROM public.hotels WHERE slug = 'four-seasons-safari-lodge'), 'Safari View Suite', 'suite', 'Private deck overlooking the migration plains.', 2, 'King', 1200, 'USD', ARRAY['Private Deck', 'Air Conditioning'], TRUE),
  ((SELECT id FROM public.hotels WHERE slug = 'four-seasons-safari-lodge'), 'Family Tent', 'family', 'Two-bedroom tented suite for families.', 4, 'Two Queens', 1850, 'USD', ARRAY['Private Deck', 'Air Conditioning'], TRUE),

  ((SELECT id FROM public.hotels WHERE slug = 'soneva-fushi'), 'Overwater Villa', 'villa', 'Glass-floor villa with direct lagoon access.', 2, 'King', 2400, 'USD', ARRAY['Private Pool', 'Glass Floor'], TRUE),
  ((SELECT id FROM public.hotels WHERE slug = 'soneva-fushi'), 'Beach Villa', 'villa', 'Beachfront villa steps from the water.', 3, 'King + Single', 1900, 'USD', ARRAY['Private Beach Access'], TRUE),

  ((SELECT id FROM public.hotels WHERE slug = 'aman-tokyo'), 'Deluxe Room', 'deluxe', 'City-view room on the 33rd floor.', 2, 'King', 900, 'USD', ARRAY['City View', 'Deep Soaking Tub'], TRUE),
  ((SELECT id FROM public.hotels WHERE slug = 'aman-tokyo'), 'Aman Suite', 'suite', 'Corner suite with panoramic Tokyo views.', 2, 'King', 1650, 'USD', ARRAY['Panoramic View', 'Living Room'], TRUE),

  ((SELECT id FROM public.hotels WHERE slug = 'katikies-oia'), 'Caldera Suite', 'suite', 'Private plunge pool facing the caldera sunset.', 2, 'King', 680, 'USD', ARRAY['Private Plunge Pool', 'Caldera View'], TRUE),

  ((SELECT id FROM public.hotels WHERE slug = 'belmond-copacabana-palace'), 'Deluxe Ocean View', 'deluxe', 'Classic art deco room facing Copacabana Beach.', 2, 'King', 480, 'USD', ARRAY['Ocean View'], TRUE),
  ((SELECT id FROM public.hotels WHERE slug = 'belmond-copacabana-palace'), 'Palace Suite', 'suite', 'Spacious suite with separate living area.', 3, 'King + Sofa Bed', 890, 'USD', ARRAY['Ocean View', 'Living Room'], TRUE),

  ((SELECT id FROM public.hotels WHERE slug = 'giraffe-manor'), 'Manor Room', 'standard', 'Classic room in the historic manor house.', 2, 'Queen', 950, 'USD', ARRAY['Garden View', 'Breakfast Included'], TRUE),

  ((SELECT id FROM public.hotels WHERE slug = 'ritz-carlton-kyoto'), 'River View Room', 'deluxe', 'Room overlooking the Kamogawa River.', 2, 'King', 850, 'USD', ARRAY['River View'], TRUE),

  ((SELECT id FROM public.hotels WHERE slug = 'longitude-131'), 'Dune Pavilion', 'suite', 'Tented pavilion with direct Uluru views.', 2, 'King', 1100, 'USD', ARRAY['Uluru View', 'Private Deck'], TRUE);
