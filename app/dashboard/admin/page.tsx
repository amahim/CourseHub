"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  Shield,
  Tag,
  BarChart2,
  Menu,
  Trash2,
  Eye,
  Edit2,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

const revenueData = [
  { month: "Nov", revenue: 4200, users: 32 },
  { month: "Dec", revenue: 5800, users: 48 },
  { month: "Jan", revenue: 7200, users: 62 },
  { month: "Feb", revenue: 6400, users: 55 },
  { month: "Mar", revenue: 8900, users: 74 },
  { month: "Apr", revenue: 9600, users: 81 },
];

const categoryData = [
  { name: "Web Dev", courses: 85 },
  { name: "Data Science", courses: 60 },
  { name: "Design", courses: 45 },
  { name: "Marketing", courses: 40 },
  { name: "AI/ML", courses: 55 },
];

const enrollmentData = [
  { name: "Beginner", value: 45 },
  { name: "Intermediate", value: 35 },
  { name: "Advanced", value: 20 },
];

export default function AdminDashboard() {
  const { user, userRole, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    if (!user) {
      router.push("/login?redirect=/dashboard/admin");
      return;
    }

    if (userRole && userRole !== "admin") {
      router.push("/dashboard/user");
      return;
    }

    loadData();
  }, [user, userRole, authLoading, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesRes, statsRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/admin/stats"),
      ]);
      const coursesData = await coursesRes.json();
      setCourses(coursesData.courses || []);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setUsers(statsData.users || []);
        setStats({
          totalCourses:
            statsData.totalCourses || coursesData.courses?.length || 0,
          totalUsers: statsData.totalUsers || 0,
          totalRevenue: statsData.totalRevenue || 48900,
          totalEnrollments: statsData.totalEnrollments || 1240,
        });
      } else {
        setStats((s) => ({
          ...s,
          totalCourses: coursesData.courses?.length || 0,
        }));
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Delete this course? This action cannot be undone.")) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) setCourses((cs) => cs.filter((c) => c.id !== id));
    } catch {}
  };

  // Show loading screen while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const overviewCards = [
    {
      label: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-primary-600",
      bg: "bg-primary-50 dark:bg-primary-900/20",
      change: "+12%",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      change: "+8%",
    },
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
      change: "+15%",
    },
    {
      label: "Enrollments",
      value: stats.totalEnrollments,
      icon: BarChart2,
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      change: "+5%",
    },
  ];

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "courses", label: "Manage Courses", icon: BookOpen },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "categories", label: "Categories", icon: Tag },
    { id: "reports", label: "Reports", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const filteredCourses = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  const Sidebar = () => (
    <aside className="w-64 flex-shrink-0 bg-gray-900 text-gray-300 flex flex-col min-h-screen">
      <div className="p-5 border-b border-gray-700/50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-sm">CourseHub</span>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            {user.email?.[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user.displayName || user.email?.split("@")[0]}
            </p>
            <span className="text-xs px-2 py-0.5 bg-purple-600/30 text-purple-300 rounded-full">
              Admin
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? "bg-primary-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-700/50 space-y-1">
        <Link
          href="/dashboard/user"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LayoutDashboard className="h-4 w-4" />
          User View
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-red-400 hover:bg-red-900/20 transition-colors"
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
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
        </div>

        <div className="p-5 md:p-8 max-w-6xl">
          {/* ─── OVERVIEW TAB ─── */}
          {activeTab === "overview" && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Overview
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                  Platform statistics and insights
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {overviewCards.map((card, i) => (
                  <div key={i} className="dashboard-card">
                    <div
                      className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}
                    >
                      <card.icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {loading ? "—" : card.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {card.label}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                      {card.change} this month
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 dashboard-card">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Revenue & User Growth
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                      />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                      />
                      <Tooltip contentStyle={{ borderRadius: "12px" }} />
                      <Legend iconType="circle" iconSize={8} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0284c7"
                        strokeWidth={2.5}
                        dot={false}
                        name="Revenue ($)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="users"
                        stroke="#d946ef"
                        strokeWidth={2.5}
                        dot={false}
                        name="New Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="dashboard-card">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Students by Level
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={enrollmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {enrollmentData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend iconType="circle" iconSize={8} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Courses by Category
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={categoryData} barSize={32}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                    />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <Tooltip contentStyle={{ borderRadius: "12px" }} />
                    <Bar
                      dataKey="courses"
                      fill="#0284c7"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ─── MANAGE COURSES TAB ─── */}
          {activeTab === "courses" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Manage Courses
                </h2>
                <Link
                  href="/items/add"
                  className="btn-primary text-sm py-2 px-4"
                >
                  + Add Course
                </Link>
              </div>
              <div className="dashboard-card">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="input-field w-full sm:w-80 text-sm py-2"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-700 text-left">
                        {[
                          "Title",
                          "Category",
                          "Level",
                          "Price",
                          "Rating",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="py-3 px-3 font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                      {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                              <td colSpan={6} className="py-3 px-3">
                                <div className="skeleton h-8 rounded-lg" />
                              </td>
                            </tr>
                          ))
                        : paginatedCourses.map((course: any) => (
                            <tr
                              key={course.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                            >
                              <td className="py-3 px-3">
                                <p className="font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs">
                                  {course.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {course.instructor}
                                </p>
                              </td>
                              <td className="py-3 px-3">
                                <span className="badge-primary">
                                  {course.category}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                                {course.level}
                              </td>
                              <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">
                                ${course.price}
                              </td>
                              <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                                ⭐ {course.rating}
                              </td>
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-1">
                                  <Link
                                    href={`/items/${course.id}`}
                                    className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-600 dark:text-primary-400 transition-colors"
                                    title="View"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </Link>
                                  <Link
                                    href={`/items/edit/${course.id}`}
                                    className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </Link>
                                  <button
                                    onClick={() =>
                                      handleDeleteCourse(course.id)
                                    }
                                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredCourses.length,
                      )}{" "}
                      of {filteredCourses.length}
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        Prev
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${currentPage === p ? "bg-primary-600 text-white border-primary-600" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                          >
                            {p}
                          </button>
                        ),
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ─── MANAGE USERS TAB ─── */}
          {activeTab === "users" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Manage Users
              </h2>
              <div className="dashboard-card">
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="skeleton h-12 rounded-xl" />
                    ))}
                  </div>
                ) : users.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700 text-left">
                          {[
                            "User",
                            "Email",
                            "Role",
                            "Joined",
                            "Provider",
                            "Actions",
                          ].map((h) => (
                            <th
                              key={h}
                              className="py-3 px-3 font-semibold text-gray-600 dark:text-gray-400"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                        {users.map((u: any) => (
                          <tr
                            key={u.uid}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                          >
                            <td className="py-3 px-3">
                              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                                {u.email?.[0].toUpperCase()}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-gray-700 dark:text-gray-300">
                              {u.email}
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`badge ${u.role === "admin" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : "badge-primary"}`}
                              >
                                {u.role || "user"}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-gray-500 dark:text-gray-400 text-xs">
                              {u.createdAt
                                ? new Date(u.createdAt).toLocaleDateString()
                                : "—"}
                            </td>
                            <td className="py-3 px-3 text-gray-500 dark:text-gray-400 capitalize">
                              {u.provider || "email"}
                            </td>
                            <td className="py-3 px-3">
                              <button
                                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                                title="Remove user"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <AlertTriangle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No users found in the database yet.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ─── CATEGORIES TAB ─── */}
          {activeTab === "categories" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Categories
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryData.map((cat, i) => (
                  <div
                    key={i}
                    className="dashboard-card flex items-center gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${COLORS[i]}20` }}
                    >
                      📚
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {cat.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cat.courses} courses
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ─── REPORTS TAB ─── */}
          {activeTab === "reports" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Reports
              </h2>
              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Monthly Revenue Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData} barSize={40}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px" }}
                      formatter={(v) => [`$${v}`, "Revenue"]}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#0284c7"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ─── SETTINGS TAB ─── */}
          {activeTab === "settings" && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Settings
              </h2>
              <div className="dashboard-card max-w-2xl">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Platform settings configuration panel. More settings options
                  coming soon.
                </p>
                <div className="mt-4 grid gap-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Maintenance Mode
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Temporarily disable access to the platform
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        User Registration
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow new user registrations
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-primary-600 rounded-full cursor-pointer" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
