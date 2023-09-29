"use client"

// React
import { useState } from "react"

// Components
import Image from "next/image"

const IconButton = ({ icon }: { icon: string }) => {
  const [hover, setHover] = useState(false)

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHover(e.type === "mouseenter")
  }

  return (
    <button
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