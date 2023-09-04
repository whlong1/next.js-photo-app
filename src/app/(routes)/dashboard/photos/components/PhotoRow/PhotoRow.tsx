// Types
import { Photo } from "@/types/models"

// Components
import Link from "next/link"
import Thumbnail from "./Thumbnail"
import DeleteRowButton from "./DeleteRowButton"
import PrivacyDropdown from "./PrivacyDropdown"

// Helpers
import { formatBytes } from "@/lib/helpers"

import { Suspense } from "react"

const PhotoRow = ({ photo }: { photo: Photo }) => {
  const path = `/dashboard/photos/${photo.id}`

  // Need to place the following UI:
  const viewBtn = <Link href={path}>VIEW</Link>
  const checkBox = <input type="checkbox" readOnly checked={photo.isUploaded} />

  return (
    <div className="row-container">
      <Suspense fallback={<p>Loading</p>}>
        <Thumbnail photo={photo} />
      </Suspense>
      <div className="flex flex-col text-xs">
        <p className="max-w-[360px] single-line-truncate">{photo.fileName}</p>
        <p>{photo.fileSize && formatBytes(photo.fileSize)}</p>
      </div>

      <PrivacyDropdown photo={photo} />
      <DeleteRowButton photoId={photo.id} />
    </div>
  )
}

export default PhotoRow