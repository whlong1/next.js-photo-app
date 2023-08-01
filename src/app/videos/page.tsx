// Services
import * as videoService from "@/services/videoService"

// Types
import { Video } from '@/types/models'

const VideoList = ({ videos }: { videos: Video[] }) => {
  return (
    videos.map((vid) => (
      <p>V</p>
    ))
  )
}


const Videos = async () => {
  // const videos: Video[] = await videoService.index()

  return (
    <>
      <h1>Videos</h1>
      {/* <VideoList videos={videos} /> */}
    </>
  )
}

export default Videos