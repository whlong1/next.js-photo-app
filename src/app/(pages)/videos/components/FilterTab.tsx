"use client"
import { useState } from "react"
import { Video } from '@/types/models'
import { VideoSearchParams } from '@/types/props'
import { fetchVideosOnClient } from "@/services/frontendServices"

interface FilterButtonProps {
  selected: boolean;
  optionValue: string;
  handleClick: (k: string, v: string) => void;
}

const FilterButton = ({ selected, optionValue, handleClick }: FilterButtonProps) => {
  const baseStyle = "text-white rounded"
  const selectedStyle = selected ? "bg-blue-500 hover:bg-blue-400" : "bg-slate-950 hover:bg-slate-700"
  const style = `${baseStyle} ${selectedStyle}`

  return (
    <li>
      <button className={style} onClick={() => handleClick('genre', selected ? "" : optionValue)}>
        {optionValue.toUpperCase()}
      </button>
    </li>
  )
}

interface FilterTabProps {
  videos: Video[];
  setVideos: (videos: Video[]) => void;
}

const FilterTab = ({ videos, setVideos }: FilterTabProps) => {
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
    setVideos(videoData)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setQuery({ ...query, [target.name]: target.value })
  }

  const handleSelection = (k: string, v: string) => setQuery({ ...query, [k]: v })

  const genreList = [
    "comedy",
    "drama",
    "action",
    "romance",
    "science-fiction",
  ]

  const getYearsFrom = (startYear: number): string[] => {
    const yearStringArray = []
    for (let year = startYear; year <= currentYear; year++) {
      yearStringArray.push(year.toString())
    }
    return yearStringArray
  }

  return (
    <nav>

      <input type="text" placeholder="Search Keywords" name="keyword" value={query.keyword} onChange={handleChange} />


      <section>
        <h2>Genres</h2>
        <ul>
          {genreList.map((genreName, idx) => (
            <FilterButton
              key={idx}
              optionValue={genreName}
              handleClick={handleSelection}
              selected={query.genre === genreName}
            />
          ))}
        </ul>
      </section>

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