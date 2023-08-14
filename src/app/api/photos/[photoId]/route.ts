import { prisma } from "@/lib/db"
import { Photo } from "@/types/models"
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from "next/server"


// Dynamic Route Segments
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

// Route Segment Config
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#segment-config-options

interface RequestOptions { params: { photoId: string } }
const PUT = async (req: NextRequest, options: RequestOptions) => {
  try {
    const formData = await req.json()
    const { photoId } = options.params

    const updatedPhoto: Photo = await prisma.photo.update({
      data: formData,
      where: { id: photoId },
    })

    return NextResponse.json(updatedPhoto)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  PUT
}