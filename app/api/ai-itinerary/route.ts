import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { destination, days = 7, budget = 'luxury', style = 'adventure', interests = [] } = await req.json()
    if (!destination) return NextResponse.json({ error: 'destination required' }, { status: 400 })
    const prompt = `You are an expert luxury travel planner. Create a detailed ${days}-day itinerary for ${destination}. Travel style: ${style}. Budget: ${budget}. Interests: ${interests.join(', ')}. Return JSON: { title, summary, days: [{ day, title, morning, afternoon, evening, accommodation, tips }] }`
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-4-turbo', messages: [{ role: 'user', content: prompt }], response_format: { type: 'json_object' }, max_tokens: 3000 })
    })
    const data = await res.json()
    return NextResponse.json({ itinerary: JSON.parse(data.choices[0].message.content) })
  } catch { return NextResponse.json({ error: 'AI generation failed' }, { status: 500 }) }
}
