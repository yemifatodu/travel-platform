import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_BASE_URL = process.env.ESIM_API_URL || "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.NEXT_PUBLIC_ESIM_API_KEY || "";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Plan ID is required" },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { success: false, error: "API key not configured" },
        { status: 500 }
      );
    }
    
    const response = await fetch(`${API_BASE_URL}/api-plan-details/${id}`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || "Failed to fetch plan details" },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching plan details:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}