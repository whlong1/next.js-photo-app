import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { revalidateTag } from "next/cache"
import { currentUser } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

// Dynamic Route Segments
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

// Route Segment Config
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#segment-config-options

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

interface RequestOptions { params: { photoId: string } }

const DELETE = async (req: NextRequest, options: RequestOptions) => {
  try {
    const { photoId } = options.params

    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    const photo = await prisma.photo.findUnique({ where: { id: photoId } })

    if (!photo) return NextResponse.json({ msg: "Resource not found" }, { status: 404 })
    if (photo.authorId !== user.id) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    const deleteCommand = new DeleteObjectCommand({
      Key: photoId,
      Bucket: process.env.BUCKET_NAME,
    })

    revalidateTag("photos")

    const s3DeleteResponse = await client.send(deleteCommand)
    const prismaDeleteResponse = await prisma.photo.delete({ where: { id: photoId } })

    return NextResponse.json({ ...s3DeleteResponse, ...prismaDeleteResponse })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const PUT = async (req: NextRequest, options: RequestOptions) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    const formData = await req.json()
    const { photoId } = options.params
    const currentPhotoData = await prisma.photo.findUnique({ where: { id: photoId } })

    if (!currentPhotoData) {
      return NextResponse.json({ msg: "Resource not found" }, { status: 404 })
    }

    if (currentPhotoData.authorId !== user.id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })
    }

    const updatedPhoto: Photo = await prisma.photo.update({
      data: formData,
      where: { id: photoId },
    })

    return NextResponse.json(updatedPhoto)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  PUT,
  DELETE,
}