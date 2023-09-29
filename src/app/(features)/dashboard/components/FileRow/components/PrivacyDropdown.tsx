"use client"

// Hooks
import { useState } from "react"

// Types
import { Photo } from "@/types/models"

// Services
import { updatePhoto } from "@/services/photoService"

// Components
import ConfirmationModal from "./ConfirmationModal"

const PrivacyDropdown = ({ photo }: { photo: Photo }) => {
  const [showModal, setShowModal] = useState(false)

  const [privacySetting, setPrivacySetting] = useState(
    photo.isPublic ? "Public" : "Private"
  )

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrivacySetting(e.target.value)
    setShowModal(true)
  }

  const cancelPrivacyChange = () => {
    setShowModal(false)
    setPrivacySetting(photo.isPublic ? "Public" : "Private")
  }

  const updatePrivacySetting = async () => {
    try {
      setShowModal(false)
      await updatePhoto(photo.id, { isPublic: privacySetting === "Public" })
    } catch (error) {
      console.log(error)
      setPrivacySetting(photo.isPublic ? "Public" : "Private")
    }
  }

  return (
    <>
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

      <ConfirmationModal
        showModal={showModal}
        onCancel={cancelPrivacyChange}
        onConfirm={updatePrivacySetting}
        title="Change Privacy Setting"
        message="Are you sure you want to update the privacy settings?"
      />

    </>
  )
}

export default PrivacyDropdown