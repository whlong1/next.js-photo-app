import { Photo } from "@/types/models"

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const { width, height } = photo
  const gridColumnSpan = width && height ? Math.round(width / height) : 1
  const articleStyle = { gridColumnEnd: `span ${gridColumnSpan}` }

  const imgStyle = `
    w-full 
    h-full 
    border
    border-black
    object-cover 
    max-h-[200px]
  `

  return (
    <article key={photo.id} style={articleStyle}>
      <img
        className={imgStyle}
        src={photo.url ? photo.url : ""}
        alt={photo.title ? photo.title : ""}
      />
    </article>
  )
}

export default PhotoCard