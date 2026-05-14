import { supabase } from './client'

const TABLE = 'esim_cache'

// GET cached plans
export async function getCachedPlans() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .single()

  if (error || !data) return null

  const now = Date.now()
  if (now > data.expires_at) return null

  return data.plans
}

// SAVE cached plans
export async function cachePlans(plans: any[]) {
  const expiresAt = Date.now() + 3600 * 1000

  await supabase.from(TABLE).upsert({
    id: 1,
    plans,
    expires_at: expiresAt,
    updated_at: new Date().toISOString()
  })
}