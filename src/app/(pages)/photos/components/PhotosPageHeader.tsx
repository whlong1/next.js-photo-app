// Components
import FilterChip from "./FilterChip"

interface PhotosPageHeaderProps {
  activeParams: { queryKey: string, queryValue: string }[]
}
const PhotosPageHeader = ({ activeParams }: PhotosPageHeaderProps) => {
  return (
    <header className="header">
      {activeParams.map((param) => (
        <FilterChip param={param} />
      ))}
    </header>
  )
}

export default PhotosPageHeader