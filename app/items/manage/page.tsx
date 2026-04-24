"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Eye, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageItemsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not logged in
  if (!user) {
    router.push("/login");
    return null;
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses || []);
      } else {
        toast.error("Failed to load courses");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to connect to database");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Course deleted successfully!");
        setCourses(courses.filter((course) => course.id !== id));
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course. Please try again.");
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Manage Courses</h1>
              <p className="text-primary-100">
                View, edit, and manage your courses
              </p>
            </div>
            <Link
              href="/items/add"
              className="mt-4 md:mt-0 inline-flex items-center btn-primary bg-white text-primary-700 hover:bg-primary-50"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Course
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {courses.length}
            </div>
            <div className="text-gray-600">Total Courses</div>
          </div>
          <div className="card p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {courses
                .reduce((sum, c) => sum + (c.students || 0), 0)
                .toLocaleString()}
            </div>
            <div className="text-gray-600">Total Students</div>
          </div>
          <div className="card p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {(
                courses.reduce((sum, c) => sum + (c.rating || 0), 0) /
                  courses.length || 0
              ).toFixed(1)}
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Courses Table/Grid */}
        {filteredCourses.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCourses.map((course) => (
                      <tr
                        key={course.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={
                                  course.image ||
                                  "https://via.placeholder.com/400"
                                }
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                {course.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {course.instructor}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                            {course.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          ${course.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {course.students?.toLocaleString() || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="text-sm font-semibold">
                              {course.rating || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/items/${course.id}`}
                              className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(course.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="card p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={course.image || "https://via.placeholder.com/400"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {course.instructor}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <div className="font-medium">{course.category}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Price:</span>
                      <div className="font-semibold text-primary-600">
                        ${course.price}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Students:</span>
                      <div className="font-medium">
                        {course.students?.toLocaleString() || 0}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Rating:</span>
                      <div className="font-medium">★ {course.rating || 0}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/items/${course.id}`}
                      className="flex-1 btn-secondary text-center py-2"
                    >
                      <Eye className="h-4 w-4 inline mr-2" />
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 inline mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 card">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search"
                : "Get started by adding your first course"}
            </p>
            {!searchQuery && (
              <Link
                href="/items/add"
                className="btn-primary inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Course
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
