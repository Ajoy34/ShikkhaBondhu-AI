import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export const QuickTest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      // Test 1: Check environment variables
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        setResult('❌ Environment variables missing!\n\nVITE_SUPABASE_URL: ' + (url ? '✅' : '❌') + '\nVITE_SUPABASE_ANON_KEY: ' + (key ? '✅' : '❌'));
        setLoading(false);
        return;
      }

      // Test 2: Try to get session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        setResult('❌ Session Error: ' + sessionError.message);
        setLoading(false);
        return;
      }

      // Test 3: Try a simple signup
      const testEmail = `test_${Date.now()}@example.com`;
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: testEmail,
        password: 'TestPass123!'
      });

      if (signupError) {
        setResult('❌ Signup Error: ' + signupError.message);
        setLoading(false);
        return;
      }

      setResult(`✅ ALL TESTS PASSED!

Environment Variables: ✅
URL: ${url}
Key: ${key.substring(0, 20)}...

Session Check: ✅
Current Session: ${sessionData.session ? 'Logged in' : 'Not logged in'}

Signup Test: ✅
Test Email: ${testEmail}
User ID: ${signupData.user?.id}
Email Confirmed: ${signupData.user?.email_confirmed_at ? 'Yes' : 'No'}

🎉 Supabase is working perfectly!
Your login/signup should work now.`);
      
    } catch (err: any) {
      setResult('❌ Test Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[10000]">
      <button
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '⏳ Testing...' : '🧪 Test Supabase'}
      </button>
      
      {result && (
        <div className="mt-2 bg-white border-2 border-blue-600 rounded-lg shadow-xl p-4 max-w-md max-h-96 overflow-auto">
          <pre className="text-xs whitespace-pre-wrap font-mono">{result}</pre>
          <button
            onClick={() => setResult('')}
            className="mt-2 w-full bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
