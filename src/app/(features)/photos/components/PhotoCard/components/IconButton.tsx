"use client"

// React
import { useState } from "react"

// Components
import Image from "next/image"

// Services
import { addPhotoToFavorites } from "@/services/photoService"

//Todo Consolidate name and icon props
interface IconButtonProps {
  icon: string;
  name: string;
  photoId: string;
}

const IconButton = ({ name, icon, photoId, }: IconButtonProps) => {
  const [hover, setHover] = useState(false)

  const handleClick = async () => {
    // service call
    if (name === "favorite") await addPhotoToFavorites(photoId)
  }

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHover(e.type === "mouseenter")
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="w-7 h-7 leading-none bg-white text-black rounded bg-opacity-60 hover:bg-opacity-90 transition text-sm ml-3 flex items-center justify-center"
    >
      <Image
        src={icon}
        width={18}
        height={18}
        alt="Heart icon"
        className={hover ? "invert-0 opacity-25 scale-90" : "invert"}
      />
    </button>
  )
}

export default IconButton