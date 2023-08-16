"use client"
import Link from "next/link"
import { Photo } from "@/types/models"
import { useRouter } from "next/navigation"

import { deletePhoto } from "@/services/photoService"
const RowDeleteButton = ({ photoId }: { photoId: string }) => {
  const router = useRouter()
  const handleDelete = async () => {
    const res = await deletePhoto(photoId)
    console.log("Component", res)
    router.refresh()
  }
  return <button onClick={handleDelete}>DELETE</button>
}



const PhotoRow = ({ photo }: { photo: Photo }) => {
  console.log("Photo Row:", photo.url)
  
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
        <p>{photo.id}</p>

        <p>{photo.fileName}</p>
        <p>{photo.fileSize}</p>
      </div>
      <input type="checkbox" readOnly checked={photo.isUploaded} />

      <RowDeleteButton photoId={photo.id} />
      <Link href={path}>VIEW</Link>

      <p>Privacy</p>
      <p>Options</p>
    </div>
  )
}

export default PhotoRow