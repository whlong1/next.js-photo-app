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

const Photos = async ({ searchParams }: { searchParams: any }) => {
  console.log("Search Params", searchParams)
  const photos: Photo[] = await fetchPhotos()

  const styles = {
    gap: "8px",
    padding: "8px",
    display: "grid",
    gridAutoFlow: "dense",
    gridTemplateColumns: "repeat(6, 1fr)",
  }

  return (
    <main>
      <h1>Photos Hub</h1>
      <section style={styles}>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </section>
    </main>
  )
}

export default Photos