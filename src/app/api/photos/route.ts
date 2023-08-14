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
    // Note: isUploaded has a default value of false on the model
    const newPhoto: Photo = await prisma.photo.create({
      data: {
        isUploaded: false,
        fileSize: fileSize,
        fileName: fileName,
        mimeType: fileType,
        authorId: user.id,
        authorName: `${user.firstName} ${user.lastName}`
      }
    })

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


const PUT = async (req: NextRequest) => {
  try {
    const formData = await req.json()

    // Id is currently on formData, RESTful conventions would 
    // imply that the id is on the url. Is there a chance for the id to be updated mistakenly?

    // Add check for isUploaded?
    // Client vs Server

    // Index user's photos, display isUploaded indicator
    // How should we deal with the drag and drop UI for a photo that exists?

    // Tabs to see preview and drag and drop
    // Consider adding crop and editing?
    // Display file that was uploaded as a row
    // Display upload progress meter
    const updatedPhoto: Photo = await prisma.photo.update({
      data: formData,
      where: { id: formData.id },
    })

    return NextResponse.json(updatedPhoto)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  PUT,
  POST,
}