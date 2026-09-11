import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

if (!BYPASS_SECRET) {
  console.warn(
    '[middleware] VERCEL_AUTOMATION_BYPASS_SECRET is not set — Vercel protection bypass is disabled.'
  );
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add bypass header only when the secret is configured.
  if (BYPASS_SECRET) {
    response.headers.set(
      'x-vercel-protection-bypass',
      BYPASS_SECRET
    );
  }

  return response;
}

export const config = {
  matcher: '/esim/:path*',
};