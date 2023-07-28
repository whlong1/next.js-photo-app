import Link from "next/link"

const Nav = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/sign-up">Sign Up</Link>
      <Link href="/sign-in">Sign In</Link>
    </nav>
  )
}

export default Nav