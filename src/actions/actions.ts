import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Photo } from "@/types/models"
import { headers } from "next/headers"
import { generatePresignedGetURL, getPublicURL } from "@/lib/aws"

// This action appears to be dynamic (no apparent need for cache management)
// Question: Will all db operations on the server behave the same way?

// DB operation requires userId, which requires the Clerk auth() hook.
// If the request is issued from a server component, the headers hook needs
// to be included on the fetch for the Clerk hook to work. This makes the route
// dynamic, and opts out of caching. As a result it makes the most sense to do a 
// direct DB query inside the server component, though taking advantage of the cache 
// might be preferable eventually.

// Helper
const appendPublicURLs = (photos: Photo[]): Photo[] => {
  return photos.map((photo) => {
    return { ...photo, url: getPublicURL(photo.id, photo.mimeType, "thumbnail") }
  })
}

// Alternate approach for added security
const appendPresignedURLs = async (photos: Photo[]): Promise<Photo[]> => {
  return await Promise.all(photos.map(async (photo) => {
    const url = await generatePresignedGetURL(photo.id)
    return { ...photo, url }
  }))
}

export const getMyPhotos = async () => {
  try {
    const { userId } = auth()
    if (!userId) throw new Error("Unauthorized")

    const photos: Photo[] = await prisma.photo.findMany({
      where: { authorId: userId },
      orderBy: [{ createdAt: 'desc' }],
    })

    const photosWithPublicUrl = appendPublicURLs(photos)

    return photosWithPublicUrl
  } catch (error) {
    throw error
  }
}