"use client"

import { Photo } from "@/types/models"
import { useState } from "react"

const PhotoCard = ({ photo }: { photo: Photo }) => {
  const [width, setWidth] = useState(0)
  const [columnSpan, setColumnSpan] = useState(1)

  if (photo.url) {
    const img = new Image()
    img.src = photo.url
    
    img.onload = () => {
      const aspectRatio = img.width / img.height
      setColumnSpan(Math.round(aspectRatio))
    }
  }

  return (
    <article key={photo.id} style={{ gridColumnEnd: `span ${columnSpan}` }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "cover", border: "1px solid black" }}
        src={photo.url ? photo.url : ""}
        alt={photo.title ? photo.title : ""}
      />
    </article>
  )
}

export default PhotoCard


// https://9elements.com/blog/building-a-combined-css-aspect-ratio-grid/