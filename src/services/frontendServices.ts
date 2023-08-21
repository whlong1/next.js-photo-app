// Types
import { Video } from "@/types/models"
import { VideoFormData } from "@/types/forms"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const createVideo = async (formData: VideoFormData): Promise<Video> => {
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