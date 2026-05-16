"use client";

import { useState, useEffect } from "react";

interface Plan {
  id: string;
  name: string;
  country_name: string;
  data_amount: string;
  validity_days: number;
  retail_price: number;
  currency: string;
  description?: string;
}

const gold = "#C8A96E";
const cream = "#F5EFE4";
const muted = "rgba(245,239,228,0.60)";
const dim = "rgba(245,239,228,0.35)";

export default function EsimPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "processing" | "success">("idle");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/esim/plans?limit=500");
      const result = await response.json();
      if (result.success && result.data) {
        setPlans(result.data);
      } else if (result.plans) {
        setPlans(result.plans);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Group plans by country
  const plansByCountry = plans.reduce((acc, plan) => {
    if (!acc[plan.country_name]) {
      acc[plan.country_name] = [];
    }
    acc[plan.country_name].push(plan);
    return acc;
  }, {} as Record<string, Plan[]>);

  const filteredCountries = searchQuery
    ? Object.keys(plansByCountry).filter(country =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Object.keys(plansByCountry);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setOrderStatus("processing");
    try {
      const response = await fetch("/api/esim/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_id: selectedPlan.id,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setOrderStatus("success");
        setTimeout(() => {
          setModalOpen(false);
          setOrderStatus("idle");
          setSelectedPlan(null);
          setCustomerName("");
          setCustomerEmail("");
          setCustomerPhone("");
        }, 2000);
      } else {
        setOrderStatus("idle");
        alert(result.error || "Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      setOrderStatus("idle");
      alert("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#080807", paddingTop: 90 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 40, height: 40, border: `2px solid ${dim}`, borderTopColor: gold, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }}></div>
            <p style={{ color: muted }}>Loading eSIM plans...</p>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080807", paddingTop: 90 }}>
      {/* Hero Section */}
      <div style={{ 
        background: "linear-gradient(160deg,#080807,#0d0c0a,#0a0c10)", 
        borderBottom: `1px solid ${dim}`,
        padding: "clamp(40px,8vw,80px) clamp(20px,5vw,60px)"
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
          <div style={{ 
            fontFamily: "'Bebas Neue',sans-serif", 
            fontSize: "0.7rem", 
            letterSpacing: "0.3em", 
            color: gold, 
            marginBottom: 20, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 12 
          }}>
            <span style={{ width: 40, height: 1, background: gold, display: "inline-block" }} />
            HUUBOI eSIM
            <span style={{ width: 40, height: 1, background: gold, display: "inline-block" }} />
          </div>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond',serif", 
            fontSize: "clamp(2.5rem,6vw,5rem)", 
            fontWeight: 300, 
            color: cream, 
            lineHeight: 0.92, 
            marginBottom: 20 
          }}>
            Stay Connected<br />
            <em style={{ color: gold }}>Anywhere on Earth</em>
          </h1>
          <p style={{ color: muted, fontSize: "clamp(0.9rem,1.5vw,1.1rem)", maxWidth: 640, margin: "0 auto", lineHeight: 1.85 }}>
            Instant eSIMs for 200+ destinations. No roaming fees. Activate in minutes.
          </p>
          
          {/* Features */}
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px,3vw,32px)", marginTop: 40, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.5rem" }}>📶</span>
              <span style={{ color: muted, fontSize: "0.85rem" }}>200+ Countries</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.5rem" }}>⚡</span>
              <span style={{ color: muted, fontSize: "0.85rem" }}>Instant Activation</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.5rem" }}>🔒</span>
              <span style={{ color: muted, fontSize: "0.85rem" }}>No Roaming Fees</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.5rem" }}>📱</span>
              <span style={{ color: muted, fontSize: "0.85rem" }}>Direct Setup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "clamp(30px,5vw,50px) clamp(20px,5vw,40px)" }}>
        <input
          type="text"
          placeholder="Search destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 20px",
            background: "#111110",
            border: `1px solid ${dim}`,
            borderRadius: 8,
            color: cream,
            fontSize: "1rem",
            outline: "none",
            transition: "all 0.2s"
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = gold}
          onBlur={(e) => e.currentTarget.style.borderColor = dim}
        />
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <span style={{ color: muted, fontSize: "0.85rem" }}>
            Found {filteredCountries.length} countries with eSIM plans
          </span>
        </div>
      </div>

      {/* Plans Section */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(20px,5vw,40px) clamp(60px,8vw,100px)" }}>
        {filteredCountries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: muted }}>No eSIM plans found for "{searchQuery}".</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {filteredCountries.map((country) => (
              <div key={country} style={{ background: "#0a0a08", border: `1px solid ${dim}`, borderRadius: 12, overflow: "hidden" }}>
                {/* Country Header */}
                <div style={{ 
                  background: "#111110", 
                  padding: "16px 24px", 
                  borderBottom: `1px solid ${dim}`,
                  borderLeft: `3px solid ${gold}`
                }}>
                  <h2 style={{ 
                    fontFamily: "'Cormorant Garamond',serif", 
                    fontSize: "clamp(1.5rem,3vw,2rem)", 
                    fontWeight: 400, 
                    color: cream, 
                    margin: 0 
                  }}>
                    {country}
                  </h2>
                </div>
                
                {/* Plan Cards */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                  gap: 16, 
                  padding: 24 
                }}>
                  {plansByCountry[country].map((plan) => (
                    <div key={plan.id} style={{ 
                      background: "#111110", 
                      border: `1px solid ${dim}`,
                      borderRadius: 8,
                      padding: 16,
                      transition: "all 0.2s",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = gold;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = dim;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}>
                      <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: gold, marginBottom: 12 }}>
                        ${plan.retail_price} <span style={{ fontSize: "0.85rem", color: muted }}>{plan.currency}</span>
                      </div>
                      <div style={{ color: cream, fontSize: "0.9rem", marginBottom: 8 }}>
                        {plan.data_amount}
                      </div>
                      <div style={{ color: muted, fontSize: "0.8rem", marginBottom: 16 }}>
                        {plan.validity_days} days validity
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPlan(plan);
                          setModalOpen(true);
                        }}
                        style={{
                          width: "100%",
                          padding: "10px 16px",
                          background: "transparent",
                          border: `1px solid ${gold}`,
                          borderRadius: 6,
                          color: gold,
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = gold;
                          e.currentTarget.style.color = "#080807";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = gold;
                        }}
                      >
                        Get eSIM
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      {modalOpen && selectedPlan && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: "rgba(8,8,7,0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{ 
            background: "#0a0a08", 
            border: `1px solid ${gold}`,
            borderRadius: 12,
            maxWidth: 500,
            width: "100%",
            padding: "clamp(24px,5vw,40px)"
          }}>
            <h2 style={{ 
              fontFamily: "'Cormorant Garamond',serif", 
              fontSize: "clamp(1.5rem,3vw,2rem)", 
              color: gold, 
              marginBottom: 20,
              fontWeight: 400
            }}>
              Complete Purchase
            </h2>
            
            <div style={{ 
              background: "#111110", 
              border: `1px solid ${dim}`,
              borderRadius: 8,
              padding: 16,
              textAlign: "center",
              marginBottom: 24
            }}>
              <div style={{ color: cream, fontSize: "1rem", marginBottom: 8 }}>
                {selectedPlan.data_amount} • {selectedPlan.validity_days} days
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: gold }}>
                ${selectedPlan.retail_price} {selectedPlan.currency}
              </div>
            </div>
            
            <form onSubmit={handleOrderSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#111110",
                  border: `1px solid ${dim}`,
                  borderRadius: 6,
                  color: cream,
                  marginBottom: 12,
                  outline: "none"
                }}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#111110",
                  border: `1px solid ${dim}`,
                  borderRadius: 6,
                  color: cream,
                  marginBottom: 12,
                  outline: "none"
                }}
                required
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#111110",
                  border: `1px solid ${dim}`,
                  borderRadius: 6,
                  color: cream,
                  marginBottom: 20,
                  outline: "none"
                }}
              />
              <button
                type="submit"
                disabled={orderStatus === "processing"}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: gold,
                  border: "none",
                  borderRadius: 6,
                  color: "#080807",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  opacity: orderStatus === "processing" ? 0.6 : 1
                }}
              >
                {orderStatus === "processing" ? "Processing..." : orderStatus === "success" ? "Success!" : "Confirm Order"}
              </button>
            </form>
            
            <button
              onClick={() => setModalOpen(false)}
              style={{
                width: "100%",
                marginTop: 12,
                padding: "10px 16px",
                background: "transparent",
                border: `1px solid ${dim}`,
                borderRadius: 6,
                color: muted,
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
