import { Photo } from "@/types/models"

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const { width, height } = photo
  const gridColumnSpan = width && height ? Math.round(width / height) : 1

  return (
    <article key={photo.id} style={{ gridColumnEnd: `span ${gridColumnSpan}` }}>
      <img
        style={{ width: "100%", height: "100%", maxHeight: "200px", objectFit: "cover", border: "1px solid black" }}
        src={photo.url ? photo.url : ""}
        alt={photo.title ? photo.title : ""}
      />
    </article>
  )
}

export default PhotoCard