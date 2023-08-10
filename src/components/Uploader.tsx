"use client"

// Services
import { uploadMedia } from "@/services/frontendServices"

const Uploader = () => {

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        onChange={uploadPhoto}
        accept="image/png, image/jpeg"
      />
    </>
  )
}

export default Uploader