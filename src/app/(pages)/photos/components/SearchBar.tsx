"use client"
import { useState } from "react"
import { useQueryManager } from "@/hooks/useQueryManager"

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
    <>
      <input
        type="text"
        name="keyword"
        value={keyword}
        onChange={handleChange}
        placeholder="Search Keywords"
        className="text-sm px-1 border-slate-300"
      />
      <button onClick={handleSearch}>
        +
      </button>
    </>
  )
}

export default SearchBar