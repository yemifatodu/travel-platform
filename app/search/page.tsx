export default function SearchPage() {
  const gold = '#C8A96E'
  const cream = '#F5EFE4'
  const ink = '#080807'

  return (
    <div style={{ minHeight: '100vh', background: ink, paddingTop: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16 }}>
            ✦ SEARCH FLIGHTS, HOTELS & MORE
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 16 }}>
            Find Your Next Adventure
          </h1>
          <p style={{ color: 'rgba(245,239,228,0.5)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
            Search and book flights, hotels, tours and more — all in one place
          </p>
        </div>
        <div style={{ background: '#111110', borderRadius: 8, padding: 8, marginBottom: 40 }}>
          <div id="tpwl-search"></div>
        </div>
        <div id="tpwl-tickets"></div>
      </div>
    </div>
  )
}