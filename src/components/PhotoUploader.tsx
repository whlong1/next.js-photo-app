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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.dataTransfer.items || e.dataTransfer.items.length !== 1) return
    const file = e.dataTransfer.items[0].getAsFile()!
    handleFile(file)
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

  const dragAndDrop = (
    <div
      className="w-full h-96 border-4 border-blue"
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); console.log("Drag Over", e) }}
    >
      DRAG N DROP
    </div>
  )

  return (
    <>
      <h2>Photo Uploader</h2>
      {dragAndDrop}
      {uploadPending && <p>Pending</p>}
      {newPhotoId && <p>{newPhotoId}</p>}
      {previewUrl && <img src={previewUrl} alt="Preview" />}
      {!newPhotoId ? fileInput : buttonContainer}
    </>
  )
}

export default PhotoUploader