"use client"
import { useState } from "react"

// Types
import { Video } from "@/types/models"

// Services
import { createVideo } from "@/services/frontendServices"

const VideoForm = () => {
  const initialState: Video = {
    title: "",
    genre: "",
    artist: "",
    director: "",
    category: "",
    videoUrl: "",
    thumbnailUrl: "",
    year: new Date().getFullYear(),
  }

  const inputStyle = "border border-black w-100 rounded"

  const [videoFormData, setVideoFormData] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFormData({ ...videoFormData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault()
      const newVideo = await createVideo(videoFormData)
      console.log("Client", newVideo)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        className={inputStyle}
        value={videoFormData.title}
        onChange={handleChange}
      />

      <label htmlFor="artist">Artist:</label>
      <input
        type="text"
        name="artist"
        id="artist"
        className={inputStyle}
        value={videoFormData.artist}
        onChange={handleChange}
      />

      <label htmlFor="year">Year:</label>
      <input
        type="number"
        name="year"
        id="year"
        className={inputStyle}
        value={videoFormData.year}
        onChange={handleChange}
      />

      <label htmlFor="genre">Genre:</label>
      <input
        type="text"
        name="genre"
        id="genre"
        className={inputStyle}
        value={videoFormData.genre}
        onChange={handleChange}
      />

      <label htmlFor="director">Director:</label>
      <input
        type="text"
        name="director"
        id="director"
        className={inputStyle}
        value={videoFormData.director}
        onChange={handleChange}
      />

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        name="category"
        id="category"
        className={inputStyle}
        value={videoFormData.category}
        onChange={handleChange}
      />

      <label htmlFor="videoUrl">Video URL:</label>
      <input
        type="text"
        name="videoUrl"
        id="videoUrl"
        className={inputStyle}
        value={videoFormData.videoUrl}
        onChange={handleChange}
      />

      <label htmlFor="thumbnailUrl">Thumbnail URL:</label>
      <input
        type="text"
        name="thumbnailUrl"
        id="thumbnailUrl"
        className={inputStyle}
        value={videoFormData.thumbnailUrl}
        onChange={handleChange}
      />

      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default VideoForm
