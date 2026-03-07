export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type TravelStyle = 'luxury' | 'adventure' | 'budget' | 'business' | 'family' | 'backpacker'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded'
export type PaymentStatus = 'unpaid' | 'paid' | 'partial' | 'refunded'
export type ItemType = 'flight' | 'hotel' | 'tour' | 'car_rental' | 'insurance' | 'transfer'
export type EntityType = 'destination' | 'hotel' | 'tour' | 'airline' | 'car_rental'
export type UserRole = 'admin' | 'traveler' | 'vendor' | 'support' | 'editor'
export type Continent = 'Africa' | 'Asia' | 'Europe' | 'Americas' | 'Middle East' | 'Arctic' | 'Oceania'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string; email: string; full_name: string | null; avatar_url: string | null
          phone: string | null; nationality: string | null; passport_number: string | null
          date_of_birth: string | null; loyalty_points: number; is_verified: boolean; created_at: string; updated_at: string
        }
        Insert: { id: string; email: string; full_name?: string | null; avatar_url?: string | null; phone?: string | null }
        Update: { full_name?: string | null; avatar_url?: string | null; phone?: string | null; loyalty_points?: number }
      }
      user_profiles: {
        Row: {
          id: string; user_id: string; preferred_currency: string; preferred_language: string
          home_city: string | null; home_country: string | null; travel_style: TravelStyle | null
          preferred_airlines: string[] | null; preferred_regions: string[] | null
          newsletter_opt_in: boolean; created_at: string; updated_at: string
        }
        Insert: { user_id: string; preferred_currency?: string; travel_style?: TravelStyle }
        Update: { preferred_currency?: string; travel_style?: TravelStyle; home_city?: string }
      }
      countries: {
        Row: {
          id: string; name: string; iso_code: string; iso3_code: string | null
          continent: Continent; currency: string | null; currency_code: string | null
          language: string | null; flag_emoji: string | null; created_at: string
        }
        Insert: { name: string; iso_code: string; continent: Continent }
        Update: { name?: string; currency?: string }
      }
      cities: {
        Row: {
          id: string; name: string; country_id: string; state: string | null
          latitude: number | null; longitude: number | null; is_featured: boolean; created_at: string
        }
        Insert: { name: string; country_id: string }
        Update: { name?: string; is_featured?: boolean }
      }
      airports: {
        Row: {
          id: string; iata_code: string; icao_code: string | null; name: string
          city_id: string | null; country_id: string; latitude: number | null
          longitude: number | null; is_international: boolean; created_at: string
        }
        Insert: { iata_code: string; name: string; country_id: string }
        Update: { name?: string }
      }
      destinations: {
        Row: {
          id: string; name: string; slug: string; city_id: string | null; country_id: string
          continent: string; tagline: string | null; description: string | null; long_desc: string | null
          cover_image: string | null; gallery: string[] | null; best_time: string | null
          avg_temp: string | null; avg_budget: string | null; is_featured: boolean
          is_published: boolean; meta_title: string | null; meta_desc: string | null; created_at: string; updated_at: string
        }
        Insert: { name: string; slug: string; country_id: string; continent: string }
        Update: { name?: string; description?: string; is_featured?: boolean; is_published?: boolean }
      }
      attractions: {
        Row: {
          id: string; name: string; slug: string; destination_id: string | null; city_id: string | null
          category: string | null; description: string | null; address: string | null
          latitude: number | null; longitude: number | null; cover_image: string | null
          entry_fee: number | null; avg_rating: number; review_count: number; is_featured: boolean; created_at: string
        }
        Insert: { name: string; slug: string }
        Update: { name?: string; is_featured?: boolean }
      }
      airlines: {
        Row: { id: string; name: string; iata_code: string | null; logo_url: string | null; is_active: boolean; created_at: string }
        Insert: { name: string }
        Update: { name?: string; is_active?: boolean }
      }
      flights: {
        Row: {
          id: string; flight_number: string; airline_id: string | null
          origin_airport: string; dest_airport: string; departure_time: string
          arrival_time: string; duration_minutes: number | null; stops: number
          cabin_class: string | null; seats_available: number; base_price: number
          currency: string; api_source: string | null; expires_at: string | null; created_at: string
        }
        Insert: { flight_number: string; origin_airport: string; dest_airport: string; departure_time: string; arrival_time: string; base_price: number }
        Update: { seats_available?: number; base_price?: number }
      }
      hotels: {
        Row: {
          id: string; name: string; slug: string; destination_id: string | null
          city_id: string | null; country_id: string; category: string | null
          star_rating: number | null; description: string | null; address: string | null
          latitude: number | null; longitude: number | null; cover_image: string | null
          amenities: string[] | null; avg_rating: number; review_count: number
          is_featured: boolean; is_published: boolean; created_at: string; updated_at: string
        }
        Insert: { name: string; slug: string; country_id: string }
        Update: { name?: string; is_featured?: boolean; avg_rating?: number }
      }
      rooms: {
        Row: {
          id: string; hotel_id: string; name: string; room_type: string | null
          max_occupancy: number; bed_type: string | null; size_sqm: number | null
          amenities: string[] | null; base_price: number; currency: string; is_available: boolean; created_at: string
        }
        Insert: { hotel_id: string; name: string; max_occupancy?: number; base_price: number }
        Update: { base_price?: number; is_available?: boolean }
      }
      tours_activities: {
        Row: {
          id: string; name: string; slug: string; destination_id: string | null
          city_id: string | null; category: string | null; description: string | null
          cover_image: string | null; duration_hours: number | null; max_group_size: number | null
          difficulty: string | null; base_price: number; currency: string
          avg_rating: number; review_count: number; is_featured: boolean; is_published: boolean; created_at: string
        }
        Insert: { name: string; slug: string; base_price: number }
        Update: { name?: string; base_price?: number; is_featured?: boolean }
      }
      car_rentals: {
        Row: {
          id: string; company_name: string; vehicle_type: string | null; make: string | null
          model: string | null; seats: number | null; transmission: string | null
          pickup_location: string | null; price_per_day: number; currency: string
          is_available: boolean; created_at: string
        }
        Insert: { company_name: string; price_per_day: number }
        Update: { price_per_day?: number; is_available?: boolean }
      }
      bookings: {
        Row: {
          id: string; booking_ref: string; user_id: string | null; status: BookingStatus
          total_price: number; currency: string; payment_status: PaymentStatus
          stripe_intent_id: string | null; traveller_count: number; special_requests: string | null
          coupon_code: string | null; discount_amount: number; created_at: string; updated_at: string
        }
        Insert: { user_id?: string | null; total_price: number; currency?: string }
        Update: { status?: BookingStatus; payment_status?: PaymentStatus }
      }
      booking_items: {
        Row: {
          id: string; booking_id: string; item_type: ItemType; item_id: string | null
          item_name: string; quantity: number; unit_price: number; total_price: number
          check_in: string | null; check_out: string | null; details: Json; created_at: string
        }
        Insert: { booking_id: string; item_type: ItemType; item_name: string; unit_price: number; total_price: number }
        Update: never
      }
      payments: {
        Row: {
          id: string; booking_id: string; user_id: string | null; amount: number
          currency: string; method: string | null; provider: string | null
          provider_txn_id: string | null; status: string; metadata: Json; created_at: string
        }
        Insert: { booking_id: string; amount: number; currency?: string }
        Update: { status?: string }
      }
      refunds: {
        Row: {
          id: string; booking_id: string; payment_id: string | null; user_id: string | null
          amount: number; currency: string; reason: string | null; status: string
          processed_by: string | null; processed_at: string | null; created_at: string
        }
        Insert: { booking_id: string; amount: number; reason?: string }
        Update: { status?: string; processed_by?: string; processed_at?: string }
      }
      reviews: {
        Row: {
          id: string; user_id: string | null; entity_type: EntityType; entity_id: string
          booking_id: string | null; title: string | null; content: string
          is_verified: boolean; is_published: boolean; helpful_count: number; created_at: string; updated_at: string
        }
        Insert: { user_id: string; entity_type: EntityType; entity_id: string; content: string }
        Update: { content?: string; is_published?: boolean }
      }
      ratings: {
        Row: {
          id: string; review_id: string; user_id: string | null; entity_type: string; entity_id: string
          overall: number | null; cleanliness: number | null; location: number | null
          value: number | null; service: number | null; created_at: string
        }
        Insert: { review_id: string; entity_type: string; entity_id: string; overall: number }
        Update: { overall?: number }
      }
      travel_guides: {
        Row: {
          id: string; title: string; slug: string; destination_id: string | null
          country_id: string | null; category: string; summary: string | null; content: string | null
          cover_image: string | null; author_name: string; read_time_min: number
          is_published: boolean; published_at: string | null; meta_title: string | null
          meta_desc: string | null; tags: string[] | null; view_count: number; created_at: string; updated_at: string
        }
        Insert: { title: string; slug: string; category?: string }
        Update: { title?: string; content?: string; is_published?: boolean }
      }
      blog_posts: {
        Row: {
          id: string; title: string; slug: string; category: string | null; summary: string | null
          content: string | null; cover_image: string | null; author_name: string
          read_time_min: number; is_published: boolean; is_featured: boolean
          published_at: string | null; tags: string[] | null; view_count: number
          like_count: number; created_at: string; updated_at: string
        }
        Insert: { title: string; slug: string; category?: string }
        Update: { title?: string; content?: string; is_published?: boolean; is_featured?: boolean }
      }
      wishlists: {
        Row: {
          id: string; user_id: string; name: string; entity_type: string; entity_id: string
          entity_name: string | null; entity_image: string | null; notes: string | null; created_at: string
        }
        Insert: { user_id: string; entity_type: string; entity_id: string }
        Update: { notes?: string }
      }
      price_alerts: {
        Row: {
          id: string; user_id: string; alert_type: string | null; origin: string
          destination: string; travel_date: string | null; max_price: number | null
          currency: string; is_active: boolean; last_notified: string | null; created_at: string
        }
        Insert: { user_id: string; origin: string; destination: string }
        Update: { max_price?: number; is_active?: boolean }
      }
    }
  }
}
