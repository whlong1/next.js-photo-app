"use client"

// Hooks
import { useState } from "react"
import { useQueryManager } from "@/hooks/useQueryManager"

const SearchBar = () => {
  const [keyword, setKeyword] = useState("")
  const { queryParams, setQueryParams } = useQueryManager()
  const searchClassNames = `ml-auto`

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
        className={`header-element ${searchClassNames}`}
      />
      <button className="header-element ml-2" onClick={handleSearch}>
        +
      </button>
    </>
  )
}

export default SearchBar