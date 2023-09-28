import { ValidParams } from "@/types/enums"
import { ORCondition, PrismaQueryObject } from "@/types/types"

const createHueRangeQuery = (hueRange: string[]) => {
  if (hueRange.length !== 2) return {}
  return {
    hueDegree: {
      gte: parseInt(hueRange[0]),
      lte: parseInt(hueRange[1]),
    },
  }
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
  const validKeys = Object.values(ValidParams).filter((key) => {
    return key !== ValidParams.KEYWORD && key !== ValidParams.YEAR && key !== ValidParams.BRIGHTNESS && key !== ValidParams.HUE_RANGE
  })
  // Produce Prisma filter conditions from valid keys
  const filterConditionsArray = validKeys.map((paramKey) => {
    return { [paramKey]: { contains: keyword, mode: "insensitive" } }
  })
  // Object formatted for Prisma
  return { OR: filterConditionsArray }
}

const paramFilterFn = (pair: [string, string]) => {
  return Object.values(ValidParams).includes(pair[0] as ValidParams)
}

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