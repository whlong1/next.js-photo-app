import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { NextRequest, NextResponse } from "next/server"
import { Video } from "@/types/models"
import { auth } from '@clerk/nextjs'
import { prisma } from "@/lib/db"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

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
    const { userId } = auth()
    if (!userId) return new Response('Unauthorized', { status: 401 })

    const newMedia: Video = await prisma.video.create({
      data: {
        status: "pending",
        authorId: userId
      }
    })

    const fileType = req.nextUrl.searchParams.get("fileType")
    const fileName = req.nextUrl.searchParams.get("filename")

    if (!fileType || !fileName) {
      throw new Error("There was a problem with the file name or file type")
    }

    const params = {
      Key: newMedia.id,
      ContentType: "png",
      Bucket: process.env.BUCKET_NAME,
    }

    // Better to generate a Pre-signed URL?
    const command = new PutObjectCommand(params)
    const url = await getSignedUrl(client, command, { expiresIn: 3600 })
    // const response = await s3.send(command)

    return NextResponse.json(url, { status: 200 })
  } catch (error) {
    throw error
  }
}

export {
  POST,
}