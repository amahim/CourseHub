"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { CheckCircle, Heart } from "lucide-react";
import toast from "react-hot-toast";

interface EnrollmentCardProps {
  course: {
    id: string;
    title: string;
    price: number;
  };
}

export default function EnrollmentCard({ course }: EnrollmentCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [enrolling, setEnrolling] = useState(false);
  const [wishlisting, setWishlisting] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll in courses");
      router.push(`/login?redirect=/items/${course.id}`);
      return;
    }

    setEnrolling(true);
    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          courseId: course.id,
          courseName: course.title,
        }),
      });

      if (res.ok) {
        toast.success("Successfully enrolled in the course!");
        router.push("/dashboard/user");
      } else if (res.status === 409) {
        toast.error("You're already enrolled in this course!");
      } else {
        toast.error("Failed to enroll. Please try again.");
      }
    } catch (error) {
      toast.error("Connection error. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      router.push(`/login?redirect=/items/${course.id}`);
      return;
    }

    setWishlisting(true);
    try {
      // TODO: Implement wishlist API
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error("Failed to add to wishlist");
    } finally {
      setWishlisting(false);
    }
  };

  return (
    <div className="card p-6 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white h-fit">
      <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
        ${course.price}
      </div>
      <button
        onClick={handleEnroll}
        disabled={enrolling}
        className="btn-primary w-full mb-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {enrolling ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enrolling...
          </>
        ) : (
          "Enroll Now"
        )}
      </button>
      <button
        onClick={handleWishlist}
        disabled={wishlisting}
        className="btn-secondary w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Heart className="h-4 w-4" />
        {wishlisting ? "Adding..." : "Add to Wishlist"}
      </button>
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
          This course includes:
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {[
            "Lifetime access",
            "Certificate of completion",
            "30-day money-back guarantee",
            "Access on mobile and desktop",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
