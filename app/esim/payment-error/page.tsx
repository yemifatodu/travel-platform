// app/esim/payment-error/page.tsx
import { redirect } from 'next/navigation';

export default async function PaymentErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) {
  const { status } = await searchParams;
  
  const errorMessages: Record<string, string> = {
    canceled: 'The payment was canceled.',
    requires_payment_method: 'No payment method was provided.',
    requires_confirmation: 'The payment could not be confirmed.',
    requires_action: 'Additional action is required to complete the payment.',
    processing: 'The payment is still being processed.',
    requires_capture: 'The payment requires capture.',
  };
  
  const errorMessage = errorMessages[status] || 'Your payment could not be processed.';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          
          <div className="space-y-3">
            <a
              href="/esim"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </a>
            <a
              href="/support"
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}