import Link from "next/link"

interface ClearFiltersButtonProps {
  activeParams: { queryKey: string, queryValue: string }[]
}
const ClearFiltersButton = ({ activeParams }: ClearFiltersButtonProps) => {
  const active = activeParams.length
  return (
    <div className="header-element bg-white ml-4">
      {active
        ? <Link href="/photos">Clear All</Link>
        : <p className="cursor-default">No Filters</p>
      }
    </div>
  )
}

export default ClearFiltersButton