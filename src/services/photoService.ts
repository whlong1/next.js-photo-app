// Types
import { Photo } from "@/types/models"
import { SearchParams } from "@/types/params"
import { PhotoFormData, FileUploadData } from "@/types/forms"

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
    const { fullsize, medium, thumbnail, ...fileMetaData } = fileUploadData
    if (!fullsize || !thumbnail || !medium) throw new Error("File not found!")

    const res = await fetch(`${BASE_URL}/api/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...fileMetaData,
        ...photoFormData,
      })
    })

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

    const {
      mediumPutURL,
      fullsizePutURL,
      thumbnailPutURL,
      newPhotoId,
    } = await res.json()

    if (!fullsizePutURL || !thumbnailPutURL) {
      throw new Error("A problem has occured with a presigned URL")
    }

    // To reduce server load, files are uploaded directly to S3 bucket.
    await uploadFileToS3Bucket(medium, mediumPutURL)
    await uploadFileToS3Bucket(fullsize, fullsizePutURL)
    await uploadFileToS3Bucket(thumbnail, thumbnailPutURL)

    return { newPhotoId }
  } catch (error) {
    throw error
  }
}

function isEmpty(params: SearchParams) {
  for (const key in params) return false
  return true
}

export const createQueryString = (searchParams: SearchParams): string => {
  if (isEmpty(searchParams)) return ""
  return Object.keys(searchParams).map((k) => {
    const key = k as keyof typeof searchParams
    return `${key}=${searchParams[key]}`
  }).join("&")
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
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
    return await res.json()
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

export const addPhotoToFavorites = async (photoId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/photos/${photoId}/favorites`, {
      method: "POST",
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}