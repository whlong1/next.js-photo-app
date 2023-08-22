"use client"

// React
import { useState } from "react"

// Hooks
import { useQueryManager } from "@/hooks/useQueryManager"

// Components
import FileInput from "./FileInput"
import DragAndDrop from "./DragAndDrop"
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

  return (
    <div className="flex flex-col w-[400px] h-[600px] rounded bg-white items-center p-4">
      <h2>UPLOAD FILES</h2>
      <DragAndDrop selectAndPreview={selectAndPreview} uploadPending={uploadPending}>
        <FileInput selectAndPreview={selectAndPreview} />
      </DragAndDrop>

      {newPhotoId && <p>{newPhotoId}</p>}

      {filePreviewURL && <img src={filePreviewURL} alt="Selected file" />}
      {s3PresignedGetURL && <img src={s3PresignedGetURL} alt="Uploaded file" />}


      <p>FILES</p>
      <p>
        file name <br />
        filesize
      </p>

      <button
        className="w-full bg-slate-500 text-white font-semibold"
        onClick={handleUpload}>CONFIRM</button>
      <button
        onClick={handleReset}>CANCEL</button>
    </div>
  )
}

export default PhotoUploader