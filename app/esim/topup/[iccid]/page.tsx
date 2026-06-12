// app/esim/topup/[iccid]/page.tsx - FIXED VERSION
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface TopupPackage {
  package_code: string;
  data_added: string;
  validity_added_days: number;
  price: number;
}

export default function TopupPage() {
  const params = useParams();
  const [packages, setPackages] = useState<TopupPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchTopupPackages();
  }, []);

  const fetchTopupPackages = async () => {
    setError('');
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setError('Please login to continue');
      return;
    }

    try {
      // ✅ FIXED URL - matches the API route path
      const response = await fetch(`/api/esim/topup/packages/${params.iccid}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPackages(data.data);
      } else {
        setError(data.error || 'Failed to load top-up packages');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleTopup = async () => {
    if (!selectedPackage) return;
    
    setLoading(true);
    setError('');
    
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/esim/topup', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({
        iccid: params.iccid,
        package_code: selectedPackage,
      }),
    });
    
    const result = await response.json();
    if (result.success) {
      alert('Top-up successful! New data added to your eSIM.');
      window.location.href = '/esim/my-esims';
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Top Up Your eSIM</h1>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {packages.length === 0 ? (
            <p className="text-gray-500 text-center">Loading available packages...</p>
          ) : (
            <>
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <label key={pkg.package_code} className="block p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="package"
                      value={pkg.package_code}
                      checked={selectedPackage === pkg.package_code}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="mr-3"
                    />
                    <div className="inline-block">
                      <span className="font-semibold">{pkg.data_added}</span>
                      <span className="text-gray-600 text-sm ml-2">+{pkg.validity_added_days} days</span>
                      <span className="text-blue-600 font-bold ml-3">${pkg.price}</span>
                    </div>
                  </label>
                ))}
              </div>
              
              <button
                onClick={handleTopup}
                disabled={!selectedPackage || loading}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Top-Up'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}