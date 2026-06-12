// scripts/sync-plans.ts — PRODUCTION: Fetch 200+ plans via secure proxy pattern
// Run with: npx tsx scripts/sync-plans.ts

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

// ✅ Validate env vars
const required = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'ESIM_API_KEY'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`❌ Missing env var: ${key}`);
    process.exit(1);
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const API_BASE = "https://cccktfactlzxuprpyhgh.supabase.co/functions/v1";
const API_KEY = process.env.ESIM_API_KEY!;

async function syncPlans() {
  try {
    console.log('🔄 Syncing 200+ eSIM plans...');
    
    let allPlans: any[] = [];
    let offset = 0;
    const limit = 100;
    
    // ✅ Fetch with pagination
    while (true) {
      console.log(`📄 Fetching page: offset=${offset}, limit=${limit}`);
      
      const res = await fetch(`${API_BASE}/api-plans?limit=${limit}&offset=${offset}`, {
        headers: { 'x-api-key': API_KEY }
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error ${res.status}: ${errorText}`);
      }
      
      const { data, pagination } = await res.json();
      
      if (!Array.isArray(data)) {
        console.warn('⚠️  Expected array of plans, got:', typeof data);
        break;
      }
      
      allPlans = [...allPlans, ...data];
      console.log(`✅ Page fetched: ${data.length} plans (total: ${allPlans.length})`);
      
      // ✅ Check if more pages exist
      if (!pagination?.has_more && data.length < limit) {
        console.log('🏁 No more pages');
        break;
      }
      
      offset += limit;
      
      // ✅ Rate limit friendly delay
      await new Promise(r => setTimeout(r, 300));
    }
    
    console.log(`\n📥 Total plans fetched: ${allPlans.length}`);
    
    if (allPlans.length === 0) {
      console.warn('⚠️  No plans fetched — check API response format');
      return;
    }
    
    // ✅ Upsert to Supabase esim_plans table
    let success = 0, errors = 0;
    const errorLog: string[] = [];
    
    for (const plan of allPlans) {
      try {
        const { error } = await supabase.from('esim_plans').upsert({
          id: plan.id || `${plan.country_code}-${plan.data_amount}-${plan.validity_days}`,
          title: plan.title || plan.name || `${plan.country_name} eSIM`,
          country_code: plan.country_code,
          country_name: plan.country_name,
          region: plan.region || 'Global',
          data_amount: plan.data_amount,
          validity_days: plan.validity_days,
          retail_price: plan.retail_price || plan.price,
          currency: plan.currency || 'USD',
          coverage_type: plan.coverage_type || 'single',
          is_active: plan.is_active ?? true,
          external_id: plan.id,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
        
        if (error) {
          console.error(`❌ Failed to upsert ${plan.id}:`, error.message);
          errorLog.push(`${plan.id}: ${error.message}`);
          errors++;
        } else {
          success++;
          if (success % 50 === 0) {
            console.log(`⏳ Progress: ${success}/${allPlans.length} plans synced...`);
          }
        }
      } catch (planError: any) {
        console.error(`❌ Error processing plan ${plan.id}:`, planError.message);
        errorLog.push(`${plan.id}: ${planError.message}`);
        errors++;
      }
    }
    
    // ✅ Final summary
    console.log(`\n📊 Sync Summary:`);
    console.log(`✅ Successfully synced: ${success}`);
    console.log(`❌ Failed: ${errors}`);
    
    if (errorLog.length > 0) {
      console.log(`\n⚠️  Failed plans (first 10):`);
      errorLog.slice(0, 10).forEach(err => console.log(`  - ${err}`));
      if (errorLog.length > 10) {
        console.log(`  ... and ${errorLog.length - 10} more`);
      }
    }
    
    console.log('🎉 Plan sync complete!');
    
  } catch (err: any) {
    console.error('💥 Sync failed:', err.message);
    if (err.cause) console.error('Cause:', err.cause);
    process.exit(1);
  }
}

syncPlans();
