import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const GUEST_LIMIT = 10
const REGISTERED_LIMIT = 10

export async function POST(req: NextRequest) {
  try {
    const { destination, days = 7, budget = 'luxury', style = 'adventure', interests = [], guest_session } = await req.json()
    if (!destination) return NextResponse.json({ error: 'destination required' }, { status: 400 })
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })

    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (token) {
      // --- REGISTERED USER ---
      const { data: { user } } = await supabase.auth.getUser(token)
      if (user) {
        // Check if user has a confirmed booking → UNLIMITED
        const { data: booking } = await supabase
          .from('bookings')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'confirmed')
          .limit(1)
          .single()

        if (booking) {
          // Unlimited — just generate
          const itinerary = await generateItinerary(destination, days, budget, style, interests)
          return NextResponse.json({ itinerary, remaining: 'unlimited', has_booking: true })
        }

        // No booking yet — check 10 prompt limit
        const { data: usage } = await supabase
          .from('ai_usage')
          .select('count')
          .eq('user_id', user.id)
          .single()

        const currentCount = usage?.count || 0

        if (currentCount >= REGISTERED_LIMIT) {
          return NextResponse.json({
            error: `You have used all ${REGISTERED_LIMIT} free prompts. Make a booking to unlock unlimited AI access!`,
            limit_reached: true,
            has_booking: false,
            current: currentCount,
            limit: REGISTERED_LIMIT
          }, { status: 403 })
        }

        await supabase.from('ai_usage').upsert({
          user_id: user.id,
          count: currentCount + 1,
          last_used: new Date().toISOString()
        }, { onConflict: 'user_id' })

        const itinerary = await generateItinerary(destination, days, budget, style, interests)
        return NextResponse.json({
          itinerary,
          remaining: REGISTERED_LIMIT - (currentCount + 1),
          has_booking: false
        })
      }
    }

    // --- GUEST USER — track by session ID in DB ---
    const sessionId = guest_session || 'anonymous'
    const { data: guestUsage } = await supabase
      .from('ai_usage_guests')
      .select('count')
      .eq('session_id', sessionId)
      .single()

    const guestCount = guestUsage?.count || 0

    if (guestCount >= GUEST_LIMIT) {
      return NextResponse.json({
        error: `You have used all ${GUEST_LIMIT} guest prompts. Sign up for free to get ${REGISTERED_LIMIT} more — or book a trip for unlimited access!`,
        limit_reached: true,
        is_guest: true
      }, { status: 403 })
    }

    await supabase.from('ai_usage_guests').upsert({
      session_id: sessionId,
      count: guestCount + 1,
      last_used: new Date().toISOString()
    }, { onConflict: 'session_id' })

    const itinerary = await generateItinerary(destination, days, budget, style, interests)
    return NextResponse.json({
      itinerary,
      remaining: GUEST_LIMIT - (guestCount + 1),
      is_guest: true
    })

  } catch (err) {
    console.error('AI itinerary error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

async function generateItinerary(destination: string, days: number, budget: string, style: string, interests: string[]) {
  const prompt = `You are an expert luxury travel planner. Create a detailed ${days}-day itinerary for ${destination}. Travel style: ${style}. Budget: ${budget}. Interests: ${interests.join(', ')}. Return JSON: { title, summary, days: [{ day, title, morning, afternoon, evening, accommodation, tips }] }`
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: 'gpt-3.5-turbo-0125', messages: [{ role: 'user', content: prompt }], response_format: { type: 'json_object' }, max_tokens: 3000 })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || 'OpenAI API error')
  return JSON.parse(data.choices[0].message.content)
}
