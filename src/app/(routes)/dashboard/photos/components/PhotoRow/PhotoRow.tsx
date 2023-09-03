// Types
import { Photo } from "@/types/models"

// Components
import Link from "next/link"
import Thumbnail from "./Thumbnail"
import DeleteRowButton from "./DeleteRowButton"

// Helpers
import { formatBytes } from "@/lib/helpers"

const PhotoRow = ({ photo }: { photo: Photo }) => {
  const path = `/dashboard/photos/${photo.id}`
  const containerStyle = `
    p-4
    h-20
    flex 
    w-full 
    text-xs
    border-b
    items-center 
  `
  
  // Need to place the following UI:
  const viewBtn = <Link href={path}>VIEW</Link>
  const checkBox = <input type="checkbox" readOnly checked={photo.isUploaded} />

  return (
    <div className={containerStyle}>
      <Thumbnail photo={photo} />
      <div className="flex flex-col text-xs">
        <p className="max-w-[360px] single-line-truncate">{photo.fileName}</p>
        <p>{photo.fileSize && formatBytes(photo.fileSize)}</p>
      </div>
      <DeleteRowButton photoId={photo.id} />
    </div>
  )
}

export default PhotoRow