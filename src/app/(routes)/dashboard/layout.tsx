import Link from "next/link"
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <nav className="side-nav">
        <header className="header">
          <Link href="/dashboard">
            <h2 className="text-sm">Dashboard</h2>
          </Link>
        </header>
        <Link className="nav-item" href="/dashboard/account">Account</Link>
        <Link className="nav-item" href="/dashboard/photos">Photos</Link>
        <Link className="nav-item" href="/dashboard/favorites">Favorites</Link>
        <Link className="nav-item" href="/dashboard/favorites">Analytics</Link>
      </nav>
      <section className="flex flex-col w-full">
        {children}
      </section>
    </main>
  )
}

export default DashboardLayout