import Menu from "./components/Menu/Menu"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <Menu />
      <section className="flex flex-col w-full">
        {children}
      </section>
    </main>
  )
}

export default DashboardLayout