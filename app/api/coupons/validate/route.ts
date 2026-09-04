import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ valid: false, error: 'Coupons are not configured yet.' }, { status: 500 })
    }

    const { code, order_value } = await req.json()
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'Enter a code.' }, { status: 400 })
    }

    // Service-role client — a coupon's existence/validity is checked here,
    // never fetched as a public list the client can browse.
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('id, code, discount_type, discount_value, min_order_value, max_uses, uses_count, valid_from, valid_until, is_active')
      .ilike('code', code.trim())
      .single()

    if (error || !coupon) {
      return NextResponse.json({ valid: false, error: 'That code isn\u2019t valid.' })
    }
    if (!coupon.is_active) {
      return NextResponse.json({ valid: false, error: 'That code is no longer active.' })
    }
    const now = new Date()
    if (coupon.valid_from && new Date(coupon.valid_from) > now) {
      return NextResponse.json({ valid: false, error: 'That code isn\u2019t active yet.' })
    }
    if (coupon.valid_until && new Date(coupon.valid_until) < now) {
      return NextResponse.json({ valid: false, error: 'That code has expired.' })
    }
    if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses) {
      return NextResponse.json({ valid: false, error: 'That code has reached its usage limit.' })
    }
    if (coupon.min_order_value && order_value < coupon.min_order_value) {
      return NextResponse.json({
        valid: false,
        error: `This code needs an order of at least ${coupon.min_order_value}.`,
      })
    }

    const discount_amount =
      coupon.discount_type === 'percentage'
        ? Math.round(((order_value * coupon.discount_value) / 100) * 100) / 100
        : Math.min(coupon.discount_value, order_value)

    return NextResponse.json({
      valid: true,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      discount_amount,
    })
  } catch (err) {
    console.error('Coupon validation error:', err)
    return NextResponse.json({ valid: false, error: 'Something went wrong checking that code.' }, { status: 500 })
  }
}
