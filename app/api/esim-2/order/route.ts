import { NextRequest, NextResponse } from 'next/server';
import { getAiraloClient, AIRALO_BRAND_SETTINGS_NAME } from '@/lib/airalo-client';

interface OrderRequestBody {
    package_id: string;
    quantity?: number;
    email: string;
}

export async function POST(req: NextRequest) {
    let body: OrderRequestBody;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (!body.package_id || !body.email) {
        return NextResponse.json({ error: 'package_id and email are required' }, { status: 400 });
    }

    // NOTE: this route only places the Airalo order and triggers branded
    // delivery. It does not process payment — wire your payment confirmation
    // (Stripe webhook, etc.) to call this route only after payment succeeds.

    try {
        const airalo = getAiraloClient();
        console.log('[esim/order] placing order with:', {
            package_id: body.package_id,
            brand_settings_name: AIRALO_BRAND_SETTINGS_NAME,
            brand_settings_name_length: AIRALO_BRAND_SETTINGS_NAME?.length,
        });
        const order = await airalo.createOrder({
            package_id: body.package_id,
            quantity: body.quantity || 1,
            description: `HUUBOI eSIM order for ${body.email}`,
            brand_settings_name: AIRALO_BRAND_SETTINGS_NAME,
            to_email: body.email,
            sharing_option: ['link', 'pdf'],
        });
        console.log('[esim/order] Airalo response order id:', (order as any)?.data?.id ?? order);

        return NextResponse.json({ order });
    } catch (error) {
        console.error('[esim/order] failed to create order', error);
        return NextResponse.json(
            { error: 'We could not complete your eSIM order. Please try again or contact support.' },
            { status: 502 },
        );
    }
}
