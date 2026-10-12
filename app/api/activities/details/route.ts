import { NextRequest, NextResponse } from 'next/server'
import { getActivityDetails, toCurrencyCode } from '@/lib/hbx/activities'

export const dynamic = 'force-dynamic'

const strip = (s: unknown) => String(s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  const code = p.get('code') || ''
  const date = p.get('date') || ''
  const ages = (p.get('ages') || '30,30').split(',').map((s) => Number(s.trim()))

  if (!/^[A-Za-z0-9_-]{3,60}$/.test(code)) return NextResponse.json({ error: 'invalid activity code' }, { status: 400 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: 'date must be YYYY-MM-DD' }, { status: 400 })
  if (ages.length < 1 || ages.length > 10 || ages.some((n) => !Number.isInteger(n) || n < 0 || n > 120)) {
    return NextResponse.json({ error: 'invalid ages' }, { status: 400 })
  }

  try {
    const res = await getActivityDetails({ code, date, ages })
    const a = res?.activity
    if (!a) return NextResponse.json({ error: 'Activity not found' }, { status: 404 })
    const urls: any[] = a.content?.media?.images?.[0]?.urls || []
    const pic = urls.find((u) => u.sizeType === 'LARGE') || urls[0]
    return NextResponse.json({
      code,
      name: a.content?.name || a.name,
      currency: toCurrencyCode(a),
      description: strip(a.content?.description || a.content?.summary),
      image: pic?.resource || null,
      modalities: (a.modalities || []).map((m: any) => ({
        code: m.code,
        name: m.name,
        questions: (m.questions || []).map((q: any) => ({ code: q.code, text: q.text, required: !!q.required })),
        options: (m.rates || []).flatMap((r: any) =>
          (r.rateDetails || []).map((o: any) => ({
            session: o.sessions?.[0]?.code || null,
            languages: (o.languages || []).length,
            total: Number(o.totalAmount?.amount),
            freeCancellation: !!r.freeCancellation,
            cancellation: (o.operationDates?.[0]?.cancellationPolicies || []).map((c: any) => ({
              dateFrom: c.dateFrom,
              amount: Number(c.amount),
            })),
          }))
        ),
      })),
    })
  } catch (err) {
    console.error('Activity details failed:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Details failed' }, { status: 502 })
  }
}
