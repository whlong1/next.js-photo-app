"use client"

// Hooks
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQueryManager } from "@/hooks/useQueryManager"

// Types
import { Photo } from "@/types/models"
import { PhotoFormData } from "@/types/forms"

// Services
import { createOrUpdatePhoto } from "@/services/photoService"

const NewPhotoForm = () => {
  const initialState: PhotoFormData = {
    title: "",
    category: "",
    location: "",
    description: "",
    year: new Date().getFullYear(),
  }

  const router = useRouter()
  const [formData, setFormData] = useState(initialState)
  const { queryParams, setQueryParams } = useQueryManager()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // This is very unreliable, because the params might be set for something old!!!
    const photoId = queryParams.get("photoId")
    console.log("FORM", queryParams.get("photoId"))
    if (!photoId) {
      console.log("PLEASE UPLOAD A FILE FIRST")
      return
    }

    // Check upload status, add isUploaded prop to formData
    // Need to set formState with updatedPhotoData for editing
    // In route handler, instead of finding existing, could create new resource
    // based on isUploaded boolean.
    // Uploads should be handled in dashboard - better state management
    // React query cache?
    // fetch photos and videos: dynamic segments for users

    // drag and drop quandry, if the image exists, display the image as a row with the data
    // allow the user to delete it and upload another

    // What if a user wants to submit the upload and form at the same time?
    // Add condition to include additional form data in route handler??

    // How can you pass photoId before it exists? Silly!
    const photoData: Photo = await createOrUpdatePhoto(photoId, formData)
    setQueryParams("photoId", photoData.id)
    console.log("Photo Data", photoData)
    router.refresh()
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = target
    setFormData({
      ...formData, [name]: type === "number" ? parseInt(value) : value
    })
  }

  const inputClassNames = "border border-slate-200 text-slate-300 p-1 text-xs"
  const labelClassNames = "text-slate-300 font-medium text-xs mb-1"


  return (
    <form className="w-[50%] h-full flex flex-col justify-between p-4" onSubmit={handleSubmit}>
      <div>
        <label className={labelClassNames} htmlFor="title">TITLE</label>
        <input
          required
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <div>
        <label className={labelClassNames} htmlFor="category">CATEGORY</label>
        <input
          required
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <div>
        <label className={labelClassNames} htmlFor="location">LOCATION</label>
        <input
          required
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <div>
        <label className={labelClassNames} htmlFor="description">DESCRIPTION</label>
        <input
          required
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <div>
        <label className={labelClassNames} htmlFor="year">YEAR</label>
        <input
          required
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className={inputClassNames}
        />
      </div>

      <button className="form-button-cta" type="submit">SUBMIT</button>
    </form>
  )
}

export default NewPhotoForm