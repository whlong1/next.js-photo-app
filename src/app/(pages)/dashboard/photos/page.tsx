import { Photo } from "@/types/models"
import { fetchMyPhotos } from "@/services/userService"
import Link from "next/link"

const DashboardPhotos = async () => {
  const photos: Photo[] = await fetchMyPhotos()
  console.log("MY PHOTOS", photos)
  return (
    <>
      <h1>
        PHOTOS DASHBOARD LANDING
      </h1>
      {photos.map((photo) => (
        <Link className="border" key={photo.id} href={`/dashboard/photos/${photo.id}`}>
          {photo.url && photo.title && <img src={photo.url} alt={photo.title} />}
          {photo.id}
        </Link>
      ))}
    </>
  )
}

export default DashboardPhotos