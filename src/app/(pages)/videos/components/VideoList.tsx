// Next
import Link from 'next/link'

// Types
import { Video } from '@/types/models'
import { SearchParams } from '@/types/props'

// Services
import { fetchVideos } from '@/services/backendServices'
import VideoCard from './VideoCard'
import Search from './Search'

// Appends one key:value pair to URL at a time:
const FilterTab = () => {
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

const VideoList = async ({ searchParams }: { searchParams: SearchParams }) => {
  const videos: Video[] = await fetchVideos(searchParams)

  return (
    <main className="flex flex-col">

      <FilterTab />
      <Search />
      <section className="responsive-grid">
        {videos.map((video: any) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </section>

    </main>
  )
}

export default VideoList