// Types
import { Photo } from "@/types/models"

// Components
import PhotoCard from "./PhotoCard"

const MasonryPhotoGrid = ({ photos }: { photos: Photo[] }) => {
  return (
    <section className="masonry-grid scrollable">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} dynamic={true} />
      ))}
    </section>
  )
}

export default MasonryPhotoGrid