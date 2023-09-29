"use client"

// React
import { useState } from "react"

// Constants
import { DOMINANT_COLORS } from "@/lib/constants"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

// Components
import ArrowButton from "../../../../../components/ArrowButton"

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
  const gridClass = "filter-list py-4 grid grid-cols-4 grid-rows-3 gap-1"
  return (
    <section className="px-4">
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p className="item-title">Dominant Color</p>
        <ArrowButton isOpen={isOpen} />
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