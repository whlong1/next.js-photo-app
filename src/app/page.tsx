// Auth
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = auth()
  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}