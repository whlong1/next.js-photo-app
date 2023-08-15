import Link from "next/link"
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <nav className="flex flex-col border">
        PROFILE
        <Link className="link" href="/dashboard">Dashboard</Link>
        <Link className="link" href="/dashboard/photos">Photos</Link>
        <Link className="link" href="/dashboard/videos">Videos</Link>
      </nav>
      <section className="flex flex-col w-full">
        {children}
      </section>
    </main>
  )
}

export default DashboardLayout