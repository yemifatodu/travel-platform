'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const GOLD = '#C8A96E';
const INK = '#080807';
const CREAM = '#F5EFE4';
const CREAM_DIM = '#E0D6C4';
const FONT_UI = 'var(--font-bebas), sans-serif';
const FONT_BODY = 'var(--font-dm), sans-serif';

interface Props {
    packageId: string;
    priceLabel: string;
    onClose: () => void;
}

function PaymentStep({ clientSecret, email }: { clientSecret: string; email: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [elementsReady, setElementsReady] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!stripe || !elements || !elementsReady) return;

        setIsProcessing(true);
        setPaymentError(null);

        // Required by Stripe: elements.submit() must run before
        // stripe.confirmPayment(), especially when Link (the "Use this card"
        // autofill panel) is enabled — it validates/collects the chosen
        // payment method first.
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setPaymentError(submitError.message || 'Please check your payment details and try again.');
            setIsProcessing(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/esim-2/order-confirmation`,
                receipt_email: email,
            },
        });

        if (error) {
            setPaymentError(error.message || 'Payment failed. Please try again.');
            setIsProcessing(false);
        }
        // On success Stripe redirects automatically.
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ minHeight: 200, marginBottom: 8 }}>
                <PaymentElement onReady={() => setElementsReady(true)} options={{ layout: 'tabs' }} />
            </div>
            {!elementsReady && (
                <p style={{ fontSize: 13, color: `${CREAM_DIM}99`, textAlign: 'center', marginBottom: 16 }}>
                    Loading payment form…
                </p>
            )}
            {paymentError && <p style={{ color: '#E38B6E', fontSize: 13, marginBottom: 12 }}>{paymentError}</p>}
            <button
                type="submit"
                disabled={!stripe || !elementsReady || isProcessing}
                style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: GOLD,
                    color: INK,
                    border: 'none',
                    borderRadius: 6,
                    fontFamily: FONT_UI,
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    opacity: !stripe || !elementsReady || isProcessing ? 0.5 : 1,
                }}
            >
                {isProcessing ? 'Processing…' : 'Pay now'}
            </button>
        </form>
    );
}

export function Esim2CheckoutForm({ packageId, priceLabel, onClose }: Props) {
    const [email, setEmail] = useState('');
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [initializing, setInitializing] = useState(false);
    const [initError, setInitError] = useState<string | null>(null);

    async function startPayment() {
        if (!email || !email.includes('@')) {
            setInitError('Please enter a valid email address');
            return;
        }
        setInitError(null);
        setInitializing(true);
        try {
            const res = await fetch('/api/esim-2/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ package_id: packageId, customer_email: email }),
            });
            const data = await res.json();
            if (data.success && data.clientSecret) {
                setClientSecret(data.clientSecret);
            } else {
                setInitError(data.error || 'Payment initialization failed. Please try again.');
            }
        } catch {
            setInitError('Failed to connect to payment server. Please try again.');
        } finally {
            setInitializing(false);
        }
    }

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '14px 16px',
        background: INK,
        border: `1px solid ${GOLD}33`,
        borderRadius: 6,
        color: CREAM,
        fontSize: 15,
        marginBottom: 16,
        fontFamily: FONT_BODY,
    };

    if (!clientSecret) {
        return (
            <div style={{ fontFamily: FONT_BODY }}>
                <p style={{ color: CREAM_DIM, fontSize: 14, marginBottom: 20 }}>
                    Enter your email to continue to secure payment.
                </p>
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                        setInitError(null);
                    }}
                    onKeyDown={e => e.key === 'Enter' && startPayment()}
                    disabled={initializing}
                    style={inputStyle}
                    autoFocus
                />
                {initError && <p style={{ color: '#E38B6E', fontSize: 13, marginBottom: 16 }}>{initError}</p>}
                <button
                    onClick={startPayment}
                    disabled={initializing || !email}
                    style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: GOLD,
                        color: INK,
                        border: 'none',
                        borderRadius: 6,
                        fontFamily: FONT_UI,
                        fontSize: 15,
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        opacity: initializing || !email ? 0.5 : 1,
                    }}
                >
                    {initializing ? 'Setting up secure payment…' : `Pay ${priceLabel}`}
                </button>
                <p style={{ fontSize: 12, color: `${CREAM_DIM}80`, textAlign: 'center', marginTop: 16 }}>
                    Secure payment powered by Stripe.
                </p>
            </div>
        );
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: 'night',
                    variables: { colorPrimary: GOLD, borderRadius: '6px' },
                },
            }}
        >
            <PaymentStep clientSecret={clientSecret} email={email} />
        </Elements>
    );
}
