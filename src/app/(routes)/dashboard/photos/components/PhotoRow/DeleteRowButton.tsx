"use client"
import { useRouter } from "next/navigation"
import { useTransition, useState } from "react"
import { deletePhoto } from "@/services/photoService"

const DeleteRowButton = ({ photoId }: { photoId: string }) => {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)
  const [isPending, startTransition] = useTransition()
  const isMutating = isFetching || isPending

  const handleDelete = async () => {
    setIsFetching(true)
    await deletePhoto(photoId)
    startTransition(() => { router.refresh() })
    setIsFetching(false)
  }

  const buttonStyle = `row-ui-element ml-auto ${isMutating ? "opacity-25" : "opacity-100"}`
  return <button className={buttonStyle} onClick={handleDelete}>Remove</button>
}

export default DeleteRowButton
