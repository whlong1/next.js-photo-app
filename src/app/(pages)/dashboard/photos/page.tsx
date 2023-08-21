import { Photo } from "@/types/models"
import { fetchMyPhotos } from "@/services/userService"
import PhotoRow from "./components/PhotoRow"

// import { fetchMyPhotos } from "@/services/photoService"

const DashboardPhotos = async () => {
  const photos: Photo[] = await fetchMyPhotos()
  // console.log("Dashboard", photos)

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