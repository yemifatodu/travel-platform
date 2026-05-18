'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    } else if (sessionId) {
      // Handle Stripe checkout session
      fetch(`/api/esim/verify-stripe-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.orderId) {
            fetchOrder(data.orderId);
          } else {
            setError('Payment verification failed');
            setLoading(false);
          }
        })
        .catch(() => {
          setError('Failed to verify payment');
          setLoading(false);
        });
    } else {
      setError('No order ID found');
      setLoading(false);
    }
  }, [orderId, sessionId]);

  const fetchOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/esim/orders?id=${id}`);
      const result = await response.json();
      if (result.success) {
        setOrder(result.data);
      } else {
        setError(result.error || 'Order not found');
      }
    } catch (err) {
      setError('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div className="spinner"></div>
        <p>Loading order confirmation...</p>
        <style>{`.spinner { width: 40px; height: 40px; border: 2px solid rgba(200,169,110,0.2); border-top-color: #C8A96E; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.errorIcon}>⚠️</div>
          <h1 style={styles.title}>Something Went Wrong</h1>
          <p>{error}</p>
          <button onClick={() => window.location.href = '/esim'} style={styles.button}>
            BACK TO PLANS
          </button>
        </div>
      </div>
    );
  }

  const isActive = order?.status === 'active';
  const isPending = order?.status === 'pending';

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {isActive && (
          <>
            <div style={styles.successIcon}>✓</div>
            <h1 style={styles.title}>Order Confirmed!</h1>
            <p>Your eSIM has been generated successfully.</p>
            
            {order?.esim_qr_code && (
              <div style={styles.qrContainer}>
                <img src={order.esim_qr_code} alt="eSIM QR Code" style={styles.qrImage} />
              </div>
            )}
            
            <div style={styles.details}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Amount Paid:</strong> ${order.retail_price} USD</p>
              {order.esim_iccid && <p><strong>ICCID:</strong> {order.esim_iccid}</p>}
              {order.activation_code && <p><strong>Activation Code:</strong> {order.activation_code}</p>}
              {order.esim_expiry_date && <p><strong>Expires:</strong> {new Date(order.esim_expiry_date).toLocaleDateString()}</p>}
            </div>
            
            <p style={styles.emailNote}>📧 Check your email for full installation instructions!</p>
          </>
        )}
        
        {isPending && (
          <>
            <div className="spinner"></div>
            <h1 style={styles.title}>Processing Your Order</h1>
            <p>Your eSIM is being generated. This usually takes 1-2 minutes.</p>
            <p style={styles.orderId}>Order ID: {order?.id}</p>
            <button onClick={() => window.location.reload()} style={styles.button}>
              REFRESH STATUS
            </button>
          </>
        )}
        
        <button onClick={() => window.location.href = '/esim'} style={{...styles.button, marginTop: 16 }}>
          BROWSE MORE PLANS
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#080807',
    padding: '60px 20px',
  },
  card: {
    maxWidth: 500,
    margin: '0 auto',
    background: '#111110',
    border: '1px solid rgba(200,169,110,0.2)',
    padding: 40,
    textAlign: 'center' as const,
  },
  title: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '1.8rem',
    color: '#C8A96E',
    marginBottom: 16,
  },
  successIcon: {
    color: '#C8A96E',
    fontSize: 48,
    marginBottom: 20,
  },
  errorIcon: {
    color: '#e87070',
    fontSize: 48,
    marginBottom: 20,
  },
  details: {
    textAlign: 'left' as const,
    background: 'rgba(200,169,110,0.08)',
    padding: 16,
    margin: '20px 0',
    fontSize: 14,
    wordBreak: 'break-all' as const,
  },
  qrContainer: {
    background: 'white',
    padding: 20,
    margin: '20px 0',
    borderRadius: 4,
  },
  qrImage: {
    maxWidth: '100%',
  },
  emailNote: {
    fontSize: '0.85rem',
    marginTop: 16,
  },
  orderId: {
    fontSize: '0.85rem',
    color: 'rgba(245,239,228,0.6)',
    marginTop: 16,
  },
  button: {
    padding: '12px 24px',
    background: '#C8A96E',
    border: 'none',
    color: '#080807',
    cursor: 'pointer',
    fontFamily: 'Bebas Neue, sans-serif',
    letterSpacing: '0.2em',
    width: '100%',
  },
  loading: {
    minHeight: '100vh',
    background: '#080807',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' as const,
    color: '#F5EFE4',
  },
};