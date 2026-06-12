'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface ESimStatus {
  status: string;
  activation_status: string;
  data_remaining_mb: number;
  data_used_mb: number;
  data_total_mb: number;
  expiry_date: string;
}

interface Order {
  id: string;
  order_id: string;
  payment_intent_id: string;
  status: string;
  iccid?: string;
  retail_price: number;
  customer_email: string;
  created_at: string;
}

export default function MyEsimsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [esimStatuses, setEsimStatuses] = useState<Map<string, ESimStatus>>(new Map());
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Please log in to view your eSIMs');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/esim/orders', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const data = await response.json();
      const orderList: Order[] = data.data?.orders || [];
      setOrders(orderList);

      for (const order of orderList) {
        if (order.iccid) {
          try {
            const statusRes = await fetch(`/api/esim/status/${order.iccid}`, {
              headers: { Authorization: `Bearer ${session.access_token}` },
            });
            const statusData = await statusRes.json();
            if (statusData.success) {
              setEsimStatuses(prev => new Map(prev).set(order.iccid!, statusData.data));
            }
          } catch {
            // not critical
          }
        }
      }
    } catch {
      setError('Failed to load your eSIMs');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (iccid: string) => {
    if (!confirm('Are you sure you want to cancel this eSIM? You will receive a refund.')) return;
    setCancelling(iccid);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`/api/esim/cancel/${iccid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      const result = await response.json();
      if (result.success) {
        await fetchOrders();
      } else {
        alert(result.error || 'Failed to cancel eSIM');
      }
    } catch {
      alert('Failed to cancel eSIM');
    } finally {
      setCancelling(null);
    }
  };

  const getStatusBadge = (status: string, esimStatus?: ESimStatus) => {
    if (esimStatus) {
      if (esimStatus.data_remaining_mb <= 100) return 'Low Data';
      if (esimStatus.status === 'active') return 'Active';
      if (esimStatus.status === 'expired') return 'Expired';
      if (esimStatus.status === 'cancelled') return 'Cancelled';
    }
    const map: Record<string, string> = {
      confirmed: 'Confirmed', active: 'Active', completed: 'Ready',
      cancelled: 'Cancelled', failed: 'Failed', pending: 'Pending',
    };
    return map[status] || status;
  };

  const getStatusColor = (status: string, esimStatus?: ESimStatus) => {
    if (esimStatus && esimStatus.data_remaining_mb <= 100) return 'bg-yellow-100 text-yellow-800';
    if (esimStatus?.status === 'active' || status === 'active') return 'bg-green-100 text-green-800';
    if (status === 'cancelled' || status === 'failed') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500">
          Loading your eSIMs...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My eSIMs</h1>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        ) : null}

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">You do not have any eSIMs yet.</p>
            <a href="/esim" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Browse eSIM Plans
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const esimStatus = order.iccid ? esimStatuses.get(order.iccid) : undefined;
              const canCancel =
                order.status === 'pending' ||
                order.status === 'failed' ||
                (order.status === 'completed' && esimStatus?.activation_status === 'not_installed');

              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order #{(order.payment_intent_id || order.order_id || '').slice(-8)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-gray-700 mt-1">
                        ${order.retail_price?.toFixed(2)}
                      </p>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status, esimStatus)}`}>
                      {getStatusBadge(order.status, esimStatus)}
                    </span>
                  </div>

                  {esimStatus ? (
                    <div className="border-t pt-4 mt-2">
                      <h3 className="font-semibold mb-3 text-sm">Data Usage</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Used</span>
                          <span className="font-medium">{esimStatus.data_used_mb} MB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Remaining</span>
                          <span className={`font-medium ${esimStatus.data_remaining_mb <= 100 ? 'text-red-600' : 'text-green-600'}`}>
                            {esimStatus.data_remaining_mb} MB
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${esimStatus.data_remaining_mb <= 100 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min((esimStatus.data_used_mb / esimStatus.data_total_mb) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600">Expires</span>
                          <span className="font-medium">
                            {new Date(esimStatus.expiry_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {order.iccid ? (
                    <p className="text-xs text-gray-400 mt-3">ICCID: {order.iccid}</p>
                  ) : null}

                  <div className="flex gap-4 mt-4 flex-wrap items-center">
                    <a href={`/esim/${order.order_id}`} className="text-sm text-blue-600 hover:text-blue-800">
                      View Details
                    </a>
                    {order.iccid && esimStatus?.status === 'active' ? (
                      <a href={`/esim/topup/${order.iccid}`} className="text-sm text-green-600 hover:text-green-800">
                        Top Up
                      </a>
                    ) : null}
                    {order.iccid && canCancel ? (
                      <button
                        onClick={() => handleCancel(order.iccid!)}
                        disabled={cancelling === order.iccid}
                        className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        {cancelling === order.iccid ? 'Cancelling...' : 'Cancel and Refund'}
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}