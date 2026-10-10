import { hbxTransferGet, hbxTransferPost } from './client';

export type TransferLocationType = 'IATA' | 'ATLAS' | 'PORT' | 'STATION';

export interface TransferLocation {
  code: string;
  name: string;
  countryCode: string;
  language: string;
  type: TransferLocationType;
}

export interface TransferAvailabilityRequest {
  language: string;
  fromType: TransferLocationType;
  fromCode: string;
  toType: TransferLocationType;
  toCode: string;
  outbound: string; // ISO8601: 2027-05-08T10:00:00
  inbound?: string; // Optional for one-way
  adults: number;
  children: number;
  infants: number;
}

// HBX terminal content.type -> transfer API location type
const TERMINAL_TYPE_MAP: Record<string, TransferLocationType> = {
  A: 'IATA',
  P: 'PORT',
  S: 'STATION',
};

/**
 * Fetches airports, ports and stations from the HBX Transfers Cache API.
 * These are the codes the availability endpoint accepts. Used for autocomplete.
 */
export async function fetchTransferLocations(countryCodes: string = 'ES'): Promise<TransferLocation[]> {
  const path = '/transfer-cache-api/1.0/locations/terminals';
  const limit = 1000;
  const all: TransferLocation[] = [];

  for (let page = 0; page < 10; page++) {
    const offset = 1 + page * limit;
    const rows = (await hbxTransferGet(path, {
      fields: 'ALL',
      language: 'ENG',
      countryCodes,
      offset,
      limit,
    })) as any[];

    if (!Array.isArray(rows) || rows.length === 0) break;

    for (const t of rows) {
      const type = TERMINAL_TYPE_MAP[t?.content?.type];
      if (!type || !t?.code) continue;
      all.push({
        code: String(t.code).toUpperCase(),
        name: t.content?.description ?? String(t.code),
        countryCode: t.countryCode,
        language: t.language ?? 'EN',
        type,
      });
    }

    if (rows.length < limit) break;
  }

  return all;
}

/**
 * Fetches transfer availability for a specific route.
 * Note: This endpoint uses path segments, not query params.
 */
export async function fetchTransferAvailability(req: TransferAvailabilityRequest) {
  const inbound = req.inbound || '';
  const path = `/transfer-api/1.0/availability/${req.language}/from/${req.fromType}/${req.fromCode}/to/${req.toType}/${req.toCode}/${req.outbound}/${inbound}/${req.adults}/${req.children}/${req.infants}`;

  // Call hbxTransferGet with the full path and no additional params object
  const data = await hbxTransferGet(path);
  return data;
}

/**
 * Confirms a booking with HBX.
 */
export async function createTransferBooking(rateKey: string, bookingDetails: any) {
  return await hbxTransferPost('/transfer-api/1.0/bookings', {
    rateKey,
    ...bookingDetails,
  });
}
