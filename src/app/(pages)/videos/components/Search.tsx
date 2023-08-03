"use client"
import { useState } from "react"
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

const Search = () => {
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
    year: currentYear.toString(),
  }

  const [query, setQuery] = useState(initialState)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetchVideosOnClient(query)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, [target.name]: target.value })
  }

  const handleSelection = (k: string, v: string) => setQuery({ ...query, [k]: v })

  console.log(query)

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
    <>
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
          {getYearsFrom(1900).map((yearStr) => (
            <option key={yearStr} value={yearStr}>{yearStr}</option>
          ))}
        </select>
      </section>
    </>
  )
}

export default Search