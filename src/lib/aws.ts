import { Photo } from "@/types/models"
import { SizeType } from "@/types/types"
import { FILE_EXTENSION_LOOKUP } from "./constants"
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

export const getPublicURL = (photoId: string, mimeType: string, size: SizeType) => {
  const fileExtension = FILE_EXTENSION_LOOKUP[mimeType]
  const filePath = `${photoId}/${size}.${fileExtension}`
  return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${filePath}`
}

// TODO Update for new file path convention
export const getPhotosWithPresignedURL = async (photos: Photo[]) => {
  return await Promise.all(photos.map(async (photo) => {
    // Temporary presigned URL:
    const url = await generatePresignedGetURL(photo.id)
    return { ...photo, url }
  }))
}

// TODO Update for new file path convention
export const generatePresignedGetURL = async (photoId: string) => {
  // GetObjectCommand: used to generate a pre-signed URL for viewing.
  const getCommand = new GetObjectCommand({
    Key: photoId,
    Bucket: process.env.BUCKET_NAME,
  })
  // Generate pre-signed URL for GET request
  return await getSignedUrl(client, getCommand, { expiresIn: 600 })
}

export const generatePresignedPutURL = async (photoId: string, mimeType: string, size: SizeType) => {
  // The photoId, mimeType, and size are used to generate the objectKey for the uploaded file.
  // The photoId pseudo "directory" will contain two files: "fullsize" and "thumbnail".
  // The FILE_EXTENSION_LOOKUP can be modified to handle additional mimeTypes.

  // Example objectKey: 03f82/fullsize.jpg
  const objectKey = `${photoId}/${size}.${FILE_EXTENSION_LOOKUP[mimeType]}`

  // PutObjectCommand: used to generate a pre-signed URL for uploading
  const putCommand = new PutObjectCommand({
    Key: objectKey,
    ContentType: mimeType,
    Bucket: process.env.BUCKET_NAME,
  })
  // Generate pre-signed URL for PUT request
  return await getSignedUrl(client, putCommand, { expiresIn: 600 })
}