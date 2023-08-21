import { headers } from "next/headers"
import { Photo } from '@/types/models'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// On delete - need to update myPhotos and photos cache
// Test whether revalidation occurs based on search params
// fetch photos can be backend only
// fetch my photos can use query params

export const fetchMyPhotos = async (): Promise<Photo[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/me/photos`, {
      headers: headers(),
      next: { tags: ["myPhotos"], revalidate: 60 },
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const fetchPhotoById = async (photoId: string): Promise<Photo> => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/me/photos/${photoId}`, {
      cache: 'no-store',
      headers: headers(),
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}