// Types
import { Photo } from "@/types/models"

// Services
import { fetchPhotos } from "@/services/photoService"

// Components
import PhotoCard from "./components/PhotoCard"

const Photos = async ({ searchParams }: { searchParams: any }) => {
  console.log("Search Params", searchParams)
  const photos: Photo[] = await fetchPhotos()

  return (
    <main>
      <h1>Photos Hub</h1>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </main>
  )
}

export default Photos