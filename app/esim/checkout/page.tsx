'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
  id: string;
  title: string;
  data_amount: string;
  validity_days: number;
  retail_price: number;
  currency: string;
  country_name: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

function PaymentForm({
  plan,
  planId,
  clientSecret,
  customerInfo,
  onBack,
}: {
  plan: Plan;
  planId: string;
  clientSecret: string;
  customerInfo: CustomerInfo;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [elementsReady, setElementsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'Please complete all payment details');
        setLoading(false);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/esim/order-confirmation`,
          receipt_email: customerInfo.email,
        },
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed. Please try again.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const price = plan.retail_price != null ? Number(plan.retail_price).toFixed(2) : '0.00';

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ minHeight: '200px' }}>
        <PaymentElement
          onReady={() => setElementsReady(true)}
          options={{ layout: 'tabs' }}
        />
      </div>

      {!elementsReady && (
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>
          Loading payment form...
        </p>
      )}

      {error && (
        <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '12px', padding: '12px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{ flex: 1, backgroundColor: '#6b7280', color: '#ffffff', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || !elementsReady || loading}
          style={{ flex: 2, backgroundColor: '#2563eb', color: '#ffffff', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Processing...' : `Pay ${plan.currency} ${price}`}
        </button>
      </div>

      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '12px', marginTop: '16px' }}>
        Secure payment powered by Stripe. Your eSIM will be delivered instantly after payment.
      </p>
    </form>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan_id');

  const [plan, setPlan] = useState<Plan | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (planId) {
      fetchPlanDetails();
    } else {
      setError('No plan selected');
      setLoadingPlan(false);
    }
  }, [planId]);

  const fetchPlanDetails = async () => {
    try {
      const response = await fetch(`/api/esim/plans?plan_id=${planId}`);
      const result = await response.json();

      if (result.data && Array.isArray(result.data)) {
        const found = result.data.find((p: Plan) => p.id === planId);
        if (found) {
          setPlan(found);
        } else {
          setError('Plan not found');
        }
      } else if (result.data && !Array.isArray(result.data)) {
        setPlan(result.data);
      } else {
        setError(result.error || 'Plan not found');
      }
    } catch {
      setError('Failed to load plan details');
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleContinueToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) return;

    setLoadingPayment(true);
    setError(null);

    try {
      const response = await fetch('/api/esim/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          customer_email: customerInfo.email,
        }),
      });

      const data = await response.json();

      if (data.success && data.clientSecret) {
        setClientSecret(data.clientSecret);
        setShowPayment(true);
      } else {
        setError(data.error || 'Failed to initialize payment. Please try again.');
      }
    } catch {
      setError('Failed to connect to payment server. Please try again.');
    } finally {
      setLoadingPayment(false);
    }
  };

  if (loadingPlan) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <div style={{ textAlign: 'center', color: '#374151' }}>Loading plan details...</div>
      </div>
    );
  }

  if (error && !plan) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '500px', backgroundColor: '#ffffff', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>Plan Not Found</h1>
          <p style={{ color: '#4b5563', marginBottom: '24px' }}>{error}</p>
          <a href="/esim" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: '#ffffff', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Browse Available Plans
          </a>
        </div>
      </div>
    );
  }

  if (showPayment && clientSecret && plan) {
    const paymentPrice = plan.retail_price != null ? Number(plan.retail_price).toFixed(2) : '0.00';
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Payment</h1>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: '#111827' }}>{plan.title}</h2>
            <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '8px' }}>
              {plan.country_name} • {plan.data_amount} • {plan.validity_days} days
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
              {plan.currency} {paymentPrice}
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#2563eb',
                    borderRadius: '8px',
                    colorText: '#111827',
                    colorBackground: '#ffffff',
                    colorTextPlaceholder: '#6b7280',
                    fontSizeBase: '16px',
                  },
                },
              }}
            >
              <PaymentForm
                plan={plan}
                planId={planId!}
                clientSecret={clientSecret}
                customerInfo={customerInfo}
                onBack={() => setShowPayment(false)}
              />
            </Elements>
          </div>
        </div>
      </div>
    );
  }

  const summaryPrice = plan && plan.retail_price != null ? Number(plan.retail_price).toFixed(2) : '0.00';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Complete Your Purchase</h1>

        {plan && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: '#111827' }}>{plan.title}</h2>
            <p style={{ color: '#4b5563', marginBottom: '8px' }}>
              {plan.country_name} • {plan.data_amount} • {plan.validity_days} days
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
              {plan.currency} {summaryPrice}
            </p>
          </div>
        )}

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleContinueToPayment}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#111827', fontSize: '14px' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="John Doe"
                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box', color: '#111827', backgroundColor: '#ffffff', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#111827', fontSize: '14px' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                placeholder="you@example.com"
                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box', color: '#111827', backgroundColor: '#ffffff', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#111827', fontSize: '14px' }}>
                Phone Number (optional)
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="+1 555 000 0000"
                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box', color: '#111827', backgroundColor: '#ffffff', outline: 'none' }}
              />
            </div>

            {error && (
              <div style={{ color: '#dc2626', fontSize: '14px', marginBottom: '16px', padding: '12px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loadingPayment}
              style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: loadingPayment ? 'not-allowed' : 'pointer', opacity: loadingPayment ? 0.7 : 1 }}
            >
              {loadingPayment ? 'Setting up payment...' : 'Continue to Payment'}
            </button>

            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '12px', marginTop: '16px' }}>
              Secure payment powered by Stripe.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <div style={{ color: '#374151' }}>Loading...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}