// Types
import { Photo } from '@/types/models'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Response: putUrl for upload, getUrl for previewing, newPhotoId
const createPhotoAndPresignedUrls = async (file: File) => {
  const res = await fetch(`${BASE_URL}/api/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size })
  })

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

  const { putUrl, getUrl, newPhotoId } = await res.json()

  if (!putUrl || !getUrl || !newPhotoId) {
    throw new Error("A problem has occured with a presigned URL")
  }

  return { putUrl, getUrl, newPhotoId }
}

// Request made to putUrl, media file included in body
const uploadFileToS3Bucket = async (file: File, putUrl: string) => {
  const uploadResponse = await fetch(putUrl, {
    body: file,
    method: "PUT",
    headers: { "Content-Type": file.type }
  })
  return uploadResponse.ok
}

export const createAndUploadPhoto = async (file: File) => {
  try {
    const { putUrl, getUrl, newPhotoId } = await createPhotoAndPresignedUrls(file)
    const uploadStatus = await uploadFileToS3Bucket(file, putUrl)
    return { uploadStatus, getUrl, newPhotoId }
  } catch (error) {
    throw error
  }
}