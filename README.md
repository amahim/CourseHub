# CourseHub - Online Learning Platform

A modern, full-stack course management platform built with Next.js 15, Firebase Authentication, and MongoDB. Features role-based dashboards, course enrollment system, wishlist functionality, and comprehensive admin controls.

## 🔑 Demo Credentials

**User Account:**

- **Email:** user@user.com
- **Password:** User1234

**Admin Account:**

- **Email:** admin@admin.com
- **Password:** Admin123

## ✨ Features

### For Students (Users)

- 🔐 Secure authentication (Email/Password + Google OAuth)
- 📚 Browse and search courses with filters
- 📝 Course enrollment with progress tracking
- ❤️ Wishlist functionality
- 📊 Personal dashboard with learning analytics
- 📈 Interactive charts for progress visualization
- ⭐ Course reviews and ratings
- 🌓 Dark mode support
- 📱 Fully responsive design

### For Admins

- 👥 User management dashboard
- ➕ Add, edit, and delete courses
- 📊 Platform analytics and statistics
- 📈 Revenue tracking
- 📋 Manage enrollments
- 🔧 System settings

### General Features

- 🎨 Modern UI with Tailwind CSS
- 🔔 Toast notifications
- ⚡ Optimized performance
- 🔄 Real-time data updates
- 🎭 Smooth animations with Framer Motion
- 📊 Data visualization with Recharts

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Authentication:** Firebase Auth
- **Database:** MongoDB Atlas
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Theme:** next-themes

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (free tier works)
- **Firebase** project with Auth enabled

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd task-1
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=coursehub

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Sign-in methods:
   - Email/Password
   - Google (optional)
4. Get your config from Project Settings → General → Your apps
5. Add the values to `.env.local`

### 5. MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use `0.0.0.0/0` for testing)
5. Get your connection string
6. Add it to `.env.local`

### 6. Seed the Database (Optional)

To populate with sample courses:

```bash
# Start the dev server first
npm run dev

# Then visit in browser:
http://localhost:3000/api/seed
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 👤 User Roles

### Creating an Admin User

By default, all new registrations get the **"user"** role. To create an admin:

1. Register a new account through the UI
2. Go to MongoDB Atlas → Browse Collections
3. Find the `users` collection
4. Locate your user document by email
5. Edit the document and change `role: "user"` to `role: "admin"`
6. Save and log out/in again

## 📁 Project Structure

```
task-1/
├── app/
│   ├── api/              # API routes
│   │   ├── courses/      # Course CRUD
│   │   ├── enrollments/  # Enrollment management
│   │   ├── wishlist/     # Wishlist operations
│   │   └── users/        # User management
│   ├── dashboard/        # Role-based dashboards
│   │   ├── user/         # Student dashboard
│   │   └── admin/        # Admin dashboard
│   ├── items/            # Course pages
│   ├── login/            # Authentication pages
│   └── register/
├── components/           # Reusable components
│   ├── ui/              # UI components
│   ├── Navbar.tsx
│   └── Footer.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state
├── lib/                 # Utilities
│   ├── firebase.ts      # Firebase config
│   └── mongodb.ts       # MongoDB connection
└── public/              # Static assets
```

## 🗄️ Database Collections

The application uses the following MongoDB collections:

- **users** - User accounts with roles
- **courses** - Course catalog
- **enrollments** - User course enrollments
- **wishlist** - User wishlists
- **reviews** - Course reviews
- **blog_posts** - Blog content
- **contacts** - Contact form submissions
- **newsletter** - Newsletter subscriptions

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy!

### Deploy to Netlify

1. Update `netlify.toml` if needed
2. Connect your GitHub repo
3. Add environment variables
4. Deploy

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Use strong MongoDB credentials
- Enable Firebase security rules
- Implement rate limiting for production
- Use HTTPS in production

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- None currently reported

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js, Firebase, and MongoDB**
