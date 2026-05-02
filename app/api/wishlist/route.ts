import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// POST - Add to wishlist
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const body = await request.json();
    const {
      userId,
      courseId,
      courseName,
      courseImage,
      coursePrice,
      courseCategory,
    } = body;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "userId and courseId are required" },
        { status: 400 },
      );
    }

    // Check if already in wishlist
    const existing = await db
      .collection("wishlist")
      .findOne({ userId, courseId });

    if (existing) {
      return NextResponse.json(
        { error: "Already in wishlist" },
        { status: 409 },
      );
    }

    const item = {
      userId,
      courseId,
      courseName: courseName || "Unknown Course",
      courseImage: courseImage || "",
      coursePrice: coursePrice || 0,
      courseCategory: courseCategory || "",
      addedAt: new Date().toISOString(),
    };

    const result = await db.collection("wishlist").insertOne(item);

    return NextResponse.json(
      { success: true, wishlistId: result.insertedId.toString() },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: "Failed to add to wishlist" },
      { status: 500 },
    );
  }
}

// GET - Get wishlist for a user
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

    const items = await db
      .collection("wishlist")
      .find({ userId })
      .sort({ addedAt: -1 })
      .toArray();

    return NextResponse.json({
      wishlist: items.map((i) => ({ ...i, _id: i._id.toString() })),
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 },
    );
  }
}
