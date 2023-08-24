// Types
import { Photo } from "@/types/models"

// Components
import OverlayHeader from "./OverlayHeader"

const PhotoInfoOverlay = ({ photo }: { photo: Photo }) => {
  const classNames = `
    p-4
    z-10
    w-full
    h-full
    absolute 

    flex
    flex-col
    items-start
    justify-end

    text-white
    leading-none
    tracking-wide
    
    rounded
    bg-black 
    opacity-100
    bg-opacity-40
    hover:opacity-100
    hover:cursor-pointer
    transition-opacity
  `

  return (
    <div className={classNames}>
      <OverlayHeader />
      <div className="flex items-center">
        <div className="bg-black rounded-full	drop-shadow w-9 h-9 border-[.25px] border-slate-500 mr-3" />
        <div className="pb-0.5">
          <h2 className="text-sm mb-[.85px] font-medium">{photo.authorName}</h2>
          <p className="text-[11px] font-normal opacity-75">{photo.location}</p>
        </div>
      </div>
    </div>
  )
}

export default PhotoInfoOverlay