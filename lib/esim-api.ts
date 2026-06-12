// lib/esim-api.ts
const SUPABASE_FUNCTIONS_URL = 'https://cccktfactlzxuprpyhgh.supabase.co/functions/v1';
const API_KEY = process.env.NEXT_PUBLIC_ESIM_API_KEY!;

export interface ESimStatus {
  iccid: string;
  status: 'active' | 'inactive' | 'expired' | 'cancelled';
  activation_status: 'installed' | 'not_installed';
  network_status: 'connected' | 'disconnected';
  data_remaining_mb: number;
  data_used_mb: number;
  data_total_mb: number;
  expiry_date: string;
  last_updated: string;
}

// Get eSIM status with caching
let statusCache: Map<string, { data: ESimStatus; timestamp: number }> = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export async function getEsimStatus(iccid: string): Promise<ESimStatus> {
  // Check cache first
  const cached = statusCache.get(iccid);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(
    `${SUPABASE_FUNCTIONS_URL}/api-esim-status/${iccid}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch eSIM status: ${response.status}`);
  }

  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || 'Unknown error');
  }

  // Cache the result
  statusCache.set(iccid, { data: result.data, timestamp: Date.now() });
  
  // Check for low data or expiring soon
  checkDataAlerts(result.data);
  
  return result.data;
}

// Cancel eSIM
export async function cancelEsim(iccid: string): Promise<{
  success: boolean;
  previous_status: string;
  new_status: string;
}> {
  const response = await fetch(
    `${SUPABASE_FUNCTIONS_URL}/api-cancel-esim/${iccid}`,
    {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to cancel eSIM: ${response.status}`);
  }

  const result = await response.json();
  
  // Clear cache for this ICCID
  statusCache.delete(iccid);
  
  return result.data;
}

// Alert helpers
function checkDataAlerts(status: ESimStatus) {
  // Low data alert (≤ 100 MB)
  if (status.data_remaining_mb <= 100 && status.data_remaining_mb > 0) {
    console.warn(`⚠️ Low data alert for ${status.iccid}: ${status.data_remaining_mb} MB remaining`);
    // You can trigger a notification here
    if (typeof window !== 'undefined') {
      // Show browser notification or toast
      showLowDataNotification(status);
    }
  }

  // Expiry alert (≤ 24 hours)
  const expiryDate = new Date(status.expiry_date);
  const hoursUntilExpiry = (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60);
  if (hoursUntilExpiry <= 24 && hoursUntilExpiry > 0) {
    console.warn(`⚠️ eSIM ${status.iccid} expires in ${Math.round(hoursUntilExpiry)} hours`);
    showExpiryWarning(status);
  }
}

// UI notification functions (implement with your preferred toast library)
function showLowDataNotification(status: ESimStatus) {
  // Example using browser notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Low Data Warning', {
      body: `Your eSIM (${status.iccid.slice(-4)}) has only ${status.data_remaining_mb} MB remaining.`,
      icon: '/icons/data-warning.png',
    });
  }
}

function showExpiryWarning(status: ESimStatus) {
  const expiryDate = new Date(status.expiry_date);
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('eSIM Expiring Soon', {
      body: `Your eSIM expires on ${expiryDate.toLocaleDateString()}. Please renew soon.`,
      icon: '/icons/expiry-warning.png',
    });
  }
}

// Rate limit error handler
export async function handleRateLimit(error: any): Promise<boolean> {
  if (error.message?.includes('Rate limit exceeded')) {
    console.error('Rate limit exceeded. Waiting 1 hour before retrying.');
    // Implement exponential backoff or show user message
    return true;
  }
  return false;
}