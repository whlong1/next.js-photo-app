// Types
import { Photo } from "@/types/models"

// Components
import PhotoCard from "./PhotoCard"

const BasicPhotoGrid = ({ photos }: { photos: Photo[] }) => {
  return (
    <section className="basic-grid scrollable-grid">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </section>

  )
}

export default BasicPhotoGrid