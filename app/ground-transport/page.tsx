import Link from 'next/link'

export const metadata = { title: 'Car Rentals & Transfers | HUUBOI' }

const wrap: React.CSSProperties = { maxWidth: 960, margin: '0 auto', padding: '120px 20px 70px' }
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 28 }
const card: React.CSSProperties = { display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid rgba(200,169,110,0.35)', borderRadius: 14, padding: 28, background: 'rgba(200,169,110,0.05)' }
const cta: React.CSSProperties = { display: 'inline-block', marginTop: 18, padding: '11px 20px', borderRadius: 8, background: '#C8A96E', color: '#111', fontWeight: 600, fontSize: 14 }

export default function GroundTransportPage() {
  return (
    <div style={wrap}>
      <h1 style={{ fontSize: 34, marginBottom: 8 }}>Car rentals and transfers</h1>
      <p style={{ opacity: 0.75, maxWidth: 560 }}>Choose how you want to get around: drive yourself, or have a driver take you there.</p>
      <div style={grid}>
        <Link href="/car-rentals" style={card}>
          <div style={{ fontSize: 34 }}>🚗</div>
          <h2 style={{ margin: '10px 0 6px' }}>Car rental</h2>
          <p style={{ opacity: 0.8, margin: 0 }}>Self-drive hire. Compare cars from our rental partners and drive on your own schedule.</p>
          <span style={cta}>Rent a car</span>
        </Link>
        <Link href="/transfers" style={card}>
          <div style={{ fontSize: 34 }}>🚐</div>
          <h2 style={{ margin: '10px 0 6px' }}>Transfers</h2>
          <p style={{ opacity: 0.8, margin: 0 }}>A pre-booked ride with a driver between airports, ports and stations. Currently available in Spain.</p>
          <span style={cta}>Book a transfer</span>
        </Link>
      </div>
    </div>
  )
}
