"use client"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

interface QueryTabProps { queryKey: string; queryValue: string; }
const QueryTab = ({ queryValue, queryKey }: QueryTabProps) => {
  const { queryParams, setQueryParams } = useQueryManager()
  const isQueryActive = queryParams.get(queryKey) === queryValue

  const selectedStyle = isQueryActive ? "" : ""
  const baseStyle = "font-grey-blue font-semibold"
  const conditionalClass = `${baseStyle} ${selectedStyle}`

  const handleClick = () => setQueryParams(queryKey, queryValue)

  return (
    <li className="cursor-pointer text-xs w-full h-full mt-4 flex" onClick={handleClick}>
      <input
        id=""
        name=""
        type="checkbox"
        checked={isQueryActive}
        className="checkbox mr-4"
      />
      <span className={`${conditionalClass}`}>
        {queryValue[0].toUpperCase() + queryValue.slice(1)}
      </span>
    </li>
  )
}

export default QueryTab