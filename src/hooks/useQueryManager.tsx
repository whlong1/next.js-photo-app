import { usePathname, useSearchParams, useRouter } from "next/navigation"

export const useQueryManager = (queryKey: string, optionValue: string) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryParams = new URLSearchParams(Array.from(searchParams.entries()))
  const isQueryActive = searchParams.has(queryKey) && queryParams.get(queryKey) === optionValue

  const navigateWithQuery = () => {
    if (isQueryActive) {
      queryParams.delete(queryKey)
    } else {
      queryParams.set(queryKey, optionValue)
    }
    router.push(`${pathname}?${queryParams}`)
  }

  return { isQueryActive, navigateWithQuery }
}