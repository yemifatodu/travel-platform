'use client';

import { useState, useEffect } from 'react';

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

interface CountryGroup {
  code: string;
  name: string;
  flag: string;
  plans: Plan[];
  planCount: number;
}

export default function EsimPage() {
  const [countries, setCountries] = useState<CountryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryGroup | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/esim/plans');
      const result = await response.json();
      if (result.success) {
        groupPlansByCountry(result.data);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupPlansByCountry = (plans: Plan[]) => {
    const countryMap = new Map<string, CountryGroup>();
    
    plans.forEach(plan => {
      const code = plan.country_code;
      if (!countryMap.has(code)) {
        countryMap.set(code, {
          code: code,
          name: plan.country_name,
          flag: getFlagEmoji(code),
          plans: [],
          planCount: 0
        });
      }
      countryMap.get(code)!.plans.push(plan);
      countryMap.get(code)!.planCount++;
    });
    
    const sortedCountries = Array.from(countryMap.values())
      .sort((a, b) => a.name.localeCompare(b.name));
    
    setCountries(sortedCountries);
    // Auto-select first country
    if (sortedCountries.length > 0) {
      setSelectedCountry(sortedCountries[0]);
    }
  };

  const getFlagEmoji = (countryCode: string) => {
    const flags: Record<string, string> = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'JP': '🇯🇵', 'FR': '🇫🇷',
      'IT': '🇮🇹', 'ES': '🇪🇸', 'DE': '🇩🇪', 'AU': '🇦🇺',
      'CA': '🇨🇦', 'BR': '🇧🇷', 'IN': '🇮🇳', 'CN': '🇨🇳',
      'KR': '🇰🇷', 'SG': '🇸🇬', 'MY': '🇲🇾', 'TH': '🇹🇭',
      'VN': '🇻🇳', 'ID': '🇮🇩', 'PH': '🇵🇭', 'NZ': '🇳🇿',
      'RG': '🌏', 'EU': '🇪🇺', 'AE': '🇦🇪', 'SA': '🇸🇦',
    };
    return flags[countryCode] || '🌍';
  };

  const filteredCountries = searchQuery
    ? countries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : countries;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#080807', color: '#F5EFE4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '2px solid rgba(200,169,110,0.2)', borderTopColor: '#C8A96E', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }}></div>
          <p>Loading eSIM plans...</p>
          <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080807', color: '#F5EFE4' }}>
      {/* Hero Section */}
      <div style={{ padding: '60px 24px 40px', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,169,110,0.12) 0%, transparent 70%)', borderBottom: '1px solid rgba(200,169,110,0.2)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.3em', fontSize: '0.8rem', color: '#C8A96E', marginBottom: 16, textAlign: 'center' }}>✦ HUUBOI eSIM STORE ✦</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.2, textAlign: 'center', marginBottom: 16 }}>
            Stay Connected<br /><span style={{ color: '#C8A96E', fontStyle: 'italic' }}>Anywhere on Earth</span>
          </h1>
          <p style={{ textAlign: 'center', color: 'rgba(245,239,228,0.6)', maxWidth: 600, margin: '0 auto' }}>
            Choose a country below to see available eSIM plans
          </p>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 24px' }}>
        {/* Search Bar */}
        <div style={{ marginBottom: 32 }}>
          <input
            type="text"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 400,
              margin: '0 auto',
              display: 'block',
              background: 'rgba(245,239,228,0.04)',
              border: '1px solid rgba(200,169,110,0.2)',
              color: '#F5EFE4',
              padding: '14px 20px',
              outline: 'none',
              fontFamily: 'DM Sans, sans-serif'
            }}
            onFocus={(e) => e.target.style.borderColor = '#C8A96E'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(200,169,110,0.2)'}
          />
        </div>

        {/* Two Column Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          alignItems: 'start'
        }}>
          {/* Left Column - Countries List (Grid) */}
          <div style={{ 
            gridColumn: 'span 1',
            background: 'rgba(245,239,228,0.02)',
            border: '1px solid rgba(200,169,110,0.2)',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <div style={{ 
              padding: '16px 20px', 
              borderBottom: '1px solid rgba(200,169,110,0.2)',
              fontFamily: 'Bebas Neue, sans-serif',
              letterSpacing: '0.1em',
              fontSize: '0.85rem',
              color: '#C8A96E'
            }}>
              ALL DESTINATIONS ({filteredCountries.length})
            </div>
            <div style={{ maxHeight: 600, overflowY: 'auto' }}>
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  onClick={() => setSelectedCountry(country)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(200,169,110,0.1)',
                    background: selectedCountry?.code === country.code ? 'rgba(200,169,110,0.1)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCountry?.code !== country.code) {
                      e.currentTarget.style.background = 'rgba(200,169,110,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCountry?.code !== country.code) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 28 }}>{country.flag}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>{country.name}</span>
                  </div>
                  <span style={{ 
                    fontFamily: 'Bebas Neue, sans-serif', 
                    fontSize: '0.75rem',
                    color: '#C8A96E',
                    background: 'rgba(200,169,110,0.15)',
                    padding: '4px 8px',
                    borderRadius: 2
                  }}>
                    {country.planCount} plans
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Plans for Selected Country */}
          <div style={{ gridColumn: 'span 2' }}>
            {selectedCountry && (
              <div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12, 
                  marginBottom: 24,
                  paddingBottom: 16,
                  borderBottom: '1px solid rgba(200,169,110,0.2)'
                }}>
                  <span style={{ fontSize: 48 }}>{selectedCountry.flag}</span>
                  <div>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', margin: 0 }}>
                      {selectedCountry.name}
                    </h2>
                    <p style={{ color: 'rgba(245,239,228,0.5)', fontSize: '0.85rem', marginTop: 4 }}>
                      {selectedCountry.planCount} data plans available
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 16
                }}>
                  {selectedCountry.plans
                    .sort((a, b) => a.retail_price - b.retail_price)
                    .map((plan) => (
                      <div
                        key={plan.id}
                        style={{
                          border: '1px solid rgba(200,169,110,0.2)',
                          background: 'rgba(245,239,228,0.02)',
                          padding: 20,
                          transition: 'border-color 0.2s'
                        }}
                      >
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#E8C98E' }}>
                          {plan.data_amount}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(245,239,228,0.5)', margin: '8px 0' }}>
                          {plan.validity_days} days
                        </div>
                        {plan.covered_countries && (
                          <div style={{ fontSize: '0.7rem', color: 'rgba(245,239,228,0.4)', margin: '8px 0' }}>
                            📍 Covers: {plan.covered_countries.slice(0, 3).join(', ')}...
                          </div>
                        )}
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#C8A96E', margin: '12px 0' }}>
                          ${plan.retail_price} <span style={{ fontSize: '0.8rem' }}>USD</span>
                        </div>
                        <button
                          onClick={() => {
                            window.location.href = `/esim/checkout?plan_id=${plan.id}`;
                          }}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: '1px solid #C8A96E',
                            color: '#C8A96E',
                            fontFamily: 'Bebas Neue, sans-serif',
                            letterSpacing: '0.2em',
                            padding: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#C8A96E';
                            e.currentTarget.style.color = '#080807';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#C8A96E';
                          }}
                        >
                          ⟡ GET eSIM ⟡
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="display: grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}