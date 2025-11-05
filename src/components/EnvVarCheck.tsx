import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const EnvVarCheck: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const urlFromEnv = import.meta.env.VITE_SUPABASE_URL;
  const keyFromEnv = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      zIndex: 9999,
      fontFamily: 'monospace',
      maxWidth: '90vw',
      border: '2px solid #ffcc00'
    },
    title: {
      color: '#ffcc00',
      margin: '0 0 15px 0',
      fontSize: '18px',
      borderBottom: '1px solid #555',
      paddingBottom: '10px'
    },
    pre: {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      background: '#333',
      padding: '10px',
      borderRadius: '5px',
      marginTop: '10px'
    },
    button: {
      backgroundColor: '#ffcc00',
      color: '#1a1a1a',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '15px',
      fontWeight: 'bold'
    },
    result: {
      marginTop: '15px',
      padding: '10px',
      borderRadius: '5px',
    },
    error: {
      backgroundColor: '#8B0000',
      color: 'white'
    },
    success: {
      backgroundColor: '#006400',
      color: 'white'
    }
  };

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing...');
    try {
      // Use the Supabase client which is initialized with these exact values
      const { error } = await supabase.from('user_profiles').select('*').limit(1);
      if (error && error.message !== 'relation "user_profiles" does not exist') {
        throw error;
      }
      setTestResult('✅ SUCCESS: Connection test passed!');
    } catch (e: any) {
      setTestResult(`❌ FAILED: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Automatically run the test on load
    testConnection();
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Vercel Environment Variable Check</h3>
      <div>
        <strong>VITE_SUPABASE_URL:</strong>
        <pre style={styles.pre}>{urlFromEnv || '🔴 UNDEFINED'}</pre>
      </div>
      <div style={{ marginTop: '15px' }}>
        <strong>VITE_SUPABASE_ANON_KEY:</strong>
        <pre style={styles.pre}>{keyFromEnv ? `${keyFromEnv.substring(0, 15)}...` : '🔴 UNDEFINED'}</pre>
      </div>
      <button onClick={testConnection} disabled={isLoading}>
        {isLoading ? 'Testing...' : 'Re-run Connection Test'}
      </button>
      {testResult && (
        <div style={{...styles.result, ...(testResult.includes('SUCCESS') ? styles.success : styles.error)}}>
          {testResult}
        </div>
      )}
    </div>
  );
};

export default EnvVarCheck;
