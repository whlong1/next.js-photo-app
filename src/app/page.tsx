// Auth
import { auth } from '@clerk/nextjs'

// Services
import * as greetingsService from "@/services/greetingService"

export default async function Home() {
  const res: { message: string, greetings: [] } = await greetingsService.show()
  console.log("response:", res)

  const { userId } = auth()
  console.log("User Id", userId)

  return (
    <>
      <h1>Home Page</h1>
      {res.message}
    </>
  )
}
