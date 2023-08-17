"use client"
import { useRouter } from "next/navigation"
import { deletePhoto } from "@/services/photoService"

const DeleteRowButton = ({ photoId }: { photoId: string }) => {
  const router = useRouter()
  const handleDelete = async () => {
    const res = await deletePhoto(photoId)
    console.log("Delete response:", res)
    router.refresh()
  }
  return <button onClick={handleDelete}>DELETE</button>
}

export default DeleteRowButton
