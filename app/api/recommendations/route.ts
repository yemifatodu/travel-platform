import { NextRequest, NextResponse } from 'next/server'

// POST /api/recommendations
// Generates personalised destination recommendations based on user preferences
export async function POST(req: NextRequest) {
  try {
    const { budget, duration, travel_style, interests, from_country, avoid = [], season } = await req.json()

    const prompt = `You are a world-class travel consultant. Based on the traveller profile below, recommend 5 perfect destinations.
    Profile: Budget: ${budget}, Duration: ${duration} days, Style: ${travel_style}, Interests: ${interests?.join(', ')}, Departing from: ${from_country}, Season: ${season}, Avoid: ${avoid?.join(', ')}.
    Return JSON only: { "recommendations": [{ "destination": "", "country": "", "continent": "", "match_score": 0-100, "why": "2 sentences", "best_for": ["tag1","tag2"], "avg_cost": "", "highlight": "one unforgettable thing" }] }`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-3.5-turbo-0125', messages: [{ role: 'user', content: prompt }], response_format: { type: 'json_object' }, max_tokens: 1200 })
    })
    const data = await res.json()
    return NextResponse.json(JSON.parse(data.choices[0].message.content))
  } catch {
    return NextResponse.json({ error: 'Recommendation failed' }, { status: 500 })
  }
}
