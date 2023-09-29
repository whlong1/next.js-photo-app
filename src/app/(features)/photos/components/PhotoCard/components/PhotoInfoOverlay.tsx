// Types
import { Photo } from "@/types/models"

// Components
import OverlayHeader from "./OverlayHeader"

const PhotoInfoOverlay = ({ photo }: { photo: Photo }) => {
  return (
    <div className="photo-overlay">
      <OverlayHeader photoId={photo.id} />
      <div className="flex items-center">
        <div className="bg-black rounded-full	drop-shadow w-9 h-9 border-[.25px] border-slate-500 mr-3" />
        <div className="pb-0.5">
          <h2 className="text-white text-sm mb-[.85px] font-medium">{photo.authorName}</h2>
          <p className="text-[11px] font-normal opacity-75">{photo.location}</p>
        </div>
      </div>
    </div>
  )
}

export default PhotoInfoOverlay