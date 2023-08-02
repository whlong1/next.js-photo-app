import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from '@clerk/nextjs'
import { Video } from "@/types/models"

const getSearchParams = (url: string) => {
  const { searchParams } = new URL(url)
  return Object.fromEntries(searchParams)
}

const GET = async (req: Request) => {

  const searchParamsObj = getSearchParams(req.url)

  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })
  const videos = await prisma.video.findMany()
  return NextResponse.json(videos)
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