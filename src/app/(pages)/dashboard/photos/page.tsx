import { Photo } from "@/types/models"
import { fetchMyPhotos } from "@/services/userService"
import Link from "next/link"

const DashboardPhotos = async () => {
  const photos: Photo[] = await fetchMyPhotos()
  console.log("MY PHOTOS", photos)
  return (
    <>
      PHOTOS DASHBOARD LANDING
      {photos.map((photo) => (
        <Link key={photo.id} href={`/dashboard/photos/${photo.id}`}>
          {photo.id}
        </Link>
      ))}
    </>
  )
}

export default DashboardPhotos