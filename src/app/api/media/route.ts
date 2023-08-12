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
    if (!user) return new Response('Unauthorized', { status: 401 })

    const { fileName, fileType, fileSize } = await req.json()
    if (!fileType || !fileName || !fileSize) {
      throw new Error("There was a problem with the file!")
    }

    const newMedia: Photo = await prisma.photo.create({
      data: {
        fileSize: fileSize,
        fileName: fileName,
        mimeType: fileType,
        authorId: user.id,
        authorName: `${user.firstName} ${user.lastName}`
      }
    })

    if (!newMedia) { throw new Error("Something went wrong!") }

    const putCommand = new PutObjectCommand({
      Key: newMedia.id,
      ContentType: fileType,
      Bucket: process.env.BUCKET_NAME,
    })
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 600 })

    const getCommand = new GetObjectCommand({
      Key: newMedia.id,
      Bucket: process.env.BUCKET_NAME,
    })
    const getUrl = await getSignedUrl(client, getCommand, { expiresIn: 600 })

    return NextResponse.json({ putUrl, getUrl }, { status: 200 })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  POST,
}