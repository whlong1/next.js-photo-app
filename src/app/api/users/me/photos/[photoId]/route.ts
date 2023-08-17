import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from "next/server"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"

// Runtime check for environment variables
if (!process.env.REGION || !process.env.ACCESS_KEY || !process.env.SECRET_ACCESS_KEY) {
  throw new Error("Environment variables are not set")
}

//TODO Refactor to single isntance?
// Initialize S3Client instance
const client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
})

const generatePresignedURL = async (photoId: string) => {
  // GetObjectCommand: used to generate a pre-signed URL for viewing.
  const getCommand = new GetObjectCommand({
    Key: photoId,
    Bucket: process.env.BUCKET_NAME,
  })
  // Generate pre-signed URL for GET request
  return await getSignedUrl(client, getCommand, { expiresIn: 600 })
}


const GET = async (req: NextRequest, { params }: { params: { photoId: string } }) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    const { photoId } = params
    if (!photoId) return NextResponse.json({ msg: "Resource not found" }, { status: 404 })

    const photo: Photo | null = await prisma.photo.findUnique({ where: { id: photoId } })

    if (!photo) return NextResponse.json({ msg: "Resource not found" }, { status: 404 })

    const url = await generatePresignedURL(photoId)
    if (!url) return NextResponse.json({ msg: "Resource not found" }, { status: 404 })

    return NextResponse.json({ ...photo, url })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  GET
}