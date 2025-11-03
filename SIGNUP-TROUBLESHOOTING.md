# 🐛 Signup Troubleshooting Guide

## Common Signup Issues & Solutions

### ✅ Quick Diagnosis

**Run the app and try to sign up. Check the browser console for errors.**

```bash
npm run dev
# Open browser → http://localhost:5173/
# Open DevTools → Console (F12)
# Try to sign up
# Look for red error messages
```

---

## 🔍 Common Errors & Fixes

### 1. **"relation 'user_profiles' does not exist"**

**Cause:** Database tables haven't been created yet.

**Solution:** Run the SQL migration

```sql
-- Go to: https://supabase.com/dashboard
-- Navigate to: Your Project → SQL Editor
-- Copy entire contents from: supabase/migrations/20251103000000_create_complete_backend_system.sql
-- Paste in SQL Editor
-- Click "Run"
-- Wait for success message
```

**After migration, verify tables exist:**
```sql
-- Run this in Supabase SQL Editor:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should see:
-- - user_profiles
-- - user_activity_log
-- - campaigns
-- - chat_sessions
-- - etc.
```

---

### 2. **"Invalid API key" or "Failed to fetch"**

**Cause:** Supabase credentials not configured or incorrect.

**Solution:** Check .env file

```bash
# Check if .env exists:
Get-Content .env

# Should contain:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Get correct credentials:**
```
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: Settings → API
4. Copy:
   - Project URL → VITE_SUPABASE_URL
   - anon public key → VITE_SUPABASE_ANON_KEY (NOT service_role!)
5. Update .env
6. Restart dev server: npm run dev
```

---

### 3. **"User already registered"**

**Cause:** Email already exists in database.

**Solutions:**

**Option A: Use different email**
```
Try signing up with a different email address
```

**Option B: Delete existing user**
```sql
-- In Supabase SQL Editor:
DELETE FROM auth.users WHERE email = 'test@example.com';
DELETE FROM user_profiles WHERE email = 'test@example.com';
```

**Option C: Login instead**
```
If you already have an account, click "লগইন করুন (Login)" instead
```

---

### 4. **"Email rate limit exceeded"**

**Cause:** Too many signup attempts in short time.

**Solution:** Wait 10-15 minutes

```
Supabase limits signup attempts to prevent spam.
Wait 10-15 minutes, then try again.

Or use a different email address.
```

---

### 5. **Signup succeeds but can't login**

**Cause:** Email verification required.

**Check Supabase settings:**
```
1. Go to: Supabase Dashboard → Authentication → Providers
2. Check "Email" provider settings
3. Look for "Enable email confirmations"

Option A: Disable email confirmation (for testing)
- Uncheck "Enable email confirmations"
- Save
- Try signup again

Option B: Verify email
- Check your email inbox
- Click verification link
- Then try to login
```

---

### 6. **"Failed to sign up" with no details**

**Cause:** JavaScript error or network issue.

**Solution:** Check browser console

```javascript
// Open DevTools → Console
// Look for errors like:

// Network errors:
Failed to fetch
net::ERR_CONNECTION_REFUSED
CORS error

// JavaScript errors:
TypeError: Cannot read property...
ReferenceError: ... is not defined

// Supabase errors:
AuthApiError: ...
```

**Common fixes:**
- Check internet connection
- Restart dev server
- Clear browser cache
- Try different browser
- Check firewall/antivirus

---

## 🧪 Manual Testing

### Test 1: Check Supabase Connection

```typescript
// Add this to src/App.tsx temporarily:
useEffect(() => {
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  
  // Test connection
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('❌ Supabase connection failed:', error);
    } else {
      console.log('✅ Supabase connected successfully');
    }
  });
}, []);
```

**Expected output:**
```
Supabase URL: https://your-project.supabase.co
Supabase Key exists: true
✅ Supabase connected successfully
```

---

### Test 2: Test Auth Directly

```typescript
// In browser console:
const { data, error } = await window.supabase.auth.signUp({
  email: 'test@example.com',
  password: 'testpass123'
});

console.log('Data:', data);
console.log('Error:', error);
```

**If successful:**
```javascript
Data: { user: {...}, session: {...} }
Error: null
```

**If failed:**
```javascript
Data: { user: null, session: null }
Error: { message: "...", status: 400 }
```

---

### Test 3: Check if Tables Exist

```sql
-- In Supabase SQL Editor:
SELECT COUNT(*) FROM user_profiles;
```

**If error: "relation does not exist"**
→ Run the migration!

**If returns a number (even 0):**
→ Tables exist, signup should work

---

## 🔧 Improved Signup (Already Implemented)

The code now handles these scenarios gracefully:

### ✅ Graceful Degradation
```typescript
// Even if user_profiles table doesn't exist:
// - User is still created in auth.users
// - You can still login
// - Profile will be created later when table exists
```

### ✅ Better Error Messages
```typescript
// Instead of generic "Sign up failed"
// Now shows:
"⚠️ Database not setup. Please run the SQL migration first."
"⚠️ Invalid Supabase credentials. Please check your .env file."
"This email is already registered. Please login instead."
"Too many attempts. Please try again in a few minutes."
```

### ✅ Console Warnings
```typescript
// Check console for helpful hints:
console.warn('⚠️ user_profiles table does not exist.');
console.warn('📝 Please run the SQL migration from SETUP-BACKEND-NOW.md');
console.warn('Profile creation skipped:', error.message);
```

---

## 🚀 Quick Fix Script

### Option 1: Frontend-Only Mode (No Database)

If you just want to test the UI without backend:

```typescript
// In src/lib/auth.ts, replace signUp function with:
export async function signUp(data: SignUpData) {
  // Mock signup for testing
  console.log('Mock signup:', data);
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return fake user
  return {
    user: { id: 'mock-id', email: data.email },
    session: null
  };
}
```

Then in AuthModal, after successful signup:
```typescript
setSuccess('✅ Mock signup successful (frontend only mode)');
setTimeout(() => {
  onSuccess(); // This will trigger the auth callback
  onClose();
}, 2000);
```

---

### Option 2: Use Supabase Auth Only (No Profile Table)

The current code already does this! It will:
1. Create user in `auth.users` (always works)
2. Try to create profile in `user_profiles` (may fail)
3. Skip profile creation if table doesn't exist
4. Still return success ✅

**You can sign up now even without running migration!**
- User created in Supabase Auth
- Can login immediately
- Profile features won't work until migration runs

---

## 📊 Verification Checklist

After signup, verify:

### In Browser:
- [ ] No red errors in console
- [ ] Success message shown: "সফলভাবে নিবন্ধিত হয়েছে!"
- [ ] Modal switches to login tab after 3 seconds

### In Supabase Dashboard:
```
Authentication → Users
- [ ] User appears in list
- [ ] Email shows correctly
- [ ] Status: "Confirmed" or "Waiting for verification"
```

### If Migration Run:
```
Table Editor → user_profiles
- [ ] New row created
- [ ] full_name populated
- [ ] email populated
- [ ] points = 0
- [ ] level = 1
```

---

## 🎯 Next Steps

### If Signup Works:
1. ✅ Try to login with same credentials
2. ✅ Check if you can access protected sections
3. ✅ Test logout
4. ✅ Test session persistence (refresh page)

### If Signup Still Fails:
1. Copy error message from browser console
2. Check which scenario above matches
3. Follow the specific solution
4. If still stuck, check:
   - Network tab in DevTools
   - Supabase Dashboard → Logs
   - Response payload in network request

---

## 📞 Support

### Useful Commands:

```powershell
# Restart dev server
npm run dev

# Clear npm cache
npm cache clean --force
rm -rf node_modules
npm install

# Check environment variables
Get-Content .env
```

### Useful Links:

- Supabase Dashboard: https://supabase.com/dashboard
- Supabase Docs: https://supabase.com/docs
- Project Setup: SETUP-BACKEND-NOW.md
- API Reference: BACKEND-GUIDE.md

---

## 🎉 Success Criteria

**Signup is working when:**
- ✅ Form submits without errors
- ✅ Success message appears
- ✅ User created in Supabase
- ✅ Can login immediately after
- ✅ Can access protected sections after login

---

**Most Common Fix:** Run the SQL migration! 90% of signup issues are because the database tables don't exist yet.

**Quick Test:** Open browser console, try signup, and look at the error message. It will tell you exactly what's wrong!
