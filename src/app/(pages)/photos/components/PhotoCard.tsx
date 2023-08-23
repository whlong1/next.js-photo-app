import { Photo } from "@/types/models"

//TODO Can the maxGridSpan be calculated based on the total volume of the photo list to reduce gaps?

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const { width, height } = photo

  console.log(photo)

  const dimensions = width && height
  const getGridSpan = (numerator: number, denominator: number, maxGridSpan: number) => {
    return Math.min(maxGridSpan, Math.max(1, Math.round(numerator / denominator)))
  }

  const gridColumnSpan = dimensions ? getGridSpan(width, height, 3) : 1
  const gridRowSpan = dimensions ? getGridSpan(height, width, 2) : 1

  const articleStyle = {
    gridRowEnd: `span ${gridRowSpan}`,
    gridColumnEnd: `span ${gridColumnSpan}`,
  }

  const hoverFrame = (
    <div>
      <p></p>
    </div>
  )

  return (
    <article style={articleStyle}>
      <img
        src={photo.url ? photo.url : ""}
        alt={photo.title ? photo.title : ""}
        className="w-full h-full object-cover border border-slate-300 drop-shadow rounded"
      />
    </article>
  )
}

export default PhotoCard