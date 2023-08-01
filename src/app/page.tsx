// Auth
import { auth } from '@clerk/nextjs'

// Services
import * as greetingsService from "@/services/greetingService"

export default async function Home() {
  const { userId } = auth()
  console.log("Server Component:", userId)

  const greetingObject: { message: string, greetings: [] } = await greetingsService.show()
  console.log("Response:", greetingObject)

  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}