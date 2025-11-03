-- Complete Backend System for ShikkhaBondhu AI Platform
-- Created: 2025-11-03
-- 
-- This migration creates:
-- 1. Enhanced user profiles with email verification
-- 2. Campaign management system
-- 3. Points and gamification tracking
-- 4. Chat history with AI interactions
-- 5. Course enrollments and progress
-- 6. Real-time subscriptions support
-- 7. Notifications system

-- ============================================================================
-- 1. USERS & AUTHENTICATION
-- ============================================================================

-- Extended user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
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
  email_verification_token text,
  email_verification_sent_at timestamptz,
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
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- User activity log
CREATE TABLE IF NOT EXISTS user_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN (
    'login', 'logout', 'signup', 'profile_update', 
    'chat_message', 'course_enrollment', 'course_completion',
    'campaign_created', 'report_submitted', 'points_earned'
  )),
  activity_data jsonb DEFAULT '{}'::jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 2. CAMPAIGNS SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Campaign details
  title text NOT NULL,
  title_bangla text NOT NULL,
  description text NOT NULL,
  description_bangla text NOT NULL,
  category text NOT NULL CHECK (category IN (
    'education', 'health', 'safety', 'legal_aid', 
    'mental_health', 'skill_development', 'community', 'other'
  )),
  
  -- Campaign goals
  goal_amount numeric(12, 2),
  goal_type text CHECK (goal_type IN ('fundraising', 'awareness', 'petition', 'volunteer')),
  target_number integer, -- for volunteers or signatures
  
  -- Visual content
  image_url text,
  video_url text,
  documents jsonb DEFAULT '[]'::jsonb,
  
  -- Location
  district text,
  location text,
  target_audience text[],
  
  -- Status and metrics
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'active', 'completed', 'cancelled')),
  current_amount numeric(12, 2) DEFAULT 0,
  current_supporters integer DEFAULT 0,
  views_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  
  -- Timeline
  start_date timestamptz,
  end_date timestamptz,
  completed_at timestamptz,
  
  -- Moderation
  is_featured boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  moderation_notes text,
  moderator_id uuid REFERENCES user_profiles(id),
  moderated_at timestamptz,
  
  -- Metadata
  tags text[],
  hashtags text[],
  search_vector tsvector,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Campaign updates/milestones
CREATE TABLE IF NOT EXISTS campaign_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  title text NOT NULL,
  content text NOT NULL,
  update_type text CHECK (update_type IN ('milestone', 'news', 'thank_you', 'urgent')),
  media_urls jsonb DEFAULT '[]'::jsonb,
  
  created_at timestamptz DEFAULT now()
);

-- Campaign supporters/contributions
CREATE TABLE IF NOT EXISTS campaign_supporters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  support_type text NOT NULL CHECK (support_type IN ('donation', 'volunteer', 'signature', 'share')),
  amount numeric(12, 2),
  message text,
  is_anonymous boolean DEFAULT false,
  
  -- Payment info (if donation)
  payment_method text,
  payment_status text CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id text,
  
  created_at timestamptz DEFAULT now(),
  
  UNIQUE(campaign_id, user_id, support_type)
);

-- Campaign comments
CREATE TABLE IF NOT EXISTS campaign_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  parent_comment_id uuid REFERENCES campaign_comments(id) ON DELETE CASCADE,
  
  content text NOT NULL,
  is_pinned boolean DEFAULT false,
  is_edited boolean DEFAULT false,
  likes_count integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 3. CHAT HISTORY & AI INTERACTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  bot_type text NOT NULL CHECK (bot_type IN (
    'general', 'law', 'health', 'safety', 'skills', 
    'postcare', 'community', 'crisis', 'academic'
  )),
  
  session_name text,
  total_messages integer DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
  
  -- Sentiment analysis
  overall_sentiment text CHECK (overall_sentiment IN ('positive', 'neutral', 'negative', 'crisis')),
  crisis_detected boolean DEFAULT false,
  
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  message_type text NOT NULL CHECK (message_type IN ('user', 'bot', 'system')),
  content text NOT NULL,
  
  -- AI metadata
  bot_type text,
  model_used text, -- e.g., 'gemini-2.5-flash'
  tokens_used integer,
  response_time_ms integer,
  
  -- Sentiment & analysis
  sentiment text CHECK (sentiment IN ('positive', 'neutral', 'negative', 'crisis')),
  keywords text[],
  language_detected text,
  
  -- Feedback
  was_helpful boolean,
  feedback_comment text,
  
  created_at timestamptz DEFAULT now()
);

-- ============================================================================
-- 4. COURSES & LEARNING
-- ============================================================================

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  title text NOT NULL,
  title_bangla text NOT NULL,
  description text NOT NULL,
  description_bangla text NOT NULL,
  category text NOT NULL,
  
  difficulty_level text CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours numeric(5, 2),
  thumbnail_url text,
  
  -- Content
  syllabus jsonb DEFAULT '[]'::jsonb,
  learning_outcomes text[],
  prerequisites text[],
  
  -- Instructor
  instructor_name text,
  instructor_bio text,
  instructor_avatar text,
  
  -- Status
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  enrollment_count integer DEFAULT 0,
  completion_count integer DEFAULT 0,
  average_rating numeric(3, 2) DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  progress_percentage numeric(5, 2) DEFAULT 0,
  current_lesson_id text,
  
  -- Time tracking
  total_time_spent_minutes integer DEFAULT 0,
  last_accessed_at timestamptz DEFAULT now(),
  
  -- Completion
  completed_at timestamptz,
  certificate_url text,
  final_score numeric(5, 2),
  
  enrolled_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES course_enrollments(id) ON DELETE CASCADE,
  
  lesson_id text NOT NULL,
  lesson_title text,
  is_completed boolean DEFAULT false,
  time_spent_minutes integer DEFAULT 0,
  quiz_score numeric(5, 2),
  
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  
  UNIQUE(enrollment_id, lesson_id)
);

-- ============================================================================
-- 5. NOTIFICATIONS SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  title text NOT NULL,
  title_bangla text,
  message text NOT NULL,
  message_bangla text,
  
  notification_type text NOT NULL CHECK (notification_type IN (
    'system', 'campaign', 'chat', 'course', 'achievement', 
    'report', 'community', 'reminder', 'alert'
  )),
  
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Action
  action_url text,
  action_label text,
  
  -- Status
  is_read boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  read_at timestamptz,
  
  -- Delivery channels
  sent_via_email boolean DEFAULT false,
  sent_via_push boolean DEFAULT false,
  sent_via_sms boolean DEFAULT false,
  
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- ============================================================================
-- 6. POINTS & GAMIFICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS points_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  action_type text NOT NULL,
  points_earned integer NOT NULL,
  points_multiplier numeric(3, 2) DEFAULT 1.0,
  
  description text,
  description_bangla text,
  
  -- Context
  related_entity_type text, -- 'campaign', 'chat', 'course', etc.
  related_entity_id uuid,
  
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name text NOT NULL UNIQUE,
  name_bangla text NOT NULL,
  description text NOT NULL,
  description_bangla text NOT NULL,
  
  icon_url text,
  category text NOT NULL,
  rarity text CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  
  -- Requirements
  requirements jsonb NOT NULL, -- e.g., {"points": 1000, "campaigns_created": 5}
  
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE,
  
  earned_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, badge_id)
);

-- ============================================================================
-- 7. INDEXES FOR PERFORMANCE
-- ============================================================================

-- User profiles
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_points ON user_profiles(points DESC);
CREATE INDEX idx_user_profiles_level ON user_profiles(level DESC);
CREATE INDEX idx_user_profiles_district ON user_profiles(district);
CREATE INDEX idx_user_profiles_last_active ON user_profiles(last_active_at DESC);

-- Campaigns
CREATE INDEX idx_campaigns_creator ON campaigns(creator_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_category ON campaigns(category);
CREATE INDEX idx_campaigns_district ON campaigns(district);
CREATE INDEX idx_campaigns_created ON campaigns(created_at DESC);
CREATE INDEX idx_campaigns_views ON campaigns(views_count DESC);
CREATE INDEX idx_campaigns_search ON campaigns USING gin(search_vector);

-- Chat
CREATE INDEX idx_chat_sessions_user ON chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_bot_type ON chat_sessions(bot_type);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_user ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at DESC);

-- Courses
CREATE INDEX idx_course_enrollments_user ON course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_course ON course_enrollments(course_id);
CREATE INDEX idx_course_enrollments_status ON course_enrollments(status);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- Points
CREATE INDEX idx_points_transactions_user ON points_transactions(user_id);
CREATE INDEX idx_points_transactions_created ON points_transactions(created_at DESC);

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_supporters ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Campaigns policies
CREATE POLICY "Anyone can view active campaigns"
  ON campaigns FOR SELECT
  USING (status = 'active' OR creator_id = auth.uid());

CREATE POLICY "Authenticated users can create campaigns"
  ON campaigns FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own campaigns"
  ON campaigns FOR UPDATE
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

-- Chat sessions policies
CREATE POLICY "Users can view own chat sessions"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chat sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions"
  ON chat_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can view own chat messages"
  ON chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Course enrollments policies
CREATE POLICY "Users can view own enrollments"
  ON course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can enroll"
  ON course_enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON course_enrollments FOR UPDATE
  USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Points transactions policies
CREATE POLICY "Users can view own points"
  ON points_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Badges are public
CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  USING (true);

CREATE POLICY "Users can view own earned badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- 9. FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update_updated_at trigger to tables
CREATE TRIGGER trigger_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to update user points
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_profiles
  SET 
    points = points + NEW.points_earned,
    level = FLOOR(SQRT((points + NEW.points_earned) / 100)) + 1
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_points
  AFTER INSERT ON points_transactions
  FOR EACH ROW EXECUTE FUNCTION update_user_points();

-- Function to update campaign metrics
CREATE OR REPLACE FUNCTION update_campaign_metrics()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.support_type = 'donation' AND NEW.payment_status = 'completed' THEN
    UPDATE campaigns
    SET 
      current_amount = current_amount + COALESCE(NEW.amount, 0),
      current_supporters = current_supporters + 1
    WHERE id = NEW.campaign_id;
  ELSIF NEW.support_type IN ('volunteer', 'signature') THEN
    UPDATE campaigns
    SET current_supporters = current_supporters + 1
    WHERE id = NEW.campaign_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_campaign_metrics
  AFTER INSERT ON campaign_supporters
  FOR EACH ROW EXECUTE FUNCTION update_campaign_metrics();

-- Function to update chat session metrics
CREATE OR REPLACE FUNCTION update_chat_session_metrics()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE chat_sessions
  SET total_messages = total_messages + 1
  WHERE id = NEW.session_id;
  
  UPDATE user_profiles
  SET total_chat_messages = total_chat_messages + 1
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_chat_metrics
  AFTER INSERT ON chat_messages
  FOR EACH ROW EXECUTE FUNCTION update_chat_session_metrics();

-- Function to update course enrollment progress
CREATE OR REPLACE FUNCTION update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons integer;
  completed_lessons integer;
  new_progress numeric;
BEGIN
  -- Count total and completed lessons
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE is_completed = true)
  INTO total_lessons, completed_lessons
  FROM course_progress
  WHERE enrollment_id = NEW.enrollment_id;
  
  -- Calculate progress percentage
  IF total_lessons > 0 THEN
    new_progress := (completed_lessons::numeric / total_lessons::numeric) * 100;
    
    UPDATE course_enrollments
    SET 
      progress_percentage = new_progress,
      status = CASE 
        WHEN new_progress >= 100 THEN 'completed'
        ELSE status
      END,
      completed_at = CASE 
        WHEN new_progress >= 100 AND completed_at IS NULL THEN now()
        ELSE completed_at
      END
    WHERE id = NEW.enrollment_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_enrollment_progress
  AFTER INSERT OR UPDATE ON course_progress
  FOR EACH ROW EXECUTE FUNCTION update_enrollment_progress();

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users table (requires Supabase Dashboard setup)
-- This will be created via Supabase Dashboard or CLI

-- ============================================================================
-- 10. INITIAL DATA - BADGES
-- ============================================================================

INSERT INTO badges (name, name_bangla, description, description_bangla, category, rarity, requirements) VALUES
('welcome', 'স্বাগতম', 'Completed profile setup', 'প্রোফাইল সেটআপ সম্পন্ন', 'onboarding', 'common', '{"profile_complete": true}'),
('first_chat', 'প্রথম চ্যাট', 'Had first AI conversation', 'প্রথম AI কথোপকথন', 'engagement', 'common', '{"chat_messages": 1}'),
('helper', 'সাহায্যকারী', 'Earned 100 points', '১০০ পয়েন্ট অর্জন', 'points', 'common', '{"points": 100}'),
('champion', 'চ্যাম্পিয়ন', 'Earned 1000 points', '১০০০ পয়েন্ট অর্জন', 'points', 'rare', '{"points": 1000}'),
('legend', 'কিংবদন্তি', 'Earned 10000 points', '১০০০০ পয়েন্ট অর্জন', 'points', 'legendary', '{"points": 10000}'),
('campaign_starter', 'ক্যাম্পেইন শুরুকারী', 'Created first campaign', 'প্রথম ক্যাম্পেইন তৈরি', 'campaigns', 'common', '{"campaigns_created": 1}'),
('change_maker', 'পরিবর্তনকারী', 'Created 5 campaigns', '৫টি ক্যাম্পেইন তৈরি', 'campaigns', 'rare', '{"campaigns_created": 5}'),
('learner', 'শিক্ষার্থী', 'Completed first course', 'প্রথম কোর্স সম্পন্ন', 'education', 'common', '{"courses_completed": 1}'),
('scholar', 'পণ্ডিত', 'Completed 5 courses', '৫টি কোর্স সম্পন্ন', 'education', 'rare', '{"courses_completed": 5}'),
('active_helper', 'সক্রিয় সাহায্যকারী', 'Logged in 30 days in a row', '৩০ দিন একটানা লগইন', 'engagement', 'epic', '{"consecutive_logins": 30}')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- 11. REALTIME PUBLICATION (for real-time subscriptions)
-- ============================================================================

-- Enable realtime for tables that need live updates
ALTER PUBLICATION supabase_realtime ADD TABLE campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE campaign_updates;
ALTER PUBLICATION supabase_realtime ADD TABLE campaign_supporters;
ALTER PUBLICATION supabase_realtime ADD TABLE campaign_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE user_profiles;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
