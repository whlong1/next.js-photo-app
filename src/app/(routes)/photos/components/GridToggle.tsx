"use client"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

const GridToggle = () => {
  const { queryParams, setQueryParams } = useQueryManager()
  const isMasonry = queryParams.get("masonry") === "true"
  const handleClick = () => setQueryParams("masonry", "true")

  const baseClass = "w-full h-full hover:bg-fill-grey"
  const activeClass = "bg-fill-grey"

  return (
    <div className="w-20 ml-4 flex justify-center border rounded-full" onClick={handleClick}>
      <button className={`${baseClass} ${isMasonry ? activeClass : ""}  rounded-l-full`}>
        x
      </button>
      <div className="border-r"></div>
      <button className={`${baseClass} ${isMasonry ? "" : activeClass} rounded-r-full`}>
        x
      </button>
    </div>
  )
}

export default GridToggle