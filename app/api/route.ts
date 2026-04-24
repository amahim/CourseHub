import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "CourseHub API",
    version: "1.0.0",
    endpoints: {
      courses: "/api/courses",
      courseById: "/api/courses/[id]",
    },
  });
}
