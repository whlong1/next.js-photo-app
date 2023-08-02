import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// https://nextjs.org/docs/app/api-reference/file-conventions/route
const GET = async (req: NextRequest) => {
  try {
    const greetings = await prisma.greeting.findMany()
    return NextResponse.json(greetings)
  } catch (error) {
    throw error
  }
}

export { GET }