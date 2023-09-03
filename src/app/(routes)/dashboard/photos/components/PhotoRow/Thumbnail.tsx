import { Photo } from "@/types/models"

const Thumbnail = ({ photo }: { photo: Photo }) => {
  const imageInfo = photo.url
    ? { src: photo.url, alt: "Thumbnail" }
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