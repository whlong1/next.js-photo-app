// Components
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import SearchBar from "@/app/(features)/photos/components/PhotosPageHeader/components/SearchBar"

const Nav = () => {
  return (
    <nav className="top-level-nav">
      <Link className="flex items-center mr-4" href="/">
        <Image
          width={28}
          height={28}
          priority={true}
          src="/assets/branding/logo.svg"
          alt="Logo"
        />
      </Link>

      <SignedOut>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="/sign-in">Sign In</Link>
      </SignedOut>


      <SignedIn>
        <ul className="w-full flex ml-4">
          <li className="mr-4 hover:underline"><Link href="/photos">Browse</Link></li>
          <li className="mr-4 hover:underline"><Link href="/dashboard/files">Dashboard</Link></li>
        </ul>
      </SignedIn>

      <SearchBar />

      <div className="ml-auto border rounded-full w-[34px] h-[34px]">
        <SignedIn >
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

    </nav>
  )
}

export default Nav