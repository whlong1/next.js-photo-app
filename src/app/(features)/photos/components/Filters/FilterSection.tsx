"use client"

// React
import { useState } from "react"

// Components
import QueryTab from "./QueryTab";
import ArrowButton from "../../../../../components/ArrowButton"

interface FilterSectionProps {
  queryKey: string;
  queryValues: string[];
  sectionTitle: string;
}

const FilterSection = (props: FilterSectionProps) => {
  const { queryKey, queryValues, sectionTitle } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="px-4">
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p className="item-title">
          {sectionTitle}
        </p>
        <ArrowButton isOpen={isOpen} />
      </div>
      {isOpen &&
        <ul className="filter-list">
          {queryValues.map((val) => (
            <QueryTab key={val} queryKey={queryKey} queryValue={val} />
          ))}
        </ul>
      }
    </section>
  )
}

export default FilterSection