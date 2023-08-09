import { useQueryManager } from "@/hooks/useQueryManager"

interface QueryButtonProps { queryKey: string; optionValue: string; }
const QueryButton = ({ optionValue, queryKey }: QueryButtonProps) => {
  const { isQueryActive, navigateWithQuery } = useQueryManager(queryKey, optionValue)

  const baseStyle = "text-white rounded"
  const selectedStyle = isQueryActive
    ? "bg-blue-500 hover:bg-blue-400"
    : "bg-slate-950 hover:bg-slate-700"

  const style = `${baseStyle} ${selectedStyle}`

  return (
    <li>
      <button className={style} onClick={navigateWithQuery}>
        {optionValue.toUpperCase()}
      </button>
    </li>
  )
}

export default QueryButton