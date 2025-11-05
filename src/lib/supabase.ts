import { createClient } from '@supabase/supabase-js';

// Function to safely get environment variables
function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const fallbackUrl = 'https://pakkuvcnhleqpcaxtruw.supabase.co';
  const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha2t1dmNuaGxlcXBjYXh0cnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODA2OTksImV4cCI6MjA3Mjc1NjY5OX0.5MQrH7miN_tWIkOOUrb8mU7MZIYI4NP2SdALcqcZHdk';

  const finalUrl = (envUrl && envUrl.startsWith('https')) ? envUrl : fallbackUrl;
  const finalKey = (envKey && envKey.length > 50) ? envKey : fallbackKey;
  
  console.log(`[Supabase Init] Using URL: ${finalUrl === fallbackUrl ? 'FALLBACK' : 'ENV_VAR'}`);
  console.log(`[Supabase Init] Using Key: ${finalKey === fallbackKey ? 'FALLBACK' : 'ENV_VAR'}`);

  return { supabaseUrl: finalUrl, supabaseAnonKey: finalKey };
}

// Get credentials safely
const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials();

// Force cache refresh with timestamp
const initTime = new Date().toISOString();
console.log('🔧 Initializing Supabase client... [v4 - ' + initTime + ']');
console.log('📍 URL Source:', import.meta.env.VITE_SUPABASE_URL ? 'ENV VAR ✅' : 'FALLBACK ⚠️');
console.log('📍 URL Value:', supabaseUrl);
console.log('🔑 Key Source:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'ENV VAR ✅' : 'FALLBACK ⚠️');
console.log('🔑 Key Value:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 30)}...` : '❌ MISSING');

// Validate credentials
if (!supabaseUrl || supabaseUrl === 'undefined' || !supabaseUrl.includes('supabase.co')) {
  console.error('❌ CRITICAL ERROR: Invalid Supabase URL!');
  console.error('Current URL:', supabaseUrl);
  // Don't throw - let app continue with fallback
}

if (!supabaseAnonKey || supabaseAnonKey === 'undefined' || supabaseAnonKey.length < 50) {
  console.error('❌ CRITICAL ERROR: Invalid Supabase API Key!');
  console.error('Key length:', supabaseAnonKey?.length || 0);
  // Don't throw - let app continue with fallback
}

console.log('✅ All credentials validated');
console.log('🌐 Creating Supabase client...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Also export the raw values for direct use
export { supabaseUrl, supabaseAnonKey };

console.log('✅ Supabase client initialized successfully [v3]');
console.log('🔗 URL:', supabaseUrl);
console.log('🔑 Key:', `${supabaseAnonKey.substring(0, 30)}...${supabaseAnonKey.substring(supabaseAnonKey.length - 5)}`);

// Test connection immediately (don't block app with alerts)
console.log('🧪 Testing Supabase connection...');

// Add timeout to prevent hanging
const connectionTimeout = setTimeout(() => {
  console.warn('⚠️ Connection test timed out after 5 seconds');
}, 5000);

supabase.auth.getSession()
  .then(({ data, error }) => {
    clearTimeout(connectionTimeout);
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error.message);
      console.error('📊 Error details:', {
        status: error.status,
        message: error.message,
        name: error.name
      });
      
      if (error.message.includes('Invalid API key')) {
        console.error('⚠️ INVALID API KEY ERROR!');
        console.error('🔍 This means:');
        console.error('   1. The API key is wrong');
        console.error('   2. The Supabase project is PAUSED');
        console.error('   3. The project URL is wrong');
        console.error('');
        console.error('✅ SOLUTION:');
        console.error('   Go to https://supabase.com/dashboard');
        console.error('   Check if your project is paused and RESUME it');
      }
    } else {
      console.log('✅ Supabase connection test successful [v3]');
      console.log('📱 Current session:', data.session ? 'Logged in ✅' : 'Not logged in ⭕');
      console.log('🎯 Backend ready!');
    }
  })
  .catch(err => {
    clearTimeout(connectionTimeout);
    console.error('❌ Connection test crashed:', err);
  });
