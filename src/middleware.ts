// Middleware Configuration

// This example protects all routes including api/trpc routes.
// See https://clerk.com/docs/nextjs/middleware for more information.

// For custom sign in pages, don't add them to your publicRoutes. Add them to `.env`

// With the config below, all api endpoints are public.

//! Note: Clerk requires this file to be in the root or src directory.

import { authMiddleware } from "@clerk/nextjs"
import { redirectToSignIn } from '@clerk/nextjs'

// Add 'debug: true' to view logs:
export default authMiddleware({
  publicRoutes: ["/", "/about"],
  afterAuth(auth, req, evt) {
    console.log("After Auth")
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}