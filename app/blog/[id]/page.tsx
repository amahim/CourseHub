import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

const FALLBACK_POSTS: any[] = [
  {
    id: "1",
    title: "10 Essential Skills Every Web Developer Needs in 2025",
    content: `<p>The web development landscape continues to evolve at a breakneck pace. Staying current with the latest technologies and practices is essential for career growth and staying competitive in the job market.</p>
    <h2>1. Modern JavaScript (ES2024+)</h2>
    <p>JavaScript remains the backbone of web development. Mastering modern features like optional chaining, nullish coalescing, and the latest ES2024 features is non-negotiable.</p>
    <h2>2. React & Next.js</h2>
    <p>React continues to dominate the frontend landscape. Pair it with Next.js for server-side rendering, static generation, and optimal performance.</p>
    <h2>3. TypeScript</h2>
    <p>TypeScript has become the de facto standard for large-scale JavaScript applications. It catches errors at compile time and provides excellent IDE support.</p>
    <h2>4. Node.js & API Development</h2>
    <p>Full-stack developers need solid backend skills. Node.js with Express or Fastify lets you build scalable REST APIs efficiently.</p>
    <h2>5. Database Management</h2>
    <p>Understanding both SQL (PostgreSQL) and NoSQL (MongoDB) databases is crucial. Modern applications often use both.</p>`,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop",
    author: "Dr. Angela Yu",
    authorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop",
    authorBio:
      "Senior Software Engineer and educator with 10+ years of experience. Author of multiple best-selling coding courses.",
    category: "Web Development",
    readTime: "8 min read",
    createdAt: "2025-04-15",
  },
];

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = FALLBACK_POSTS.find((p) => p.id === id) || FALLBACK_POSTS[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container-custom py-8 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="relative h-72 md:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="badge-primary mb-3 inline-block">
                {post.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 pb-6 mb-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {post.author}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {post.authorBio?.substring(0, 60)}...
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 ml-auto">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:text-gray-900 dark:prose-h2:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Card */}
            <div className="mt-10 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {post.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {post.authorBio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
