"use client"

// Hooks
import { useState } from "react"
import { useQueryManager } from "@/hooks/useQueryManager"

// Components
import ArrowButton from "./ArrowButton"

// Types
import { InputChangeEvent } from "@/types/events"
type RangeInputStyle = React.CSSProperties & { "--thumb-bg-color": string; }

const RangeSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { queryParams, setQueryParams } = useQueryManager()

  const defaultMin = queryParams.get("hueRange")?.split("-")[0]
  const defaultMax = queryParams.get("hueRange")?.split("-")[1]

  const [minHue, setMinHue] = useState(defaultMin || "0")
  const [maxHue, setMaxHue] = useState(defaultMax || "360")

  const maxHueStyle: RangeInputStyle = { '--thumb-bg-color': `hsl(${maxHue}, 100%, 50%)` }
  const minHueStyle: RangeInputStyle = { '--thumb-bg-color': `hsl(${minHue}, 100%, 50%)` }

  const validRange = (max: string, min: string) => {
    return parseInt(max) > parseInt(min)
  }

  const handleClick = () => {
    // Remove dominantColor when setting hueRange:
    if (queryParams.get("dominantColor")) {
      setQueryParams("dominantColor", "")
    }
    setQueryParams("hueRange", `${minHue}-${maxHue}`)
  }

  const handleChange = ({ target: { value, id } }: InputChangeEvent) => {
    if (id === "minHue" && validRange(maxHue, value)) setMinHue(value)
    if (id === "maxHue" && validRange(value, minHue)) setMaxHue(value)
  }

  return (
    <section className="px-4">
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p className="filter-title">Color Range</p>
        <ArrowButton isOpen={isOpen} />
      </div>
      {isOpen &&
        <div className="flex flex-col py-4">
          <div className="track">
            <input
              min="0"
              max="360"
              id="minHue"
              type="range"
              value={minHue}
              style={minHueStyle}
              onChange={handleChange}
              aria-valuemin={0}
              aria-valuemax={360}
              aria-valuenow={parseInt(minHue)}
            />
            <input
              min="0"
              max="360"
              id="maxHue"
              type="range"
              value={maxHue}
              style={maxHueStyle}
              onChange={handleChange}
              aria-valuemin={0}
              aria-valuemax={360}
              aria-valuenow={parseInt(maxHue)}
            />
          </div>
          <button className="filter-btn" onClick={handleClick}>
            Apply
          </button>
        </div>
      }
    </section>
  )
}

export default RangeSelector