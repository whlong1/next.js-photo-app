// Components
import FilterSection from "./FilterSection"

const FilterNav = () => {
  return (
    <nav className="flex flex-col border-r w-80">
      <header className="header justify-between">
        <h2 className="text-sm">Filters</h2>
      </header>
      <FilterSection
        queryKey="category"
        queryValues={["people", "food", "nature"]}
      />
    </nav>
  )
}
export default FilterNav