// Middleware Configuration

// This example protects all routes including api/trpc routes.
// See https://clerk.com/docs/nextjs/middleware for more information.

// For custom sign in pages, don't add them to your publicRoutes. Add them to `.env`

//! Note: Clerk requires this file to be in the root or src directory.

import { authMiddleware } from "@clerk/nextjs"

const publicClientPaths = ["/"]
const publicAPIPaths = ["/api/greetings"]

// Add 'debug: true' to view logs:
export default authMiddleware({
  publicRoutes: [
    ...publicAPIPaths,
    ...publicClientPaths,
  ],
  afterAuth(auth, req, evt) {
    console.log("After Auth")
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}