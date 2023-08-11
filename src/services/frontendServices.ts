// Types
import { Video } from '@/types/models'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createVideo = async (formData: Video): Promise<Video> => {
  try {
    const res = await fetch(`${BASE_URL}/api/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    throw error
  }
}

export const uploadMedia = async (file: File, filename: string, fileType: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/media?filename=${filename}&fileType=${fileType}`, {
      body: file,
      method: "POST",
      cache: 'no-store',
      headers: { "Content-Type": fileType },
    })
    return res.json()
  } catch (error) {
    throw error
  }
}