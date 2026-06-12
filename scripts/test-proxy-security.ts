// scripts/test-proxy-security.ts — Verify proxy doesn't leak secrets
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testProxy() {
  const API_KEY = process.env.ESIM_API_KEY;
  console.log('🔒 Testing proxy security...');
  
  // Simulate a frontend fetch to the proxy
  const res = await fetch('http://localhost:3000/api/esim-proxy?path=/api-plans&limit=1', {
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  
  const responseText = JSON.stringify(data);
  
  // Check for key leakage
  if (responseText.includes(API_KEY?.substring(0, 10) || 'sk_live_')) {
    console.error('❌ SECURITY FAIL: API key leaked in response!');
    process.exit(1);
  }
  
  if (responseText.toLowerCase().includes('api_key') || responseText.toLowerCase().includes('x-api-key')) {
    console.error('❌ SECURITY FAIL: Key header name exposed!');
    process.exit(1);
  }
  
  console.log('✅ Proxy security check PASSED: No secrets leaked');
  console.log(`✅ Response sample: ${responseText.substring(0, 200)}...`);
}

testProxy().catch(err => {
  console.error('💥 Test failed:', err);
  process.exit(1);
});