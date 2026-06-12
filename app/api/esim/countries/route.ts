// app/api/esim/countries/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('esim_plans')
      .select('*')
    
    if (error) throw error
    
    return NextResponse.json({ plans: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch eSIM data' }, { status: 500 })
  }
}