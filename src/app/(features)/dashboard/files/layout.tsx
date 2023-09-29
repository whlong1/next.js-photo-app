import Link from "next/link"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="header">
        <h1>Recent Files</h1>
        <Link className="ml-auto header-element" href="/dashboard/photos?new=true">
          New Photo
        </Link>
      </header>
      {children}
    </>
  )
}

export default Layout