"use client"

// Hooks
import { useState } from "react"

// Types
import { Photo } from "@/types/models"

// Components
import Link from "next/link"
import Thumbnail from "./Thumbnail"
import DeleteRowButton from "./DeleteRowButton"

// Services
import { updatePhoto } from "@/services/photoService"

// Helpers
import { formatBytes } from "@/lib/helpers"

const PhotoRow = ({ photo }: { photo: Photo }) => {

  const path = `/dashboard/photos/${photo.id}`

  const [privacySetting, setPrivacySetting] = useState(
    photo.isPublic ? "Public" : "Private"
  )


  // Need to place the following UI:
  const viewBtn = <Link href={path}>VIEW</Link>
  const checkBox = <input type="checkbox" readOnly checked={photo.isUploaded} />

  // TODO Add modal to view image src, details and stats

  const handlePrivacyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrivacySetting(e.target.value)
    const formData = { isPublic: e.target.value === "Public" }
    const res = await updatePhoto(photo.id, formData)
  }

  return (
    <div className="row-container">
      <Thumbnail photo={photo} />
      <div className="flex flex-col text-xs">
        <p className="max-w-[360px] single-line-truncate">{photo.fileName}</p>
        <p>{photo.fileSize && formatBytes(photo.fileSize)}</p>
      </div>

      <select
        id="isPublic"
        name="isPublic"
        value={privacySetting}
        onChange={handlePrivacyChange}
        className="row-ui-element pl-1"
      >
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>

      <DeleteRowButton photoId={photo.id} />
    </div>
  )
}

export default PhotoRow