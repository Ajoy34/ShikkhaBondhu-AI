# 🗄️ Database Setup Guide

## ⚠️ CRITICAL: You MUST create the database table or login won't work!

---

## 📍 **WHERE TO PASTE THE SQL**

### **Step 1: Go to Supabase Dashboard**
```
https://supabase.com/dashboard/project/pakkuvcnhleqpcaxtruw/editor
```

### **Step 2: Click "SQL Editor"**
Look on the left sidebar, you'll see:
- 📊 Table Editor
- 🔍 SQL Editor  ← **CLICK THIS**
- 🔐 Authentication
- 📦 Storage

### **Step 3: Click "New Query"**
At the top right, click the **"+ New Query"** button

### **Step 4: Paste the SQL below**
Copy ALL the SQL code from the box below and paste it into the editor

### **Step 5: Click "Run"**
Press the **"Run"** button (or Ctrl+Enter)

### **Step 6: Verify Success**
You should see: ✅ **"Success. No rows returned"**

---

## 📝 **SQL CODE TO PASTE**

```sql
-- ========================================
-- CREATE user_profiles TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone_number text,
  avatar_url text,
  date_of_birth date,
  gender text,
  district text,
  occupation text,
  bio text,
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  points integer DEFAULT 0,
  level integer DEFAULT 1,
  impact_score integer DEFAULT 0,
  badges jsonb DEFAULT '[]'::jsonb,
  achievements jsonb DEFAULT '[]'::jsonb,
  language text DEFAULT 'bn',
  notification_preferences jsonb DEFAULT '{}'::jsonb,
  theme text DEFAULT 'light',
  last_active_at timestamptz DEFAULT now(),
  login_count integer DEFAULT 0,
  total_chat_messages integer DEFAULT 0,
  total_courses_completed integer DEFAULT 0,
  total_campaigns_created integer DEFAULT 0,
  courses_created integer DEFAULT 0,
  books_published integer DEFAULT 0,
  campaigns_created integer DEFAULT 0,
  people_helped integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- CREATE TRIGGER FUNCTION
-- ========================================
-- This automatically creates a profile when someone signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- ========================================
-- CREATE TRIGGER
-- ========================================
-- Remove old trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- GRANT PERMISSIONS
-- ========================================
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;

-- ========================================
-- VERIFY SETUP
-- ========================================
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'user_profiles'
) as table_exists;

-- Check if trigger exists
SELECT EXISTS (
  SELECT FROM pg_trigger 
  WHERE tgname = 'on_auth_user_created'
) as trigger_exists;
```

---

## ✅ **VERIFICATION**

After running the SQL, you should see:

```
Success. No rows returned
```

Then scroll down and you'll see:
```
table_exists | trigger_exists
-------------+----------------
true         | true
```

---

## 🧪 **TEST IT**

After creating the table:

1. Go to: `http://localhost:5173/test-everything.html`
2. Look at **Test 3: Database Tables**
3. It should show: ✅ **"Database tables are accessible!"**

---

## 🚨 **TROUBLESHOOTING**

### ❌ Error: "permission denied for schema public"
**Solution:** Your Supabase project doesn't have permissions. Try:
```sql
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
```

### ❌ Error: "relation already exists"
**Solution:** Table already exists! That's good! Just run the trigger part:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;
```

### ❌ Error: "function does not exist"
**Solution:** Run the full SQL again from the top.

---

## 📊 **CHECK YOUR TABLE**

After setup, go to:
```
https://supabase.com/dashboard/project/pakkuvcnhleqpcaxtruw/editor
```

Click **"Table Editor"** → Select **"user_profiles"**

You should see the table structure with all columns.

---

## 🎯 **WHY THIS IS NEEDED**

Without this table:
- ❌ Login will fail
- ❌ Your name won't show
- ❌ Points won't be saved
- ❌ Profile page won't work

With this table:
- ✅ Login works perfectly
- ✅ Your full name appears
- ✅ Points are saved
- ✅ Profile shows all your data

---

## 📞 **STILL HAVING ISSUES?**

1. Make sure you're logged into Supabase
2. Make sure you're on the correct project (pakkuvcnhleqpcaxtruw)
3. Try copying the SQL in smaller chunks
4. Check the browser console (F12) for errors
5. Run the diagnostic tool: `http://localhost:5173/test-everything.html`

---

**Created:** November 7, 2025
**Project:** ShikkhaBondhu AI
