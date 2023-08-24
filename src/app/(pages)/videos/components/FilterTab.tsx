import Link from "next/link"

// Components
import YearList from "./YearList"
import GenreList from "./GenreList"
import SearchBar from '../../photos/components/SearchBar'

const FilterTab = () => {
  return (
    <nav>
      <SearchBar />
      <GenreList />
      <YearList />
      <Link href="/videos">Clear Results</Link>
    </nav>
  )
}

export default FilterTab