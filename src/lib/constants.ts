export const PHOTO_CATEGORIES = [
  "Art",
  "Food",
  "Sports",
  "Travel",
  "Fashion",
  "Portrait",
  "Landscape",
  "Architectural",
  "Photojournalism",
]

export const ASPECT_RATIOS = [
  "4:3",
  "3:2",
  "1:1",
  "16:9",
  "9:16",
]

export const DOMINANT_COLORS = [
  { name: "red", hex: "#FF0000" },
  { name: "orange", hex: "#FFA500" },
  { name: "yellow", hex: "#FFFF00" },
  { name: "lime", hex: "#00FF00" },
  { name: "green", hex: "#008000" },
  { name: "turquoise", hex: "#30D5C8" },
  { name: "cyan", hex: "#00FFFF" },
  { name: "sky", hex: "#00BFFF" },
  { name: "blue", hex: "#0000FF" },
  { name: "violet", hex: "#EE82EE" },
  { name: "magenta", hex: "#FF00FF" },
  { name: "rose", hex: "#FF007F" }
]

export const FILE_EXTENSION_LOOKUP: { [key: string]: string } = {
  "image/jpeg": "jpg", "image/png": "png",
}