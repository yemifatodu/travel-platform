import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAiraloClient, AIRALO_BRAND_SETTINGS_NAME } from '@/lib/airalo-client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_ESIM2!, {
    apiVersion: '2026-05-27.dahlia',
});

// This is a SEPARATE webhook endpoint from the existing /api/esim/webhook/stripe.
// Register it as its own endpoint in the Stripe Dashboard (Developers > Webhooks)
// pointing at https://huuboi.com/api/esim-2/webhook/stripe, listening for
// payment_intent.succeeded — Stripe issues a distinct signing secret per
// endpoint, so this needs its own STRIPE_WEBHOOK_SECRET_ESIM2 env var
// (do not reuse the existing STRIPE_WEBHOOK_SECRET, it won't validate here).

export async function POST(request: NextRequest) {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET_ESIM2!);
    } catch (err) {
        console.error('[esim-2/webhook] signature verification failed:', err);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { package_id, customer_email } = paymentIntent.metadata;

        if (!package_id || !customer_email) {
            console.error('[esim-2/webhook] missing package_id/customer_email in metadata', paymentIntent.id);
            return NextResponse.json({ received: true });
        }

        try {
            const airalo = getAiraloClient();
            const order = await airalo.createOrder({
                package_id,
                quantity: 1,
                description: `HUUBOI eSIM order for ${customer_email} (PaymentIntent ${paymentIntent.id})`,
                brand_settings_name: AIRALO_BRAND_SETTINGS_NAME,
                to_email: customer_email,
                sharing_option: ['link', 'pdf'],
            });
            console.log('[esim-2/webhook] Airalo order placed:', (order as any)?.data?.id ?? order);
        } catch (err) {
            // IMPORTANT: the customer has already been charged at this point.
            // A failure here needs real follow-up (retry, alert, manual fulfillment,
            // or refund) — don't let this fail silently in production.
            console.error('[esim-2/webhook] Airalo order FAILED after successful payment', {
                paymentIntentId: paymentIntent.id,
                customer_email,
                package_id,
                error: err,
            });
        }
    }

    return NextResponse.json({ received: true });
}
