import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from '@clerk/nextjs'
import { Video } from "@/types/models"

const GET = async (req: Request) => {
  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })
  const videos = await prisma.video.findMany()
  return NextResponse.json(videos)
}

const POST = async (req: Request) => {
  try {
    console.log("REQUEST BODY:", req.body)
    const video: Video = await prisma.video.create({
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
  GET,
  POST,
}