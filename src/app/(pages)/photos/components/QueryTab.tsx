"use client"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

interface QueryTabProps { queryKey: string; queryValue: string; }
const QueryTab = ({ queryValue, queryKey }: QueryTabProps) => {
  const { queryParams, setQueryParams } = useQueryManager()
  const isQueryActive = queryParams.get(queryKey) === queryValue

  const selectedStyle = isQueryActive
    ? "opacity-100 underline"
    : "opacity-50 hover:underline"
  const baseStyle = "cursor-pointer text-sm"
  const style = `${baseStyle} ${selectedStyle}`

  const handleClick = () => setQueryParams(queryKey, queryValue)

  return (
    <li className={style} onClick={handleClick}>
      {queryValue[0].toUpperCase() + queryValue.slice(1)}
    </li>
  )
}

export default QueryTab