// Types
import { Photo } from "@/types/models"

// Components
import SmartImage from "@/components/SmartImage"
import PhotoInfoOverlay from "./PhotoInfoOverlay"

//TODO Can the maxGridSpan be calculated based on the total volume of the photo list to reduce gaps?

const PhotoCard = ({ photo, dynamic }: { photo: Photo, dynamic: boolean }) => {
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
    gridRowEnd: `span ${dynamic ? gridRowSpan : 1}`,
    gridColumnEnd: `span ${dynamic ? gridColumnSpan : 1}`,
  }

  return (
    <article style={articleStyle as React.CSSProperties}>
      <PhotoInfoOverlay photo={photo} />
      <SmartImage photo={photo} displayMode="preview" />
    </article>
  )
}

export default PhotoCard