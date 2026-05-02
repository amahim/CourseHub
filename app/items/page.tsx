"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  ArrowUpDown,
} from "lucide-react";
import SkeletonCard from "@/components/ui/SkeletonCard";

const ITEMS_PER_PAGE = 8;

export default function ItemsPage() {
  const searchParams = useSearchParams();
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setAllCourses(data.courses || []))
      .catch(() => setAllCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...Array.from(
      new Set(allCourses.map((c: any) => c.category).filter(Boolean)),
    ),
  ];
  const levels = [
    "All",
    ...Array.from(new Set(allCourses.map((c: any) => c.level).filter(Boolean))),
  ];

  const filteredAndSorted = useMemo(() => {
    let results = allCourses.filter((course: any) => {
      const matchesSearch =
        !searchQuery ||
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      const matchesPrice =
        (course.price || 0) >= priceRange[0] &&
        (course.price || 0) <= priceRange[1];
      const matchesRating = (course.rating || 0) >= minRating;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesPrice &&
        matchesRating
      );
    });

    switch (selectedSort) {
      case "price-asc":
        results = [...results].sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        results = [...results].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        results = [...results].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0),
        );
        break;
      case "popular":
        results = [...results].sort(
          (a, b) => (b.students || 0) - (a.students || 0),
        );
        break;
      case "newest":
        results = [...results].sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        );
        break;
    }
    return results;
  }, [
    allCourses,
    searchQuery,
    selectedCategory,
    selectedLevel,
    priceRange,
    minRating,
    selectedSort,
  ]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredAndSorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setPriceRange([0, 500]);
    setMinRating(0);
    setSelectedSort("newest");
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedLevel,
    priceRange,
    minRating,
    selectedSort,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-14">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Explore Courses
          </h1>
          <p className="text-lg text-primary-100">
            Discover the perfect course to advance your career
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses by title, description, or instructor..."
            className="input-field pl-12 py-3.5 text-base shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 sticky top-20 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Reset all
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field text-sm py-2"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="input-field text-sm py-2"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range: $0 – ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={10}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Rating: {minRating}★
                </label>
                <div className="flex gap-1">
                  {[0, 3, 3.5, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`flex-1 py-1 text-xs rounded-lg border transition-colors ${minRating === r ? "bg-primary-600 text-white border-primary-600" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary-400"}`}
                    >
                      {r === 0 ? "All" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary-400 transition-colors"
                >
                  <Filter className="h-4 w-4" /> Filters
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filteredAndSorted.length}
                  </span>{" "}
                  courses found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : paginatedCourses.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginatedCourses.map((course: any) => (
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
                        <div className="absolute top-3 left-3">
                          <span className="badge-primary text-xs">
                            {course.level}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 px-2 py-0.5 rounded-lg text-sm font-bold text-primary-600 dark:text-primary-400 shadow">
                          ${course.price}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                          {course.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-2 text-sm">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-1">
                          {course.shortDescription}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                              {course.rating}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {(course.students || 0).toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {course.duration}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate">
                          By {course.instructor}
                        </p>
                        <Link
                          href={`/items/${course.id}`}
                          className="btn-primary w-full text-center text-sm py-2 mt-auto"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPages ||
                          Math.abs(p - currentPage) <= 1,
                      )
                      .reduce<(number | "...")[]>((acc, p, i, arr) => {
                        if (i > 0 && (p as number) - (arr[i - 1] as number) > 1)
                          acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, i) =>
                        item === "..." ? (
                          <span
                            key={`ellipsis-${i}`}
                            className="px-2 text-gray-400"
                          >
                            …
                          </span>
                        ) : (
                          <button
                            key={item}
                            onClick={() => setCurrentPage(item as number)}
                            className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${currentPage === item ? "bg-primary-600 text-white" : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                          >
                            {item}
                          </button>
                        ),
                      )}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filters
                </p>
                <button onClick={resetFilters} className="btn-secondary">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
