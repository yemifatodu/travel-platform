"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

const gold = "#C8A96E";
const cream = "#F5EFE4";
const muted = "rgba(245,239,228,0.60)";
const dim = "rgba(245,239,228,0.35)";

interface Plan {
  id: string;
  name: string;
  country_name: string;
  data_amount: string;
  validity_days: number;
  retail_price: number;
  currency: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (planId) {
      fetchPlanDetails();
    }
  }, [planId]);

  const fetchPlanDetails = async () => {
    try {
      const response = await fetch(`/api/esim/plans/${planId}`);
      const result = await response.json();
      if (result.success && result.data) {
        setPlan(result.data);
      }
    } catch (error) {
      console.error("Error fetching plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;

    setProcessing(true);
    try {
      const response = await fetch("/api/esim/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_id: plan.id,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        window.location.href = `/esim/confirmation?orderId=${result.data.id}`;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: `2px solid ${dim}`, borderTopColor: gold, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }}></div>
          <p style={{ color: muted }}>Loading checkout...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!plan) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <p style={{ color: muted }}>Plan not found. <Link href="/esim" style={{ color: gold }}>Go back to eSIM store</Link></p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: gold, marginBottom: 24 }}>
        Complete Your Order
      </h1>
      
      <div style={{ background: "#111110", border: `1px solid ${dim}`, borderRadius: 8, padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: cream, fontSize: "1.2rem", marginBottom: 12 }}>{plan.country_name}</h2>
        <div style={{ color: gold, fontSize: "1.8rem", fontWeight: "bold", marginBottom: 8 }}>
          ${plan.retail_price} {plan.currency}
        </div>
        <div style={{ color: muted, marginBottom: 4 }}>{plan.data_amount}</div>
        <div style={{ color: muted }}>{plan.validity_days} days validity</div>
      </div>
      
      <form onSubmit={handleSubmit}>
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
            outline: "none",
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
            outline: "none",
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
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={processing}
          style={{
            width: "100%",
            padding: "14px",
            background: gold,
            border: "none",
            borderRadius: 6,
            color: "#080807",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s",
            opacity: processing ? 0.6 : 1,
          }}
        >
          {processing ? "Processing..." : "Place Order"}
        </button>
      </form>
      
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Link href="/esim" style={{ color: dim, textDecoration: "none" }}>
          ← Back to eSIM Store
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080807", paddingTop: 90 }}>
      <Suspense fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 40, height: 40, border: `2px solid ${dim}`, borderTopColor: gold, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }}></div>
            <p style={{ color: muted }}>Loading...</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      }>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
