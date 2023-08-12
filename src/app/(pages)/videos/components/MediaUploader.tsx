"use client"

// React
import { useState } from "react"

// Services
import { uploadMedia } from "@/services/frontendServices"

const MediaUploader = () => {
  const [uploadedUrl, setUploadedUrl] = useState("")

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!
    const res = await uploadMedia(file)
    console.log(res.status)
    setUploadedUrl(res.uploadedUrl)
  }

  return (
    <>
      <h2>Upload Media</h2>
      {uploadedUrl && <img src={uploadedUrl} alt="Preview" />}
      <input
        type="file"
        onChange={handleChange}
        accept="image/png, image/jpeg"
      />
    </>
  )
}

export default MediaUploader