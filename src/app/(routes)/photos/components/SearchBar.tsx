"use client"

// Hooks
import { useState } from "react"
import { useQueryManager } from "@/hooks/useQueryManager"

// Components
import Image from "next/image"

const SearchBar = () => {
  const [keyword, setKeyword] = useState("")
  const { queryParams, setQueryParams } = useQueryManager()

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setQueryParams("keyword", keyword)
      setKeyword("")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
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
        onKeyDown={handleSearch}
        placeholder="Search Keywords"
        className="leading-none bg-transparent font-medium"
      />
    </div>
  )
}

export default SearchBar