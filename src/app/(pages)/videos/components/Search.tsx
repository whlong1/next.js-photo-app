"use client"
import { useState } from "react"
import { VideoSearchParams } from '@/types/props'
import { fetchVideosOnClient } from "@/services/frontendServices"

const FilterButton = ({ handleClick, optionValue, selected }: any) => {
  const style = `text-white rounded p-2 ${selected ? "bg-blue-500" : "bg-black"}`
  return (
    <li>
      <button className={style} onClick={() => handleClick('genre', optionValue)}>
        {optionValue.toUpperCase()}
      </button>
    </li>
  )
}

const Search = () => {
  const initialState: VideoSearchParams = {
    year: "",
    genre: "",
    title: "",
    artist: "",
    director: "",
    category: "",
    videoUrl: "",
    authorId: "",
    thumbnailUrl: "",
  }

  const [query, setQuery] = useState(initialState)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetchVideosOnClient(query)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({ ...query, [target.name]: target.value })
  }

  const handleClick = (k: string, v: string) => setQuery({ ...query, [k]: v })

  console.log(query)

  const genreList = [
    "comedy",
    "drama",
    "action",
    "romance",
    "science-fiction",
  ]

  return (
    <>
      SEARCH

      <section>
        <h2>Genres</h2>
        <ul>
          {genreList.map((genreName, idx) => (
            <FilterButton
              key={idx}
              optionValue={genreName}
              handleClick={handleClick}
              selected={query.genre === genreName}
            />
          ))}
        </ul>
      </section>





      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="genre-select">GENRE</label>
        <select name="genre" id="genre-select" value={query.genre} onChange={handleChange}>
          <option value="COMEDY">COMEDY</option>
          <option value="DRAMA">DRAMA</option>
        </select>
      </form> */}


    </>
  )
}

export default Search