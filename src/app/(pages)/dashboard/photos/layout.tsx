import Link from "next/link"

const DashboardPhotosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>
        <Link className="tab" href="/dashboard/photos">MY PHOTOS</Link>
        <Link className="tab" href="/dashboard/photos/new">NEW PHOTO</Link>
      </nav>
      {children}
    </>

  )
}

export default DashboardPhotosLayout