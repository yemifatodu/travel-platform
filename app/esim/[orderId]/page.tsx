'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function OrderStatusPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Please log in to view this order');
        setLoading(false);
        return;
      }
      const response = await fetch(`/api/esim/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const data = await response.json();
      if (data.success) {
        setOrder(data.data);
      } else {
        setError(data.error || 'Order not found');
      }
    } catch {
      setError('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center text-gray-500">Loading order details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
          <Link href="/esim/my-esims" className="block mt-4 text-blue-600 hover:text-blue-800 text-sm">
            Back to My eSIMs
          </Link>
        </div>
      </div>
    );
  }

  const isActive = order?.status === 'active';
  const isPending = order?.status === 'pending';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        <Link href="/esim/my-esims" className="text-sm text-blue-600 hover:text-blue-800 mb-6 inline-block">
          Back to My eSIMs
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            {isActive ? (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {isActive ? 'eSIM Ready' : 'Processing Order'}
            </h1>
            <p className="text-gray-500 text-sm mt-1 capitalize">Status: {order?.status}</p>
          </div>

          {order?.esim_qr_code ? (
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Scan to install your eSIM</p>
              <div className="bg-white border border-gray-200 inline-block p-4 rounded-lg">
                <img src={order.esim_qr_code} alt="eSIM QR Code" className="w-48 h-48 mx-auto" />
              </div>
            </div>
          ) : null}

          <div className="space-y-3 text-sm">
            {order?.esim_iccid ? (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">ICCID</span>
                <span className="font-mono text-gray-700">{order.esim_iccid}</span>
              </div>
            ) : null}
            {order?.activation_code ? (
              <div className="py-2 border-b">
                <p className="text-gray-500 mb-1">Activation Code</p>
                <p className="font-mono text-xs break-all text-gray-700">{order.activation_code}</p>
              </div>
            ) : null}
            {order?.smdp_address ? (
              <div className="py-2 border-b">
                <p className="text-gray-500 mb-1">SM-DP+ Address</p>
                <p className="font-mono text-xs break-all text-gray-700">{order.smdp_address}</p>
              </div>
            ) : null}
            {order?.esim_expiry_date ? (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">Expires</span>
                <span className="text-gray-700">{new Date(order.esim_expiry_date).toLocaleDateString()}</span>
              </div>
            ) : null}
            {order?.retail_price ? (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-semibold text-gray-900">${order.retail_price}</span>
              </div>
            ) : null}
          </div>

          {isPending ? (
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm mb-3">
                Your eSIM is being generated. This usually takes 1 to 2 minutes.
              </p>
              <button
                onClick={fetchOrder}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm"
              >
                Refresh Status
              </button>
            </div>
          ) : null}

          {isActive && order?.esim_iccid ? (
            <Link 
              href={`/esim/topup/${order.esim_iccid}`}
              className="block mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-green-700"
            >
              Top Up Data
            </Link>
          ) : null}

          <Link 
            href="/esim"
            className="block mt-3 w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-center hover:bg-gray-50"
          >
            Browse More Plans
          </Link>
        </div>
      </div>
    </div>
  );
}