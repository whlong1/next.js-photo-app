// Types
import { Photo } from "@/types/models"

// Components
import PhotoCard from "./PhotoCard"

const BasicPhotoGrid = ({ photos }: { photos: Photo[] }) => {
  return (
    <section className="basic-grid scrollable">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} dynamic={false} />
      ))}
    </section>

  )
}

export default BasicPhotoGrid