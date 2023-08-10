import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server"

// Runtime check for environment variables
if (!process.env.REGION || !process.env.ACCESS_KEY || !process.env.SECRET_ACCESS_KEY) {
  throw new Error("Environment variables are not set")
}

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
})

const POST = async (req: NextRequest) => {
  try {

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: req.nextUrl.searchParams.get("file") as string,
      ContentType: String(req.nextUrl.searchParams.get("fileType")),
    }

    const command = new PutObjectCommand(params)
    const response = await s3.send(command)
    console.log("S3 RESPONSE", response)

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    throw error
  }
}

export {
  POST,
}