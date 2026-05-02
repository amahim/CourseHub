"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  LogOut,
  TrendingUp,
  Star,
  Clock,
  Award,
  Plus,
  BarChart2,
  Menu,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0284c7", "#d946ef", "#10b981", "#f59e0b", "#ef4444"];

const activityData = [
  { month: "Nov", hours: 12 },
  { month: "Dec", hours: 18 },
  { month: "Jan", hours: 25 },
  { month: "Feb", hours: 20 },
  { month: "Mar", hours: 32 },
  { month: "Apr", hours: 28 },
];

const progressData = [
  { name: "Web Dev", completed: 75 },
  { name: "Python", completed: 40 },
  { name: "Design", completed: 90 },
  { name: "Marketing", completed: 55 },
];

const certData = [
  { name: "Completed", value: 3 },
  { name: "In Progress", value: 2 },
  { name: "Not Started", value: 5 },
];

export default function UserDashboard() {
  const { user, userRole, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    if (!user) {
      router.push("/login?redirect=/dashboard/user");
      return;
    }

    fetch("/api/courses")
      .then((r) => r.json())
      .then((d) => setMyCourses((d.courses || []).slice(0, 5)))
      .catch(() => setMyCourses([]))
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  // Show loading screen while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const overview = [
    {
      label: "Enrolled Courses",
      value: "10",
      icon: BookOpen,
      color: "text-primary-600 dark:text-primary-400",
      bg: "bg-primary-50 dark:bg-primary-900/20",
    },
    {
      label: "Completed",
      value: "3",
      icon: Award,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Hours Spent",
      value: "135",
      icon: Clock,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      label: "Avg Rating Given",
      value: "4.7",
      icon: Star,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
  ];

  const navItems = [
    { href: "/dashboard/user", label: "Overview", icon: LayoutDashboard },
    { href: "/items", label: "Browse Courses", icon: BookOpen },
    { href: "/profile", label: "My Profile", icon: User },
    { href: "/items/add", label: "Add Course", icon: Plus },
    { href: "/dashboard/user/settings", label: "Settings", icon: Settings },
  ];

  const Sidebar = () => (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col min-h-screen">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">
            CourseHub
          </span>
        </Link>
      </div>
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            {user.email?.[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user.displayName || user.email?.split("@")[0]}
            </p>
            <span className="badge-primary text-xs">Student</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => {
            logout();
          }}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Top Bar */}
        <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>

        <div className="p-5 md:p-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user.displayName || user.email?.split("@")[0]}! 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Here&apos;s your learning progress overview
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {overview.map((item, i) => (
              <div key={i} className="dashboard-card">
                <div
                  className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3`}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Line Chart - Learning Hours */}
            <div className="lg:col-span-2 dashboard-card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary-600" /> Monthly
                Learning Hours
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    dot={{ fill: "#0284c7", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart - Course Status */}
            <div className="dashboard-card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Course Status
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={certData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {certData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" iconSize={8} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart - Course Progress */}
          <div className="dashboard-card mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-primary-600" /> Course
              Completion Progress (%)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={progressData} barSize={32}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "12px" }}
                  formatter={(v) => [`${v}%`, "Completion"]}
                />
                <Bar dataKey="completed" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Courses Table */}
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                All Available Courses
              </h3>
              <Link
                href="/items"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                View All
              </Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton h-12 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="text-left py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">
                        Course
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                        Category
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-600 dark:text-gray-400 hidden md:table-cell">
                        Level
                      </th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">
                        Price
                      </th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-600 dark:text-gray-400">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                    {myCourses.map((course: any) => (
                      <tr
                        key={course.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="py-3 px-2">
                          <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {course.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {course.instructor}
                          </p>
                        </td>
                        <td className="py-3 px-2 hidden sm:table-cell">
                          <span className="badge-primary">
                            {course.category}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                          {course.level}
                        </td>
                        <td className="py-3 px-2 text-right font-semibold text-gray-900 dark:text-white">
                          ${course.price}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Link
                            href={`/items/${course.id}`}
                            className="text-primary-600 dark:text-primary-400 hover:underline text-xs font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
