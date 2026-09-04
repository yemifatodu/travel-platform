import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import TourBookingWidget from './TourBookingWidget'

export const dynamic = 'force-dynamic'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

type TourDetail = {
  id: string
  name: string
  slug: string
  category: string | null
  description: string | null
  long_desc: string | null
  cover_image: string | null
  gallery: string[] | null
  duration_hours: number | null
  max_group_size: number | null
  min_age: number | null
  difficulty: string | null
  includes: string[] | null
  excludes: string[] | null
  meeting_point: string | null
  languages: string[] | null
  base_price: number
  currency: string
  avg_rating: number | null
  review_count: number | null
}

async function getTour(slug: string): Promise<TourDetail | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('tours_activities')
    .select('id, name, slug, category, description, long_desc, cover_image, gallery, duration_hours, max_group_size, min_age, difficulty, includes, excludes, meeting_point, languages, base_price, currency, avg_rating, review_count')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !data) return null
  return data as TourDetail
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tour = await getTour(params.slug)
  if (!tour) return { title: 'Experience not found | Huuboi' }
  return {
    title: `${tour.name} | Huuboi`,
    description: tour.description?.slice(0, 155) ?? `Book ${tour.name} on Huuboi.`,
  }
}

function formatDuration(hours: number | null): string {
  if (!hours) return ''
  if (hours >= 24) {
    const days = Math.round(hours / 24)
    return `${days} day${days !== 1 ? 's' : ''}`
  }
  return `${hours} hour${hours !== 1 ? 's' : ''}`
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = await getTour(params.slug)
  if (!tour) notFound()

  return (
    <div style={{ background: '#080807', minHeight: '100vh' }}>
      <div style={{ height: 360, backgroundImage: tour.cover_image ? `url(${tour.cover_image})` : undefined, backgroundColor: '#1C1B18', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.95), rgba(8,8,7,0.1))' }} />
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {tour.avg_rating && (
            <span style={{ color: gold, fontSize: '0.9rem', display: 'block', marginBottom: 6 }}>
              ★ {tour.avg_rating} · {tour.review_count} review{tour.review_count !== 1 ? 's' : ''}
            </span>
          )}
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: cream }}>
            {tour.name}
          </h1>
          {tour.meeting_point && <p style={{ color: muted, marginTop: 6, fontSize: '0.95rem' }}>{tour.meeting_point}</p>}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 1fr)', gap: 32, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 32 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tour.duration_hours && (
              <span style={{ fontSize: '0.75rem', color: cream, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 999, padding: '5px 14px' }}>
                {formatDuration(tour.duration_hours)}
              </span>
            )}
            {tour.difficulty && (
              <span style={{ fontSize: '0.75rem', color: cream, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 999, padding: '5px 14px', textTransform: 'capitalize' }}>
                {tour.difficulty}
              </span>
            )}
            {tour.max_group_size && (
              <span style={{ fontSize: '0.75rem', color: cream, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 999, padding: '5px 14px' }}>
                Up to {tour.max_group_size} people
              </span>
            )}
            {tour.min_age && (
              <span style={{ fontSize: '0.75rem', color: cream, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 999, padding: '5px 14px' }}>
                Min age {tour.min_age}
              </span>
            )}
            {tour.languages && tour.languages.length > 0 && (
              <span style={{ fontSize: '0.75rem', color: cream, border: '1px solid rgba(200,169,110,0.25)', borderRadius: 999, padding: '5px 14px' }}>
                {tour.languages.join(', ')}
              </span>
            )}
          </div>

          {tour.long_desc && (
            <p style={{ color: muted, fontSize: '1rem', lineHeight: 1.7, fontWeight: 300 }}>{tour.long_desc}</p>
          )}

          {(tour.includes?.length || tour.excludes?.length) ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {tour.includes && tour.includes.length > 0 && (
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.12)', borderRadius: 10, padding: '18px 20px' }}>
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: gold, marginBottom: 12 }}>
                    Included
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                    {tour.includes.map((item) => (
                      <li key={item} style={{ color: muted, fontSize: '0.85rem' }}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.excludes && tour.excludes.length > 0 && (
                <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.12)', borderRadius: 10, padding: '18px 20px' }}>
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: gold, marginBottom: 12 }}>
                    Not Included
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                    {tour.excludes.map((item) => (
                      <li key={item} style={{ color: dim, fontSize: '0.85rem' }}>✕ {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <TourBookingWidget
          tourId={tour.id}
          tourName={tour.name}
          tourSlug={tour.slug}
          basePrice={tour.base_price}
          currency={tour.currency}
          maxGroupSize={tour.max_group_size}
        />
      </div>
    </div>
  )
}
