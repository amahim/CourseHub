# CourseHub — Full-Stack Online Learning Platform

A production-ready online education platform built with **Next.js 15**, **Firebase Auth**, **MongoDB Atlas**, and **Tailwind CSS**. Supports full dark mode, role-based access, interactive dashboards with charts, and a complete course marketplace.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Authentication | Firebase Auth (Email/Password + Google OAuth) |
| Database | MongoDB Atlas (native driver) |
| Styling | Tailwind CSS v3 + `next-themes` |
| Charts | Recharts (Line, Bar, Pie) |
| Animations | Framer Motion |
| Notifications | react-hot-toast |
| Icons | Lucide React |
| Deployment | Vercel / Netlify |

---

## Features

- **Dark mode** — System preference aware, toggle in navbar
- **Authentication** — Email/password + Google OAuth via Firebase
- **Role-based access** — `user` and `admin` roles stored in MongoDB
- **Course marketplace** — Filter by category, level, price, rating; sort; paginate
- **User dashboard** — Learning stats, progress charts, course history
- **Admin dashboard** — 6-tab panel with course/user management, revenue charts
- **Blog** — Posts from MongoDB with category filters and featured highlight
- **Reviews** — Star ratings per course with duplicate prevention
- **Contact form** — Submissions saved to MongoDB
- **Newsletter** — Email subscription with deduplication
- **SEO** — Dynamic metadata, sitemap, robots.txt, Open Graph tags
- **PWA-ready** — Web app manifest
- **Protected routes** — Middleware guards dashboard, profile, add/manage pages

---

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-org/coursehub.git
cd coursehub
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/
MONGODB_DB=coursehub
```

### 3. Seed Database

```bash
npm run dev
# Then visit:
curl http://localhost:3000/api/seed
```

This seeds: courses (12), blog posts (6), sample reviews (8), and creates the admin user record.

### 4. Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| User | `demo@coursehub.com` | `Demo@123456` |
| Admin | `admin@coursehub.com` | `Admin@123456` |

> **Note:** Firebase accounts must be created manually in the Firebase Console. The seed API only creates the MongoDB user record with `role: "admin"`.

---

## Routes

### Public

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, features, categories, courses, testimonials |
| `/items` | Course catalog with sidebar filters |
| `/items/[id]` | Course detail with reviews |
| `/blog` | Blog listing with category filter |
| `/blog/[id]` | Blog post detail |
| `/about` | About page — story, team, stats |
| `/contact` | Contact form |
| `/login` | Sign in |
| `/register` | Sign up |

### Protected (requires auth)

| Route | Description |
|-------|-------------|
| `/dashboard/user` | User learning dashboard |
| `/dashboard/admin` | Admin management panel |
| `/profile` | Edit profile and change password |
| `/items/add` | Create a new course |
| `/items/manage` | Manage your courses |

### API Routes

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/courses` | GET, POST | List / create courses |
| `/api/courses/[id]` | GET, PUT, DELETE | Single course CRUD |
| `/api/users` | GET | Get user by uid query param |
| `/api/reviews` | GET, POST | Reviews by courseId |
| `/api/contact` | POST | Save contact form submission |
| `/api/newsletter` | POST | Subscribe email |
| `/api/admin/stats` | GET | Admin dashboard metrics |
| `/api/seed` | GET (safe), POST (force) | Seed database |

---

## Project Structure

```
app/
  page.tsx              # Home page
  layout.tsx            # Root layout with ThemeProvider
  globals.css           # Tailwind + custom utility classes
  about/                # About page
  blog/                 # Blog list + [id] detail
  contact/              # Contact form
  dashboard/
    user/               # User dashboard
    admin/              # Admin dashboard
  items/                # Course catalog
    [id]/               # Course detail + ReviewSection
    add/                # Add course form
    manage/             # Manage courses table
  login/
  register/
  profile/
  api/                  # All API routes

components/
  Navbar.tsx            # Top navigation (dark mode, auth state)
  Footer.tsx            # Footer with links
  ui/
    ThemeToggle.tsx     # Dark/light mode toggle
    SkeletonCard.tsx    # Loading skeleton
    Modal.tsx           # Reusable modal

contexts/
  AuthContext.tsx       # Firebase auth + role state

lib/
  firebase.ts           # Firebase app init
  mongodb.ts            # MongoDB client singleton
  data.ts               # Static fallback data

middleware.ts           # Route protection
```

---

## Build & Deploy

```bash
# Type check
npx tsc --noEmit

# Build
npm run build

# Start production
npm start
```

### Deploy to Vercel

```bash
npx vercel --prod
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Deploy to Netlify

The included `netlify.toml` configures automatic Next.js builds:

```bash
netlify deploy --prod
```

---

## Admin Setup

1. Create a Firebase user for `admin@coursehub.com` in the Firebase Console
2. Run `GET /api/seed` to create the MongoDB user record with `role: "admin"`
3. Log in with admin credentials — the Admin Panel link appears in the navbar

---

## Dark Mode

Dark mode is enabled via the `dark` class on `<html>` using `next-themes`. All components support dark mode with `dark:` Tailwind variants. The theme toggle is in the navbar.

---

## License

MIT
