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

    const photos: Photo[] = await prisma.photo.findMany({
      where: { authorId: userId },
      orderBy: [
        { createdAt: 'desc' },
      ],
    })
    const photosWithUrl = await Promise.all(photos.map(async (photo) => {
      const url = await generatePresignedGetURL(photo.id)
      return { ...photo, url }
    }))

    return photosWithUrl
  } catch (error) {
    throw error
  }
}

// const GET = async (req: NextRequest, { params }: { params: { photoId: string } }) => {
//   try {
//     const user = await currentUser()
//     if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

//     const { photoId } = params
//     if (!photoId) return NextResponse.json({ msg: "Resource not found" }, { status: 404 })

//     const photo: Photo | null = await prisma.photo.findUnique({ where: { id: photoId } })

//     if (!photo) return NextResponse.json({ msg: "Resource not found" }, { status: 404 })

//     const url = await generatePresignedURL(photoId)
//     if (!url) return NextResponse.json({ msg: "Resource not found" }, { status: 404 })

//     return NextResponse.json({ ...photo, url })
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
