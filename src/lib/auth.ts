import { supabase } from './supabase';
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
  try {
    // Create auth user first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone_number: data.phone,
          district: data.district,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      console.error('Auth signup error:', authError);
      throw authError;
    }
    
    if (!authData.user) {
      throw new Error('User creation failed - no user returned');
    }

    // Try to create user profile (may fail if table doesn't exist)
    try {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          email: data.email,
          full_name: data.fullName,
          phone_number: data.phone,
          district: data.district,
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Check if it's a table not found error
        if (profileError.message?.includes('relation') || profileError.message?.includes('does not exist')) {
          console.warn('⚠️ user_profiles table does not exist. User created in auth.users only.');
          console.warn('📝 Please run the SQL migration from SETUP-BACKEND-NOW.md');
        } else {
          throw profileError;
        }
      }
    } catch (profileErr: any) {
      console.warn('Profile creation skipped:', profileErr.message);
      // Don't throw - user is still created in auth.users
    }

    // Try to log activity (optional)
    try {
      await logActivity(authData.user.id, 'signup', {
        method: 'email',
        email: data.email,
      });
    } catch (activityErr) {
      console.warn('Activity logging skipped:', activityErr);
    }

    // Try to send verification email (optional)
    try {
      await sendEmailVerification(data.email);
    } catch (emailErr) {
      console.warn('Email verification skipped:', emailErr);
    }

    return { user: authData.user, session: authData.session };
  } catch (error: any) {
    console.error('Sign up error:', error);
    
    // Provide helpful error messages
    if (error.message?.includes('User already registered')) {
      throw new Error('This email is already registered. Please login instead.');
    } else if (error.message?.includes('Invalid email')) {
      throw new Error('Please enter a valid email address.');
    } else if (error.message?.includes('Password')) {
      throw new Error('Password must be at least 6 characters long.');
    } else if (error.message?.includes('rate limit')) {
      throw new Error('Too many attempts. Please try again in a few minutes.');
    }
    
    throw new Error(error.message || 'Failed to sign up');
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(data: SignInData) {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    if (!authData.user) throw new Error('Sign in failed');

    // Try to update user profile (optional if table doesn't exist)
    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('login_count')
        .eq('id', authData.user.id)
        .single();

      await supabase
        .from('user_profiles')
        .update({
          last_active_at: new Date().toISOString(),
          login_count: (profile?.login_count || 0) + 1,
        })
        .eq('id', authData.user.id);

      // Try to log activity
      await logActivity(authData.user.id, 'login', {
        method: 'email',
        email: data.email,
      });
    } catch (profileErr) {
      console.warn('Profile update skipped:', profileErr);
      // Don't throw - user can still login
    }

    return { user: authData.user, session: authData.session };
  } catch (error: any) {
    console.error('Sign in error:', error);
    
    // Provide helpful error messages
    if (error.message?.includes('Invalid login credentials')) {
      throw new Error('ভুল ইমেইল বা পাসওয়ার্ড (Invalid email or password)');
    } else if (error.message?.includes('Email not confirmed')) {
      throw new Error('Please verify your email first. Check your inbox.');
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
    const { data, error } = await supabase
      .from('user_profiles')
      .select('email')
      .eq('email', email)
      .single();

    return !!data && !error;
  } catch (error) {
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
