'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Heart } from 'lucide-react'

const gold = '#C8A96E'

export default function SaveButton({
  hotelId,
  hotelName,
  hotelImage,
  style,
}: {
  hotelId: string
  hotelName: string
  hotelImage?: string | null
  style?: React.CSSProperties
}) {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const supabase = createClientComponentClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user || cancelled) {
        setChecked(true)
        return
      }
      const { data } = await supabase
        .from('wishlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('entity_type', 'hotel')
        .eq('entity_id', hotelId)
        .maybeSingle()
      if (!cancelled) {
        setSaved(!!data)
        setChecked(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [hotelId])

  async function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return
    setLoading(true)

    const supabase = createClientComponentClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`
      return
    }

    if (saved) {
      await supabase.from('wishlists').delete().eq('user_id', user.id).eq('entity_type', 'hotel').eq('entity_id', hotelId)
      setSaved(false)
    } else {
      await supabase.from('wishlists').insert({
        user_id: user.id,
        entity_type: 'hotel',
        entity_id: hotelId,
        entity_name: hotelName,
        entity_image: hotelImage || null,
      })
      setSaved(true)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      disabled={!checked || loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(8,8,7,0.7)',
        cursor: checked ? 'pointer' : 'default',
        ...style,
      }}
    >
      <Heart size={16} fill={saved ? gold : 'none'} color={saved ? gold : '#F5EFE4'} strokeWidth={1.75} />
    </button>
  )
}
