import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { revalidateTag } from "next/cache"
import { currentUser } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"
import { generatePresignedGetURL, generatePresignedPutURL, getPublicURL } from "@/lib/aws"

const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    const { fileName, fileType, fileSize } = await req.json()
    if (!fileType || !fileName || !fileSize) {
      throw new Error("There was a problem with the file!")
    }

    // Create a new photo entry in database.
    // The uploaded image source file will be stored in the S3 bucket 
    // with a name (Key) matching the id (PK) of the new photo record. 
    const newPhoto: Photo = await prisma.photo.create({
      data: {
        isUploaded: true,
        fileSize: fileSize,
        fileName: fileName,
        mimeType: fileType,
        authorId: user.id,
        authorName: `${user.firstName} ${user.lastName}`
      }
    })
    //TODO Add an additional check to set it back to false if the upload fails.
    // Setting isUploaded to true here assumes the upload will be successful.

    if (!newPhoto) { throw new Error("Something went wrong!") }

    // Generate presigned URLS
    const putURL = await generatePresignedPutURL(newPhoto.id, fileType)
    const getURL = await generatePresignedGetURL(newPhoto.id)


    revalidateTag("photos")

    return NextResponse.json({ putURL, getURL, newPhotoId: newPhoto.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const GET = async (req: NextRequest) => {
  try {
    // PUBLIC ROUTE
    const photos: Photo[] = await prisma.photo.findMany({})
    const photosWithUrl = await Promise.all(photos.map(async (photo) => {

      // Public URL:
      const url = getPublicURL(photo.id)
      console.log("PUBLIC URL", url)

      // Temporary presigned URL:
      // const url = await generatePresignedGetURL(photo.id)

      return { ...photo, url }
    }))

    return NextResponse.json(photosWithUrl)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  POST,
  GET,
}