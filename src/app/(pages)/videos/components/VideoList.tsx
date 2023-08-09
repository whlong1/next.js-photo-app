"use client"
import { useState } from 'react'
// Types
import { Video } from '@/types/models'

// Components
import VideoCard from './VideoCard'
import FilterTab from './FilterTab'

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([])

  return (
    <main className="flex flex-col">
      <FilterTab videos={videos} setVideos={setVideos} />
      <section className="responsive-grid">
        {videos.map((video: any) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </section>
    </main>
  )
}

export default VideoList