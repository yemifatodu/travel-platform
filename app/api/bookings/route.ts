import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    const { items, currency = 'USD', special_requests } = await req.json()
    const total_price = items.reduce((s: number, i: any) => s + (i.total_price || 0), 0)
    const { data: booking, error } = await supabase.from('bookings')
      .insert({ user_id: user.id, total_price, currency, special_requests } as any).select().single()
    if (error) throw error
    await supabase.from('booking_items').insert(items.map((i: any) => ({ ...i, booking_id: (booking as any).id })))
    return NextResponse.json({ booking }, { status: 201 })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
