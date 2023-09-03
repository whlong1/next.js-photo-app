"use client"

// Hooks
import { useState } from "react"

// Types
import { Photo } from "@/types/models"

// Services
import { updatePhoto } from "@/services/photoService"

const PrivacyDropdown = ({ photo }: { photo: Photo }) => {
  const [privacySetting, setPrivacySetting] = useState(
    photo.isPublic ? "Public" : "Private"
  )

  // TODO Add modal to view image src, details and stats
  const handlePrivacyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("run")
    setPrivacySetting(e.target.value)
    const formData = { isPublic: e.target.value === "Public" }
    const res = await updatePhoto(photo.id, formData)

    console.log(res)
  }
  return (
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
  )
}

export default PrivacyDropdown