// Types
import { Video } from '@/types/models'

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <article className="flex flex-col rounded shadow-md overflow-hidden">
      <div>
        {/* <img className="h-48 w-full bg-black" src={video.thumbnailUrl} alt={video.title} /> */}
      </div>
      <div className="flex flex-row">
        <h2>{video.title}</h2>
        <p>{video.year}</p>
      </div>
    </article>
  )
}

export default VideoCard