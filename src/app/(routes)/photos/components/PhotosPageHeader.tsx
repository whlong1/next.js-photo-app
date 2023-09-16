// Components
import SearchBar from "./SearchBar"
import FilterChip from "./FilterChip"
import GridToggle from "./GridToggle"
import ClearFiltersButton from "./ClearFiltersButton"

interface PhotosPageHeaderProps {
  activeParams: { queryKey: string, queryValue: string }[]
}

const PhotosPageHeader = ({ activeParams }: PhotosPageHeaderProps) => {
  return (
    <header className="header">
      <h1 className="text-xl leading-none mb-[1px]">Browse</h1>
      <ClearFiltersButton activeParams={activeParams} />
      {activeParams.map((param, idx) => (
        <FilterChip key={idx} param={param} />
      ))}
      <SearchBar />
      <GridToggle />
    </header>
  )
}

export default PhotosPageHeader