"use client"

// Components
import Image from "next/image"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

const GridToggle = () => {
  const { queryParams, setQueryParams } = useQueryManager()
  const isMasonry = queryParams.get("masonry") === "true"
  const handleClick = () => setQueryParams("masonry", "true")

  const baseClass = "w-full h-full hover:bg-fill-grey flex items-center justify-center"
  const activeClass = "bg-fill-grey"

  return (
    <div
      onClick={handleClick}
      className="w-20 h-[28px] ml-auto flex justify-center border rounded-full"
    >
      <button className={`${baseClass} ${isMasonry ? "" : activeClass} rounded-l-full`}>
        <Image
          width={14}
          height={14}
          priority={true}
          alt="Grid icon"
          src="/assets/icons/grid.svg"
          className="opacity-25"
        />
      </button>
      <div className="border-r"></div>
      <button className={`${baseClass} ${isMasonry ? activeClass : ""} rounded-r-full`}>
        <Image
          width={14}
          height={14}
          priority={true}
          alt="Masonry icon"
          src="/assets/icons/masonry.svg"
          className="opacity-25"
        />
      </button>
    </div>
  )
}

export default GridToggle