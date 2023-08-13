// Components 
// import VideoList from "./components/VideoList"

// Services
import { fetchVideosOnServer } from '@/services/backendServices'

const Photos = async ({ searchParams }: { searchParams: any }) => {
  // const videos: Video[] = await fetchVideosOnServer(searchParams)
  return (
    <main>
      <h1>Photos Hub</h1>
      {/* <VideoList videos={videos} /> */}
    </main>
  )
}

export default Photos