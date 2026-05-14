'use client';

import { useState, useEffect, useCallback } from 'react';
import { ESIMPlan, OrderResponse } from '@/types/esim';

// Your luxury CSS styles (same as before)
const esimStyles = `...`; // Paste your gold/ink CSS here

export default function EsimPage() {
  const [plans, setPlans] = useState<ESIMPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<ESIMPlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [orderResult, setOrderResult] = useState<OrderResponse['data'] | null>(null);

  // Fetch plans on mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/esim/plans');
      const result = await response.json();
      if (result.success) {
        setPlans(result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setOrderStatus('processing');
    
    try {
      const response = await fetch('/api/esim/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: selectedPlan?.id,
          customer_name: formData.get('customer_name'),
          customer_email: formData.get('customer_email'),
          customer_phone: formData.get('customer_phone'),
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setOrderStatus('success');
        setOrderResult(result.data);
        pollOrderStatus(result.data.id);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Order failed:', error);
      setOrderStatus('idle');
      alert('Failed to create order. Please try again.');
    }
  };

  const pollOrderStatus = async (orderId: string) => {
    const interval = setInterval(async () => {
      const response = await fetch(`/api/esim/orders/${orderId}`);
      const result = await response.json();
      
      if (result.data?.status === 'active') {
        clearInterval(interval);
        setOrderResult(result.data);
      }
    }, 2000);
  };

  // Render your UI (same HTML structure but as JSX)
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: esimStyles }} />
      <div className="container">
        {/* Hero Section */}
        <div className="esim-header">
          <p className="label">✦ HUUBOI eSIM STORE ✦</p>
          <h1>Stay Connected<br /><span>Anywhere on Earth</span></h1>
          <p>Instant eSIMs for 200+ destinations. No roaming fees. Activate in minutes.</p>
        </div>

        {/* Loading or Plans Grid */}
        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Fetching global eSIM plans...</p>
          </div>
        ) : (
          <div className="plans-grid">
            {plans.slice(0, 50).map((plan) => (
              <div key={plan.id} className="plan-card">
                <div className="plan-content">
                  <div className="plan-country">
                    <span className="plan-country-flag">
                      {plan.country_code === 'US' ? '🇺🇸' : '🌍'}
                    </span>
                    <span className="plan-country-name">{plan.country_name}</span>
                  </div>
                  <div className="plan-title">{plan.title}</div>
                  <div className="plan-details">
                    <div className="plan-detail">
                      <div className="plan-detail-label">DATA</div>
                      <div className="plan-detail-value">{plan.data_amount}</div>
                    </div>
                    <div className="plan-detail">
                      <div className="plan-detail-label">VALIDITY</div>
                      <div className="plan-detail-value">{plan.validity_days} days</div>
                    </div>
                  </div>
                  <div className="plan-price">
                    ${plan.retail_price} <small>USD</small>
                  </div>
                  <button 
                    className="plan-btn" 
                    onClick={() => {
                      setSelectedPlan(plan);
                      setModalOpen(true);
                    }}
                  >
                    ⟡ GET eSIM ⟡
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal - same structure as HTML version */}
        {modalOpen && selectedPlan && (
          <div className="modal active">
            <div className="modal-content">
              {/* Modal content */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
