import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Photo } from "@/types/models"
import { generatePresignedGetURL } from "@/lib/aws"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })
    const photos: Photo[] = await prisma.photo.findMany({
      where: { authorId: userId },
      orderBy: [
        { createdAt: 'desc' },
      ],
    })
    const photosWithUrl = await Promise.all(photos.map(async (photo) => {
      const url = await generatePresignedGetURL(photo.id)
      return { ...photo, url }
    }))

    return NextResponse.json(photosWithUrl)
  } catch (error) {
    throw error
  }
}