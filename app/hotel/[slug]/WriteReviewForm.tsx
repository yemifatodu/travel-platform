'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Star } from 'lucide-react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

function StarPicker({
  value,
  onChange,
  size = 22,
}: {
  value: number
  onChange: (n: number) => void
  size?: number
}) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n !== 1 ? 's' : ''}`}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, lineHeight: 0 }}
        >
          <Star size={size} fill={n <= value ? gold : 'none'} color={n <= value ? gold : dim} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: 6,
  background: '#080807',
  border: '1px solid rgba(200,169,110,0.25)',
  borderRadius: 6,
  color: cream,
  padding: '10px 12px',
  fontSize: '0.9rem',
  fontFamily: "'DM Sans',sans-serif",
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: muted,
  fontFamily: "'Bebas Neue',sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  display: 'block',
}

export default function WriteReviewForm({ hotelId, hotelSlug }: { hotelId: string; hotelSlug: string }) {
  const [open, setOpen] = useState(false)
  const [overall, setOverall] = useState(5)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [pros, setPros] = useState('')
  const [cons, setCons] = useState('')
  const [showDetailed, setShowDetailed] = useState(false)
  const [cleanliness, setCleanliness] = useState(5)
  const [location, setLocation] = useState(5)
  const [value, setValue] = useState(5)
  const [service, setService] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!content.trim()) {
      setError('Please share a few words about your stay.')
      return
    }

    setLoading(true)
    const supabase = createClientComponentClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = `/auth/login?redirect=${encodeURIComponent(`/hotel/${hotelSlug}`)}`
      return
    }

    try {
      // A review is marked verified if this account has a paid booking that
      // actually included this hotel — checked here rather than trusted from
      // the client, since is_verified is a trust signal shown to other guests.
      const { data: bookings } = await supabase
        .from('bookings')
        .select('id, booking_items!inner(details)')
        .eq('user_id', user.id)
        .eq('payment_status', 'paid')

      const isVerified = (bookings ?? []).some((b: any) =>
        b.booking_items?.some((item: any) => item.details?.hotel_id === hotelId)
      )

      const { data: review, error: reviewError } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          entity_type: 'hotel',
          entity_id: hotelId,
          title: title.trim() || null,
          content: content.trim(),
          pros: pros.trim() || null,
          cons: cons.trim() || null,
          is_verified: isVerified,
        })
        .select('id')
        .single()

      if (reviewError) throw reviewError

      const { error: ratingError } = await supabase.from('ratings').insert({
        review_id: review.id,
        user_id: user.id,
        entity_type: 'hotel',
        entity_id: hotelId,
        overall,
        cleanliness: showDetailed ? cleanliness : null,
        location: showDetailed ? location : null,
        value: showDetailed ? value : null,
        service: showDetailed ? service : null,
      })

      if (ratingError) throw ratingError

      setSuccess(true)
      setOpen(false)
    } catch (err: any) {
      if (err?.code === '23505') {
        setError("You've already reviewed this stay.")
      } else {
        setError('Something went wrong submitting your review. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 10, padding: '18px 20px', color: cream, fontSize: '0.9rem' }}>
        Thanks — your review has been posted.
      </div>
    )
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: gold,
          background: 'transparent',
          border: '1px solid rgba(200,169,110,0.4)',
          borderRadius: 6,
          padding: '11px 22px',
          cursor: 'pointer',
        }}
      >
        Write a Review
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', borderRadius: 10, padding: 22, display: 'grid', gap: 16 }}
    >
      <div>
        <label style={labelStyle}>Overall Rating</label>
        <div style={{ marginTop: 8 }}>
          <StarPicker value={overall} onChange={setOverall} size={26} />
        </div>
      </div>

      <label>
        <span style={labelStyle}>Title (optional)</span>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sum up your stay" style={inputStyle} />
      </label>

      <label>
        <span style={labelStyle}>Your Review</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What was your stay like?"
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: "'DM Sans',sans-serif" }}
        />
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <label>
          <span style={labelStyle}>Pros (optional)</span>
          <input type="text" value={pros} onChange={(e) => setPros(e.target.value)} style={inputStyle} />
        </label>
        <label>
          <span style={labelStyle}>Cons (optional)</span>
          <input type="text" value={cons} onChange={(e) => setCons(e.target.value)} style={inputStyle} />
        </label>
      </div>

      {!showDetailed ? (
        <button
          type="button"
          onClick={() => setShowDetailed(true)}
          style={{ fontSize: '0.78rem', color: muted, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', textDecoration: 'underline', padding: 0 }}
        >
          + Add detailed ratings (cleanliness, location, value, service)
        </button>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, paddingTop: 4 }}>
          {[
            ['Cleanliness', cleanliness, setCleanliness],
            ['Location', location, setLocation],
            ['Value', value, setValue],
            ['Service', service, setService],
          ].map(([label, val, setter]: any) => (
            <div key={label}>
              <span style={{ ...labelStyle, marginBottom: 6, display: 'block' }}>{label}</span>
              <StarPicker value={val} onChange={setter} size={16} />
            </div>
          ))}
        </div>
      )}

      {error && <p style={{ color: '#e08a7a', fontSize: '0.82rem', margin: 0 }}>{error}</p>}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#080807',
            background: loading ? dim : gold,
            border: 'none',
            borderRadius: 6,
            padding: '12px 24px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Posting…' : 'Post Review'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: muted, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
