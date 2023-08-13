"use client"

// React
import { useState } from "react"

// Components
import DragAndDrop from "./DragAndDrop"

// Services
import { createAndUploadPhoto } from "@/services/photoService"

const PhotoUploader = () => {
  const [newPhotoId, setNewPhotoId] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [uploadPending, setUploadPending] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!
    handleFile(file)
  }

  const handleFile = async (file: File) => {
    setUploadPending(true)
    const { getUrl, newPhotoId } = await createAndUploadPhoto(file)
    setPreviewUrl(getUrl)
    setNewPhotoId(newPhotoId)
    setUploadPending(false)
  }


  const fileInput = (
    <input
      type="file"
      onChange={handleChange}
      accept="image/png, image/jpeg"
    />
  )

  const buttonContainer = (
    <div>
      <button>CONFIRM</button>
      <button>CANCEL</button>
    </div>
  )


  return (
    <>
      <h2>Photo Uploader</h2>
      <DragAndDrop handleFile={handleFile} uploadPending={uploadPending} />
      {newPhotoId && <p>{newPhotoId}</p>}
      {previewUrl && <img src={previewUrl} alt="Preview" />}
      {!newPhotoId ? fileInput : buttonContainer}
    </>
  )
}

export default PhotoUploader