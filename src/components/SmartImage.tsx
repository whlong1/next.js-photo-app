"use client"

// Hooks
import { useState, useEffect } from "react"

// Types
import { Photo } from "@/types/models"

// Components
import Image from "next/image"

// Credit for the initial smooth loading Image idea:
// https://www.youtube.com/watch?v=GG66vQgc1Vg&ab_channel=SakuraDev

// Doc on hexadecimal color code transparency:
// https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4

// Note: Including the unoptimized prop on Image seems to improve loading time
// Might be due to the fact that it's directly fetched from the source (S3)

interface SmartImageProps {
  photo: Photo; displayMode: "thumbnail" | "preview" | "fullscreen";
}

const SmartImage = ({ photo, displayMode }: SmartImageProps) => {
  const { hex } = photo
  const imageInfo = photo.url
    ? { src: photo.url, alt: "Preview" }
    : { src: "/assets/placeholder.png", alt: "No image source" }

  const containerClass = `image-base ${displayMode}`

  // Default of #e2e8f0 is equivalent to slate-200:
  const [backgroundColor, setBackgroundColor] = useState("#e2e8f0")

  useEffect(() => { setBackgroundColor(`${hex}99`) }, [hex])

  return (
    <div className={containerClass} style={{ backgroundColor: backgroundColor }}>
      <Image
        fill={true}
        priority={true}
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

export default SmartImage