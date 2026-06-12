import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface PageProps {
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
  };
}

export default async function OrderConfirmationPage({ searchParams }: PageProps) {
  const { payment_intent } = searchParams;

  if (!payment_intent) {
    redirect('/esim');
  }

  let paymentStatus = 'unknown';
  let paymentAmount = 0;
  let planTitle = '';

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    paymentStatus = paymentIntent.status;
    paymentAmount = paymentIntent.amount || 0;
    planTitle = paymentIntent.metadata?.plan_title || '';

    if (paymentStatus !== 'succeeded') {
      redirect(`/esim/payment-error?status=${paymentStatus}`);
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
  }

  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  const { data: order } = await supabase
    .from('esim_orders')
    .select('*')
    .eq('payment_intent_id', payment_intent)
    .single();

  const formattedAmount = paymentAmount > 0
    ? `$${(paymentAmount / 100).toFixed(2)}`
    : '$0.00';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your eSIM order has been confirmed. Check your email for activation instructions.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-3">
            {planTitle ? (
              <div>
                <p className="text-sm text-gray-500">Plan</p>
                <p className="font-semibold text-gray-900">{planTitle}</p>
              </div>
            ) : null}
            <div>
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="font-semibold text-gray-900">{formattedAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Reference</p>
              <p className="font-mono text-sm break-all text-gray-700">{payment_intent}</p>
            </div>
            {order?.status ? (
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-semibold text-green-600 capitalize">{order.status}</p>
              </div>
            ) : null}
            {user?.email ? (
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-700">{user.email}</p>
              </div>
            ) : null}
          </div>

          {order?.esim_qr_code ? (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Scan to install your eSIM</p>
              <div className="bg-white border border-gray-200 inline-block p-4 rounded-lg">
                <img
                  src={order.esim_qr_code}
                  alt="eSIM QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              {order?.activation_code ? (
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Manual activation code</p>
                  <p className="font-mono text-xs break-all text-gray-700">{order.activation_code}</p>
                </div>
              ) : null}
            </div>
          ) : null}

          {order?.iccid ? (
            <div className="bg-blue-50 rounded-lg p-3 mb-6 text-left">
              <p className="text-xs text-gray-500 mb-1">ICCID</p>
              <p className="font-mono text-sm text-gray-700">{order.iccid}</p>
            </div>
          ) : null}

          <div className="space-y-3">
            <Link 
              href="/esim/my-esims"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View My eSIMs
            </Link>
            
            <Link 
              href="/esim"
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Browse More Plans
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            A confirmation email has been sent to your registered email address.
            If you do not see it, please check your spam folder.
          </p>
          <Link href="/help" className="inline-block text-sm text-blue-600 hover:text-blue-800 mt-4">
            Need help? Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}