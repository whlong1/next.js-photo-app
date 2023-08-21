import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { currentUser } from '@clerk/nextjs'
import { generatePresignedGetURL } from "@/lib/aws"
import { NextRequest, NextResponse } from "next/server"

const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    const photos: Photo[] = await prisma.photo.findMany({ where: { authorId: user.id } })
    const photosWithUrl = await Promise.all(photos.map(async (photo) => {
      const url = await generatePresignedGetURL(photo.id)
      return { ...photo, url }
    }))

    return NextResponse.json(photosWithUrl)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  GET
}