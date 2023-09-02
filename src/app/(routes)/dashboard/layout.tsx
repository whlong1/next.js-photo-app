import Link from "next/link"
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <nav className="side-nav">
        <header className="header">
          <Link href="/dashboard">
            <h2>Dashboard</h2>
          </Link>
        </header>
        <section>
          <Link className="side-nav-item" href="/dashboard/photos">Photos</Link>
        </section>
      </nav>
      <section className="flex flex-col w-full">
        {children}
      </section>
    </main>
  )
}

export default DashboardLayout