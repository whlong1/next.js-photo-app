import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from '@clerk/nextjs'

// Types
import { Video } from "@/types/models"
import { VideoSearchParams } from "@/types/props"
import { PrismaVideoQueryParams } from "@/types/queries"

const validParams = {
  year: true,
  genre: true,
  title: true,
  artist: true,
  director: true,
  category: true,
  videoUrl: true,
  authorId: true,
  thumbnailUrl: true,
}

// Convert URL into search params object:
const getSearchParams = (url: string): VideoSearchParams => {
  const { searchParams } = new URL(url)
  const validPairs = Array.from(searchParams)
    .filter((pair) => validParams[pair[0] as keyof typeof validParams])

  return Object.fromEntries(validPairs)
}

// Format search params object into valid Prisma Query:
// Destructure year from the rest of the object because of how TS reads spread.
// If year is present, make the query string value a number to match the Prisma model.
// Parentheses cause the expression to be fully evaluated before the spread is applied
const getPrismaQuery = (params: VideoSearchParams): PrismaVideoQueryParams => {
  const { year, ...rest } = params
  return { ...rest, ...(year && { year: Number(year) }) }
}

// For more info on the prisma query below:
// https://github.com/prisma/prisma/discussions/8216#discussioncomment-992302

const GET = async (req: Request) => {
  try {
    const { userId } = auth()
    if (!userId) return new Response('Unauthorized', { status: 401 })

    console.log("params", getPrismaQuery(getSearchParams(req.url)))

    const videos = await prisma.video.findMany({
      where: { AND: getPrismaQuery(getSearchParams(req.url)) }
    })

    console.log("vids", videos)

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