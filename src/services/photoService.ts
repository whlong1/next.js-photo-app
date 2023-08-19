// Types
import { Photo } from '@/types/models'
import { PhotoFormData } from '@/types/forms'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Response: putUrl for upload, getUrl for previewing, newPhotoId
const createPhotoAndPresignedUrls = async (file: File) => {
  const res = await fetch(`${BASE_URL}/api/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size })
  })

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

  const { putURL, getURL, newPhotoId } = await res.json()

  if (!putURL || !getURL || !newPhotoId) {
    throw new Error("A problem has occured with a presigned URL")
  }

  return { putURL, getURL, newPhotoId }
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
    const { putURL, getURL, newPhotoId } = await createPhotoAndPresignedUrls(file)
    const uploadStatus = await uploadFileToS3Bucket(file, putURL)
    return { uploadStatus, getURL, newPhotoId }
  } catch (error) {
    throw error
  }
}

export const createOrUpdatePhoto = async (photoId: string, formData: PhotoFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/photos/${photoId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`)
    }

    return await res.json()
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deletePhoto = async (photoId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/photos/${photoId}`, {
      method: "DELETE",
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const fetchPhotos = async (): Promise<Photo[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/photos`, {
      next: { tags: ['photos'] }
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}
