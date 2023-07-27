// Middleware Configuration
import { authMiddleware } from "@clerk/nextjs"

// This example protects all routes including api/trpc routes.
// See https://clerk.com/docs/nextjs/middleware for more information.

//! Note: Clerk requires this file to be in the root or src directory.

const publicAPIPaths = ["/api/hello"]
const publicClientPaths = ["/", "/sign-in*", "/sign-up*"]

export default authMiddleware({
  publicRoutes: [...publicClientPaths, ...publicAPIPaths]
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
