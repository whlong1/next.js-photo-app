"use client"

// Hooks
import { useState } from "react"
import { useQueryManager } from "@/hooks/useQueryManager"

interface RangeSelectorProps {
  queryKey: string; sectionTitle: string;
}

// Example URL: /photos?hueRange=180-210
// How should isQueryActive be handled here?
// See QueryTab for reference.

const RangeSelector = (props: RangeSelectorProps) => {
  const { queryKey, sectionTitle } = props
  const [isOpen, setIsOpen] = useState(false)
  const [minHue, setMinHue] = useState("")
  const [maxHue, setMaxHue] = useState("")
  const { queryParams, setQueryParams } = useQueryManager()

  const hueRange = minHue && maxHue ? `${minHue}-${maxHue}` : ""
  const handleClick = () => setQueryParams(queryKey, hueRange)

  return (
    <section>
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p>{sectionTitle}</p>
        <button>{isOpen ? "x" : "o"}</button>
      </div>
      {isOpen &&
        <>
          <input className="border" type="text" />
          <input className="border" type="text" />
          <button onClick={handleClick}>Apply</button>
        </>
      }
    </section>
  )
}

export default RangeSelector