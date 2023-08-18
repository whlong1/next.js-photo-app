import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"

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

export const generatePresignedGetURL = async (photoId: string) => {
  // GetObjectCommand: used to generate a pre-signed URL for viewing.
  const getCommand = new GetObjectCommand({
    Key: photoId,
    Bucket: process.env.BUCKET_NAME,
  })
  // Generate pre-signed URL for GET request
  return await getSignedUrl(client, getCommand, { expiresIn: 600 })
}