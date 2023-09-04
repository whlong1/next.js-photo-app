"use client"

// Hooks
import { useState } from "react"

// Types
import { Photo } from "@/types/models"

// Components
import PhotoRow from "../PhotoRow/PhotoRow"

// Actions
import { getMyPhotos } from "@/actions/actions"

// Component acts as a wrapper for optimistic client-side UI updates
interface PhotoListProps { serverSidePhotoData: Photo[] }

const PhotoList = ({ serverSidePhotoData }: PhotoListProps) => {
  const [photos, setPhotos] = useState<Photo[]>(serverSidePhotoData)

  return photos.map((photo) => (<PhotoRow key={photo.id} photo={photo} />))
}

// const PhotoList = async () => {
//   const photos: Photo[] = await getMyPhotos()
//   return photos.map((photo) => (<PhotoRow key={photo.id} photo={photo} />))
// }

export default PhotoList