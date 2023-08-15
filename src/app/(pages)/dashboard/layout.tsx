import Link from "next/link"
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1>Dashboard Layout</h1>
      <nav>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/photos">Photos</Link>
      </nav>
      {children}
    </>
  )
}

export default DashboardLayout