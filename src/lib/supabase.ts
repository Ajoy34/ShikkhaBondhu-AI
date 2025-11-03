import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set ✓' : 'Missing ✗');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set ✓' : 'Missing ✗');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

console.log('✅ Supabase initialized');
console.log('📍 URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
