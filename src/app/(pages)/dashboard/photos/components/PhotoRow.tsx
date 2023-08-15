import Link from "next/link"
import { Photo } from "@/types/models"
const PhotoRow = ({ photo }: { photo: Photo }) => {
  return (
    <Link className="border" href={`/dashboard/photos/${photo.id}`}>
      {photo.url && photo.title && <img src={photo.url} alt={photo.title} />}
      {photo.id}
    </Link>
  )
}

export default PhotoRow