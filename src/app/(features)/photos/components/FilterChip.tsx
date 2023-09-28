"use client"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

interface FilterChipProps { param: { queryKey: string, queryValue: string } }
const FilterChip = ({ param }: FilterChipProps) => {
  const { queryParams, setQueryParams } = useQueryManager()
  const chipText = param.queryValue[0].toUpperCase() + param.queryValue.slice(1)

  // Passing an empty string as the queryValue argument 
  // to setQueryParams will remove the queryKey from the URL:
  const handleClick = () => setQueryParams(param.queryKey, "")

  return (
    <div className="header-element cursor-pointer ml-3" onClick={handleClick}>
      <p>{chipText}</p>
      <button className="ml-2">X</button>
    </div>
  )
}

export default FilterChip
