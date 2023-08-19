import { Photo } from "@/types/models"

const PhotoCard = ({ photo }: { photo: Photo }) => {
  return (
    <article key={photo.id}>
      <img
        className="w-24 h-24 border border-black"
        src={photo.url ? photo.url : ""}
        alt={photo.title ? photo.title : ""}
      />
    </article>
  )
}

export default PhotoCard