// Types
import { Video } from '@/types/models'
import { VideoSearchParams } from '@/types/props'

// Components 
import VideoForm from "./components/VideoForm"
import VideoList from "./components/VideoList"

// Services
import { fetchVideosOnServer } from '@/services/backendServices'

// Accessing Search Params in Server Components:
// https://nextjs.org/docs/app/api-reference/functions/use-search-params#server-components
// Look into dynamic = "force-dynamic"


const Videos = async ({ searchParams }: { searchParams: VideoSearchParams }) => {
  const videos: Video[] = await fetchVideosOnServer(searchParams)
  console.log("SERVER SEARCH PARAMS", searchParams)

  return (
    <>
      <h1>Videos Hub</h1>
      <VideoList videos={videos} />
      <VideoForm />
    </>
  )
}

export default Videos