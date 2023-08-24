// Types
import { Photo } from "@/types/models"

// Services
import { fetchPhotos } from "@/services/photoService"

// Components
import MasonryPhotoGrid from "./components/MasonryPhotoGrid"
import AlternatePhotoGrid from "./components/AlternatePhotoGrid"

const Photos = async ({ searchParams }: { searchParams: any }) => {
  console.log("Search Params", searchParams)
  const photos: Photo[] = await fetchPhotos(searchParams)

  // Might want to move the browse header up one level
  // that could include the search bar?
  // Other option, remove it, search goes into site nav?
  // But this would imply a site wide search, whereas
  // including it in a photos layout implies a search on photos alone.
  // Showing results text and pagination would make the most sense here.
  return (
    <section className="flex flex-col">
      <header>
        current filters
        sorting options
      </header>
      <MasonryPhotoGrid photos={photos} />
    </section>
  )
}

export default Photos