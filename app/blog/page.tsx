import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import clientPromise from "@/lib/mongodb";

async function getBlogPosts() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");
    const posts = await db
      .collection("blog_posts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

const FALLBACK_POSTS = [
  {
    id: "1",
    title: "10 Essential Skills Every Web Developer Needs in 2025",
    excerpt:
      "The tech landscape evolves rapidly. Here are the most in-demand skills that will make you stand out as a web developer this year.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    author: "Dr. Angela Yu",
    authorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop",
    category: "Web Development",
    readTime: "8 min read",
    createdAt: "2025-04-15",
    featured: true,
  },
  {
    id: "2",
    title: "How to Transition into Data Science from Any Background",
    excerpt:
      "You don't need a math degree to become a data scientist. With the right roadmap and resources, anyone can make the switch.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    author: "Jose Portilla",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
    category: "Data Science",
    readTime: "6 min read",
    createdAt: "2025-04-08",
    featured: false,
  },
  {
    id: "3",
    title: "The Complete Guide to UI/UX Design Principles for Beginners",
    excerpt:
      "Good design is not just about making things look pretty. Learn the fundamental principles that make products intuitive and user-friendly.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    author: "Sarah Johnson",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
    category: "Design",
    readTime: "10 min read",
    createdAt: "2025-04-01",
    featured: false,
  },
  {
    id: "4",
    title: "Python vs JavaScript: Which Should You Learn First?",
    excerpt:
      "The age-old debate continues. We break down both languages by use case, job market demand, and learning curve to help you decide.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop",
    author: "Mark Stevens",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
    category: "Programming",
    readTime: "7 min read",
    createdAt: "2025-03-25",
    featured: false,
  },
  {
    id: "5",
    title: "Building Your First Machine Learning Model with Python",
    excerpt:
      "From data collection to model deployment — a step-by-step beginner's guide to creating your very first ML model.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
    author: "Dr. Rachel Liu",
    authorImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop",
    category: "AI & ML",
    readTime: "12 min read",
    createdAt: "2025-03-18",
    featured: false,
  },
  {
    id: "6",
    title: "How to Build a Profitable Freelance Career as a Developer",
    excerpt:
      "Thousands of developers earn six figures freelancing. Here's the exact blueprint to build a sustainable freelance business.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
    author: "Tom Hanks",
    authorImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop",
    category: "Career",
    readTime: "9 min read",
    createdAt: "2025-03-10",
    featured: false,
  },
];

export default async function BlogPage() {
  const dbPosts = await getBlogPosts();
  const posts = dbPosts.length > 0 ? dbPosts : FALLBACK_POSTS;
  const featuredPost = posts.find((p: any) => p.featured) || posts[0];
  const regularPosts = posts.filter((p: any) => p.id !== featuredPost.id);

  const categorySet: string[] = Array.from(
    new Set(posts.map((p: any) => String(p.category))),
  );
  const categories: string[] = ["All", ...categorySet];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            CourseHub Blog
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Insights, tutorials, and career advice from our expert instructors
            and industry leaders.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Featured Post */}
        <div className="mb-12">
          <Link href={`/blog/${featuredPost.id}`} className="group block">
            <div className="card overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge bg-primary-600 text-white text-xs px-3 py-1">
                      ✨ Featured
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="badge-primary mb-3">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                        <Image
                          src={featuredPost.authorImage}
                          alt={featuredPost.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          {featuredPost.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(featuredPost.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-semibold">
                    Read Article{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat: string) => (
            <span
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${cat === "All" ? "bg-primary-600 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400"}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post: any) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group block"
            >
              <div className="card h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge-primary text-xs">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-4 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-md overflow-hidden">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Never Miss an Article</h3>
          <p className="text-primary-100 mb-6">
            Get the latest tutorials and insights delivered to your inbox every
            week.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            action="/api/newsletter"
            method="POST"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
