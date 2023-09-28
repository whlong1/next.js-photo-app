import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { revalidateTag } from "next/cache"
import { currentUser } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"
import { createPrismaQueryFromURL } from "../helpers/queryHelpers"
import { generatePresignedPutURL, getPublicURL } from "@/lib/aws"

const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    // TODO Add type
    const requestBody = await req.json()

    // Creates a new photo entry in database.
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
    //TODO Issue being, upload occurs in the client.

    if (!newPhoto) { throw new Error("Something went wrong!") }

    // Generates a presigned PutURL for uploading the Fullsize photo:
    const fullsizePutURL = await generatePresignedPutURL(newPhoto.id, requestBody.mimeType, "fullsize")
    // Generates a presigned PutURL for uploading Medium size photo:
    const mediumPutURL = await generatePresignedPutURL(newPhoto.id, requestBody.mimeType, "medium")
    // Generates a presigned PutURL for uploading the Thumbnail photo:
    const thumbnailPutURL = await generatePresignedPutURL(newPhoto.id, requestBody.mimeType, "thumbnail")
    // In all scenarios, the actual upload occurs on the client side using the URLs generated here

    // Revalidates cache
    revalidateTag("photos")

    return NextResponse.json({
      mediumPutURL,
      fullsizePutURL,
      thumbnailPutURL,
      newPhotoId: newPhoto.id
    }, { status: 200 })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const GET = async (req: NextRequest) => {
  try {

    const photos: Photo[] = await prisma.photo.findMany({
      orderBy: { createdAt: "desc" },
      where: createPrismaQueryFromURL(req.url),
    })

    // Note, getPhotosWithPresignedURL() is more secure,
    // but the returned photos have been marked as public by the author.
    const photosWithPublicUrl = photos.map((photo) => {
      return { ...photo, url: getPublicURL(photo.id, photo.mimeType, "medium") }
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