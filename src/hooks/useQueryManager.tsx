import { usePathname, useSearchParams, useRouter } from "next/navigation"

export const useQueryManager = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryParams = new URLSearchParams(Array.from(searchParams.entries()))

  const setQueryParams = (queryKey: string, queryValue: string) => {
    if (queryValue === "") {
      queryParams.delete(queryKey)
    } else if (queryParams.get(queryKey) === queryValue) {
      queryParams.delete(queryKey)
    } else {
      queryParams.set(queryKey, queryValue)
    }
    router.push(`${pathname}?${queryParams}`)
  }

  return { queryParams, setQueryParams }
}