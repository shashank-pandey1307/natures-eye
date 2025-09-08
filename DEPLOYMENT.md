# 🚀 Nature's Eye Deployment Guide

This guide will help you deploy your Nature's Eye application to make it accessible to everyone.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be pushed to GitHub
2. **Google Gemini API Key** - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Database** - PostgreSQL database (provided by hosting platform)

## 🎯 Quick Start - Vercel (Recommended)

### Step 1: Prepare Your Repository
```bash
# Make sure your code is pushed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your `natures-eye` repository
5. Configure environment variables (see below)
6. Click "Deploy"

### Step 3: Set Up Database
1. Go to [supabase.com](https://supabase.com) or [neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string
4. Add it to Vercel environment variables

### Step 4: Environment Variables in Vercel
Go to your project settings → Environment Variables and add:

```
DATABASE_URL=postgresql://username:password@host:port/database
GEMINI_API_KEY=your_gemini_api_key_here
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=https://your-app.vercel.app
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./public/uploads
```

### Step 5: Database Setup
After deployment, run these commands in Vercel's terminal or locally:
```bash
npx prisma db push
npx prisma generate
```

## 🚂 Alternative: Railway Deployment

### Step 1: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect it's a Next.js app

### Step 2: Add Database
1. In your Railway project, click "New" → "Database" → "PostgreSQL"
2. Railway will automatically set the `DATABASE_URL` environment variable

### Step 3: Environment Variables
Add these in Railway dashboard:
```
GEMINI_API_KEY=your_gemini_api_key_here
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=https://your-app.railway.app
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./public/uploads
```

## 🎨 Alternative: Render Deployment

### Step 1: Deploy to Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Use the `render.yaml` configuration file

### Step 2: Database Setup
1. In Render dashboard, click "New" → "PostgreSQL"
2. Render will automatically configure the connection

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `GEMINI_API_KEY` | Google Gemini AI API key | `AIzaSy...` |
| `NEXTAUTH_SECRET` | Random secret for authentication | `your-secret-key` |
| `NEXTAUTH_URL` | Your app's URL | `https://your-app.vercel.app` |
| `MAX_FILE_SIZE` | Max upload size in bytes | `10485760` (10MB) |
| `UPLOAD_DIR` | Upload directory path | `./public/uploads` |

## 🗄️ Database Setup Commands

After deployment, run these commands to set up your database:

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Seed database with initial data
npx prisma db seed
```

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript errors are fixed
   - Verify environment variables are set

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correct
   - Check if database is accessible from hosting platform
   - Run `npx prisma db push` to create tables

3. **API Errors**
   - Verify `GEMINI_API_KEY` is valid
   - Check API quotas and limits
   - Ensure all environment variables are set

4. **File Upload Issues**
   - Check `UPLOAD_DIR` path
   - Verify file size limits
   - Ensure directory permissions

## 📱 Mobile App Deployment (Optional)

Your app includes Capacitor for mobile deployment:

```bash
# Build for Android
npm run build
npx cap add android
npx cap build android
npx cap open android

# Build for iOS (Mac only)
npx cap add ios
npx cap build ios
npx cap open ios
```

## 🌐 Custom Domain (Optional)

1. **Vercel**: Go to project settings → Domains
2. **Railway**: Go to project settings → Domains
3. **Render**: Go to project settings → Custom Domains

Add your domain and configure DNS records as instructed.

## 📊 Monitoring & Analytics

Consider adding:
- **Vercel Analytics** (built-in)
- **Google Analytics**
- **Sentry** for error tracking
- **Uptime monitoring**

## 🔒 Security Checklist

- [ ] Environment variables are secure
- [ ] Database is not publicly accessible
- [ ] API keys are not exposed in code
- [ ] HTTPS is enabled
- [ ] File uploads are validated
- [ ] User authentication is working

## 🎉 Success!

Once deployed, your Nature's Eye application will be accessible to everyone at your provided URL. Users can:

- Sign up and log in
- Upload images for classification
- Use live camera feed
- View classification history
- Access the app on mobile devices

## 📞 Support

If you encounter issues:
1. Check the hosting platform's documentation
2. Review error logs in the platform dashboard
3. Test locally with production environment variables
4. Contact platform support if needed

---

**Happy Deploying! 🚀**

