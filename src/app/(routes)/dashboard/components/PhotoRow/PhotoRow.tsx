"use client"

// Types
import { Photo } from "@/types/models"

// Helpers
import { formatBytes } from "@/lib/helpers"

// Components
import DeleteRowButton from "./DeleteRowButton"
import PrivacyDropdown from "./PrivacyDropdown"
import SmartImage from "@/components/SmartImage"

// Hooks
import { useMutationTransition } from "@/hooks/useMutationTransition"

const PhotoRow = ({ photo }: { photo: Photo }) => {
  const path = `/dashboard/photos/${photo.id}`
  const pendingStyle = "opacity-25 animate-pulse"
  const { handleTransition, transitionStyle } = useMutationTransition(pendingStyle)

  return (
    <div className={`row-container ${transitionStyle}`}>
      <SmartImage photo={photo} displayMode="thumbnail" />

      <div className="flex flex-col text-xs">
        <p className="max-w-[360px] single-line-truncate">{photo.fileName}</p>
        <p>{photo.fileSize && formatBytes(photo.fileSize)}</p>
      </div>

      <section className="flex ml-auto">
        <PrivacyDropdown photo={photo} />
        <DeleteRowButton
          photoId={photo.id}
          handleTransition={handleTransition}
        />
      </section>
    </div>
  )
}

export default PhotoRow