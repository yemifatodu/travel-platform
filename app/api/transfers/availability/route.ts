import { NextRequest, NextResponse } from 'next/server';
import { createTransferAdminClient } from '@/lib/supabase/transfer-admin';
import { fetchTransferAvailability, fetchTransferLocations } from '@/lib/hbx/transfers';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pickupId = searchParams.get('pickupId')?.toUpperCase();
  const dropoffId = searchParams.get('dropoffId')?.toUpperCase();
  const date = searchParams.get('date');
  const pax = searchParams.get('pax'); const timeParam = searchParams.get('time'); const time = timeParam && /^\d{2}:\d{2}$/.test(timeParam) ? timeParam : '10:00';

  if (!pickupId || !dropoffId || !date || !pax) {
    return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ success: false, error: 'Invalid date format' }, { status: 400 });
  }

  const adults = parseInt(pax, 10);
  if (!Number.isFinite(adults) || adults < 1) {
    return NextResponse.json({ success: false, error: 'Invalid passenger count' }, { status: 400 });
  }

  const supabase = createTransferAdminClient();

  async function getTypes() {
    const { data: locations, error: locError } = await supabase
      .from('transfers_locations')
      .select('code, type')
      .in('code', [pickupId!, dropoffId!]);

    if (locError) return { locations: [], error: locError };
    return { locations, error: null };
  }

  try {
    let { locations, error: locError } = await getTypes();

    // SELF-HEALING: If locations aren't found, the cache might be empty. Sync now.
    if (!locations || locations.length < 2) {
      try {
        const freshLocations = await fetchTransferLocations();
        const upsertData = freshLocations.map(loc => ({
          code: loc.code.toUpperCase(),
          name: loc.name,
          country_code: loc.countryCode,
          language: loc.language,
          type: loc.type,
        }));

        await (supabase.from('transfers_locations') as any).upsert(upsertData, {
          onConflict: 'code'
        });

        // Try one more time after syncing
        const result = await getTypes();
        locations = result.locations;
        locError = result.error;
      } catch (syncErr) {
        console.error('Self-healing sync failed:', syncErr);
      }
    }

    if (locError) throw locError;

    const locs = (locations || []) as any[];
    const pickupLoc = locs.find((l: any) => l.code.toUpperCase() === pickupId);
    const dropoffLoc = locs.find((l: any) => l.code.toUpperCase() === dropoffId);

    if (!pickupLoc || !dropoffLoc) {
      return NextResponse.json({
        success: false,
        error: `Locations not found in catalogue (${pickupId}, ${dropoffId}). Please try searching again.`
      }, { status: 400 });
    }

    const fromType = pickupLoc.type as any;
    const toType = dropoffLoc.type as any;

    const availability = await fetchTransferAvailability({
      language: 'en',
      fromType,
      fromCode: pickupId,
      toType,
      toCode: dropoffId,
      outbound: `${date}T${time}:00`,
      adults,
      children: 0,
      infants: 0,
    });

    if (!availability || !availability.services || availability.services.length === 0) {
      return NextResponse.json({ success: false, message: 'No availability found' });
    }

    const vehicles = availability.services.map((s: any) => ({
      id: s.id,
      vehicleName: `${s.vehicle?.name ?? 'Vehicle'} (${s.category?.name ?? 'Standard'})`,
      description: `Capacity: ${s.minPaxCapacity ?? 1}-${s.maxPaxCapacity ?? '?'} pax. Provider: ${s.provider?.name ?? 'N/A'}`,
      price: s.price?.totalAmount,
      currency: s.price?.currencyId,
      rateKey: s.rateKey, image: (s.content?.images?.find((i: any) => i.type === "MEDIUM") ?? s.content?.images?.[0])?.url ?? null,
    }));

    return NextResponse.json({ success: true, vehicles });
  } catch (err: any) {
    console.error('Availability API error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}

