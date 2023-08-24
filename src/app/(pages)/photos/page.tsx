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
    <section className="flex flex-col">
      <header>
        <h2>BROWSE PHOTOS</h2>
      </header>
      <MasonryPhotoGrid photos={photos} />
    </section>
  )
}

export default Photos