import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

export const metadata: Metadata = {
  title: 'Wishlist | Huuboi',
  description: 'Your saved destinations, hotels, and travel experiences.',
}

type WishlistItem = {
  id: string
  entity_type: string
  entity_id: string
  entity_name: string | null
  entity_image: string | null
  created_at: string
}

async function getWishlist(): Promise<{ items: WishlistItem[]; signedIn: boolean }> {
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { items: [], signedIn: false }

  const { data, error } = await supabase
    .from('wishlists')
    .select('id, entity_type, entity_id, entity_name, entity_image, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load wishlist:', error.message)
    return { items: [], signedIn: true }
  }
  return { items: (data ?? []) as WishlistItem[], signedIn: true }
}

// Only 'hotel' has a real detail page today — other entity_types stored in
// the schema (destination/tour/package/flight) fall back to a sensible
// section link until those get their own pages.
function hrefFor(item: WishlistItem): string {
  if (item.entity_type === 'hotel') return `/hotel/${item.entity_id}`
  return '/destinations'
}

export default async function WishlistPage() {
  const { items, signedIn } = await getWishlist()

  return (
    <div style={{ minHeight: '100vh', background: '#080807', paddingTop: 120 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 60px' }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: gold, marginBottom: 16 }}>YOUR SAVED STAYS</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 300, color: cream, lineHeight: 1, marginBottom: 24 }}>Wishlist</h1>
          <p style={{ color: muted, fontSize: '1rem', maxWidth: 600, lineHeight: 1.8 }}>Your saved destinations, hotels, and travel experiences.</p>
        </div>

        {!signedIn ? (
          <div style={{ border: '1px solid rgba(200,169,110,0.2)', padding: 48, background: '#111110', maxWidth: 600 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 300, color: cream, marginBottom: 16 }}>Sign in to see your wishlist</h2>
            <p style={{ color: dim, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 28 }}>
              Save hotels while you browse by tapping the heart icon — they'll show up here once you're signed in.
            </p>
            <Link href="/auth/login?redirect=/dashboard/wishlist" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', border: `1px solid ${gold}`, color: gold, padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}>
              SIGN IN
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div style={{ border: '1px solid rgba(200,169,110,0.2)', padding: 48, background: '#111110', maxWidth: 600 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 300, color: cream, marginBottom: 16 }}>Nothing saved yet</h2>
            <p style={{ color: dim, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 28 }}>
              Browse stays and tap the heart icon on any hotel to save it here for later.
            </p>
            <Link href="/hotel" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', border: `1px solid ${gold}`, color: gold, padding: '12px 28px', textDecoration: 'none', display: 'inline-block' }}>
              BROWSE STAYS
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {items.map((item) => (
              <Link
                key={item.id}
                href={hrefFor(item)}
                style={{ display: 'block', textDecoration: 'none', background: '#111110', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(200,169,110,0.12)' }}
              >
                <div
                  style={{
                    height: 160,
                    backgroundImage: item.entity_image ? `url(${item.entity_image})` : undefined,
                    backgroundColor: '#1C1B18',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div style={{ padding: '16px 18px' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: cream, marginBottom: 4 }}>
                    {item.entity_name || 'Saved stay'}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: dim, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {item.entity_type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
