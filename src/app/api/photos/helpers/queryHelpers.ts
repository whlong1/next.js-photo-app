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
  dominantColor?: string;
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
  dominantColor: true,
  brightness: true,
  hueRange: true,
  mimeType: true,
}

//? ============= Create Prisma Query From URL Helpers ============= 

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
  const validKeys = Object.keys(validParams).filter((key) => {
    return key !== "keyword" && key !== "year" && key !== "brightness" && key !== "hueRange"
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