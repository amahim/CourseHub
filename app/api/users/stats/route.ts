import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - Fetch user statistics (enrollments, progress, etc.)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "uid is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    // Get user data
    const user = await db.collection("users").findOne({ uid });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get enrollments if they exist
    const enrollments = await db
      .collection("enrollments")
      .find({ userId: uid })
      .toArray();

    // Get reviews by this user
    const reviews = await db
      .collection("reviews")
      .find({ userId: uid })
      .toArray();

    // Calculate statistics
    const totalEnrolled = enrollments.length;
    const completedCourses = enrollments.filter(
      (e) => e.progress === 100,
    ).length;
    const inProgressCourses = enrollments.filter(
      (e) => e.progress > 0 && e.progress < 100,
    ).length;
    const totalHours = enrollments.reduce(
      (sum, e) => sum + (e.hoursSpent || 0),
      0,
    );
    const avgProgress =
      totalEnrolled > 0
        ? Math.round(
            enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) /
              totalEnrolled,
          )
        : 0;

    return NextResponse.json({
      stats: {
        totalEnrolled,
        completedCourses,
        inProgressCourses,
        totalHours,
        avgProgress,
        totalReviews: reviews.length,
      },
      enrollments: enrollments.map((e) => ({
        ...e,
        _id: e._id.toString(),
      })),
      recentActivity: enrollments
        .sort(
          (a, b) =>
            new Date(b.lastAccessed || b.enrolledAt).getTime() -
            new Date(a.lastAccessed || a.enrolledAt).getTime(),
        )
        .slice(0, 5)
        .map((e) => ({
          ...e,
          _id: e._id.toString(),
        })),
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 },
    );
  }
}
