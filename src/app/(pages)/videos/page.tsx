// Next
import Link from 'next/link'

// Types
import { Video } from '@/types/models'
import { VideoSearchParams } from '@/types/props'

// Components 
import VideoForm from "./components/VideoForm"
import VideoList from "./components/VideoList"

// Services
import { fetchVideosOnServer } from '@/services/backendServices'

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

// Accessing Search Params in Server Components:
// https://nextjs.org/docs/app/api-reference/functions/use-search-params#server-components

const Videos = async ({ searchParams }: { searchParams: VideoSearchParams }) => {
  // const videos: Video[] = await fetchVideosOnServer(searchParams)
  

  return (
    <>
      <h1>Videos Hub</h1>
      <VideoList />
      <VideoForm />
    </>
  )
}

export default Videos