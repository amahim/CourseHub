# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Authentication:
   - Click "Authentication" in left menu
   - Click "Get Started"
   - Enable "Email/Password" provider
   - Enable "Google" provider (optional but recommended)
4. Get your configuration:
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps" section
   - Click web icon (</>)
   - Copy the firebaseConfig object

## Step 3: Configure MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or login
3. Create a new cluster (M0 free tier is fine)
4. Click "Connect" > "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `coursehub`

## Step 4: Set Environment Variables

Update `.env.local` with your credentials:

```env
# Firebase Configuration (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB Configuration (from MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=coursehub
```

## Step 5: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎉 You're Done!

### Test the Application:

1. **Browse Courses:** Visit the homepage and click "Explore Courses"
2. **Search & Filter:** Try searching and filtering courses by category and level
3. **View Details:** Click "View Details" on any course
4. **Create Account:** Click "Register" and create an account
5. **Login:** Login with your credentials
6. **Add Course:** Click on your profile dropdown > "Add Course"
7. **Manage Courses:** View and manage all courses

### Default Features:

- 8 pre-populated courses (works even without MongoDB)
- Full search and filtering
- Responsive design
- Toast notifications
- Protected routes

## 📝 Notes

- The app uses static data as fallback if MongoDB is not configured
- All features work with or without MongoDB
- Firebase is required for authentication features
- Google OAuth is optional but recommended

## ❓ Troubleshooting

**Issue:** Can't login

- **Solution:** Make sure Firebase Auth is enabled in Firebase Console

**Issue:** Courses not saving

- **Solution:** Check MongoDB connection string in `.env.local`

**Issue:** Build errors

- **Solution:** Run `npm install` again and ensure all dependencies are installed

## 🆘 Need Help?

Check the full `SETUP_GUIDE.md` for detailed instructions!
