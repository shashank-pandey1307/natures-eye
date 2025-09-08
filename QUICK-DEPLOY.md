# ⚡ Quick Deploy Guide - Nature's Eye

## 🎯 Fastest Way to Deploy (5 minutes)

### Step 1: Get Your API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### Step 2: Update Environment
1. Open `.env.local` in your project
2. Replace `your_gemini_api_key_here` with your actual API key
3. Save the file

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 4: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" → "Continue with GitHub"
3. Click "New Project"
4. Find your `natures-eye` repository and click "Import"
5. Click "Deploy" (don't change any settings)

### Step 5: Add Database
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" → "New project"
3. Choose a name and password
4. Wait for database to be ready
5. Go to Settings → Database
6. Copy the "Connection string" (URI)

### Step 6: Configure Vercel
1. Go back to your Vercel project
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
DATABASE_URL = [paste your Supabase connection string]
GEMINI_API_KEY = [your API key from step 1]
NEXTAUTH_SECRET = [any random string, like: mysecretkey123]
NEXTAUTH_URL = https://your-app-name.vercel.app
MAX_FILE_SIZE = 10485760
UPLOAD_DIR = ./public/uploads
```

### Step 7: Deploy Database Schema
1. In Vercel, go to "Functions" tab
2. Click "Create Function"
3. Name it "setup-db"
4. Use this code:

```javascript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    await prisma.$connect()
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, username TEXT UNIQUE, password TEXT, createdAt TIMESTAMP DEFAULT NOW(), updatedAt TIMESTAMP DEFAULT NOW())`
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS animal_classifications (id TEXT PRIMARY KEY, animalType TEXT, imageUrl TEXT, imagePath TEXT, bodyLength FLOAT, heightAtWithers FLOAT, chestWidth FLOAT, rumpAngle FLOAT, bodyCondition FLOAT, overallScore FLOAT, breedScore FLOAT, conformationScore FLOAT, breed TEXT, age INT, weight FLOAT, gender TEXT, farmId TEXT, farmName TEXT, location TEXT, createdAt TIMESTAMP DEFAULT NOW(), updatedAt TIMESTAMP DEFAULT NOW(), analysisNotes TEXT, confidence FLOAT, userId TEXT)`
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS farms (id TEXT PRIMARY KEY, name TEXT, location TEXT, contactInfo TEXT, createdAt TIMESTAMP DEFAULT NOW(), updatedAt TIMESTAMP DEFAULT NOW())`
    res.status(200).json({ message: 'Database setup complete!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  } finally {
    await prisma.$disconnect()
  }
}
```

5. Click "Deploy"
6. Visit the function URL to run it

### Step 8: Redeploy Your App
1. Go back to your Vercel project
2. Click "Deployments"
3. Click the three dots on the latest deployment
4. Click "Redeploy"

## 🎉 Done!

Your app is now live! Visit your Vercel URL to see it in action.

## 🔧 Alternative: Railway (Even Easier)

If you want an even simpler option:

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add a PostgreSQL database (Railway will auto-configure)
6. Add environment variables (same as above)
7. Deploy!

Railway automatically handles the database setup for you.

## 📱 Share Your App

Once deployed, share your app URL with others. They can:
- Sign up and create accounts
- Upload images for livestock classification
- Use the live camera feature
- View their classification history

## 🆘 Need Help?

- Check the full guide: `DEPLOYMENT.md`
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Railway docs: [docs.railway.app](https://docs.railway.app)

---

**Your Nature's Eye app is ready to help farmers worldwide! 🌾🐄**

