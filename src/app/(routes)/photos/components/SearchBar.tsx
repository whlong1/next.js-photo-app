"use client"

// Hooks
import { useState } from "react"
import { useQueryManager } from "@/hooks/useQueryManager"

// Components
import Image from "next/image"

const SearchBar = () => {
  const [keyword, setKeyword] = useState("")
  const { queryParams, setQueryParams } = useQueryManager()

  const handleSearch = async () => {
    setQueryParams("keyword", keyword)
    setKeyword("")
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(target.value)
  }

  return (
    <div className="header-element ml-4 rounded-full h-full bg-fill-grey border-slate-200">
      <Image
        width={12}
        height={12}
        className="mr-2"
        alt="Magnifying glass icon"
        src="/assets/icons/search.svg"
      />
      <input
        type="text"
        name="keyword"
        value={keyword}
        onChange={handleChange}
        placeholder="Search Keywords"
        className="leading-none bg-transparent font-medium"
      />
      {/* <button className="header-element ml-2" onClick={handleSearch}>
        +
      </button> */}
    </div>
  )
}

export default SearchBar