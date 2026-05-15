'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Plan {
  id: string;
  title: string;
  country_code: string;
  country_name: string;
  data_amount: string;
  validity_days: number;
  retail_price: number;
  currency: string;
  covered_countries?: string[];
}

// Luxury gold/ink styles
const esimStyles = `
  :root {
    --gold: #C8A96E;
    --gold-light: #E8C98E;
    --ink: #080807;
    --ink-2: #111110;
    --cream: #F5EFE4;
    --cream-dim: #E8E0D0;
    --muted: rgba(200,169,110,0.15);
    --border: rgba(200,169,110,0.2);
  }
  
  .esim-page {
    background: var(--ink);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }
  
  .esim-hero {
    padding: 80px 24px 60px;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,169,110,0.12) 0%, transparent 70%);
    border-bottom: 1px solid var(--border);
  }
  
  .esim-hero-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
  }
  
  .esim-hero-left {
    flex: 1;
    max-width: 600px;
  }
  
  .esim-hero .label {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.3em;
    font-size: 0.8rem;
    color: var(--gold);
    margin-bottom: 16px;
  }
  
  .esim-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    color: var(--cream);
    margin-bottom: 20px;
  }
  
  .esim-hero h1 span {
    color: var(--gold);
    font-style: italic;
  }
  
  .esim-hero p {
    font-size: 1rem;
    color: rgba(245,239,228,0.6);
    line-height: 1.7;
    font-weight: 300;
  }
  
  .esim-hero-right {
    flex-shrink: 0;
    width: 280px;
  }
  
  .esim-badges {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .esim-badge {
    background: var(--muted);
    border: 1px solid var(--border);
    color: var(--gold);
    padding: 12px 16px;
    font-size: 0.8rem;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.15em;
    border-radius: 2px;
    display: flex;
    align-items: center;
    gap: 10px;
    backdrop-filter: blur(5px);
  }
  
  .esim-body {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;
  }
  
  .esim-search {
    width: 100%;
    background: rgba(245,239,228,0.04);
    border: 1px solid var(--border);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    padding: 14px 20px;
    margin-bottom: 32px;
    outline: none;
  }
  
  .esim-search:focus {
    border-color: var(--gold);
  }
  
  .esim-plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .esim-plan-card {
    border: 1px solid var(--border);
    background: rgba(245,239,228,0.02);
    padding: 24px;
    transition: border-color 0.2s;
  }
  
  .esim-plan-card:hover {
    border-color: rgba(200,169,110,0.4);
  }
  
  .esim-plan-country {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .esim-plan-flag {
    font-size: 32px;
  }
  
  .esim-plan-country-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 500;
  }
  
  .esim-plan-data {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: var(--gold-light);
    margin: 16px 0 8px;
  }
  
  .esim-plan-validity {
    font-size: 0.85rem;
    color: rgba(245,239,228,0.5);
    margin-bottom: 16px;
  }
  
  .esim-plan-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: var(--gold);
    margin: 16px 0;
  }
  
  .esim-buy-btn {
    display: block;
    width: 100%;
    background: transparent;
    border: 1px solid var(--gold);
    color: var(--gold);
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.2em;
    padding: 12px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
  }
  
  .esim-buy-btn:hover {
    background: var(--gold);
    color: var(--ink);
  }
  
  .esim-loading {
    text-align: center;
    padding: 80px 24px;
  }
  
  .esim-loading-spinner {
    width: 40px;
    height: 40px;
    border: 2px solid var(--border);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Modal Styles */
  .esim-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(8,8,7,0.95);
    backdrop-filter: blur(12px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .esim-modal-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  
  .esim-modal {
    background: var(--ink-2);
    border: 1px solid var(--border);
    max-width: 500px;
    width: 90%;
    padding: 40px;
    position: relative;
    transform: translateY(20px);
    transition: transform 0.3s ease;
  }
  
  .esim-modal-overlay.active .esim-modal {
    transform: translateY(0);
  }
  
  .esim-modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: var(--cream-dim);
    font-size: 24px;
    cursor: pointer;
  }
  
  .esim-modal h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: var(--gold);
    margin-bottom: 24px;
  }
  
  .esim-modal-input {
    width: 100%;
    background: rgba(245,239,228,0.04);
    border: 1px solid var(--border);
    color: var(--cream);
    padding: 12px 16px;
    margin-bottom: 16px;
    font-family: 'DM Sans', sans-serif;
  }
  
  .esim-modal-input:focus {
    outline: none;
    border-color: var(--gold);
  }
  
  .esim-modal-btn {
    width: 100%;
    background: var(--gold);
    border: none;
    color: var(--ink);
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.2em;
    padding: 14px;
    cursor: pointer;
    margin-top: 8px;
  }
  
  .esim-toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: var(--gold);
    color: var(--ink);
    padding: 12px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    z-index: 1100;
    animation: slideIn 0.3s ease;
  }
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .esim-hero-inner {
      flex-direction: column;
      text-align: center;
    }
    .esim-hero-right {
      width: 100%;
      max-width: 320px;
    }
    .esim-badge {
      justify-content: center;
    }
    .esim-plans-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default function EsimPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

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
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !customerEmail) {
      showToast('Please fill in all required fields');
      return;
    }

    setOrderStatus('processing');
    
    try {
      const response = await fetch('/api/esim/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: selectedPlan?.id,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setOrderStatus('success');
        showToast('Order confirmed! Redirecting...');
        setTimeout(() => {
          window.location.href = `/esim/${result.data.id}`;
        }, 2000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Order failed:', error);
      setOrderStatus('idle');
      showToast('Failed to create order. Please try again.');
    }
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'esim-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const getFlagEmoji = (countryCode: string) => {
    const flags: Record<string, string> = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'JP': '🇯🇵', 'FR': '🇫🇷',
      'IT': '🇮🇹', 'ES': '🇪🇸', 'DE': '🇩🇪', 'AU': '🇦🇺',
      'CA': '🇨🇦', 'BR': '🇧🇷', 'IN': '🇮🇳', 'CN': '🇨🇳',
      'KR': '🇰🇷', 'SG': '🇸🇬', 'RG': '🌏', 'EU': '🇪🇺',
    };
    return flags[countryCode] || '🌍';
  };

  const filteredPlans = searchQuery
    ? plans.filter(p => p.country_name.toLowerCase().includes(searchQuery.toLowerCase()))
    : plans;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: esimStyles }} />
      <div className="esim-page">
        {/* Hero Section */}
        <div className="esim-hero">
          <div className="esim-hero-inner">
            <div className="esim-hero-left">
              <p className="label">✦ HUUBOI eSIM STORE ✦</p>
              <h1>Stay Connected<br /><span>Anywhere on Earth</span></h1>
              <p>Instant eSIMs for 200+ destinations. No roaming fees. Activate in minutes.</p>
            </div>
            <div className="esim-hero-right">
              <div className="esim-badges">
                <span className="esim-badge">📶 200+ Countries</span>
                <span className="esim-badge">⚡ Instant Activation</span>
                <span className="esim-badge">🔒 No Roaming Fees</span>
                <span className="esim-badge">📱 Direct Setup</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="esim-body">
          <input
            type="text"
            className="esim-search"
            placeholder="Search destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {loading ? (
            <div className="esim-loading">
              <div className="esim-loading-spinner"></div>
              <p>Fetching global eSIM plans...</p>
            </div>
          ) : (
            <div className="esim-plans-grid">
              {filteredPlans.slice(0, 30).map((plan) => (
                <div key={plan.id} className="esim-plan-card">
                  <div className="esim-plan-country">
                    <span className="esim-plan-flag">{getFlagEmoji(plan.country_code)}</span>
                    <span className="esim-plan-country-name">{plan.country_name}</span>
                  </div>
                  <div className="esim-plan-data">{plan.data_amount}</div>
                  <div className="esim-plan-validity">{plan.validity_days} days</div>
                  <div className="esim-plan-price">${plan.retail_price} USD</div>
                  <button
                    className="esim-buy-btn"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setModalOpen(true);
                      setOrderStatus('idle');
                    }}
                  >
                    ⟡ GET eSIM ⟡
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <div className={`esim-modal-overlay ${modalOpen ? 'active' : ''}`}>
          <div className="esim-modal">
            <button className="esim-modal-close" onClick={() => setModalOpen(false)}>✕</button>
            
            {orderStatus === 'idle' && selectedPlan && (
              <>
                <h3>Complete Purchase</h3>
                <form onSubmit={handlePurchase}>
                  <div style={{ marginBottom: '20px', padding: '12px', background: 'var(--muted)', textAlign: 'center' }}>
                    <strong>{selectedPlan.data_amount}</strong> • {selectedPlan.validity_days} days<br />
                    <span style={{ fontSize: '1.4rem', color: 'var(--gold)' }}>${selectedPlan.retail_price} USD</span>
                  </div>
                  
                  <input
                    type="text"
                    className="esim-modal-input"
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className="esim-modal-input"
                    placeholder="Email Address *"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    className="esim-modal-input"
                    placeholder="Phone Number (optional)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                  
                  <button type="submit" className="esim-modal-btn">
                    ⟡ CONFIRM ORDER ⟡
                  </button>
                </form>
              </>
            )}
            
            {orderStatus === 'processing' && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div className="esim-loading-spinner" style={{ margin: '0 auto 20px' }}></div>
                <h3>Processing Order...</h3>
                <p style={{ marginTop: '10px', color: 'rgba(245,239,228,0.6)' }}>Please wait while we generate your eSIM.</p>
              </div>
            )}
            
            {orderStatus === 'success' && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h3 style={{ color: 'var(--gold)' }}>✓ Order Confirmed!</h3>
                <p style={{ marginTop: '10px' }}>Your eSIM is being generated.</p>
                <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'rgba(245,239,228,0.6)' }}>Redirecting to order status...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}