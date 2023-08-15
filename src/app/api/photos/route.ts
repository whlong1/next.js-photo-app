import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from "next/server"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"

// Runtime check for environment variables
if (!process.env.REGION || !process.env.ACCESS_KEY || !process.env.SECRET_ACCESS_KEY) {
  throw new Error("Environment variables are not set")
}

// Initialize S3Client instance
const client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
})

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

    // PutObjectCommand: used to generate a pre-signed URL for uploading
    const putCommand = new PutObjectCommand({
      Key: newPhoto.id,
      ContentType: fileType,
      Bucket: process.env.BUCKET_NAME,
    })
    // Generate pre-signed URL for PUT request
    const putURL = await getSignedUrl(client, putCommand, { expiresIn: 600 })

    // GetObjectCommand: used to generate a pre-signed URL for viewing.
    const getCommand = new GetObjectCommand({
      Key: newPhoto.id,
      Bucket: process.env.BUCKET_NAME,
    })
    // Generate pre-signed URL for GET request
    const getURL = await getSignedUrl(client, getCommand, { expiresIn: 600 })

    return NextResponse.json({ putURL, getURL, newPhotoId: newPhoto.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })
    const photos: Photo[] = await prisma.photo.findMany({})
    return NextResponse.json(photos)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  POST,
  GET,
}