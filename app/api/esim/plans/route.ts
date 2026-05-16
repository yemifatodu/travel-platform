import { NextResponse } from "next/server";

const API_BASE_URL = process.env.ESIM_API_URL || "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.NEXT_PUBLIC_ESIM_API_KEY || "";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = new URLSearchParams();
    
    // Forward query parameters
    const params = ["search", "country", "dataMin", "dataMax", "priceMax", "validityMin", "limit", "offset"];
    params.forEach(param => {
      const value = searchParams.get(param);
      if (value) queryParams.append(param, value);
    });
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/api-plans${queryString ? "?" + queryString : ""}`;
    
    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error || "Failed to fetch plans" },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching eSIM plans:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use /api/esim/orders to create orders." },
    { status: 405 }
  );
}
