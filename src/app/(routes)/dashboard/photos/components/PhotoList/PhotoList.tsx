"use client"

// Hooks
import { useState } from "react"

// Types
import { Photo } from "@/types/models"

// Components
import PhotoRow from "../PhotoRow/PhotoRow"

// Ccomponent acts as a wrapper for immediate client-side UI updates
interface PhotoListProps { serverSidePhotoData: Photo[] }
const PhotoList = ({ serverSidePhotoData }: PhotoListProps) => {
  const [photos, setPhotos] = useState<Photo[]>(serverSidePhotoData)


  return (
    photos.map((photo) => (
      <PhotoRow key={photo.id} photo={photo} />
    ))
  )
}

export default PhotoList