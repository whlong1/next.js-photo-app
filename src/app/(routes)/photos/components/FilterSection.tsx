"use client"

// React
import { useState } from "react"

// Components
import QueryTab from "./QueryTab"

interface FilterSectionProps { queryKey: string, queryValues: string[] }
const FilterSection = ({ queryKey, queryValues }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const sectionTitle = queryKey[0].toUpperCase() + queryKey.slice(1)
  const keyIcon = <img className="w-4 h-4 border" src="/next.svg" alt={queryKey} />

  return (
    <section>
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p>{sectionTitle}</p>
        <button>{isOpen ? "x": "o"}</button>
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

export default FilterSection