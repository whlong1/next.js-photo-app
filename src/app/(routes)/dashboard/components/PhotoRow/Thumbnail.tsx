"use client"

// Types
import { Photo } from "@/types/models"

// Components
import Image from "next/image"

// Credit for the smooth Image loading idea:
// https://www.youtube.com/watch?v=GG66vQgc1Vg&ab_channel=SakuraDev

const Thumbnail = ({ photo }: { photo: Photo }) => {
  const imageInfo = photo.url
    ? { src: photo.url, alt: "Thumbnail" }
    : { src: "/assets/placeholder.png", alt: "No image source" }


  // Note: Including the unoptimized prop seems to improve loading time
  // as it's directly fetched from the source (S3)

  return (
    <div className="bg-slate-200 relative w-12 h-12 border rounded mr-4" >
      <Image
        fill={true}
        unoptimized={true}
        src={imageInfo.src}
        alt={imageInfo.alt}
        sizes="(max-width: 46px) 100vw"
        onLoadingComplete={(img) => img.classList.remove("opacity-0")}
        className="object-cover rounded transition-opacity opacity-0 duration-[2s]"
      />
    </div>
  )
}

export default Thumbnail