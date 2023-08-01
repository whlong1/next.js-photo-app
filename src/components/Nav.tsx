import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Nav = () => {
  return (
    <nav className="flex flex-row">
      <Link href="/">Home</Link>

      <SignedOut>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="/sign-in">Sign In</Link>
      </SignedOut>

      <SignedIn>
        <Link href="/videos">Videos</Link>
      </SignedIn>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </nav>
  )
}

export default Nav