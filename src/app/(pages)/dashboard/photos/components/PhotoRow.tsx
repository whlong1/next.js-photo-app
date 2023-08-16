"use client"
import Link from "next/link"
import { Photo } from "@/types/models"

const PhotoRow = ({ photo }: { photo: Photo }) => {
  console.log("Photo Row:", photo.url)

  const handleDelete = () => {

  }

  return (
    <Link className="flex border items-center justify-around w-full h-24" href={`/dashboard/photos/${photo.id}`}>
      <div className="border w-12">
        {photo.url && photo.title && <img src={photo.url} alt={photo.title} />}
      </div>
      <div className="flex flex-col">
        <p>{photo.fileName}</p>
        <p>{photo.fileSize}</p>
      </div>
      <input type="checkbox" readOnly checked={photo.isUploaded} />

      <button onClick={handleDelete}>DELETE</button>

      <p>Privacy</p>
      <p>Options</p>
    </Link>
  )
}

export default PhotoRow