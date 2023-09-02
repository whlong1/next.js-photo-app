// Types
import { Photo } from "@/types/models"

// Masonry Grid Reading Material:
// https://css-tricks.com/aspect-ratios-grid-items/
// https://css-tricks.com/seamless-responsive-photo-grid/
// https://flowbite.com/docs/components/gallery/#masonry-grid
// https://css-irl.info/masonry-in-css/
// https://medium.com/notonlycss/tailwindcss-masonry-layout-553cdaea2e8a
// https://prototypr.io/post/masonry-layout-css-tailwind

const ColumnPhotoGrid = ({ photos }: { photos: Photo[] }) => {
  return (
    <section className="gap-2 space-y-2 columns-3">
      {photos.map((photo) => (
        <article key={photo.id} className="bg-gray-200 border border-black w-full">
          <img
            src={photo.url ? photo.url : ""}
            alt={photo.title ? photo.title : ""}
            className="w-full h-full object-cover"
          />
        </article>
      ))}
    </section>
  )
}

export default ColumnPhotoGrid