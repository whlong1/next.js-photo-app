// Auth
import { auth } from '@clerk/nextjs'

// Services
import { fetchGreetings } from '@/services/backendServices'

// Types
import { Greeting } from '@/types/models'

import Uploader from '@/app/(pages)/videos/components/MediaUploader'

export default async function Home() {
  const { userId } = auth()
  console.log("Server Component:", userId)

  const greetingObject: Greeting[] = await fetchGreetings()
  console.log("Response:", greetingObject)

  return (
    <>
      <h1>Home Page</h1>
      <Uploader />
    </>
  )
}