// Services
import * as videoService from "@/services/videoService"

// Types
import { Video } from '@/types/models'

const VideoList = async() => {
  const videos: Video[] = await videoService.index()
  return (
    videos.map((vid) => (
      <p>V</p>
    ))
  )
}


const Videos = async () => {
  return (
    <>
      <h1>This is the protected videos page</h1>
    </>
  )
}

export default Videos