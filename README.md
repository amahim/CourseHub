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





Copy `.env.example` to `.env.local` and fill in your credentials:

- **Firebase**: Get from Firebase Console → Project Settings → General
- **MongoDB**: Get from MongoDB Atlas → Database → Connect → Connect your application

## License

ISC
