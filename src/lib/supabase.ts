import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Force cache refresh with timestamp
const initTime = new Date().toISOString();
console.log('🔧 Initializing Supabase client... [v2 - ' + initTime + ']');
console.log('📍 URL:', supabaseUrl || '❌ MISSING');
console.log('🔑 Anon Key:', supabaseAnonKey ? `✅ Present (${supabaseAnonKey.substring(0, 20)}...)` : '❌ MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ CRITICAL ERROR: Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set ✓' : 'Missing ✗');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set ✓' : 'Missing ✗');
  console.error('⚠️ Make sure your .env file exists and contains:');
  console.error('   VITE_SUPABASE_URL=https://pakkuvcnhleqpcaxtruw.supabase.co');
  console.error('   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  console.error('');
  console.error('💡 SOLUTION: Restart the dev server with: npm run dev');
  
  // Show alert to user
  alert('⚠️ Configuration Error!\n\nSupabase environment variables are missing.\n\nPlease restart the dev server:\n1. Stop the server (Ctrl+C)\n2. Run: npm run dev\n3. Refresh this page');
  
  throw new Error('Missing Supabase environment variables. Please restart dev server.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

console.log('✅ Supabase client initialized successfully [v2]');

// Test connection immediately
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase connection test failed:', error.message);
    console.error('⚠️ If you see "Invalid API key", please restart dev server');
  } else {
    console.log('✅ Supabase connection test successful [v2]');
    console.log('📱 Current session:', data.session ? 'Logged in ✅' : 'Not logged in');
  }
});
