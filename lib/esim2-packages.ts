import { flattenPackages, FlattenedPackage } from '@yemifatodu/airalo-api';
import { getAiraloClient } from './airalo-client';

// Shared with app/api/esim-2/packages and app/api/esim-2/create-payment-intent
// so both read from the same cache instead of hitting Airalo independently.
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: FlattenedPackage[]; expiresAt: number }>();

export async function getCachedPackages(type?: string, country?: string): Promise<FlattenedPackage[]> {
    const cacheKey = `${type ?? 'all'}:${country ?? 'all'}`;
    const cached = cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
        return cached.data;
    }

    const airalo = getAiraloClient();
    const start = Date.now();
    const response = await airalo.getPackages({
        type: type as 'global' | 'local' | 'regional' | undefined,
        country,
        limit: 50,
        page: 1,
    });
    const flat = flattenPackages(response.data, 'USD');

    cache.set(cacheKey, { data: flat, expiresAt: Date.now() + CACHE_TTL_MS });
    return flat;
}

/**
 * Looks up a single package by its id (slug) from the cached "all packages"
 * list. Used server-side to verify the real price before creating a
 * PaymentIntent — never trust a price sent from the client.
 */
export async function findPackageById(packageId: string): Promise<FlattenedPackage | undefined> {
    const all = await getCachedPackages();
    return all.find(p => p.package_id === packageId);
}
