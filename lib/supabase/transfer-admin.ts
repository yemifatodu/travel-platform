import { createClient } from '@supabase/supabase-js';

// Server-only: bypasses RLS. Never import this from a client component.
export const createTransferAdminClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY_TRANSFER!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
