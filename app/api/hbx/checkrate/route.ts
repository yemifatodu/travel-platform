import { NextRequest, NextResponse } from 'next/server'
import { hbxPost } from '@/lib/hbx/client'
import { signPrice } from '@/lib/hbx/price-token'

export async function POST(req: NextRequest) {
  try {
    const { rate_key } = await req.json()
    if (!rate_key) {
      return NextResponse.json({ error: 'Missing rate_key' }, { status: 400 })
    }

    const data = await hbxPost('/hotel-api/1.0/checkrates', {
      rooms: [{ rateKey: rate_key }],
    })

    const hotelNode = data?.hotel ?? data?.hotels
    const room = hotelNode?.rooms?.[0]
    const rate = room?.rates?.[0]
    if (!rate) {
      return NextResponse.json({ error: 'Rate is no longer available' }, { status: 409 })
    }

    return NextResponse.json({
      rate_key: rate.rateKey,       // may be a NEW key — always use this one going forward
      net: Number(rate.net),
      selling_rate: rate.sellingRate ? Number(rate.sellingRate) : Number(rate.net), currency: hotelNode?.currency ?? null, cancellation_policies: rate.cancellationPolicies ?? [], rate_comments: rate.rateComments ?? null, rate_comments_id: rate.rateCommentsId ?? null, promotions: rate.promotions ?? [], packaging: rate.packaging ?? false, price_token: signPrice(rate.rateKey, rate.sellingRate ? Number(rate.sellingRate) : Number(rate.net), String(hotelNode?.currency)),
    })
  } catch (err) {
    console.error('HBX checkrate error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Rate check failed' },
      { status: 500 }
    )
  }
}