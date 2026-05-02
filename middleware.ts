import { NextRequest, NextResponse } from "next/server";

// Note: This middleware is minimal because we're using client-side Firebase auth
// Protected routes are enforced on the client side in each page component
// This is just a fallback for direct URL access

export function middleware(req: NextRequest) {
  // Allow all requests to pass through
  // Protection happens on client-side via useAuth hook in each protected page
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/items/add",
    "/items/manage",
  ],
};
