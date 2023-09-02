import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { revalidateTag } from "next/cache"
import { currentUser } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"
import { generatePresignedPutURL, getPublicURL } from "@/lib/aws"
import { createPrismaQueryFromURL } from "@/lib/helpers"

const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })
    const requestBody = await req.json()

    // Create a new photo entry in database.
    // The uploaded image source file will be stored in the S3 bucket 
    // with a name (Key) matching the id (PK) of the new photo record. 
    const newPhoto: Photo = await prisma.photo.create({
      data: {
        ...requestBody,
        isUploaded: true,
        authorId: user.id,
        authorName: `${user.firstName} ${user.lastName}`
      }
    })
    //TODO Setting isUploaded to true here assumes the upload will be successful.
    //TODO Add an additional check to set it back to false if the upload fails.

    if (!newPhoto) { throw new Error("Something went wrong!") }

    // Generate presigned PutURL for uploading on client side:
    const putURL = await generatePresignedPutURL(newPhoto.id, requestBody.mimeType)

    revalidateTag("photos")

    return NextResponse.json({ putURL, newPhotoId: newPhoto.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const GET = async (req: NextRequest) => {
  try {
    const prismaQueryObject = createPrismaQueryFromURL(req.url)
    const photos: Photo[] = await prisma.photo.findMany({
      // where: { isPublic: true },
      where: prismaQueryObject,
      orderBy: { createdAt: "desc" }
    })

    // NOTE: getPhotosWithPresignedURL() would be more secure:
    const photosWithPublicUrl = photos.map((photo) => {
      return { ...photo, url: getPublicURL(photo.id) }
    })

    return NextResponse.json(photosWithPublicUrl)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  POST,
  GET,
}