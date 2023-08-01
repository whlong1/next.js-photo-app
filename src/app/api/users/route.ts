import { NextResponse } from "next/server"
import { auth } from '@clerk/nextjs'

const GET = async (req: Request) => {
  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })
  return NextResponse.json({ message: 'Hello User', userId: userId })
}

export { GET }