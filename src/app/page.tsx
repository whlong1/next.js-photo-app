// Auth
import { auth } from '@clerk/nextjs'

// Services
import * as videoService from "@/services/videoService"
import * as greetingsService from "@/services/greetingService"

export default async function Home() {
  const { userId } = auth()
  console.log("Component userId", userId)

  const greeting: { message: string, greetings: [] } = await greetingsService.show()
  console.log("response:", greeting)

  const videos: any = userId ? await videoService.index() : { message: "Sign In Please" }

  return (
    <>
      <h1>Home Page</h1>
      {videos.message}
    </>
  )
}
