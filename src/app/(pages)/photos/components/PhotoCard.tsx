import { Photo } from "@/types/models"

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

  const hoverClass = `
    p-4
    z-10
    w-full
    h-full
    absolute 
    text-white
    opacity-0 
    bg-black/30
    hover:opacity-100
    transition-opacity 
  `
  const hoverFrame = (
    <div className={hoverClass}>
      <p>{photo.title}</p>
      <p>{photo.authorName}</p>
      <p>{photo.year}</p>
      <p>{photo.location}</p>
      <p>{photo.width}x{photo.height}</p>
    </div>
  )

  return (
    <article style={articleStyle as React.CSSProperties}>
      {hoverFrame}
      <img
        src={photo.url ? photo.url : ""}
        alt={photo.title ? photo.title : ""}
        className="w-full h-full object-cover border border-slate-300 drop-shadow rounded"
      />
    </article>
  )
}

export default PhotoCard