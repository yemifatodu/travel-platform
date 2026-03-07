import { NextRequest, NextResponse } from 'next/server'

// POST /api/price-prediction
// Uses AI to predict best time to book based on route + travel date
export async function POST(req: NextRequest) {
  try {
    const { origin, destination, travel_date, trip_type = 'flight' } = await req.json()
    if (!origin || !destination || !travel_date) {
      return NextResponse.json({ error: 'origin, destination, travel_date required' }, { status: 400 })
    }

    const prompt = `You are a travel pricing analyst with access to historical booking data. 
    Analyze the price trend for a ${trip_type} from ${origin} to ${destination} for travel date ${travel_date}.
    Return JSON only: {
      "recommendation": "buy_now" | "wait" | "book_immediately",
      "confidence": 0-100,
      "current_price_level": "low" | "medium" | "high" | "peak",
      "price_trend": "rising" | "falling" | "stable",
      "best_booking_window": "string describing ideal booking time",
      "predicted_price_change": "e.g. +12% in next 7 days",
      "reasoning": "2-3 sentence explanation",
      "tips": ["tip1", "tip2", "tip3"]
    }`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        max_tokens: 600,
      })
    })
    const data = await res.json()
    const prediction = JSON.parse(data.choices[0].message.content)
    return NextResponse.json({ prediction })
  } catch (err) {
    return NextResponse.json({ error: 'Price prediction failed' }, { status: 500 })
  }
}
