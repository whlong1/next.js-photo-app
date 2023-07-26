import { NextRequest, NextResponse } from "next/server"

// https://nextjs.org/docs/app/api-reference/file-conventions/route
const GET = async (req: NextRequest) => {
  return NextResponse.json({ message: "Welcome" })
}

export { GET }