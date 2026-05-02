"use client";

import { useState, useEffect } from "react";
import { Star, Send, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewSection({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?courseId=${courseId}`)
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Please log in to leave a review.");
      return;
    }
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (comment.trim().length < 5) {
      setError("Comment must be at least 5 characters.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          userId: user.uid,
          userName: user.displayName || user.email?.split("@")[0],
          rating,
          comment,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit review.");
        return;
      }
      setReviews((prev) => [data.review, ...prev]);
      setRating(0);
      setComment("");
      setSuccess("Review submitted successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="card dark:bg-gray-800 dark:border-gray-700 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Student Reviews{" "}
          {reviews.length > 0 && (
            <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">
              ({reviews.length})
            </span>
          )}
        </h2>
        {avgRating && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${Number(avgRating) >= s ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
                />
              ))}
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              {avgRating}
            </span>
          </div>
        )}
      </div>

      {/* Existing Reviews */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="skeleton h-20 rounded-xl" />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4 mb-8">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                    {rev.userName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {rev.userName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${rev.rating >= s ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          No reviews yet. Be the first to review this course!
        </p>
      )}

      {/* Write a Review Form */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Write a Review
        </h3>
        {!user ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <a
              href="/login"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Log in
            </a>{" "}
            to leave a review.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating Picker */}
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Your Rating
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(s)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${(hoverRating || rating) >= s ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Share your experience with this course..."
                className="input-field w-full resize-none text-sm"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">
                {comment.length}/500
              </p>
            </div>
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm">
                {success}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center gap-2 text-sm disabled:opacity-60"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
