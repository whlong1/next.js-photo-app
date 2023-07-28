// Auth
import { auth } from '@clerk/nextjs'

// Services
import * as helloService from "@/services/hello"

export default async function Home() {
  const res: { message: string, greetings: [] } = await helloService.show()
  console.log("response:", res)

  const { userId } = auth()
  console.log(userId)

  return (
    <>
      <h1>Home Page</h1>
      {res.message}
    </>
  )
}
