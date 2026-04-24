# CourseHub - Course Management Platform

A modern, full-stack course management platform built with Next.js 15, Firebase Authentication, and MongoDB.

## 🎯 Features

### Authentication

- ✅ Firebase Authentication (Email/Password & Google OAuth)
- ✅ Protected routes for authenticated users
- ✅ User session management with Context API
- ✅ Persistent authentication state

### Pages & Functionality

#### Landing Page (/)

- ✅ Hero section with CTA buttons
- ✅ Statistics section (Active Students, Instructors, etc.)
- ✅ Features showcase
- ✅ Featured courses grid
- ✅ Testimonials section
- ✅ Benefits/CTA banner with image
- ✅ Newsletter subscription section
- ✅ Sticky responsive navbar with dropdown menu (when logged in)
- ✅ Comprehensive footer with links and social icons

#### Items Page (/items)

- ✅ Search functionality across title, description, and instructor
- ✅ Dual filtering (Category & Level)
- ✅ Responsive grid layout (3 columns on desktop)
- ✅ 8 pre-populated courses with complete data
- ✅ Uniform course cards with hover effects
- ✅ "View Details" button on each card

#### Item Details Page (/items/[id])

- ✅ Dynamic routing with App Router
- ✅ Full course information display
- ✅ Image, title, description, and specifications
- ✅ Related courses section
- ✅ Instructor information
- ✅ Course features list
- ✅ Enrollment CTA
- ✅ Back button to items page

#### About Page (/about)

- ✅ Company story and mission
- ✅ Vision and values sections
- ✅ Team members showcase
- ✅ Statistics section
- ✅ Call-to-action section

#### Authentication Pages

- ✅ Login page (/login) with email/password and Google sign-in
- ✅ Register page (/register) with form validation
- ✅ Password confirmation
- ✅ Terms acceptance checkbox

#### Protected Pages

- ✅ Add Course (/items/add) - Only accessible when logged in
  - Complete form with all required fields
  - Dynamic features list
  - Image URL upload option
  - Form validation
  - Success toast notifications
- ✅ Manage Courses (/items/manage) - Only accessible when logged in
  - Course listing in table (desktop) and cards (mobile)
  - View and Delete actions
  - Search functionality
  - Statistics dashboard
  - Responsive layout

### Technical Implementation

#### Frontend

- ✅ Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Lucide React icons
- ✅ React Hot Toast for notifications
- ✅ Custom CSS utilities and components

#### Backend & Database

- ✅ MongoDB integration
- ✅ API routes for CRUD operations
  - GET /api/courses - Fetch all courses
  - POST /api/courses - Create new course
  - GET /api/courses/[id] - Fetch single course
  - PUT /api/courses/[id] - Update course
  - DELETE /api/courses/[id] - Delete course
- ✅ Fallback to static data when MongoDB is unavailable

#### UI/UX

- ✅ Consistent color palette (Primary blue theme)
- ✅ Smooth transitions and hover effects
- ✅ Loading states
- ✅ Error handling with custom error page
- ✅ 404 page
- ✅ Sticky navbar
- ✅ User dropdown menu with avatar
- ✅ Toast notifications for user feedback
- ✅ Form validation with inline feedback

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account and project
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.local` file and update with your credentials:

   **Firebase Setup:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Authentication > Email/Password and Google providers
   - Copy your Firebase config from Project Settings > General
   - Update `.env.local` with your Firebase credentials

   **MongoDB Setup:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster (free tier available)
   - Create a database user
   - Whitelist your IP address (or allow from anywhere for development)
   - Get your connection string from Connect > Connect your application
   - Update `.env.local` with your MongoDB URI

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
task-1/
├── app/
│   ├── api/
│   │   └── courses/
│   │       ├── route.ts          # GET all, POST new course
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE single course
│   ├── items/
│   │   ├── page.tsx              # Items listing with search/filter
│   │   ├── [id]/
│   │   │   └── page.tsx          # Item details (dynamic route)
│   │   ├── add/
│   │   │   └── page.tsx          # Add item (protected)
│   │   └── manage/
│   │       └── page.tsx          # Manage items (protected)
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── register/
│   │   └── page.tsx              # Register page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles
│   ├── loading.tsx               # Loading component
│   ├── error.tsx                 # Error component
│   └── not-found.tsx             # 404 page
├── components/
│   ├── Navbar.tsx                # Navigation component
│   └── Footer.tsx                # Footer component
├── contexts/
│   └── AuthContext.tsx           # Authentication context
├── lib/
│   ├── firebase.ts               # Firebase configuration
│   ├── mongodb.ts                # MongoDB client
│   └── data.ts                   # Static course data
├── .env.local                    # Environment variables
├── .env.example                  # Environment template
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.js                # Next.js configuration
```

## 🎨 Design & UI

- **Color Scheme:** Primary blue (#0284c7) with gradient variations
- **Typography:** Inter font family (Google Fonts)
- **Layout:** Responsive grid system (mobile-first approach)
- **Components:** Reusable card, button, and form components
- **Icons:** Lucide React icon library
- **Animations:** Smooth transitions and hover effects

## 🔒 Protected Routes

The following routes are protected and require authentication:

- `/items/add` - Add new courses
- `/items/manage` - Manage existing courses

When not logged in, users are automatically redirected to `/login`.

## 📱 Responsive Design

- **Mobile:** Single column layout, hamburger menu
- **Tablet:** 2-column grids, expanded navigation
- **Desktop:** 3-column grids, full navigation bar

## 🛠️ Technologies Used

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Auth
- **Database:** MongoDB
- **State Management:** React Context API
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Image Optimization:** Next.js Image component

## 📝 API Endpoints

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/courses`      | Get all courses   |
| POST   | `/api/courses`      | Create new course |
| GET    | `/api/courses/[id]` | Get single course |
| PUT    | `/api/courses/[id]` | Update course     |
| DELETE | `/api/courses/[id]` | Delete course     |

## 🌟 Features Checklist

- ✅ Next.js App Router
- ✅ Firebase Authentication (Email + Google)
- ✅ MongoDB backend integration
- ✅ Protected routes with authentication
- ✅ Responsive design
- ✅ Search and filtering (2+ fields)
- ✅ CRUD operations
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ 6+ items with complete data
- ✅ Uniform card layouts
- ✅ Hover/focus states
- ✅ Dynamic routing
- ✅ Sticky navbar
- ✅ User dropdown menu
- ✅ 7 sections on landing page

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to use it as a template for your own projects!

---

**Built with ❤️ using Next.js, Firebase, and MongoDB**
