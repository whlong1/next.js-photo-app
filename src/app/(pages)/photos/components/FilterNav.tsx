import Link from "next/link"
const FilterNav = () => {
  return (
    <nav className="flex flex-col border w-80">
    <h2>Filters</h2>
    <Link className="link" href="/">Tag Example</Link>
  </nav>
  )
}
export default FilterNav