import Link from "next/link"
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const linkClassNames = "flex items-center justify-between text-xs leading-none h-[45px] p-4 border-b"

  return (
    <main className="flex">
      <nav className="side-nav">
        <header className="header">
          <Link href="/dashboard">
            <h2 className="text-sm">Dashboard</h2>
          </Link>
        </header>
        <Link className={linkClassNames} href="/dashboard/account">Account</Link>
        <Link className={linkClassNames} href="/dashboard/photos">Photos</Link>
        <Link className={linkClassNames} href="/dashboard/favorites">Favorites</Link>
        <Link className={linkClassNames} href="/dashboard/favorites">Analytics</Link>
      </nav>
      <section className="flex flex-col w-full">
        {children}
      </section>
    </main>
  )
}

export default DashboardLayout