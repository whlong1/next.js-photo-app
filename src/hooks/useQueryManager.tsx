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

// Notes:
// queryParams is the current URLSearchParams object 
// and can be used to check for active query keys using the get() method.
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams

// setQueryParams takes in a query key and value,
// updates the URL, and redirects the user accordingly.
// The Videos page server component fetches videos based on current searchParams