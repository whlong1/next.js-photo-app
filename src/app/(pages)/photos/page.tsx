// Types
import { Photo } from "@/types/models"

// Services
import { fetchPhotos } from "@/services/photoService"

// Components
import MasonryPhotoGrid from "./components/MasonryPhotoGrid"
import AlternatePhotoGrid from "./components/AlternatePhotoGrid"

const Photos = async ({ searchParams }: { searchParams: any }) => {
  console.log("Search Params", searchParams)
  const photos: Photo[] = await fetchPhotos()

  return (
    <main>
      <h1>Photos Hub</h1>
      <MasonryPhotoGrid photos={photos} />
    </main>
  )
}

export default Photos