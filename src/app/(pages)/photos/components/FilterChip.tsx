"use client"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

interface FilterChipProps { param: { queryKey: string, queryValue: string } }
const FilterChip = ({ param }: FilterChipProps) => {
  const { queryParams, setQueryParams } = useQueryManager()
  const chipText = param.queryValue[0].toUpperCase() + param.queryValue.slice(1)
  const chipClassNames = "inline-flex items-center justify-start rounded bg-slate-500 bg-opacity-40 text-white text-sm py-1 px-3"

  // Passing an empty string as the queryValue argument 
  // to setQueryParams will remove the queryKey from the URL:
  const handleClick = () => setQueryParams(param.queryKey, "")

  return (
    <div className={chipClassNames}>
      <p>{chipText}</p>
      <button onClick={handleClick} className="ml-2">X</button>
    </div>
  )
}

export default FilterChip