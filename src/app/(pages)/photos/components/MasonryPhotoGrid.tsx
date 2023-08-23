// Types
import { Photo } from "@/types/models"

// Components
import PhotoCard from "./PhotoCard"

const MasonryPhotoGrid = ({ photos }: { photos: Photo[] }) => {
  return (
    <section className="masonry-grid">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </section>
  )
}

export default MasonryPhotoGrid