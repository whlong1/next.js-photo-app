// Components
import FilterChip from "./components/FilterChip"
import GridToggle from "../../../../../components/PhotoGrids/GridToggle"
import ClearFiltersButton from "./components/ClearFiltersButton"

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
      <GridToggle />
    </header>
  )
}

export default PhotosPageHeader