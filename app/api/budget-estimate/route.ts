import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { destination, days, travelers, style, includes } = await req.json()
    const prompt = `You are a travel budget expert. Estimate a detailed budget for: ${travelers} traveler(s) visiting ${destination} for ${days} days, travel style: ${style}, includes: ${includes?.join(', ')}.
    Return JSON only: { "total_min": number, "total_max": number, "currency": "USD", "per_day_min": number, "per_day_max": number, "breakdown": { "flights": {"min":0,"max":0}, "accommodation": {"min":0,"max":0}, "food": {"min":0,"max":0}, "activities": {"min":0,"max":0}, "transport": {"min":0,"max":0}, "shopping": {"min":0,"max":0}, "misc": {"min":0,"max":0} }, "money_tips": ["tip1","tip2","tip3"], "best_value_tip": "" }`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-4-turbo', messages: [{ role: 'user', content: prompt }], response_format: { type: 'json_object' }, max_tokens: 800 })
    })
    const data = await res.json()
    return NextResponse.json(JSON.parse(data.choices[0].message.content))
  } catch {
    return NextResponse.json({ error: 'Budget estimation failed' }, { status: 500 })
  }
}
