# Vercel Deployment Checklist

## Pre-Deployment

- [ ] All environment variables defined in `.env.local`
- [ ] `.env.local` is in `.gitignore` (should already be there)
- [ ] Code pushed to GitHub repository
- [ ] MongoDB Atlas database is accessible from any IP (or Vercel IPs whitelisted)
- [ ] Firebase project is set up and configured

## Vercel Setup

1. **Import Project**
   - Go to https://vercel.com
   - Click "New Project"
   - Import from GitHub

2. **Configure Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   MONGODB_URI
   MONGODB_DB
   ```

3. **Build Settings** (Auto-detected by Vercel)
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

## Post-Deployment

- [ ] Visit your deployed site
- [ ] Test login/register functionality
- [ ] Visit `/api/seed` to seed production database
- [ ] Test course browsing and filtering
- [ ] Test adding a new course (requires login)
- [ ] Test managing courses (requires login)
- [ ] Verify images load correctly
- [ ] Test on mobile devices

## Troubleshooting

### MongoDB Connection Issues

- Ensure IP whitelist includes `0.0.0.0/0` in MongoDB Atlas
- Verify `MONGODB_URI` is correct (includes username, password, cluster URL)

### Firebase Authentication Issues

- Check all Firebase env vars are set
- Verify Firebase domains include your Vercel domain in Firebase Console

### Build Failures

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first

### Image Loading Issues

- Verify image URLs are accessible
- Check `next.config.js` has proper image configuration

## Continuous Deployment

Every push to your `main` branch will automatically trigger a new deployment on Vercel.

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Add custom domain to Firebase authorized domains
