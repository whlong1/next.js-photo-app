import { usePathname, useSearchParams, useRouter } from "next/navigation"

interface QueryButtonProps {
  queryKey: string;
  selected: boolean;
  optionValue: string;
}

const QueryButton = ({ selected, optionValue, queryKey }: QueryButtonProps) => {
  const baseStyle = "text-white rounded"
  const selectedStyle = selected ? "bg-blue-500 hover:bg-blue-400" : "bg-slate-950 hover:bg-slate-700"
  const style = `${baseStyle} ${selectedStyle}`

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryParams = () => {
    const queryParams = new URLSearchParams(Array.from(searchParams.entries()))
    console.log(queryParams.toString())
    console.log(searchParams.has(queryKey))

    if (searchParams.has(queryKey) && queryParams.get(queryKey) === optionValue) {
      queryParams.delete(queryKey)
    } else {
      queryParams.set(queryKey, optionValue)
    }
    router.push(`${pathname}?${queryParams}`)
  }

  return (
    <li>
      <button className={style} onClick={updateQueryParams}>
        {optionValue.toUpperCase()}
      </button>
    </li>
  )
}

export default QueryButton