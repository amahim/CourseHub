"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Heart,
  BarChart2,
  Menu,
  X,
  CheckCircle,
  PlayCircle,
  Trash2,
  ExternalLink,
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

type TabId = "overview" | "enrolled" | "wishlist" | "profile";

export default function UserDashboard() {
  const { user, userRole, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [removingWishlistId, setRemovingWishlistId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login?redirect=/dashboard/user");
      return;
    }
    loadData();
  }, [user, authLoading, router]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [enrollRes, wishRes] = await Promise.all([
        fetch(`/api/enrollments?userId=${user.uid}`),
        fetch(`/api/wishlist?userId=${user.uid}`),
      ]);
      const enrollData = enrollRes.ok ? await enrollRes.json() : { enrollments: [] };
      const wishData = wishRes.ok ? await wishRes.json() : { wishlist: [] };
      setEnrollments(enrollData.enrollments || []);
      setWishlist(wishData.wishlist || []);
    } catch {
      setEnrollments([]);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWishlist = async (id: string) => {
    setRemovingWishlistId(id);
    try {
      const res = await fetch(`/api/wishlist/${id}`, { method: "DELETE" });
      if (res.ok) {
        setWishlist((prev) => prev.filter((w) => w._id !== id));
      }
    } catch {}
    finally {
      setRemovingWishlistId(null);
    }
  };

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

  const completedCount = enrollments.filter((e) => e.completed).length;
  const totalHours = enrollments.reduce((sum, e) => sum + (e.hoursSpent || 0), 0);
  const avgProgress =
    enrollments.length > 0
      ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length)
      : 0;

  const overviewCards = [
    {
      label: "Enrolled Courses",
      value: loading ? "—" : enrollments.length,
      icon: BookOpen,
      color: "text-primary-600 dark:text-primary-400",
      bg: "bg-primary-50 dark:bg-primary-900/20",
    },
    {
      label: "Completed",
      value: loading ? "—" : completedCount,
      icon: Award,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Hours Spent",
      value: loading ? "—" : totalHours,
      icon: Clock,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      label: "Avg Progress",
      value: loading ? "—" : `${avgProgress}%`,
      icon: TrendingUp,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      label: "Wishlisted",
      value: loading ? "—" : wishlist.length,
      icon: Heart,
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-900/20",
    },
  ];

  const navItems: { id: TabId; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "enrolled", label: "My Courses", icon: BookOpen },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "My Profile", icon: User },
  ];

  const progressChartData = enrollments.slice(0, 5).map((e) => ({
    name: (e.courseName || "Course").slice(0, 12),
    progress: e.progress || 0,
  }));

  const statusChartData = [
    { name: "Completed", value: completedCount },
    { name: "In Progress", value: enrollments.length - completedCount },
    { name: "Wishlisted", value: wishlist.length },
  ];

  const Sidebar = () => (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col min-h-screen">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">CourseHub</span>
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
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "bg-primary-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
        <Link
          href="/items"
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Browse Courses
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <Settings className="h-4 w-4" />
          Settings / Profile
        </Link>
      </nav>
      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => logout()}
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
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-bold text-gray-900 dark:text-white">
            {navItems.find((n) => n.id === activeTab)?.label || "Dashboard"}
          </h1>
        </div>

        <div className="p-5 md:p-8 max-w-6xl">
          {activeTab === "overview" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.displayName || user.email?.split("@")[0]}!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                  Here&apos;s your learning progress overview
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {overviewCards.map((item, i) => (
                  <div key={i} className="dashboard-card">
                    <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 dashboard-card">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary-600" /> Monthly Learning Hours
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb" }} />
                      <Line type="monotone" dataKey="hours" stroke="#0284c7" strokeWidth={2.5} dot={{ fill: "#0284c7", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="dashboard-card">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Course Status</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={statusChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {statusChartData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend iconType="circle" iconSize={8} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {progressChartData.length > 0 && (
                <div className="dashboard-card mb-8">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-primary-600" /> Course Completion Progress (%)
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={progressChartData} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <Tooltip contentStyle={{ borderRadius: "12px" }} formatter={(v) => [`${v}%`, "Completion"]} />
                      <Bar dataKey="progress" fill="#0284c7" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab("enrolled")}
                  className="dashboard-card flex items-center gap-4 hover:border-primary-200 dark:hover:border-primary-700 border border-transparent transition-colors cursor-pointer text-left"
                >
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">My Enrolled Courses</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{enrollments.length} course{enrollments.length !== 1 ? "s" : ""} enrolled</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className="dashboard-card flex items-center gap-4 hover:border-pink-200 dark:hover:border-pink-700 border border-transparent transition-colors cursor-pointer text-left"
                >
                  <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">My Wishlist</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{wishlist.length} course{wishlist.length !== 1 ? "s" : ""} saved</p>
                  </div>
                </button>
              </div>
            </>
          )}

          {activeTab === "enrolled" && (
            <>
              <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Enrolled Courses</h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Track your learning progress</p>
                </div>
                <Link href="/items" className="btn-primary text-sm px-4 py-2">Browse More</Link>
              </div>
              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
                </div>
              ) : enrollments.length === 0 ? (
                <div className="text-center py-20 dashboard-card">
                  <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses yet</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">You haven&apos;t enrolled in any courses.</p>
                  <Link href="/items" className="btn-primary">Explore Courses</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {enrollments.map((enrollment) => (
                    <div key={enrollment._id} className="dashboard-card flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">{enrollment.courseName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                        </div>
                        {enrollment.completed ? (
                          <span className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                            <CheckCircle className="h-3 w-3" /> Done
                          </span>
                        ) : (
                          <span className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded-full">
                            <PlayCircle className="h-3 w-3" /> Active
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{enrollment.progress || 0}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${enrollment.completed ? "bg-green-500" : "bg-primary-600"}`}
                            style={{ width: `${enrollment.progress || 0}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {enrollment.hoursSpent || 0}h spent</span>
                        <Link href={`/items/${enrollment.courseId}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">Continue →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "wishlist" && (
            <>
              <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Courses you&apos;ve saved for later</p>
                </div>
                <Link href="/items" className="btn-primary text-sm px-4 py-2">Browse Courses</Link>
              </div>
              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
                </div>
              ) : wishlist.length === 0 ? (
                <div className="text-center py-20 dashboard-card">
                  <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Wishlist is empty</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Save courses you&apos;re interested in.</p>
                  <Link href="/items" className="btn-primary">Explore Courses</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wishlist.map((item) => (
                    <div key={item._id} className="dashboard-card flex flex-col gap-3">
                      {item.courseImage && (
                        <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <Image src={item.courseImage} alt={item.courseName} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{item.courseName}</p>
                        {item.courseCategory && <span className="badge-primary text-xs mt-1 inline-block">{item.courseCategory}</span>}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Added {new Date(item.addedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 dark:text-white">{item.coursePrice === 0 ? "Free" : `$${item.coursePrice}`}</span>
                        <div className="flex items-center gap-2">
                          <Link href={`/items/${item.courseId}`} className="text-primary-600 dark:text-primary-400 text-xs font-medium hover:underline">View Course</Link>
                          <button
                            onClick={() => handleRemoveWishlist(item._id)}
                            disabled={removingWishlistId === item._id}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            {removingWishlistId === item._id ? (
                              <div className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "profile" && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage your account details</p>
              </div>
              <div className="dashboard-card max-w-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">{user.displayName || user.email?.split("@")[0]}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
                    <span className="badge-primary text-xs mt-1 inline-block">Student</span>
                  </div>
                </div>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">Email</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">Enrolled Courses</span>
                    <span className="font-medium">{enrollments.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">Completed</span>
                    <span className="font-medium">{completedCount}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">Wishlist</span>
                    <span className="font-medium">{wishlist.length}</span>
                  </div>
                </div>
                <Link href="/profile" className="btn-primary w-full text-center block py-2.5">Edit Full Profile</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
