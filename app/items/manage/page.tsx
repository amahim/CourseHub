"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Eye, Trash2, Search, BookOpen, Users, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageItemsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) { 
      router.push("/login?redirect=/items/manage"); 
      return; 
    }
    
    fetch("/api/courses")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => setCourses(d.courses || []))
      .catch(() => toast.error("Failed to load courses"))
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Course deleted!");
        setCourses(prev => prev.filter(c => c.id !== id));
      } else {
        toast.error("Failed to delete course.");
      }
    } catch {
      toast.error("Connection error.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = courses.filter(c =>
    c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Manage Courses</h1>
              <p className="text-primary-100 text-sm">View, edit, and manage your courses</p>
            </div>
            <Link href="/items/add" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors w-fit">
              <Plus className="h-4 w-4" /> Add New Course
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {[
            { icon: BookOpen, label: "Total Courses", value: courses.length, color: "text-primary-600 dark:text-primary-400" },
            { icon: Users, label: "Total Students", value: courses.reduce((s, c) => s + (c.students || 0), 0).toLocaleString(), color: "text-green-600 dark:text-green-400" },
            { icon: Star, label: "Avg Rating", value: courses.length ? (courses.reduce((s, c) => s + (c.rating || 0), 0) / courses.length).toFixed(1) : "—", color: "text-yellow-500 dark:text-yellow-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, category, or instructor..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-11 w-full"
          />
        </div>

        {/* Table */}
        {filtered.length > 0 ? (
          <>
            {/* Desktop */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    {["Course", "Category", "Level", "Price", "Students", "Rating", "Actions"].map(h => (
                      <th key={h} className={`px-5 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filtered.map(course => (
                    <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image src={course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400"} alt={course.title} fill className="object-cover" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1 max-w-[200px]">{course.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{course.instructor}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">{course.category}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium ${course.level === "Beginner" ? "text-green-600 dark:text-green-400" : course.level === "Advanced" ? "text-red-500 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}`}>{course.level || "—"}</span>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">${course.price}</td>
                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">{(course.students || 0).toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{course.rating || "—"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/items/${course.id}`} className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors" title="View">
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button onClick={() => handleDelete(course.id)} disabled={deletingId === course.id}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40" title="Delete">
                            {deletingId === course.id
                              ? <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                              : <Trash2 className="h-4 w-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filtered.map(course => (
                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="relative h-14 w-14 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image src={course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400"} alt={course.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{course.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div><span className="text-gray-500 dark:text-gray-400">Category:</span><div className="font-medium text-gray-900 dark:text-white">{course.category}</div></div>
                    <div><span className="text-gray-500 dark:text-gray-400">Price:</span><div className="font-semibold text-primary-600 dark:text-primary-400">${course.price}</div></div>
                    <div><span className="text-gray-500 dark:text-gray-400">Students:</span><div className="font-medium text-gray-900 dark:text-white">{(course.students || 0).toLocaleString()}</div></div>
                    <div><span className="text-gray-500 dark:text-gray-400">Rating:</span><div className="font-medium text-gray-900 dark:text-white">★ {course.rating || "—"}</div></div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/items/${course.id}`} className="flex-1 btn-secondary text-center py-2 text-sm dark:border-gray-600 dark:text-gray-300">
                      <Eye className="h-3.5 w-3.5 inline mr-1.5" />View
                    </Link>
                    <button onClick={() => handleDelete(course.id)} disabled={deletingId === course.id}
                      className="flex-1 py-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 font-medium transition-colors disabled:opacity-40">
                      <Trash2 className="h-3.5 w-3.5 inline mr-1.5" />Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery ? "No courses match your search" : "No courses yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              {searchQuery ? "Try a different keyword" : "Create your first course and start teaching"}
            </p>
            {!searchQuery && (
              <Link href="/items/add" className="btn-primary inline-flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Your First Course
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
