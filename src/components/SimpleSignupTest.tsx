import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function SimpleSignupTest() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setResult('Testing...');
    
    const testEmail = email || `test_simple_${Date.now()}@example.com`;
    const testPassword = password || 'TestPass123!';
    
    console.log('🧪 Testing signup with:', { testEmail, testPassword });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      });

      if (error) {
        console.error('❌ Signup error:', error);
        setResult(`❌ Error: ${error.message}`);
        alert(`❌ Error: ${error.message}`);
      } else {
        console.log('✅ Signup success:', data);
        const msg = `
✅ Signup successful!
User ID: ${data.user?.id}
Email: ${data.user?.email}
Email Confirmed: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}
Session: ${data.session ? 'Yes ✅' : 'No ❌'}
        `;
        setResult(msg);
        alert(msg);
      }
    } catch (err: any) {
      console.error('❌ Exception:', err);
      setResult(`❌ Exception: ${err.message}`);
      alert(`❌ Exception: ${err.message}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">🧪 Simple Signup Test</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Leave blank for auto-generated"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password (optional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank for TestPass123!"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <button
            onClick={handleTest}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Signup'}
          </button>
          
          {result && (
            <pre className="bg-gray-100 p-4 rounded text-xs whitespace-pre-wrap overflow-auto max-h-64">
              {result}
            </pre>
          )}
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full border-2 border-gray-300 py-2 px-4 rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
