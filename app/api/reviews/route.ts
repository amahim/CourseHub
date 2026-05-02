import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    if (!courseId) return NextResponse.json({ error: "courseId is required." }, { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");
    const reviews = await db.collection("reviews").find({ courseId }).sort({ createdAt: -1 }).limit(20).toArray();

    return NextResponse.json({ reviews: reviews.map(r => ({ ...r, _id: r._id.toString() })) });
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { courseId, userId, userName, rating, comment } = await req.json();

    if (!courseId || !userId || !rating || !comment?.trim()) {
      return NextResponse.json({ error: "courseId, userId, rating, and comment are required." }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    if (comment.trim().length < 5) {
      return NextResponse.json({ error: "Comment must be at least 5 characters." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const existing = await db.collection("reviews").findOne({ courseId, userId });
    if (existing) {
      return NextResponse.json({ error: "You have already reviewed this course." }, { status: 409 });
    }

    const review = {
      courseId,
      userId,
      userName: userName || "Anonymous",
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date(),
    };
    const result = await db.collection("reviews").insertOne(review);
    return NextResponse.json({ review: { ...review, _id: result.insertedId.toString() } });
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  }
}
