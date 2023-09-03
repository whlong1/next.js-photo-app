"use client"

// Hooks
import { useRouter } from "next/navigation"
import { useTransition, useState } from "react"

// Services
import { deletePhoto } from "@/services/photoService"

// Components
import ConfirmationModal from "./ConfirmationModal"

const DeleteRowButton = ({ photoId }: { photoId: string }) => {
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isPending, startTransition] = useTransition()

  const isMutating = isFetching || isPending
  const buttonStyle = `
    row-ui-element ml-auto 
    ${isMutating ? "opacity-25" : "opacity-100"}
  `

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const handleDelete = async () => {
    try {
      handleModal()
      setIsFetching(true)
      await deletePhoto(photoId)
      startTransition(() => { router.refresh() })
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button className={buttonStyle} onClick={handleModal}>
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