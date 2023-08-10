"use client"
import { useQueryManager } from "@/hooks/useQueryManager"

interface QueryButtonProps { queryKey: string; queryValue: string; }

const YearOption = ({ queryValue, queryKey }: QueryButtonProps) => {
  const { queryParams, setQueryParams } = useQueryManager()
  const handleClick = () => setQueryParams(queryKey, queryValue)

  return (
    <option onClick={handleClick}>
      {queryValue.toUpperCase()}
    </option>

  )
}

export default YearOption