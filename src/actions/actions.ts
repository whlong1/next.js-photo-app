import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Photo } from "@/types/models"
import { generatePresignedGetURL } from "@/lib/aws"

// This action appears to be dynamic (no apparent need for cache management)
// Question: Will all db operations on the server behave the same way?

// DB operation requires userId, which requires the Clerk auth() hook.
// If the request is issued from a server component, the headers hook needs
// to be included on the fetch for the Clerk hook to work. This makes the route
// dynamic, and opts out of caching. As a result it makes the most sense to do a 
// direct DB query inside the server component, though taking advantage of the cache 
// might be preferable eventually.

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