// Components
import FilterSection from "./FilterSection"

// Constants
import { PHOTO_CATEGORIES, ASPECT_RATIOS } from "@/lib/constants"

const FilterNav = () => {
  return (
    <nav className="side-nav">
      <header className="header">
        <h2 className="text-sm">Browse</h2>
      </header>
      <FilterSection
        queryKey="category"
        queryValues={PHOTO_CATEGORIES}
      />
      <FilterSection
        queryKey="Aspect Ratio"
        queryValues={ASPECT_RATIOS}
      />
    </nav>
  )
}
export default FilterNav