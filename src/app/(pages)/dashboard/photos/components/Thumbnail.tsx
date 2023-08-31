import { Photo } from "@/types/models"

const Thumbnail = ({ photo }: { photo: Photo }) => {
  const imageInfo = photo.url && photo.title
    ? { src: photo.url, alt: photo.title }
    : { src: "placeholder", alt: "No image source" }

  return (
    <img
      src={imageInfo.src}
      alt={imageInfo.alt}
      className="object-cover w-12 h-12 border rounded mr-4"
    />
  )
}

export default Thumbnail