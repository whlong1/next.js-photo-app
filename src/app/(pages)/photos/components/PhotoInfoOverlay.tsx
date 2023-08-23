// Types
import { Photo } from "@/types/models"

const PhotoInfoOverlay = ({ photo }: { photo: Photo }) => {
  const classNames = `
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

  return (
    <div className={classNames}>
      <p>{photo.title}</p>
      <p>{photo.authorName}</p>
      <p>{photo.year}</p>
      <p>{photo.location}</p>
      <p>{photo.width}x{photo.height}</p>
    </div>
  )
}

export default PhotoInfoOverlay