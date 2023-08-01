"use client"
import { useState } from "react"

// Services
import { createVideo } from "@/services/frontendServices"

const VideoForm = () => {
  const inputStyle = "border border-black w-100"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newVideo = await createVideo({})
    console.log(newVideo)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        className={inputStyle}
      />

      <label htmlFor="artist">Artist:</label>
      <input
        type="text"
        name="artist"
        id="artist"
        className={inputStyle}
      />

      <label htmlFor="year">Year:</label>
      <input
        type="number"
        name="year"
        id="year"
        className={inputStyle}
      />

      <label htmlFor="genre">Genre:</label>
      <input
        type="text"
        name="genre"
        id="genre"
        className={inputStyle}
      />

      <label htmlFor="director">Director:</label>
      <input
        type="text"
        name="director"
        id="director"
        className={inputStyle}
      />

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        name="category"
        id="category"
        className={inputStyle}
      />

      <label htmlFor="videoUrl">Video URL:</label>
      <input
        type="text"
        name="videoUrl"
        id="videoUrl"
        className={inputStyle}
      />

      <label htmlFor="thumbnailUrl">Thumbnail URL:</label>
      <input
        type="text"
        name="thumbnailUrl"
        id="thumbnailUrl"
        className={inputStyle}
      />

      <label htmlFor="authorId">Author ID:</label>
      <input
        type="text"
        name="authorId"
        id="authorId"
        className={inputStyle}
      />

      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default VideoForm
