// Types
import { SearchParams } from "@/types/params"

export const createQueryString = (searchParams: SearchParams) => {
  return Object.keys(searchParams).map((k) => {
    const key = k as keyof typeof searchParams
    return `${key}=${searchParams[key]}`
  }).join("&")
}