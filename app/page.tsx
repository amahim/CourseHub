import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  TrendingUp,
  CheckCircle,
  Quote,
  Code2,
  Palette,
  BarChart3,
  Megaphone,
  Brain,
  Camera,
  ChevronRight,
  PlayCircle,
  Zap,
  Shield,
  Globe,
  MessageSquare,
} from "lucide-react";
import clientPromise from "@/lib/mongodb";

async function getFeaturedCourses() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");
    const courses = await db.collection("courses").find({}).limit(4).toArray();
    return JSON.parse(JSON.stringify(courses));
  } catch {
    return [];
  }
}

async function getStats() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");
    const [totalCourses, totalUsers] = await Promise.all([
      db.collection("courses").countDocuments(),
      db.collection("users").countDocuments(),
    ]);
    return { totalCourses, totalUsers };
  } catch {
    return { totalCourses: 0, totalUsers: 0 };
  }
}

export default async function Home() {
  const [featuredCourses, dbStats] = await Promise.all([
    getFeaturedCourses(),
    getStats(),
  ]);

  const stats = [
    {
      label: "Active Students",
      value: `${Math.max(50000, dbStats.totalUsers * 100).toLocaleString()}+`,
      icon: Users,
    },
    { label: "Expert Instructors", value: "200+", icon: Award },
    {
      label: "Quality Courses",
      value: `${Math.max(500, dbStats.totalCourses * 10)}+`,
      icon: BookOpen,
    },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals with years of real-world experience in their fields.",
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description:
        "Access course materials anytime, anywhere at your own pace — no expiry dates.",
    },
    {
      icon: Award,
      title: "Certificates",
      description:
        "Earn recognized certificates upon successful course completion for your portfolio.",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join a vibrant community of learners, get peer support and expert guidance.",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "All courses are vetted by our expert team. 30-day money-back guarantee.",
    },
    {
      icon: Globe,
      title: "Learn Anywhere",
      description:
        "Fully responsive platform — learn on mobile, tablet, or desktop seamlessly.",
    },
  ];

  const categories = [
    {
      name: "Web Development",
      icon: Code2,
      courses: 85,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      name: "Data Science",
      icon: BarChart3,
      courses: 60,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      courses: 45,
      color: "from-orange-500 to-yellow-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      name: "Digital Marketing",
      icon: Megaphone,
      courses: 40,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      name: "AI & Machine Learning",
      icon: Brain,
      courses: 55,
      color: "from-red-500 to-rose-500",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
    {
      name: "Photography",
      icon: Camera,
      courses: 30,
      color: "from-indigo-500 to-violet-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer at Google",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
      content:
        "CourseHub completely transformed my career. The structured curriculum and hands-on projects gave me the confidence to land my dream job at Google. Truly world-class!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Data Scientist at Meta",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
      content:
        "Best investment in my education. The practical AI/ML projects helped me build a strong portfolio that impressed Meta's hiring team. Worth every penny!",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "UX Lead at Spotify",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
      content:
        "The quality of courses is outstanding. I went from a beginner designer to leading a UX team at Spotify in just 8 months. Highly recommended!",
      rating: 5,
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Create Your Account",
      description:
        "Sign up for free and set up your learning profile in just 2 minutes.",
    },
    {
      step: "02",
      title: "Choose Your Course",
      description:
        "Browse 500+ courses and pick the one that matches your goals and schedule.",
    },
    {
      step: "03",
      title: "Learn & Practice",
      description:
        "Watch expert videos, complete projects, and apply your skills in real scenarios.",
    },
    {
      step: "04",
      title: "Earn Your Certificate",
      description:
        "Complete the course, pass the assessment, and download your certificate.",
    },
  ];

  const faqs = [
    {
      q: "Do I get lifetime access to courses?",
      a: "Yes! Once you enroll in a course, you have lifetime access to all course materials, including future updates.",
    },
    {
      q: "Are there any prerequisites?",
      a: "Most beginner courses have no prerequisites. Each course clearly states its requirements on the course page.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, PayPal, and bank transfers. All transactions are secured with SSL encryption.",
    },
    {
      q: "Can I download course materials?",
      a: "Yes, course resources and project files are available for download. Video streaming is available on all devices.",
    },
    {
      q: "Is there a refund policy?",
      a: "Absolutely. If you're not satisfied within 30 days of purchase, we offer a full money-back guarantee — no questions asked.",
    },
  ];

  const partners = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section
        className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 dark:from-gray-900 dark:via-primary-900 dark:to-gray-900 text-white overflow-hidden"
        style={{ minHeight: "65vh" }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        {/* Animated blobs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-200/10 rounded-full blur-2xl animate-float" />

        <div className="relative container-custom py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4 text-yellow-400" />
              Trusted by 50,000+ learners worldwide
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Future with{" "}
              <span className="text-primary-200 relative">
                Online Learning
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-300 rounded-full opacity-60" />
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-100 max-w-2xl">
              Join thousands of learners mastering in-demand skills with
              expert-led courses. Start your journey to success today —
              completely at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/items"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-800/60 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-primary-900/80 transition-all duration-200 border border-white/30"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Get Started Free
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center md:justify-start text-sm text-primary-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-400" /> No credit
                card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-400" /> 30-day money
                back
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 relative hidden md:block">
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                alt="Students learning"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-primary-400 ring-2 ring-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    +500 joined today
                  </p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="bg-white dark:bg-gray-900 py-12 border-b border-gray-100 dark:border-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="bg-gray-50 dark:bg-gray-950 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Why Choose CourseHub?</h2>
            <p className="section-subtitle">
              Everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Section ── */}
      <section className="bg-white dark:bg-gray-900 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Explore by Category</h2>
            <p className="section-subtitle">
              Find courses in your area of interest
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/items?category=${encodeURIComponent(cat.name)}`}
                className={`${cat.bg} rounded-xl p-4 text-center hover:-translate-y-1 transition-all duration-300 hover:shadow-md group border border-transparent hover:border-gray-200 dark:hover:border-gray-700`}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-md`}
                >
                  <cat.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {cat.courses} courses
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses Section ── */}
      <section className="bg-gray-50 dark:bg-gray-950 section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="section-title mb-2">Featured Courses</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Hand-picked by our expert team
              </p>
            </div>
            <Link
              href="/items"
              className="hidden md:flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
            >
              View All <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          {featuredCourses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course: any) => (
                <div
                  key={course.id}
                  className="card group flex flex-col h-full"
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        course.image ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop"
                      }
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 px-2.5 py-1 rounded-lg text-sm font-bold text-primary-600 dark:text-primary-400 shadow-md">
                      ${course.price}
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="badge-primary text-xs">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {course.rating}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({(course.students || 0).toLocaleString()})
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 text-sm leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
                      {course.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="truncate">{course.instructor}</span>
                      <span className="flex-shrink-0 ml-2">{course.level}</span>
                    </div>
                    <Link
                      href={`/items/${course.id}`}
                      className="btn-primary text-center text-sm py-2 mt-auto"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No courses yet. Be the first to add one!
              </p>
              <Link
                href="/items/add"
                className="btn-primary inline-flex items-center gap-2"
              >
                Add a Course <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
          <div className="text-center mt-10 md:hidden">
            <Link
              href="/items"
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section className="bg-white dark:bg-gray-900 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="section-subtitle">
              Get started on your learning journey in 4 simple steps
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+3rem)] right-[-calc(50%-3rem)] h-0.5 bg-gradient-to-r from-primary-300 to-primary-100 dark:from-primary-700 dark:to-gray-800" />
                )}
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200 dark:shadow-primary-900/50">
                  <span className="text-2xl font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="bg-primary-50 dark:bg-gray-950 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Student Success Stories</h2>
            <p className="section-subtitle">
              Hear from learners who transformed their careers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="card p-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary-300 dark:text-primary-700 mb-3" />
                <p className="text-gray-700 dark:text-gray-300 mb-5 text-sm leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner Section ── */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Learning Today — It&apos;s Free
              </h2>
              <p className="text-primary-100 mb-6 text-lg">
                Join over 50,000 students and start your journey to a better
                career. No credit card required.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Learn at your own pace",
                  "Hands-on real-world projects",
                  "Industry-recognized certificates",
                  "Expert instructor support",
                  "30-day money-back guarantee",
                  "Mobile-friendly platform",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span className="text-primary-100">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl group"
              >
                Join Now — It&apos;s Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                alt="Students collaborating"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="bg-white dark:bg-gray-900 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Got questions? We&apos;ve got answers
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Section ── */}
      <section
        id="newsletter"
        className="bg-gray-50 dark:bg-gray-950 section-padding"
      >
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-title mb-4">Stay Updated</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to our newsletter for the latest courses, tips, and
              exclusive offers.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              action="/api/newsletter"
              method="POST"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="input-field flex-1"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              No spam, ever. Unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
