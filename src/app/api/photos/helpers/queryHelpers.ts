import { ValidParams } from "@/types/enums"
import { ORCondition, PrismaQueryObject } from "@/types/types"

// =================== CONSTANTS ====================

const EXCLUDED_PARAMS = [
  ValidParams.KEYWORD,
  ValidParams.YEAR,
  ValidParams.BRIGHTNESS,
  ValidParams.HUE_RANGE
]

// =================== UTILITY ====================
/**
  Filters the given URL search parameters based on the defined valid parameters.
  @param pair The pair of [key, value] representing a URL search parameter.
  @returns {boolean} Whether the given pair's key is a valid parameter.
*/

const paramFilterFn = (pair: [string, string]) => {
  return Object.values(ValidParams).includes(pair[0] as ValidParams)
}


// =================== QUERY FUNCTIONS ====================

/**
  Creates a Prisma query object based on the given keyword.
  The returned object contains OR conditions for each valid parameter.
  @param keyword The keyword used to filter the search results.
  @returns {ORCondition} The constructed Prisma OR condition object.
*/

const createHueRangeQuery = (hueRange: string[]) => {
  if (hueRange.length !== 2) return {}
  return { hueDegree: { gte: parseInt(hueRange[0]), lte: parseInt(hueRange[1]) } }
}

const createMimeTypeQuery = (mimeType: string) => {
  if (mimeType !== "PNG" && mimeType !== "JPEG") return {}
  return { mimeType: `image/${mimeType.toLowerCase()}` }
}

// Wonky way to handle a boolean, but I think brightness makes
// more sense as a query param for users over "isDark"
// Consider updating the Photo schema
const createBrightnessQuery = (brightness: string) => {
  if (brightness !== "light" && brightness !== "dark") return {}
  return { isDark: brightness === "dark" }
}

// Handles general search term query:
const createORCondition = (keyword: string): ORCondition => {
  // Valid keys array ("keyword" and "year" must be excluded)
  const validKeys = Object.values(ValidParams).filter(
    (key) => !EXCLUDED_PARAMS.includes(key)
  )

  // Produce Prisma filter conditions from valid keys
  const filterConditionsArray = validKeys.map((paramKey) => {
    return { [paramKey]: { contains: keyword, mode: "insensitive" } }
  })
  // Object formatted for Prisma
  return { OR: filterConditionsArray }
}

// =================== MAIN EXPORT ====================

/**
  Creates a Prisma query object based on the given URL's search parameters.
  @param url The URL containing the search parameters.
  @returns {PrismaQueryObject} The constructed Prisma query object.
*/

export const createPrismaQueryFromURL = (url: string): PrismaQueryObject => {
  const { searchParams } = new URL(url)
  // Filter url based on valid keys (Example: [ "category", "people" ])
  const validPairs = Array.from(searchParams).filter((paramFilterFn))

  // Convert to object (Example: { category: "people" })
  const searchParamsObject = Object.fromEntries(validPairs)

  // Separate keyword prop from the rest of the search object.
  const { keyword, hueRange, brightness, mimeType, ...rest } = searchParamsObject

  // Handle general keyword search with OR condition.
  return {
    ...rest,
    isPublic: true,
    ...(keyword && createORCondition(keyword)),
    ...(mimeType && createMimeTypeQuery(mimeType)),
    ...(brightness && createBrightnessQuery(brightness)),
    ...(hueRange && createHueRangeQuery(hueRange.split('-')))
  }
}