// lib/esim-api.ts
const API_BASE_URL = process.env.ESIM_API_URL || "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.NEXT_PUBLIC_ESIM_API_KEY || "";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json();
}

// Plans API
export async function getPlans(params?: {
  search?: string;
  country?: string;
  dataMin?: number;
  dataMax?: number;
  priceMax?: number;
  validityMin?: number;
  limit?: number;
  offset?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });
  }
  const queryString = queryParams.toString();
  return fetchAPI<{ success: boolean; data: any[]; pagination: any }>(
    `/api-plans${queryString ? `?${queryString}` : ""}`
  );
}

export async function getPlanDetails(id: string) {
  return fetchAPI<{ success: boolean; data: any }>(`/api-plan-details/${id}`);
}

// Orders API
export async function createOrder(orderData: {
  plan_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
}) {
  return fetchAPI<{ success: boolean; data: any }>("/api-orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export async function getOrderDetails(id: string) {
  return fetchAPI<{ success: boolean; data: any }>(`/api-order-details/${id}`);
}

export async function listOrders(params?: {
  limit?: number;
  offset?: number;
  status?: string;
  search?: string;
  start_date?: string;
  end_date?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });
  }
  const queryString = queryParams.toString();
  return fetchAPI<{ success: boolean; data: any }>(
    `/api-list-orders${queryString ? `?${queryString}` : ""}`
  );
}

// eSIM Status API
export async function getEsimStatus(iccid: string) {
  return fetchAPI<{ success: boolean; data: any }>(`/api-esim-status/${iccid}`);
}

// Top-up API
export async function getTopupPackages(iccid: string) {
  return fetchAPI<{ success: boolean; data: any }>(`/api-topup-packages/${iccid}`);
}

export async function topupEsim(iccid: string, packageCode: string) {
  return fetchAPI<{ success: boolean; data: any }>("/api-topup", {
    method: "POST",
    body: JSON.stringify({ iccid, package_code: packageCode }),
  });
}

// Management API
export async function cancelEsim(iccid: string) {
  return fetchAPI<{ success: boolean; data: any }>(`/api-cancel-esim/${iccid}`, {
    method: "DELETE",
  });
}
