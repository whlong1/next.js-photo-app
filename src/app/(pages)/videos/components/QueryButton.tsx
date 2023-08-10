"use client"
import { useQueryManager } from "@/hooks/useQueryManager"

interface QueryButtonProps { queryKey: string; queryValue: string; }
const QueryButton = ({ queryValue, queryKey }: QueryButtonProps) => {
  const { queryParams, setQueryParams } = useQueryManager()
  const isQueryActive = queryParams.get(queryKey) === queryValue

  const selectedStyle = isQueryActive
    ? "bg-blue-500 hover:bg-blue-400"
    : "bg-slate-950 hover:bg-slate-700"
  const baseStyle = "text-white rounded"
  const style = `${baseStyle} ${selectedStyle}`

  const handleClick = () => setQueryParams(queryKey, queryValue)

  return (
    <li>
      <button className={style} onClick={handleClick}>
        {queryValue.toUpperCase()}
      </button>
    </li>
  )
}

export default QueryButton