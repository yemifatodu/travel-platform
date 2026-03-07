-- ══════════════════════════════════════════════════════════════════
-- [YOUR BRAND] Travel Platform — Full Supabase Schema
-- 25 Core Tables | PostgreSQL | Run in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy search

-- ══════════════════════════════════════
-- 1. USER & AUTHENTICATION TABLES
-- ══════════════════════════════════════

-- 1.1 users
CREATE TABLE IF NOT EXISTS public.users (
  id               UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email            TEXT UNIQUE NOT NULL,
  full_name        TEXT,
  avatar_url       TEXT,
  phone            TEXT,
  nationality      TEXT,
  passport_number  TEXT,
  date_of_birth    DATE,
  loyalty_points   INT DEFAULT 0,
  is_verified      BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 1.2 user_profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id           UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  preferred_currency TEXT DEFAULT 'USD',
  preferred_language TEXT DEFAULT 'en',
  home_city         TEXT,
  home_country      TEXT,
  travel_style      TEXT CHECK (travel_style IN ('luxury','adventure','budget','business','family','backpacker')),
  preferred_airlines TEXT[],
  preferred_regions  TEXT[],
  dietary_needs     TEXT,
  accessibility_needs TEXT,
  newsletter_opt_in BOOLEAN DEFAULT TRUE,
  sms_opt_in        BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 1.3 user_sessions
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id      UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token        TEXT UNIQUE NOT NULL,
  ip_address   TEXT,
  user_agent   TEXT,
  last_active  TIMESTAMPTZ DEFAULT NOW(),
  expires_at   TIMESTAMPTZ NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 1.4 user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id    UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL CHECK (role IN ('admin','traveler','vendor','support','editor')),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by UUID REFERENCES public.users(id),
  UNIQUE(user_id, role)
);

-- 1.5 password_resets
CREATE TABLE IF NOT EXISTS public.password_resets (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id    UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token      TEXT UNIQUE NOT NULL,
  used       BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════
-- 2. DESTINATION & LOCATION TABLES
-- ══════════════════════════════════════

-- 2.1 countries
CREATE TABLE IF NOT EXISTS public.countries (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name         TEXT UNIQUE NOT NULL,
  iso_code     CHAR(2) UNIQUE NOT NULL,
  iso3_code    CHAR(3) UNIQUE,
  continent    TEXT NOT NULL CHECK (continent IN ('Africa','Asia','Europe','Americas','Middle East','Arctic','Oceania')),
  currency     TEXT,
  currency_code TEXT,
  language     TEXT,
  timezone     TEXT,
  visa_info    TEXT,
  flag_emoji   TEXT,
  phone_code   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 cities
CREATE TABLE IF NOT EXISTS public.cities (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name         TEXT NOT NULL,
  country_id   UUID REFERENCES public.countries(id) ON DELETE CASCADE,
  state        TEXT,
  latitude     DECIMAL(10,7),
  longitude    DECIMAL(10,7),
  timezone     TEXT,
  population   BIGINT,
  is_featured  BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 airports
CREATE TABLE IF NOT EXISTS public.airports (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  iata_code    CHAR(3) UNIQUE NOT NULL,
  icao_code    CHAR(4),
  name         TEXT NOT NULL,
  city_id      UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  country_id   UUID REFERENCES public.countries(id) ON DELETE CASCADE,
  latitude     DECIMAL(10,7),
  longitude    DECIMAL(10,7),
  timezone     TEXT,
  terminal_count INT,
  is_international BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 destinations
CREATE TABLE IF NOT EXISTS public.destinations (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  city_id       UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  country_id    UUID REFERENCES public.countries(id) ON DELETE CASCADE,
  continent     TEXT NOT NULL,
  tagline       TEXT,
  description   TEXT,
  long_desc     TEXT,
  cover_image   TEXT,
  gallery       TEXT[],
  best_time     TEXT,
  avg_temp      TEXT,
  avg_budget    TEXT,
  is_featured   BOOLEAN DEFAULT FALSE,
  is_published  BOOLEAN DEFAULT TRUE,
  meta_title    TEXT,
  meta_desc     TEXT,
  search_vector TSVECTOR,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 attractions
CREATE TABLE IF NOT EXISTS public.attractions (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name           TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  city_id        UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  category       TEXT CHECK (category IN ('landmark','museum','nature','beach','adventure','food','culture','nightlife','shopping')),
  description    TEXT,
  address        TEXT,
  latitude       DECIMAL(10,7),
  longitude      DECIMAL(10,7),
  cover_image    TEXT,
  gallery        TEXT[],
  entry_fee      DECIMAL(10,2),
  currency       TEXT DEFAULT 'USD',
  opening_hours  JSONB,
  website        TEXT,
  avg_rating     DECIMAL(3,2) DEFAULT 0,
  review_count   INT DEFAULT 0,
  is_featured    BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════
-- 3. TRAVEL PRODUCT TABLES
-- ══════════════════════════════════════

-- 3.1 airlines
CREATE TABLE IF NOT EXISTS public.airlines (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name         TEXT NOT NULL,
  iata_code    CHAR(2) UNIQUE,
  icao_code    CHAR(3),
  country_id   UUID REFERENCES public.countries(id) ON DELETE SET NULL,
  logo_url     TEXT,
  website      TEXT,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3.2 flights (cached/aggregated from Flight APIs)
CREATE TABLE IF NOT EXISTS public.flights (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  flight_number    TEXT NOT NULL,
  airline_id       UUID REFERENCES public.airlines(id) ON DELETE SET NULL,
  origin_airport   UUID REFERENCES public.airports(id) ON DELETE CASCADE,
  dest_airport     UUID REFERENCES public.airports(id) ON DELETE CASCADE,
  departure_time   TIMESTAMPTZ NOT NULL,
  arrival_time     TIMESTAMPTZ NOT NULL,
  duration_minutes INT,
  stops            INT DEFAULT 0,
  cabin_class      TEXT CHECK (cabin_class IN ('economy','premium_economy','business','first')),
  seats_available  INT DEFAULT 0,
  base_price       DECIMAL(10,2) NOT NULL,
  currency         TEXT DEFAULT 'USD',
  baggage_info     JSONB,
  api_source       TEXT,  -- 'amadeus','skyscanner','sabre' etc
  raw_data         JSONB, -- full API response cached
  expires_at       TIMESTAMPTZ, -- cache TTL
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 3.3 hotels
CREATE TABLE IF NOT EXISTS public.hotels (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  destination_id  UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  city_id         UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  country_id      UUID REFERENCES public.countries(id) ON DELETE CASCADE,
  category        TEXT CHECK (category IN ('hotel','resort','boutique','hostel','villa','apartment','safari_lodge','glamping')),
  star_rating     INT CHECK (star_rating BETWEEN 1 AND 5),
  description     TEXT,
  address         TEXT,
  latitude        DECIMAL(10,7),
  longitude       DECIMAL(10,7),
  cover_image     TEXT,
  gallery         TEXT[],
  amenities       TEXT[],
  check_in_time   TIME,
  check_out_time  TIME,
  website         TEXT,
  phone           TEXT,
  email           TEXT,
  avg_rating      DECIMAL(3,2) DEFAULT 0,
  review_count    INT DEFAULT 0,
  is_featured     BOOLEAN DEFAULT FALSE,
  is_published    BOOLEAN DEFAULT TRUE,
  api_source      TEXT,
  external_id     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3.4 rooms
CREATE TABLE IF NOT EXISTS public.rooms (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  hotel_id        UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  room_type       TEXT CHECK (room_type IN ('standard','deluxe','suite','villa','dormitory','family')),
  description     TEXT,
  max_occupancy   INT NOT NULL DEFAULT 2,
  bed_type        TEXT,
  size_sqm        DECIMAL(6,2),
  amenities       TEXT[],
  images          TEXT[],
  base_price      DECIMAL(10,2) NOT NULL,
  currency        TEXT DEFAULT 'USD',
  is_available    BOOLEAN DEFAULT TRUE,
  cancellation_policy TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3.5 tours_activities
CREATE TABLE IF NOT EXISTS public.tours_activities (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  destination_id  UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  city_id         UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  category        TEXT CHECK (category IN ('day_tour','multi_day','adventure','cultural','food','wildlife','cruise','transfer','workshop')),
  description     TEXT,
  long_desc       TEXT,
  cover_image     TEXT,
  gallery         TEXT[],
  duration_hours  DECIMAL(5,2),
  max_group_size  INT,
  min_age         INT,
  difficulty      TEXT CHECK (difficulty IN ('easy','moderate','challenging','extreme')),
  includes        TEXT[],
  excludes        TEXT[],
  meeting_point   TEXT,
  languages       TEXT[],
  base_price      DECIMAL(10,2) NOT NULL,
  currency        TEXT DEFAULT 'USD',
  avg_rating      DECIMAL(3,2) DEFAULT 0,
  review_count    INT DEFAULT 0,
  is_featured     BOOLEAN DEFAULT FALSE,
  is_published    BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3.6 car_rentals
CREATE TABLE IF NOT EXISTS public.car_rentals (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name    TEXT NOT NULL,
  vehicle_type    TEXT CHECK (vehicle_type IN ('economy','compact','sedan','suv','luxury','van','convertible','4x4')),
  make            TEXT,
  model           TEXT,
  year            INT,
  seats           INT,
  transmission    TEXT CHECK (transmission IN ('automatic','manual')),
  pickup_location UUID REFERENCES public.airports(id) ON DELETE SET NULL,
  dropoff_options TEXT[],
  price_per_day   DECIMAL(10,2) NOT NULL,
  currency        TEXT DEFAULT 'USD',
  includes        TEXT[],
  cover_image     TEXT,
  is_available    BOOLEAN DEFAULT TRUE,
  api_source      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════
-- 4. BOOKING & TRANSACTION TABLES
-- ══════════════════════════════════════

-- 4.1 bookings
CREATE TABLE IF NOT EXISTS public.bookings (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_ref      TEXT UNIQUE NOT NULL DEFAULT UPPER(SUBSTRING(uuid_generate_v4()::TEXT, 1, 8)),
  user_id          UUID REFERENCES public.users(id) ON DELETE SET NULL,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed','refunded')),
  total_price      DECIMAL(10,2) NOT NULL,
  currency         TEXT DEFAULT 'USD',
  payment_status   TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid','paid','partial','refunded')),
  stripe_intent_id TEXT,
  traveller_count  INT DEFAULT 1,
  special_requests TEXT,
  coupon_code      TEXT,
  discount_amount  DECIMAL(10,2) DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 4.2 booking_items
CREATE TABLE IF NOT EXISTS public.booking_items (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id       UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  item_type        TEXT NOT NULL CHECK (item_type IN ('flight','hotel','tour','car_rental','insurance','transfer')),
  item_id          UUID,  -- references flights/hotels/tours/car_rentals by type
  item_name        TEXT NOT NULL,
  quantity         INT DEFAULT 1,
  unit_price       DECIMAL(10,2) NOT NULL,
  total_price      DECIMAL(10,2) NOT NULL,
  check_in         DATE,
  check_out        DATE,
  details          JSONB DEFAULT '{}',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 4.3 payments
CREATE TABLE IF NOT EXISTS public.payments (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id       UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id          UUID REFERENCES public.users(id) ON DELETE SET NULL,
  amount           DECIMAL(10,2) NOT NULL,
  currency         TEXT DEFAULT 'USD',
  method           TEXT CHECK (method IN ('card','paypal','bank_transfer','crypto','wallet')),
  provider         TEXT, -- 'stripe','paypal','flutterwave'
  provider_txn_id  TEXT,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending','completed','failed','refunded')),
  metadata         JSONB DEFAULT '{}',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 4.4 refunds
CREATE TABLE IF NOT EXISTS public.refunds (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id      UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  payment_id      UUID REFERENCES public.payments(id) ON DELETE SET NULL,
  user_id         UUID REFERENCES public.users(id) ON DELETE SET NULL,
  amount          DECIMAL(10,2) NOT NULL,
  currency        TEXT DEFAULT 'USD',
  reason          TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','processed')),
  processed_by    UUID REFERENCES public.users(id),
  processed_at    TIMESTAMPTZ,
  provider_refund_id TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════
-- 5. REVIEWS & RATINGS
-- ══════════════════════════════════════

-- 5.1 reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id          UUID REFERENCES public.users(id) ON DELETE SET NULL,
  entity_type      TEXT NOT NULL CHECK (entity_type IN ('destination','hotel','tour','airline','car_rental')),
  entity_id        UUID NOT NULL,
  booking_id       UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  title            TEXT,
  content          TEXT NOT NULL,
  pros             TEXT,
  cons             TEXT,
  is_verified      BOOLEAN DEFAULT FALSE,
  is_published     BOOLEAN DEFAULT TRUE,
  helpful_count    INT DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 5.2 ratings
CREATE TABLE IF NOT EXISTS public.ratings (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  review_id   UUID REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  entity_type TEXT NOT NULL,
  entity_id   UUID NOT NULL,
  overall     INT CHECK (overall BETWEEN 1 AND 5),
  cleanliness INT CHECK (cleanliness BETWEEN 1 AND 5),
  location    INT CHECK (location BETWEEN 1 AND 5),
  value       INT CHECK (value BETWEEN 1 AND 5),
  service     INT CHECK (service BETWEEN 1 AND 5),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

-- ══════════════════════════════════════
-- 6. CONTENT & SEO
-- ══════════════════════════════════════

-- 6.1 travel_guides
CREATE TABLE IF NOT EXISTS public.travel_guides (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title          TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  country_id     UUID REFERENCES public.countries(id) ON DELETE SET NULL,
  category       TEXT DEFAULT 'guide' CHECK (category IN ('guide','visa','itinerary','safety','culture','food','budget','luxury')),
  summary        TEXT,
  content        TEXT,
  cover_image    TEXT,
  gallery        TEXT[],
  author_id      UUID REFERENCES public.users(id) ON DELETE SET NULL,
  author_name    TEXT DEFAULT 'Editorial Team',
  read_time_min  INT DEFAULT 5,
  is_published   BOOLEAN DEFAULT FALSE,
  published_at   TIMESTAMPTZ,
  meta_title     TEXT,
  meta_desc      TEXT,
  tags           TEXT[],
  view_count     INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 6.2 blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title          TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  category       TEXT CHECK (category IN ('inspiration','tips','news','deals','culture','food','adventure','luxury')),
  summary        TEXT,
  content        TEXT,
  cover_image    TEXT,
  gallery        TEXT[],
  author_id      UUID REFERENCES public.users(id) ON DELETE SET NULL,
  author_name    TEXT DEFAULT 'Editorial Team',
  read_time_min  INT DEFAULT 5,
  is_published   BOOLEAN DEFAULT FALSE,
  is_featured    BOOLEAN DEFAULT FALSE,
  published_at   TIMESTAMPTZ,
  meta_title     TEXT,
  meta_desc      TEXT,
  tags           TEXT[],
  view_count     INT DEFAULT 0,
  like_count     INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════
-- 7. PERSONALIZATION
-- ══════════════════════════════════════

-- 7.1 wishlists
CREATE TABLE IF NOT EXISTS public.wishlists (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id        UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name           TEXT DEFAULT 'My Wishlist',
  entity_type    TEXT NOT NULL CHECK (entity_type IN ('destination','hotel','tour','package','flight')),
  entity_id      UUID NOT NULL,
  entity_name    TEXT,
  entity_image   TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

-- ══════════════════════════════════════
-- BONUS TABLES (Growth & Marketing)
-- ══════════════════════════════════════

-- Price Alerts
CREATE TABLE IF NOT EXISTS public.price_alerts (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID REFERENCES public.users(id) ON DELETE CASCADE,
  alert_type  TEXT CHECK (alert_type IN ('flight','hotel','package')),
  origin      TEXT,
  destination TEXT,
  travel_date DATE,
  max_price   DECIMAL(10,2),
  currency    TEXT DEFAULT 'USD',
  is_active   BOOLEAN DEFAULT TRUE,
  last_notified TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Loyalty / Rewards
CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id      UUID REFERENCES public.users(id) ON DELETE CASCADE,
  booking_id   UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  points       INT NOT NULL,
  action       TEXT CHECK (action IN ('earned','redeemed','expired','bonus')),
  description  TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Coupons / Deals
CREATE TABLE IF NOT EXISTS public.coupons (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code            TEXT UNIQUE NOT NULL,
  description     TEXT,
  discount_type   TEXT CHECK (discount_type IN ('percentage','fixed')),
  discount_value  DECIMAL(10,2) NOT NULL,
  min_order_value DECIMAL(10,2) DEFAULT 0,
  max_uses        INT,
  uses_count      INT DEFAULT 0,
  valid_from      TIMESTAMPTZ,
  valid_until     TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════
-- INDEXES (Performance)
-- ══════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_destinations_slug        ON public.destinations(slug);
CREATE INDEX IF NOT EXISTS idx_destinations_continent   ON public.destinations(continent);
CREATE INDEX IF NOT EXISTS idx_destinations_featured    ON public.destinations(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_hotels_destination       ON public.hotels(destination_id);
CREATE INDEX IF NOT EXISTS idx_hotels_city              ON public.hotels(city_id);
CREATE INDEX IF NOT EXISTS idx_hotels_featured          ON public.hotels(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_flights_origin           ON public.flights(origin_airport);
CREATE INDEX IF NOT EXISTS idx_flights_dest             ON public.flights(dest_airport);
CREATE INDEX IF NOT EXISTS idx_flights_departure        ON public.flights(departure_time);
CREATE INDEX IF NOT EXISTS idx_bookings_user            ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status          ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_booking_items_booking    ON public.booking_items(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_entity           ON public.reviews(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug          ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published     ON public.blog_posts(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_wishlists_user           ON public.wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_cities_country           ON public.cities(country_id);
CREATE INDEX IF NOT EXISTS idx_airports_iata            ON public.airports(iata_code);

-- Full-text search on destinations
CREATE INDEX IF NOT EXISTS idx_destinations_fts ON public.destinations USING GIN(search_vector);

-- Function to update destination search vector
CREATE OR REPLACE FUNCTION update_destination_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.name, '')), 'A') ||
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.tagline, '')), 'B') ||
    SETWEIGHT(TO_TSVECTOR('english', COALESCE(NEW.description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_destinations_search_vector
BEFORE INSERT OR UPDATE ON public.destinations
FOR EACH ROW EXECUTE FUNCTION update_destination_search_vector();

-- ══════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ══════════════════════════════════════

ALTER TABLE public.users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_alerts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- Public read access (no auth required)
CREATE POLICY "Public read destinations"    ON public.destinations     FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read hotels"          ON public.hotels           FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read tours"           ON public.tours_activities FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read guides"          ON public.travel_guides    FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read blog"            ON public.blog_posts       FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public read countries"       ON public.countries        FOR SELECT USING (TRUE);
CREATE POLICY "Public read cities"          ON public.cities           FOR SELECT USING (TRUE);
CREATE POLICY "Public read airports"        ON public.airports         FOR SELECT USING (TRUE);
CREATE POLICY "Public read attractions"     ON public.attractions      FOR SELECT USING (TRUE);
CREATE POLICY "Public read airlines"        ON public.airlines         FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read reviews"         ON public.reviews          FOR SELECT USING (is_published = TRUE);

-- Authenticated user policies
CREATE POLICY "Users view own profile"      ON public.users            FOR SELECT  USING (auth.uid() = id);
CREATE POLICY "Users update own profile"    ON public.users            FOR UPDATE  USING (auth.uid() = id);
CREATE POLICY "Users manage own ext profile" ON public.user_profiles   FOR ALL     USING (auth.uid() = user_id);
CREATE POLICY "Users manage own bookings"   ON public.bookings         FOR ALL     USING (auth.uid() = user_id);
CREATE POLICY "Users view own booking items" ON public.booking_items   FOR SELECT  USING (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.user_id = auth.uid()));
CREATE POLICY "Users view own payments"     ON public.payments         FOR SELECT  USING (auth.uid() = user_id);
CREATE POLICY "Users manage own wishlist"   ON public.wishlists        FOR ALL     USING (auth.uid() = user_id);
CREATE POLICY "Users manage own alerts"     ON public.price_alerts     FOR ALL     USING (auth.uid() = user_id);
CREATE POLICY "Users view own loyalty"      ON public.loyalty_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own review"     ON public.reviews          FOR INSERT  WITH CHECK (auth.uid() = user_id);

-- ══════════════════════════════════════
-- SEED DATA — Countries
-- ══════════════════════════════════════

INSERT INTO public.countries (name, iso_code, iso3_code, continent, currency, currency_code, language, flag_emoji) VALUES
('United Arab Emirates','AE','ARE','Middle East','Dirham','AED','Arabic','🇦🇪'),
('Argentina','AR','ARG','Americas','Peso','ARS','Spanish','🇦🇷'),
('Norway','NO','NOR','Arctic','Krone','NOK','Norwegian','🇳🇴'),
('Japan','JP','JPN','Asia','Yen','JPY','Japanese','🇯🇵'),
('Italy','IT','ITA','Europe','Euro','EUR','Italian','🇮🇹'),
('Tanzania','TZ','TZA','Africa','Shilling','TZS','Swahili','🇹🇿'),
('France','FR','FRA','Europe','Euro','EUR','French','🇫🇷'),
('Kenya','KE','KEN','Africa','Shilling','KES','Swahili','🇰🇪'),
('Thailand','TH','THA','Asia','Baht','THB','Thai','🇹🇭'),
('United States','US','USA','Americas','Dollar','USD','English','🇺🇸')
ON CONFLICT (iso_code) DO NOTHING;

-- ══════════════════════════════════════
-- SEED DATA — Destinations
-- ══════════════════════════════════════

INSERT INTO public.destinations (name, slug, continent, tagline, description, is_featured, is_published, best_time, meta_title, meta_desc) VALUES
('Dubai',       'dubai',        'Middle East','Gold, Desert & Infinite Luxury',        'Ultramodern skylines meeting ancient desert culture. Dubai is the world''s most audacious city.', TRUE, TRUE, 'Oct–Apr','Dubai Travel Guide — Luxury & Adventure','Discover the best of Dubai with our curated travel guide.'),
('Patagonia',   'patagonia',    'Americas',  'At the End of the World',                'Wild, untamed landscapes of glaciers, peaks, and steppe at the southern tip of South America.', TRUE, TRUE, 'Nov–Mar','Patagonia Travel Guide — Argentina & Chile','Explore Patagonia''s glaciers, trekking routes, and wilderness.'),
('Svalbard',    'svalbard',     'Arctic',    'Polar Bears & Northern Lights',          'One of the world''s last true wilderness frontiers — an Arctic archipelago of raw, brutal beauty.', TRUE, TRUE, 'Feb–Apr','Svalbard Travel Guide — Arctic Expeditions','Plan your Arctic adventure to Svalbard, Norway.'),
('Kyoto',       'kyoto',        'Asia',      'Where Ancient Japan Lives On',           'A city of a thousand temples, geisha districts, bamboo forests, and transcendent seasonal beauty.', TRUE, TRUE, 'Mar–May','Kyoto Travel Guide — Ancient Japan','Experience ancient Japan in Kyoto''s temples and gardens.'),
('Amalfi Coast','amalfi-coast', 'Europe',    'Cliffside Villages Above Turquoise Seas','Dramatic coastal scenery, pastel villages, and Mediterranean cuisine along Italy''s most iconic shore.', TRUE, TRUE, 'May–Sep','Amalfi Coast Travel Guide — Italy','Discover the stunning Amalfi Coast of southern Italy.'),
('Serengeti',   'serengeti',    'Africa',    'The Greatest Show on Earth',             'Home to the most spectacular wildlife migration on the planet — millions of wildebeest, zebra, and big cats.', TRUE, TRUE, 'Jun–Oct','Serengeti Travel Guide — Tanzania Safari','Plan your Serengeti safari and witness the Great Migration.')
ON CONFLICT (slug) DO NOTHING;

