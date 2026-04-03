import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PromoCode = {
  id: string;
  code: string;
  type: string;
  max_uses: number;
  used_count: number;
  expires_at: string;
  created_at: string;
  created_by: string | null;
  note: string | null;
  is_active: boolean;
};
