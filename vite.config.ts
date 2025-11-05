import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      // Expose env variables to the client
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
        env.VITE_SUPABASE_URL || 'https://pakkuvcnhleqpcaxtruw.supabase.co'
      ),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha2t1dmNuaGxlcXBjYXh0cnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODA2OTksImV4cCI6MjA3Mjc1NjY5OX0.5MQrH7miN_tWIkOOUrb8mU7MZIYI4NP2SdALcqcZHdk'
      ),
      'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(
        env.VITE_GOOGLE_API_KEY || 'AIzaSyAuL94ws2_XOwutCg6F0AawkZCsOS3JWNU'
      ),
    },
  };
});
