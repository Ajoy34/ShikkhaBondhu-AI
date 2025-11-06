import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, Loader } from 'lucide-react';
import { signUp, signIn, checkEmailExists } from '../lib/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onLoginSuccess?: () => void; // Optional callback to navigate to dashboard
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    district: ''
  });

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Clear errors when modal opens or mode changes
  React.useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccess('');
    }
  }, [isOpen, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(''); // Clear error on input change
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validate inputs
      if (!formData.email || !formData.password || !formData.fullName) {
        throw new Error('সব ফিল্ড পূরণ করুন (Please fill all required fields)');
      }

      if (!validateEmail(formData.email)) {
        throw new Error('সঠিক ইমেইল ঠিকানা দিন (Please enter a valid email)');
      }

      if (!validatePassword(formData.password)) {
        throw new Error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে (Password must be at least 6 characters)');
      }

      // Check if email exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        throw new Error('এই ইমেইল ইতিমধ্যে নিবন্ধিত (This email is already registered)');
      }

      // Sign up
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone || undefined,
        district: formData.district || undefined
      });

      console.log('📧 Signup result:', result);
      console.log('📧 Has user:', !!result.user);
      console.log('📧 Has session:', !!result.session);
      console.log('📧 User ID:', result.user?.id);

      // Show success and switch to login mode - NO AUTO-LOGIN
      console.log('✅ Account created! Switching to login mode...');
      const msg = '✅ Account created! Please login. (অ্যাকাউন্ট তৈরি হয়েছে! এখন লগইন করুন)';
      setSuccess(msg);
      setTimeout(() => {
        setMode('login');
        setSuccess('');
      }, 2000);

    } catch (err: any) {
      console.error('❌ Signup error:', err);
      console.error('❌ Error message:', err.message);
      console.error('❌ Error details:', err);
      console.error('❌ Error type:', typeof err);
      console.error('❌ Error keys:', Object.keys(err));
      console.error('🔍 Full error object:', JSON.stringify(err, null, 2));
      
      // Show more detailed error message
      let errorMessage = err.message || 'সাইন আপ ব্যর্থ হয়েছে (Sign up failed)';
      
      // Check for specific errors FIRST (most specific to least specific)
      if (err.message?.includes('User already registered')) {
        errorMessage = '⚠️ এই ইমেইল ইতিমধ্যে নিবন্ধিত (This email is already registered). Please login instead.';
      } else if (err.message?.includes('Invalid login credentials')) {
        errorMessage = '❌ ভুল ইমেইল বা পাসওয়ার্ড (Invalid email or password)';
      } else if (err.message?.includes('rate limit') || err.message?.includes('429')) {
        errorMessage = '⚠️ Too many attempts. Please wait a few minutes and try again.';
      } else if (err.message?.includes('relation') || err.message?.includes('does not exist')) {
        errorMessage = '⚠️ Database tables not created (This is OK - Authentication still works!)';
      } else if (err.message?.includes('Invalid API key') || err.message?.includes('JWT') || err.message?.includes('401') || err.message?.includes('Configuration error')) {
        errorMessage = '⚠️ Supabase connection error. Please refresh the page and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('ইমেইল এবং পাসওয়ার্ড দিন (Please enter email and password)');
      }

      if (!validateEmail(formData.email)) {
        throw new Error('সঠিক ইমেইল ঠিকানা দিন (Please enter a valid email)');
      }

      console.log('🔵 Attempting login...');
      const result = await signIn({
        email: formData.email,
        password: formData.password
      });

      console.log('✅ Login successful:', result);
      setSuccess('সফলভাবে লগইন হয়েছে! (Successfully logged in!)');
      
      // Close modal immediately and trigger callback
      onClose();
      if (onLoginSuccess) {
        onLoginSuccess();
      }

    } catch (err: any) {
      console.error('❌ Login error:', err);
      
      let errorMessage = 'লগইন ব্যর্থ হয়েছে (Login failed)';
      
      if (err.message) {
        errorMessage = err.message;
      }
      
      // Check for common login errors
      if (err.message?.includes('Email not confirmed')) {
        errorMessage = '⚠️ Please verify your email first. Check your inbox for the verification link. (প্রথমে ইমেইল যাচাই করুন)';
      } else if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'ভুল ইমেইল বা পাসওয়ার্ড (Invalid email or password)';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const districts = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh',
    'Comilla', 'Gazipur', 'Narayanganj', 'Tangail', 'Jessore', 'Bogra', 'Dinajpur'
  ];

  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
      style={{ position: 'fixed', overflow: 'auto' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-slideUp"
        style={{ maxHeight: '90vh', overflow: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold mb-2">
            {mode === 'login' ? 'লগইন করুন' : 'নিবন্ধন করুন'}
          </h2>
          <p className="text-indigo-200 text-sm">
            {mode === 'login' ? 'Welcome back! Log in to continue' : 'Create your account to get started'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm font-semibold animate-shake">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-700 text-sm font-semibold animate-pulse">
              {success}
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ইমেইল (Email) *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পাসওয়ার্ড (Password) *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    লগইন হচ্ছে...
                  </>
                ) : (
                  'লগইন করুন (Login)'
                )}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পূর্ণ নাম (Full Name) *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="আপনার নাম"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ইমেইল (Email) *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  পাসওয়ার্ড (Password) * <span className="text-xs text-gray-500">(কমপক্ষে ৬ অক্ষর)</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ফোন নম্বর (Phone Number)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+8801XXXXXXXXX"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  জেলা (District)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    নিবন্ধন হচ্ছে...
                  </>
                ) : (
                  'নিবন্ধন করুন (Sign Up)'
                )}
              </button>
            </form>
          )}

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === 'login' ? (
                <>
                  নতুন ব্যবহারকারী? (New user?){' '}
                  <button
                    onClick={() => {
                      setMode('signup');
                      setError('');
                      setSuccess('');
                    }}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    নিবন্ধন করুন (Sign Up)
                  </button>
                </>
              ) : (
                <>
                  ইতিমধ্যে অ্যাকাউন্ট আছে? (Already have account?){' '}
                  <button
                    onClick={() => {
                      setMode('login');
                      setError('');
                      setSuccess('');
                    }}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    লগইন করুন (Login)
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
