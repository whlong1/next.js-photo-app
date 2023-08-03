// Next
import Link from 'next/link'

// Types
import { Video } from '@/types/models'
import { VideoSearchParams } from '@/types/props'

// Services
import { fetchVideosOnServer } from '@/services/backendServices'

// Components
import VideoCard from './VideoCard'
import FilterTab from './FilterTab'

// Appends one key:value pair to URL at a time:
const ServerSideFilterTab = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/videos?genre=drama">Drama</Link></li>
        <li><Link href="/videos?genre=comedy">Comedy</Link></li>
        <li><Link href="/videos">Clear</Link></li>
      </ul>
    </nav>
  )
}

const VideoList = async ({ searchParams }: { searchParams: VideoSearchParams }) => {
  const videos: Video[] = await fetchVideosOnServer(searchParams)

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