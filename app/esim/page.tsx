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
      const response = await fetch("/api/esim/plans?limit=50");
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

  const filteredPlans = plans && searchQuery
    ? plans.filter(p => 
        p.country_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : plans || [];

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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4">Loading eSIM plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">HUUBOI eSIM Store</h1>
        <p className="text-xl text-gray-600">Stay connected anywhere on Earth</p>
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <span className="px-3 py-1 bg-gray-100 rounded">📶 200+ Countries</span>
          <span className="px-3 py-1 bg-gray-100 rounded">⚡ Instant Activation</span>
          <span className="px-3 py-1 bg-gray-100 rounded">🔒 No Roaming Fees</span>
        </div>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredPlans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No eSIM plans found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{plan.country_name}</h3>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                ${plan.retail_price} {plan.currency}
              </div>
              <div className="text-gray-600 mb-4">
                <div>{plan.data_amount}</div>
                <div>{plan.validity_days} days validity</div>
              </div>
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setModalOpen(true);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get eSIM
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Complete Purchase</h2>
            <div className="mb-4 p-3 bg-gray-100 rounded text-center">
              <strong>{selectedPlan.data_amount}</strong> • {selectedPlan.validity_days} days
              <div className="text-xl font-bold text-blue-600">${selectedPlan.retail_price} {selectedPlan.currency}</div>
            </div>
            <form onSubmit={handleOrderSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded"
                required
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded"
              />
              <button
                type="submit"
                disabled={orderStatus === "processing"}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {orderStatus === "processing" ? "Processing..." : orderStatus === "success" ? "Success!" : "Confirm Order"}
              </button>
            </form>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full mt-3 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}