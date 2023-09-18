"use client"

// Hooks
import { useState } from "react"
import { useRouter } from "next/navigation"

// Components
import Link from "next/link"
import NewPhotoForm from "./NewPhotoForm"
import PhotoUploader from "./PhotoUploader"

// Types
import { InputChangeEvent } from "@/types/events"
import { PhotoFormData, FileUploadData } from "@/types/forms"

// Services
import { createAndUploadPhoto } from "@/services/photoService"

// Helpers
import { getClosestAspectRatio, compressImage, getImageColorDetails } from "@/lib/helpers"

// Properties independent from file upload:
const initialPhotoFormData: PhotoFormData = {
  category: "",
  location: "",
  description: "",
  isPublic: true,
}

// Properties that should be reset on upload:
const initialFileUploadData: FileUploadData = {
  width: 0,
  height: 0,
  fileName: "",
  mimeType: "",
  fileSize: 0,
  aspectRatio: "",

  rgb: "",
  hex: "",
  hueDegree: 0,
  isDark: false,
  dominantColor: "",

  fullsize: null,
  thumbnail: null,
  medium: null,
}

const UploadModal = () => {
  const router = useRouter()
  const [msg, setMsg] = useState("")
  const [previewURL, setPreviewURL] = useState("")
  const [photoFormData, setPhotoFormData] = useState(initialPhotoFormData)
  const [fileUploadData, setFileUploadData] = useState(initialFileUploadData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileUploadData.fullsize) {
      setMsg("Please select a file to upload!")
      return
    }
    await createAndUploadPhoto(fileUploadData, photoFormData)
    handleFormReset()
    handleUploadReset()
    router.refresh()
  }

  const selectAndPreview = (file: File) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)
    image.src = objectUrl
    image.onload = async () => {
      const {
        rgb,
        hex,
        isDark,
        hueDegree,
        dominantColor,
      } = getImageColorDetails(image)
      const medium = await compressImage(image, file.name, file.type, 600)
      const thumbnail = await compressImage(image, file.name, file.type, 200)
      const aspectRatio = getClosestAspectRatio(image.width, image.height)
      const uploadObject: FileUploadData = {
        fullsize: file,
        medium: medium,
        thumbnail: thumbnail,
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        width: image.width,
        height: image.height,
        aspectRatio: aspectRatio,
        rgb: rgb,
        hex: hex,
        isDark: isDark,
        hueDegree: hueDegree,
        dominantColor: dominantColor,
      }
      setPreviewURL(objectUrl)
      setFileUploadData(uploadObject)
    }
  }

  const handleFormReset = () => {
    setPhotoFormData(initialPhotoFormData)
  }

  const handleUploadReset = () => {
    setPreviewURL("")
    URL.revokeObjectURL(previewURL)
    setFileUploadData(initialFileUploadData)
  }

  const handleChange = ({ target }: InputChangeEvent) => {
    const { name, value, type } = target
    setPhotoFormData({
      ...photoFormData, [name]: type === "number" ? parseInt(value) : value
    })
  }

  // Display message in modal, form or drag and drop?
  console.log("Message:", msg)

  return (
    <div className="w-full h-full bg-black bg-opacity-50 absolute inset-0 z-50 flex justify-center overflow-auto p-4">
      <div className="flex flex-col bg-white border rounded w-full md:max-h-[500px] max-w-[900px] min-h-[500px] sm:max-h-full">
        <header className="flex justify-between p-4 border-b">
          <h1>Upload Files</h1>
          <Link href="/dashboard/photos">X</Link>
        </header>
        <section className="flex flex-grow flex-col md:flex-row">
          <PhotoUploader
            previewURL={previewURL}
            file={fileUploadData.fullsize}
            selectAndPreview={selectAndPreview}
            handleUploadReset={handleUploadReset}
          />
          <NewPhotoForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            photoFormData={photoFormData}
          />
        </section>
      </div>
    </div>
  )
}

export default UploadModal