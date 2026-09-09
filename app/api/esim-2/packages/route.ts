import { NextRequest, NextResponse } from 'next/server';
import { getCachedPackages } from '@/lib/esim2-packages';

export async function GET(req: NextRequest) {
    const country = req.nextUrl.searchParams.get('country') || undefined;
    const type = req.nextUrl.searchParams.get('type') || undefined;

    try {
        const packages = await getCachedPackages(type, country);
        return NextResponse.json({ packages });
    } catch (error) {
        console.error('[esim-2/packages] failed to fetch packages', error);
        return NextResponse.json(
            { error: 'Could not load eSIM plans right now. Please try again in a moment.' },
            { status: 502 },
        );
    }
}
