"use client"

// React
import { useState } from "react"

// Services
import { createAndUploadPhoto } from "@/services/photoService"

const PhotoUploader = () => {
  const [newPhotoId, setNewPhotoId] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [isDragActive, setIsDragActive] = useState(false)
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
      className={`w-full h-96 border-4 border-blue ${isDragActive ? "bg-gray-200" : "bg-gray-500"}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => { e.preventDefault(); setIsDragActive(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false) }}
    >
      {uploadPending ? <p>Pending</p> : <p>DRAG N DROP</p>}
    </div>
  )

  return (
    <>
      <h2>Photo Uploader</h2>
      {dragAndDrop}

      {newPhotoId && <p>{newPhotoId}</p>}
      {previewUrl && <img src={previewUrl} alt="Preview" />}
      {!newPhotoId ? fileInput : buttonContainer}
    </>
  )
}

export default PhotoUploader