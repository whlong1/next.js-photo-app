"use client"

// Types
import { Photo } from "@/types/models"

// Components
import PhotoInfoOverlay from "./PhotoInfoOverlay"

//TODO Can the maxGridSpan be calculated based on the total volume of the photo list to reduce gaps?

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const { width, height } = photo
  const dimensions = width && height

  // Determines how many columns/rows an image should span in the grid layout:
  const getGridSpan = (numerator: number, denominator: number, maxGridSpan: number) => {
    return Math.min(maxGridSpan, Math.max(1, Math.round(numerator / denominator)))
  }

  // Note the maxGridSpan argument.
  // This produces a max height of 3 cells & max width of 2 cells:
  const gridRowSpan = dimensions ? getGridSpan(height, width, 2) : 1
  const gridColumnSpan = dimensions ? getGridSpan(width, height, 3) : 1

  const articleStyle = {
    position: "relative",
    gridRowEnd: `span ${gridRowSpan}`,
    gridColumnEnd: `span ${gridColumnSpan}`,
  }

  return (
    <article style={articleStyle as React.CSSProperties}>
      <PhotoInfoOverlay photo={photo} />
      <img
        onLoad={() => console.log("")}
        src={photo.url ? photo.url : ""}
        alt={photo.title ? photo.title : ""}
        className="w-full h-full object-cover border border-slate-300 drop-shadow rounded"
      />
    </article>
  )
}

export default PhotoCard