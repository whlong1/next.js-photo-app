import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

const POST = async (req: NextRequest) => {
  try {
    const video = await prisma.video.create({
      data: {
        year: 0,
        genre: "",
        title: "",
        artist: "",
        director: "",
        category: "",

        videoUrl: "",
        thumbnailUrl: "",

        authorId: ""
      }
    })
    
    return NextResponse.json(video)
  } catch (error) {
    throw error
  }
}

export {
  POST
}