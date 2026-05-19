"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const gold = "#C8A96E";
const cream = "#F5EFE4";
const muted = "rgba(245,239,228,0.60)";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
      <div style={{ fontSize: "4rem", marginBottom: 20 }}>✅</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: gold, marginBottom: 16 }}>
        Payment Successful!
      </h1>
      <p style={{ color: cream, marginBottom: 8 }}>Your eSIM order has been confirmed.</p>
      <p style={{ color: muted, marginBottom: 24 }}>Order ID: {orderId}</p>
      <p style={{ color: muted, marginBottom: 24 }}>You will receive an email with activation instructions shortly.</p>
      <Link href="/esim" style={{ color: gold, textDecoration: "none" }}>
        ← Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080807", paddingTop: 90 }}>
      <Suspense fallback={<div style={{ textAlign: "center", paddingTop: "20vh", color: muted }}>Loading...</div>}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}
