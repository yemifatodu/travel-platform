"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const gold = "#C8A96E";
const cream = "#F5EFE4";
const muted = "rgba(245,239,228,0.60)";
const dim = "rgba(245,239,228,0.35)";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/esim/orders/${orderId}`);
      const result = await response.json();
      if (result.success) {
        setOrder(result.data);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <p style={{ color: muted }}>Loading order details...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
      <div style={{ fontSize: "4rem", marginBottom: 20 }}>🎉</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: gold, marginBottom: 16 }}>
        Order Confirmed!
      </h1>
      <p style={{ color: cream, marginBottom: 8 }}>Your eSIM order has been placed successfully.</p>
      <p style={{ color: muted, marginBottom: 24 }}>Order ID: {orderId}</p>
      <Link href="/esim" style={{ color: gold, textDecoration: "none" }}>
        ← Continue Shopping
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080807", paddingTop: 90 }}>
      <Suspense fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <p style={{ color: muted }}>Loading...</p>
        </div>
      }>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
