import { Video } from '@/types/models'
import GenreList from "./GenreList"
import SearchBar from './SearchBar'

interface FilterTabProps {
  videos: Video[];
}

const FilterTab = ({ videos }: FilterTabProps) => {

  return (
    <nav>

      <GenreList />
      <SearchBar />

    </nav>
  )
}

export default FilterTab