import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from "next/server"

const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    const photos: Photo[] = await prisma.photo.findMany({
      where: { authorId: user.id }
    })

    return NextResponse.json(photos)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  GET
}