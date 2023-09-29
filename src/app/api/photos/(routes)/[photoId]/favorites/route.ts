import { NextResponse, NextRequest } from "next/server"
import { currentUser } from "@clerk/nextjs"
import { Favorite } from "@prisma/client"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/db"

// Add photo to favorites
const POST = async (req: NextRequest, options: { params: { photoId: string } }) => {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })

    const { photoId } = options.params
    if (!photoId) return NextResponse.json({ msg: "Missing Photo Id" }, { status: 404 })

    const favorite: Favorite = await prisma.favorite.create({
      data: {
        ownerId: user.id,
        photoId: photoId
      }
    })

    if (!favorite) return NextResponse.json({ msg: "Something went wrong." }, { status: 500 })

    revalidateTag("photos")

    return NextResponse.json(
      { msg: "Photo added to favorites." }, { status: 200 }
    )
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  POST
}
