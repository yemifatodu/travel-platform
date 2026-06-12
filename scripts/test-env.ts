// scripts/test-env.ts — Test that .env.local loads correctly
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔍 Testing .env.local loading...');
console.log(`✅ NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING'}`);
console.log(`✅ SUPABASE_SERVICE_ROLE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET (length: ' + process.env.SUPABASE_SERVICE_ROLE_KEY!.length + ')' : 'MISSING'}`);
console.log(`✅ ESIM_API_KEY: ${process.env.ESIM_API_KEY ? 'SET (starts with: ' + process.env.ESIM_API_KEY!.substring(0, 10) + '...)' : 'MISSING'}`);
console.log(`✅ STRIPE_SECRET_KEY: ${process.env.STRIPE_SECRET_KEY ? 'SET' : 'MISSING'}`);
console.log('🎉 Env test complete!');