import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { findPackageById } from '@/lib/esim2-packages';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-05-27.dahlia',
});

export async function POST(request: NextRequest) {
    try {
        const { package_id, customer_email } = await request.json();

        if (!package_id) {
            return NextResponse.json({ success: false, error: 'package_id is required' }, { status: 400 });
        }
        if (!customer_email) {
            return NextResponse.json({ success: false, error: 'customer_email is required' }, { status: 400 });
        }

        // Look up the real price server-side — never trust a price sent from the client.
        const pkg = await findPackageById(package_id);
        if (!pkg) {
            return NextResponse.json({ success: false, error: 'Plan not found or no longer available' }, { status: 400 });
        }

        const priceInCents = Math.round(pkg.price * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: priceInCents,
            currency: pkg.currency.toLowerCase(),
            payment_method_types: ['card'],
            metadata: {
                package_id: pkg.package_id,
                package_title: `${pkg.country_title} — ${pkg.is_unlimited ? 'Unlimited' : pkg.data}, ${pkg.day} days`,
                customer_email,
            },
        });

        return NextResponse.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('[esim-2/create-payment-intent] error', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Payment setup failed' },
            { status: 500 },
        );
    }
}