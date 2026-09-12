import { NextRequest, NextResponse } from "next/server";

const JOURNEY_API_URL = "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.JOURNEY_STACK_API_KEY!;

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: unknown; expiresAt: number }>();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  const cacheKey = queryString || "default";
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.data);
  }

  const response = await fetch(
    `${JOURNEY_API_URL}/api-plans${queryString ? `?${queryString}` : ""}`,
    {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  cache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS });
  return NextResponse.json(data);
}