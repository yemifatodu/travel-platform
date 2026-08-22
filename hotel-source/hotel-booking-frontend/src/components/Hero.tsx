import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div 
      className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(\x27https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80\x27)"
      }}
    >
      {/* Dark overlay for readability — ink-toned to match huuboi.com's base surface */}
      <div className="absolute inset-0 bg-ink/70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center text-cream">
          <p className="section-subtitle mb-4">Global stays, booked with confidence</p>
          <h1 className="section-title mb-4">
            Find Your Perfect{" "}
            <span className="block md:inline italic text-gold">Dream Stay</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-cream/70 font-light">
            Discover extraordinary hotels, luxury resorts, and unique accommodations worldwide.
            <br className="hidden md:block" />
            {" "}Book with confidence, stay with comfort, and create unforgettable memories.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-gold/[0.03] px-4 py-2 rounded-full border border-gold/20 font-ui text-xs tracking-[0.15em] uppercase text-cream/70">
              <span aria-hidden="true">🔍</span> Smart Search
            </div>
            <div className="flex items-center gap-2 bg-gold/[0.03] px-4 py-2 rounded-full border border-gold/20 font-ui text-xs tracking-[0.15em] uppercase text-cream/70">
              <span aria-hidden="true">🌍</span> Global Destinations
            </div>
            <div className="flex items-center gap-2 bg-gold/[0.03] px-4 py-2 rounded-full border border-gold/20 font-ui text-xs tracking-[0.15em] uppercase text-cream/70">
              <span aria-hidden="true">📅</span> Flexible Booking
            </div>
            <div className="flex items-center gap-2 bg-gold/[0.03] px-4 py-2 rounded-full border border-gold/20 font-ui text-xs tracking-[0.15em] uppercase text-cream/70">
              <span aria-hidden="true">🛡️</span> 24/7 Support
            </div>
          </div>

          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
