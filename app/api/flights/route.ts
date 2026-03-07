import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get('from'), to = searchParams.get('to'), date = searchParams.get('date')
  if (!from || !to || !date) return NextResponse.json({ error: 'Missing: from, to, date' }, { status: 400 })
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from('flights')
      .select('*, airlines(*)')
      .gte('departure_time', `${date}T00:00:00`).lte('departure_time', `${date}T23:59:59`)
      .order('base_price', { ascending: true }).limit(20)
    if (error) throw error
    return NextResponse.json({ flights: data })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
