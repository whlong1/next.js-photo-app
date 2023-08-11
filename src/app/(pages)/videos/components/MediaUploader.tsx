"use client"

// Services
import { uploadMedia } from "@/services/frontendServices"

const MediaUploader = () => {

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!
    const filename = file.name
    const fileType = file.type
    const res = await uploadMedia(file, filename, fileType)
    console.log("Upload response", res)
  }

  return (
    <>
      <h2>Upload Media</h2>
      <input
        type="file"
        onChange={handleChange}
        accept="image/png, image/jpeg"
      />
    </>
  )
}

export default MediaUploader