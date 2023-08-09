"use client"
import { useState } from "react"
import { Video } from '@/types/models'
import { VideoSearchParams } from '@/types/props'
import { fetchVideosOnClient } from "@/services/frontendServices"

import GenreList from "./GenreList"

interface FilterTabProps {
  videos: Video[];
}

const FilterTab = ({ videos }: FilterTabProps) => {
  const currentYear = new Date().getFullYear()
  const initialState: VideoSearchParams = {
    genre: "",
    title: "",
    artist: "",
    director: "",
    category: "",
    videoUrl: "",
    authorId: "",
    thumbnailUrl: "",
    year: "",
    keyword: "",
  }

  const [query, setQuery] = useState(initialState)

  const handleSearch = async () => {
    const activeQueries: VideoSearchParams = Object.fromEntries(
      Object.entries(query).filter(([key, value]) => value)
    )
    const videoData = await fetchVideosOnClient(activeQueries)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setQuery({ ...query, [target.name]: target.value })
  }


  const getYearsFrom = (startYear: number): string[] => {
    const yearStringArray = []
    for (let year = startYear; year <= currentYear; year++) {
      yearStringArray.push(year.toString())
    }
    return yearStringArray
  }

  return (
    <nav>
      <input
        type="text"
        name="keyword"
        value={query.keyword}
        onChange={handleChange}
        placeholder="Search Keywords"
      />


      <GenreList />


      <section>
        <h2>Year</h2>
        <select name="year" value={query.year} onChange={handleChange}>
          <option value="">ALL</option>
          {getYearsFrom(1900).map((yearStr) => (
            <option key={yearStr} value={yearStr}>{yearStr}</option>
          ))}
        </select>
      </section>

      <button onClick={handleSearch}>APPLY</button>

    </nav>
  )
}

export default FilterTab