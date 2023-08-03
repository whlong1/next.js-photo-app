// Types
import { VideoSearchParams } from '@/types/props'

// Components 
import VideoForm from "./components/VideoForm"
import VideoList from "./components/VideoList"

// Accessing Search Params in Server Components:
// https://nextjs.org/docs/app/api-reference/functions/use-search-params#server-components

const Videos = async ({ searchParams }: { searchParams: VideoSearchParams }) => {
  return (
    <>
      <h1>Videos Hub</h1>
      <VideoList searchParams={searchParams} />
      <VideoForm />
    </>
  )
}

export default Videos