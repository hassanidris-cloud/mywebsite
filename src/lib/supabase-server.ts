import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type LeadRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  budget: string | null;
  timeline: string | null;
  project_type: string | null;
  description: string;
  source: string | null;
  is_high_value: boolean;
  created_at: string;
};

function getSupabase() {
  if (!url || !key) return null;
  return createClient(url, key);
}

export function getServerSupabase() {
  return getSupabase();
}

export function isSupabaseConfigured() {
  return Boolean(url && key);
}
