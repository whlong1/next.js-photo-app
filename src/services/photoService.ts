// Types
import { Photo } from '@/types/models'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const uploadMedia = async (file: File) => {
  try {
    // POST request to backend route handler
    const res = await fetch(`${BASE_URL}/api/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size })
    })
    
    // Response includes a putUrl for upload and a getUrl for displaying a preview
    const { putUrl, getUrl } = await res.json()

    // Request made to putUrl, media file included in body
    const uploadResponse = await fetch(putUrl, {
      body: file,
      method: "PUT",
      headers: { "Content-Type": file.type }
    })

    return { status: uploadResponse.ok, uploadedUrl: getUrl }
  } catch (error) {
    console.log(error)
    throw error
  }
}