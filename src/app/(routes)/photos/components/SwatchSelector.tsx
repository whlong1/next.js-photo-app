"use client"

// React
import { useState } from "react"

// Components
import QueryTab from "./QueryTab"

interface FilterSectionProps {
  queryKey: string; queryValues: string[]; sectionTitle: string;
}

const SwatchSelector = (props: FilterSectionProps) => {
  const { queryKey, queryValues, sectionTitle } = props
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section>
    <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
      <p>{sectionTitle}</p>
      <button>{isOpen ? "x" : "o"}</button>
    </div>
    {isOpen &&
      <ul className="pl-4 pb-4 border-b grid grid-cols-3	">
        {queryValues.map((val) => (
          <QueryTab key={val} queryKey={queryKey} queryValue={val} />
        ))}
      </ul>
    }
  </section>
  )
}

export default SwatchSelector