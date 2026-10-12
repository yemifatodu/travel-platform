import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase/server'
import { getActivityDetails } from '@/lib/hbx/activities'
import { hbxActivityPut } from '@/lib/hbx/client'

const str = (v: unknown, max = 80) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status })

export async function POST(req: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_TEST_SECRET_KEY
    if (!stripeKey) return bad('Payments are not configured', 500)
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-05-27.dahlia' })

    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return bad('Sign in required', 401)

    const b = await req.json()
    const code = str(b.code, 60)
    const date = str(b.date, 10)
    const session = str(b.session, 20)
    const modality = str(b.modality, 80)
    const h = b.holder || {}
    const holder = {
      title: str(h.title, 5),
      name: str(h.name, 40),
      surname: str(h.surname, 40),
      email: str(h.email, 100),
      phone: str(h.phone, 25),
      country: str(h.country, 2).toUpperCase(),
    }
    const paxIn: any[] = Array.isArray(b.paxes) ? b.paxes : []
    const answersIn: Record<string, unknown> = b.answers && typeof b.answers === 'object' ? b.answers : {}

    if (!/^[A-Za-z0-9_-]{3,60}$/.test(code)) return bad('Invalid activity')
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < new Date().toISOString().slice(0, 10)) return bad('Choose a valid future date')
    if (!['Mr', 'Ms', 'Miss'].includes(holder.title) || !holder.name || !holder.surname) return bad('Lead traveller title and name are required')
    if (!/^\S+@\S+\.\S+$/.test(holder.email)) return bad('A valid email is required')
    if (!/^\+?[0-9 ()-]{7,25}$/.test(holder.phone)) return bad('A valid phone number is required')
    if (!/^[A-Z]{2}$/.test(holder.country)) return bad('Country must be a 2-letter code')
    if (paxIn.length < 1 || paxIn.length > 10) return bad('Add 1 to 10 travellers')

    const paxes = paxIn.map((p) => ({ name: str(p?.name, 40), surname: str(p?.surname, 40), age: Number(p?.age) }))
    if (paxes.some((p) => !p.name || !p.surname || !Number.isInteger(p.age) || p.age < 0 || p.age > 120)) {
      return bad('Every traveller needs a first name, last name and age')
    }

    // Always re-fetch from HBX: the browser is never trusted for price or rateKey.
    const detail = await getActivityDetails({ code, date, ages: paxes.map((p) => p.age) })
    const act = detail?.activity
    const mods: any[] = act?.modalities || []
    const mod = modality ? mods.find((m) => m.code === modality) : mods[0]
    if (!mod) return bad('This activity is not available on that date', 404)

    const options: any[] = (mod.rates || []).flatMap((r: any) => r.rateDetails || [])
    const rate = options.find((o) => {
      const hasSession = (o.sessions || []).length > 0
      return hasSession ? o.sessions[0].code === session : true
    })
    if (!rate) return bad('Please choose one of the available sessions')
    if ((rate.languages || []).length > 0) return bad('Language-selectable activities are not supported yet')

    const ranges: any[] = rate.paxAmounts || []
    const typeFor = (age: number) => {
      const r = ranges.find((x) => age >= x.ageFrom && age <= x.ageTo)
      return r?.paxType || (age >= 18 ? 'ADULT' : 'CHILD')
    }
    const hbxPaxes = paxes
      .map((p) => ({ age: p.age, name: p.name, surname: p.surname, type: typeFor(p.age) }))
      .sort((a, c) => (a.type === c.type ? 0 : a.type === 'ADULT' ? -1 : 1))

    const answers: any[] = []
    for (const q of (mod.questions || []) as any[]) {
      const a = str(answersIn[q.code], 200)
      if (q.required && !a) return bad(`Please answer: ${q.text}`)
      if (a) answers.push({ question: { code: q.code }, answer: a })
    }

    const clientReference = ('HB' + Date.now().toString(36)).toUpperCase()
    const pre = await hbxActivityPut('/activity-api/3.0/bookings/preconfirm', {
      clientReference,
      language: 'en',
      holder: {
        name: holder.name,
        surname: holder.surname,
        title: holder.title,
        email: holder.email,
        address: 'N/A',
        zipCode: 'N/A',
        mailing: false,
        country: holder.country,
        telephones: [holder.phone],
      },
      activities: [
        {
          rateKey: rate.rateKey,
          from: date,
          to: date,
          ...((rate.sessions || []).length > 0 ? { session: rate.sessions[0].code } : {}),
          paxes: hbxPaxes,
          answers,
        },
      ],
    })

    const ref = pre?.booking?.reference
    const total = Number(pre?.booking?.total)
    const currency = String(pre?.booking?.currency || '').toUpperCase()
    if (pre?.booking?.status !== 'PRECONFIRMED' || !ref || !(total > 0) || currency.length !== 3) {
      console.error('Unexpected HBX preconfirm response:', JSON.stringify(pre).slice(0, 800))
      return bad('Could not hold this activity. Please try another time.', 502)
    }

    const { data: booking, error: bookingError } = await (supabase.from('bookings') as any)
      .insert({
        user_id: user.id,
        status: 'pending',
        total_price: total,
        currency,
        payment_status: 'unpaid',
        traveller_count: paxes.length,
        hbx_booking_reference: ref,
      })
      .select()
      .single()
    if (bookingError || !booking) {
      console.error('Activity booking insert failed:', bookingError?.message)
      return bad('Could not create booking', 500)
    }

    const name = act?.name || act?.content?.name || code
    const { error: itemError } = await (supabase.from('booking_items') as any).insert({
      booking_id: booking.id,
      item_type: 'tour',
      item_id: null,
      item_name: name,
      quantity: paxes.length,
      unit_price: Math.round((total / paxes.length) * 100) / 100,
      total_price: total,
      check_in: date,
      check_out: date,
      details: {
        source: 'hbx_activity',
        code,
        modality: mod.code,
        session: session || null,
        hbx_reference: ref,
        holder,
        paxes: hbxPaxes,
        answers,
      },
    })
    if (itemError) {
      console.error('Activity booking item insert failed:', itemError.message)
      await (supabase.from('bookings') as any).update({ status: 'cancelled' }).eq('id', booking.id)
      return bad('Could not create booking item', 500)
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const checkout = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: holder.email,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60 + 30,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: { name, description: `${date}${session ? ' at ' + session : ''} · ${paxes.length} traveller${paxes.length !== 1 ? 's' : ''}` },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { booking_id: booking.id, kind: 'activity', product: 'activity' },
      success_url: `${origin}/activities?booking=success&booking_id=${booking.id}`,
      cancel_url: `${origin}/activities?booking=cancelled`,
    })

    const { error: linkError } = await (supabase.from('bookings') as any)
      .update({ stripe_intent_id: checkout.id })
      .eq('id', booking.id)
    if (linkError) console.error('Failed to save Stripe session id:', linkError.message)

    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    console.error('Activity checkout error:', error)
    return bad(error instanceof Error ? error.message : 'Checkout failed', 500)
  }
}

