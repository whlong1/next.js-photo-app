// Types
import { Photo } from "@/types/models"

// Components
import PhotoRow from "../PhotoRow/PhotoRow"

// Actions
import { getMyPhotos } from "@/actions/actions"

const DashboardPhotoList = async () => {
  const photos: Photo[] = await getMyPhotos()
  return (
    photos.map((photo) => (
      <PhotoRow key={photo.id} photo={photo} />
    ))
  )
}

export default DashboardPhotoList