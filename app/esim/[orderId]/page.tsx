'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function OrderStatusPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/esim/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrder(data.data);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#080807', color: '#F5EFE4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '2px solid rgba(200,169,110,0.2)', borderTopColor: '#C8A96E', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }}></div>
          <p>Loading order status...</p>
          <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', color: '#F5EFE4', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ background: '#111110', border: '1px solid rgba(200,169,110,0.2)', padding: 40, textAlign: 'center' }}>
          {order?.status === 'active' && (
            <>
              <div style={{ color: '#C8A96E', fontSize: 48, marginBottom: 20 }}>✓</div>
              <h2>eSIM Ready!</h2>
              {order.esim_qr_code && (
                <div style={{ background: 'white', padding: 20, margin: '20px 0' }}>
                  <img src={order.esim_qr_code} alt="QR Code" style={{ maxWidth: '100%' }} />
                </div>
              )}
              <p>Check your email for installation instructions.</p>
            </>
          )}
          {order?.status === 'pending' && (
            <>
              <div style={{ width: 40, height: 40, border: '2px solid rgba(200,169,110,0.2)', borderTopColor: '#C8A96E', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }}></div>
              <h2>Processing Your Order</h2>
              <p>Your eSIM is being generated. This takes 1-2 minutes.</p>
              <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: '12px 24px', background: 'transparent', border: '1px solid #C8A96E', color: '#C8A96E', cursor: 'pointer' }}>
                REFRESH
              </button>
            </>
          )}
          <button onClick={() => window.location.href = '/esim'} style={{ marginTop: 24, padding: '12px 24px', background: '#C8A96E', border: 'none', color: '#080807', cursor: 'pointer', width: '100%' }}>
            BROWSE MORE PLANS
          </button>
        </div>
      </div>
    </div>
  );
}