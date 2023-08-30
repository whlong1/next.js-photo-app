// Types
import { SearchParams } from "@/types/params"

interface ORCondition {
  OR: {
    [x: string]: {
      contains: string;
      mode: string;
    };
  }[];
}

interface PrismaQueryObject {
  category?: string;
  location?: string;
  authorName?: string;
  description?: string;
  OR?: ORCondition["OR"];
}

const validParams = {
  year: true,
  keyword: true,
  category: true,
  location: true,
  authorName: true,
  description: true,
}

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


//? ============= Create Prisma Query From URL Helpers ============= 

// Handles general search term query:
const getORCondition = (keyword: string): ORCondition => {
  // Valid keys array ("keyword" and "year" must be excluded)
  const validKeys = Object.keys(validParams).filter((key) => {
    return key !== "keyword" && key !== "year"
  })
  // Produce Prisma filter conditions from valid keys
  const filterConditionsArray = validKeys.map((paramKey) => {
    return { [paramKey]: { contains: keyword, mode: "insensitive" } }
  })
  // Object formatted for Prisma
  return { OR: filterConditionsArray }
}

const paramFilterFn = (pair: [string, string]) => {
  return validParams[pair[0] as keyof typeof validParams]
}

export const createPrismaQueryFromURL = (url: string): PrismaQueryObject => {
  const { searchParams } = new URL(url)
  // Filter url based on valid keys (Example: [ "category", "people" ])
  const validPairs = Array.from(searchParams).filter((paramFilterFn))

  // Convert to object (Example: { category: "people" })
  const searchParamsObject = Object.fromEntries(validPairs)

  // Separate keyword prop from the rest of the search object.
  const { keyword, ...rest } = searchParamsObject

  // Handle general keyword search with OR condition.
  return { ...rest, ...(keyword && getORCondition(keyword)) }
}