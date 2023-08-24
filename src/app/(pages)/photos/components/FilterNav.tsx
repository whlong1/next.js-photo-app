// Components
import Link from "next/link"
import FilterSection from "./FilterSection"

const FilterNav = () => {

  return (
    <nav className="flex flex-col border-r w-80">
      <header className="header justify-between">
        <h2>FILTERS</h2>
        <Link href="/photos">CLEAR</Link>
      </header>
      <FilterSection
        queryKey="category"
        queryValues={["people", "food", "nature"]}
      />
    </nav>
  )
}
export default FilterNav