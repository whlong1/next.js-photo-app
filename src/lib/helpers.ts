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
  isPublic: boolean;
  category?: string;
  location?: string;
  authorName?: string;
  description?: string;
  OR?: ORCondition["OR"];
}

// Global constant?
const validParams = {
  year: true,
  keyword: true,
  category: true,
  location: true,
  authorName: true,
  description: true,
  aspectRatio: true,
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
  return { isPublic: true, ...rest, ...(keyword && getORCondition(keyword)) }
}

// Source:
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1000
  const decimals = 2
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const getClosestAspectRatio = (width: number, height: number) => {
  // Might be helpful as a global constant:
  const commonAspectRatios = [
    { ratioVal: 1, ratioStr: "1:1" },
    { ratioVal: 1.5, ratioStr: "3:2" },
    { ratioVal: 1.3, ratioStr: "4:3" },
    { ratioVal: 1.7, ratioStr: "16:9" },
    { ratioVal: 0.56, ratioStr: "9:16" },
  ]

  const targetRatio = width / height

  const closestRatio = commonAspectRatios.reduce((acc, curr, idx) => {
    const newDifference = Math.abs(targetRatio - curr.ratioVal)
    const oldDifference = Math.abs(targetRatio - acc.ratioVal)
    return newDifference < oldDifference ? curr : acc
  })

  return closestRatio.ratioStr
}