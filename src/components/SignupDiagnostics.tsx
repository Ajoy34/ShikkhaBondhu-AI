import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DiagnosticResult {
  test: string;
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
  details?: string;
}

export default function SignupDiagnostics() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    const diagnosticResults: DiagnosticResult[] = [];
    setResults([]);
    setIsRunning(true);

    try {
      // Test 1: Environment Variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        diagnosticResults.push({
          test: 'Environment Variables',
          status: 'error',
          message: 'Missing environment variables!',
          details: `URL: ${supabaseUrl ? '✓' : '✗'}, Key: ${supabaseKey ? '✓' : '✗'}`
        });
        setResults(diagnosticResults);
        setIsRunning(false);
        return;
      }

      diagnosticResults.push({
        test: 'Environment Variables',
        status: 'success',
        message: 'Environment variables found',
        details: `URL: ${supabaseUrl}\nKey: ${supabaseKey.substring(0, 30)}...`
      });
      setResults([...diagnosticResults]);

      // Test 2: Supabase Connection
      try {
        await supabase.auth.getSession();
        diagnosticResults.push({
          test: 'Supabase Connection',
          status: 'success',
          message: 'Connected to Supabase successfully',
          details: 'Auth service is reachable'
        });
      } catch (error: any) {
        diagnosticResults.push({
          test: 'Supabase Connection',
          status: 'error',
          message: 'Failed to connect to Supabase',
          details: error.message
        });
        setResults(diagnosticResults);
        setIsRunning(false);
        return;
      }
      setResults([...diagnosticResults]);

      // Test 3: Signup Test
      const testEmail = 'diagnostic_test_' + Date.now() + '@example.com';
      
      try {
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email: testEmail,
          password: 'TestPassword123!@#',
          options: {
            data: {
              full_name: 'Diagnostic Test User'
            }
          }
        });

        if (signupError) {
          if (signupError.message?.includes('signup_disabled')) {
            diagnosticResults.push({
              test: 'Signup Configuration',
              status: 'error',
              message: '❌ Signups are DISABLED in Supabase!',
              details: 'Fix: Supabase Dashboard → Authentication → Settings → Enable "Enable sign ups"'
            });
          } else if (signupError.message?.includes('Invalid API key') || signupError.message?.includes('401')) {
            diagnosticResults.push({
              test: 'Signup Configuration',
              status: 'error',
              message: '❌ Invalid API key!',
              details: 'Your Supabase anon key may have changed. Check: Supabase Dashboard → Settings → API'
            });
          } else if (signupError.message?.includes('rate limit') || signupError.message?.includes('429')) {
            diagnosticResults.push({
              test: 'Signup Configuration',
              status: 'warning',
              message: 'Rate limit reached',
              details: 'Too many signup attempts. Wait a few minutes and try again.'
            });
          } else {
            diagnosticResults.push({
              test: 'Signup Configuration',
              status: 'error',
              message: 'Signup failed',
              details: signupError.message
            });
          }
        } else if (signupData.user) {
          diagnosticResults.push({
            test: 'Signup Configuration',
            status: 'success',
            message: '✅ Signup is WORKING!',
            details: `Test user created successfully\nUser ID: ${signupData.user.id}`
          });

          // Test 4: Email Confirmation
          if (signupData.user.email_confirmed_at) {
            diagnosticResults.push({
              test: 'Email Confirmation',
              status: 'success',
              message: '✅ Auto-confirm is ENABLED (recommended)',
              details: 'Users can login immediately after signup'
            });
          } else {
            diagnosticResults.push({
              test: 'Email Confirmation',
              status: 'warning',
              message: 'Email confirmation is REQUIRED',
              details: 'Users must verify email before login.\nTo disable: Supabase → Auth → Providers → Email → Uncheck "Confirm email"'
            });
          }

          // Test 5: Session Creation
          if (signupData.session) {
            diagnosticResults.push({
              test: 'Session Creation',
              status: 'success',
              message: '✅ Session created successfully',
              details: 'Users will be logged in automatically after signup'
            });
          } else {
            diagnosticResults.push({
              test: 'Session Creation',
              status: 'warning',
              message: 'No session created',
              details: 'Users will need to login after email verification'
            });
          }
        }
      } catch (error: any) {
        diagnosticResults.push({
          test: 'Signup Configuration',
          status: 'error',
          message: 'Unexpected error during signup test',
          details: error.message || String(error)
        });
      }
      setResults([...diagnosticResults]);

      // Test 6: Database Tables (Optional)
      try {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .select('id')
          .limit(1);

        if (profileError) {
          if (profileError.message?.includes('relation') || profileError.message?.includes('does not exist')) {
            diagnosticResults.push({
              test: 'Database Tables',
              status: 'warning',
              message: 'user_profiles table does not exist (This is OK)',
              details: 'Authentication works without it.\nFor full features, run migration from SETUP-BACKEND-NOW.md'
            });
          } else {
            diagnosticResults.push({
              test: 'Database Tables',
              status: 'warning',
              message: 'Cannot access database tables',
              details: profileError.message
            });
          }
        } else {
          diagnosticResults.push({
            test: 'Database Tables',
            status: 'success',
            message: '✅ Database tables are accessible',
            details: 'Profile system is ready'
          });
        }
      } catch (error: any) {
        diagnosticResults.push({
          test: 'Database Tables',
          status: 'info',
          message: 'Database check skipped',
          details: error.message
        });
      }

    } catch (error: any) {
      diagnosticResults.push({
        test: 'Diagnostic System',
        status: 'error',
        message: 'Diagnostic failed with unexpected error',
        details: error.message || String(error)
      });
    }

    setResults(diagnosticResults);
    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Loader className="w-5 h-5 text-blue-500" />;
      default:
        return <Loader className="w-5 h-5 text-gray-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const hasErrors = results.some(r => r.status === 'error');
  const hasWarnings = results.some(r => r.status === 'warning');
  const allSuccess = results.length > 0 && results.every(r => r.status === 'success' || r.status === 'warning');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">🔍 Signup Diagnostics</h2>
          <p className="text-purple-100">Testing all signup components and configuration</p>
        </div>

        {/* Results */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isRunning && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
              <p>Running diagnostics...</p>
            </div>
          )}

          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{result.test}</h3>
                    <p className="text-sm text-gray-700 mt-1">{result.message}</p>
                    {result.details && (
                      <pre className="text-xs bg-white/50 rounded p-2 mt-2 overflow-x-auto text-gray-600 whitespace-pre-wrap">
                        {result.details}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        {!isRunning && results.length > 0 && (
          <div className="border-t bg-gray-50 p-6">
            {allSuccess && !hasErrors ? (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-bold text-green-900">✅ Diagnostics Complete!</h3>
                    <p className="text-sm text-green-700">
                      {hasWarnings 
                        ? 'Signup works! Some optional features have warnings.' 
                        : 'All tests passed! Signup should work perfectly.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : hasErrors ? (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <h3 className="font-bold text-red-900">❌ Critical Issues Found</h3>
                    <p className="text-sm text-red-700">Please fix the errors above to enable signup.</p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex gap-3">
              <button
                onClick={runDiagnostics}
                disabled={isRunning}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
              >
                {isRunning ? 'Running...' : '🔄 Run Again'}
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
