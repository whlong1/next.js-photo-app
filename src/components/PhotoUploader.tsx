"use client"

// React
import { useState } from "react"

// Components
import FileInput from "./FileInput"
import DragAndDrop from "./DragAndDrop"

// Services
import { createAndUploadPhoto } from "@/services/photoService"

const PhotoUploader = () => {
  const [newPhotoId, setNewPhotoId] = useState("")
  const [filePreviewURL, setFilePreviewURL] = useState("")
  const [uploadPending, setUploadPending] = useState(false)
  const [s3PresignedGetURL, setS3PresignedGetURL] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploadPending(true)

    const {
      getURL,
      newPhotoId,
    } = await createAndUploadPhoto(selectedFile)

    handleReset()
    setNewPhotoId(newPhotoId)
    setS3PresignedGetURL(getURL)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setFilePreviewURL("")
    setUploadPending(false)
    URL.revokeObjectURL(filePreviewURL)
  }

  const selectAndPreview = (file: File) => {
    setSelectedFile(file)
    setFilePreviewURL(URL.createObjectURL(file))
  }

  return (
    <div className="flex flex-col w-[400px] h-[600px] rounded bg-white items-center p-4">
      <h2>UPLOAD FILES</h2>
      <DragAndDrop selectAndPreview={selectAndPreview} uploadPending={uploadPending}>
        <FileInput selectAndPreview={selectAndPreview} />
      </DragAndDrop>

      {newPhotoId && <p>{newPhotoId}</p>}

      {filePreviewURL && <img src={filePreviewURL} alt="Selected file" />}
      {s3PresignedGetURL && <img src={s3PresignedGetURL} alt="Uploaded file" />}

      <button
        className="w-full bg-slate-500 text-white font-semibold"
        onClick={handleUpload}>CONFIRM</button>
      <button
        onClick={handleReset}>CANCEL</button>
    </div>
  )
}

export default PhotoUploader