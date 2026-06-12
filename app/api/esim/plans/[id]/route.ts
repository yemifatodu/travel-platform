import { NextRequest, NextResponse } from "next/server";

const JOURNEY_API_URL = "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.JOURNEY_STACK_API_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const planId = params.id;
    
    const response = await fetch(`${JOURNEY_API_URL}/api-plan-details/${planId}`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || "Plan not found" },
        { status: response.status }
      );
    }
    
    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch plan details" },
      { status: 500 }
    );
  }
}