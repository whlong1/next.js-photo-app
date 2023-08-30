import Link from "next/link"

const DashboardPhotosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="header">
        <Link className="header-element" href="/dashboard/photos">
          MY PHOTOS
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