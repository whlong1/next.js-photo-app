import GenreList from "./GenreList"
import SearchBar from './SearchBar'
import Link from "next/link"

const FilterTab = () => {
  return (
    <nav>
      <GenreList />
      <SearchBar />
      <Link href="/videos">Clear Results</Link>
    </nav>
  )
}

export default FilterTab