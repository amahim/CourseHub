import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(_req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const [
      courseCount,
      userCount,
      contactCount,
      enrollmentCount,
      reviewCount,
      users,
    ] = await Promise.all([
      db.collection("courses").countDocuments(),
      db.collection("users").countDocuments(),
      db.collection("contacts").countDocuments(),
      db.collection("enrollments").countDocuments(),
      db.collection("reviews").countDocuments(),
      db
        .collection("users")
        .find(
          {},
          {
            projection: {
              uid: 1,
              email: 1,
              displayName: 1,
              role: 1,
              createdAt: 1,
              provider: 1,
              lastLogin: 1,
            },
          },
        )
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray(),
    ]);

    // Calculate revenue based on enrollments (mock calculation)
    const totalRevenue = enrollmentCount * 49.99; // Assuming avg course price

    return NextResponse.json({
      totalCourses: courseCount,
      totalUsers: userCount,
      totalContacts: contactCount,
      totalEnrollments: enrollmentCount,
      totalReviews: reviewCount,
      totalRevenue: Math.round(totalRevenue),
      users: users.map((u) => ({ ...u, _id: u._id.toString() })),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats." },
      { status: 500 },
    );
  }
}
