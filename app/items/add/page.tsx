"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Web Development",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Programming",
  "AI/ML",
  "Personal Development",
];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function AddItemPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "",
    level: "Beginner",
    instructor: "",
    duration: "",
    image: "",
    features: ["", "", ""],
  });

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

  if (!user) {
    router.push("/login?redirect=/items/add");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () =>
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const removeFeature = (i: number) =>
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== i),
    }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.title.trim()) e.title = "Title is required.";
    if (!formData.shortDescription.trim())
      e.shortDescription = "Short description is required.";
    if (!formData.fullDescription.trim())
      e.fullDescription = "Full description is required.";
    if (!formData.price || Number(formData.price) < 0)
      e.price = "Valid price is required.";
    if (!formData.category) e.category = "Category is required.";
    if (!formData.instructor.trim())
      e.instructor = "Instructor name is required.";
    if (!formData.duration.trim()) e.duration = "Duration is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          features: formData.features.filter((f) => f.trim() !== ""),
          rating: 0,
          students: 0,
          createdAt: new Date().toISOString(),
          userId: user.uid,
          image:
            formData.image ||
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
        }),
      });
      if (res.ok) {
        toast.success("Course added successfully!");
        router.push("/items/manage");
      } else {
        toast.error("Failed to add course. Please try again.");
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ id, label, required, error, children }: any) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-gray-900 text-white py-12">
        <div className="container-custom">
          <Link
            href="/items/manage"
            className="inline-flex items-center text-primary-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Manage Courses
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Add New Course</h1>
              <p className="text-primary-100 mt-1 text-sm">
                Share your knowledge with the world
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                Basic Information
              </h2>
              <div className="space-y-5">
                <Field
                  id="title"
                  label="Course Title"
                  required
                  error={errors.title}
                >
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`input-field w-full ${errors.title ? "border-red-400" : ""}`}
                    placeholder="e.g., Complete Web Development Bootcamp"
                  />
                </Field>
                <Field
                  id="shortDescription"
                  label="Short Description"
                  required
                  error={errors.shortDescription}
                >
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={2}
                    className={`input-field w-full ${errors.shortDescription ? "border-red-400" : ""}`}
                    placeholder="Brief overview shown in course cards (1-2 sentences)"
                  />
                </Field>
                <Field
                  id="fullDescription"
                  label="Full Description"
                  required
                  error={errors.fullDescription}
                >
                  <textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows={5}
                    className={`input-field w-full ${errors.fullDescription ? "border-red-400" : ""}`}
                    placeholder="Detailed course description, prerequisites, and what students will achieve..."
                  />
                </Field>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                Course Details
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                <Field
                  id="price"
                  label="Price ($)"
                  required
                  error={errors.price}
                >
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`input-field w-full ${errors.price ? "border-red-400" : ""}`}
                    placeholder="99.99"
                  />
                </Field>
                <Field
                  id="category"
                  label="Category"
                  required
                  error={errors.category}
                >
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`input-field w-full ${errors.category ? "border-red-400" : ""}`}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="level" label="Level" required>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="input-field w-full"
                  >
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  id="instructor"
                  label="Instructor Name"
                  required
                  error={errors.instructor}
                >
                  <input
                    type="text"
                    id="instructor"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className={`input-field w-full ${errors.instructor ? "border-red-400" : ""}`}
                    placeholder="Your full name"
                  />
                </Field>
                <Field
                  id="duration"
                  label="Duration"
                  required
                  error={errors.duration}
                >
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className={`input-field w-full ${errors.duration ? "border-red-400" : ""}`}
                    placeholder="e.g., 40 hours"
                  />
                </Field>
                <Field id="image" label="Thumbnail URL">
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="input-field w-full"
                    placeholder="https://..."
                  />
                </Field>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  What Students Will Learn
                </h2>
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium"
                >
                  <Plus className="h-4 w-4" /> Add Point
                </button>
              </div>
              <div className="space-y-3">
                {formData.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(i, e.target.value)}
                      className="input-field flex-1"
                      placeholder={`Learning outcome ${i + 1}`}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pb-8">
              <Link
                href="/items/manage"
                className="btn-secondary dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
                {loading ? "Publishing..." : "Publish Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
