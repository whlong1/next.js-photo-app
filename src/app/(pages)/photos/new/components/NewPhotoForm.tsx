"use client"

// React
import { useState } from "react"

// Types
import { PhotoFormData } from "@/types/forms"

const NewPhotoForm = () => {
  const initialState: PhotoFormData = {
    title: "",
    category: "",
    location: "",
    description: "",
    // isUploaded: false,
    year: new Date().getFullYear(),
  }

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form action="">
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <input id="description" name="description" value={formData.description} onChange={handleChange}></input>
      </div>

      <div>
        <label htmlFor="year">Year:</label>
        <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default NewPhotoForm