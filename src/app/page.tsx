// Auth
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = auth()
  console.log("User Id:", userId)
  console.log("Home page render")
  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}