import Link from "next/link"

interface ClearFiltersButtonProps { activeParams: { queryKey: string, queryValue: string }[] }
const ClearFiltersButton = ({ activeParams }: ClearFiltersButtonProps) => {
  const active = activeParams.length
  return (
    <Link className={`header-element`} href="/photos">
      {active ? "Clear All" : "No Filters"}
    </Link>
  )
}

export default ClearFiltersButton