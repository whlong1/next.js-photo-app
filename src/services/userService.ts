import { headers } from "next/headers"
import { Photo } from '@/types/models'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const fetchMyPhotos = async (): Promise<Photo[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/me/photos`, {
      cache: 'no-store',
      headers: headers(),
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}