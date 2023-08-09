"use client"
import { useState } from "react"
const SearchBar = () => {
  const [query, setQuery] = useState("")

  const handleSearch = async () => {
    // const activeQueries: VideoSearchParams = Object.fromEntries(
    //   Object.entries(query).filter(([key, value]) => value)
    // )
    // const videoData = await fetchVideosOnClient(activeQueries)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    // setQuery()
  }
  return (
    <>
      <input
        type="text"
        name="keyword"
        value={query}
        onChange={handleChange}
        placeholder="Search Keywords"
      />
    </>
  )
}

export default SearchBar