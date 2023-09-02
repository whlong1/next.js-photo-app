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
      <div className="side-nav-item">
        <h3>{sectionTitle}</h3>
        <button onClick={() => setIsOpen((current) => !current)}>+</button>
      </div>
      {isOpen &&
        <ul className="list-none">
          {queryValues.map((val) => (
            <QueryTab queryKey={queryKey} queryValue={val} />
          ))}
        </ul>
      }
    </section>
  )
}

export default FilterSection