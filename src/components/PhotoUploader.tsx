"use client"

// React
import { useState } from "react"

// Services
import { createAndUploadPhoto } from "@/services/photoService"

const PhotoUploader = () => {
  const [newPhotoId, setNewPhotoId] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [uploadPending, setUploadPending] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadPending(true)
    const file = e.target.files?.[0]!
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
      {uploadPending && <p>Pending</p>}
      {newPhotoId && <p>{newPhotoId}</p>}
      {previewUrl && <img src={previewUrl} alt="Preview" />}
      {!newPhotoId ? fileInput : buttonContainer}
    </>
  )
}

export default PhotoUploader