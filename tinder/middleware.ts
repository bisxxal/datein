import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default withAuth( async function middleware(req: NextRequest) {
    // Allow access for authenticated users
    const { nextUrl } = req;
    const token = await getToken({ req })
    if (token && nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/match", req.url));
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow if user is logged in
    },
    pages: {
      signIn: "/sign-in", // redirect here if not authenticated
    },
  }
)

export const config = {
  matcher: [
    "/match/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/chat/:path*",
    "/profile/editprofile"
  ],
}
