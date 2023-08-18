import { Photo } from "@/types/models"
import { fetchPhotos } from "@/services/photoService"

const Photos = async ({ searchParams }: { searchParams: any }) => {
  console.log("Search Params", searchParams)
  const photos: Photo[] = await fetchPhotos()

  return (
    <main>
      <h1>Photos Hub</h1>
      {photos.map((photo) => (
        <article key={photo.id}>
          <img
            className="w-24 h-24 border border-black"
            src={photo.url ? photo.url : ""}
            alt={photo.title ? photo.title : ""}
          />
        </article>
      ))}
    </main>
  )
}

export default Photos