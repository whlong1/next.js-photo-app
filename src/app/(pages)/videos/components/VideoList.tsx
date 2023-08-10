// Types
import { Video } from '@/types/models'

// Components
import VideoCard from './VideoCard'
import FilterTab from './FilterTab'

const VideoList = ({ videos }: { videos: Video[] }) => {

  return (
    <main className="flex flex-col">
      <FilterTab />
      <section className="responsive-grid">
        {videos.map((video: any) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </section>
    </main>
  )
}

export default VideoList