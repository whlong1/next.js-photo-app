import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Nav = () => {
  return (
    <nav className="top-level-nav">
      <Link href="/">
        <img className="w-8" src="/assets/branding/temp-logo.png" alt="Logo" />
      </Link>

      <SignedOut>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="/sign-in">Sign In</Link>
      </SignedOut>


      <SignedIn>
        <ul className="w-full flex ml-4">
          <li className="mr-4 hover:underline"><Link href="/photos">Browse</Link></li>
          <li className="mr-4 hover:underline"><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </SignedIn>


      <div className="ml-auto border rounded-full">
        <SignedIn >
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Nav