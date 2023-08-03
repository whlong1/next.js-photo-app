import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from '@clerk/nextjs'
import { Video } from "@/types/models"

const getSearchParams = (url: string) => {
  const { searchParams } = new URL(url)
  return Object.fromEntries(searchParams)
}

// For more info on the prisma query below:
// https://github.com/prisma/prisma/discussions/8216#discussioncomment-992302

const GET = async (req: Request) => {
  try {
    const { userId } = auth()
    if (!userId) return new Response('Unauthorized', { status: 401 })

    const videos = await prisma.video.findMany({
      where: { AND: getSearchParams(req.url) }
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.log("error block")
    throw error
  }
}

const POST = async (req: Request) => {
  try {
    const { userId } = auth()
    const data = await req.json()
    if (!userId) return new Response('Unauthorized', { status: 401 })

    const video: Video = await prisma.video.create({
      data: {
        ...data,
        authorId: userId
      }
    })

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    throw error
  }
}

export {
  GET,
  POST,
}