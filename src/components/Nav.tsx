import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Nav = () => {
  return (
    <nav className="flex flex-row justify-evenly w-full border-b border-black">
      <Link href="/">Home</Link>
      <Link href="/videos/new">Add Video</Link>
      <Link href="/photos/new">Add Photo</Link>

      <SignedOut>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="/sign-in">Sign In</Link>
      </SignedOut>

      <SignedIn>
        <Link href="/videos">Videos</Link>
      </SignedIn>

      <SignedIn>
        <Link href="/photos">Photos</Link>
      </SignedIn>

      <SignedIn>
        <Link href="/dashboard">Dashboard</Link>
      </SignedIn>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </nav>
  )
}

export default Nav