// Types
import { SearchParams } from "@/types/params"

function isEmpty(params: SearchParams) {
  for (const key in params) return false
  return true
}

export const createQueryString = (searchParams: SearchParams): string => {
  if (isEmpty(searchParams)) return ""
  return Object.keys(searchParams).map((k) => {
    const key = k as keyof typeof searchParams
    return `${key}=${searchParams[key]}`
  }).join("&")
}

const validParams = {
  category: true,
}

type ValidParamsKey = keyof typeof validParams
const paramFilterFn = (pair: [string, string]) => {
  return validParams[pair[0] as ValidParamsKey]
}

export const getURLSearchParams = (url: string): any => {
  const { searchParams } = new URL(url)
  const validPairs = Array.from(searchParams).filter(paramFilterFn)
  return Object.fromEntries(validPairs)
}