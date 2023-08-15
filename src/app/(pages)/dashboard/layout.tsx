import Link from "next/link"
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <nav className="flex flex-col border">
        Side Nav
        <Link className="link" href="/dashboard">Dashboard</Link>
        <Link className="link" href="/dashboard/photos">Photos</Link>
      </nav>
      <section className="flex flex-col">
        {children}
      </section>
    </main>
  )
}

export default DashboardLayout