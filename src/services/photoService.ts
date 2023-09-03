// Types
import { Photo } from "@/types/models"
import { SearchParams } from "@/types/params"
import { PhotoFormData, FileUploadData } from "@/types/forms"

// Helpers
import { createQueryString } from "@/lib/helpers"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Service function makes a request to the putURL returned from 
// createAndUploadPhoto. The media file included in body.
const uploadFileToS3Bucket = async (file: File, putUrl: string) => {
  const uploadResponse = await fetch(putUrl, {
    body: file,
    method: "PUT",
    headers: { "Content-Type": file.type }
  })
  return uploadResponse.ok
}

// Creates the new Photo record and generates the putURL for client side upload.
export const createAndUploadPhoto = async (fileUploadData: FileUploadData, photoFormData: PhotoFormData) => {
  try {
    const { file, ...fileMetaData } = fileUploadData
    if (!file) throw new Error("File not found!")

    const res = await fetch(`${BASE_URL}/api/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...fileMetaData,
        ...photoFormData,
      })
    })

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
    const { putURL, newPhotoId } = await res.json()
    if (!putURL) throw new Error("A problem has occured with a presigned URL")

    // To reduce server load, file is uploaded to S3 bucket from client.
    const uploadStatus = await uploadFileToS3Bucket(file, putURL)
    console.log("Upload Res:", uploadStatus)

    return { uploadStatus, newPhotoId }
  } catch (error) {
    throw error
  }
}

// Publicly accessible photos
export const fetchPhotos = async (searchParams: SearchParams): Promise<Photo[]> => {
  try {
    const queryString = createQueryString(searchParams)
    const res = await fetch(`${BASE_URL}/api/photos?${queryString}`, {
      next: { tags: ["photos"], revalidate: 0 },
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const updatePhoto = async (photoId: string, photoFormData: PhotoFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/photos/${photoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photoFormData)
    })
    const data = await res.json()
    return data
  } catch (error) {
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