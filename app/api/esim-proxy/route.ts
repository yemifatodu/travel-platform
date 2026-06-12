// app/api/esim-proxy/route.ts — Secure proxy for eSIM provider API
// All external API calls route through here — API key NEVER exposed to browser
import { NextResponse } from "next/server";

const JOURNEY_BASE = "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.ESIM_API_KEY; // ← Loaded from .env.local (server-only)

// ✅ POST handler for mutations: orders, topups, cancel
export async function POST(request: Request) {
  if (!API_KEY) {
    console.error("💥 ESIM_API_KEY not configured");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const { path, ...body } = await request.json();
    
    if (!path) {
      return NextResponse.json({ error: "Missing 'path' parameter" }, { status: 400 });
    }

    console.log(`📡 Proxy POST → ${path}`);

    const response = await fetch(`${JOURNEY_BASE}${path}`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    // ✅ Redact sensitive fields in logs (never expose in browser)
    if (data?.data) {
      const safeData = { ...data.data };
      if (safeData.activation_code) safeData.activation_code = "[REDACTED]";
      if (safeData.esim_qr_code) safeData.esim_qr_code = "[REDACTED]";
      if (safeData.manual_code) safeData.manual_code = "[REDACTED]";
      console.log(`✅ Proxy POST ${path}: success`);
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("💥 Proxy POST error:", error.message);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
}

// ✅ GET handler for queries: plans, order details, status
export async function GET(request: Request) {
  if (!API_KEY) {
    console.error("💥 ESIM_API_KEY not configured");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");
    
    if (!path) {
      return NextResponse.json({ error: "Missing 'path' query parameter" }, { status: 400 });
    }

    // Remove 'path' from params and build query string
    searchParams.delete("path");
    const queryString = searchParams.toString();
    const url = `${JOURNEY_BASE}${path}${queryString ? `?${queryString}` : ""}`;

    console.log(`📡 Proxy GET → ${url}`);

    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("💥 Proxy GET error:", error.message);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
}