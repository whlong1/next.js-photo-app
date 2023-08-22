// Types
import { Photo } from "@/types/models"

// Services
import { fetchPhotos } from "@/services/photoService"

// Components
import PhotoCard from "./components/PhotoCard"

// References:
// https://css-tricks.com/aspect-ratios-grid-items/
// https://css-tricks.com/seamless-responsive-photo-grid/
// https://flowbite.com/docs/components/gallery/#masonry-grid
// https://css-irl.info/masonry-in-css/
// https://medium.com/notonlycss/tailwindcss-masonry-layout-553cdaea2e8a

const Photos = async ({ searchParams }: { searchParams: any }) => {
  console.log("Search Params", searchParams)
  const photos: Photo[] = await fetchPhotos()

  return (
    <main>
      <h1>Photos Hub</h1>
      <section className="masonry-grid">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </section>
    </main>
  )
}

export default Photos