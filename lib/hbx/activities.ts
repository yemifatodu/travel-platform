import { hbxActivityPost, hbxActivityPut } from './client'

const CURRENCY_NAMES: Record<string, string> = {
  euro: 'EUR',
  'us dollar': 'USD',
  'pound sterling': 'GBP',
  'british pound': 'GBP',
}

// HBX returns a name like "Euro", Stripe needs an ISO code.
export function toCurrencyCode(activity: any): string {
  const c = activity?.content?.currency
  if (typeof c === 'string' && /^[A-Za-z]{3}$/.test(c)) return c.toUpperCase()
  const n = String(activity?.currencyName || '').trim().toLowerCase()
  if (/^[a-z]{3}$/.test(n)) return n.toUpperCase()
  return CURRENCY_NAMES[n] || 'EUR'
}

function pickImage(images: any[] | undefined): string | null {
  if (!images || images.length === 0) return null
  const urls: any[] = images[0]?.urls || []
  const preferred = urls.find((u) => u.sizeType === 'LARGE') || urls.find((u) => u.sizeType === 'MEDIUM') || urls[0]
  return preferred?.resource || null
}

// Cheapest total (for the requested pax) across all modalities, rates and sessions.
function lowestTotal(activity: any): number | null {
  let best: number | null = null
  for (const m of activity?.modalities || []) {
    for (const r of m?.rates || []) {
      for (const d of r?.rateDetails || []) {
        const amt = Number(d?.totalAmount?.amount)
        if (!Number.isNaN(amt) && (best === null || amt < best)) best = amt
      }
    }
  }
  return best
}

export async function searchActivities(opts: {
  destination: string
  date: string
  ages: number[]
  page?: number
  perPage?: number
}) {
  const body = {
    filters: [{ searchFilterItems: [{ type: 'destination', value: opts.destination }] }],
    from: opts.date,
    to: opts.date,
    paxes: opts.ages.map((age) => ({ age })),
    language: 'en',
    pagination: { itemsPerPage: opts.perPage ?? 24, page: opts.page ?? 1 },
    order: 'DEFAULT',
  }
  const res = await hbxActivityPost('/activity-api/3.0/activities/availability', body)
  const activities = (res?.activities || []).map((a: any) => ({
    code: a.content?.activityCode || a.activityCode,
    name: a.content?.name || a.name,
    image: pickImage(a.content?.media?.images),
    summary: a.content?.summary || null,
    currency: toCurrencyCode(a),
    total: lowestTotal(a),
    modalityCount: (a.modalities || []).length,
  }))
  return { activities, pagination: res?.pagination ?? null }
}

export async function getActivityDetails(opts: { code: string; date: string; ages: number[] }) {
  const body = {
    code: opts.code,
    from: opts.date,
    to: opts.date,
    language: 'en',
    paxes: opts.ages.map((age) => ({ age })),
  }
  return hbxActivityPost('/activity-api/3.0/activities/details/full', body)
}




export async function reconfirmWithRetry(body: { language: string; reference: string }) {
  let lastErr: unknown
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await hbxActivityPut('/activity-api/3.0/bookings/reconfirm', body)
    } catch (err) {
      lastErr = err
      const msg = err instanceof Error ? err.message : String(err)
      console.error('HBX reconfirm attempt ' + attempt + ' failed:', msg.slice(0, 300))
      if (!msg.includes('E_BOOKING_NOTFOUND') || attempt === 3) break
      await new Promise((r) => setTimeout(r, attempt * 2000))
    }
  }
  throw lastErr
}
