import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Photo } from "@/types/models"
import { generatePresignedGetURL } from "@/lib/aws"

// This action appears to be dynamic (no apparent need for cache management)
// Question: Will all db operations on the server behave the same way?
export const getMyPhotos = async () => {
  try {
    const { userId } = auth()
    if (!userId) throw new Error("User not authenticated.")

    const photos: Photo[] = await prisma.photo.findMany({ where: { authorId: userId } })
    const photosWithUrl = await Promise.all(photos.map(async (photo) => {
      const url = await generatePresignedGetURL(photo.id)
      return { ...photo, url }
    }))

    return photosWithUrl
  } catch (error) {
    throw error
  }
}