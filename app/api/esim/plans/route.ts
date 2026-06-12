import { NextRequest, NextResponse } from "next/server";

const JOURNEY_API_URL = "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.JOURNEY_STACK_API_KEY!;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  
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
  return NextResponse.json(data);
}
