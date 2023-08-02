// Types
import { Video } from '@/types/models'

// Services
import { fetchVideos } from '@/services/backendServices'

const VideoList = async () => {

  const videos: Video[] = await fetchVideos()


  return (
    videos.map((vid: any) => (
      <p>{vid.title}</p>
    ))

  )
}

export default VideoList