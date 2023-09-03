// Components
import SearchBar from "./SearchBar"
import FilterChip from "./FilterChip"
import ClearFiltersButton from "./ClearFiltersButton"

interface PhotosPageHeaderProps {
  activeParams: { queryKey: string, queryValue: string }[]
}
const PhotosPageHeader = ({ activeParams }: PhotosPageHeaderProps) => {
  return (
    <header className="header">
      <h1>Photos</h1>
      <ClearFiltersButton activeParams={activeParams} />
      {activeParams.map((param) => (
        <FilterChip param={param} />
      ))}
      <SearchBar />
    </header>
  )
}

export default PhotosPageHeader