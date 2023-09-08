// Libraries
import { FastAverageColor } from "fast-average-color"

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

// GitHub repo outlining the use of canvas: https://github.com/codu-code/resize-image/tree/completed
// Good source on image compression strategies: https://stackoverflow.com/questions/12168909/blob-from-dataurl
export const compressImage = async (image: HTMLImageElement, fileName: string, mimeType: string) => {
  const canvas = document.createElement("canvas")
  const maxWidth = 200

  const scale = maxWidth / image.width
  canvas.width = maxWidth
  canvas.height = image.height * scale

  const ctx = canvas.getContext("2d")
  ctx?.drawImage(image, 0, 0, canvas.width, canvas.height)

  const dataUrl = canvas.toDataURL(mimeType)
  const thumbnailRes = await fetch(dataUrl)
  const thumbnailBlob = await thumbnailRes.blob()
  const thumbnailFile = new File([thumbnailBlob], fileName, { type: mimeType })

  return thumbnailFile
}

export const getImageColorDetails = (image: HTMLImageElement) => {
  const fac = new FastAverageColor()
  const {
    rgb,
    hex,
    isDark,
    value: [r, g, b],
  } = fac.getColor(image)
  const hueDegree: number = calculateHue(r, g, b)
  const dominantColor: string = getColorName(hueDegree)
  return { rgb, hex, hueDegree, dominantColor, isDark }
}

// Finds relative differences between color channels
// Adapted from this excellent article on css-tricks:
// https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hsl-to-rgb
const calculateHue = (r: number, g: number, b: number) => {
  let hueDegree: number

  // Find largest and smallest rgb values:
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)

  // Find difference between  max & min
  const delta = cmax - cmin

  // Determine dominant color channel:
  if (delta === 0) hueDegree = 0
  else if (cmax === r) hueDegree = (g - b) / delta % 6
  else if (cmax === g) hueDegree = (b - r) / delta + 2
  else hueDegree = (r - g) / delta + 4

  // Convert for value between 0° and 360°:
  hueDegree = Math.round(hueDegree * 60)
  if (hueDegree < 0) hueDegree += 360

  return hueDegree
}

const getColorName = (degree: number) => {
  const hueRanges = [
    { start: 0, end: 15, name: "red" },
    { start: 15, end: 45, name: "orange" },
    { start: 45, end: 75, name: "yellow" },
    { start: 75, end: 105, name: "lime" },
    { start: 105, end: 135, name: "green" },
    { start: 135, end: 165, name: "turquoise" },
    { start: 165, end: 195, name: "cyan" },
    { start: 195, end: 225, name: "sky" },
    { start: 225, end: 255, name: "blue" },
    { start: 255, end: 285, name: "violet" },
    { start: 285, end: 315, name: "magenta" },
    { start: 315, end: 345, name: "rose" },
    { start: 345, end: 360, name: "red" }
  ]

  for (const range of hueRanges) {
    if (degree >= range.start && degree <= range.end) {
      return range.name
    }
  }
  return "red"
}