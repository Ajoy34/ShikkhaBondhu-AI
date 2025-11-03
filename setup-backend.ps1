# ShikkhaBondhu AI - Backend Setup Script
# Run this after setting up your Supabase project

Write-Host "🚀 ShikkhaBondhu AI - Backend Setup" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ Error: .env file not found!" -ForegroundColor Red
    Write-Host "Please create .env file with:" -ForegroundColor Yellow
    Write-Host "VITE_SUPABASE_URL=your_supabase_url" -ForegroundColor Gray
    Write-Host "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key" -ForegroundColor Gray
    Write-Host "VITE_GOOGLE_API_KEY=your_google_api_key`n" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Found .env file" -ForegroundColor Green

# Read Supabase URL from .env
$envContent = Get-Content .env
$supabaseUrl = $envContent | Where-Object { $_ -match "VITE_SUPABASE_URL" } | ForEach-Object { ($_ -split "=")[1] }
$supabaseKey = $envContent | Where-Object { $_ -match "VITE_SUPABASE_ANON_KEY" } | ForEach-Object { ($_ -split "=")[1] }

if (-not $supabaseUrl -or -not $supabaseKey) {
    Write-Host "❌ Error: Supabase credentials not found in .env!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Supabase URL: $supabaseUrl" -ForegroundColor Green
Write-Host ""

# Instructions
Write-Host "📝 To complete backend setup, follow these steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Open Supabase Dashboard: $supabaseUrl" -ForegroundColor White
Write-Host ""
Write-Host "2️⃣  Go to SQL Editor (left sidebar)" -ForegroundColor White
Write-Host ""
Write-Host "3️⃣  Click 'New Query'" -ForegroundColor White
Write-Host ""
Write-Host "4️⃣  Copy the migration file:" -ForegroundColor White
Write-Host "    📁 supabase/migrations/20251103000000_create_complete_backend_system.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "5️⃣  Paste into SQL Editor and click 'Run'" -ForegroundColor White
Write-Host ""
Write-Host "6️⃣  Wait for completion (should take ~10 seconds)" -ForegroundColor White
Write-Host ""
Write-Host "7️⃣  Go to Authentication > Email Templates" -ForegroundColor White
Write-Host "    - Customize welcome email" -ForegroundColor Gray
Write-Host "    - Customize verification email" -ForegroundColor Gray
Write-Host ""
Write-Host "8️⃣  Go to Storage > Create new bucket:" -ForegroundColor White
Write-Host "    - Name: 'campaigns'" -ForegroundColor Gray
Write-Host "    - Public: Yes" -ForegroundColor Gray
Write-Host "    - File size limit: 50MB" -ForegroundColor Gray
Write-Host ""
Write-Host "9️⃣  Go to Database > Replication" -ForegroundColor White
Write-Host "    - Enable realtime for these tables:" -ForegroundColor Gray
Write-Host "      • campaigns" -ForegroundColor DarkGray
Write-Host "      • campaign_updates" -ForegroundColor DarkGray
Write-Host "      • campaign_supporters" -ForegroundColor DarkGray
Write-Host "      • notifications" -ForegroundColor DarkGray
Write-Host "      • chat_messages" -ForegroundColor DarkGray
Write-Host ""

Write-Host "🎉 That's it! Your backend will be ready." -ForegroundColor Green
Write-Host ""
Write-Host "📚 Read BACKEND-GUIDE.md for complete documentation" -ForegroundColor Cyan
Write-Host ""

# Prompt to open Supabase
$response = Read-Host "Do you want to open Supabase Dashboard now? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    Start-Process $supabaseUrl
    Write-Host "✅ Opening Supabase Dashboard..." -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Quick Test Commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "# Test authentication" -ForegroundColor Gray
Write-Host "npm run dev" -ForegroundColor White
Write-Host "# Then try signing up on the website" -ForegroundColor Gray
Write-Host ""

Write-Host "🚀 Setup script completed!" -ForegroundColor Green
Write-Host ""
