// Components
import Link from "next/link"
import Menu from "@/components/Menu"

// Types 
import { MenuElements } from "@/types/elements"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const menuElements: MenuElements = {
    name: <h2 className="text-sm">Dashboard</h2>,
    content: (
      <>
        <Link className="nav-item" href="/dashboard/account">Account</Link>
        <Link className="nav-item" href="/dashboard/photos">Photos</Link>
        <Link className="nav-item" href="/dashboard/favorites">Favorites</Link>
        <Link className="nav-item" href="/dashboard/analytics">Analytics</Link>
      </>
    )
  }

  return (
    <main className="flex">
      <Menu menuElements={menuElements} />
      <section className="flex flex-col w-full">
        {children}
      </section>
    </main>
  )
}

export default DashboardLayout