import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const destination = new URL(req.url).searchParams.get('destination')
  if (!destination) return NextResponse.json({ error: 'destination required' }, { status: 400 })
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from('hotels').select('*, rooms(*)')
      .eq('is_published', true).order('avg_rating', { ascending: false }).limit(20)
    if (error) throw error
    return NextResponse.json({ hotels: data })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
