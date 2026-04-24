# Course Management Platform

A modern course management platform built with Next.js, Firebase Authentication, and MongoDB.

## Features

- 🔐 Firebase Authentication (Email/Password & Google)
- 📚 Course browsing with search and filtering
- 🎨 Polished, responsive UI with Tailwind CSS
- 🔒 Protected routes for course management
- 🌐 MongoDB backend integration
- 🎯 Toast notifications

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Firebase configuration
   - Add your MongoDB connection string

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Pages

- `/` - Landing page with hero, features, courses, and more
- `/items` - Browse all courses with search and filters
- `/items/[id]` - Detailed course information
- `/about` - About the platform
- `/items/add` - Add new courses (protected)
- `/items/manage` - Manage your courses (protected)
- `/login` - User authentication
- `/register` - New user registration

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Firebase
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React Icons
- **Notifications**: React Hot Toast

## Seeding the Database

After starting the development server, visit:

- `http://localhost:3000/api/seed` to seed 12 initial courses

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Add Environment Variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `MONGODB_URI`
   - `MONGODB_DB`
5. Click "Deploy"

### Step 3: Seed Production Database

After deployment, visit `https://your-app.vercel.app/api/seed` to seed courses in production.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

- **Firebase**: Get from Firebase Console → Project Settings → General
- **MongoDB**: Get from MongoDB Atlas → Database → Connect → Connect your application

## License

ISC
