import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - Fetch all courses
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");
    const courses = await db
      .collection("courses")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Serialize for Next.js serverless
    return NextResponse.json({ courses: JSON.parse(JSON.stringify(courses)) });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}

// POST - Create a new course
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const body = await request.json();
    const newCourse = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("courses").insertOne(newCourse);

    return NextResponse.json(
      {
        success: true,
        course: newCourse,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
