import 'server-only';
import { AiraloService } from './vendor/airalo-sdk';

// Server-only singleton. Never import this file from client components —
// the `server-only` import above will throw a build error if you try.
//
// Required env vars (add to .env.local / your host's environment settings):
//   AIRALO_CLIENT_ID
//   AIRALO_CLIENT_SECRET
//   AIRALO_BRAND_SETTINGS_NAME   (optional — e.g. "HUUBOI eSIM Production")
// AIRALO_BASE_URL is optional; it defaults to the real production host.

let cachedClient: AiraloService | null = null;

export function getAiraloClient(): AiraloService {
    if (cachedClient) return cachedClient;

    const clientId = process.env.AIRALO_CLIENT_ID;
    const clientSecret = process.env.AIRALO_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error(
            'Missing AIRALO_CLIENT_ID / AIRALO_CLIENT_SECRET environment variables. ' +
                'Add them to .env.local (dev) or your hosting provider\'s env settings (production).',
        );
    }

    cachedClient = new AiraloService({
        baseUrl: process.env.AIRALO_BASE_URL, // falls back to the real prod host if unset
        clientId,
        clientSecret,
    });

    return cachedClient;
}

export const AIRALO_BRAND_SETTINGS_NAME = process.env.AIRALO_BRAND_SETTINGS_NAME || undefined;
