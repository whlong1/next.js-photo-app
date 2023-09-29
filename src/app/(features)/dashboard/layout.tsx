// Components
import Link from "next/link"
import Menu from "@/components/Menu"
import ArrowButton from "../../../components/ArrowButton"

// Types 
import { MenuElements } from "@/types/elements"

const MenuLink = ({ endpoint }: { endpoint: string }) => {
  const title = endpoint[0].toLocaleUpperCase() + endpoint.slice(1)
  return (
    <Link className="px-4 w-full flex" href={`/dashboard/${endpoint}`}>
      <div className="nav-item">
        <p className="item-title">{title}</p>
        <ArrowButton isOpen={false} />
      </div>
    </Link>
  )
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dashboardEndpoints = [
    "account",
    "files",
    "favorites"
  ]

  const menuElements: MenuElements = {
    name: <h2 className="text-sm">Dashboard</h2>,
    content: (
      <>
        {dashboardEndpoints.map((ep) => (
          <MenuLink key={ep} endpoint={ep} />
        ))}
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