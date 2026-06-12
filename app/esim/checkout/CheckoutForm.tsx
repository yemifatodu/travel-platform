'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutFormProps {
  planId: string;
  price: number;
  currency: string;
}

// ── Step 2: Stripe PaymentElement form ────────────────────────────────────────
function PaymentForm({
  clientSecret,
  price,
  currency,
  email,
}: {
  clientSecret: string;
  price: number;
  currency: string;
  email: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [elementsReady, setElementsReady] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !elementsReady) return;

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/esim/order-confirmation`,
          receipt_email: email,
        },
      });

      if (error) {
        setPaymentError(
          error.message || 'Payment failed. Please try again.'
        );
      }
      // On success Stripe redirects automatically — no further handling needed
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : 'Payment failed'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

      {/* Email display — read only at this stage */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
        />
        <p className="text-xs text-gray-500 mt-1">
          We'll send your eSIM details here
        </p>
      </div>

      {/* Stripe card fields */}
      <div className="mb-2" style={{ minHeight: '200px' }}>
        <PaymentElement
          onReady={() => setElementsReady(true)}
          options={{ layout: 'tabs' }}
        />
      </div>

      {!elementsReady && (
        <p className="text-sm text-gray-400 text-center mb-4 animate-pulse">
          Loading payment form...
        </p>
      )}

      {paymentError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{paymentError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elementsReady || isProcessing}
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isProcessing
          ? 'Processing...'
          : `Pay ${currency} ${price.toFixed(2)}`}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Secure payment powered by Stripe. Your eSIM will be delivered
        instantly after payment.
      </p>
    </form>
  );
}

// ── Step 1: Email capture + PaymentIntent init ────────────────────────────────
export function CheckoutForm({ planId, price, currency }: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const supabase = createClientComponentClient();

  // Pre-fill email if user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, [supabase]);

  const startPayment = async () => {
    // Validate email
    if (!userEmail || !userEmail.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setIsInitializing(true);

    try {
      const response = await fetch('/api/esim/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          customer_email: userEmail,
        }),
      });

      const data = await response.json();

      if (data.success && data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        setEmailError(data.error || 'Payment initialization failed. Please try again.');
        setIsInitializing(false);
      }
    } catch {
      setEmailError('Failed to connect to payment server. Please try again.');
      setIsInitializing(false);
    }
  };

  // Step 1 — collect email before mounting Stripe Elements
  if (!clientSecret) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Complete Your Order</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email to continue to secure payment.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
              setEmailError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && startPayment()}
            required
            disabled={isInitializing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            placeholder="your@email.com"
            autoComplete="email"
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll send your eSIM details here
          </p>
          {emailError && (
            <p className="text-xs text-red-500 mt-2">{emailError}</p>
          )}
        </div>

        <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-sm text-blue-700 font-medium">
            {currency} {price.toFixed(2)} — one-time payment
          </p>
        </div>

        <button
          onClick={startPayment}
          disabled={isInitializing || !userEmail}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isInitializing
            ? 'Setting up secure payment...'
            : 'Proceed to Secure Payment'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by Stripe.
        </p>
      </div>
    );
  }

  // Step 2 — mount Stripe Elements with clientSecret
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2563eb',
            borderRadius: '8px',
          },
        },
      }}
    >
      <PaymentForm
        clientSecret={clientSecret}
        price={price}
        currency={currency}
        email={userEmail}
      />
    </Elements>
  );
}