import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || 'MF7JuQF6sV0yNMMOdkl9mxokv776NIG5';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add bypass header to bypass Vercel deployment protection
  response.headers.set('x-vercel-protection-bypass', BYPASS_SECRET);
  
  return response;
}

export const config = {
  matcher: '/esim/:path*',
};
