"use client"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

const GridToggle = () => {
  const { queryParams, setQueryParams } = useQueryManager()
  const isMasonry = queryParams.get("masonry") === "true"
  // const isBasic = queryParams.get("masonry") = "false"

  console.log(isMasonry)

  const handleClick = () => setQueryParams("masonry", "true")

  return (
    <div>
      <button onClick={handleClick}>[B]</button>
      <button onClick={handleClick}>[M]</button>
    </div>
  )
}

export default GridToggle