// Auth
import { auth } from '@clerk/nextjs'

// Services
import { fetchGreetings } from '@/services/backendServices'

export default async function Home() {
  const { userId } = auth()
  console.log("Server Component:", userId)

  const greetingObject: { message: string, greetings: [] } = await fetchGreetings()
  console.log("Response:", greetingObject)

  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}