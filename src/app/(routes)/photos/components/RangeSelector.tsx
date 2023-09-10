"use client"

// React
import { useState } from "react"

// Components
import QueryTab from "./QueryTab"

interface FilterSectionProps {
  queryKey: string; queryValues: string[]; sectionTitle: string;
}

//Example URL: /photos?hueRange=180-210
const RangeSelector = (props: FilterSectionProps) => {
  const { queryKey, queryValues, sectionTitle } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section>
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p>{sectionTitle}</p>
        <button>{isOpen ? "x" : "o"}</button>
      </div>
      {isOpen &&
        <ul className="list-none pl-4 pb-4 border-b">
          {queryValues.map((val) => (
            <QueryTab key={val} queryKey={queryKey} queryValue={val} />
          ))}
        </ul>
      }
    </section>
  )
}

export default RangeSelector