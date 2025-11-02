# Quick script to add your Google API key to .env file

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Google API Key Setup for ShikkhaBondhu" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Make sure you're in the project directory." -ForegroundColor Yellow
    exit
}

Write-Host "📋 Current .env file:" -ForegroundColor Yellow
Get-Content .env | Select-String "VITE_GOOGLE_API_KEY"
Write-Host ""

Write-Host "🔑 Get your API key from: https://aistudio.google.com/app/apikey" -ForegroundColor Green
Write-Host ""

# Ask for API key
$apiKey = Read-Host "Paste your Google API key here (starts with AIza)"

if ($apiKey -eq "" -or $apiKey -eq "your-api-key-here") {
    Write-Host "❌ No key provided! Please get your key first." -ForegroundColor Red
    exit
}

# Validate format
if (-not $apiKey.StartsWith("AIza")) {
    Write-Host "⚠️  Warning: Key doesn't start with 'AIza'. Are you sure it's correct?" -ForegroundColor Yellow
    $confirm = Read-Host "Continue anyway? (y/n)"
    if ($confirm -ne "y") {
        Write-Host "Cancelled." -ForegroundColor Red
        exit
    }
}

# Read current .env
$envContent = Get-Content .env

# Replace the API key line
$newContent = $envContent | ForEach-Object {
    if ($_ -match "^VITE_GOOGLE_API_KEY=") {
        "VITE_GOOGLE_API_KEY=$apiKey"
    } else {
        $_
    }
}

# Write back
$newContent | Set-Content .env

Write-Host ""
Write-Host "✅ API key added successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Updated .env:" -ForegroundColor Yellow
Get-Content .env | Select-String "VITE_GOOGLE_API_KEY"
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Restart your dev server: npm run dev" -ForegroundColor White
Write-Host "   2. Test the chat in your browser" -ForegroundColor White
Write-Host "   3. Try: 'হ্যালো' or 'Hello'" -ForegroundColor White
Write-Host ""
Write-Host "🔒 Security tip: Restrict your key at:" -ForegroundColor Yellow
Write-Host "   https://console.cloud.google.com/apis/credentials" -ForegroundColor White
Write-Host ""
