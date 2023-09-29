"use client"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

interface QueryTabProps { queryKey: string; queryValue: string; }
const QueryTab = ({ queryValue, queryKey }: QueryTabProps) => {
  const { queryParams, setQueryParams } = useQueryManager()
  const isQueryActive = queryParams.get(queryKey) === queryValue
  const handleClick = () => setQueryParams(queryKey, queryValue)

  return (
    <li className="text-xs mt-4 flex cursor-pointer" onClick={handleClick}>
      <input
        id=""
        name=""
        type="checkbox"
        checked={isQueryActive}
        className="checkbox mr-4 cursor-pointer"
      />
      <span className="text-grey-blue font-semibold cursor-pointer">
        {queryValue[0].toUpperCase() + queryValue.slice(1)}
      </span>
    </li>
  )
}

export default QueryTab