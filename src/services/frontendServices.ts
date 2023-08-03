// Types
import { Video } from '@/types/models'
import { VideoSearchParams } from '@/types/props'

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

// CLIENT
export const fetchVideosOnClient = async (searchParams: VideoSearchParams): Promise<Video[]> => {
  try {
    const queryString = Object.keys(searchParams).map((k) => {
      const key = k as keyof typeof searchParams
      return `${key}=${searchParams[key]}`
    }).join("&")

    const res = await fetch(`${BASE_URL}/api/videos?${queryString}`, {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    throw error
  }
}