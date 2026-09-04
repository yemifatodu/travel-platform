import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

export const metadata: Metadata = {
  title: 'Tours & Experiences | Huuboi',
  description: 'Hand-picked tours and activities led by local guides around the world.',
}

const PAGE_SIZE = 6

type Tour = {
  id: string
  name: string
  slug: string
  category: string | null
  description: string | null
  cover_image: string | null
  duration_hours: number | null
  difficulty: string | null
  base_price: number
  currency: string
  avg_rating: number | null
  review_count: number | null
  is_featured: boolean | null
}

async function getTours(params: { category?: string; page?: string }) {
  const supabase = createServerClient()
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('tours_activities')
    .select('id, name, slug, category, description, cover_image, duration_hours, difficulty, base_price, currency, avg_rating, review_count, is_featured', { count: 'exact' })
    .eq('is_published', true)

  if (params.category) query = query.eq('category', params.category)

  const { data, error, count } = await query
    .order('is_featured', { ascending: false })
    .order('avg_rating', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Failed to load tours:', error.message)
    return { tours: [], totalCount: 0, page: 1, totalPages: 1 }
  }

  const totalCount = count ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  return { tours: (data ?? []) as Tour[], totalCount, page, totalPages }
}

const CATEGORIES = ['day_tour', 'multi_day', 'adventure', 'cultural', 'food', 'wildlife', 'cruise', 'workshop']

export default async function ToursPage({ searchParams }: { searchParams: { category?: string; page?: string } }) {
  const { tours, totalCount, page, totalPages } = await getTours(searchParams)
  const activeCategory = searchParams.category || ''

  function pageHref(targetPage: number) {
    const params = new URLSearchParams()
    if (activeCategory) params.set('category', activeCategory)
    if (targetPage > 1) params.set('page', String(targetPage))
    return `/tours${params.toString() ? `?${params.toString()}` : ''}`
  }

  return (
    <div style={{ background: '#080807', minHeight: '100vh' }}>
      <div style={{ position: 'relative', minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '96px 24px 48px', background: 'radial-gradient(circle at 30% 20%, #1C1B18, #080807 70%)' }}>
        <div>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, marginBottom: 16 }}>
            Local guides, hand-picked experiences
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: cream, lineHeight: 1.1 }}>
            Tours & <em style={{ fontStyle: 'italic', color: gold }}>Experiences</em>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 32px', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/tours"
          style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '8px 16px', borderRadius: 999, textDecoration: 'none',
            color: !activeCategory ? '#080807' : cream,
            background: !activeCategory ? gold : 'transparent',
            border: !activeCategory ? 'none' : '1px solid rgba(200,169,110,0.25)',
          }}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/tours?category=${cat}`}
            style={{
              fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '8px 16px', borderRadius: 999, textDecoration: 'none',
              color: activeCategory === cat ? '#080807' : cream,
              background: activeCategory === cat ? gold : 'transparent',
              border: activeCategory === cat ? 'none' : '1px solid rgba(200,169,110,0.25)',
            }}
          >
            {cat.replace('_', ' ')}
          </Link>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 96px' }}>
        {tours.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: muted }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: cream, marginBottom: 8 }}>
              No experiences found
            </p>
            <p style={{ fontSize: '0.95rem' }}>Try a different category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {tours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                style={{ display: 'block', textDecoration: 'none', background: '#111110', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(200,169,110,0.12)' }}
              >
                <div style={{ height: 190, backgroundImage: tour.cover_image ? `url(${tour.cover_image})` : undefined, backgroundColor: '#1C1B18', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  {tour.avg_rating && (
                    <span style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(8,8,7,0.85)', border: '1px solid rgba(200,169,110,0.3)', color: cream, fontSize: '0.75rem', fontWeight: 600, padding: '4px 9px', borderRadius: 999 }}>
                      <span style={{ color: gold }}>★</span> {tour.avg_rating}
                    </span>
                  )}
                  <span style={{ position: 'absolute', top: 12, right: 12, background: gold, color: '#080807', fontSize: '0.8rem', fontWeight: 600, padding: '5px 11px', borderRadius: 999 }}>
                    {tour.currency} {tour.base_price.toLocaleString()}
                  </span>
                </div>
                <div style={{ padding: '18px 20px 20px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: '1.25rem', color: cream, lineHeight: 1.2, marginBottom: 8 }}>
                    {tour.name}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {tour.category && (
                      <span style={{ fontSize: '0.7rem', color: muted, border: '1px solid rgba(200,169,110,0.2)', borderRadius: 999, padding: '3px 10px' }}>
                        {tour.category.replace('_', ' ')}
                      </span>
                    )}
                    {tour.duration_hours && (
                      <span style={{ fontSize: '0.7rem', color: muted, border: '1px solid rgba(200,169,110,0.2)', borderRadius: 999, padding: '3px 10px' }}>
                        {tour.duration_hours >= 24 ? `${Math.round(tour.duration_hours / 24)} day${tour.duration_hours >= 48 ? 's' : ''}` : `${tour.duration_hours}h`}
                      </span>
                    )}
                  </div>
                  <div style={{ textAlign: 'center', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#080807', background: gold, borderRadius: 6, padding: '10px' }}>
                    View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 48, flexWrap: 'wrap' }}>
            <Link href={pageHref(Math.max(1, page - 1))} style={{ pointerEvents: page <= 1 ? 'none' : 'auto', opacity: page <= 1 ? 0.35 : 1, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: cream, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 6, padding: '9px 16px', textDecoration: 'none' }}>
              ‹ Prev
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={pageHref(p)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 36, height: 36, borderRadius: 6, fontSize: '0.85rem', textDecoration: 'none', color: p === page ? '#080807' : cream, background: p === page ? gold : 'transparent', border: p === page ? 'none' : '1px solid rgba(200,169,110,0.2)' }}>
                {p}
              </Link>
            ))}
            <Link href={pageHref(Math.min(totalPages, page + 1))} style={{ pointerEvents: page >= totalPages ? 'none' : 'auto', opacity: page >= totalPages ? 0.35 : 1, fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: cream, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 6, padding: '9px 16px', textDecoration: 'none' }}>
              Next ›
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
