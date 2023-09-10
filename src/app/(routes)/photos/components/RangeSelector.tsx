"use client"

// Hooks
import { useState } from "react"
import { useQueryManager } from "@/hooks/useQueryManager"

// Types
import { InputChangeEvent } from "@/types/events"

type RangeInputStyle = React.CSSProperties & { "--thumb-bg-color": string; }

interface RangeSelectorProps { queryKey: string; sectionTitle: string; }
const RangeSelector = ({ queryKey, sectionTitle }: RangeSelectorProps) => {
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
    setQueryParams(queryKey, `${minHue}-${maxHue}`)
  }

  const handleChange = ({ target: { value, id } }: InputChangeEvent) => {
    if (id === "minHue" && validRange(maxHue, value)) setMinHue(value)
    if (id === "maxHue" && validRange(value, minHue)) setMaxHue(value)
  }

  return (
    <section>
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p>{sectionTitle}</p>
        <button>{isOpen ? "x" : "o"}</button>
      </div>
      {isOpen &&
        <div className="flex flex-col p-4">
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

          <button
            className="btn h-8 p-0 text-xs mt-4 bg-slate-100"
            onClick={handleClick}
          >
            Apply
          </button>
        </div>
      }
    </section>
  )
}

export default RangeSelector