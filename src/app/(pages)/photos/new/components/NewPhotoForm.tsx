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

  const handleSubmit = async (e: React.FormEvent) => {

  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = target
    setFormData({
      ...formData, [name]: type === "number" ? parseInt(value) : value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">TITLE</label>
        <input
          required
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="category">CATEGORY</label>
        <input
          required
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="location">LOCATION</label>
        <input
          required
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">DESCRIPTION</label>
        <input
          required
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="year">YEAR</label>
        <input
          required
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
      </div>

      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default NewPhotoForm