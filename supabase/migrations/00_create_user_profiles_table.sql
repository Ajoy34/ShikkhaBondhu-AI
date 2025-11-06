-- Create user_profiles table
-- This is the ESSENTIAL table needed for authentication to work

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone_number text,
  avatar_url text,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  district text,
  occupation text,
  bio text,
  
  -- Verification
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  
  -- Gamification
  points integer DEFAULT 0,
  level integer DEFAULT 1,
  impact_score integer DEFAULT 0,
  badges jsonb DEFAULT '[]'::jsonb,
  achievements jsonb DEFAULT '[]'::jsonb,
  
  -- Preferences
  language text DEFAULT 'bn' CHECK (language IN ('bn', 'en', 'both')),
  notification_preferences jsonb DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb,
  theme text DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  
  -- Activity tracking
  last_active_at timestamptz DEFAULT now(),
  login_count integer DEFAULT 0,
  total_chat_messages integer DEFAULT 0,
  total_courses_completed integer DEFAULT 0,
  total_campaigns_created integer DEFAULT 0,
  
  -- Additional statistics for profile
  courses_created integer DEFAULT 0,
  books_published integer DEFAULT 0,
  campaigns_created integer DEFAULT 0,
  people_helped integer DEFAULT 0,
  rating numeric(3,1) DEFAULT 0.0,
  total_problems integer DEFAULT 0,
  last_year_problems integer DEFAULT 0,
  last_month_problems integer DEFAULT 0,
  max_streak integer DEFAULT 0,
  current_year_streak integer DEFAULT 0,
  current_month_streak integer DEFAULT 0,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.created_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS set_updated_at ON public.user_profiles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_profiles TO anon;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at);
