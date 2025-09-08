#!/usr/bin/env node

/**
 * Nature's Eye Deployment Setup Script
 * This script helps you prepare your application for deployment
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Nature\'s Eye Deployment Setup\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  
  if (fs.existsSync(envExamplePath)) {
    const envExample = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envExample);
    console.log('✅ .env.local created from env.example');
  } else {
    // Create basic .env.local
    const basicEnv = `# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/natures_eye_db"

# Google Gemini AI API
GEMINI_API_KEY="your_gemini_api_key_here"

# Next.js Configuration
NEXTAUTH_SECRET="${crypto.randomBytes(32).toString('hex')}"
NEXTAUTH_URL="http://localhost:3000"

# File Upload Configuration
MAX_FILE_SIZE="10485760"
UPLOAD_DIR="./public/uploads"
`;
    fs.writeFileSync(envPath, basicEnv);
    console.log('✅ .env.local created with default values');
  }
} else {
  console.log('✅ .env.local already exists');
}

// Generate a secure NEXTAUTH_SECRET if not set
const envContent = fs.readFileSync(envPath, 'utf8');
if (envContent.includes('your_nextauth_secret_here') || envContent.includes('NEXTAUTH_SECRET=""')) {
  const newSecret = crypto.randomBytes(32).toString('hex');
  const updatedContent = envContent.replace(
    /NEXTAUTH_SECRET=".*"/,
    `NEXTAUTH_SECRET="${newSecret}"`
  );
  fs.writeFileSync(envPath, updatedContent);
  console.log('✅ Generated secure NEXTAUTH_SECRET');
}

console.log('\n📋 Next Steps:');
console.log('1. Get your Google Gemini API key from: https://makersuite.google.com/app/apikey');
console.log('2. Update GEMINI_API_KEY in .env.local');
console.log('3. Choose a hosting platform (Vercel recommended)');
console.log('4. Follow the deployment guide in DEPLOYMENT.md');
console.log('\n🎯 Quick Deploy Options:');
console.log('• Vercel: https://vercel.com (easiest for Next.js)');
console.log('• Railway: https://railway.app (includes database)');
console.log('• Render: https://render.com (good free tier)');
console.log('\n📖 Full guide: See DEPLOYMENT.md for detailed instructions');
console.log('\n✨ Happy deploying!');

