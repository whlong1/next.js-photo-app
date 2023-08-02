
// Components 
import VideoForm from "./components/VideoForm"
import VideoList from "./components/VideoList"

const Videos = async () => {
  return (
    <>
      <h1>Videos Hub</h1>
      <VideoList />
      <VideoForm />
    </>
  )
}

export default Videos