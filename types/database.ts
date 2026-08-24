export type Database = {
  public: {
    Tables: {
      // Add your table definitions here
      esim_plans: {
        Row: any
        Insert: any
        Update: any
      }
      hotels: {
        Row: any
        Insert: any
        Update: any
      }
      rooms: {
        Row: any
        Insert: any
        Update: any
      }
      reviews: {
        Row: any
        Insert: any
        Update: any
      }
      bookings: {
        Row: any
        Insert: any
        Update: any
      }
      // Add other tables as needed
    }
  }
}
