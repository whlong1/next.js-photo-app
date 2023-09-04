import Link from "next/link"

const DashboardPhotosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="header">
        <h1>Your Photos</h1>
        <Link className="header-element" href="/dashboard/photos">
          PHOTOS
        </Link>
        <Link className="header-element" href="/dashboard/photos/new">
          NEW PHOTO
        </Link>
      </header>
      {children}
    </>
  )
}

export default DashboardPhotosLayout