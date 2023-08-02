// Types
import { Video } from '@/types/models'

// Services
import { fetchVideos } from '@/services/backendServices'
import VideoCard from './VideoCard'

const VideoList = async () => {
  const videos: Video[] = await fetchVideos()

  return (
    <section className="responsive-grid">
      {videos.map((video: any) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </section>
  )
}

export default VideoList