import Link from "next/link"
import { Photo } from "@/types/models"
import { fetchMyPhotos } from "@/services/userService"

import PhotoRow from "./components/PhotoRow"

const DashboardPhotos = async () => {
  const photos: Photo[] = await fetchMyPhotos()
  return (
    <>
      <h1>MY PHOTOS</h1>
      {photos.map((photo) => (
        <PhotoRow key={photo.id} photo={photo} />
      ))}
    </>
  )
}

export default DashboardPhotos