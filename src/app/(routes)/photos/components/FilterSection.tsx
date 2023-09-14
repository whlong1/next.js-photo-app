"use client"

// React
import { useState } from "react"

// Components
import QueryTab from "./QueryTab"
import Image from "next/image"

interface FilterSectionProps {
  queryKey: string; queryValues: string[]; sectionTitle: string;
}
const FilterSection = (props: FilterSectionProps) => {
  const { queryKey, queryValues, sectionTitle } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="px-4">
      <div className="nav-item" onClick={() => setIsOpen((current) => !current)}>
        <p className="font-semibold text-dark-grey">
          {sectionTitle}
        </p>
        <button className="w-7 h-7 rounded flex items-center justify-center">
          {isOpen ?
            <Image src="/assets/icons/arrow-y.svg" alt="Arrow" width={8} height={8} priority={true} />
            :
            <Image src="/assets/icons/arrow-x.svg" alt="Arrow" width={8} height={8} priority={true} />
          }
        </button>
      </div>
      {isOpen &&
        <ul className="list-none pb-4 border-b">
          {queryValues.map((val) => (
            <QueryTab key={val} queryKey={queryKey} queryValue={val} />
          ))}
        </ul>
      }
    </section>
  )
}

export default FilterSection