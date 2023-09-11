"use client"

// React
import { useState } from "react"

// Constants
import { DOMINANT_COLORS } from "@/lib/constants"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

interface SwatchProps { queryKey: string; queryValue: string; hex: string; }
const Swatch = ({ hex, queryValue, queryKey }: SwatchProps) => {
  const { queryParams, setQueryParams } = useQueryManager()

  const isQueryActive = queryParams.get(queryKey) === queryValue
  const selectedClass = isQueryActive ? "scale-[.85]" : ""

  const handleClick = () => {
    // Remove hueRange when setting dominantColor:
    if (queryParams.get("hueRange")) {
      setQueryParams("hueRange", "")
    }
    setQueryParams(queryKey, queryValue)
  }

  return (
    <div
      onClick={handleClick}
      style={{ background: hex }}
      className={`swatch ${selectedClass}`}
    />
  )
}

const SwatchSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const gridClass = "p-4 border-b grid grid-cols-4 grid-rows-3 h-full gap-1"
  return (
    <section>
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p>Dominant Color</p>
        <button>{isOpen ? "x" : "o"}</button>
      </div>
      {isOpen &&
        <ul className={gridClass}>
          {DOMINANT_COLORS.map((color) => (
            <Swatch
              key={color.name}
              hex={color.hex}
              queryValue={color.name}
              queryKey={"dominantColor"}
            />
          ))}
        </ul>
      }
    </section>
  )
}

export default SwatchSelector