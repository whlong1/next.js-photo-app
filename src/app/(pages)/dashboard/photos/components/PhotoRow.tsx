import Link from "next/link"
import { Photo } from "@/types/models"
import DeleteRowButton from "./DeleteRowButton"

const PhotoRow = ({ photo }: { photo: Photo }) => {
  const path = `/dashboard/photos/${photo.id}`
  const containerStyle = `
    flex 
    border 
    items-center 
    justify-around 
    w-full 
    h-24
  `
  return (
    <div className={containerStyle}>
      <div className="border w-12">
        {photo.url && photo.title && <img src={photo.url} alt={photo.title} />}
      </div>
      <div className="flex flex-col">
        <p>{photo.title}</p>

        <p>{photo.fileName}</p>
        <p>{photo.fileSize}</p>
      </div>
      <input type="checkbox" readOnly checked={photo.isUploaded} />

      <DeleteRowButton photoId={photo.id} />
      <Link href={path}>VIEW</Link>

      <p>Privacy</p>
      <p>Options</p>
    </div>
  )
}

export default PhotoRow