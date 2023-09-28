import { ValidParams } from "@/types/enums"
import { ORCondition, PrismaQueryObject } from "@/types/types"

// Used to exclude certain fields from a generalized search.
const EXCLUDED_PARAMS = [
  ValidParams.KEYWORD,
  ValidParams.YEAR,
  ValidParams.BRIGHTNESS,
  ValidParams.HUE_RANGE
]

// Filters the given URL search parameters based on the defined valid parameters.
const paramFilterFn = (pair: [string, string]) => {
  return Object.values(ValidParams).includes(pair[0] as ValidParams)
}

// =================== QUERY FUNCTIONS ====================

const createHueRangeQuery = (hueRange: string[]) => {
  if (hueRange.length !== 2) return {}
  return { hueDegree: { gte: parseInt(hueRange[0]), lte: parseInt(hueRange[1]) } }
}

const createMimeTypeQuery = (mimeType: string) => {
  if (mimeType !== "PNG" && mimeType !== "JPEG") return {}
  return { mimeType: `image/${mimeType.toLowerCase()}` }
}

const createBrightnessQuery = (brightness: string) => {
  if (brightness !== "light" && brightness !== "dark") return {}
  return { isDark: brightness === "dark" }
}

const createKeywordSearchCondition = (keyword: string): ORCondition => {
  const validKeys = Object.values(ValidParams).filter(
    (key) => !EXCLUDED_PARAMS.includes(key)
  )

  const filterConditionsArray = validKeys.map((paramKey) => {
    return { [paramKey]: { contains: keyword, mode: "insensitive" } }
  })

  return { OR: filterConditionsArray }
}

// =================== MAIN EXPORT ====================

// Creates a Prisma query object based on the given URL's search parameters.
export const createPrismaQueryFromURL = (url: string): PrismaQueryObject => {
  const { searchParams } = new URL(url)
  // Filters url based on valid keys.
  const validPairs = Array.from(searchParams).filter((paramFilterFn))

  // Converts array to an object (Example: { category: "people" })
  const searchParamsObject = Object.fromEntries(validPairs)

  // Destructures searchParamsObject for individualized checks
  const { keyword, hueRange, brightness, mimeType, ...rest } = searchParamsObject

  return {
    ...rest,
    isPublic: true,
    ...(mimeType && createMimeTypeQuery(mimeType)),
    ...(brightness && createBrightnessQuery(brightness)),
    ...(hueRange && createHueRangeQuery(hueRange.split('-'))),
    ...(keyword && createKeywordSearchCondition(keyword)),
  }
}