"use client"

// Hooks
import { useState } from "react"
import { useRouter } from "next/navigation"

// Components
import NewPhotoForm from "./NewPhotoForm"
import PhotoUploader from "./PhotoUploader"

// Types
import { Photo } from "@/types/models"
import { PhotoFormData, FileUploadData } from "@/types/forms"

// Services
import {
  createOrUpdatePhoto,
  createAndUploadPhoto,
} from "@/services/photoService"

const initialPhotoFormData: PhotoFormData = {
  title: "",
  category: "",
  location: "",
  description: "",
  year: new Date().getFullYear(),
}

const initialFileUploadData: FileUploadData = {
  width: 0,
  height: 0,
  file: null,
}

const NewPhotoDialog = () => {
  const router = useRouter()
  const [msg, setMsg] = useState("")
  const [previewURL, setPreviewURL] = useState("")
  const [formData, setFormData] = useState(initialPhotoFormData)
  const [fileUploadData, setFileUploadData] = useState(initialFileUploadData)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileUploadData.file) {
      setMsg("Please select a file to upload!")
      return
    }
    handleFormReset()
    handleUploadReset()
    router.refresh()
  }

  const selectAndPreview = (file: File) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)
    image.src = objectUrl
    image.onload = () => setFileUploadData((current) => {
      return { ...current, width: image.height, height: image.height }
    })
    setFileUploadData((current) => {
      return { ...current, file: file }
    })
    setPreviewURL(objectUrl)
  }

  const handleFormReset = () => {
    setFormData(initialPhotoFormData)
  }

  const handleUploadReset = () => {
    setPreviewURL("")
    URL.revokeObjectURL(previewURL)
    setFileUploadData(initialFileUploadData)
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
          previewURL={previewURL}
          file={fileUploadData.file}
          selectAndPreview={selectAndPreview}
          handleUploadReset={handleUploadReset}
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