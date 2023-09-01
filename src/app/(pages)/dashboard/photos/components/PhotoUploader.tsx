"use client"

// React
import { useState } from "react"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

// Components
import FileInput from "./FileInput"
import DragAndDrop from "./DragAndDrop"
import FilePreviewRow from "./FilePreviewRow"

// Services
import { createAndUploadPhoto } from "@/services/photoService"

const PhotoUploader = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [newPhotoId, setNewPhotoId] = useState("")
  const [filePreviewURL, setFilePreviewURL] = useState("")
  const [uploadPending, setUploadPending] = useState(false)
  const [s3PresignedGetURL, setS3PresignedGetURL] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { queryParams, setQueryParams } = useQueryManager()

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploadPending(true)

    const {
      getURL,
      newPhotoId,
    } = await createAndUploadPhoto(selectedFile, { width, height })

    handleReset()
    setNewPhotoId(newPhotoId)
    setS3PresignedGetURL(getURL)
    setQueryParams("photoId", newPhotoId)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setFilePreviewURL("")
    setUploadPending(false)
    URL.revokeObjectURL(filePreviewURL)
  }

  const selectAndPreview = (file: File) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)
    image.src = objectUrl

    image.onload = () => {
      setWidth(image.width)
      setHeight(image.height)
    }

    setSelectedFile(file)
    setFilePreviewURL(URL.createObjectURL(file))
  }

  const photoPreviewElements = (
    <>
      {newPhotoId && <p>{newPhotoId}</p>}
      {filePreviewURL && <img src={filePreviewURL} alt="Selected file" />}
      {s3PresignedGetURL && <img src={s3PresignedGetURL} alt="Uploaded file" />}
    </>
  )

  return (
    <div className="flex flex-col w-[50%] h-full bg-slate-50 items-center p-4 border-r">
      <DragAndDrop selectAndPreview={selectAndPreview} uploadPending={uploadPending}>
        <FileInput selectAndPreview={selectAndPreview} />
      </DragAndDrop>
      <FilePreviewRow />
    </div>
  )
}

export default PhotoUploader