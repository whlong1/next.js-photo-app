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
// const querySeparator = Object.values(searchParams).length ? "&" : "?"
// const ServerSideFilterTab = ({ querySeparator }: { querySeparator: "?" | "&" }) => {
//   return (
//     <nav>
//       <ul>
//         <li><Link href={`${querySeparator}genre=drama`} replace>Drama</Link></li>
//         <li><Link href={`${querySeparator}director=greta`} replace>Comedy</Link></li>
//         <li><Link href="/videos">Clear</Link></li>
//       </ul>
//     </nav>
//   )
// }


// Accessing Search Params in Server Components:
// https://nextjs.org/docs/app/api-reference/functions/use-search-params#server-components

// export const dynamic = "force-dynamic"
const Videos = async ({ searchParams }: { searchParams: VideoSearchParams }) => {
  const videos: Video[] = await fetchVideosOnServer(searchParams)
  console.log("Server videos:", videos)

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