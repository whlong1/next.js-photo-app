import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

const Nav = () => {
  return (
    <nav className="flex flex-row">
      <Link href="/">Home</Link>
      <Link href="/sign-up">Sign Up</Link>
      <Link href="/sign-in">Sign In</Link>
      <UserButton afterSignOutUrl="/" />
    </nav>
  )
}

export default Nav