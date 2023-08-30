// Components
import FilterSection from "./FilterSection"

const FilterNav = () => {
  return (
    <nav className="side-nav">
      <header className="header">
        <h2>Browse</h2>
      </header>
      <FilterSection
        queryKey="category"
        queryValues={["people", "food", "nature"]}
      />
      <FilterSection
        queryKey="category"
        queryValues={["people", "food", "nature"]}
      />
    </nav>
  )
}
export default FilterNav