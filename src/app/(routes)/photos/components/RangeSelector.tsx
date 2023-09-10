"use client"

// Hooks
import { useState } from "react"
import { useQueryManager } from "@/hooks/useQueryManager"

// Types
import { InputChangeEvent } from "@/types/events"

interface RangeSelectorProps { queryKey: string; sectionTitle: string; }
const RangeSelector = ({ queryKey, sectionTitle }: RangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { queryParams, setQueryParams } = useQueryManager()

  const defaultMin = queryParams.get("hueRange")?.split("-")[0]
  const defaultMax = queryParams.get("hueRange")?.split("-")[1]

  const [minHue, setMinHue] = useState(defaultMin || "0")
  const [maxHue, setMaxHue] = useState(defaultMax || "360")

  const colorDisplayClass = "border rounded text-xs font-medium bg-slate-100 w-12 h-6 flex items-center justify-center"

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
              onChange={handleChange}
              aria-valuemin={0}
              aria-valuemax={360}
              aria-valuenow={parseInt(maxHue)}
            />
          </div>

          <div className="flex justify-between my-4">
            <p className={colorDisplayClass} style={{ background: `hsl(${minHue}, 100%, 50%)` }}>
              {minHue}°
            </p>
            <p className={colorDisplayClass} style={{ background: `hsl(${maxHue}, 100%, 50%)` }}>
              {maxHue}°
            </p>
          </div>

          <button
            className="btn h-8 p-0 text-xs bg-slate-100"
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