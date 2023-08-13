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
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const [s3PresignedGetURL, setS3PresignedGetURL] = useState("")

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploadPending(true)

    const {
      getUrl,
      newPhotoId,
    } = await createAndUploadPhoto(selectedFile)

    setFilePreviewURL("")
    setUploadPending(false)
    setNewPhotoId(newPhotoId)
    setS3PresignedGetURL(getUrl)
    URL.revokeObjectURL(filePreviewURL)
  }

  const selectAndPreview = (file: File) => {
    setSelectedFile(file)
    setFilePreviewURL(URL.createObjectURL(file))
  }

  return (
    <>
      <h2>Photo Uploader</h2>
      <DragAndDrop selectAndPreview={selectAndPreview} uploadPending={uploadPending} />
      <FileInput selectAndPreview={selectAndPreview} />

      {newPhotoId && <p>{newPhotoId}</p>}

      {filePreviewURL && <img src={filePreviewURL} alt="Selected file" />}
      {s3PresignedGetURL && <img src={s3PresignedGetURL} alt="Uploaded file" />}

      <button onClick={handleUpload}>CONFIRM</button>
      <button>CANCEL</button>
    </>
  )
}

export default PhotoUploader