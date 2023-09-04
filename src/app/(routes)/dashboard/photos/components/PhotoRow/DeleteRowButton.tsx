"use client"

// Hooks
import { useState } from "react"

// Services
import { deletePhoto } from "@/services/photoService"

// Components
import ConfirmationModal from "./ConfirmationModal"


interface DeleteRowButtonProps {
  photoId: string;
  handleTransition: (callback: () => Promise<void>) => Promise<void>;
}

const DeleteRowButton = ({ photoId, handleTransition }: DeleteRowButtonProps) => {
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const handleDelete = async () => {
    handleModal()
    await handleTransition(() => deletePhoto(photoId))
  }

  return (
    <>
      <button className="row-ui-element ml-auto" onClick={handleModal}>
        Remove
      </button>
      <ConfirmationModal
        showModal={showModal}
        onCancel={handleModal}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete this photo?"
      />
    </>
  )
}

export default DeleteRowButton