import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const seedCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    shortDescription:
      "Master web development with HTML, CSS, JavaScript, React, and Node.js",
    fullDescription:
      "This comprehensive bootcamp covers everything you need to become a full-stack web developer. From the basics of HTML and CSS to advanced React patterns and Node.js backend development, you'll build real-world projects and gain practical skills that employers are looking for.",
    price: 99.99,
    category: "Web Development",
    level: "Beginner",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    students: 15420,
    duration: "52 hours",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    features: [
      "Build 15+ real-world projects",
      "Learn HTML5, CSS3, JavaScript ES6+",
      "Master React and Node.js",
      "Database design with MongoDB",
      "Deploy applications to production",
      "Lifetime access to course materials",
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Advanced Python Programming",
    shortDescription:
      "Deep dive into Python with advanced concepts, OOP, and data structures",
    fullDescription:
      "Take your Python skills to the next level with this advanced course. Learn object-oriented programming, design patterns, data structures, algorithms, and how to write clean, maintainable code. Perfect for intermediate developers looking to level up.",
    price: 79.99,
    category: "Programming",
    level: "Advanced",
    instructor: "Jose Portilla",
    rating: 4.9,
    students: 12350,
    duration: "38 hours",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop",
    features: [
      "Advanced OOP concepts",
      "Design patterns and best practices",
      "Data structures and algorithms",
      "Testing and debugging techniques",
      "Performance optimization",
      "Real-world project included",
    ],
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    shortDescription: "Learn user interface and experience design from scratch",
    fullDescription:
      "Become a skilled UI/UX designer with this comprehensive course. Learn the principles of great design, user research methods, wireframing, prototyping, and how to use industry-standard tools like Figma and Adobe XD.",
    price: 89.99,
    category: "Design",
    level: "Intermediate",
    instructor: "Sarah Johnson",
    rating: 4.7,
    students: 8920,
    duration: "28 hours",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    features: [
      "User research and personas",
      "Wireframing and prototyping",
      "Visual design principles",
      "Figma and Adobe XD mastery",
      "Design systems and components",
      "Portfolio-ready projects",
    ],
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    title: "Data Science with Machine Learning",
    shortDescription:
      "Master data analysis, visualization, and machine learning algorithms",
    fullDescription:
      "Dive into the world of data science and machine learning. Learn how to analyze data, create visualizations, build predictive models, and deploy machine learning solutions. Uses Python, pandas, scikit-learn, and TensorFlow.",
    price: 119.99,
    category: "Data Science",
    level: "Intermediate",
    instructor: "Andrew Ng",
    rating: 4.9,
    students: 24500,
    duration: "65 hours",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    features: [
      "Data analysis with pandas",
      "Machine learning algorithms",
      "Deep learning with TensorFlow",
      "Real-world datasets",
      "Model deployment techniques",
      "Certificate of completion",
    ],
    createdAt: "2024-01-10",
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    shortDescription: "Build cross-platform mobile apps for iOS and Android",
    fullDescription:
      "Learn to build native mobile applications using React Native. Create apps that work on both iOS and Android from a single codebase. Covers navigation, state management, APIs, and publishing to app stores.",
    price: 94.99,
    category: "Mobile Development",
    level: "Intermediate",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    students: 11200,
    duration: "42 hours",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    features: [
      "React Native fundamentals",
      "Navigation and routing",
      "State management with Redux",
      "API integration",
      "Push notifications",
      "App store deployment",
    ],
    createdAt: "2024-02-05",
  },
  {
    id: "6",
    title: "Digital Marketing Essentials",
    shortDescription:
      "Complete guide to SEO, social media, and content marketing",
    fullDescription:
      "Master digital marketing strategies that drive real results. Learn SEO, social media marketing, content marketing, email campaigns, and analytics. Perfect for marketers, entrepreneurs, and business owners.",
    price: 69.99,
    category: "Marketing",
    level: "Beginner",
    instructor: "Neil Patel",
    rating: 4.5,
    students: 9800,
    duration: "24 hours",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    features: [
      "SEO fundamentals",
      "Social media strategies",
      "Content marketing",
      "Email marketing campaigns",
      "Google Analytics",
      "Practical marketing plan",
    ],
    createdAt: "2024-01-25",
  },
  {
    id: "7",
    title: "Cloud Computing with AWS",
    shortDescription:
      "Learn Amazon Web Services from basics to advanced deployment",
    fullDescription:
      "Become proficient in Amazon Web Services. Learn to deploy, manage, and scale applications in the cloud. Covers EC2, S3, Lambda, databases, security, and more. Prepare for AWS certification.",
    price: 109.99,
    category: "Cloud Computing",
    level: "Intermediate",
    instructor: "Stephane Maarek",
    rating: 4.8,
    students: 18700,
    duration: "48 hours",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    features: [
      "AWS core services",
      "EC2 and load balancing",
      "S3 and CloudFront",
      "Serverless with Lambda",
      "Security best practices",
      "Exam preparation included",
    ],
    createdAt: "2024-02-10",
  },
  {
    id: "8",
    title: "Blockchain and Cryptocurrency Development",
    shortDescription: "Build decentralized applications and smart contracts",
    fullDescription:
      "Enter the world of blockchain development. Learn how blockchain works, create smart contracts with Solidity, and build decentralized applications (dApps). Covers Ethereum, Web3.js, and cryptocurrency fundamentals.",
    price: 129.99,
    category: "Blockchain",
    level: "Advanced",
    instructor: "Ivan on Tech",
    rating: 4.7,
    students: 7650,
    duration: "36 hours",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
    features: [
      "Blockchain fundamentals",
      "Smart contract development",
      "Solidity programming",
      "dApp creation",
      "Web3.js integration",
      "NFT marketplace project",
    ],
    createdAt: "2024-01-30",
  },
  {
    id: "9",
    title: "DevOps & CI/CD Pipelines",
    shortDescription:
      "Master Docker, Kubernetes, Jenkins, and modern DevOps practices",
    fullDescription:
      "Learn DevOps from the ground up. This course covers containerization with Docker, orchestration with Kubernetes, CI/CD pipelines with Jenkins and GitHub Actions, infrastructure as code, and monitoring. Perfect for developers looking to bridge development and operations.",
    price: 114.99,
    category: "DevOps",
    level: "Advanced",
    instructor: "Mumshad Mannambeth",
    rating: 4.8,
    students: 13900,
    duration: "44 hours",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop",
    features: [
      "Docker containerization",
      "Kubernetes orchestration",
      "CI/CD with GitHub Actions",
      "Infrastructure as Code (Terraform)",
      "Monitoring with Prometheus & Grafana",
      "Kubernetes certification prep",
    ],
    createdAt: "2024-02-15",
  },
  {
    id: "10",
    title: "Full-Stack TypeScript with Next.js",
    shortDescription:
      "Build production-ready apps with TypeScript, Next.js, and Prisma",
    fullDescription:
      "Master modern full-stack development using TypeScript, Next.js App Router, Prisma ORM, and PostgreSQL. Learn to build type-safe, scalable web applications with server components, server actions, authentication, and deployment strategies.",
    price: 104.99,
    category: "Web Development",
    level: "Intermediate",
    instructor: "Jack Herrington",
    rating: 4.9,
    students: 9300,
    duration: "40 hours",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    features: [
      "TypeScript fundamentals",
      "Next.js App Router",
      "Server Components & Actions",
      "Prisma ORM with PostgreSQL",
      "Authentication with NextAuth",
      "Deployment on Vercel",
    ],
    createdAt: "2024-03-01",
  },
  {
    id: "11",
    title: "Cybersecurity Fundamentals",
    shortDescription:
      "Learn ethical hacking, penetration testing, and network security",
    fullDescription:
      "Protect systems and networks with this comprehensive cybersecurity course. Learn ethical hacking techniques, penetration testing methodologies, network security, cryptography, and security best practices. Prepare for CompTIA Security+ certification.",
    price: 124.99,
    category: "Cybersecurity",
    level: "Intermediate",
    instructor: "Heath Adams",
    rating: 4.8,
    students: 16400,
    duration: "55 hours",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    features: [
      "Network security fundamentals",
      "Ethical hacking techniques",
      "Penetration testing tools",
      "Cryptography basics",
      "Web application security",
      "CompTIA Security+ prep",
    ],
    createdAt: "2024-02-20",
  },
  {
    id: "12",
    title: "Graphic Design with Adobe Illustrator",
    shortDescription:
      "Create stunning visuals, logos, and illustrations from scratch",
    fullDescription:
      "Become a professional graphic designer using Adobe Illustrator. Learn vector illustration, logo design, typography, color theory, and branding. Build a portfolio of professional-quality designs by working through real projects.",
    price: 74.99,
    category: "Design",
    level: "Beginner",
    instructor: "Daniel Walter Scott",
    rating: 4.6,
    students: 7200,
    duration: "22 hours",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
    features: [
      "Adobe Illustrator essentials",
      "Vector illustration techniques",
      "Logo and brand design",
      "Typography and color theory",
      "Print and digital design",
      "Portfolio-ready projects",
    ],
    createdAt: "2024-03-10",
  },
];

const seedBlogPosts = [
  {
    id: "1",
    title: "10 Essential Web Development Skills for 2024",
    slug: "web-development-skills-2024",
    category: "Web Development",
    author: "Dr. Angela Yu",
    authorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    excerpt:
      "Stay ahead in 2024 by mastering these essential web development skills that every developer needs to know.",
    content:
      "The world of web development is evolving faster than ever. In 2024, mastering TypeScript, React Server Components, edge computing, and accessibility are no longer optional — they're essential. This guide walks you through the top 10 skills demanded by leading tech companies...",
    readTime: "8 min read",
    featured: true,
    publishedAt: new Date("2024-03-01").toISOString(),
    createdAt: new Date("2024-03-01").toISOString(),
  },
  {
    id: "2",
    title: "How to Break into Data Science in 6 Months",
    slug: "break-into-data-science",
    category: "Data Science",
    author: "Andrew Chen",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    excerpt:
      "A practical roadmap to land your first data science job within 6 months, even if you're starting from scratch.",
    content:
      "Data science is one of the most in-demand fields today. But how do you get started when there's so much to learn? This article presents a 6-month structured roadmap — from Python basics to machine learning models and your first interview...",
    readTime: "12 min read",
    featured: false,
    publishedAt: new Date("2024-02-20").toISOString(),
    createdAt: new Date("2024-02-20").toISOString(),
  },
  {
    id: "3",
    title: "Design Principles Every Developer Should Know",
    slug: "design-principles-for-developers",
    category: "Design",
    author: "Sarah Mitchell",
    authorImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    excerpt:
      "Good design isn't just for designers. Learn the key principles that will make your applications more beautiful and usable.",
    content:
      "Developers who understand design stand out. This article covers the core principles — visual hierarchy, color theory, whitespace, typography — that you can apply immediately to transform how your UIs look and feel...",
    readTime: "7 min read",
    featured: false,
    publishedAt: new Date("2024-02-10").toISOString(),
    createdAt: new Date("2024-02-10").toISOString(),
  },
  {
    id: "4",
    title: "The Future of AI in Online Education",
    slug: "ai-future-online-education",
    category: "AI/ML",
    author: "Michael Torres",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
    excerpt:
      "Artificial intelligence is reshaping how we learn. Here's what the future of education looks like with AI-driven personalization.",
    content:
      "AI tutors, adaptive learning paths, instant feedback — the future of education is being rewritten by machine learning. Platforms are increasingly using AI to detect learning gaps, recommend content, and personalize the learning experience at scale...",
    readTime: "10 min read",
    featured: false,
    publishedAt: new Date("2024-01-28").toISOString(),
    createdAt: new Date("2024-01-28").toISOString(),
  },
  {
    id: "5",
    title: "Building Your Personal Brand as a Developer",
    slug: "personal-brand-developer",
    category: "Career",
    author: "Jessica Lee",
    authorImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format&fit=crop",
    excerpt:
      "Your GitHub profile, blog, and social presence are your portfolio. Learn how to build a brand that attracts opportunities.",
    content:
      "In today's market, technical skills alone won't land you your dream job. A strong personal brand — consistent GitHub contributions, a thoughtful blog, a compelling LinkedIn — sets you apart. Here's how to build yours systematically...",
    readTime: "6 min read",
    featured: false,
    publishedAt: new Date("2024-01-15").toISOString(),
    createdAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "6",
    title: "Cloud vs. On-Premise: Which is Right for Your Business?",
    slug: "cloud-vs-on-premise",
    category: "Cloud",
    author: "Raj Patel",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    excerpt:
      "The cloud vs. on-premise debate continues. We break down the costs, security, and scalability considerations for 2024.",
    content:
      "Migrating to the cloud offers agility and cost savings — but it's not always the right move. For businesses with strict compliance requirements, on-premise infrastructure may still be the answer. We compare the two approaches across six dimensions...",
    readTime: "9 min read",
    featured: false,
    publishedAt: new Date("2024-01-05").toISOString(),
    createdAt: new Date("2024-01-05").toISOString(),
  },
];

const seedReviews = [
  {
    courseId: "1",
    userId: "demo-user-001",
    userName: "Alex Johnson",
    rating: 5,
    comment:
      "Absolutely fantastic course! The projects are real-world and the instructor explains everything clearly. Best investment I've made.",
    createdAt: new Date("2024-03-05").toISOString(),
  },
  {
    courseId: "1",
    userId: "demo-user-002",
    userName: "Maria Garcia",
    rating: 4,
    comment:
      "Very comprehensive content. The React section is especially thorough. A few videos could be more concise but overall excellent.",
    createdAt: new Date("2024-03-08").toISOString(),
  },
  {
    courseId: "1",
    userId: "demo-user-003",
    userName: "James Wilson",
    rating: 5,
    comment:
      "I got my first dev job after completing this bootcamp. The portfolio projects really made a difference in interviews.",
    createdAt: new Date("2024-03-12").toISOString(),
  },
  {
    courseId: "2",
    userId: "demo-user-004",
    userName: "Priya Sharma",
    rating: 5,
    comment:
      "The best Python course out there. OOP patterns and data structures are covered in depth with perfect examples.",
    createdAt: new Date("2024-03-03").toISOString(),
  },
  {
    courseId: "2",
    userId: "demo-user-005",
    userName: "David Kim",
    rating: 4,
    comment:
      "Great advanced content. Would love more exercises but the explanations are crystal clear.",
    createdAt: new Date("2024-03-10").toISOString(),
  },
  {
    courseId: "3",
    userId: "demo-user-006",
    userName: "Sophie Chen",
    rating: 5,
    comment:
      "Sarah is an amazing teacher! I went from knowing nothing about UX to landing a junior design role. Highly recommend.",
    createdAt: new Date("2024-02-28").toISOString(),
  },
  {
    courseId: "4",
    userId: "demo-user-007",
    userName: "Carlos Rivera",
    rating: 5,
    comment:
      "Andrew's teaching style is unmatched. Complex ML concepts made accessible with great visual explanations.",
    createdAt: new Date("2024-03-01").toISOString(),
  },
  {
    courseId: "5",
    userId: "demo-user-008",
    userName: "Emma Thompson",
    rating: 4,
    comment:
      "Solid React Native fundamentals. The app store deployment section saved me hours of confusion.",
    createdAt: new Date("2024-03-07").toISOString(),
  },
];

const seedAdminUser = {
  uid: "admin-firebase-uid",
  email: "admin@coursehub.com",
  displayName: "Admin User",
  role: "admin",
  createdAt: new Date().toISOString(),
};

// GET - Seed the database with initial courses, blog posts, reviews, and admin user
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const results: Record<string, string> = {};

    // Courses
    const existingCourses = await db.collection("courses").countDocuments();
    if (existingCourses === 0) {
      await db.collection("courses").insertMany(seedCourses);
      results.courses = `Seeded ${seedCourses.length} courses`;
    } else {
      results.courses = `Skipped (${existingCourses} existing)`;
    }

    // Blog posts
    const existingBlogs = await db.collection("blog_posts").countDocuments();
    if (existingBlogs === 0) {
      await db.collection("blog_posts").insertMany(seedBlogPosts);
      results.blog_posts = `Seeded ${seedBlogPosts.length} posts`;
    } else {
      results.blog_posts = `Skipped (${existingBlogs} existing)`;
    }

    // Reviews
    const existingReviews = await db.collection("reviews").countDocuments();
    if (existingReviews === 0) {
      await db.collection("reviews").insertMany(seedReviews);
      results.reviews = `Seeded ${seedReviews.length} reviews`;
    } else {
      results.reviews = `Skipped (${existingReviews} existing)`;
    }

    // Admin user (upsert by email)
    await db
      .collection("users")
      .updateOne(
        { email: seedAdminUser.email },
        { $setOnInsert: seedAdminUser },
        { upsert: true },
      );
    results.admin_user = "Upserted admin@coursehub.com with role: admin";

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 },
    );
  }
}

// POST - Force re-seed (drops existing and re-inserts all collections)
export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    await db.collection("courses").deleteMany({});
    await db.collection("blog_posts").deleteMany({});
    await db.collection("reviews").deleteMany({});

    await db.collection("courses").insertMany(seedCourses);
    await db.collection("blog_posts").insertMany(seedBlogPosts);
    await db.collection("reviews").insertMany(seedReviews);
    await db
      .collection("users")
      .updateOne(
        { email: seedAdminUser.email },
        { $set: seedAdminUser },
        { upsert: true },
      );

    return NextResponse.json({
      success: true,
      message: "Force re-seeded all collections",
      counts: {
        courses: seedCourses.length,
        blog_posts: seedBlogPosts.length,
        reviews: seedReviews.length,
        admin_user: 1,
      },
    });
  } catch (error) {
    console.error("Error re-seeding database:", error);
    return NextResponse.json(
      { error: "Failed to re-seed database" },
      { status: 500 },
    );
  }
}
