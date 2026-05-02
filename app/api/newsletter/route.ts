import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email?.trim()) return NextResponse.json({ error: "Email is required." }, { status: 400 });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");
    const existing = await db.collection("newsletter").findOne({ email: email.trim().toLowerCase() });
    if (existing) return NextResponse.json({ message: "Already subscribed!" });

    await db.collection("newsletter").insertOne({ email: email.trim().toLowerCase(), subscribedAt: new Date() });
    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Subscription failed." }, { status: 500 });
  }
}
