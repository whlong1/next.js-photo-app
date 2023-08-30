// Types
import { Photo } from "@/types/models"

// Actions
import { getMyPhotos } from "@/actions/actions"

// Components
import PhotoRow from "./components/PhotoRow"

const DashboardPhotos = async () => {
  const myPhotos: Photo[] = await getMyPhotos()

  return (
    <>
      {myPhotos.map((photo) => (
        <PhotoRow key={photo.id} photo={photo} />
      ))}
    </>
  )
}

export default DashboardPhotos