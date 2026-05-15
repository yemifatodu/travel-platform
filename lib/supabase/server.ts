import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'
export const createServerClient = () => createServerComponentClient<Database>({ cookies })





import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

// Cache eSIM plans
export async function cachePlans(plans: any[]) {
  const { error } = await supabase
    .from('cached_plans')
    .upsert([
      {
        id: 'esim_plans',
        data: plans,
        updated_at: new Date().toISOString(),
      },
    ])

  if (error) {
    console.error('Cache error:', error)
  }
}

export async function getCachedPlans() {
  const { data, error } = await supabase
    .from('cached_plans')
    .select('*')
    .eq('id', 'esim_plans')
    .single()

  if (error || !data) {
    return null
  }

  const cacheAge =
    Date.now() - new Date(data.updated_at).getTime()

  if (cacheAge > 3600000) {
    return null
  }

  return data.data
}
