import { supabase, supabaseUrl, supabaseAnonKey } from './supabase';
import type { User } from '@supabase/supabase-js';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  district?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  district: string | null;
  occupation: string | null;
  bio: string | null;
  email_verified: boolean;
  phone_verified: boolean;
  points: number;
  level: number;
  impact_score: number;
  badges: any[];
  achievements: any[];
  language: string;
  notification_preferences: any;
  theme: string;
  last_active_at: string;
  login_count: number;
  total_chat_messages: number;
  total_courses_completed: number;
  total_campaigns_created: number;
  created_at: string;
  updated_at: string;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(data: SignUpData) {
  console.log('🔵 Direct API signup with hardcoded credentials');

  // Hardcoded credentials - bypassing all environment variable logic
  const SUPABASE_URL = 'https://pakkuvcnhleqpcaxtruw.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha2t1dmNuaGxlcXBjYXh0cnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODA2OTksImV4cCI6MjA3Mjc1NjY5OX0.5MQrH7miN_tWIkOOUrb8mU7MZIYI4NP2SdALcqcZHdk';

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone_number: data.phone,
            district: data.district,
          }
        }
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Direct API signup error:', result);
      const errorMessage = result.msg || result.message || 'Sign up failed';
      const errorCode = result.error_code || result.code;

      if (errorCode === 'user_already_exists' || (errorMessage as string).toLowerCase().includes('user already registered')) {
        throw new Error('User already registered');
      }
      throw new Error(errorMessage);
    }
    
    console.log('✅ Direct API Signup Success:', result);
    
    // The 'result' from a direct API call should contain user and session objects,
    // mimicking the JS library's response.
    // We also need to update the local session for the user to be logged in.
    if (result.access_token) {
      await supabase.auth.setSession({
        access_token: result.access_token,
        refresh_token: result.refresh_token,
      });
    }
    
    return { user: result.user, session: result };

  } catch (error: any) {
    console.error('❌ Sign up exception:', error);
    
    // Re-throw with a consistent message
    if (error.message?.includes('User already registered')) {
      throw new Error('User already registered');
    }
    
    throw new Error(error.message || 'Failed to sign up');
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(data: SignInData) {
  console.log('🔵 Direct API login with hardcoded credentials');

  // Hardcoded credentials - bypassing all environment variable logic
  const SUPABASE_URL = 'https://pakkuvcnhleqpcaxtruw.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha2t1dmNuaGxlcXBjYXh0cnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODA2OTksImV4cCI6MjA3Mjc1NjY5OX0.5MQrH7miN_tWIkOOUrb8mU7MZIYI4NP2SdALcqcZHdk';

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Direct API login error:', result);
      const errorMessage = result.error_description || result.msg || result.message || 'Login failed';
      
      if (errorMessage.toLowerCase().includes('invalid login credentials')) {
        throw new Error('Invalid login credentials');
      }
      throw new Error(errorMessage);
    }

    console.log('✅ Direct API Login Success:', result);

    // Manually set the session to log the user in
    await supabase.auth.setSession({
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    });

    return { user: result.user, session: result };

  } catch (error: any) {
    console.error('❌ Sign in exception:', error);
    
    if (error.message?.includes('Invalid login credentials')) {
      throw new Error('ভুল ইমেইল বা পাসওয়ার্ড (Invalid email or password)');
    }
    
    throw new Error(error.message || 'Failed to sign in');
  }
}

/**
 * Sign out current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get user profile error:', error);
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity(userId, 'profile_update', { fields: Object.keys(updates) });

    return data;
  } catch (error: any) {
    console.error('Update profile error:', error);
    throw new Error(error.message || 'Failed to update profile');
  }
}

/**
 * Send email verification
 */
export async function sendEmailVerification(email: string) {
  try {
    // Generate verification token
    const token = Math.random().toString(36).substring(2, 15);
    
    // Update user profile with token
    const { error } = await supabase
      .from('user_profiles')
      .update({
        email_verification_token: token,
        email_verification_sent_at: new Date().toISOString(),
      })
      .eq('email', email);

    if (error) throw error;

    // In production, send actual email via email service
    // For now, we'll use Supabase's built-in email
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
    }

    return { success: true, token };
  } catch (error: any) {
    console.error('Send verification error:', error);
    throw new Error(error.message || 'Failed to send verification email');
  }
}

/**
 * Verify email with token
 */
export async function verifyEmail(email: string, token: string) {
  try {
    // Check if token matches
    const { data: profile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('email_verification_token')
      .eq('email', email)
      .single();

    if (fetchError) throw fetchError;

    if (profile.email_verification_token !== token) {
      throw new Error('Invalid verification token');
    }

    // Mark email as verified
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        email_verified: true,
        email_verification_token: null,
      })
      .eq('email', email);

    if (updateError) throw updateError;

    return { success: true };
  } catch (error: any) {
    console.error('Verify email error:', error);
    throw new Error(error.message || 'Failed to verify email');
  }
}

/**
 * Reset password request
 */
export async function requestPasswordReset(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Password reset request error:', error);
    throw new Error(error.message || 'Failed to send password reset email');
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Update password error:', error);
    throw new Error(error.message || 'Failed to update password');
  }
}

/**
 * Update email
 */
export async function updateEmail(newEmail: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) throw error;

    // Mark email as unverified
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('user_profiles')
        .update({
          email: newEmail,
          email_verified: false,
        })
        .eq('id', user.id);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Update email error:', error);
    throw new Error(error.message || 'Failed to update email');
  }
}

/**
 * Log user activity
 */
export async function logActivity(
  userId: string,
  activityType: string,
  activityData: any = {}
) {
  try {
    const { error } = await supabase
      .from('user_activity_log')
      .insert({
        user_id: userId,
        activity_type: activityType,
        activity_data: activityData,
        created_at: new Date().toISOString(),
      });

    if (error) throw error;
  } catch (error) {
    // Don't throw error for activity logging
    console.error('Log activity error:', error);
  }
}

/**
 * Get user activity history
 */
export async function getUserActivity(userId: string, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('user_activity_log')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get activity error:', error);
    return [];
  }
}

/**
 * Check if email is already registered
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    // Skip email check - let Supabase handle duplicate emails
    // This avoids needing the user_profiles table or admin access
    // Supabase will throw "User already registered" error if email exists
    console.log('🔵 Skipping email existence check for:', email);
    return false; // Always return false to allow signup attempt
  } catch (error) {
    console.log('⚠️ Email check failed, allowing signup');
    return false;
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}
