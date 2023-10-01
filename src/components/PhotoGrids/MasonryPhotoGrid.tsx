// Types
import { Photo } from "@/types/models"

// Components
import PhotoCard from "../../app/(features)/photos/components/PhotoCard/PhotoCard"

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