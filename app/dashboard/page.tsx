import Link from 'next/link'
import {
  Plane, Building2, Car, Smartphone, Stamp, Bot, Calculator, Compass,
  PawPrint, Landmark, Sunrise, Castle, Globe, Waves, Award,
} from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

// All internal — every quick link here should keep visitors on huuboi.com,
// never hand off to a third-party site or an unbuilt page.
const quickLinks = [
  { icon: Plane, label: 'Search Flights', href: '/flights', desc: 'Compare 1,200+ airlines' },
  { icon: Building2, label: 'Search Hotels', href: '/hotel', desc: '28M+ properties worldwide' },
  { icon: Car, label: 'Rent a Car', href: '/car-rentals', desc: '900+ rental suppliers' },
  { icon: Compass, label: 'Browse Experiences', href: '/tours', desc: 'Hand-picked local tours' },
  { icon: Smartphone, label: 'Get a Travel eSIM', href: '/esim', desc: 'Data in 150+ countries' },
  { icon: Stamp, label: 'Visa Requirements', href: '/visa-requirements', desc: '75+ countries covered' },
  { icon: Bot, label: 'AI Trip Planner', href: '/ai-planner', desc: 'Build your itinerary' },
  { icon: Calculator, label: 'Budget Calculator', href: '/budget-calculator', desc: 'Estimate trip costs' },
]

const destinations = [
  { name: 'Africa & Safari', href: '/africa-safari', icon: PawPrint },
  { name: 'Middle East', href: '/middle-east', icon: Landmark },
  { name: 'Asia & Far East', href: '/asia', icon: Sunrise },
  { name: 'Europe', href: '/europe', icon: Castle },
  { name: 'The Americas', href: '/americas', icon: Globe },
  { name: 'Pacific & Oceania', href: '/pacific', icon: Waves },
]

export default async function DashboardPage() {
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: { full_name: string | null; loyalty_points: number | null } | null = null
  if (user) {
    const { data } = await supabase.from('users').select('full_name, loyalty_points').eq('id', user.id).single()
    profile = data as { full_name: string | null; loyalty_points: number | null } | null
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 90 }}>

      {/* Hero */}
      <div style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(40px,7vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: gold, display: 'inline-block' }} />
            {profile ? `WELCOME BACK${profile.full_name ? `, ${profile.full_name.split(' ')[0].toUpperCase()}` : ''}` : 'HUUBOI DASHBOARD'}
          </div>
          {profile && typeof profile.loyalty_points === 'number' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
              <Award size={14} color={gold} strokeWidth={1.5} />
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.08em', color: cream }}>
                {profile.loyalty_points.toLocaleString()} LOYALTY POINTS
              </span>
            </div>
          )}
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: cream, lineHeight: 0.95, marginBottom: 16 }}>
            Where Would You<br /><em style={{ color: gold }}>Like to Go?</em>
          </h1>
          <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.8, maxWidth: 480, marginBottom: 32 }}>
            Everything you need to plan, book and manage your trip — all in one place.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/request-trip"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
              PLAN A TRIP
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,60px)' }}>

        {/* Quick links */}
        <div style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>QUICK ACCESS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 2 }}>
            {quickLinks.map(item => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s', display: 'flex', gap: 14, alignItems: 'flex-start' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                    <span style={{ flexShrink: 0, color: gold, display: 'flex', paddingTop: 2 }}>
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: cream, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: dim }}>{item.desc}</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Destinations */}
        <div style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 20 }}>EXPLORE BY REGION</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 2 }}>
            {destinations.map(dest => {
              const Icon = dest.icon
              return (
                <Link key={dest.href} href={dest.href} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.1)', padding: '20px 22px', transition: 'border-color 0.2s', display: 'flex', alignItems: 'center', gap: 12 }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)')}>
                    <span style={{ color: gold, display: 'flex' }}>
                      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.12em', color: cream }}>{dest.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Enquiry CTA */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)', padding: 'clamp(28px,4vw,48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.68rem', letterSpacing: '0.25em', color: gold, marginBottom: 12 }}>BESPOKE TRAVEL PLANNING</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300, color: cream, lineHeight: 1.1, marginBottom: 12 }}>
              Want Us to <em style={{ color: gold }}>Handle Everything?</em>
            </h2>
            <p style={{ color: muted, fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
              Flights, hotels, transfers, tours, restaurants — we plan and book your entire trip while you just show up and enjoy it.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/request-trip"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', background: gold, color: '#080807', padding: '16px 32px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
              REQUEST A TRIP
            </Link>
            <Link href="/ai-planner"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', border: '1px solid rgba(200,169,110,0.35)', color: gold, padding: '16px 32px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
              TRY AI PLANNER
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
