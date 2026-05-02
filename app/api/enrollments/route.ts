import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// POST - Enroll a user in a course
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const body = await request.json();
    const { userId, courseId, courseName } = body;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "userId and courseId are required" },
        { status: 400 },
      );
    }

    // Check if already enrolled
    const existing = await db
      .collection("enrollments")
      .findOne({ userId, courseId });

    if (existing) {
      return NextResponse.json(
        { error: "Already enrolled in this course" },
        { status: 409 },
      );
    }

    // Create enrollment
    const enrollment = {
      userId,
      courseId,
      courseName: courseName || "Unknown Course",
      enrolledAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      progress: 0,
      hoursSpent: 0,
      completed: false,
    };

    const result = await db.collection("enrollments").insertOne(enrollment);

    return NextResponse.json(
      {
        success: true,
        enrollmentId: result.insertedId.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json(
      { error: "Failed to enroll in course" },
      { status: 500 },
    );
  }
}

// GET - Get all enrollments for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const enrollments = await db
      .collection("enrollments")
      .find({ userId })
      .sort({ enrolledAt: -1 })
      .toArray();

    return NextResponse.json({
      enrollments: enrollments.map((e) => ({
        ...e,
        _id: e._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 },
    );
  }
}
