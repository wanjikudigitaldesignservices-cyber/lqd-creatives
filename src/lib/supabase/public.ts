import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rdaudofnzkilnsyhtahk.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkYXVkb2ZuemtpbG5zeWh0YWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3MDI0NTQsImV4cCI6MjEwOTI3ODQ1NH0.CKDkkp1SPHwy8dlizloDyNBQD-d2ThvuapOkJKvAviM";

// Dedicated public client for fast static caching & ISR with zero cookie dependencies
export const publicSupabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
