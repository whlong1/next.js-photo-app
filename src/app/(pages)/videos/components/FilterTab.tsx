import Link from "next/link"

// Components
import YearList from "./YearList"
import GenreList from "./GenreList"
import SearchBar from './SearchBar'

const FilterTab = () => {
  return (
    <nav>
      <GenreList />
      <SearchBar />
      <YearList />
      <Link href="/videos">Clear Results</Link>
    </nav>
  )
}

export default FilterTab