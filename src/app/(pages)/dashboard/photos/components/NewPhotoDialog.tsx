"use client"

// Hooks
import { useState } from "react"
import { useRouter } from "next/navigation"

// Components
import NewPhotoForm from "./NewPhotoForm"
import PhotoUploader from "./PhotoUploader"

// Types
import { Photo } from "@/types/models"
import { PhotoFormData } from "@/types/forms"

// Services
import { createOrUpdatePhoto } from "@/services/photoService"

/*/
  PhotUploader updates the URL params with the new photoId
  NewPhotoForm requires this URL param (queryParams.get("photoId"))
  Move up necessary state to NewPhotoDialog
  Submit form and store file in one action
  Preview image with local file
  Only downside is edit will require an adjusted workflow
/*/

const NewPhotoDialog = () => {
  const initialState: PhotoFormData = {
    title: "",
    category: "",
    location: "",
    description: "",
    year: new Date().getFullYear(),
  }

  const router = useRouter()
  const [formData, setFormData] = useState(initialState)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // const photoData: Photo = await createOrUpdatePhoto(photoId, formData)
    router.refresh()
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = target
    setFormData({
      ...formData, [name]: type === "number" ? parseInt(value) : value
    })
  }

  return (
    <div className="bg-white border rounded">
      <header className="flex justify-between p-4 border-b">
        <h1>New Photo</h1>
        <button>X</button>
      </header>
      <section className="flex h-[380px] items-stretch">
        <PhotoUploader 
        
        />
        <NewPhotoForm
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </section>
    </div>
  )
}

export default NewPhotoDialog