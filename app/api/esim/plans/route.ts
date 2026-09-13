import { NextRequest, NextResponse } from "next/server";

const JOURNEY_API_URL = "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.JOURNEY_STACK_API_KEY;

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes — plans change rarely
const MAX_CACHE_SIZE = 100;          // Bound the in-memory cache
const FETCH_TIMEOUT_MS = 10_000;

// Params we strip before sending upstream (handled locally)
const LOCAL_ONLY_PARAMS = new Set(["page", "limit"]);

// Simple LRU-style cache using Map insertion order
const cache = new Map<string, { data: unknown; expiresAt: number }>();

function getCache(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  // Refresh LRU position
  cache.delete(key);
  cache.set(key, entry);
  return entry.data;
}

function setCache(key: string, data: unknown) {
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

export async function GET(request: NextRequest) {
  // 👇 TEMPORARY DEBUG — remove after testing
  console.log(
    "[esim/plans] API key loaded:",
    API_KEY ? `yes (${API_KEY.slice(0, 6)}...)` : "NO"
  );
  console.log("[esim/plans] API key length:", API_KEY?.length);

  // 1. Validate env
  if (!API_KEY) {
    console.error("[esim/plans] JOURNEY_STACK_API_KEY is not configured");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  // 2. Parse incoming query params
  const searchParams = request.nextUrl.searchParams;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") || "25", 10))
  );

  // Build upstream query string, excluding pagination params
  const upstreamParams = new URLSearchParams();
  for (const [key, value] of searchParams.entries()) {
    if (!LOCAL_ONLY_PARAMS.has(key)) upstreamParams.set(key, value);
  }
  const upstreamQuery = upstreamParams.toString();

  // 3. Cache key = upstream query only (pagination applied after cache)
  const cacheKey = upstreamQuery || "default";

  // 4. Check cache
  const cachedData = getCache(cacheKey) as
    | { plans?: unknown[]; data?: unknown[] }
    | null;

  if (cachedData) {
    return paginatedResponse(cachedData, page, limit, "HIT");
  }

  // 5. Fetch with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const upstreamUrl = `${JOURNEY_API_URL}/api-plans${
      upstreamQuery ? `?${upstreamQuery}` : ""
    }`;

    const response = await fetch(upstreamUrl, {
      headers: { "x-api-key": API_KEY },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 6. Handle non-OK HTTP responses
    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      console.error(
        `[esim/plans] Upstream HTTP ${response.status}:`,
        errBody.slice(0, 500)
      );
      return NextResponse.json(
        { error: "Failed to fetch eSIM plans" },
        { status: response.status >= 500 ? 502 : response.status }
      );
    }

    const data = await response.json();

    // 7. Handle "soft failures" — HTTP 200 but { success: false } in body
    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data) &&
      (data as { success?: boolean }).success === false
    ) {
      const upstreamError =
        (data as { error?: string }).error || "Unknown upstream error";
      console.error("[esim/plans] Upstream soft failure:", upstreamError);

      const status = /api key/i.test(upstreamError) ? 401 : 502;

      return NextResponse.json({ error: upstreamError }, { status });
    }

    // 8. Only cache successful responses
    setCache(cacheKey, data);

    return paginatedResponse(data, page, limit, "MISS");
  } catch (err) {
    clearTimeout(timeoutId);
    const isAbort = err instanceof Error && err.name === "AbortError";
    console.error("[esim/plans] Fetch failed:", err);
    return NextResponse.json(
      { error: isAbort ? "Upstream timeout" : "Internal server error" },
      { status: isAbort ? 504 : 500 }
    );
  }
}

/**
 * Normalize the upstream payload and paginate.
 * Handles both { plans: [...] } and raw array responses.
 */
function paginatedResponse(
  raw: unknown,
  page: number,
  limit: number,
  cacheStatus: "HIT" | "MISS"
) {
  let allPlans: unknown[] = [];

  if (Array.isArray(raw)) {
    allPlans = raw;
  } else if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj.plans)) allPlans = obj.plans;
    else if (Array.isArray(obj.data)) allPlans = obj.data;
  }

  const total = allPlans.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const items = allPlans.slice(start, start + limit);

  return NextResponse.json(
    {
      plans: items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
        "X-Cache": cacheStatus,
      },
    }
  );
}