// Types
import { Video } from '@/types/models'

// Components 
import VideoForm from "./components/VideoForm"

import { fetchVideos } from '@/services/backendServices'

const VideoList = async () => {
  // const videos: Video[] = await ...
  return (
    <></>
    // videos.map((vid) => (
    //   <p>V</p>
    // ))
  )
}

const NewVideo = async () => {
  return (
    <form action=""></form>
  )
}

const Videos = async () => {
  const data = await fetchVideos()
  return (
    <>
      <h1>This is the protected videos page</h1>
      <VideoForm />
    </>
  )
}

export default Videos