import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// POST - Create or update a user in MongoDB after Firebase registration
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const body = await request.json();
    const { uid, email, displayName, photoURL, provider } = body;

    if (!uid || !email) {
      return NextResponse.json(
        { error: "uid and email are required" },
        { status: 400 },
      );
    }

    // Upsert: insert if new, update lastLogin if existing
    await db.collection("users").updateOne(
      { uid },
      {
        $set: {
          uid,
          email,
          displayName: displayName || null,
          photoURL: photoURL || null,
          provider: provider || "email",
          lastLogin: new Date().toISOString(),
        },
        $setOnInsert: {
          role: "user", // Default role for new users
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true },
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}

// GET - Fetch a user by uid (query param)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "uid is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");

    const user = await db.collection("users").findOne({ uid });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Serialize MongoDB _id to string
    const serializedUser = {
      ...user,
      _id: user._id.toString(),
    };

    return NextResponse.json({ user: serializedUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}
